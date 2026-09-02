/**
 * Order Brief Draft Update API
 * PATCH: Update draft field manually
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import {
  UpdateDraftFieldRequestSchema,
  validateFieldPath,
  canEditField,
} from "@/lib/order-brief/validation";
import {
  getFieldByPath,
  setFieldByPath,
  generateSnapshotHash,
} from "@/lib/order-brief/utils";
import {
  ERROR_MESSAGES,
  ORDER_BRIEF_ENABLED,
  AUDIT_EVENT_TYPES,
} from "@/lib/order-brief/config";
import type { OrderBriefSnapshot, FieldWithEvidence } from "@/lib/order-brief/types";

export const runtime = "nodejs";
export const maxDuration = 10;

/**
 * PATCH /api/order-brief/[briefId]/draft
 * Update a field in the draft
 */
export async function PATCH(
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

    // Parse request body
    const body = await req.json();
    const validation = UpdateDraftFieldRequestSchema.safeParse({
      ...body,
      briefId,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error },
        { status: 400 }
      );
    }

    const { fieldPath, value, editReason, expectedRevision } = validation.data;

    // Validate field path
    const pathValidation = validateFieldPath(fieldPath);
    if (!pathValidation.isValid) {
      return NextResponse.json(
        { error: "Invalid field path" },
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

    // Check concurrency
    if (
      brief.currentRevision &&
      brief.currentRevision.version !== expectedRevision
    ) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.STALE_REVISION },
        { status: 409 }
      );
    }

    // TODO: Determine user role (BUYER or CREATOR) from conversation
    // For now, assume creator if they created the brief
    const userRole: "BUYER" | "CREATOR" =
      brief.createdById === user.id ? "CREATOR" : "BUYER";

    // Check if user can edit this field
    if (!canEditField(fieldPath, userRole)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.FIELD_NOT_EDITABLE },
        { status: 403 }
      );
    }

    // Get current snapshot
    if (!brief.currentRevision || !brief.currentRevision.snapshotJson) {
      return NextResponse.json(
        { error: "No current revision found" },
        { status: 400 }
      );
    }

    const currentSnapshot = brief.currentRevision
      .snapshotJson as unknown as OrderBriefSnapshot;

    // Get current field
    const currentField = getFieldByPath(currentSnapshot, fieldPath);
    if (!currentField) {
      return NextResponse.json(
        { error: "Field not found in snapshot" },
        { status: 400 }
      );
    }

    // Create updated field
    const updatedField: FieldWithEvidence = {
      ...currentField,
      value,
      state: "HUMAN_CONFIRMED",
      sourceType: "HUMAN_EDIT",
      lastEditedBy: userRole,
      notes: editReason || currentField.notes,
    };

    // Update snapshot
    const updatedSnapshot = setFieldByPath(
      currentSnapshot,
      fieldPath,
      updatedField
    ) as OrderBriefSnapshot;

    // Calculate new hash
    const newHash = generateSnapshotHash(updatedSnapshot);

    // Create new revision
    const nextVersion = brief.currentRevision.version + 1;
    const newRevision = await prisma.orderBriefRevision.create({
      data: {
        orderBriefId: briefId,
        version: nextVersion,
        snapshotJson: updatedSnapshot as any,
        snapshotHash: newHash,
        sourceFromMessageId: brief.currentRevision.sourceFromMessageId,
        sourceThroughMessageId: brief.currentRevision.sourceThroughMessageId,
        createdByType: userRole === "BUYER" ? "BUYER" : "CREATOR",
        createdById: user.id,
        schemaVersion: brief.currentRevision.schemaVersion,
        status: "DRAFT",
      },
    });

    // Update brief with new current revision
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
        eventType: AUDIT_EVENT_TYPES.FIELD_EDITED,
        metadataJson: {
          fieldPath,
          oldValue: currentField.value as any,
          newValue: value as any,
          reason: editReason,
        },
      },
    });

    return NextResponse.json({
      success: true,
      revisionId: newRevision.id,
      version: newRevision.version,
      field: updatedField,
    });
  } catch (err: any) {
    console.error("PATCH /api/order-brief/[briefId]/draft error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
