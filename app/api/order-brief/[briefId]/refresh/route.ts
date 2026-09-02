/**
 * Order Brief Refresh API
 * POST: Recompile brief with new messages since last compilation
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { extractOrderBrief, mergeWithExistingSnapshot } from "@/lib/order-brief/extraction";
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
  OrderBriefSnapshot,
} from "@/lib/order-brief/types";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * POST /api/order-brief/[briefId]/refresh
 * Refresh brief with new messages
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ briefId: string }> }
) {
  try {
    if (!ORDER_BRIEF_ENABLED) {
      return NextResponse.json(
        { error: "Order Brief feature not enabled" },
        { status: 503 }
      );
    }

    const { briefId } = await params;

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

    // Get brief with current revision
    const brief = await prisma.orderBrief.findUnique({
      where: { id: briefId },
      include: {
        currentRevision: true,
      },
    });

    if (!brief) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: 404 }
      );
    }

    // TODO: Verify user is participant
    // For now, check if user created the brief
    if (brief.createdById !== user.id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 403 }
      );
    }

    // Fetch conversation with new messages
    const conversationContext = await fetchConversationForRefresh(
      brief.conversationId,
      brief.currentRevision?.sourceThroughMessageId || null
    );

    if (!conversationContext) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CONVERSATION_NOT_FOUND },
        { status: 404 }
      );
    }

    // Check if there are new messages
    if (conversationContext.messages.length === 0) {
      return NextResponse.json({
        message: "Tidak ada pesan baru sejak terakhir kompilasi",
        briefId: brief.id,
        revisionId: brief.currentRevisionId,
        version: brief.currentRevision?.version,
      });
    }

    // Extract new information
    const extractionResult = await extractOrderBrief(conversationContext);

    if (!extractionResult.success || !extractionResult.result) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.EXTRACTION_FAILED },
        { status: 500 }
      );
    }

    const extraction = extractionResult.result;

    // Merge with existing snapshot
    const existingSnapshot = brief.currentRevision
      ?.snapshotJson as unknown as OrderBriefSnapshot;
    const mergedSnapshot = mergeWithExistingSnapshot(
      existingSnapshot,
      extraction.fields
    ) as OrderBriefSnapshot;

    // Calculate hash
    const snapshotHash = generateSnapshotHash(mergedSnapshot);

    // Check if anything actually changed
    const existingHash = brief.currentRevision?.snapshotHash;
    if (existingHash === snapshotHash) {
      return NextResponse.json({
        message: "Tidak ada perubahan dari pesan baru",
        briefId: brief.id,
        revisionId: brief.currentRevisionId,
        version: brief.currentRevision?.version,
      });
    }

    // Get message IDs for source tracking
    const allMessageIds = conversationContext.messages.map((m) => m.id);
    const sourceThroughMessageId =
      allMessageIds[allMessageIds.length - 1] || null;

    // Create new revision
    const nextVersion = (brief.currentRevision?.version || 0) + 1;
    const newRevision = await prisma.orderBriefRevision.create({
      data: {
        orderBriefId: briefId,
        version: nextVersion,
        snapshotJson: mergedSnapshot as any,
        snapshotHash,
        sourceFromMessageId: brief.currentRevision?.sourceFromMessageId || null,
        sourceThroughMessageId,
        createdByType: "AI",
        createdById: user.id,
        modelName: "nvidia/nemotron-3.5-lightning:free",
        promptVersion: EXTRACTION_CONFIG.PROMPT_VERSION,
        schemaVersion: EXTRACTION_CONFIG.SCHEMA_VERSION,
        status: "DRAFT",
      },
    });

    // Update brief
    await prisma.orderBrief.update({
      where: { id: briefId },
      data: {
        currentRevisionId: newRevision.id,
        updatedAt: new Date(),
      },
    });

    // Create audit event
    await prisma.orderBriefAuditEvent.create({
      data: {
        orderBriefId: briefId,
        revisionId: newRevision.id,
        actorUserId: user.id,
        eventType: "BRIEF_REFRESHED",
        metadataJson: {
          newMessageCount: conversationContext.messages.length,
          assumptionsCount: extraction.assumptions.length,
          conflictsCount: extraction.conflicts.length,
        },
      },
    });

    // Calculate completeness
    const completeness = calculateBriefCompleteness(mergedSnapshot);

    return NextResponse.json({
      success: true,
      briefId: brief.id,
      revisionId: newRevision.id,
      version: newRevision.version,
      snapshot: mergedSnapshot,
      assumptions: extraction.assumptions,
      conflicts: extraction.conflicts,
      clarifications: extraction.clarificationQuestions,
      completeness,
      newMessagesProcessed: conversationContext.messages.length,
    });
  } catch (err: any) {
    console.error("POST /api/order-brief/[briefId]/refresh error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

/**
 * Fetch conversation messages after a specific message ID
 * TODO: Replace with actual conversation system
 */
async function fetchConversationForRefresh(
  conversationId: string,
  afterMessageId: string | null
): Promise<ConversationContext | null> {
  // PLACEHOLDER: Similar to compile endpoint
  // Should fetch only messages AFTER the last processed message
  
  const assistantConversation = await prisma.creatorAssistantConversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        where: afterMessageId
          ? {
              createdAt: {
                gt: (
                  await prisma.creatorAssistantMessage.findUnique({
                    where: { id: afterMessageId },
                    select: { createdAt: true },
                  })
                )?.createdAt || new Date(0),
              },
            }
          : {},
        orderBy: { createdAt: "asc" },
        take: 50,
      },
    },
  });

  if (assistantConversation) {
    const messages: ConversationMessage[] = assistantConversation.messages.map(
      (msg) => ({
        id: msg.id,
        role: msg.role === "USER" ? "BUYER" : "CREATOR",
        content: msg.content,
        createdAt: msg.createdAt,
      })
    );

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

  return null;
}
