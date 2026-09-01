export type PayoutStatus = "PROCESSING" | "SUCCESS" | "REJECTED";

export interface WalletBalanceStats {
  availableBalance: number;
  inEscrowBalance: number;
  totalRevenue: number;
  totalWithdrawn: number;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface PayoutTransaction {
  id: string;
  referenceNo: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: PayoutStatus;
  requestedAt: string;
  completedAt?: string | null;
}

export interface PayoutDashboardData {
  stats: WalletBalanceStats;
  bankAccount: BankAccount;
  history: PayoutTransaction[];
}

export interface RequestPayoutPayload {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}
