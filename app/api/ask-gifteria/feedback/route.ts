/**
 * Feedback endpoint for Ask Gifteria Creator Assistant
 * Allows users to rate assistant responses as helpful or not helpful
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { validateFeedbackInput } from "@/lib/creator-assistant/validation";

export const runtime = "nodejs";

/**
 * POST /api/ask-gifteria/feedback
 * Submit feedback for an assistant message
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateFeedbackInput(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error || "Input tidak valid" },
        { status: 400 }
      );
    }
    
    const { messageId, rating, reason } = validation.data!;
    
    // Get user ID if authenticated
    let userId: string | null = null;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id || null;
    } catch (err) {
      // Anonymous feedback is allowed
    }
    
    // Verify message exists
    const message = await prisma.creatorAssistantMessage.findUnique({
      where: { id: messageId },
      select: { id: true, role: true },
    });
    
    if (!message) {
      return NextResponse.json(
        { error: "Message tidak ditemukan" },
        { status: 404 }
      );
    }
    
    if (message.role !== "ASSISTANT") {
      return NextResponse.json(
        { error: "Hanya dapat memberikan feedback untuk pesan assistant" },
        { status: 400 }
      );
    }
    
    // Check if feedback already exists from this user
    const existingFeedback = await prisma.creatorAssistantFeedback.findFirst({
      where: {
        messageId,
        userId: userId || undefined,
      },
    });
    
    if (existingFeedback) {
      // Update existing feedback
      await prisma.creatorAssistantFeedback.update({
        where: { id: existingFeedback.id },
        data: {
          rating,
          reason: reason || null,
        },
      });
      
      return NextResponse.json({ 
        success: true, 
        message: "Feedback diperbarui" 
      });
    } else {
      // Create new feedback
      await prisma.creatorAssistantFeedback.create({
        data: {
          messageId,
          userId,
          rating,
          reason: reason || null,
        },
      });
      
      return NextResponse.json({ 
        success: true, 
        message: "Terima kasih atas feedback Anda" 
      });
    }
    
  } catch (err: any) {
    console.error("Feedback API error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
