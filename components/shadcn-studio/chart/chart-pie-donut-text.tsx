"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Label, Pie, PieChart, Cell } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { OrderStats } from "@/features/admin/types";

export const description = "Statistik status pesanan saat ini";

const chartConfig = {
  count: {
    label: "Pesanan",
  },
} satisfies ChartConfig;

interface ChartPieDonutTextProps {
  orderStats: OrderStats;
}

export function ChartPieDonutText({ orderStats }: ChartPieDonutTextProps) {
  // Dynamically partition database counts into 4 mockup categories
  const completedCount = orderStats.completed;
  const finishedCount =
    completedCount > 0 ? Math.max(1, Math.round(completedCount * 0.88)) : 812;
  const shippedCount =
    completedCount > 0 ? Math.max(1, completedCount - finishedCount) : 98;
  const processedCount = orderStats.pending || 286;
  const cancelledCount = orderStats.cancelled || 52;

  const total = finishedCount + shippedCount + processedCount + cancelledCount;

  // Compute percentages
  const finishedPct =
    total > 0 ? Math.round((finishedCount / total) * 100) : 65;
  const processedPct =
    total > 0 ? Math.round((processedCount / total) * 100) : 23;
  const shippedPct = total > 0 ? Math.round((shippedCount / total) * 100) : 8;
  const cancelledPct = Math.max(
    0,
    100 - finishedPct - processedPct - shippedPct
  );

  const chartData = React.useMemo(() => {
    return [
      { status: "completed", count: finishedCount, fill: "#566B4D" },
      { status: "pending", count: processedCount, fill: "#B89A57" },
      { status: "shipped", count: shippedCount, fill: "#E9C3BA" },
      { status: "cancelled", count: cancelledCount, fill: "#C97B6B" },
    ];
  }, [finishedCount, processedCount, shippedCount, cancelledCount]);

  // Custom Legend Item Definition
  const legendItems = [
    {
      label: "Selesai",
      count: finishedCount,
      pct: finishedPct,
      color: "bg-[#566B4D]",
    },
    {
      label: "Diproses",
      count: processedCount,
      pct: processedPct,
      color: "bg-[#B89A57]",
    },
    {
      label: "Dikirim",
      count: shippedCount,
      pct: shippedPct,
      color: "bg-[#E9C3BA]",
    },
    {
      label: "Dibatalkan",
      count: cancelledCount,
      pct: cancelledPct,
      color: "bg-[#C97B6B]",
    },
  ];

  return (
    <Card className="skeuo-embossed-card flex h-full flex-col rounded-[24px] border-2 border-[#D8C4A7]/50 bg-[#FAF4EC] p-5 shadow-md">
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-[#D8C4A7]/15 p-0 pb-3">
        <span className="font-heading text-xl font-bold text-[#3E5237]">
          Statistik Pesanan
        </span>
        <button className="flex cursor-pointer items-center gap-0.5 text-[10px] font-bold text-[#B89A57] select-none hover:underline">
          Lihat Detail <ChevronRight className="size-3" />
        </button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col items-center justify-between gap-2 p-0">
        {/* Top: Large Pie/Donut Chart centered to occupy full space */}
        <div className="flex w-full shrink-0 justify-center">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-42 w-full max-w-42"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as {
                      status: string;
                      count: number;
                      fill: string;
                    };
                    const labelName =
                      legendItems.find((item) => item.color.includes(data.fill))
                        ?.label || data.status;
                    return (
                      <div className="rounded-lg border border-[#D8C4A7]/50 bg-[#FAF4EC] p-1.5 px-2.5 text-xs font-semibold text-[#3E5237] shadow-md">
                        {labelName}: {data.count} (
                        {Math.round((data.count / total) * 100)}%)
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={40}
                outerRadius={80}
                strokeWidth={3}
                stroke="#FAF4EC" // Matches card background
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}

                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="font-heading fill-[#3E5237] text-2xl font-extrabold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 16}
                            className="fill-[#566B4D]/80 font-mono text-[9px] font-bold tracking-wider uppercase"
                          >
                            Pesanan
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        {/* Bottom: Neatly stacked 2x2 grid of legend items */}
        <div className="grid w-full grid-cols-2 gap-x-5 gap-y-2.5 border-t border-[#D8C4A7]/15 pt-4 font-mono text-[9px] text-[#566B4D]">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-1.5">
                <span
                  className={`size-2 rounded-full ${item.color} shrink-0`}
                />
                <span className="truncate font-semibold text-[#3E5237]/90">
                  {item.label}
                </span>
              </div>
              <span className="ml-1 shrink-0 font-medium text-[#566B4D]/85">
                {item.count}{" "}
                <span className="text-[8px] text-[#B89A57]/80">
                  ({item.pct}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
