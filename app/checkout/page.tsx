"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Truck,
  Gift,
  CreditCard,
  QrCode,
  Store,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { getProductDetail } from "@/features/products/api";

const COURIER_OPTIONS = [
  { id: "INSTANT", name: "Kurir Instant (1 - 3 Jam)", price: 25000, desc: "Rekomendasi untuk buket bunga segar & hampers kue" },
  { id: "SAMEDAY", name: "Same Day Delivery (6 - 8 Jam)", price: 18000, desc: "Tiba di hari yang sama sebelum jam 18:00" },
  { id: "REGULAR", name: "Ekspedisi Reguler (1 - 3 Hari)", price: 12000, desc: "Pengiriman standar luar kota dengan packaging aman" },
];

const PACKAGING_OPTIONS = [
  { id: "STANDARD", name: "Paper Wrap Artisan (Termasuk)", price: 0 },
  { id: "LUXURY", name: "Luxury Gift Hardbox & Satin Ribbon (+Rp15.000)", price: 15000 },
];

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export default function CheckoutPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <div className="size-10 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-[#78716C]">Menyiapkan halaman checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutFormContent />
    </React.Suspense>
  );
}

function CheckoutFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const initialQty = parseInt(searchParams.get("qty") || "1", 10);

  const [quantity] = React.useState(Math.max(1, initialQty));
  const [buyerName, setBuyerName] = React.useState("");
  const [buyerPhone, setBuyerPhone] = React.useState("");
  const [shippingCity, setShippingCity] = React.useState("Makassar");
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [selectedCourier, setSelectedCourier] = React.useState("INSTANT");
  const [selectedPackaging, setSelectedPackaging] = React.useState("STANDARD");
  const [greetingCardText, setGreetingCardText] = React.useState("");
  const [customNotes, setCustomNotes] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("QRIS");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch product detail
  const { data: product, isLoading } = useQuery({
    queryKey: ["checkout-product", productId],
    queryFn: () => getProductDetail(productId),
    enabled: !!productId,
  });

  // Calculate pricing breakdown
  const courierPrice = COURIER_OPTIONS.find((c) => c.id === selectedCourier)?.price || 0;
  const packagingPrice = PACKAGING_OPTIONS.find((p) => p.id === selectedPackaging)?.price || 0;
  const itemPrice = product ? Number(product.price) : 0;
  const subtotal = itemPrice * quantity;
  const totalAmount = subtotal + courierPrice + packagingPrice;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName.trim() || !buyerPhone.trim() || !shippingAddress.trim()) {
      toast.error("Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman!");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity,
          buyerName,
          buyerPhone,
          shippingCity,
          shippingAddress,
          courier: selectedCourier,
          shippingCost: courierPrice,
          packagingCost: packagingPrice,
          greetingCardText,
          customNotes,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Gagal membuat pesanan");
      }

      // Persist full buyer input for the invoice page
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `creathon_order_${data.order.id}`,
          JSON.stringify({
            buyerName,
            buyerPhone,
            shippingCity,
            shippingAddress,
            courier: COURIER_OPTIONS.find((c) => c.id === selectedCourier)?.name || selectedCourier,
            packaging: PACKAGING_OPTIONS.find((p) => p.id === selectedPackaging)?.name || selectedPackaging,
            greetingCardText: greetingCardText || "Semoga karya kado kriya ini membawa kebahagiaan dan berkah selalu.",
            customNotes,
            shippingCost: courierPrice,
            packagingCost: packagingPrice,
            quantity,
          })
        );
      }

      toast.success("Pesanan berhasil dibuat!");
      router.push(`/orders/${data.order.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="size-10 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-[#78716C]">Menyiapkan rincian checkout kriya...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#111827]">Produk Tidak Dipilih</h2>
        <p className="text-sm text-[#78716C]">Silakan pilih karya kado dari katalog terlebih dahulu.</p>
        <Link
          href="/katalog"
          className="px-5 py-2.5 rounded-full bg-[#6355D9] text-white text-xs font-semibold hover:bg-[#5145C6]"
        >
          Buka Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased pb-20 selection:bg-[#6355D9]/20 selection:text-[#6355D9]">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/katalog/${product.id}`}
              className="p-2 rounded-full border border-[#E7E5E4] bg-[#F5F5F4] hover:bg-white text-[#78716C] hover:text-[#111827] transition"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#111827]">
              <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-serif tracking-tight text-xl">
                Creathon<span className="text-[#6355D9]">.</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
            <Lock className="size-3.5 text-[#6355D9]" />
            <span className="hidden sm:inline font-medium">Checkout Terenkripsi & Escrow Safe</span>
          </div>
        </div>
      </header>

      {/* ─── Checkout Main Content ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── Left Form Area (7 Cols) ─── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Informasi Pengiriman & Penerima */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#F5F5F4] pb-4">
                <div className="size-8 rounded-xl bg-[#EDE9FE] text-[#6355D9] flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#111827]">Informasi Penerima Kado</h2>
                  <p className="text-xs text-[#78716C]">Data pengiriman untuk kurir dan kontak WhatsApp</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">Nama Lengkap Penerima *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Contoh: Sarah Az-Zahra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-xs outline-none bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#111827]">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-xs outline-none bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">Kota / Wilayah Layanan</label>
                <input
                  type="text"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:border-[#6355D9] text-xs outline-none bg-[#FAFAF9]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">Alamat Pengiriman Lengkap *</label>
                <textarea
                  rows={2}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Jl. Boulevard No. 12, Kel. Masale, Kec. Panakkukang (Patokan depan cafe...)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-xs outline-none bg-white"
                />
              </div>

              {/* Kurir Options */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <Truck className="size-3.5 text-[#6355D9]" /> Pilihan Kurir Pengiriman
                </label>
                <div className="space-y-2">
                  {COURIER_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedCourier(opt.id)}
                      className={`flex items-start justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedCourier === opt.id
                          ? "border-[#6355D9] bg-[#F5F3FF]/70 shadow-2xs"
                          : "border-[#E7E5E4] bg-white hover:border-[#DDD6FE]"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="courier"
                          checked={selectedCourier === opt.id}
                          onChange={() => setSelectedCourier(opt.id)}
                          className="mt-0.5 accent-[#6355D9]"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#111827]">{opt.name}</p>
                          <p className="text-[11px] text-[#78716C] mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#6355D9] shrink-0">
                        {formatRupiah(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Personalisasi Kado & Kartu Ucapan */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[#F5F5F4] pb-4">
                <div className="size-8 rounded-xl bg-[#EDE9FE] text-[#6355D9] flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#111827]">Sentuhan Personal & Kado</h2>
                  <p className="text-xs text-[#78716C]">Kartu ucapan eksklusif dan kemasan khusus kriya</p>
                </div>
              </div>

              {/* Greeting Card Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827] flex items-center justify-between">
                  <span>Pesan Kartu Ucapan (Gratis Print Kartu)</span>
                  <span className="text-[10px] text-[#A8A29E] font-normal">Opsional</span>
                </label>
                <textarea
                  rows={3}
                  value={greetingCardText}
                  onChange={(e) => setGreetingCardText(e.target.value)}
                  placeholder="Tuliskan ucapan kado Anda di sini (Contoh: Happy Birthday Sarah! Semoga hari-harimu selalu bahagia...)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-xs outline-none bg-[#FAFAF9]"
                />
              </div>

              {/* Packaging Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <Gift className="size-3.5 text-[#6355D9]" /> Pilihan Kotak & Pita Kemasan
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PACKAGING_OPTIONS.map((pkg) => (
                    <label
                      key={pkg.id}
                      onClick={() => setSelectedPackaging(pkg.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        selectedPackaging === pkg.id
                          ? "border-[#6355D9] bg-[#F5F3FF] text-[#111827] font-semibold"
                          : "border-[#E7E5E4] bg-white text-[#78716C]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="packaging"
                          checked={selectedPackaging === pkg.id}
                          onChange={() => setSelectedPackaging(pkg.id)}
                          className="accent-[#6355D9]"
                        />
                        <span className="text-xs">{pkg.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111827]">Catatan Khusus untuk Sanggar</label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Request khusus (misal: warna pita biru, jangan pakai ornamen glitter...)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:border-[#6355D9] text-xs outline-none bg-white"
                />
              </div>
            </div>

            {/* Section 3: Metode Pembayaran */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#F5F5F4] pb-4">
                <div className="size-8 rounded-xl bg-[#EDE9FE] text-[#6355D9] flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#111827]">Metode Pembayaran</h2>
                  <p className="text-xs text-[#78716C]">Proteksi saldo escrow aman hingga kado diterima</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod("QRIS")}
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "QRIS"
                      ? "border-[#6355D9] bg-[#F5F3FF] shadow-2xs"
                      : "border-[#E7E5E4] bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "QRIS"}
                    onChange={() => setPaymentMethod("QRIS")}
                    className="accent-[#6355D9]"
                  />
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white border border-[#DDD6FE] text-[#6355D9]">
                      <QrCode className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">QRIS Instan</p>
                      <p className="text-[10px] text-[#78716C]">GoPay, OVO, Dana, ShopeePay, BCA</p>
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod("VIRTUAL_ACCOUNT")}
                  className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                    paymentMethod === "VIRTUAL_ACCOUNT"
                      ? "border-[#6355D9] bg-[#F5F3FF] shadow-2xs"
                      : "border-[#E7E5E4] bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "VIRTUAL_ACCOUNT"}
                    onChange={() => setPaymentMethod("VIRTUAL_ACCOUNT")}
                    className="accent-[#6355D9]"
                  />
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white border border-[#DDD6FE] text-[#6355D9]">
                      <CreditCard className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111827]">Virtual Account Bank</p>
                      <p className="text-[10px] text-[#78716C]">BCA, Mandiri, BRI, BNI</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* ─── Right Sidebar Area: Summary (5 Cols) ─── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-[#111827] border-b border-[#F5F5F4] pb-3">
                Ringkasan Pesanan Kado
              </h3>

              {/* Product Preview Item */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-[#F5F5F4]">
                <div className="relative size-18 rounded-2xl overflow-hidden bg-[#FAF9F5] border border-[#E7E5E4] shrink-0">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center text-[#6355D9]">
                      <Gift className="size-6 opacity-40" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] block">
                    {product.category}
                  </span>
                  <h4 className="font-bold text-sm text-[#111827] truncate">{product.name}</h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#78716C]">
                      {quantity} x {formatRupiah(itemPrice)}
                    </span>
                    <span className="font-bold text-xs text-[#6355D9]">
                      {formatRupiah(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Creator Studio Info */}
              {product.creator && (
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] text-xs">
                  <Store className="size-4 text-[#6355D9] shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#111827] truncate">{product.creator.shopName}</p>
                    <p className="text-[10px] text-[#78716C]">{product.creator.district || "Makassar"}</p>
                  </div>
                </div>
              )}

              {/* Cost Calculation */}
              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-[#78716C]">
                  <span>Subtotal Produk</span>
                  <span className="font-medium text-[#111827]">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Ongkos Kirim ({selectedCourier})</span>
                  <span className="font-medium text-[#111827]">{formatRupiah(courierPrice)}</span>
                </div>
                {packagingPrice > 0 && (
                  <div className="flex justify-between text-[#78716C]">
                    <span>Kemasan Luxury Box</span>
                    <span className="font-medium text-[#111827]">{formatRupiah(packagingPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#78716C]">
                  <span>Biaya Layanan Escrow</span>
                  <span className="font-bold text-emerald-600">Gratis (Promo)</span>
                </div>

                <div className="border-t border-[#E7E5E4] pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-sm text-[#111827] block">Total Pembayaran</span>
                    <span className="text-[10px] text-[#A8A29E]">Sudah termasuk PPN & kurir</span>
                  </div>
                  <span className="font-serif font-bold text-xl text-[#6355D9]">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-[#6355D9] hover:bg-[#5145C6] active:scale-98 text-white font-semibold text-sm transition shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memproses Pesanan...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" />
                    <span>Konfirmasi & Bayar Sekarang</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-[10px] text-[#A8A29E] flex items-center justify-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>Dana disimpan di Escrow Creathon hingga pesanan Anda terima dengan puas</span>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
