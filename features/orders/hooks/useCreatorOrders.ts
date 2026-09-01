"use client";

import { useState } from "react";
import { CreatorOrder } from "../types";

export function useCreatorOrders() {
  const [orders] = useState<CreatorOrder[]>([]);
  const [isLoading] = useState(false);

  return {
    orders,
    isLoading,
    pendingCount: 0,
  };
}
