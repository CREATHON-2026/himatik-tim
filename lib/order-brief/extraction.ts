/**
 * Order Brief Extraction Service
 * Converts conversation to structured Order Brief using OpenRouter
 */

import { callOpenRouter } from "@/features/insight/services/openrouter";
import {
  buildExtractionPrompt,
  buildExtractionJSONSchema,
} from "./extraction-prompt";
import { ExtractionResultSchema, validateEvidenceIds } from "./validation";
import { EXTRACTION_CONFIG, BRIEF_EXTRACTION_CONFIG } from "./config";
import type {
  ConversationContext,
  ExtractionResult,
  ConversationMessage,
} from "./types";

// =============================================================================
// MAIN EXTRACTION FUNCTION
// =============================================================================

/**
 * Extract Order Brief from conversation using AI
 */
export async function extractOrderBrief(
  context: ConversationContext
): Promise<{
  success: boolean;
  result?: ExtractionResult;
  error?: string;
}> {
  try {
    // Validate minimum messages
    if (context.messages.length < EXTRACTION_CONFIG.MIN_MESSAGES_REQUIRED) {
      return {
        success: false,
        error: `Percakapan memerlukan minimal ${EXTRACTION_CONFIG.MIN_MESSAGES_REQUIRED} pesan`,
      };
    }

    // Prepare conversation (truncate if needed)
    const preparedContext = prepareConversationContext(context);

    // Build prompt
    const prompt = buildExtractionPrompt(preparedContext);

    // Call OpenRouter with structured output
    const rawResponse = await callOpenRouter(
      [
        {
          role: "user",
          content: prompt,
        },
      ],
      {
        timeoutMs: BRIEF_EXTRACTION_CONFIG.TIMEOUT_MS,
        retries: BRIEF_EXTRACTION_CONFIG.RETRIES,
      }
    );

    // Parse JSON response
    let parsedResult: unknown;
    try {
      parsedResult = JSON.parse(rawResponse);
    } catch (err) {
      console.error("Failed to parse LLM response as JSON:", err);
      return {
        success: false,
        error: "AI menghasilkan response yang tidak valid",
      };
    }

    // Validate with Zod
    const validation = ExtractionResultSchema.safeParse(parsedResult);
    if (!validation.success) {
      console.error("Extraction validation failed:", validation.error);
      return {
        success: false,
        error: "Struktur response AI tidak sesuai schema",
      };
    }

    const result = validation.data;

    // Validate evidence IDs
    const validMessageIds = new Set(context.messages.map((m) => m.id));
    const allEvidenceIds = collectAllEvidenceIds(result as any);
    const evidenceValidation = validateEvidenceIds(
      allEvidenceIds,
      validMessageIds
    );

    if (!evidenceValidation.isValid) {
      console.error("Invalid evidence IDs:", evidenceValidation.invalidIds);
      return {
        success: false,
        error: "AI menghasilkan evidence yang tidak valid",
      };
    }

    // Validate clarification questions limit
    if (result.clarificationQuestions.length > EXTRACTION_CONFIG.MAX_CLARIFICATION_QUESTIONS) {
      result.clarificationQuestions = result.clarificationQuestions.slice(
        0,
        EXTRACTION_CONFIG.MAX_CLARIFICATION_QUESTIONS
      );
    }

    return {
      success: true,
      result: result as any,
    };
  } catch (err: any) {
    console.error("Extraction error:", err);
    return {
      success: false,
      error: err?.message || "Gagal mengekstrak Order Brief",
    };
  }
}

// =============================================================================
// CONVERSATION PREPARATION
// =============================================================================

/**
 * Prepare conversation for extraction
 * - Truncate if too long
 * - Redact sensitive info
 * - Sort by timestamp
 */
function prepareConversationContext(
  context: ConversationContext
): ConversationContext {
  let messages = [...context.messages];

  // Sort by createdAt
  messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  // Truncate messages if exceeding limit
  if (messages.length > EXTRACTION_CONFIG.MAX_MESSAGES_FOR_CONTEXT) {
    // Keep most recent messages
    messages = messages.slice(-EXTRACTION_CONFIG.MAX_MESSAGES_FOR_CONTEXT);
  }

  // Truncate long messages
  messages = messages.map((msg) => ({
    ...msg,
    content:
      msg.content.length > EXTRACTION_CONFIG.MAX_MESSAGE_LENGTH
        ? msg.content.slice(0, EXTRACTION_CONFIG.MAX_MESSAGE_LENGTH) +
          "\n[truncated: message too long]"
        : msg.content,
  }));

  // Redact sensitive patterns
  messages = messages.map((msg) => ({
    ...msg,
    content: redactSensitiveInfo(msg.content),
  }));

  return {
    ...context,
    messages,
  };
}

/**
 * Redact sensitive information from message content
 */
function redactSensitiveInfo(content: string): string {
  let cleaned = content;

  // Redact phone numbers (Indonesian format)
  cleaned = cleaned.replace(/(\+62|0)\d{9,13}/g, "[PHONE_REDACTED]");

  // Redact email addresses
  cleaned = cleaned.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    "[EMAIL_REDACTED]"
  );

  // Redact bank account numbers (generic pattern)
  cleaned = cleaned.replace(/\b\d{10,16}\b/g, "[ACCOUNT_REDACTED]");

  // Redact URLs with credentials
  cleaned = cleaned.replace(
    /https?:\/\/[^:]+:[^@]+@[^\s]+/g,
    "[URL_REDACTED]"
  );

  return cleaned;
}

/**
 * Collect all evidence IDs from extraction result for validation
 */
function collectAllEvidenceIds(result: ExtractionResult): string[] {
  const ids: string[] = [];

  // Collect from fields
  const sections = [
    "product",
    "occasion",
    "visual",
    "size",
    "financial",
    "personalization",
    "fulfillment",
    "notes",
    "policies",
  ] as const;

  for (const section of sections) {
    const sectionData = result.fields[section];
    if (sectionData) {
      for (const field of Object.values(sectionData)) {
        if (field && typeof field === "object" && "evidenceMessageIds" in field) {
          ids.push(...(field.evidenceMessageIds as string[]));
        }
      }
    }
  }

  // Collect from assumptions
  for (const assumption of result.assumptions) {
    ids.push(...assumption.evidenceMessageIds);
  }

  // Collect from conflicts
  for (const conflict of result.conflicts) {
    for (const value of conflict.conflictingValues) {
      ids.push(value.messageId);
    }
  }

  return Array.from(new Set(ids)); // Remove duplicates
}

// =============================================================================
// SNAPSHOT INITIALIZATION
// =============================================================================

/**
 * Create initial empty snapshot
 * Used when no extraction has been done yet
 */
export function createEmptySnapshot(): ExtractionResult["fields"] {
  const emptyField = {
    value: null,
    rawText: null,
    state: "MISSING" as const,
    evidenceMessageIds: [],
    evidenceQuotes: [],
    sourceType: "CHAT" as const,
    lastEditedBy: null,
    notes: null,
  };

  return {
    product: {
      productType: { ...emptyField },
      categoryId: { ...emptyField },
      productId: { ...emptyField },
      variantId: { ...emptyField },
      quantity: { ...emptyField },
    },
    occasion: {
      occasion: { ...emptyField },
      recipientDescription: { ...emptyField },
    },
    visual: {
      originalVisualTerms: { ...emptyField },
      colorPreference: { ...emptyField },
      stylePreference: { ...emptyField },
      selectedVisualReferences: { ...emptyField },
    },
    size: {
      requestedSize: { ...emptyField },
      dimensions: { ...emptyField },
      sizeReference: { ...emptyField },
    },
    financial: {
      buyerBudget: { ...emptyField },
      budgetCurrency: { ...emptyField },
      budgetConstraint: { ...emptyField },
      creatorQuotedPrice: { ...emptyField },
      quotedPriceSource: { ...emptyField },
    },
    personalization: {
      personalizationType: { ...emptyField },
      cardText: { ...emptyField },
      customName: { ...emptyField },
      otherCustomization: { ...emptyField },
    },
    fulfillment: {
      requestedFulfillmentDate: { ...emptyField },
      requestedFulfillmentTime: { ...emptyField },
      requestedTimeZone: { ...emptyField },
      creatorCommittedDate: { ...emptyField },
      creatorCommittedTime: { ...emptyField },
      fulfillmentMethod: { ...emptyField },
      deliveryArea: { ...emptyField },
    },
    notes: {
      specialNotes: { ...emptyField },
      exclusions: { ...emptyField },
      unresolvedItems: { ...emptyField },
    },
    policies: {
      revisionPolicyVersionId: { ...emptyField },
      cancellationPolicyVersionId: { ...emptyField },
      disputePolicyVersionId: { ...emptyField },
    },
  };
}

// =============================================================================
// MERGE LOGIC FOR INCREMENTAL UPDATES
// =============================================================================

/**
 * Merge new extraction result with existing snapshot
 * Respects deterministic priority rules
 */
export function mergeWithExistingSnapshot(
  existing: ExtractionResult["fields"],
  newExtraction: ExtractionResult["fields"]
): ExtractionResult["fields"] {
  const merged = { ...existing };

  const sections = Object.keys(newExtraction) as Array<
    keyof ExtractionResult["fields"]
  >;

  for (const section of sections) {
    const existingSection = existing[section];
    const newSection = newExtraction[section];

    if (!existingSection || !newSection) continue;

    // Create a shallow copy of the existing section
    merged[section] = { ...(existingSection as Record<string, any>) } as any;

    const fields = Object.keys(newSection) as Array<keyof typeof newSection>;

    for (const field of fields) {
      const existingField = existingSection[field];
      const newField = newSection[field];

      if (!existingField || !newField) continue;

      // Apply merge priority
      const shouldUpdate = shouldUpdateField(existingField, newField);

      if (shouldUpdate) {
        (merged[section] as any)[field] = newField;
      }
    }
  }

  return merged;
}

/**
 * Determine if field should be updated based on priority
 */
function shouldUpdateField(
  existing: any,
  newField: any
): boolean {
  // Human confirmed or edited always wins
  if (existing.state === "HUMAN_CONFIRMED") return false;
  if (existing.lastEditedBy !== null) return false;

  // New explicit data overwrites inference
  if (
    existing.state === "INFERRED_NEEDS_CONFIRMATION" &&
    newField.state === "EXPLICIT"
  ) {
    return true;
  }

  // New data with evidence overwrites missing
  if (existing.state === "MISSING" && newField.state !== "MISSING") {
    return true;
  }

  // Conflict overwrites single value
  if (newField.state === "CONFLICT") return true;

  // Default: don't overwrite existing data
  return false;
}
