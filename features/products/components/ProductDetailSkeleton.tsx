import React from "react";

export function ProductDetailSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 bg-neutral-200 rounded w-24 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="w-full aspect-[4/3] bg-neutral-200 rounded-3xl" />
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-neutral-200 rounded w-16" />
            <div className="h-10 bg-neutral-200 rounded w-3/4" />
            <div className="h-6 bg-neutral-200 rounded w-1/3" />
          </div>
          <div className="h-40 bg-neutral-200 rounded-3xl" />
        </div>

        {/* Right Column Skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-48 bg-neutral-200 rounded-3xl" />
          <div className="h-64 bg-neutral-200 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
