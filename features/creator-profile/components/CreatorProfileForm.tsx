"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  User,
  Sparkles,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/shadcn-studio/image/image-upload";
import Link from "next/link";

interface CreatorProfileData {
  id?: string;
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
}

interface CreatorProfileFormProps {
  initialData?: CreatorProfileData | null;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

export function CreatorProfileForm({
  initialData,
  onSaveSuccess,
  onCancel,
}: CreatorProfileFormProps) {
  const [formData, setFormData] = useState<CreatorProfileData>({
    shopName: initialData?.shopName || initialData?.storeName || "",
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    description: initialData?.description || "",
    city: initialData?.city || "Makassar",
    address: initialData?.address || "",
    photoUrl: initialData?.photoUrl || initialData?.avatarUrl || null,
    bannerUrl: initialData?.bannerUrl || null,
    isVerified: initialData?.isVerified ?? false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof CreatorProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadAvatar = async (file: File): Promise<string> => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadFormData,
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Gagal mengunggah foto profil");
    }
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.shopName.trim()) {
      toast.error("Nama Sanggar / Toko wajib diisi");
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch("/api/creator-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menyimpan perubahan profil");
      }

      toast.success("Profil sanggar kreator berhasil diperbarui!");
      onSaveSuccess?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* LEFT COLUMN: EDIT FORM (2/3 width) */}
      <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
        {/* Card 1: Identitas Sanggar */}
        <Card className="rounded-2xl border border-[#E7E5E4] bg-white shadow-xs">
          <CardHeader className="border-b border-[#E7E5E4] pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#F5F3FF] p-2.5 text-[#6355D9] border border-[#DDD6FE]">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="font-serif text-lg font-bold text-[#111827]">
                  1. Identitas Sanggar & Toko
                </CardTitle>
                <CardDescription className="text-xs text-[#78716C]">
                  Informasi merek yang akan ditampilkan pada etalase kado dan kartu produk Anda.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-5">
            {/* Banner Toko / Header Showcase */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#111827]">
                Banner Sampul Sanggar (Header Toko)
              </label>
              <div className="flex flex-col gap-3">
                <div className="w-full max-w-lg">
                  <ImageUpload
                    value={formData.bannerUrl || undefined}
                    onUpload={handleUploadAvatar}
                    onChange={(url) => setFormData((prev) => ({ ...prev, bannerUrl: url }))}
                    onRemove={() => setFormData((prev) => ({ ...prev, bannerUrl: null }))}
                    placeholder="Unggah Banner Sampul Toko"
                    helperText="Maks. 5MB (Format Landscape 16:9 atau 3:1)"
                  />
                </div>
                <p className="text-xs text-[#78716C]">
                  Banner ini akan menjadi latar belakang visual utama pada halaman profil toko Anda.
                </p>
              </div>
            </div>

            {/* Foto Profil / Logo Studio */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#111827]">
                Logo / Foto Profil Sanggar
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-28 shrink-0">
                  <ImageUpload
                    value={formData.photoUrl || undefined}
                    onUpload={handleUploadAvatar}
                    onChange={(url) => setFormData((prev) => ({ ...prev, photoUrl: url }))}
                    onRemove={() => setFormData((prev) => ({ ...prev, photoUrl: null }))}
                    placeholder="Unggah Logo"
                    helperText="Maks. 5MB"
                  />
                </div>
                <div className="text-xs text-[#78716C] space-y-1">
                  <p className="font-medium text-[#292524]">Rekomendasi Format & Ukuran:</p>
                  <p>Gunakan gambar persegi rasio 1:1 (minimal 400x400 px) dengan format JPG, PNG, atau WebP transparan.</p>
                </div>
              </div>
            </div>

            {/* Nama Toko */}
            <div className="space-y-1.5">
              <label htmlFor="shopName" className="text-xs font-semibold text-[#111827]">
                Nama Sanggar / Brand Kriya <span className="text-red-500">*</span>
              </label>
              <Input
                id="shopName"
                value={formData.shopName}
                onChange={(e) => handleChange("shopName", e.target.value)}
                placeholder="Contoh: Bloom & Craft Studio"
                className="rounded-xl border-[#E7E5E4] text-sm"
                required
              />
            </div>

            {/* Deskripsi / Filosofi */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="text-xs font-semibold text-[#111827]">
                Deskripsi Sanggar & Filosofi Kado
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Ceritakan tentang keunikan kerajinan, bahan baku, atau gaya kriya buket bunga Anda..."
                className="w-full rounded-xl border border-[#E7E5E4] bg-white p-3 text-sm text-[#111827] placeholder:text-[#A8A29E] shadow-2xs outline-none focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/30 transition-all"
              />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Lokasi & Kontak */}
        <Card className="rounded-2xl border border-[#E7E5E4] bg-white shadow-xs">
          <CardHeader className="border-b border-[#E7E5E4] pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#F5F3FF] p-2.5 text-[#6355D9] border border-[#DDD6FE]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="font-serif text-lg font-bold text-[#111827]">
                  2. Lokasi Workshop & Kontak
                </CardTitle>
                <CardDescription className="text-xs text-[#78716C]">
                  Digunakan untuk perhitungan ongkir pengiriman kado dan komunikasi pesanan custom.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nama Pemilik */}
              <div className="space-y-1.5">
                <label htmlFor="ownerName" className="text-xs font-semibold text-[#111827]">
                  Nama Pemilik / Artisan
                </label>
                <Input
                  id="ownerName"
                  startIcon={<User className="h-4 w-4" />}
                  value={formData.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Nama Lengkap"
                  className="rounded-xl"
                />
              </div>

              {/* Kota Pengiriman */}
              <div className="space-y-1.5">
                <label htmlFor="city" className="text-xs font-semibold text-[#111827]">
                  Kota Asal Workshop
                </label>
                <Input
                  id="city"
                  startIcon={<MapPin className="h-4 w-4" />}
                  value={formData.city || ""}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Contoh: Makassar"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Bisnis */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-semibold text-[#111827]">
                  Nomor WhatsApp Bisnis
                </label>
                <Input
                  id="phone"
                  startIcon={<Phone className="h-4 w-4" />}
                  value={formData.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="rounded-xl"
                />
              </div>

              {/* Email Kontak */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-[#111827]">
                  Email Notifikasi
                </label>
                <Input
                  id="email"
                  type="email"
                  startIcon={<Mail className="h-4 w-4" />}
                  value={formData.email || ""}
                  disabled
                  className="rounded-xl bg-[#FAFAF9] opacity-75 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Alamat Lengkap */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="text-xs font-semibold text-[#111827]">
                Alamat Lengkap Workshop / Studio
              </label>
              <textarea
                id="address"
                rows={2}
                value={formData.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Jl. Kerajinan No. 12, Kelurahan, Kecamatan, Kode Pos..."
                className="w-full rounded-xl border border-[#E7E5E4] bg-white p-3 text-sm text-[#111827] placeholder:text-[#A8A29E] shadow-2xs outline-none focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/30 transition-all"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSaving}
              className="h-11 px-5 rounded-xl border-[#E7E5E4] text-[#78716C] hover:bg-[#FAFAF9]"
            >
              Batal
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSaving}
            className="h-11 px-6 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white font-medium shadow-xs"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan Perubahan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Simpan Profil Sanggar
              </>
            )}
          </Button>
        </div>
      </form>

      {/* RIGHT COLUMN: LIVE SIMULATION CARD & STATUS (1/3 width) */}
      <div className="space-y-6">
        {/* Verification Status Card */}
        <Card className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#ECFDF5] p-2.5 text-[#10B981] border border-[#A7F3D0]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm text-[#111827]">Status Kreator</h4>
                <Badge variant="success">Terverifikasi</Badge>
              </div>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Sanggar Anda terdaftar aktif dan produk kado Anda dapat ditemukan di pasar katalog Gifteria.
              </p>
            </div>
          </div>
        </Card>

        {/* Live Public Marketplace Card Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-[#111827] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#6355D9]" /> Pratinjau Etalase Publik
            </span>
            <Link
              href="/katalog"
              className="text-[11px] font-medium text-[#6355D9] hover:underline flex items-center gap-1"
            >
              Lihat Katalog <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white shadow-xs">
            {/* Header banner decorative */}
            <div className="h-24 relative overflow-hidden bg-gradient-to-r from-[#6355D9] via-[#8174E8] to-[#DDD6FE] p-3">
              {formData.bannerUrl && (
                <Image
                  src={formData.bannerUrl}
                  alt="Banner Sanggar"
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
              <div className="absolute -bottom-6 left-4 z-10">
                <div className="relative size-14 rounded-xl border-2 border-white bg-white shadow-xs overflow-hidden flex items-center justify-center">
                  {formData.photoUrl ? (
                    <Image
                      src={formData.photoUrl}
                      alt={formData.shopName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <Store className="h-6 w-6 text-[#6355D9]" />
                  )}
                </div>
              </div>
            </div>

            {/* Content preview */}
            <div className="pt-8 p-4 space-y-2.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif text-base font-bold text-[#111827] line-clamp-1">
                    {formData.shopName || "Nama Sanggar Kreator"}
                  </h4>
                  <Badge variant="default" className="text-[10px] px-1.5 py-0">
                    Artisan
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#78716C] mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-[#A8A29E]" />
                  <span>{formData.city || "Makassar"}</span>
                </div>
              </div>

              <p className="text-xs text-[#44403C] line-clamp-3 leading-relaxed">
                {formData.description || "Belum ada deskripsi profil sanggar."}
              </p>

              <div className="border-t border-[#E7E5E4] pt-3 flex items-center justify-between text-[11px] text-[#78716C]">
                <span>Status Sanggar:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> Buka Menerima Pesanan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Box */}
        <div className="rounded-2xl border border-[#DDD6FE]/60 bg-[#F5F3FF]/50 p-4 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-xs text-[#6355D9]">
            <AlertCircle className="h-4 w-4" /> Tips Etalase Kreator
          </div>
          <p className="text-[11px] text-[#44403C] leading-relaxed">
            Profil yang memiliki logo jelas dan penjelasan gaya kerajinan menarik mendapatkan konversi pesanan 40% lebih tinggi.
          </p>
        </div>
      </div>
    </div>
  );
}
