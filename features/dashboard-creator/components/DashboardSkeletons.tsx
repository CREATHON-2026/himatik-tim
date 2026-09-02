import React from "react";

export function MetricCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Memuat metrik ringkasan">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-2xs space-y-3 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-[#F5F5F4] rounded-full w-28" />
            <div className="size-10 bg-[#F5F5F4] rounded-xl" />
          </div>
          <div className="h-7 bg-[#F5F5F4] rounded-full w-36" />
          <div className="h-3 bg-[#F5F5F4] rounded-full w-24" />
        </div>
      ))}
    </div>
  );
}

export function PerformanceAnalyticsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Memuat diagram analitik">
      {/* Chart 1 Skeleton */}
      <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-2xs space-y-4 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-[#F5F5F4] rounded-full w-36" />
          <div className="h-4 bg-[#F5F5F4] rounded-full w-20" />
        </div>
        <div className="space-y-3 pt-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3.5 bg-[#F5F5F4] rounded-full w-32" />
                <div className="h-3.5 bg-[#F5F5F4] rounded-full w-16" />
              </div>
              <div className="h-2 bg-[#F5F5F4] rounded-full w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart 2 Skeleton */}
      <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-2xs space-y-4 animate-pulse">
        <div className="h-5 bg-[#F5F5F4] rounded-full w-40" />
        <div className="flex items-center justify-center py-4">
          <div className="size-36 rounded-full border-8 border-[#F5F5F4] flex items-center justify-center">
            <div className="h-4 bg-[#F5F5F4] rounded-full w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AiInsightSkeleton() {
  return (
    <div className="bg-gradient-to-r from-[#FAF8FF] via-[#F8F7FF] to-[#FAF8FF] border border-[#DDD6FE]/80 rounded-2xl p-6 shadow-2xs space-y-3.5 animate-pulse" aria-label="Memuat insight AI">
      <div className="flex items-center gap-3">
        <div className="h-4 bg-[#EDE9FE] rounded-full w-32" />
        <div className="h-4 bg-[#EDE9FE] rounded-full w-20" />
      </div>
      <div className="h-5 bg-[#EDE9FE] rounded-full w-3/4" />
      <div className="h-4 bg-[#EDE9FE] rounded-full w-full" />
      <div className="h-12 bg-white/80 border border-[#DDD6FE] rounded-xl w-full" />
    </div>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-2xs space-y-4 animate-pulse" aria-label="Memuat data transaksi">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="h-5 bg-[#F5F5F4] rounded-full w-44" />
        <div className="h-9 bg-[#F5F5F4] rounded-xl w-64" />
      </div>
      <div className="space-y-3 pt-2">
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="h-12 bg-[#F5F5F4] rounded-xl w-full" />
        ))}
      </div>
    </div>
  );
}
