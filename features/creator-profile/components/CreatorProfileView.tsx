"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  User,
  Edit3,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const storeName = data?.shopName || data?.storeName || "Sanggar Kriya Creathon";
  const ownerName = data?.name || "Kreator Creathon";
  const email = data?.email || "-";
  const phone = data?.phone || "-";
  const city = data?.city || "Makassar";
  const address = data?.address || "Belum ada alamat studio lengkap yang dicantumkan.";
  const description =
    data?.description ||
    "Pengrajin kriya, buket bunga segar, kado personal, dan hampers premium berkualitas tinggi.";
  const photoUrl = data?.photoUrl || data?.avatarUrl || null;
  const bannerUrl = data?.bannerUrl || null;
  const isVerified = data?.isVerified ?? true;

  const whatsappLink = phone && phone !== "-"
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : null;

  return (
    <div className="space-y-8">
      {/* 1. Main Studio Showcase Header Card */}
      <Card className="overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-xs">
        {/* Banner with Gradient & Decorative Pattern / Image */}
        <div className="relative h-44 sm:h-60 bg-gradient-to-r from-[#6355D9] via-[#7B6FE0] to-[#DDD6FE] overflow-hidden">
          {bannerUrl && (
            <Image
              src={bannerUrl}
              alt={storeName}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="rounded-xl border-white/40 bg-white/90 backdrop-blur-md text-[#6355D9] hover:bg-white text-xs font-semibold shadow-sm transition-all"
            >
              <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit Profil Sanggar
            </Button>
          </div>
        </div>

        {/* Profile Content Details */}
        <div className="px-6 pb-8 pt-0 relative">
          {/* Avatar / Logo Float */}
          <div className="relative -mt-16 sm:-mt-20 mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative size-28 sm:size-36 rounded-2xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0 flex items-center justify-center">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={storeName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full bg-[#F5F3FF] flex items-center justify-center">
                    <Store className="size-12 text-[#6355D9]" />
                  </div>
                )}
              </div>

              <div className="space-y-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827]">
                    {storeName}
                  </h2>
                  {isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-semibold text-[#059669] border border-[#A7F3D0]">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Sanggar Terverifikasi
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#78716C] flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#A8A29E]" /> Pemilik / Artisan:{" "}
                  <span className="font-medium text-[#292524]">{ownerName}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/katalog" />}
                className="rounded-xl border-[#E7E5E4] text-xs font-medium text-[#44403C] hover:bg-[#FAFAF9]"
              >
                <ExternalLink className="mr-1.5 h-3.5 w-3.5 text-[#6355D9]" /> Pratinjau di Katalog
              </Button>
            </div>
          </div>

          {/* Bio & Description */}
          <div className="mt-6 border-t border-[#E7E5E4] pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A8A29E] mb-1.5">
                  Filosofi & Cerita Kriya
                </h3>
                <p className="text-sm text-[#334155] leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>

              {/* Badges / Category focus */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="default" className="rounded-lg text-xs py-1 px-3">
                  <Sparkles className="mr-1 h-3 w-3" /> Artisan Hadiah & Buket
                </Badge>
                <Badge variant="secondary" className="rounded-lg text-xs py-1 px-3">
                  Custom Hampers Personal
                </Badge>
                <Badge variant="outline" className="rounded-lg text-xs py-1 px-3 text-[#78716C]">
                  Siap Pengiriman Instant & Reguler
                </Badge>
              </div>
            </div>

            {/* Side Highlights */}
            <div className="rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-5 space-y-4">
              <h4 className="font-semibold text-xs text-[#111827] uppercase tracking-wider">
                Status Operasional Toko
              </h4>

              <div className="space-y-3 text-xs text-[#57534E]">
                <div className="flex items-center justify-between">
                  <span>Penerimaan Pesanan:</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Aktif / Buka
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Asal Workshop:</span>
                  <span className="font-medium text-[#111827] flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#6355D9]" /> {city}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Waktu Respons:</span>
                  <span className="font-medium text-[#111827]">~ 15 Menit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Detailed Info Grid (Lokasi & Kontak) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workshop Location Card */}
        <Card className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E7E5E4] pb-4">
            <div className="rounded-xl bg-[#F5F3FF] p-2.5 text-[#6355D9] border border-[#DDD6FE]">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#111827]">
                Lokasi Workshop & Pengiriman
              </h3>
              <p className="text-xs text-[#78716C]">
                Alamat asal pengiriman kurir dan pengambilan pesanan.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1 text-sm text-[#44403C]">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-[#6355D9] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#111827]">Kota:</span> {city}
                <p className="mt-1 text-xs text-[#78716C] leading-relaxed">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Contact Card */}
        <Card className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E7E5E4] pb-4">
            <div className="rounded-xl bg-[#F5F3FF] p-2.5 text-[#6355D9] border border-[#DDD6FE]">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#111827]">
                Kontak & Komunikasi Bisnis
              </h3>
              <p className="text-xs text-[#78716C]">
                Kanal komunikasi langsung dengan pembeli dan notifikasi platform.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1 text-sm text-[#44403C]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#6355D9]" />
                <span className="text-xs text-[#78716C]">WhatsApp:</span>
                <span className="font-medium text-[#111827]">{phone}</span>
              </div>
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Chat
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#6355D9]" />
              <span className="text-xs text-[#78716C]">Email:</span>
              <span className="font-medium text-[#111827]">{email}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
