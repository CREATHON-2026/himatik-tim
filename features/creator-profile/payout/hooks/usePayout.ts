"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as payoutApi from "../api";
import type { PayoutBalance, PayoutRequest, CreatePayoutRequestInput } from "../types";

export const PAYOUT_BALANCE_QUERY_KEY = ["creator-payout-balance"];
export const PAYOUT_HISTORY_QUERY_KEY = ["creator-payout-history"];

export function usePayout() {
  const queryClient = useQueryClient();

  // Query 1: Real-time balance calculation
  const {
    data: balance,
    isLoading: isLoadingBalance,
    error: balanceError,
  } = useQuery<PayoutBalance>({
    queryKey: PAYOUT_BALANCE_QUERY_KEY,
    queryFn: payoutApi.getBalance,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Query 2: Payout request history
  const {
    data: history,
    isLoading: isLoadingHistory,
    error: historyError,
  } = useQuery<PayoutRequest[]>({
    queryKey: PAYOUT_HISTORY_QUERY_KEY,
    queryFn: payoutApi.getPayoutHistory,
    staleTime: 30 * 1000,
  });

  // Mutation: Submit payout request
  const requestMutation = useMutation<PayoutRequest, Error, CreatePayoutRequestInput>({
    mutationFn: payoutApi.requestPayout,
    onSuccess: () => {
      // Invalidate both balance and history queries upon successful request
      queryClient.invalidateQueries({ queryKey: PAYOUT_BALANCE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PAYOUT_HISTORY_QUERY_KEY });
    },
  });

  const activePayout = history?.find(
    (item) => item.status === "PENDING" || item.status === "PROCESSING"
  );

  return {
    balance,
    history: history ?? [],
    activePayout,
    isLoading: isLoadingBalance || isLoadingHistory,
    isSubmitting: requestMutation.isPending,
    error: balanceError || historyError || requestMutation.error,
    requestPayout: requestMutation.mutateAsync,
    resetMutation: requestMutation.reset,
  };
}
