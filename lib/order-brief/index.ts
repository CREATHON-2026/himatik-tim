/**
 * Order Brief Module Exports
 */

// Types
export type {
  OrderBrief,
  OrderBriefRevision,
  OrderBriefStatus,
  OrderBriefRevisionStatus,
  OrderBriefFieldState,
  FieldWithEvidence,
  BudgetConstraint,
  FulfillmentMethod,
  VisualReferenceIntent,
  OrderBriefSnapshot,
  ExtractionResult,
  BriefAssumption,
  BriefConflict,
  ClarificationQuestion,
  MessageEvidence,
  BriefCompleteness,
  AgreementReadiness,
  CompileBriefRequest,
  CompileBriefResponse,
  GetBriefResponse,
  UpdateDraftFieldRequest,
  ConversationContext,
  ConversationMessage,
  ConversationParticipant,
} from "./types";

// Validation (schemas only, not types to avoid duplication)
export {
  FieldStateSchema,
  SourceTypeSchema,
  EditedBySchema,
  FieldWithEvidenceSchema,
  BudgetConstraintSchema,
  FulfillmentMethodSchema,
  OrderBriefSnapshotSchema,
  AssumptionSchema,
  ConflictSchema,
  ClarificationQuestionSchema,
  ExtractionResultSchema,
  CompileBriefRequestSchema,
  UpdateDraftFieldRequestSchema,
  GetBriefQuerySchema,
  validateEvidenceIds,
  sanitizeBriefText,
  validateFieldPath,
  canEditField,
  getRequiredFields,
  calculateCompleteness,
} from "./validation";

// Configuration
export * from "./config";

// Extraction
export { extractOrderBrief, createEmptySnapshot, mergeWithExistingSnapshot } from "./extraction";

// Utilities
export * from "./utils";
