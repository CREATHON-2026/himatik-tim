import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { PayoutTransaction, BankAccount } from "@/features/payout/types";

// Persistent global store for payouts & bank account settings during server runtime
declare global {
  // eslint-disable-next-line no-var
  var __creatorPayoutStore: Map<string, PayoutTransaction[]> | undefined;
  // eslint-disable-next-line no-var
  var __creatorBankStore: Map<string, BankAccount> | undefined;
}

if (!globalThis.__creatorPayoutStore) {
  globalThis.__creatorPayoutStore = new Map<string, PayoutTransaction[]>();
}
if (!globalThis.__creatorBankStore) {
  globalThis.__creatorBankStore = new Map<string, BankAccount>();
}

const payoutStore = globalThis.__creatorPayoutStore;
const bankStore = globalThis.__creatorBankStore;

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

    // Aggregate real transactions from Prisma for this store
    const transactions = await prisma.transaction.findMany({
      where: { storeId: profile.id },
    });

    let completedRevenue = 0;
    let inEscrowBalance = 0;

    for (const tx of transactions) {
      if (tx.status === "COMPLETED") {
        completedRevenue += tx.netAmount;
      } else if (tx.status === "IN_ESCROW") {
        inEscrowBalance += tx.netAmount;
      }
    }

    // Get real payout history for this store (starts empty, no dummy data)
    const storePayouts = payoutStore.get(profile.id) || [];
    const totalWithdrawn = storePayouts.reduce((sum, p) => sum + p.amount, 0);
    const availableBalance = Math.max(0, completedRevenue - totalWithdrawn);
    const totalRevenue = completedRevenue + inEscrowBalance;

    // Bank Account info
    const bankAccount = bankStore.get(profile.id) || {
      bankName: "Bank Central Asia (BCA)",
      accountNumber: "8735-0912-34",
      accountHolder: profile.storeName || "Sanggar Kriya Creathon",
    };

    return NextResponse.json({
      stats: {
        availableBalance,
        inEscrowBalance,
        totalRevenue,
        totalWithdrawn,
      },
      bankAccount,
      history: storePayouts,
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

    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profil sanggar tidak ditemukan" }, { status: 404 });
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

    // Check available balance from real completed transactions minus existing payouts
    const transactions = await prisma.transaction.findMany({
      where: { storeId: profile.id, status: "COMPLETED" },
    });
    const completedRevenue = transactions.reduce((sum, tx) => sum + tx.netAmount, 0);

    const storePayouts = payoutStore.get(profile.id) || [];
    const totalWithdrawn = storePayouts.reduce((sum, p) => sum + p.amount, 0);
    const currentAvailable = Math.max(0, completedRevenue - totalWithdrawn);

    if (amount > currentAvailable) {
      return NextResponse.json(
        { error: `Nominal penarikan (Rp${amount.toLocaleString("id-ID")}) melebihi saldo tersedia (Rp${currentAvailable.toLocaleString("id-ID")}).` },
        { status: 400 }
      );
    }

    // Create real payout transaction record
    const newPayout: PayoutTransaction = {
      id: `po-${Date.now()}`,
      referenceNo: `WD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      amount,
      bankName,
      accountNumber,
      accountHolder,
      status: "PROCESSING",
      requestedAt: new Date().toISOString(),
      completedAt: null,
    };

    // Prepend to store payout list
    const updatedList = [newPayout, ...storePayouts];
    payoutStore.set(profile.id, updatedList);

    return NextResponse.json({
      success: true,
      message: `Pengajuan penarikan dana sebesar Rp${amount.toLocaleString("id-ID")} berhasil diajukan dan sedang diproses.`,
      payout: newPayout,
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

    const profile = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profil sanggar tidak ditemukan" }, { status: 404 });
    }

    const body = await request.json();
    const { bankName, accountNumber, accountHolder } = body;

    if (!bankName || !accountNumber || !accountHolder) {
      return NextResponse.json(
        { error: "Semua kolom rekening bank wajib diisi." },
        { status: 400 }
      );
    }

    const updatedAccount: BankAccount = {
      bankName,
      accountNumber,
      accountHolder,
    };

    bankStore.set(profile.id, updatedAccount);

    return NextResponse.json({
      success: true,
      bankAccount: updatedAccount,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal memperbarui rekening bank";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
