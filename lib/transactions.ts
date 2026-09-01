import transactionsData from "@/data/transactions.json";
import { prisma } from "@/lib/prisma";

export type TransactionStatusType =
  | "COMPLETED"
  | "PAID_ESCROW"
  | "IN_ESCROW"
  | "PENDING"
  | "PENDING_PAYMENT"
  | "CANCELLED"
  | "REFUNDED";

export interface TransactionRecord {
  id: string;
  creatorId?: string;
  storeId?: string;
  buyerId: string;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  status: TransactionStatusType;
  channel: string;
  createdAt: string;
  paidAt?: string | null;
}

export interface ProductStat {
  productId: string;
  productName: string;
  category: string;
  unitPrice: number;
  totalTransactions: number;
  completedTransactions: number;
  totalUnitsSold: number;
  uniqueBuyersCount: number;
  uniqueBuyerIds: string[];
  totalGrossRevenue: number;
  netRevenue: number;
  revenueSharePct: number;
  averageOrderValue: number;
}

export interface CategoryStat {
  category: string;
  totalTransactions: number;
  totalUnitsSold: number;
  totalGrossRevenue: number;
  revenueSharePct: number;
  productCount: number;
}

export interface ChannelStat {
  channel: string;
  channelLabel: string;
  totalTransactions: number;
  totalGrossRevenue: number;
  sharePct: number;
}

export interface TransactionSummaryStats {
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
  cancelledTransactions: number;
  escrowTransactions: number;
  totalGrossRevenue: number;
  totalNetRevenue: number;
  totalUnitsSold: number;
  uniqueBuyersCount: number;
  averageOrderValue: number;
  productStats: ProductStat[];
  categoryStats: CategoryStat[];
  channelStats: ChannelStat[];
}

export function formatRupiah(amount: number): string {
  return "Rp" + Math.round(amount).toLocaleString("id-ID");
}

export function formatNumber(amount: number): string {
  return Math.round(amount).toLocaleString("id-ID");
}

export function getChannelLabel(channel: string): string {
  switch (channel?.toLowerCase()) {
    case "katalog":
      return "Katalog Marketplace";
    case "share_link":
      return "Direct Share Link";
    case "instagram_bio":
      return "Link Bio Instagram";
    case "whatsapp":
      return "Pemesanan WhatsApp";
    default:
      return channel ? channel.charAt(0).toUpperCase() + channel.slice(1) : "Katalog Web";
  }
}

export function normalizeStatus(status: string): TransactionStatusType {
  const s = status?.toUpperCase() || "COMPLETED";
  if (s === "PAID_ESCROW" || s === "IN_ESCROW") return "PAID_ESCROW";
  if (s === "PENDING_PAYMENT" || s === "PENDING") return "PENDING_PAYMENT";
  if (s === "CANCELLED") return "CANCELLED";
  if (s === "REFUNDED") return "REFUNDED";
  return "COMPLETED";
}

/**
 * Calculates aggregated product statistics, category breakdowns, and overall KPIs from a list of transactions.
 */
export function calculateTransactionStats(
  transactions: TransactionRecord[]
): TransactionSummaryStats {
  const totalTransactions = transactions.length;

  let completedCount = 0;
  let pendingCount = 0;
  let cancelledCount = 0;
  let escrowCount = 0;
  let totalGrossRevenue = 0;
  let totalNetRevenue = 0;
  let totalUnitsSold = 0;

  const globalBuyerSet = new Set<string>();
  const productMap = new Map<
    string,
    {
      productId: string;
      productName: string;
      category: string;
      unitPrice: number;
      totalTransactions: number;
      completedTransactions: number;
      totalUnitsSold: number;
      buyerSet: Set<string>;
      totalGrossRevenue: number;
      netRevenue: number;
    }
  >();

  const categoryMap = new Map<
    string,
    {
      category: string;
      totalTransactions: number;
      totalUnitsSold: number;
      totalGrossRevenue: number;
      productIds: Set<string>;
    }
  >();

  const channelMap = new Map<
    string,
    {
      channel: string;
      totalTransactions: number;
      totalGrossRevenue: number;
    }
  >();

  for (const t of transactions) {
    const normStatus = normalizeStatus(t.status);
    const isSuccessful = normStatus === "COMPLETED" || normStatus === "PAID_ESCROW";

    if (normStatus === "COMPLETED") completedCount++;
    else if (normStatus === "PAID_ESCROW") escrowCount++;
    else if (normStatus === "PENDING_PAYMENT") pendingCount++;
    else if (normStatus === "CANCELLED" || normStatus === "REFUNDED") cancelledCount++;

    if (t.buyerId) {
      globalBuyerSet.add(t.buyerId);
    }

    if (isSuccessful) {
      totalGrossRevenue += t.grossAmount;
      totalNetRevenue += t.netAmount;
      totalUnitsSold += t.quantity || 1;
    }

    // Product Grouping
    const prodKey = t.productName || t.productId || "Lainnya";
    if (!productMap.has(prodKey)) {
      productMap.set(prodKey, {
        productId: t.productId,
        productName: t.productName || prodKey,
        category: t.category || "Umum",
        unitPrice: t.unitPrice || t.grossAmount,
        totalTransactions: 0,
        completedTransactions: 0,
        totalUnitsSold: 0,
        buyerSet: new Set<string>(),
        totalGrossRevenue: 0,
        netRevenue: 0,
      });
    }

    const prodEntry = productMap.get(prodKey)!;
    prodEntry.totalTransactions += 1;
    if (t.buyerId) prodEntry.buyerSet.add(t.buyerId);

    if (isSuccessful) {
      prodEntry.completedTransactions += 1;
      prodEntry.totalUnitsSold += t.quantity || 1;
      prodEntry.totalGrossRevenue += t.grossAmount;
      prodEntry.netRevenue += t.netAmount;
    }

    // Category Grouping
    const catKey = t.category || "Lainnya";
    if (!categoryMap.has(catKey)) {
      categoryMap.set(catKey, {
        category: catKey,
        totalTransactions: 0,
        totalUnitsSold: 0,
        totalGrossRevenue: 0,
        productIds: new Set<string>(),
      });
    }
    const catEntry = categoryMap.get(catKey)!;
    catEntry.totalTransactions += 1;
    catEntry.productIds.add(prodKey);
    if (isSuccessful) {
      catEntry.totalUnitsSold += t.quantity || 1;
      catEntry.totalGrossRevenue += t.grossAmount;
    }

    // Channel Grouping
    const chKey = t.channel || "katalog";
    if (!channelMap.has(chKey)) {
      channelMap.set(chKey, {
        channel: chKey,
        totalTransactions: 0,
        totalGrossRevenue: 0,
      });
    }
    const chEntry = channelMap.get(chKey)!;
    chEntry.totalTransactions += 1;
    if (isSuccessful) {
      chEntry.totalGrossRevenue += t.grossAmount;
    }
  }

  // Calculate Product Stats array sorted by gross revenue descending
  const productStats: ProductStat[] = Array.from(productMap.values())
    .map((p) => {
      const share =
        totalGrossRevenue > 0
          ? Math.round((p.totalGrossRevenue / totalGrossRevenue) * 1000) / 10
          : 0;
      const aov =
        p.completedTransactions > 0
          ? Math.round(p.totalGrossRevenue / p.completedTransactions)
          : 0;

      return {
        productId: p.productId,
        productName: p.productName,
        category: p.category,
        unitPrice: p.unitPrice,
        totalTransactions: p.totalTransactions,
        completedTransactions: p.completedTransactions,
        totalUnitsSold: p.totalUnitsSold,
        uniqueBuyersCount: p.buyerSet.size,
        uniqueBuyerIds: Array.from(p.buyerSet),
        totalGrossRevenue: p.totalGrossRevenue,
        netRevenue: p.netRevenue,
        revenueSharePct: share,
        averageOrderValue: aov,
      };
    })
    .sort((a, b) => b.totalGrossRevenue - a.totalGrossRevenue);

  // Category stats array
  const categoryStats: CategoryStat[] = Array.from(categoryMap.values())
    .map((c) => {
      const share =
        totalGrossRevenue > 0
          ? Math.round((c.totalGrossRevenue / totalGrossRevenue) * 1000) / 10
          : 0;
      return {
        category: c.category,
        totalTransactions: c.totalTransactions,
        totalUnitsSold: c.totalUnitsSold,
        totalGrossRevenue: c.totalGrossRevenue,
        revenueSharePct: share,
        productCount: c.productIds.size,
      };
    })
    .sort((a, b) => b.totalGrossRevenue - a.totalGrossRevenue);

  // Channel stats array
  const channelStats: ChannelStat[] = Array.from(channelMap.values())
    .map((ch) => {
      const share =
        totalGrossRevenue > 0
          ? Math.round((ch.totalGrossRevenue / totalGrossRevenue) * 1000) / 10
          : 0;
      return {
        channel: ch.channel,
        channelLabel: getChannelLabel(ch.channel),
        totalTransactions: ch.totalTransactions,
        totalGrossRevenue: ch.totalGrossRevenue,
        sharePct: share,
      };
    })
    .sort((a, b) => b.totalGrossRevenue - a.totalGrossRevenue);

  const successfulTrxCount = completedCount + escrowCount;
  const averageOrderValue =
    successfulTrxCount > 0 ? Math.round(totalGrossRevenue / successfulTrxCount) : 0;

  return {
    totalTransactions,
    completedTransactions: completedCount,
    pendingTransactions: pendingCount,
    cancelledTransactions: cancelledCount,
    escrowTransactions: escrowCount,
    totalGrossRevenue,
    totalNetRevenue,
    totalUnitsSold,
    uniqueBuyersCount: globalBuyerSet.size,
    averageOrderValue,
    productStats,
    categoryStats,
    channelStats,
  };
}

/**
 * Loads transactions from database or project JSON file fallback.
 */
export async function getCreatorTransactions(
  storeId?: string
): Promise<TransactionRecord[]> {
  try {
    if (storeId) {
      const prismaAny = prisma as unknown as {
        transaction?: {
          findMany: (args: unknown) => Promise<
            Array<{
              id: string;
              storeId: string;
              buyerId: string;
              status: string;
              paymentChannel?: string | null;
              grossAmount: number;
              platformFee: number;
              netAmount: number;
              primaryCategory: string;
              primaryProductId: string;
              primaryProductName: string;
              createdAt: Date;
              paidAt?: Date | null;
            }>
          >;
        };
      };

      if (prismaAny.transaction) {
        const dbTrx = await prismaAny.transaction.findMany({
          where: { storeId },
          orderBy: { createdAt: "desc" },
        });

        if (dbTrx && dbTrx.length > 0) {
          return dbTrx.map((t) => ({
            id: t.id,
            storeId: t.storeId,
            buyerId: t.buyerId,
            productId: t.primaryProductId,
            productName: t.primaryProductName,
            category: t.primaryCategory,
            quantity: 1,
            unitPrice: t.grossAmount,
            grossAmount: t.grossAmount,
            platformFee: t.platformFee || Math.floor(t.grossAmount * 0.05),
            netAmount: t.netAmount || t.grossAmount - Math.floor(t.grossAmount * 0.05),
            status: normalizeStatus(t.status),
            channel: t.paymentChannel || "katalog",
            createdAt: t.createdAt.toISOString(),
            paidAt: t.paidAt ? t.paidAt.toISOString() : null,
          }));
        }
      }
    }
  } catch (err) {
    console.warn("Could not load transactions from Prisma, falling back to transactions.json:", err);
  }

  // Fallback to imported @/data/transactions.json
  try {
    if (Array.isArray(transactionsData)) {
      return transactionsData.map(
        (t: {
          transaction_id: string;
          creator_id?: string;
          buyer_id: string;
          product_id: string;
          product_name: string;
          category: string;
          quantity: number;
          unit_price: number;
          gross_amount: number;
          status: string;
          channel: string;
          created_at: string;
        }) => {
          const gross = t.gross_amount || t.unit_price * (t.quantity || 1);
          const fee = Math.floor(gross * 0.05);
          return {
            id: t.transaction_id,
            creatorId: t.creator_id,
            buyerId: t.buyer_id,
            productId: t.product_id,
            productName: t.product_name,
            category: t.category,
            quantity: t.quantity || 1,
            unitPrice: t.unit_price,
            grossAmount: gross,
            platformFee: fee,
            netAmount: gross - fee,
            status: normalizeStatus(t.status),
            channel: t.channel,
            createdAt: t.created_at,
            paidAt:
              t.status === "COMPLETED" || t.status === "PAID_ESCROW"
                ? t.created_at
                : null,
          };
        }
      );
    }
  } catch (err) {
    console.error("Failed to parse transactionsData:", err);
  }

  return [];
}
