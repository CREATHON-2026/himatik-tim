import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { TransactionStatus } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profil sanggar tidak ditemukan" }, { status: 404 });
    }

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        storeId: profile.id,
      },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    const product = await prisma.product.findUnique({
      where: { id: transaction.primaryProductId },
    });

    return NextResponse.json({
      id: transaction.id,
      orderNumber: `CRT-${transaction.id.substring(0, 8).toUpperCase()}`,
      status: transaction.status,
      paymentChannel: transaction.paymentChannel,
      grossAmount: transaction.grossAmount,
      netAmount: transaction.netAmount,
      buyerId: transaction.buyerId,
      createdAt: transaction.createdAt,
      paidAt: transaction.paidAt,
      completedAt: transaction.completedAt,
      product: {
        id: transaction.primaryProductId,
        name: transaction.primaryProductName,
        price: product?.price || transaction.grossAmount,
        imageUrl: product?.images?.[0] || null,
        category: transaction.primaryCategory,
        isCustomizable: product?.isCustomizable || false,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat detail pesanan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profil sanggar tidak ditemukan" }, { status: 404 });
    }

    const updated = await prisma.transaction.updateMany({
      where: {
        id,
        storeId: profile.id,
      },
      data: {
        status: status as TransactionStatus,
        completedAt: status === "COMPLETED" ? new Date() : undefined,
      },
    });

    if (updated.count === 0) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan atau tidak memiliki akses" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memperbarui pesanan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
