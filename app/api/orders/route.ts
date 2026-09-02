import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
      quantity = 1,
      buyerName,
      buyerPhone,
      shippingCity,
      shippingAddress,
      courier,
      shippingCost = 15000,
      packagingCost = 10000,
      greetingCardText = "",
      customNotes = "",
      paymentMethod = "QRIS",
    } = body;

    if (!productId || !buyerName || !buyerPhone || !shippingAddress) {
      return NextResponse.json(
        { error: "Semua kolom wajib diisi (Produk, Nama, WhatsApp, dan Alamat)." },
        { status: 400 }
      );
    }

    // Find the product and its creator
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        creatorProfile: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan." }, { status: 404 });
    }

    const itemSubtotal = product.price * quantity;
    const grossAmount = itemSubtotal + shippingCost + packagingCost;
    const platformFee = 0; // 0% promo platform fee
    const netAmount = grossAmount - platformFee;

    // Optional logged-in user check
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const buyerId = user?.id || `guest-${buyerPhone.replace(/[^0-9]/g, "")}`;

    // Create Transaction record in Prisma
    const transaction = await prisma.transaction.create({
      data: {
        storeId: product.creatorId,
        buyerId,
        status: "PENDING",
        paymentChannel: paymentMethod,
        grossAmount,
        platformFee,
        netAmount,
        primaryCategory: product.category,
        primaryProductId: product.id,
        primaryProductName: product.title,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: transaction.id,
        status: transaction.status,
        grossAmount: transaction.grossAmount,
        paymentChannel: transaction.paymentChannel,
        product: {
          id: product.id,
          name: product.title,
          price: product.price,
          quantity,
          imageUrl: product.images?.[0] || null,
          category: product.category,
        },
        creator: {
          id: product.creatorProfile.id,
          storeName: product.creatorProfile.storeName,
          phone: product.creatorProfile.user?.phone || "6281234567890",
          city: product.creatorProfile.city || "Makassar",
        },
        buyer: {
          name: buyerName,
          phone: buyerPhone,
          city: shippingCity,
          address: shippingAddress,
          courier,
        },
        giftCustomization: {
          greetingCardText,
          customNotes,
          packagingCost,
        },
        createdAt: transaction.createdAt,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal membuat pesanan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const transactions = await prisma.transaction.findMany({
      where: user ? { buyerId: user.id } : {},
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({
      success: true,
      orders: transactions.map((t) => ({
        id: t.id,
        status: t.status,
        grossAmount: t.grossAmount,
        paymentChannel: t.paymentChannel,
        productName: t.primaryProductName || "Paket Souvenir Kriya",
        category: t.primaryCategory || "Gift Box & Hampers",
        createdAt: t.createdAt,
      })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat pesanan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

