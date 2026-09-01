import * as React from "react";
import { Pencil, Copy, Package, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface ProductQuickActionsProps {
  isActive: boolean;
  stock: number;
  isDuplicating: boolean;
  onToggleActive: (active: boolean) => void;
  onEditClick: () => void;
  onDuplicateClick: () => void;
  onDeleteClick: () => void;
  onSaveStock: (newStock: number) => Promise<void>;
}

export function ProductQuickActions({
  isActive,
  stock,
  isDuplicating,
  onToggleActive,
  onEditClick,
  onDuplicateClick,
  onDeleteClick,
  onSaveStock,
}: ProductQuickActionsProps) {
  const [isManagingStock, setIsManagingStock] = React.useState(false);
  const [newStockVal, setNewStockVal] = React.useState<number>(stock);


  const handleStockSubmit = async () => {
    await onSaveStock(newStockVal);
    setIsManagingStock(false);
  };

  return (
    <div className="space-y-4">
      {/* Visibility Status Card */}
      <Card className="skeuo-flat border-border/30 mb-2 space-y-4 rounded-2xl border p-5 shadow-xs bg-white">
        <h2 className="text-foreground scroll-m-20 text-base font-bold tracking-tight">
          Status Produk
        </h2>
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          {isActive
            ? "Produk ini aktif dan dapat dilihat oleh pelanggan di katalog toko Anda."
            : "Produk ini disembunyikan (Draft) dan tidak akan muncul di katalog toko."}
        </p>

        <div className="border-border/10 flex items-center justify-between border-t pt-4">
          <span className="text-foreground text-xs font-bold">Aktif</span>
          <Switch
            checked={isActive}
            onCheckedChange={onToggleActive}
            className="data-[state=checked]:bg-[#5C7D52]"
          />
        </div>
      </Card>

      {/* Quick Actions Card */}
      <Card className="skeuo-flat border-border/30 mb-2 space-y-4 rounded-2xl border p-5 shadow-xs bg-white">
        <h2 className="text-foreground scroll-m-20 text-base font-bold tracking-tight">
          Aksi Cepat
        </h2>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onEditClick}
            className="border-border/30 bg-card hover:bg-muted text-foreground/80 hover:text-foreground flex w-full cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all active:scale-98"
          >
            <Pencil className="text-muted-foreground size-4" /> Edit Produk
          </button>

          <button
            type="button"
            onClick={onDuplicateClick}
            disabled={isDuplicating}
            className="border-border/30 bg-card hover:bg-muted text-foreground/80 hover:text-foreground flex w-full cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all active:scale-98 disabled:opacity-50"
          >
            <Copy className="text-muted-foreground size-4" /> Duplikasi Produk
          </button>

          {/* Manage Stock Action Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNewStockVal(stock);
                setIsManagingStock(!isManagingStock);
              }}
              className="border-border/30 bg-card hover:bg-muted text-foreground/80 hover:text-foreground flex w-full cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all active:scale-98"
            >
              <Package className="text-muted-foreground size-4" /> Kelola Stok
            </button>

            {/* Popover overlay for updating stock */}
            {isManagingStock && (
              <div className="bg-popover text-popover-foreground border-border/40 absolute top-12 right-0 z-30 w-56 space-y-3 rounded-xl border p-4 shadow-md">
                <h4 className="text-[11px] font-bold">Ubah Jumlah Stok</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={newStockVal}
                    onChange={(e) =>
                      setNewStockVal(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    className="border-border/30 bg-card focus:border-primary h-8 w-full rounded-lg border px-2 text-xs outline-none"
                  />
                  <Button
                    onClick={handleStockSubmit}
                    size="sm"
                    className="h-8 rounded-lg text-[10px]"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onDeleteClick}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-full border border-red-200/50 bg-red-50/20 px-4 py-2.5 text-xs font-semibold text-red-600 transition-all hover:border-red-300/60 hover:bg-red-50/60 hover:text-red-700 active:scale-98"
          >
            <Trash2 className="size-4" /> Hapus Produk
          </button>
        </div>
      </Card>
    </div>
  );
}
