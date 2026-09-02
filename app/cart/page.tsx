"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Package,
  Gift,
  ChevronRight,
  Home,
} from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  shopName?: string;
  category?: string;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load cart from LocalStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("gifteria_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
        } else {
          // Default initial demo cart item for pleasant first-time user experience
          setCartItems([
            {
              id: "cart-1",
              productId: "cm3softlilac001",
              name: "Paket Souvenir Soft Lilac",
              price: 110000,
              imageUrl: "/aset/produk-soft-lilac.jpg",
              shopName: "Gifteria Studio",
              category: "Gift Box & Hampers",
              quantity: 1,
            },
          ]);
        }
      } else {
        // Initial demo cart item
        setCartItems([
          {
            id: "cart-1",
            productId: "cm3softlilac001",
            name: "Paket Souvenir Soft Lilac",
            price: 110000,
            imageUrl: "/aset/produk-soft-lilac.jpg",
            shopName: "Gifteria Studio",
            category: "Gift Box & Hampers",
            quantity: 1,
          },
        ]);
      }
    } catch {
      setCartItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    if (typeof window !== "undefined") {
      localStorage.setItem("gifteria_cart", JSON.stringify(items));
    }
  };

  const handleUpdateQty = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    saveCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
    toast.success("Produk berhasil dihapus dari keranjang!");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const estimatedShipping = cartItems.length > 0 ? 15000 : 0;
  const totalAmount = subtotal + estimatedShipping;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleProceedCheckout = (item?: CartItem) => {
    const targetItem = item || cartItems[0];
    if (!targetItem) {
      toast.error("Keranjang belanja masih kosong.");
      return;
    }
    router.push(`/checkout?productId=${targetItem.productId}&qty=${targetItem.quantity}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased pb-20 selection:bg-[#6355D9]/20 selection:text-[#6355D9]">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/katalog" className="flex items-center gap-2.5 font-bold text-lg text-[#111827] group">
            <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9] group-hover:scale-105 transition-transform">
              <Gift className="w-4 h-4" />
            </span>
            <span className="font-serif tracking-tight text-xl">
              Gifteria<span className="text-[#6355D9]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <Link href="/katalog" className="hover:text-[#111827] transition font-medium">
              Kembali ke Katalog
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1">
            <Home className="size-3.5" />
            <span>Beranda</span>
          </Link>
          <ChevronRight className="size-3 text-[#A8A29E]" />
          <Link href="/katalog" className="hover:text-[#111827]">
            Katalog
          </Link>
          <ChevronRight className="size-3 text-[#A8A29E]" />
          <span className="font-semibold text-[#111827]">Keranjang Belanja</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E7E5E4] pb-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827]">
              Keranjang Belanja Kriya
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              Periksa kembali item kado pilihan Anda sebelum melanjutkan proses kustomisasi & checkout.
            </p>
          </div>

          <span className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#EDE9FE] text-[#6355D9] text-xs font-bold border border-[#DDD6FE]">
            {cartItems.length} Karya Kriya
          </span>
        </div>

        {/* Loading State */}
        {!isLoaded ? (
          <div className="py-20 text-center space-y-3">
            <div className="size-8 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#78716C]">Memuat keranjang belanja...</p>
          </div>
        ) : cartItems.length === 0 ? (
          // ─── EMPTY CART STATE ───
          <div className="py-16 px-6 rounded-3xl bg-white border border-[#E7E5E4] text-center space-y-5 shadow-xs max-w-2xl mx-auto">
            <div className="size-20 rounded-full bg-[#FAF8FF] border border-[#DDD6FE] text-[#6355D9] flex items-center justify-center mx-auto shadow-sm">
              <ShoppingBag className="size-9" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#111827]">
                Keranjang Belanja Masih Kosong
              </h2>
              <p className="text-xs sm:text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                Anda belum menambahkan karya kado atau hampers ke keranjang. Yuk temukan berbagai buket bunga segar dan cendera mata eksklusif di katalog kami!
              </p>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white font-semibold text-xs transition shadow-xs"
            >
              <span>Jelajahi Katalog Kado</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          // ─── CART ITEMS & ORDER SUMMARY ───
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left List of Cart Items (7 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#DDD6FE] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition"
                >
                  {/* Thumbnail & Item Info */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="relative size-20 sm:size-24 rounded-2xl bg-[#F5F5F4] overflow-hidden border border-[#E7E5E4] shrink-0">
                      <Image
                        src={
                          item.imageUrl ||
                          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#6355D9]">
                        {item.category || "Gift Box"}
                      </span>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-[#111827] line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#78716C]">{item.shopName || "Gifteria Studio"}</p>
                      <div className="font-serif font-bold text-sm text-[#111827] pt-1">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>

                  {/* Stepper Qty & Remove Button */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F5F5F4]">
                    {/* Stepper */}
                    <div className="flex items-center justify-between w-24 py-1 px-2 rounded-xl border border-[#E7E5E4] bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, -1)}
                        className="size-5 rounded flex items-center justify-center text-[#78716C] hover:text-[#111827] hover:bg-[#F5F5F4] cursor-pointer"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="font-bold text-xs text-[#111827] font-sans">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQty(item.id, 1)}
                        className="size-5 rounded flex items-center justify-center text-[#78716C] hover:text-[#111827] hover:bg-[#F5F5F4] cursor-pointer"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>

                    {/* Remove Item Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 rounded-xl text-[#A8A29E] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Hapus dari keranjang"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Order Summary (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-[#E7E5E4] shadow-xs space-y-5">
                <h3 className="font-serif text-lg font-bold text-[#111827]">
                  Ringkasan Belanja
                </h3>

                <div className="space-y-3 text-xs text-[#57534E] border-b border-[#F5F5F4] pb-4">
                  <div className="flex justify-between">
                    <span className="text-[#78716C]">Total Harga Barang ({cartItems.length})</span>
                    <span className="font-semibold text-[#111827]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78716C]">Estimasi Biaya Pengiriman</span>
                    <span className="font-semibold text-[#111827]">
                      {formatPrice(estimatedShipping)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm font-bold text-[#111827]">
                  <span>Total Tagihan</span>
                  <span className="font-serif text-lg text-[#6355D9]">{formatPrice(totalAmount)}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleProceedCheckout()}
                  className="w-full h-12 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white font-semibold text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lanjut ke Checkout & Kustomisasi</span>
                  <ArrowRight className="size-4" />
                </button>

                {/* Trust Badges */}
                <div className="pt-2 grid grid-cols-3 gap-1.5 text-center text-[10px] text-[#78716C]">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="size-4 text-[#6355D9]" />
                    <span>Transaksi Aman</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-[#F5F5F4]">
                    <Truck className="size-4 text-[#6355D9]" />
                    <span>Kirim Cepat</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Package className="size-4 text-[#6355D9]" />
                    <span>Kemas Rapi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
