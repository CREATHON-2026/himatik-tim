import * as React from "react";
import Image from "next/image";
import { Heart, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductMediaGalleryProps {
  imageUrl?: string | null;
  gallery: string[];
  productName: string;
  isActive: boolean;
  stock: number;
}

export function ProductMediaGallery({
  imageUrl,
  gallery,
  productName,
  isActive,
  stock,
}: ProductMediaGalleryProps) {
  const allImages = React.useMemo(() => {
    const list: string[] = [];
    if (imageUrl) list.push(imageUrl);
    if (gallery && gallery.length > 0) {
      gallery.forEach((img) => {
        if (img && img !== imageUrl) list.push(img);
      });
    }
    return list;
  }, [imageUrl, gallery]);

  const [activeImageState, setActiveImageState] = React.useState<string | null>(null);
  const activeImage = activeImageState || imageUrl || "";

  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="border-border/10 bg-muted/10 relative aspect-square w-full overflow-hidden rounded-xl border">
        {/* Status Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[9.5px] font-bold shadow-2xs select-none",
              isActive
                ? stock > 0
                  ? "border-[#C8E6C9] bg-[#E2F5E9] text-[#2E7D32]"
                  : "border-[#F8BBD0] bg-[#FCE4EC] text-[#C2185B]"
                : "border-[#FFE0B2] bg-[#FFF3E0] text-[#E65100]"
            )}
          >
            {isActive ? (stock > 0 ? "Aktif" : "Stok Habis") : "Draft"}
          </span>
        </div>

        {/* Wishlist Icon Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <button className="text-foreground/50 border-border/10 flex h-8 w-8 items-center justify-center rounded-full border bg-white/70 shadow-xs backdrop-blur-xs transition-colors hover:text-rose-500">
            <Heart className="size-4" />
          </button>
        </div>

        {activeImage ? (
          <Image
            src={activeImage}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="text-muted-foreground/30 size-12" />
          </div>
        )}
      </div>

      {/* Thumbnails list */}
      {allImages.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImageState(img)}
              className={cn(
                "bg-muted/10 relative size-12 cursor-pointer overflow-hidden rounded-lg border transition-all",
                activeImage === img
                  ? "border-accent-gold ring-accent-gold/20 ring-2"
                  : "border-border/30 hover:border-foreground/35"
              )}
            >
              <Image
                src={img}
                alt={`Preview ${i}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
