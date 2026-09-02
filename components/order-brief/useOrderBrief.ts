/**
 * Order Brief React Hook
 * Manages brief state and API interactions
 */

import { useState, useCallback } from "react";
import type {
  OrderBriefSnapshot,
  BriefCompleteness,
  ClarificationQuestion,
  GetBriefResponse,
  CompileBriefResponse,
} from "@/lib/order-brief/types";

interface UseOrderBriefOptions {
  conversationId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useOrderBrief({
  conversationId,
  onSuccess,
  onError,
}: UseOrderBriefOptions) {
  const [snapshot, setSnapshot] = useState<OrderBriefSnapshot | null>(null);
  const [completeness, setCompleteness] = useState<BriefCompleteness>({
    totalRequiredFields: 0,
    filledFields: 0,
    percentage: 0,
    missingFields: [],
  });
  const [clarifications, setClarifications] = useState<ClarificationQuestion[]>(
    []
  );
  const [status, setStatus] = useState<"DRAFT" | "AWAITING_REVIEW" | "AGREED">(
    "DRAFT"
  );
  const [briefId, setBriefId] = useState<string | null>(null);
  const [currentVersion, setCurrentVersion] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch existing brief
   */
  const fetchBrief = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/order-brief?conversationId=${conversationId}`
      );

      if (response.status === 404) {
        // No brief exists yet
        setSnapshot(null);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch brief");
      }

      const data: GetBriefResponse = await response.json();

      setSnapshot(data.snapshot);
      setCompleteness(data.completeness);
      setClarifications(data.clarifications);
      setStatus(data.brief.status as any);
      setBriefId(data.brief.id);
      setCurrentVersion(data.brief.currentRevision?.version || 0);

      onSuccess?.();
    } catch (err: any) {
      const errorMsg = err.message || "Gagal memuat Order Brief";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, onSuccess, onError]);

  /**
   * Compile new brief from conversation
   */
  const compileBrief = useCallback(async () => {
    setIsCompiling(true);
    setError(null);

    try {
      const response = await fetch("/api/order-brief/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          orderBriefId: briefId,
          expectedRevision: currentVersion || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to compile brief");
      }

      const data: CompileBriefResponse = await response.json();

      setSnapshot(data.snapshot);
      setCompleteness(data.completeness);
      setClarifications(data.clarifications);
      setBriefId(data.briefId);
      setCurrentVersion(data.version);
      setStatus("DRAFT");

      onSuccess?.();
      return data;
    } catch (err: any) {
      const errorMsg = err.message || "Gagal menyusun Order Brief";
      setError(errorMsg);
      onError?.(errorMsg);
      throw err;
    } finally {
      setIsCompiling(false);
    }
  }, [conversationId, briefId, currentVersion, onSuccess, onError]);

  /**
   * Refresh brief with new messages
   */
  const refreshBrief = useCallback(async () => {
    if (!briefId) {
      await compileBrief();
      return;
    }

    setIsRefreshing(true);
    setError(null);

    try {
      const response = await fetch(`/api/order-brief/${briefId}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to refresh brief");
      }

      const data = await response.json();

      if (data.snapshot) {
        setSnapshot(data.snapshot);
        setCompleteness(data.completeness);
        setClarifications(data.clarifications);
        setCurrentVersion(data.version);
      }

      onSuccess?.();
      return data;
    } catch (err: any) {
      const errorMsg = err.message || "Gagal memperbarui Order Brief";
      setError(errorMsg);
      onError?.(errorMsg);
      throw err;
    } finally {
      setIsRefreshing(false);
    }
  }, [briefId, compileBrief, onSuccess, onError]);

  /**
   * Update a field value
   */
  const updateField = useCallback(
    async (fieldPath: string, value: unknown) => {
      if (!briefId) {
        throw new Error("No brief ID available");
      }

      setError(null);

      try {
        const response = await fetch(`/api/order-brief/${briefId}/draft`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fieldPath,
            value,
            expectedRevision: currentVersion,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update field");
        }

        const data = await response.json();

        // Refetch the full brief to get updated snapshot
        await fetchBrief();

        return data;
      } catch (err: any) {
        const errorMsg = err.message || "Gagal mengupdate field";
        setError(errorMsg);
        onError?.(errorMsg);
        throw err;
      }
    },
    [briefId, currentVersion, fetchBrief, onError]
  );

  return {
    // State
    snapshot,
    completeness,
    clarifications,
    status,
    briefId,
    currentVersion,
    
    // Loading states
    isLoading,
    isCompiling,
    isRefreshing,
    error,

    // Actions
    fetchBrief,
    compileBrief,
    refreshBrief,
    updateField,
  };
}
