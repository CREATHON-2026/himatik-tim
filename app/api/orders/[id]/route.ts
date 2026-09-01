import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TransactionStatus } from "@prisma/client";

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

    // Resolve buyer info if available
    let buyerData = {
      name: "Pelanggan Creathon",
      phone: "081234567890",
      email: "buyer@creathon.id",
      city: "Makassar",
      address: "Jl. Boulevard No. 12, Panakkukang, Makassar, Sulawesi Selatan",
      courier: "Kurir Instant (1 - 3 Jam)",
    };

    if (transaction.buyerId) {
      if (transaction.buyerId.startsWith("guest-")) {
        const cleanPhone = transaction.buyerId.replace("guest-", "");
        buyerData.phone = cleanPhone;
        buyerData.name = `Tamu (${cleanPhone.slice(-4)})`;
      } else {
        const buyerUser = await prisma.user.findUnique({
          where: { id: transaction.buyerId },
          include: { creatorProfile: true },
        });

        if (buyerUser) {
          buyerData = {
            name: buyerUser.name || "Pelanggan Terdaftar",
            phone: buyerUser.phone || "081234567890",
            email: buyerUser.email || "buyer@creathon.id",
            city: buyerUser.creatorProfile?.city || "Makassar",
            address: buyerUser.creatorProfile?.address || "Jl. Boulevard No. 12, Makassar, Sulawesi Selatan",
            courier: "Kurir Instant (1 - 3 Jam)",
          };
        }
      }
    }

    const itemPrice = product?.price || transaction.grossAmount;
    const shippingCost = 18000;
    const packagingCost = 0;

    return NextResponse.json({
      id: transaction.id,
      orderNumber: `CRT-${transaction.id.substring(0, 8).toUpperCase()}`,
      status: transaction.status,
      grossAmount: transaction.grossAmount,
      netAmount: transaction.netAmount,
      paymentChannel: transaction.paymentChannel || "QRIS",
      paidAt: transaction.paidAt,
      createdAt: transaction.createdAt,
      product: product
        ? {
            id: product.id,
            name: product.title,
            price: product.price,
            quantity: 1,
            imageUrl: product.images?.[0] || null,
            category: product.category,
          }
        : {
            id: transaction.primaryProductId,
            name: transaction.primaryProductName,
            price: transaction.grossAmount - shippingCost,
            quantity: 1,
            imageUrl: null,
            category: transaction.primaryCategory,
          },
      pricing: {
        subtotal: itemPrice,
        shippingCost,
        packagingCost,
        platformFee: 0,
        total: transaction.grossAmount,
      },
      buyer: buyerData,
      giftCustomization: {
        greetingCardText: "Selamat atas pencapaian barunya! Semoga karya kado kriya ini membawa kebahagiaan dan berkah selalu.",
        customNotes: "Mohon tambahkan pita warna lilac/soft violet dan kemasan rapi untuk pengiriman.",
        packaging: "Paper Wrap Artisan & Ribbon",
        courier: "Kurir Instant (1 - 3 Jam)",
      },
      creator: product?.creatorProfile
        ? {
            id: product.creatorProfile.id,
            storeName: product.creatorProfile.storeName,
            phone: product.creatorProfile.user?.phone || "6281234567890",
            city: product.creatorProfile.city || "Makassar",
          }
        : {
            id: transaction.storeId,
            storeName: "Sanggar Kriya Creathon",
            phone: "6281234567890",
            city: "Makassar",
          },
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
        status: status as TransactionStatus,
        paidAt: status === "IN_ESCROW" ? new Date() : undefined,
      },
    });

    return NextResponse.json({ success: true, transaction: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memperbarui status pesanan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
