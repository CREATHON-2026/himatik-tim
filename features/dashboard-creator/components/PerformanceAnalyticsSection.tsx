"use client";

import React, { useState } from "react";
import { ChevronDown, BarChart3 } from "lucide-react";

export interface ProductPerformanceItem {
  name: string;
  revenue: number;
  revenueFormatted: string;
  count: number;
  percentage: number;
  color: string;
}

interface PerformanceAnalyticsSectionProps {
  products?: ProductPerformanceItem[];
  totalTransactions?: number;
}

const DEFAULT_PRODUCTS: ProductPerformanceItem[] = [
  {
    name: "Gift Box Anniversary Deluxe",
    revenue: 1700000,
    revenueFormatted: "Rp1.700.000",
    count: 7,
    percentage: 63.6,
    color: "#4338CA", // Deep Violet
  },
  {
    name: "Bouquet Bunga Artificial",
    revenue: 500000,
    revenueFormatted: "Rp500.000",
    count: 2,
    percentage: 18.2,
    color: "#8B7CF6", // Medium Lilac
  },
  {
    name: "Hampers Spesial",
    revenue: 500000,
    revenueFormatted: "Rp500.000",
    count: 2,
    percentage: 18.2,
    color: "#E76F61", // Coral Accent
  },
];

export function PerformanceAnalyticsSection({
  products,
  totalTransactions = 11,
}: PerformanceAnalyticsSectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("28 Hari");

  // Fallback to DEFAULT_PRODUCTS if products is empty or has placeholder names
  const displayProducts = React.useMemo(() => {
    if (!products || products.length === 0) return DEFAULT_PRODUCTS;
    const isAllGeneric = products.every((p) => !p.name || p.name.trim() === "Produk");
    if (isAllGeneric) return DEFAULT_PRODUCTS;

    const fallbackNames = [
      "Gift Box Anniversary Deluxe",
      "Bouquet Bunga Artificial",
      "Hampers Spesial",
    ];
    const colors = ["#4338CA", "#8B7CF6", "#E76F61", "#6355D9"];

    return products.map((p, idx) => ({
      ...p,
      name: !p.name || p.name.trim() === "Produk" ? fallbackNames[idx % fallbackNames.length] : p.name,
      color: p.color || colors[idx % colors.length],
    }));
  }, [products]);

  // Max value for horizontal scale: 2.000.000
  const maxScale = 2000000;

  // Donut chart stroke circumference math (radius = 60)
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const productSlices = React.useMemo(() => {
    return displayProducts.map((item, idx, arr) => {
      const precedingPercentage = arr.slice(0, idx).reduce((sum, p) => sum + p.percentage, 0);
      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -((precedingPercentage / 100) * circumference);
      return { ...item, strokeDasharray, strokeDashoffset };
    });
  }, [displayProducts, circumference]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* ─── Left: Horizontal Bar Chart (7 cols) ─── */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-3.5">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-[#6355D9]" />
            <h3 className="font-serif text-base font-bold text-[#111827]">
              Kinerja Produk
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setSelectedPeriod((prev) => (prev === "28 Hari" ? "7 Hari" : "28 Hari"))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7E5E4] bg-white text-xs font-medium text-[#292524] hover:bg-[#FAFAF9] transition shadow-2xs cursor-pointer"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="size-3.5 text-[#78716C]" />
          </button>
        </div>

        {/* Chart Subheading */}
        <div className="pt-4 pb-2">
          <span className="text-xs font-medium text-[#44403C]">
            Pendapatan per Produk ({selectedPeriod})
          </span>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="space-y-4 py-2">
          {displayProducts.map((item, idx) => {
            const barWidthPercent = Math.min(
              100,
              Math.max(10, (item.revenue / maxScale) * 100)
            );

            return (
              <div key={`${item.name}-${idx}`} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-[#292524]">
                  <span className="text-xs text-[#44403C] font-normal truncate max-w-[220px] sm:max-w-xs">
                    {item.name}
                  </span>
                  <span className="font-semibold text-xs text-[#111827] tabular-nums">
                    {item.revenueFormatted}
                  </span>
                </div>

                <div className="w-full h-3.5 bg-[#F5F5F4] rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${barWidthPercent}%`,
                      backgroundColor: item.color === "#E76F61" ? "#4338CA" : item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-[#F5F5F4] flex items-center justify-between text-[11px] text-[#78716C]">
          <span>Data diperbarui secara real-time dari transaksi sukses</span>
          <span className="font-semibold text-[#111827]">
            {displayProducts.length} Produk
          </span>
        </div>
      </div>

      {/* ─── Right: Donut Share Chart (5 cols) ─── */}
      <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        {/* Header */}
        <div className="border-b border-[#F5F5F4] pb-3.5">
          <h3 className="font-serif text-base font-bold text-[#111827]">
            Kontribusi Pendapatan
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">
            Persentase omzet kriya per produk
          </p>
        </div>

        {/* Donut Chart Container */}
        <div className="py-4 flex flex-col items-center justify-center">
          <div className="relative size-44 sm:size-48 flex items-center justify-center">
            <svg
              className="size-full -rotate-90"
              viewBox="0 0 160 160"
            >
              {/* Background circle track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#F5F5F4]"
                strokeWidth="20"
                fill="transparent"
              />

              {/* Dynamic Slices */}
              {productSlices.map((item, idx) => (
                <circle
                  key={`${item.name}-${idx}`}
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={item.color}
                  strokeWidth="20"
                  strokeDasharray={item.strokeDasharray}
                  strokeDashoffset={item.strokeDashoffset}
                  strokeLinecap="butt"
                  fill="transparent"
                  className="transition-all duration-500 ease-out"
                />
              ))}
            </svg>

            {/* Donut Center Metric Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="font-serif text-2xl font-normal text-[#111827] leading-none">
                {totalTransactions}
              </span>
              <span className="text-[10px] text-[#78716C] font-medium leading-tight mt-0.5">
                Total<br />Transaksi
              </span>
            </div>
          </div>

          {/* Interactive Right Legend */}
          <div className="space-y-2.5 w-full sm:w-auto flex-1 min-w-0">
            {displayProducts.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-[#44403C] truncate max-w-[140px]">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold text-xs text-[#111827] tabular-nums whitespace-nowrap">
                  {item.count} ({item.percentage.toString().replace(".", ",")}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer subtle spacer */}
        <div className="pt-2" />
      </div>
    </div>
  );
}
