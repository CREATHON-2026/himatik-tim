"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "@/components/shadcn-studio/image/image-upload";
import { LogoUpload } from "@/components/shadcn-studio/image/logo-upload";
import {
  MapPin,
  Clock,
  Mail,
  Camera,
  ArrowLeft,
  Save,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  shopName: z
    .string()
    .min(1, "Nama toko wajib diisi")
    .max(50, "Nama toko maksimal 50 karakter"),
  bio: z
    .string()
    .max(160, "Slogan/deskripsi maksimal 160 karakter")
    .optional()
    .nullable(),
  whatsapp: z
    .string()
    .max(20, "Nomor WhatsApp maksimal 20 karakter")
    .optional()
    .nullable(),
  instagram: z
    .string()
    .max(30, "Instagram maksimal 30 karakter")
    .optional()
    .nullable(),
  facebook: z
    .string()
    .max(30, "Facebook maksimal 30 karakter")
    .optional()
    .nullable(),
  address: z
    .string()
    .max(120, "Alamat maksimal 120 karakter")
    .optional()
    .nullable(),
  openingHours: z
    .string()
    .max(80, "Jam operasional maksimal 80 karakter")
    .optional()
    .nullable(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormCardProps {
  initialData?: {
    shopName?: string;
    photoUrl?: string | null;
    bannerUrl?: string | null;
    bio?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    address?: string | null;
    openingHours?: string | null;
    verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
  };
  onSubmit?: (
    data: ProfileFormData & {
      photoUrl?: string | null;
      bannerUrl?: string | null;
    }
  ) => Promise<unknown>;
  onUploadPhoto?: (file: File) => Promise<string>;
  onUploadBanner?: (file: File) => Promise<string>;
  isLoading?: boolean;
  isUploading?: boolean;
  isUploadingBanner?: boolean;
  userEmail?: string;
  onCancel?: () => void;
  className?: string;
}

export function ProfileFormCard({
  initialData,
  onSubmit,
  onUploadPhoto,
  onUploadBanner,
  isLoading = false,
  isUploading = false,
  isUploadingBanner = false,
  userEmail = "",
  onCancel,
  className,
}: ProfileFormCardProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      shopName: initialData?.shopName || "",
      bio: initialData?.bio || "",
      whatsapp: initialData?.whatsapp || "",
      instagram: initialData?.instagram || "",
      facebook: initialData?.facebook || "",
      address: initialData?.address || "",
      openingHours: initialData?.openingHours || "",
    },
  });

  // Watch field values for character counts
  // eslint-disable-next-line react-hooks/incompatible-library
  const shopNameVal = watch("shopName") || "";
  const bioVal = watch("bio") || "";
  const addressVal = watch("address") || "";
  const openingHoursVal = watch("openingHours") || "";
  const whatsappVal = watch("whatsapp") || "";
  const instagramVal = watch("instagram") || "";
  const facebookVal = watch("facebook") || "";

  // Image uploads state
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(
    initialData?.photoUrl ?? null
  );
  const [prevPhotoUrl, setPrevPhotoUrl] = React.useState<string | null>(
    initialData?.photoUrl ?? null
  );
  const currentPhotoUrl = initialData?.photoUrl ?? null;
  if (currentPhotoUrl !== prevPhotoUrl) {
    setPrevPhotoUrl(currentPhotoUrl);
    setPhotoUrl(currentPhotoUrl);
  }

  const [bannerUrl, setBannerUrl] = React.useState<string | null>(
    initialData?.bannerUrl ?? null
  );
  const [prevBannerUrl, setPrevBannerUrl] = React.useState<string | null>(
    initialData?.bannerUrl ?? null
  );
  const currentBannerUrl = initialData?.bannerUrl ?? null;
  if (currentBannerUrl !== prevBannerUrl) {
    setPrevBannerUrl(currentBannerUrl);
    setBannerUrl(currentBannerUrl);
  }

  const handlePhotoUpload = async (file: File) => {
    if (!onUploadPhoto) return "";
    try {
      const uploadedUrl = await onUploadPhoto(file);
      setPhotoUrl(uploadedUrl);
      toast.success("Logo toko berhasil diunggah!");
      return uploadedUrl;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengunggah logo";
      toast.error(message);
      throw err;
    }
  };

  const handleBannerUpload = async (file: File) => {
    if (!onUploadBanner) return "";
    try {
      const uploadedUrl = await onUploadBanner(file);
      setBannerUrl(uploadedUrl);
      toast.success("Banner toko berhasil diunggah!");
      return uploadedUrl;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengunggah banner";
      toast.error(message);
      throw err;
    }
  };

  const onFormSubmit = async (data: ProfileFormData) => {
    try {
      if (onSubmit) {
        await onSubmit({
          ...data,
          photoUrl,
          bannerUrl,
        });
      }
      toast.success("Profil toko berhasil diperbarui!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memperbarui profil";
      toast.error(message);
    }
  };

  return (
    <div className={cn("mx-auto max-w-6xl space-y-6", className)}>
      {/* Header section with back button */}
      <div className="border-divider/15 flex items-center gap-3 border-b pb-4">
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="shrink-0 rounded-full"
            aria-label="Kembali ke profil"
          >
            <ArrowLeft className="size-5" />
          </Button>
        )}
        <div>
          <h1 className="font-heading text-primary-dark text-2xl font-bold">
            Perbarui Profil Toko
          </h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Lengkapi informasi toko untuk membangun kepercayaan pelanggan.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* ── SESI 1: IDENTITAS TOKO ── */}
        <Card className="skeuo-flat paper-texture overflow-hidden border-[2px] border-double border-[#B89A57]/60">
          <CardContent className="space-y-5 p-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#3E5237]">
                Identitas Toko
              </h3>
              <p className="text-muted-foreground text-xs">
                Informasi utama yang akan ditampilkan di halaman toko kamu.
              </p>
            </div>

            {/* Logo and Banner side-by-side on desktop */}
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Logo Toko Card */}
              <div className="bg-[#FAF4EC]/65 border border-[#B89A57]/20 rounded-2xl p-5 flex flex-col items-center justify-between min-h-[240px] sm:col-span-1 shadow-[inset_0_2px_4px_rgba(184,154,87,0.02)]">
                <div className="flex justify-between w-full text-xs font-semibold select-none">
                  <span className="text-foreground/80">Logo Toko</span>
                  <span className="text-muted-foreground/60 font-normal">Opsional</span>
                </div>
                <div className="flex-1 flex items-center justify-center py-2">
                  <LogoUpload
                    value={photoUrl}
                    onUpload={onUploadPhoto ? handlePhotoUpload : undefined}
                    isLoading={isUploading}
                    maxSizeMB={2}
                  />
                </div>
                <div className="text-[10px] text-muted-foreground/80 select-none text-center">Format PNG/JPG, maks 2MB</div>
              </div>

              {/* Banner Toko Card */}
              <div className="bg-[#FAF4EC]/65 border border-[#B89A57]/20 rounded-2xl p-5 flex flex-col justify-between min-h-[240px] sm:col-span-2 shadow-[inset_0_2px_4px_rgba(184,154,87,0.02)]">
                <div className="flex justify-between w-full text-xs font-semibold select-none">
                  <span className="text-foreground/80">Banner Toko</span>
                  <span className="text-muted-foreground/60 font-normal">Opsional</span>
                </div>
                <div className="relative group flex-1 flex items-center justify-center my-2 max-w-full overflow-hidden w-full">
                  <ImageUpload
                    value={bannerUrl}
                    aspectRatio="free"
                    maxSizeMB={5}
                    placeholder="Klik untuk upload banner"
                    onUpload={onUploadBanner ? handleBannerUpload : undefined}
                    isLoading={isUploadingBanner}
                    className="rounded-2xl border-dashed h-32 w-full"
                  />
                  <div className="bg-card border-[#B89A57]/30 pointer-events-none absolute right-3 bottom-3 rounded-full border p-2 shadow-md transition-transform group-hover:scale-115 z-10">
                    <Camera className="text-muted-foreground size-4" />
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground/80 select-none">Rekomendasi ukuran 1200x400px, maks 5MB</div>
              </div>
            </div>

            {/* Nama Toko */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="shopName"
                  className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
                >
                  Nama Toko <span className="text-destructive">*</span>
                </Label>
              </div>
              <div className="relative flex w-full items-center">
                <Input
                  id="shopName"
                  placeholder="Flora Studio Makassar"
                  maxLength={50}
                  {...register("shopName")}
                  aria-invalid={!!errors.shopName}
                  className="h-11 pr-16"
                />
                <span className="text-muted-foreground/60 absolute right-3.5 font-mono text-[10px] select-none">
                  {shopNameVal.length} / 50
                </span>
              </div>
              {errors.shopName && (
                <p className="text-destructive text-xs">
                  {errors.shopName.message}
                </p>
              )}
              <p className="text-muted-foreground text-[11px]">
                Nama toko akan ditampilkan di halaman toko dan pencarian.
              </p>
            </div>

            {/* Slogan / Bio */}
            <div className="space-y-1.5">
              <Label
                htmlFor="bio"
                className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
              >
                Deskripsi Singkat / Slogan
              </Label>
              <div className="relative flex w-full flex-col">
                <textarea
                  id="bio"
                  placeholder="Merangkai bunga, menyampaikan rasa..."
                  maxLength={160}
                  {...register("bio")}
                  rows={3}
                  className="skeuo-sunken-input text-foreground placeholder:text-muted-foreground/70 disabled:bg-muted/50 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:ring-destructive/40 w-full min-w-0 resize-none rounded-xl px-3.5 py-2 pb-8 text-sm transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3"
                />
                <span className="text-muted-foreground/60 absolute right-3.5 bottom-2.5 font-mono text-[10px] select-none">
                  {bioVal.length} / 160
                </span>
              </div>
              {errors.bio && (
                <p className="text-destructive text-xs">{errors.bio.message}</p>
              )}
              <p className="text-muted-foreground text-[11px]">
                Ceritakan tentang toko dan keunikan produkmu.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── SESI 2: INFORMASI BISNIS ── */}
        <Card className="skeuo-flat paper-texture relative overflow-hidden border-2 border-double border-[#B89A57]/60">
          {/* Subtle top right background floral graphic (drawn using pure SVG path to meet premium visual rules) */}
          <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 text-[#B89A57]/10 select-none">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M100,0 C90,10 80,30 85,45 C90,60 100,70 100,70 C100,70 90,65 75,55 C60,45 50,30 50,0 Z" />
              <path d="M100,20 C85,25 70,40 73,55 C76,70 85,80 85,80 C85,80 78,73 66,60 C54,47 48,35 48,20 Z" />
            </svg>
          </div>

          <CardContent className="space-y-5 p-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#3E5237]">
                Informasi Bisnis
              </h3>
              <p className="text-muted-foreground text-xs">
                Informasi operasional toko untuk pengalaman belanja yang lebih
                baik.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Alamat Toko */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="address"
                  className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
                >
                  Alamat Toko
                </Label>
                <div className="relative flex w-full items-center">
                  <MapPin className="text-muted-foreground/75 absolute left-3.5 size-4" />
                  <Input
                    id="address"
                    placeholder="Jl. Boulevard, Ruko Emerald No. 12, Makassar"
                    maxLength={120}
                    {...register("address")}
                    className="h-11 pr-16 pl-10"
                  />
                  <span className="text-muted-foreground/60 absolute right-3.5 font-mono text-[10px] select-none">
                    {addressVal.length} / 120
                  </span>
                </div>
                {errors.address && (
                  <p className="text-destructive text-xs">
                    {errors.address.message}
                  </p>
                )}
                <p className="text-muted-foreground text-[10px]">
                  Alamat fisik untuk pickup atau pengiriman.
                </p>
              </div>

              {/* Jam Operasional */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="openingHours"
                  className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
                >
                  Jam Operasional
                </Label>
                <div className="relative flex w-full items-center">
                  <Clock className="text-muted-foreground/75 absolute left-3.5 size-4" />
                  <Input
                    id="openingHours"
                    placeholder="Senin - Sabtu, 08:00 - 20:00"
                    maxLength={80}
                    {...register("openingHours")}
                    className="h-11 pr-16 pl-10"
                  />
                  <span className="text-muted-foreground/60 absolute right-3.5 font-mono text-[10px] select-none">
                    {openingHoursVal.length} / 80
                  </span>
                </div>
                {errors.openingHours && (
                  <p className="text-destructive text-xs">
                    {errors.openingHours.message}
                  </p>
                )}
                <p className="text-muted-foreground text-[10px]">
                  Contoh: Senin - Sabtu, 08:00 - 20:00
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── SESI 3: TAUTAN KONTAK & SOSIAL MEDIA ── */}
        <Card className="skeuo-flat paper-texture overflow-hidden border-[2px] border-double border-[#B89A57]/60">
          <CardContent className="space-y-5 p-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#3E5237]">
                Tautan Kontak & Sosial Media
              </h3>
              <p className="text-muted-foreground text-xs">
                Hubungkan akun untuk memudahkan pelanggan menghubungi dan
                melihat portofoliomu.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* WhatsApp */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="whatsapp"
                  className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
                >
                  WhatsApp
                </Label>
                <div className="relative flex w-full items-center">
                  <span className="absolute left-3.5 flex items-center justify-center">
                    <svg
                      className="text-muted-foreground/75 size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </span>
                  <Input
                    id="whatsapp"
                    placeholder="0812-3456-7890"
                    maxLength={20}
                    {...register("whatsapp")}
                    className="h-11 pr-16 pl-10"
                  />
                  <span className="text-muted-foreground/60 absolute right-3.5 font-mono text-[10px] select-none">
                    {whatsappVal.length} / 20
                  </span>
                </div>
                {errors.whatsapp && (
                  <p className="text-destructive text-xs">
                    {errors.whatsapp.message}
                  </p>
                )}
                <p className="text-muted-foreground text-[10px]">
                  Nomor WhatsApp untuk pemesanan.
                </p>
              </div>

              {/* Instagram */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="instagram"
                  className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
                >
                  Instagram
                </Label>
                <div className="relative flex w-full items-center">
                  <svg
                    className="text-muted-foreground/75 absolute left-3.5 size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <Input
                    id="instagram"
                    placeholder="@florastudio.mks"
                    maxLength={30}
                    {...register("instagram")}
                    className="h-11 pr-16 pl-10"
                  />
                  <span className="text-muted-foreground/60 absolute right-3.5 font-mono text-[10px] select-none">
                    {instagramVal.length} / 30
                  </span>
                </div>
                {errors.instagram && (
                  <p className="text-destructive text-xs">
                    {errors.instagram.message}
                  </p>
                )}
                <p className="text-muted-foreground text-[10px]">
                  Username atau tautan Instagram.
                </p>
              </div>

              {/* Facebook */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="facebook"
                  className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
                >
                  Facebook
                </Label>
                <div className="relative flex w-full items-center">
                  <svg
                    className="text-muted-foreground/75 absolute left-3.5 size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <Input
                    id="facebook"
                    placeholder="Flora Studio Makassar"
                    maxLength={30}
                    {...register("facebook")}
                    className="h-11 pr-16 pl-10"
                  />
                  <span className="text-muted-foreground/60 absolute right-3.5 font-mono text-[10px] select-none">
                    {facebookVal.length} / 30
                  </span>
                </div>
                {errors.facebook && (
                  <p className="text-destructive text-xs">
                    {errors.facebook.message}
                  </p>
                )}
                <p className="text-muted-foreground text-[10px]">
                  Username atau tautan Facebook Page.
                </p>
              </div>

              {/* Email (Read-only from User Login Session) */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-foreground/85 text-xs font-semibold tracking-wider uppercase"
                >
                  Email (Opsional)
                </Label>
                <div className="relative flex w-full items-center">
                  <Mail className="text-muted-foreground/45 absolute left-3.5 size-4" />
                  <Input
                    id="email"
                    value={userEmail}
                    disabled
                    className="bg-muted/40 text-muted-foreground border-border/80 h-11 cursor-not-allowed pl-10 select-none"
                  />
                </div>
                <p className="text-muted-foreground text-[10px]">
                  Email akun utama untuk komunikasi bisnis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-2 sm:flex-row">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="h-11 w-full rounded-full sm:w-44"
            >
              Batal
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark flex h-11 w-full items-center justify-center gap-2 rounded-full text-white sm:w-56"
          >
            <Save className="size-4" />
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>

        <div className="text-muted-foreground/60 flex items-center justify-center gap-1.5 text-xs select-none">
          <Lock className="size-3.5" />
          <span>Perubahan kamu akan disimpan dengan aman</span>
        </div>
      </form>
    </div>
  );
}
