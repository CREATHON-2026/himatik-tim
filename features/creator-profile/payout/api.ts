import type { PayoutBalance, PayoutRequest, CreatePayoutRequestInput } from "./types";
import type { ApiResponse } from "../../auth/types";

const BASE_URL = "/api/creators";

/**
 * Fetch creator's real-time virtual balance (totalEarned, totalWithdrawn, availableBalance)
 * GET /api/creators/balance
 */
export async function getBalance(): Promise<PayoutBalance> {
  const res = await fetch(`${BASE_URL}/balance`, { method: "GET" });
  const json: ApiResponse<PayoutBalance> = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error || "Gagal mengambil data saldo");
  }
  return (json.data ?? json) as PayoutBalance;
}

/**
 * Submit a new payout request
 * POST /api/creators/payouts/request
 */
export async function requestPayout(input: CreatePayoutRequestInput): Promise<PayoutRequest> {
  const res = await fetch(`${BASE_URL}/payouts/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json: ApiResponse<PayoutRequest> = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error || "Gagal mengajukan penarikan dana");
  }
  return (json.data ?? json) as PayoutRequest;
}

/**
 * Fetch payout history for the logged-in creator
 * GET /api/creators/payouts
 */
export async function getPayoutHistory(): Promise<PayoutRequest[]> {
  const res = await fetch(`${BASE_URL}/payouts`, { method: "GET" });
  const json: ApiResponse<PayoutRequest[]> = await res.json();
  if (!res.ok || json.error) {
    throw new Error(json.error || "Gagal mengambil riwayat penarikan dana");
  }
  return (json.data ?? json) as PayoutRequest[];
}
