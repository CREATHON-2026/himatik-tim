import * as React from "react";
import { Eye, ShoppingCart, Coins, TrendingUp, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProductPerformanceCardProps {
  price: number | string;
}

const formatRupiah = (price: string | number) => {
  const numericPrice = typeof price === "string" ? Number(price) : price;
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(numericPrice);
  return `Rp${formatted}`;
};

export function ProductPerformanceCard({ price }: ProductPerformanceCardProps) {
  // ponytail: define local mock stats self-contained in performance card component
  const mockViews = 1245;
  const mockSold = 48;
  const mockRevenue = mockSold * Number(price || 0);
  const mockConversion = "3.8%";

  return (
    <Card className="skeuo-flat border-border/30 mb-2 space-y-4 rounded-2xl border bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground scroll-m-20 text-base font-bold tracking-tight">
          Performa Produk
        </h2>
        <select className="border-border/30 text-muted-foreground bg-card cursor-pointer rounded-lg border px-2 py-1 text-[10px] font-semibold outline-none">
          <option>30 Hari Terakhir</option>
          <option>7 Hari Terakhir</option>
          <option>Semua Waktu</option>
        </select>
      </div>

      <div className="space-y-3.5 text-xs">
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground flex items-center gap-2">
            <Eye className="text-muted-foreground/75 size-4" /> Dilihat
          </span>
          <span className="text-foreground font-bold">
            {mockViews.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground flex items-center gap-2">
            <ShoppingCart className="text-muted-foreground/75 size-4" /> Terjual
          </span>
          <span className="text-foreground font-bold">{mockSold}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground flex items-center gap-2">
            <Coins className="text-muted-foreground/75 size-4" /> Pendapatan
          </span>
          <span className="text-foreground font-bold">
            {formatRupiah(mockRevenue)}
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-muted-foreground flex items-center gap-2">
            <TrendingUp className="text-muted-foreground/75 size-4" /> Konversi
          </span>
          <span className="text-foreground font-bold">
            {mockConversion}
          </span>
        </div>
      </div>

      <div className="border-border/10 border-t pt-4 text-center">
        <button className="text-accent-gold hover:text-accent-gold/80 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold">
          Lihat Analitik Lengkap <ArrowRight className="size-3.5" />
        </button>
      </div>
    </Card>
  );
}
