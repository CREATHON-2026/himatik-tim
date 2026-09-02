/**
 * Order Brief Validation Schemas
 * Zod schemas for runtime validation
 */

import { z } from "zod";

// =============================================================================
// FIELD STATE VALIDATION
// =============================================================================

export const FieldStateSchema = z.enum([
  "EXPLICIT",
  "INFERRED_NEEDS_CONFIRMATION",
  "MISSING",
  "CONFLICT",
  "HUMAN_CONFIRMED",
  "NOT_APPLICABLE",
]);

export const SourceTypeSchema = z.enum([
  "CHAT",
  "CATALOG",
  "CREATOR_DATA",
  "HUMAN_EDIT",
]);

export const EditedBySchema = z.enum(["BUYER", "CREATOR"]).nullable();

/**
 * Generic field with evidence schema
 */
export const FieldWithEvidenceSchema = z.object({
  value: z.unknown().nullable(),
  rawText: z.string().nullable(),
  state: FieldStateSchema,
  evidenceMessageIds: z.array(z.string()),
  evidenceQuotes: z.array(z.string()),
  sourceType: SourceTypeSchema,
  lastEditedBy: EditedBySchema,
  notes: z.string().nullable(),
});

// =============================================================================
// SPECIFIC FIELD TYPES
// =============================================================================

export const BudgetConstraintSchema = z.enum(["TARGET", "MAXIMUM", "RANGE"]);
export const FulfillmentMethodSchema = z.enum([
  "DELIVERY",
  "PICKUP",
  "UNDECIDED",
]);

// =============================================================================
// SNAPSHOT VALIDATION
// =============================================================================

/**
 * Complete Order Brief snapshot schema
 */
export const OrderBriefSnapshotSchema = z.object({
  schemaVersion: z.string(),

  product: z.object({
    productType: FieldWithEvidenceSchema,
    categoryId: FieldWithEvidenceSchema,
    productId: FieldWithEvidenceSchema,
    variantId: FieldWithEvidenceSchema,
    quantity: FieldWithEvidenceSchema,
  }),

  occasion: z.object({
    occasion: FieldWithEvidenceSchema,
    recipientDescription: FieldWithEvidenceSchema,
  }),

  visual: z.object({
    originalVisualTerms: FieldWithEvidenceSchema,
    colorPreference: FieldWithEvidenceSchema,
    stylePreference: FieldWithEvidenceSchema,
    selectedVisualReferences: FieldWithEvidenceSchema,
  }),

  size: z.object({
    requestedSize: FieldWithEvidenceSchema,
    dimensions: FieldWithEvidenceSchema,
    sizeReference: FieldWithEvidenceSchema,
  }),

  financial: z.object({
    buyerBudget: FieldWithEvidenceSchema,
    budgetCurrency: FieldWithEvidenceSchema,
    budgetConstraint: FieldWithEvidenceSchema,
    creatorQuotedPrice: FieldWithEvidenceSchema,
    quotedPriceSource: FieldWithEvidenceSchema,
  }),

  personalization: z.object({
    personalizationType: FieldWithEvidenceSchema,
    cardText: FieldWithEvidenceSchema,
    customName: FieldWithEvidenceSchema,
    otherCustomization: FieldWithEvidenceSchema,
  }),

  fulfillment: z.object({
    requestedFulfillmentDate: FieldWithEvidenceSchema,
    requestedFulfillmentTime: FieldWithEvidenceSchema,
    requestedTimeZone: FieldWithEvidenceSchema,
    creatorCommittedDate: FieldWithEvidenceSchema,
    creatorCommittedTime: FieldWithEvidenceSchema,
    fulfillmentMethod: FieldWithEvidenceSchema,
    deliveryArea: FieldWithEvidenceSchema,
  }),

  notes: z.object({
    specialNotes: FieldWithEvidenceSchema,
    exclusions: FieldWithEvidenceSchema,
    unresolvedItems: FieldWithEvidenceSchema,
  }),

  policies: z.object({
    revisionPolicyVersionId: FieldWithEvidenceSchema,
    cancellationPolicyVersionId: FieldWithEvidenceSchema,
    disputePolicyVersionId: FieldWithEvidenceSchema,
  }),
});

// =============================================================================
// AI EXTRACTION VALIDATION
// =============================================================================

export const AssumptionSchema = z.object({
  fieldKey: z.string(),
  candidateValue: z.unknown(),
  reason: z.string(),
  evidenceMessageIds: z.array(z.string()),
});

export const ConflictSchema = z.object({
  fieldKey: z.string(),
  conflictingValues: z.array(
    z.object({
      value: z.unknown(),
      messageId: z.string(),
      quote: z.string(),
    })
  ),
  reason: z.string(),
});

export const ClarificationQuestionSchema = z.object({
  fieldKey: z.string(),
  question: z.string().max(300),
  priority: z.number().int().min(1).max(4),
  reason: z.string(),
});

/**
 * AI extraction result validation
 * This validates the structured output from OpenRouter
 */
export const ExtractionResultSchema = z.object({
  schemaVersion: z.literal("1.0"),
  fields: OrderBriefSnapshotSchema.partial(),
  assumptions: z.array(AssumptionSchema),
  conflicts: z.array(ConflictSchema),
  missingCriticalFields: z.array(z.string()),
  clarificationQuestions: z
    .array(ClarificationQuestionSchema)
    .max(4, "Maximum 4 clarification questions allowed"),
  humanSummary: z.string().max(1000),
});

// =============================================================================
// API REQUEST VALIDATION
// =============================================================================

/**
 * Compile brief request validation
 */
export const CompileBriefRequestSchema = z.object({
  conversationId: z.string().min(1),
  orderBriefId: z.string().optional(),
  expectedRevision: z.number().int().positive().optional(),
});

/**
 * Update draft field request validation
 */
export const UpdateDraftFieldRequestSchema = z.object({
  briefId: z.string().min(1),
  expectedRevision: z.number().int().positive(),
  fieldPath: z.string().regex(/^[a-z]+\.[a-zA-Z]+$/, "Invalid field path"),
  value: z.unknown(),
  editReason: z.string().max(500).optional(),
});

/**
 * Get brief query params validation
 */
export const GetBriefQuerySchema = z.object({
  conversationId: z.string().min(1),
});

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate that evidence message IDs exist in conversation
 */
export function validateEvidenceIds(
  evidenceIds: string[],
  validMessageIds: Set<string>
): { isValid: boolean; invalidIds: string[] } {
  const invalidIds = evidenceIds.filter((id) => !validMessageIds.has(id));
  return {
    isValid: invalidIds.length === 0,
    invalidIds,
  };
}

/**
 * Sanitize text input to prevent injection
 */
export function sanitizeBriefText(text: string): string {
  return text
    .trim()
    .replace(/\0/g, "") // Remove null bytes
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .slice(0, 5000); // Max length per field
}

/**
 * Validate field path for updates
 */
export function validateFieldPath(path: string): {
  isValid: boolean;
  section?: string;
  field?: string;
} {
  const parts = path.split(".");
  if (parts.length !== 2) {
    return { isValid: false };
  }

  const [section, field] = parts;
  const validSections = [
    "product",
    "occasion",
    "visual",
    "size",
    "financial",
    "personalization",
    "fulfillment",
    "notes",
    "policies",
  ];

  if (!validSections.includes(section)) {
    return { isValid: false };
  }

  return { isValid: true, section, field };
}

/**
 * Check if user can edit specific field based on role
 */
export function canEditField(
  fieldPath: string,
  userRole: "BUYER" | "CREATOR"
): boolean {
  // Fields only creator can set
  const creatorOnlyFields = [
    "financial.creatorQuotedPrice",
    "financial.quotedPriceSource",
    "fulfillment.creatorCommittedDate",
    "fulfillment.creatorCommittedTime",
  ];

  if (creatorOnlyFields.includes(fieldPath) && userRole !== "CREATOR") {
    return false;
  }

  // All other fields can be edited by both parties
  return true;
}

/**
 * Determine required fields based on product category
 */
export function getRequiredFields(category?: string): string[] {
  const baseRequired = [
    "product.productType",
    "product.quantity",
    "financial.buyerBudget",
    "fulfillment.requestedFulfillmentDate",
    "fulfillment.fulfillmentMethod",
  ];

  // Add category-specific requirements
  if (category === "Floral" || category === "Custom") {
    return [
      ...baseRequired,
      "occasion.occasion",
      "visual.originalVisualTerms",
      "size.requestedSize",
    ];
  }

  return baseRequired;
}

/**
 * Calculate completeness score
 */
export function calculateCompleteness(
  snapshot: Partial<z.infer<typeof OrderBriefSnapshotSchema>>,
  requiredFields: string[]
): {
  totalRequiredFields: number;
  filledFields: number;
  percentage: number;
  missingFields: string[];
} {
  const missingFields: string[] = [];
  let filledCount = 0;

  for (const fieldPath of requiredFields) {
    const [section, field] = fieldPath.split(".");
    const fieldData = (snapshot as any)?.[section]?.[field];

    if (
      fieldData &&
      fieldData.state !== "MISSING" &&
      fieldData.value !== null
    ) {
      filledCount++;
    } else {
      missingFields.push(fieldPath);
    }
  }

  return {
    totalRequiredFields: requiredFields.length,
    filledFields: filledCount,
    percentage:
      requiredFields.length > 0
        ? Math.round((filledCount / requiredFields.length) * 100)
        : 0,
    missingFields,
  };
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type OrderBriefSnapshot = z.infer<typeof OrderBriefSnapshotSchema>;
export type ExtractionResult = z.infer<typeof ExtractionResultSchema>;
export type CompileBriefRequest = z.infer<typeof CompileBriefRequestSchema>;
export type UpdateDraftFieldRequest = z.infer<
  typeof UpdateDraftFieldRequestSchema
>;
