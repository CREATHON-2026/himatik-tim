"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  QrCode,
  ArrowLeft,
  Copy,
  MessageCircle,
  Store,
  Gift,
  ShieldCheck,
  Printer,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Truck,
  CreditCard,
  HeartHandshake,
} from "lucide-react";
import { toast } from "sonner";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

const formatRupiah = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
};

export default function OrderDetailPage({ params }: OrderPageProps) {
  const queryClient = useQueryClient();
  const resolvedParams = React.use(params);
  const orderId = resolvedParams.id;

  const [activeGuideTab, setActiveGuideTab] = React.useState<"m-banking" | "e-wallet">("m-banking");
  const [showGuide, setShowGuide] = React.useState(true);

  // Hydrate local client data if available from recent checkout session (unconditional hook at top)
  const [localMeta] = React.useState<{
    buyerName?: string;
    buyerPhone?: string;
    shippingAddress?: string;
    shippingCity?: string;
    courier?: string;
    packaging?: string;
    greetingCardText?: string;
    customNotes?: string;
    shippingCost?: number;
    packagingCost?: number;
  } | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(`creathon_order_${orderId}`);
        if (raw) return JSON.parse(raw);
      } catch {
        // graceful ignore
      }
    }
    return null;
  });

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Gagal memuat detail pesanan");
      return res.json();
    },
  });

  // Mutation to simulate payment success
  const payMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "IN_ESCROW" }),
      });
      if (!res.ok) throw new Error("Gagal memproses simulasi pembayaran");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Pembayaran berhasil diverifikasi (Escrow Safe)!");
      queryClient.invalidateQueries({ queryKey: ["order-detail", orderId] });
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "Gagal memproses";
      toast.error(message);
    },
  });

  const copyToClipboard = (text: string, label: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      toast.success(`${label} berhasil disalin!`);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleWhatsAppConfirmation = () => {
    if (!order) return;
    const phone = order.creator?.phone || "6281234567890";
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Halo ${order.creator?.storeName || "Sanggar"}, saya telah melakukan pemesanan "${order.product?.name}" dengan No. Invoice #${order.orderNumber || order.id.substring(0, 8).toUpperCase()} seharga ${formatRupiah(order.grossAmount)}. Mohon konfirmasi pesanannya via Creathon ya!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="size-10 border-4 border-[#6355D9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium text-[#78716C]">Menyiapkan rincian invoice kriya...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#111827]">Pesanan Tidak Ditemukan</h2>
        <p className="text-xs text-[#78716C]">ID Pesanan tidak valid atau transaksi telah kadaluarsa.</p>
        <Link
          href="/katalog"
          className="px-5 py-2.5 rounded-full bg-[#6355D9] text-white text-xs font-semibold hover:bg-[#5145C6]"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const isPaid = order.status === "IN_ESCROW" || order.status === "COMPLETED";

  const buyer = {
    name: localMeta?.buyerName || order.buyer?.name || "Pelanggan Creathon",
    phone: localMeta?.buyerPhone || order.buyer?.phone || "081234567890",
    address: localMeta?.shippingAddress || order.buyer?.address || "Jl. Boulevard No. 12, Makassar",
    city: localMeta?.shippingCity || order.buyer?.city || "Makassar",
    courier: localMeta?.courier || order.buyer?.courier || "Kurir Instant (1 - 3 Jam)",
  };

  const gift = {
    greetingCardText:
      localMeta?.greetingCardText ||
      order.giftCustomization?.greetingCardText ||
      "Selamat atas pencapaian barunya! Semoga karya kado kriya ini membawa kebahagiaan dan berkah selalu.",
    packaging: localMeta?.packaging || order.giftCustomization?.packaging || "Paper Wrap Artisan & Ribbon",
    customNotes: localMeta?.customNotes || order.giftCustomization?.customNotes || "",
    courier: localMeta?.courier || order.giftCustomization?.courier || "Kurir Instant (1 - 3 Jam)",
  };

  const pricing = order.pricing || {
    subtotal: order.product?.price || order.grossAmount - 18000,
    shippingCost: 18000,
    packagingCost: 0,
    platformFee: 0,
    total: order.grossAmount,
  };

  // Timeline Step Status Indicator
  const steps = [
    { title: "Pesanan Dibuat", desc: "Berhasil diverifikasi", completed: true, active: false },
    { title: "Pembayaran Escrow", desc: isPaid ? "Dana aman terverifikasi" : "Menunggu transfer", completed: isPaid, active: !isPaid },
    { title: "Dirangkai Sanggar", desc: "Proses pembuatan kado", completed: order.status === "COMPLETED", active: order.status === "IN_ESCROW" },
    { title: "Pengiriman Kurir", desc: buyer.courier || "Kurir Instant", completed: order.status === "COMPLETED", active: false },
    { title: "Selesai", desc: "Kado diterima dengan bahagia", completed: order.status === "COMPLETED", active: false },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] antialiased pb-20 selection:bg-[#6355D9]/20 selection:text-[#6355D9] print:bg-white print:pb-0">
      {/* ─── Top Navbar ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E7E5E4] bg-white/85 backdrop-blur-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/katalog" className="flex items-center gap-2.5 font-bold text-lg text-[#111827]">
            <span className="p-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-[#6355D9]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-serif tracking-tight text-xl">
              Creathon<span className="text-[#6355D9]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] text-xs font-semibold text-[#111827] transition cursor-pointer shadow-2xs"
            >
              <Printer className="size-3.5" />
              <span className="hidden sm:inline">Cetak Invoice</span>
            </button>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716C] hover:text-[#111827] transition"
            >
              <ArrowLeft className="size-3.5" /> Lanjut Belanja
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* ─── Celebratory Top Status Banner ─── */}
        <div
          className={`p-6 sm:p-7 rounded-3xl border text-center space-y-3 relative overflow-hidden transition-all ${
            isPaid
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
              : "bg-[#F5F3FF]/80 border-[#DDD6FE] text-[#111827]"
          }`}
        >
          <div
            className={`size-12 sm:size-14 rounded-full mx-auto flex items-center justify-center ${
              isPaid ? "bg-emerald-100 text-emerald-600" : "bg-[#EDE9FE] text-[#6355D9]"
            }`}
          >
            {isPaid ? <CheckCircle2 className="size-7" /> : <Clock className="size-7" />}
          </div>

          <div className="space-y-1">
            <span
              className={`px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider inline-block ${
                isPaid ? "bg-emerald-200/60 text-emerald-800" : "bg-[#EDE9FE] text-[#6355D9]"
              }`}
            >
              {isPaid ? "Pembayaran Terverifikasi (Escrow Safe)" : "Menunggu Pembayaran"}
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold">
              {isPaid ? "Pesanan Kado Berhasil Dibayar!" : "Pesanan Kado Berhasil Dibuat!"}
            </h1>
            <p className="text-xs text-[#78716C] max-w-md mx-auto">
              {isPaid
                ? "Dana Anda telah aman di Escrow Creathon. Sanggar sedang merangkai karya kado spesial Anda."
                : "Silakan selesaikan pembayaran via QRIS atau transfer bank untuk memulai perangkaian karya kriya Anda."}
            </p>
          </div>
        </div>

        {/* ─── 5-Stage Visual Order Stepper Timeline ─── */}
        <div className="bg-white rounded-3xl border border-[#E7E5E4] p-5 sm:p-6 shadow-xs print:hidden">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 min-w-[130px] flex flex-col items-center text-center relative group">
                <div
                  className={`size-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step.completed
                      ? "bg-emerald-500 text-white shadow-xs"
                      : step.active
                      ? "bg-[#6355D9] text-white ring-4 ring-[#EDE9FE]"
                      : "bg-[#F5F5F4] text-[#A8A29E]"
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="size-4" /> : idx + 1}
                </div>
                <p className="font-bold text-xs text-[#111827] mt-2">{step.title}</p>
                <p className="text-[10px] text-[#78716C] mt-0.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Two-Column Invoice & Order Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ─── Left Column: Payment QRIS & Instructions (5 Cols) ─── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Payment Summary Box */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-5 text-center">
              <div className="space-y-1 border-b border-[#F5F5F4] pb-4">
                <span className="text-[10px] text-[#A8A29E] font-bold uppercase tracking-wider block">
                  Total Tagihan Pembayaran
                </span>
                <p className="font-serif text-3xl font-bold text-[#6355D9]">
                  {formatRupiah(order.grossAmount)}
                </p>
                <button
                  onClick={() => copyToClipboard(String(order.grossAmount), "Nominal")}
                  className="text-[11px] text-[#78716C] hover:text-[#111827] inline-flex items-center gap-1 font-medium cursor-pointer pt-1"
                >
                  <Copy className="size-3" /> Salin Nominal
                </button>
              </div>

              {/* QRIS Interactive Display */}
              <div className="space-y-3">
                <div className="size-48 mx-auto rounded-2xl bg-[#FAFAF9] border-2 border-dashed border-[#DDD6FE] p-3 flex flex-col items-center justify-center relative">
                  {isPaid ? (
                    <div className="space-y-2 text-emerald-600">
                      <CheckCircle2 className="size-14 mx-auto" />
                      <span className="text-xs font-bold block uppercase tracking-wider">
                        Lunas di Escrow
                      </span>
                    </div>
                  ) : (
                    <>
                      <QrCode className="size-32 text-[#111827]" />
                      <span className="text-[10px] font-bold text-[#6355D9] mt-1">
                        QRIS Escrow Creathon
                      </span>
                    </>
                  )}
                </div>

                {!isPaid && (
                  <button
                    onClick={() => payMutation.mutate()}
                    disabled={payMutation.isPending}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition active:scale-98 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {payMutation.isPending ? "Memverifikasi..." : "Simulasikan Bayar Sekarang (Demo)"}
                  </button>
                )}
              </div>

              {/* Escrow Badge */}
              <div className="pt-2 text-[11px] text-[#78716C] bg-[#F5F3FF] p-3 rounded-xl border border-[#DDD6FE] flex items-center justify-center gap-2">
                <ShieldCheck className="size-4 text-[#6355D9] shrink-0" />
                <span>Dana aman di Escrow Creathon hingga kado diterima dengan puas.</span>
              </div>
            </div>

            {/* Accordion: Panduan Pembayaran QRIS */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-5 shadow-xs space-y-3 print:hidden">
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#111827] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-[#6355D9]" />
                  <span>Cara Pembayaran QRIS</span>
                </div>
                {showGuide ? <ChevronUp className="size-4 text-[#78716C]" /> : <ChevronDown className="size-4 text-[#78716C]" />}
              </button>

              {showGuide && (
                <div className="space-y-3 pt-2 text-xs text-[#78716C]">
                  <div className="flex gap-2 border-b border-[#F5F5F4] pb-2">
                    <button
                      onClick={() => setActiveGuideTab("m-banking")}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                        activeGuideTab === "m-banking"
                          ? "bg-[#6355D9] text-white"
                          : "bg-[#F5F5F4] text-[#78716C]"
                      }`}
                    >
                      M-Banking (BCA/Mandiri/BRI)
                    </button>
                    <button
                      onClick={() => setActiveGuideTab("e-wallet")}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                        activeGuideTab === "e-wallet"
                          ? "bg-[#6355D9] text-white"
                          : "bg-[#F5F5F4] text-[#78716C]"
                      }`}
                    >
                      E-Wallet (GoPay/OVO/ShopeePay)
                    </button>
                  </div>

                  {activeGuideTab === "m-banking" ? (
                    <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
                      <li>Buka aplikasi Mobile Banking pilihan Anda (BCA, Livin by Mandiri, BRImo).</li>
                      <li>Pilih menu <strong>QRIS / Scan QR</strong>.</li>
                      <li>Arahkan kamera ke barcode QRIS di atas.</li>
                      <li>Pastikan nominal tagihan dan nama merchant sesuai, lalu konfirmasi dengan PIN Anda.</li>
                    </ol>
                  ) : (
                    <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
                      <li>Buka aplikasi GoPay, OVO, Dana, atau ShopeePay.</li>
                      <li>Pilih tombol <strong>Bayar / QRIS</strong>.</li>
                      <li>Pindai barcode QRIS di layar.</li>
                      <li>Periksa nominal lalu selesaikan pembayaran.</li>
                    </ol>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ─── Right Column: Product Breakdown, Card Preview & Receiver Info (7 Cols) ─── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Invoice Header Details */}
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-3.5">
                <div>
                  <span className="text-[10px] text-[#A8A29E] uppercase font-bold block">No. Invoice Resmi</span>
                  <span className="font-mono text-sm font-bold text-[#111827]">
                    #{order.orderNumber || `CRT-${order.id.substring(0, 8).toUpperCase()}`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#A8A29E] uppercase font-bold block">Tanggal Pemesanan</span>
                  <span className="text-xs font-semibold text-[#111827]">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Product Preview Card */}
              <div className="flex items-start gap-4 pb-4 border-b border-[#F5F5F4]">
                <div className="relative size-20 rounded-2xl overflow-hidden bg-[#FAF9F5] border border-[#E7E5E4] shrink-0">
                  {order.product?.imageUrl ? (
                    <Image
                      src={order.product.imageUrl}
                      alt={order.product.name}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center text-[#6355D9]">
                      <Gift className="size-8 opacity-40" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29E] block">
                    {order.product?.category || "Gift Kriya"}
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#111827] truncate">
                    {order.product?.name}
                  </h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#78716C]">
                      1 x {formatRupiah(pricing.subtotal)}
                    </span>
                    <span className="font-bold text-xs text-[#6355D9]">
                      {formatRupiah(pricing.subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Greeting Card Message Box */}
              <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#6355D9]">
                    <Sparkles className="size-3.5" />
                    <span>Pesan Kartu Ucapan Kado</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(gift.greetingCardText, "Pesan kartu ucapan")}
                    className="text-[10px] text-[#6355D9] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Copy className="size-3" /> Salin Pesan
                  </button>
                </div>
                <p className="font-serif text-xs text-[#111827] italic leading-relaxed">
                  &ldquo;{gift.greetingCardText}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-[#78716C] border-t border-[#DDD6FE]/40">
                  <span>Kemasan: <strong className="text-[#111827]">{gift.packaging}</strong></span>
                </div>
              </div>

              {/* Delivery & Receiver Details */}
              <div className="space-y-3 pt-1">
                <h4 className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                  <Truck className="size-3.5 text-[#6355D9]" /> Rincian Pengiriman & Penerima
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-1">
                    <span className="text-[10px] font-bold text-[#A8A29E] uppercase block">Penerima Kado</span>
                    <p className="font-bold text-[#111827]">{buyer.name}</p>
                    <p className="text-[#78716C] flex items-center gap-1">
                      <Phone className="size-3 text-[#6355D9]" /> {buyer.phone}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAFAF9] border border-[#E7E5E4] space-y-1">
                    <span className="text-[10px] font-bold text-[#A8A29E] uppercase block">Kurir & Alamat</span>
                    <p className="font-bold text-[#111827]">{buyer.courier || "Kurir Instant"}</p>
                    <p className="text-[#78716C] flex items-start gap-1">
                      <MapPin className="size-3 text-[#6355D9] shrink-0 mt-0.5" />
                      <span className="truncate">{buyer.address}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Transparent Financial Calculation */}
              <div className="space-y-2 text-xs pt-2 border-t border-[#F5F5F4]">
                <div className="flex justify-between text-[#78716C]">
                  <span>Subtotal Karya Kriya</span>
                  <span className="font-medium text-[#111827]">{formatRupiah(pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Ongkos Kirim ({buyer.courier || "Instant"})</span>
                  <span className="font-medium text-[#111827]">{formatRupiah(pricing.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Biaya Proteksi Escrow</span>
                  <span className="font-bold text-emerald-600">Gratis (Promo)</span>
                </div>

                <div className="border-t border-[#E7E5E4] pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-sm text-[#111827] block">Total Pembayaran</span>
                    <span className="text-[10px] text-[#A8A29E]">Termasuk PPN dan proteksi kado</span>
                  </div>
                  <span className="font-serif font-bold text-xl text-[#6355D9]">
                    {formatRupiah(order.grossAmount)}
                  </span>
                </div>
              </div>

              {/* Creator Store Info & Direct WhatsApp Confirmation */}
              {order.creator && (
                <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] space-y-3 print:hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Store className="size-4 text-[#6355D9]" />
                      <span className="text-xs font-bold text-[#111827]">
                        Sanggar: {order.creator.storeName}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#78716C]">{order.creator.city}</span>
                  </div>

                  <button
                    onClick={handleWhatsAppConfirmation}
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="size-4" />
                    <span>Kirim Bukti / Rincian ke WhatsApp Sanggar</span>
                  </button>
                </div>
              )}

              {/* Guarantee Footer */}
              <div className="pt-2 text-center text-[10px] text-[#A8A29E] flex items-center justify-center gap-1.5">
                <HeartHandshake className="size-3.5 text-emerald-600" />
                <span>Karya dikerjakan dengan sepenuh hati oleh pengrajin sanggar terpercaya</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
