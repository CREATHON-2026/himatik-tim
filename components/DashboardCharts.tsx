"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1", "#8b5cf6", "#ec4899"];

interface ProductBreakdownItem {
  name?: string;
  transactions?: number;
  revenue?: number;
  share_pct?: number;
}

interface TooltipPayloadItem {
  value: number;
  payload: {
    transactions?: number;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltipBar = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-lg shadow-xl text-xs">
        <p className="font-semibold text-white mb-2">{label}</p>
        <p className="text-emerald-400">
          Pendapatan: Rp {payload[0].value.toLocaleString("id-ID")}
        </p>
        <p className="text-blue-400">Terjual: {payload[0].payload.transactions}x</p>
      </div>
    );
  }
  return null;
};

export function ProductCharts({ productData }: { productData: ProductBreakdownItem[] }) {
  if (!productData || productData.length === 0) return null;

  // Prepare data for the charts
  const chartData = productData.map((p) => ({
    name: p.name,
    transactions: p.transactions,
    revenue: p.revenue,
    share: p.share_pct,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart: Revenue by Product */}
      <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40">
        <h3 className="text-sm font-semibold text-white mb-4">Pendapatan per Produk (28 Hari)</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={false} />
              <XAxis type="number" stroke="#525252" fontSize={11} tickFormatter={(val) => `Rp${val/1000}k`} />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#a3a3a3" 
                fontSize={11} 
                width={120} 
                tick={{ fill: "#a3a3a3" }} 
              />
              <Tooltip content={<CustomTooltipBar />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart: Product Transaction Share */}
      <div className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40">
        <h3 className="text-sm font-semibold text-white mb-4">Porsi Transaksi Produk</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="transactions"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.5)" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#171717", borderColor: "#404040", borderRadius: "8px", fontSize: "12px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: "11px", color: "#a3a3a3" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
