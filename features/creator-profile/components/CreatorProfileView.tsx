"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Pencil,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Clock,
  Building2,
  ArrowRight,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface CreatorProfileViewData {
  id?: string;
  userId?: string;
  shopName: string;
  storeName?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  description?: string | null;
  city?: string | null;
  address?: string | null;
  photoUrl?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  isVerified?: boolean;
  createdAt?: string | Date;
}

interface CreatorProfileViewProps {
  data: CreatorProfileViewData | null;
  onEdit: () => void;
}

export function CreatorProfileView({ data, onEdit }: CreatorProfileViewProps) {
  const storeName = data?.shopName || data?.storeName || "Gifteria";
  const ownerName = data?.name || "Samsung";
  const email = data?.email || "lastnameadiansyah@gmail.com";
  const phone = data?.phone || "089526293221";
  const city = data?.city || "Korean";
  const address =
    data?.address || "Jl. Andi tonro, Gowa, Sulawesi selatan";
  const description =
    data?.description ||
    "Pengrajin buket bunga segar, kado personal, dan hampers premium berkualitas tinggi.";
  const photoUrl =
    data?.photoUrl && data.photoUrl !== "/aset/profil-avatar.png"
      ? data.photoUrl
      : data?.avatarUrl && data.avatarUrl !== "/aset/profil-avatar.png"
        ? data.avatarUrl
        : "/aset/gifteria-logo.png";
  const bannerUrl =
    data?.bannerUrl && data.bannerUrl !== "/aset/profil-banner.png"
      ? data.bannerUrl
      : "/aset/gifteria-artisan-banner.jpg";

  const whatsappLink = phone && phone !== "-"
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : null;

  return (
    <div className="space-y-6">
      {/* ─── 1. MAIN STUDIO SHOWCASE HERO CARD ─── */}
      <Card className="overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-2xs hover:shadow-md hover:border-[#DDD6FE]/80 transition-all duration-300">
        {/* Studio Banner with Lavender Flowers & Gift Box */}
        <div className="relative h-56 sm:h-72 w-full bg-[#F5F3FF] overflow-hidden">
          <Image
            src={bannerUrl}
            alt={storeName}
            fill
            unoptimized
            priority
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay to soften bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" />
        </div>

        {/* Profile Content Details */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          {/* Avatar / Logo Float Overlap */}
          <div className="relative -mt-16 sm:-mt-22 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-5">
              {/* Avatar Box with Pencil Edit Button */}
              <div className="relative size-28 sm:size-36 rounded-2xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0 flex items-center justify-center group">
                <Image
                  src={photoUrl}
                  alt={storeName}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />

                {/* Floating Edit Icon Button */}
                <button
                  type="button"
                  onClick={onEdit}
                  className="absolute bottom-1.5 right-1.5 size-7 sm:size-8 rounded-full bg-white border border-[#E7E5E4] shadow-xs flex items-center justify-center text-[#78716C] hover:text-[#6355D9] hover:border-[#DDD6FE] hover:scale-105 transition-all cursor-pointer"
                  title="Ganti Foto Profil"
                >
                  <Pencil className="size-3.5 sm:size-4" />
                </button>
              </div>

              {/* Store Name & Owner Details */}
              <div className="space-y-1 pb-1">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight leading-tight">
                  {storeName}
                </h2>
                <p className="text-xs sm:text-sm text-[#78716C] flex items-center gap-1.5 font-normal">
                  <User className="size-3.5 sm:size-4 text-[#A8A29E]" />
                  <span>Pemilik / Artisan:</span>
                  <span className="font-semibold text-[#111827]">{ownerName}</span>
                </p>
              </div>
            </div>

            {/* Right Action: Pratinjau di Katalog */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/katalog" />}
                className="rounded-xl border-[#E7E5E4] text-xs sm:text-sm font-medium text-[#44403C] hover:bg-[#FAFAF9] hover:text-[#6355D9] hover:border-[#DDD6FE] hover:scale-[1.02] transition-all shadow-2xs px-4 py-2 cursor-pointer"
              >
                <ExternalLink className="mr-2 size-3.5 sm:size-4 text-[#6355D9]" />
                <span>Pratinjau di Katalog</span>
              </Button>
            </div>
          </div>

          {/* Bio, Badges & Status Operasional Toko */}
          <div className="mt-6 border-t border-[#F5F5F4] pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Filosofi & Cerita Kriya */}
            <div className="lg:col-span-7 space-y-4 relative">
              {/* Clean SVG Floral Watermark Illustration */}
              <div className="absolute right-0 top-0 size-44 opacity-35 pointer-events-none select-none">
                <Image
                  src="/aset/floral-watermark.svg"
                  alt="Floral watermark"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Subheading with lilac vertical bar */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-[#6355D9]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  FILOSOFI & CERITA KRIYA
                </h3>
              </div>

              {/* Editorial Quote Bio */}
              <div className="relative pr-8">
                <span className="text-4xl font-serif text-[#C4B5FD] leading-none absolute -left-2 -top-2 select-none">
                  “
                </span>
                <p className="font-serif text-base sm:text-lg text-[#111827] leading-relaxed pl-5 font-normal">
                  {description}
                </p>
              </div>

              {/* 3 Badges / Category focus */}
              <div className="flex flex-wrap gap-2.5 pt-2 z-10 relative">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8FF] text-[#6355D9] border border-[#DDD6FE] shadow-2xs hover:bg-[#F5F3FF] transition">
                  <Sparkles className="size-3.5 text-[#8B7CF6]" />
                  <span>Artisan Hadiah & Buket</span>
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white text-[#44403C] border border-[#E7E5E4] shadow-2xs hover:border-[#DDD6FE] transition">
                  Custom Hampers Personal
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-medium bg-white text-[#78716C] border border-[#E7E5E4] shadow-2xs hover:border-[#DDD6FE] transition">
                  Siap Pengiriman Instant & Reguler
                </span>
              </div>
            </div>

            {/* Right 5 cols: Status Operasional Toko */}
            <div className="lg:col-span-5 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9]/80 p-5 sm:p-6 space-y-4 shadow-2xs">
              <h4 className="font-bold text-xs text-[#111827] uppercase tracking-wider">
                STATUS OPERASIONAL TOKO
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#57534E]">
                {/* Penerimaan Pesanan */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E7E5E4]/60">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-[#F5F3FF] text-[#6355D9] flex items-center justify-center shrink-0 border border-[#DDD6FE]/60">
                      <ShoppingBag className="size-4" />
                    </div>
                    <span className="text-[#78716C]">Penerimaan Pesanan</span>
                  </div>
                  <span className="font-semibold text-emerald-600 flex items-center gap-2">
                    <span className="relative flex size-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
                    </span>
                    <span>Aktif / Buka</span>
                  </span>
                </div>

                {/* Asal Workshop */}
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E7E5E4]/60">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-[#F5F3FF] text-[#6355D9] flex items-center justify-center shrink-0 border border-[#DDD6FE]/60">
                      <MapPin className="size-4" />
                    </div>
                    <span className="text-[#78716C]">Asal Workshop</span>
                  </div>
                  <span className="font-semibold text-[#111827] flex items-center gap-1">
                    <span className="text-[#6355D9]">📍</span> {city}
                  </span>
                </div>

                {/* Waktu Respons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-lg bg-[#F5F3FF] text-[#6355D9] flex items-center justify-center shrink-0 border border-[#DDD6FE]/60">
                      <Clock className="size-4" />
                    </div>
                    <span className="text-[#78716C]">Waktu Respons</span>
                  </div>
                  <span className="font-semibold text-[#111827]">~ 15 Menit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ─── 2. DETAILED INFO GRID (SYMMETRICAL TWO-CARD ROW) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Card 1: Lokasi Workshop & Pengiriman */}
        <Card className="rounded-3xl border border-[#E7E5E4] bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-[#DDD6FE]/80 transition-all duration-300 flex flex-row items-center justify-between overflow-hidden min-h-[220px] relative group">
          {/* Ambient Radial Glow */}
          <div className="absolute right-4 bottom-2 size-44 bg-radial from-[#EDE9FE]/50 via-[#F5F3FF]/20 to-transparent rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

          {/* Left Content Area */}
          <div className="space-y-4 flex-1 min-w-0 pr-3 sm:pr-4 z-10 flex flex-col justify-between h-full">
            {/* Header Structure */}
            <div className="flex items-start gap-3.5">
              <div className="size-11 rounded-2xl bg-[#F5F3FF] text-[#6355D9] border border-[#DDD6FE]/80 shadow-2xs shrink-0 flex items-center justify-center group-hover:bg-[#EDE9FE] transition-colors">
                <Building2 className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111827] leading-snug">
                  LOKASI WORKSHOP & PENGIRIMAN
                </h3>
                <p className="text-[11px] text-[#78716C] mt-0.5 leading-tight">
                  Alamat studio produksi dan titik penjemputan ekspedisi pesanan.
                </p>
              </div>
            </div>

            {/* Address Capsule Block */}
            <div className="space-y-2 pt-1">
              {/* Kota Pill */}
              <div className="flex items-center justify-between gap-2.5 text-xs sm:text-sm bg-white py-2 px-3.5 rounded-2xl border border-[#E7E5E4] shadow-2xs hover:border-[#DDD6FE] transition-all w-full max-w-[280px] sm:max-w-[320px]">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="size-4 text-[#6355D9] shrink-0" />
                  <span className="text-[#78716C] font-medium text-xs">Kota</span>
                  <span className="font-bold text-xs sm:text-[13px] text-[#111827] truncate">{city}</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F5F3FF] text-[#6355D9] font-medium text-[10px] border border-[#DDD6FE]/60">
                  <Navigation className="size-2.5" /> Titik Asal
                </span>
              </div>

              {/* Alamat Pill */}
              <div className="text-xs sm:text-[12px] text-[#57534E] bg-[#FAFAF9]/80 py-2 px-3.5 rounded-2xl border border-[#E7E5E4]/80 leading-relaxed max-w-[280px] sm:max-w-[320px] flex items-start gap-2">
                <span className="text-[#A8A29E] shrink-0 text-xs">📍</span>
                <span className="line-clamp-2">{address}</span>
              </div>
            </div>
          </div>

          {/* Right 3D Isometric House Graphic */}
          <div className="relative w-32 sm:w-40 h-36 sm:h-44 shrink-0 pointer-events-none select-none flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/aset/isometric-house.png"
              alt="Workshop illustration"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </Card>

        {/* Card 2: Kontak & Komunikasi Bisnis */}
        <Card className="rounded-3xl border border-[#E7E5E4] bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-[#DDD6FE]/80 transition-all duration-300 flex flex-row items-center justify-between overflow-hidden min-h-[220px] relative group">
          {/* Ambient Radial Glow */}
          <div className="absolute right-4 bottom-2 size-44 bg-radial from-[#EDE9FE]/50 via-[#F5F3FF]/20 to-transparent rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

          {/* Left Content Area */}
          <div className="space-y-4 flex-1 min-w-0 pr-3 sm:pr-4 z-10 flex flex-col justify-between h-full">
            {/* Header Structure */}
            <div className="flex items-start gap-3.5">
              <div className="size-11 rounded-2xl bg-[#F5F3FF] text-[#6355D9] border border-[#DDD6FE]/80 shadow-2xs shrink-0 flex items-center justify-center group-hover:bg-[#EDE9FE] transition-colors">
                <Phone className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111827] leading-snug">
                  KONTAK & KOMUNIKASI BISNIS
                </h3>
                <p className="text-[11px] text-[#78716C] mt-0.5 leading-tight">
                  Kanal komunikasi langsung dengan pembeli dan notifikasi platform.
                </p>
              </div>
            </div>

            {/* Contact Action Rows */}
            <div className="space-y-2 pt-1">
              {/* WhatsApp Row */}
              <div className="flex items-center justify-between gap-2.5 text-xs sm:text-sm bg-white py-2 px-3.5 rounded-2xl border border-[#E7E5E4] shadow-2xs hover:border-[#DDD6FE] transition-all w-full max-w-[280px] sm:max-w-[320px]">
                <div className="flex items-center gap-2 min-w-0">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    width={18}
                    height={18}
                    className="size-4 shrink-0"
                    unoptimized
                  />
                  <span className="text-[#78716C] font-medium hidden sm:inline text-xs">WhatsApp</span>
                  <span className="font-bold text-xs sm:text-[13px] text-[#111827] truncate">{phone}</span>
                </div>
                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition cursor-pointer shrink-0 border border-emerald-200"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp Chat"
                      width={12}
                      height={12}
                      className="size-3 shrink-0"
                      unoptimized
                    />
                    <span>Chat</span>
                  </a>
                )}
              </div>

              {/* Email Row */}
              <div className="flex items-center justify-between gap-2.5 text-xs sm:text-sm bg-white py-2 px-3.5 rounded-2xl border border-[#E7E5E4] shadow-2xs hover:border-[#DDD6FE] transition-all w-full max-w-[280px] sm:max-w-[320px]">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="size-4 text-[#6355D9] shrink-0" />
                  <span className="text-[#78716C] font-medium hidden sm:inline text-xs">Email</span>
                  <span className="font-bold text-[11px] sm:text-xs text-[#111827] truncate">{email}</span>
                </div>
                <a
                  href={`mailto:${email}`}
                  className="p-1 rounded-lg text-[#6355D9] hover:bg-[#F5F3FF] transition shrink-0"
                  title="Kirim Email"
                >
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right 3D Chat Bubbles & Plant Pot Graphic */}
          <div className="relative w-32 sm:w-40 h-36 sm:h-44 shrink-0 pointer-events-none select-none flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/aset/chat-plant.png"
              alt="Chat & Plant illustration"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
