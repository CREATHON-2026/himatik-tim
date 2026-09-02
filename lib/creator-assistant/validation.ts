/**
 * Input validation for Ask Gifteria Creator Assistant
 */

import { z } from "zod";
import { VALIDATION_CONFIG } from "./config";

/**
 * Schema for chat message input
 */
export const ChatMessageInputSchema = z.object({
  message: z
    .string()
    .trim()
    .min(VALIDATION_CONFIG.MIN_MESSAGE_LENGTH, "Pesan terlalu pendek")
    .max(VALIDATION_CONFIG.MAX_MESSAGE_LENGTH, "Pesan terlalu panjang"),
  conversationId: z.string().nullable().optional(),
});

export type ChatMessageInput = z.infer<typeof ChatMessageInputSchema>;

/**
 * Schema for feedback input
 */
export const FeedbackInputSchema = z.object({
  messageId: z.string().min(1, "Message ID wajib diisi"),
  rating: z.enum(["HELPFUL", "NOT_HELPFUL"]),
  reason: z.string().max(500).optional(),
});

export type FeedbackInput = z.infer<typeof FeedbackInputSchema>;

/**
 * Validate and sanitize user input
 */
export function validateChatInput(input: unknown): {
  success: boolean;
  data?: ChatMessageInput;
  error?: string;
} {
  try {
    const result = ChatMessageInputSchema.safeParse(input);
    
    if (!result.success) {
      const firstError = result.error.issues?.[0];
      return {
        success: false,
        error: firstError?.message || "Input tidak valid",
      };
    }
    
    return {
      success: true,
      data: result.data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Terjadi kesalahan validasi",
    };
  }
}

/**
 * Validate feedback input
 */
export function validateFeedbackInput(input: unknown): {
  success: boolean;
  data?: FeedbackInput;
  error?: string;
} {
  try {
    const result = FeedbackInputSchema.safeParse(input);
    
    if (!result.success) {
      const firstError = result.error.issues?.[0];
      return {
        success: false,
        error: firstError?.message || "Input tidak valid",
      };
    }
    
    return {
      success: true,
      data: result.data,
    };
  } catch (err) {
    return {
      success: false,
      error: "Terjadi kesalahan validasi",
    };
  }
}

/**
 * Sanitize text to prevent injection
 * Note: This is for logging/display purposes. 
 * React will handle rendering safety.
 */
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/\0/g, "") // Remove null bytes
    .slice(0, VALIDATION_CONFIG.MAX_MESSAGE_LENGTH);
}

/**
 * Check if a question contains high-risk patterns
 */
export function containsHighRiskPattern(question: string): boolean {
  const patterns = [
    /biaya|ongkos|fee|bayar/i,
    /komisi|profit|keuntungan/i,
    /payout|penarikan|withdraw|tarik saldo/i,
    /syarat|kriteria|kelayakan|eligible/i,
    /approval|diterima|disetujui/i,
    /kontrak|perjanjian|agreement/i,
    /pajak|tax/i,
    /refund|pengembalian dana/i,
  ];
  
  return patterns.some((pattern) => pattern.test(question));
}
