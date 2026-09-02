/**
 * Order Brief Compile API
 * POST: Compile brief from conversation using AI
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { CompileBriefRequestSchema } from "@/lib/order-brief/validation";
import {
  extractOrderBrief,
  createEmptySnapshot,
  mergeWithExistingSnapshot,
} from "@/lib/order-brief/extraction";
import { generateSnapshotHash, calculateBriefCompleteness } from "@/lib/order-brief/utils";
import {
  ERROR_MESSAGES,
  ORDER_BRIEF_ENABLED,
  EXTRACTION_CONFIG,
  AUDIT_EVENT_TYPES,
} from "@/lib/order-brief/config";
import type {
  ConversationContext,
  ConversationMessage,
  CompileBriefResponse,
  OrderBriefSnapshot,
} from "@/lib/order-brief/types";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * POST /api/order-brief/compile
 * Compile Order Brief from conversation
 */
export async function POST(req: NextRequest) {
  try {
    if (!ORDER_BRIEF_ENABLED) {
      return NextResponse.json(
        { error: "Order Brief feature not enabled" },
        { status: 503 }
      );
    }

    // Parse request body
    const body = await req.json();
    const validation = CompileBriefRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error },
        { status: 400 }
      );
    }

    const { conversationId, orderBriefId, expectedRevision } = validation.data;

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    // Get user info
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true, email: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // TODO: Fetch actual conversation messages from database
    // For now, we'll create a mock conversation context
    // In production, this should query your conversation/message tables
    const conversationContext = await fetchConversationContext(
      conversationId,
      user.id
    );

    if (!conversationContext) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CONVERSATION_NOT_FOUND },
        { status: 404 }
      );
    }

    // Validate minimum messages
    if (
      conversationContext.messages.length < EXTRACTION_CONFIG.MIN_MESSAGES_REQUIRED
    ) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INSUFFICIENT_MESSAGES },
        { status: 400 }
      );
    }

    // Extract brief using AI
    const extractionResult = await extractOrderBrief(conversationContext);

    if (!extractionResult.success || !extractionResult.result) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.EXTRACTION_FAILED },
        { status: 500 }
      );
    }

    const extraction = extractionResult.result;

    // Get or create Order Brief
    let brief = orderBriefId
      ? await prisma.orderBrief.findUnique({
          where: { id: orderBriefId },
          include: { currentRevision: true },
        })
      : null;

    if (!brief) {
      // Create new brief
      brief = await prisma.orderBrief.create({
        data: {
          conversationId,
          createdById: user.id,
          status: "DRAFT",
        },
        include: { currentRevision: true },
      });
    } else {
      // Check concurrency
      if (
        expectedRevision !== undefined &&
        brief.currentRevision?.version !== expectedRevision
      ) {
        return NextResponse.json(
          { error: ERROR_MESSAGES.STALE_REVISION },
          { status: 409 }
        );
      }
    }

    // Merge with existing snapshot if available
    let finalSnapshot: Partial<OrderBriefSnapshot>;
    if (brief.currentRevision?.snapshotJson) {
      const existingSnapshot = brief.currentRevision
        .snapshotJson as Partial<OrderBriefSnapshot>;
      finalSnapshot = mergeWithExistingSnapshot(
        existingSnapshot,
        extraction.fields
      );
    } else {
      finalSnapshot = extraction.fields;
    }

    // Create full snapshot with schema version
    const completeSnapshot: OrderBriefSnapshot = {
      schemaVersion: EXTRACTION_CONFIG.SCHEMA_VERSION,
      ...createEmptySnapshot(),
      ...finalSnapshot,
    } as OrderBriefSnapshot;

    // Calculate hash
    const snapshotHash = generateSnapshotHash(completeSnapshot);

    // Get message IDs for source tracking
    const messageIds = conversationContext.messages.map((m) => m.id);
    const sourceFromMessageId = messageIds[0] || null;
    const sourceThroughMessageId = messageIds[messageIds.length - 1] || null;

    // Calculate next version
    const nextVersion = (brief.currentRevision?.version || 0) + 1;

    // Create new revision
    const revision = await prisma.orderBriefRevision.create({
      data: {
        orderBriefId: brief.id,
        version: nextVersion,
        snapshotJson: completeSnapshot as any,
        snapshotHash,
        sourceFromMessageId,
        sourceThroughMessageId,
        createdByType: "AI",
        createdById: user.id,
        modelName: "nvidia/nemotron-3.5-lightning:free",
        promptVersion: EXTRACTION_CONFIG.PROMPT_VERSION,
        schemaVersion: EXTRACTION_CONFIG.SCHEMA_VERSION,
        status: "DRAFT",
      },
    });

    // Update brief with current revision
    await prisma.orderBrief.update({
      where: { id: brief.id },
      data: {
        currentRevisionId: revision.id,
        status: "DRAFT",
        updatedAt: new Date(),
      },
    });

    // Create audit event
    await prisma.orderBriefAuditEvent.create({
      data: {
        orderBriefId: brief.id,
        revisionId: revision.id,
        actorUserId: user.id,
        eventType: AUDIT_EVENT_TYPES.REVISION_COMPILED,
        metadataJson: {
          conversationId,
          messageCount: conversationContext.messages.length,
          assumptionsCount: extraction.assumptions.length,
          conflictsCount: extraction.conflicts.length,
          clarificationsCount: extraction.clarificationQuestions.length,
        },
      },
    });

    // Calculate completeness
    const completeness = calculateBriefCompleteness(completeSnapshot);

    // Build response
    const response: CompileBriefResponse = {
      briefId: brief.id,
      revisionId: revision.id,
      version: revision.version,
      snapshot: completeSnapshot,
      assumptions: extraction.assumptions,
      conflicts: extraction.conflicts,
      clarifications: extraction.clarificationQuestions,
      completeness,
      createdAt: revision.createdAt.toISOString(),
    };

    return NextResponse.json(response);
  } catch (err: any) {
    console.error("POST /api/order-brief/compile error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

/**
 * Fetch conversation context from database
 * TODO: Replace with actual conversation system
 */
async function fetchConversationContext(
  conversationId: string,
  userId: string
): Promise<ConversationContext | null> {
  // PLACEHOLDER: This should fetch from your actual conversation/message tables
  // For now, we return mock data structure
  
  // Check if this is a creator assistant conversation (which exists in DB)
  const assistantConversation = await prisma.creatorAssistantConversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        take: 50,
      },
    },
  });

  if (assistantConversation) {
    // Convert assistant messages to conversation format
    const messages: ConversationMessage[] = assistantConversation.messages.map((msg) => ({
      id: msg.id,
      role: msg.role === "USER" ? "BUYER" : "CREATOR",
      content: msg.content,
      createdAt: msg.createdAt,
    }));

    return {
      conversationId,
      messages,
      participants: [
        {
          userId: assistantConversation.userId || "anonymous",
          role: "BUYER",
          name: "Buyer",
        },
        {
          userId: "system",
          role: "CREATOR",
          name: "Gifteria Assistant",
        },
      ],
    };
  }

  // TODO: Check your actual buyer-creator conversation tables
  // For demo purposes, return null if conversation not found
  return null;
}
