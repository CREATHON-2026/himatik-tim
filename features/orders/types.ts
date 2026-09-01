export interface CreatorOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  status: "PENDING" | "PAID" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}
