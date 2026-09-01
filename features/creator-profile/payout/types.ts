/**
 * Creator Payout Feature — TypeScript Types
 *
 * Sprint 3 Sesi 1: Payout System (CRF7)
 */

// Status lifecycle payout request — mirrors PayoutStatus enum di Prisma schema
export type PayoutStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "REJECTED";

// ------------------------------------------------------------------
// Balance (GET /api/creators/balance)
// ------------------------------------------------------------------

export interface PayoutBalance {
  /** SUM net dari order COMPLETED + escrow RELEASED (totalAmount - commissionFee) */
  totalEarned: string;
  /** SUM payout PROCESSING + COMPLETED */
  totalWithdrawn: string;
  /** totalEarned - totalWithdrawn — saldo yang bisa ditarik kreator */
  availableBalance: string;
  /** SUM net dari order aktif (PAID, PROCESSING, SHIPPED) yang escrow-nya masih HELD */
  pendingEscrow?: string;
  /** Jumlah order berstatus COMPLETED */
  totalOrdersCompleted: number;
}

// ------------------------------------------------------------------
// Payout Request (POST /api/creators/payouts/request + GET /api/creators/payouts)
// ------------------------------------------------------------------

export interface PayoutRequest {
  id: string;
  creatorId: string;
  /** Decimal dari Prisma, dikembalikan sebagai string */
  amount: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: PayoutStatus;
  adminNote?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePayoutRequestInput {
  /** Dalam satuan Rupiah. Min: 50000 */
  amount: number;
  /** Nama bank, e.g. "BCA", "BRI", "Mandiri" */
  bankName: string;
  /** Hanya angka, 6–20 digit */
  accountNumber: string;
  /** Nama pemilik rekening sesuai buku tabungan */
  accountHolder: string;
}
