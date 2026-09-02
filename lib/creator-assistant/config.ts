/**
 * Configuration for Ask Gifteria Creator Assistant
 */

import type { ActionConfig } from "./types";

/**
 * Retrieval thresholds and scoring configuration
 */
export const RETRIEVAL_CONFIG = {
  // Minimum score required for a knowledge article to be considered relevant
  MIN_THRESHOLD: 0.2,
  
  // Stricter threshold for policy/financial questions
  POLICY_THRESHOLD: 0.3,
  
  // Maximum number of articles to include in context
  MAX_ARTICLES: 6,
  
  // Maximum conversation history to include
  MAX_HISTORY_MESSAGES: 10,
  
  // Scoring weights
  WEIGHTS: {
    EXACT_PHRASE: 3.0,
    TITLE_MATCH: 2.5,
    KEYWORD_MATCH: 2.0,
    CATEGORY_MATCH: 1.5,
    CONTENT_MATCH: 0.8,
  },
} as const;

/**
 * Validation limits
 */
export const VALIDATION_CONFIG = {
  MAX_MESSAGE_LENGTH: 1500,
  MIN_MESSAGE_LENGTH: 2,
  MAX_CONVERSATION_AGE_DAYS: 7,
} as const;

/**
 * Rate limiting configuration (requests per user per time window)
 */
export const RATE_LIMIT_CONFIG = {
  AUTHENTICATED: {
    MAX_REQUESTS: 30,
    WINDOW_MS: 60_000, // 1 minute
  },
  ANONYMOUS: {
    MAX_REQUESTS: 10,
    WINDOW_MS: 60_000, // 1 minute
  },
} as const;

/**
 * OpenRouter streaming configuration
 */
export const STREAMING_CONFIG = {
  TIMEOUT_MS: 45_000, // Increased timeout for slower OpenRouter responses
  TEMPERATURE: 0.15,
  MAX_TOKENS: 800,
} as const;

/**
 * Allowed actions that can be suggested to users
 * CRITICAL: LLM cannot generate URLs - only select action keys
 * Server maps action keys to actual URLs
 */
export const ALLOWED_ACTIONS: ActionConfig[] = [
  {
    key: "REGISTER_CREATOR",
    label: "Daftar sebagai Creator",
    href: "/register",
    variant: "default",
    visibilityRule: (ctx) => !ctx.hasCreatorProfile,
  },
  {
    key: "LOGIN",
    label: "Login",
    href: "/login",
    variant: "outline",
    visibilityRule: (ctx) => !ctx.isAuthenticated,
  },
  {
    key: "VIEW_APPLICATION_STATUS",
    label: "Cek Status Pendaftaran",
    href: "/dashboard/creator",
    variant: "secondary",
    requiresAuth: true,
    visibilityRule: (ctx) => ctx.hasActiveApplication === true,
  },
  {
    key: "START_ONBOARDING",
    label: "Mulai Onboarding",
    href: "/dashboard/creator/profile",
    variant: "default",
    requiresAuth: true,
    visibilityRule: (ctx) => 
      ctx.hasCreatorProfile && ctx.creatorStatus === "PENDING_VERIFICATION",
  },
  {
    key: "OPEN_CREATOR_DASHBOARD",
    label: "Buka Dashboard Creator",
    href: "/dashboard/creator",
    variant: "secondary",
    requiresAuth: true,
    visibilityRule: (ctx) => 
      ctx.hasCreatorProfile && ctx.creatorStatus === "APPROVED",
  },
  // {
  //   key: "VIEW_CREATOR_GUIDE",
  //   label: "Lihat Panduan Creator",
  //   href: "/panduan-creator",
  //   variant: "outline",
  // },
  {
    key: "CONTACT_OPERATIONS",
    label: "Hubungi Tim Operations",
    href: process.env.NEXT_PUBLIC_OPERATIONS_CONTACT_URL || "https://wa.me/6281234567890",
    variant: "accent",
  },
] as const;

/**
 * Get actions that are visible for the given user context
 */
export function getVisibleActions(
  actionKeys: string[],
  userContext: { isAuthenticated: boolean; hasCreatorProfile: boolean; creatorStatus?: string | null }
): ActionConfig[] {
  return ALLOWED_ACTIONS.filter((action) => {
    // Check if action is in the requested keys
    if (!actionKeys.includes(action.key)) return false;
    
    // Check visibility rules
    if (action.visibilityRule && !action.visibilityRule(userContext as any)) {
      return false;
    }
    
    // Check auth requirement
    if (action.requiresAuth && !userContext.isAuthenticated) {
      return false;
    }
    
    return true;
  });
}

/**
 * Fallback response when no approved knowledge is available
 */
export const FALLBACK_RESPONSE = {
  content: "Untuk pertanyaan ini, saya sarankan menghubungi tim Operations Gifteria agar kamu mendapat jawaban yang paling akurat dan resmi. Tim Operations akan dengan senang hati membantu!",
  answerStatus: "ESCALATE" as const,
  actionKeys: ["CONTACT_OPERATIONS"],
};

/**
 * High-risk question patterns that require strict policy sources
 */
export const HIGH_RISK_PATTERNS = [
  /biaya|ongkos|fee|bayar/i,
  /komisi|profit|keuntungan/i,
  /payout|penarikan|withdraw|tarik saldo/i,
  /syarat|kriteria|kelayakan|eligible/i,
  /approval|diterima|disetujui/i,
  /kontrak|perjanjian|agreement/i,
  /pajak|tax/i,
  /refund|pengembalian dana/i,
  /garansi|jaminan/i,
  /lama|durasi.*approval|berapa.*hari/i,
];

/**
 * Suggested questions for empty state
 */
export const SUGGESTED_QUESTIONS = [
  "Apa itu Gifteria?",
  "Bagaimana cara mendaftar sebagai creator?",
  "Produk apa yang dapat dijual di Gifteria?",
  "Apa langkah setelah creator diterima?",
] as const;
