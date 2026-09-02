/**
 * Order Brief Configuration
 * Constants and feature flags
 */

// =============================================================================
// FEATURE FLAGS
// =============================================================================

/**
 * Phase 1: Draft compilation with evidence
 */
export const ORDER_BRIEF_ENABLED = true;

/**
 * Phase 2: Visual references from portfolio
 */
export const ORDER_BRIEF_VISUAL_REFERENCES_ENABLED = false;

/**
 * Phase 3: Mutual agreement and consent
 */
export const ORDER_BRIEF_MUTUAL_AGREEMENT_ENABLED = false;

// =============================================================================
// EXTRACTION CONFIG
// =============================================================================

export const EXTRACTION_CONFIG = {
  /**
   * Maximum number of messages to send to LLM
   * Older messages beyond this limit are summarized or dropped
   */
  MAX_MESSAGES_FOR_CONTEXT: 50,

  /**
   * Maximum character length per message
   * Longer messages are truncated with indicator
   */
  MAX_MESSAGE_LENGTH: 2000,

  /**
   * Minimum number of messages required for compilation
   */
  MIN_MESSAGES_REQUIRED: 3,

  /**
   * Maximum clarification questions per compilation
   */
  MAX_CLARIFICATION_QUESTIONS: 4,

  /**
   * Schema version for extraction output
   */
  SCHEMA_VERSION: "1.0",

  /**
   * Prompt version for tracking changes
   */
  PROMPT_VERSION: "1.0.0",
} as const;

// =============================================================================
// OPENROUTER CONFIG
// =============================================================================

export const BRIEF_EXTRACTION_CONFIG = {
  /**
   * Model for structured extraction
   * Use same model as AI Insight for consistency
   */
  MODEL: "nvidia/nemotron-3.5-lightning:free",

  /**
   * Temperature for extraction (low for consistency)
   */
  TEMPERATURE: 0.0,

  /**
   * Max tokens for extraction output
   */
  MAX_TOKENS: 2000,

  /**
   * Timeout for extraction request
   */
  TIMEOUT_MS: 15_000,

  /**
   * Number of retries on failure
   */
  RETRIES: 1,
} as const;

// =============================================================================
// FIELD PRIORITY
// =============================================================================

/**
 * Critical fields that block production/fulfillment
 */
export const CRITICAL_FIELDS = [
  "product.productType",
  "product.quantity",
  "visual.originalVisualTerms",
  "financial.buyerBudget",
  "fulfillment.requestedFulfillmentDate",
  "fulfillment.fulfillmentMethod",
] as const;

/**
 * Fields that should trigger high-priority clarification
 */
export const HIGH_PRIORITY_FIELDS = [
  ...CRITICAL_FIELDS,
  "occasion.occasion",
  "size.requestedSize",
  "personalization.cardText",
] as const;

// =============================================================================
// MERGE RULES PRIORITY
// =============================================================================

/**
 * Data source priority for deterministic merge
 * Higher number = higher priority
 */
export const SOURCE_PRIORITY = {
  AGREED_SNAPSHOT: 100, // Phase 3
  HUMAN_CONFIRMED: 90,
  HUMAN_EDIT: 80,
  EXPLICIT_CHAT: 70,
  CATALOG_DATA: 60,
  CREATOR_DATA: 60,
  AI_INFERENCE: 40,
  MISSING: 0,
} as const;

// =============================================================================
// RATE LIMITING
// =============================================================================

export const RATE_LIMITS = {
  /**
   * Maximum compilations per conversation per hour
   */
  COMPILATIONS_PER_HOUR: 10,

  /**
   * Maximum field updates per brief per hour
   */
  UPDATES_PER_HOUR: 30,

  /**
   * Cooldown between compilations (seconds)
   */
  COMPILE_COOLDOWN_SECONDS: 30,
} as const;

// =============================================================================
// UI CONFIG
// =============================================================================

export const UI_CONFIG = {
  /**
   * Panel width on desktop (pixels)
   */
  PANEL_WIDTH_DESKTOP: 400,

  /**
   * Number of evidence quotes to show per field
   */
  MAX_EVIDENCE_QUOTES: 3,

  /**
   * Character limit for evidence quote display
   */
  EVIDENCE_QUOTE_LENGTH: 100,

  /**
   * Show full revision history in UI
   */
  SHOW_REVISION_HISTORY: true,
} as const;

// =============================================================================
// DISCLAIMERS
// =============================================================================

export const DISCLAIMERS = {
  DRAFT_LABEL: "Draft Order Brief — Belum Disepakati",
  
  DRAFT_DISCLAIMER:
    "Order Brief merangkum spesifikasi yang disepakati. Ketentuan transaksi tetap mengikuti kebijakan Gifteria.",

  PHASE_3_NOT_ACTIVE:
    "Fitur persetujuan final belum aktif. Draft ini untuk referensi diskusi saja.",

  AI_EXTRACTION_NOTICE:
    "AI menyusun draft dari percakapan Anda. Periksa dan edit sesuai kebutuhan sebelum melanjutkan.",
} as const;

// =============================================================================
// AUDIT EVENT TYPES
// =============================================================================

export const AUDIT_EVENT_TYPES = {
  BRIEF_CREATED: "BRIEF_CREATED",
  REVISION_COMPILED: "REVISION_COMPILED",
  FIELD_EDITED: "FIELD_EDITED",
  BRIEF_PROPOSED: "BRIEF_PROPOSED", // Phase 3
  PARTY_AGREED: "PARTY_AGREED", // Phase 3
  BRIEF_AGREED: "BRIEF_AGREED", // Phase 3
  BRIEF_REVISED: "BRIEF_REVISED",
  BRIEF_CANCELLED: "BRIEF_CANCELLED",
} as const;

// =============================================================================
// ERROR MESSAGES
// =============================================================================

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Anda tidak memiliki akses ke Order Brief ini",
  NOT_FOUND: "Order Brief tidak ditemukan",
  CONVERSATION_NOT_FOUND: "Percakapan tidak ditemukan",
  INSUFFICIENT_MESSAGES: "Percakapan belum cukup panjang untuk disusun",
  EXTRACTION_FAILED: "Gagal menyusun Order Brief. Silakan coba lagi.",
  INVALID_EVIDENCE: "Evidence tidak valid. Message ID tidak ditemukan.",
  STALE_REVISION: "Brief telah diperbarui. Silakan refresh dan coba lagi.",
  RATE_LIMIT: "Terlalu banyak permintaan. Silakan tunggu sebentar.",
  FIELD_NOT_EDITABLE: "Field ini tidak dapat diedit oleh Anda",
  PHASE_3_NOT_ACTIVE: "Fitur persetujuan belum aktif",
} as const;
