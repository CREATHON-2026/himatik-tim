import { CreatorOrder, CreatorOrderStats } from "./types";

export interface GetOrdersParams {
  status?: string;
  search?: string;
}

export interface GetOrdersResponse {
  orders: CreatorOrder[];
  stats: CreatorOrderStats;
}

export async function getCreatorOrders(params?: GetOrdersParams): Promise<GetOrdersResponse> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "ALL") query.append("status", params.status);
  if (params?.search) query.append("search", params.search);

  const res = await fetch(`/api/creator/orders?${query.toString()}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Gagal memuat daftar pesanan");
  }
  return res.json();
}

export async function getCreatorOrderDetail(id: string): Promise<CreatorOrder> {
  const res = await fetch(`/api/creator/orders/${id}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Gagal memuat detail pesanan");
  }
  return res.json();
}

export async function updateCreatorOrderStatus(id: string, status: string): Promise<{ success: boolean }> {
  const res = await fetch(`/api/creator/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Gagal memperbarui status pesanan");
  }
  return res.json();
}
