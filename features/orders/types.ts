export type OrderStatus = "PENDING" | "IN_ESCROW" | "COMPLETED" | "CANCELLED" | "REFUNDED";

export interface OrderItemProduct {
  id: string;
  name: string;
  imageUrl: string | null;
  category: string;
  price: number;
}

export interface CreatorOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentChannel?: string | null;
  grossAmount: number;
  netAmount: number;
  buyerId: string;
  primaryCategory: string;
  product: OrderItemProduct;
  createdAt: string;
  paidAt?: string | null;
  completedAt?: string | null;
}

export interface CreatorOrderStats {
  total: number;
  pending: number;
  inEscrow: number;
  completed: number;
  cancelled: number;
  totalRevenue: number;
}
