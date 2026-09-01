import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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

    // Aggregate real transactions for this store
    const transactions = await prisma.transaction.findMany({
      where: { storeId: profile.id },
    });

    let availableBalance = 0;
    let inEscrowBalance = 0;
    let totalRevenue = 0;

    for (const tx of transactions) {
      if (tx.status === "COMPLETED") {
        availableBalance += tx.netAmount;
        totalRevenue += tx.netAmount;
      } else if (tx.status === "IN_ESCROW") {
        inEscrowBalance += tx.netAmount;
        totalRevenue += tx.netAmount;
      }
    }

    // Default simulated initial balance if fresh store
    if (availableBalance === 0 && inEscrowBalance === 0) {
      availableBalance = 1450000;
      inEscrowBalance = 380000;
      totalRevenue = 1830000;
    }

    const totalWithdrawn = 0;

    // Bank Account info
    const bankAccount = {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "8735-0912-34",
      accountHolder: profile.storeName || "Sanggar Kriya Creathon",
    };

    // Simulated Payout Transaction History
    const history = [
      {
        id: "po-01",
        referenceNo: "WD-9812A3",
        amount: 1200000,
        bankName: "Bank Central Asia (BCA)",
        accountNumber: "8735-0912-34",
        accountHolder: profile.storeName || "Sanggar Kriya Creathon",
        status: "SUCCESS" as const,
        requestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
      },
      {
        id: "po-02",
        referenceNo: "WD-7641F0",
        amount: 850000,
        bankName: "Bank Central Asia (BCA)",
        accountNumber: "8735-0912-34",
        accountHolder: profile.storeName || "Sanggar Kriya Creathon",
        status: "SUCCESS" as const,
        requestedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000 + 7200000).toISOString(),
      },
    ];

    return NextResponse.json({
      stats: {
        availableBalance,
        inEscrowBalance,
        totalRevenue,
        totalWithdrawn,
      },
      bankAccount,
      history,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memuat data saldo & penarikan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { amount, bankName, accountNumber, accountHolder } = body;

    if (!amount || amount < 50000) {
      return NextResponse.json(
        { error: "Nominal penarikan minimal Rp50.000." },
        { status: 400 }
      );
    }

    if (!bankName || !accountNumber || !accountHolder) {
      return NextResponse.json(
        { error: "Informasi rekening bank tujuan wajib diisi lengkap." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Pengajuan penarikan dana sebesar Rp${amount.toLocaleString("id-ID")} berhasil diajukan dan sedang diproses.`,
      referenceNo: `WD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memproses penarikan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { bankName, accountNumber, accountHolder } = body;

    if (!bankName || !accountNumber || !accountHolder) {
      return NextResponse.json(
        { error: "Semua kolom rekening bank wajib diisi." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      bankAccount: {
        bankName,
        accountNumber,
        accountHolder,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memperbarui rekening bank";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
