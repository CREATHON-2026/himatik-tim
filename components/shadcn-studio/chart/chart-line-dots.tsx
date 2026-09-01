"use client";

import React from "react";
import Image from "next/image";
import { Info, ChevronDown } from "lucide-react";
import { CartesianGrid, Area, AreaChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { RevenueDataPoint } from "@/features/admin/types";

export const description = "Grafik performa pendapatan mingguan";

const chartConfig = {
  amount: {
    label: "Pendapatan",
    color: "#566B4D", // Sage Green
  },
} satisfies ChartConfig;

interface ChartLineDotsProps {
  data: RevenueDataPoint[];
}

// Format currency for display
const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: RevenueDataPoint;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const point = payload[0].payload;
    const dateVal = new Date(point.date);
    const formattedDate = dateVal.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return (
      <div className="rounded-xl border border-[#D8C4A7]/60 bg-[#FAF4EC] p-2 px-3 text-center text-xs shadow-[0_4px_16px_rgba(62,82,55,0.08)]">
        <p className="mb-0.5 font-mono text-[10px] text-[#566B4D]/70">
          {formattedDate}
        </p>
        <p className="font-heading font-bold text-[#3E5237]">
          {formatRupiah(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function ChartLineDots({ data }: ChartLineDotsProps) {
  // Format date helper (e.g., "2025-01-07" -> "07 Jan")
  const formatDateLabel = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      });
    } catch {
      return dateStr;
    }
  };

  // Memoize total revenue computation
  const totalGMV = React.useMemo(() => {
    if (!data || data.length === 0) return 128750000;
    const sum = data.reduce((acc, curr) => acc + curr.amount, 0);
    return sum || 128750000;
  }, [data]);

  return (
    <Card className="skeuo-embossed-card relative flex h-full flex-col overflow-hidden rounded-[24px] border-2 border-[#D8C4A7]/50 bg-[#FAF4EC] shadow-md">
      {/* Background Flower Outline watermark in bottom right corner */}
      <div className="pointer-events-none absolute right-[-10px] bottom-[-15px] z-0 h-24 w-24 opacity-15 select-none">
        <Image
          src="/assets/flat-flower.webp"
          alt="Flower Watermark"
          fill
          className="rotate-45 object-contain"
        />
      </div>

      <CardHeader className="z-10 space-y-0 px-5 pt-5 pb-0">
        {/* Custom Header Layout aligning exactly with mockup */}
        <div className="flex w-full items-start justify-between border-b border-[#D8C4A7]/15 pb-3">
          {/* Left vertical stack for heading & subtext */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-heading md:text:md text-xl font-bold text-[#3E5237]">
                Performa Pendapatan
              </span>
              <Info className="size-3.5 cursor-pointer text-[#566B4D]/60" />
            </div>

            {/* Amount and growth badge side-by-side on Row 2 */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="font-heading text-2xl font-extrabold tracking-tight text-[#3E5237]">
                {formatRupiah(totalGMV)}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#E8F0E5] px-1.5 py-0.5 text-[9px] font-bold text-[#3E5237]">
                ↑ 21,3%
              </span>
            </div>

            {/* Subtext on Row 3 */}
            <p className="pt-0.5 text-[10px] font-medium text-[#566B4D]/80">
              Total pendapatan bersih
            </p>
          </div>

          {/* Dropdown 7 Hari Terakhir at top right */}
          <div className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-[#D8C4A7]/45 bg-[#FAF4EC] px-2.5 py-1.5 text-[9px] font-bold text-[#566B4D] shadow-[0_1px_3px_rgba(184,154,87,0.05)] transition-all select-none hover:bg-white">
            <span>7 Hari Terakhir</span>
            <ChevronDown className="size-3 text-[#566B4D]/70" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="z-10 flex flex-1 items-end px-3 pt-4 pb-4">
        <ChartContainer config={chartConfig} className="h-[180px] w-full">
          <AreaChart
            data={data}
            margin={{
              left: 0,
              right: 10,
              top: 10,
              bottom: 0,
            }}
          >
            {/* Linear gradient definitions for curve shading */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#566B4D" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#566B4D" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#D8C4A7"
              strokeOpacity={0.25}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={formatDateLabel}
              stroke="#566B4D"
              opacity={0.8}
              style={{ fontSize: "9px", fontFamily: "monospace" }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000000} jt`)}
              stroke="#566B4D"
              opacity={0.8}
              style={{ fontSize: "9px", fontFamily: "monospace" }}
            />

            <ChartTooltip
              cursor={{ stroke: "#D8C4A7", strokeWidth: 1 }}
              content={<CustomTooltip />}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#566B4D" // Sage Green
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              dot={{
                fill: "#FAF4EC",
                stroke: "#566B4D",
                strokeWidth: 2,
                r: 4.5,
              }}
              activeDot={{
                fill: "#FAF4EC",
                stroke: "#3E5237",
                strokeWidth: 3,
                r: 6,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
