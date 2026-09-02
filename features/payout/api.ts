import { PayoutDashboardData, RequestPayoutPayload, BankAccount } from "./types";

export async function getPayoutDashboardData(): Promise<PayoutDashboardData> {
  const res = await fetch("/api/creator/payout", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Gagal memuat data saldo & penarikan");
  }

  return res.json();
}

export async function requestPayout(payload: RequestPayoutPayload): Promise<{ success: boolean; message: string }> {
  const res = await fetch("/api/creator/payout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Gagal mengajukan penarikan dana");
  }

  return res.json();
}

export async function updateBankAccount(payload: BankAccount): Promise<{ success: boolean; bankAccount: BankAccount }> {
  const res = await fetch("/api/creator/payout", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Gagal memperbarui rekening bank");
  }

  return res.json();
}
