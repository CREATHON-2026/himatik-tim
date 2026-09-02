/**
 * Order Brief API Routes
 * GET: Retrieve brief for conversation
 * POST: Create new brief
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { GetBriefQuerySchema } from "@/lib/order-brief/validation";
import { calculateBriefCompleteness, getFieldsByState } from "@/lib/order-brief/utils";
import { ERROR_MESSAGES, ORDER_BRIEF_ENABLED } from "@/lib/order-brief/config";
import type { GetBriefResponse, OrderBriefSnapshot } from "@/lib/order-brief/types";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET /api/order-brief?conversationId=xxx
 * Retrieve Order Brief for a conversation
 */
export async function GET(req: NextRequest) {
  try {
    if (!ORDER_BRIEF_ENABLED) {
      return NextResponse.json(
        { error: "Order Brief feature not enabled" },
        { status: 503 }
      );
    }

    // Validate query params
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    const validation = GetBriefQuerySchema.safeParse({ conversationId });
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid query parameters" },
        { status: 400 }
      );
    }

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

    // TODO: Verify user is participant of conversation
    // This requires conversation/message system to be implemented
    // For now, we check if user has access to any brief for this conversation

    // Find Order Brief for conversation
    let brief;
    try {
      brief = await prisma.orderBrief.findFirst({
        where: {
          conversationId: validation.data.conversationId,
        },
        include: {
          currentRevision: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (dbError: any) {
      // Handle case where table doesn't exist yet
      if (dbError.code === 'P2021') {
        return NextResponse.json(
          { error: ERROR_MESSAGES.NOT_FOUND },
          { status: 404 }
        );
      }
      throw dbError;
    }

    if (!brief) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: 404 }
      );
    }

    // Check permissions
    // TODO: Implement proper participant checking
    const canEdit = brief.createdById === user.id;
    const canCompile = brief.createdById === user.id;

    // Parse snapshot
    let snapshot: OrderBriefSnapshot | null = null;
    let clarifications: any[] = [];

    if (brief.currentRevision && brief.currentRevision.snapshotJson) {
      snapshot = brief.currentRevision.snapshotJson as unknown as OrderBriefSnapshot;
    }

    // Calculate completeness
    const completeness = snapshot
      ? calculateBriefCompleteness(snapshot)
      : {
          totalRequiredFields: 0,
          filledFields: 0,
          percentage: 0,
          missingFields: [],
        };

    // Get fields needing confirmation
    const needsConfirmation = snapshot
      ? getFieldsByState(snapshot, "INFERRED_NEEDS_CONFIRMATION")
      : [];

    // Build clarifications from fields
    clarifications = needsConfirmation.map((item, idx) => ({
      fieldKey: item.path,
      question: `Konfirmasi ${item.path}: ${item.field.rawText || item.field.value}`,
      priority: idx + 1,
      reason: "Perlu konfirmasi",
    }));

    const response: GetBriefResponse = {
      brief: brief as any,
      snapshot,
      clarifications,
      completeness,
      permissions: {
        canEdit,
        canCompile,
        canAgree: false, // Phase 3
        userParty: null, // TODO: Determine from conversation
      },
    };

    return NextResponse.json(response);
  } catch (err: any) {
    console.error("GET /api/order-brief error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
