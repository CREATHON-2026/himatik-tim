import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan." }, { status: 404 });
    }

    // Find the associated product and creator
    const product = await prisma.product.findUnique({
      where: { id: transaction.primaryProductId },
      include: {
        creatorProfile: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: transaction.id,
      status: transaction.status,
      grossAmount: transaction.grossAmount,
      netAmount: transaction.netAmount,
      paymentChannel: transaction.paymentChannel,
      paidAt: transaction.paidAt,
      createdAt: transaction.createdAt,
      product: product
        ? {
            id: product.id,
            name: product.title,
            price: product.price,
            imageUrl: product.images?.[0] || null,
            category: product.category,
          }
        : {
            id: transaction.primaryProductId,
            name: transaction.primaryProductName,
            price: transaction.grossAmount,
            imageUrl: null,
            category: transaction.primaryCategory,
          },
      creator: product?.creatorProfile
        ? {
            id: product.creatorProfile.id,
            storeName: product.creatorProfile.storeName,
            phone: product.creatorProfile.user?.phone || "6281234567890",
            city: product.creatorProfile.city || "Makassar",
          }
        : null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat pesanan";
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
    const { status = "IN_ESCROW" } = body;

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        status,
        paidAt: status === "IN_ESCROW" ? new Date() : undefined,
      },
    });

    return NextResponse.json({ success: true, transaction: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memperbarui status pesanan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
