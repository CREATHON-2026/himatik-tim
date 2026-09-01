import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { TransactionStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find creator profile
    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profil sanggar tidak ditemukan" }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const statusParam = searchParams.get("status");
    const search = searchParams.get("search") || "";

    // Build where condition
    const where: {
      storeId: string;
      status?: TransactionStatus;
      OR?: Array<{
        primaryProductName?: { contains: string; mode: "insensitive" };
        id?: { contains: string; mode: "insensitive" };
      }>;
    } = {
      storeId: profile.id,
    };

    if (statusParam && statusParam !== "ALL") {
      where.status = statusParam as TransactionStatus;
    }

    if (search.trim()) {
      where.OR = [
        { primaryProductName: { contains: search.trim(), mode: "insensitive" } },
        { id: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Fetch product details for richer response
    const productIds = Array.from(new Set(transactions.map((t) => t.primaryProductId)));
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        title: true,
        images: true,
        price: true,
        category: true,
      },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const orders = transactions.map((t) => {
      const product = productMap.get(t.primaryProductId);
      return {
        id: t.id,
        orderNumber: `CRT-${t.id.substring(0, 8).toUpperCase()}`,
        status: t.status,
        paymentChannel: t.paymentChannel,
        grossAmount: t.grossAmount,
        netAmount: t.netAmount,
        buyerId: t.buyerId,
        primaryCategory: t.primaryCategory,
        product: {
          id: t.primaryProductId,
          name: t.primaryProductName,
          imageUrl: product?.images?.[0] || null,
          category: t.primaryCategory,
          price: product?.price || t.grossAmount,
        },
        createdAt: t.createdAt,
        paidAt: t.paidAt,
      };
    });

    return NextResponse.json({
      orders,
      stats: {
        total: transactions.length,
        pending: transactions.filter((t) => t.status === "PENDING").length,
        inEscrow: transactions.filter((t) => t.status === "IN_ESCROW").length,
        completed: transactions.filter((t) => t.status === "COMPLETED").length,
        cancelled: transactions.filter((t) => t.status === "CANCELLED").length,
        totalRevenue: transactions
          .filter((t) => t.status === "COMPLETED" || t.status === "IN_ESCROW")
          .reduce((acc, curr) => acc + curr.netAmount, 0),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat pesanan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
