import { Pencil, Sparkles, Flower2, Award } from "lucide-react";
import type { Product } from "@/features/products/types";

interface ProductDetailInfoProps {
  product: Product;
  onEditClick: () => void;
}

const formatRupiah = (price: string | number) => {
  const numericPrice = typeof price === "string" ? Number(price) : price;
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(numericPrice);
  return `Rp${formatted}`;
};

export function ProductDetailInfo({
  product,
  onEditClick,
}: ProductDetailInfoProps) {
  return (
    <div className="flex flex-col justify-between p-1 md:p-2">
      <div className="space-y-4">
        <div>
          <span className="text-accent-gold text-[10px] font-bold tracking-wider uppercase">
            {product.category}
          </span>
          <div className="mt-1 flex items-start gap-2">
            <h1 className="font-heading text-foreground scroll-m-20 text-2xl leading-tight font-extrabold tracking-tight md:text-3xl">
              {product.name}
            </h1>
            <button
              onClick={onEditClick}
              className="border-border/30 text-muted-foreground hover:text-foreground mt-1 flex cursor-pointer items-center justify-center rounded-lg border bg-white p-1.5 shadow-2xs transition-all hover:bg-[#FAF7F0] active:scale-90"
              title="Edit Detail"
            >
              <Pencil className="size-3.5" />
            </button>
          </div>
          {product.description && (
            <p className="text-muted-foreground mt-2 line-clamp-3 text-xs leading-relaxed">
              {product.description.replace(/<[^>]*>/g, "")}
            </p>
          )}
        </div>

        {/* 3-Column Key Metrics */}
        <div className="border-border/10 grid grid-cols-12 gap-1 border-y py-2.5">
          <div className="col-span-4">
            <p className="text-muted-foreground text-[11px] font-medium">
              Harga
            </p>
            <p className="text-foreground mt-0.5 font-sans text-sm font-semibold tracking-tight md:text-base">
              {formatRupiah(product.price)}
            </p>
          </div>
          <div className="border-border/10 col-span-3 border-l pl-3">
            <p className="text-muted-foreground text-[11px] font-medium">
              Stok
            </p>
            <p className="text-foreground mt-0.5 font-sans text-sm font-semibold tracking-tight md:text-base">
              {product.stock} pcs
            </p>
          </div>
          <div className="border-border/10 col-span-5 border-l pl-3">
            <p className="text-muted-foreground text-[11px] font-medium">
              Kode SKU
            </p>
            <p
              className="md:text-md mt-0.5 truncate font-sans text-base font-semibold tracking-tight text-[#2E5A44]"
              title={product.sku || "-"}
            >
              {product.sku || "-"}
            </p>
          </div>
        </div>

        {/* Badges specifications */}
        <div className="flex flex-wrap gap-2 pt-1">
          <div className="flex items-center gap-1.5 rounded-full border border-[#E8DFC9] bg-[#FAF7F0] px-3 py-1 text-[10px] font-medium text-[#7A6B4E]">
            <Sparkles className="size-3" /> Handmade
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[#E8DFC9] bg-[#FAF7F0] px-3 py-1 text-[10px] font-medium text-[#7A6B4E]">
            <Flower2 className="size-3" /> Bunga Segar
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[#E8DFC9] bg-[#FAF7F0] px-3 py-1 text-[10px] font-medium text-[#7A6B4E]">
            <Award className="size-3" /> Premium Quality
          </div>
        </div>
      </div>

      {/* Info Table Summary */}
      <div className="border-border/20 mt-4 space-y-2 rounded-xl border bg-[#FAF7F0] p-4 text-xs">
        <div className="flex justify-between py-0.5">
          <span className="text-muted-foreground">Kategori</span>
          <span className="text-foreground font-semibold">
            {product.category}
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-muted-foreground">Tags</span>
          <span
            className="text-foreground max-w-45 truncate font-semibold"
            title={product.tags?.join(", ") || "-"}
          >
            {product.tags?.join(", ") || "-"}
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-muted-foreground">Berat (Estimasi)</span>
          <span className="text-foreground font-semibold">
            {product.weight ? `${product.weight / 1000} kg` : "-"}
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-muted-foreground">Dimensi</span>
          <span className="text-foreground font-semibold">30 cm x 35 cm</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-muted-foreground">Dibuat</span>
          <span className="text-foreground font-semibold">
            {new Date(product.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
