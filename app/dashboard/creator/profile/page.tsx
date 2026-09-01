"use client";

import React, { useState } from "react";
import { ArrowLeft, Sparkles, Pencil } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { CreatorProfileForm } from "@/features/creator-profile/components/CreatorProfileForm";
import { CreatorProfileView } from "@/features/creator-profile/components/CreatorProfileView";
import { useCreatorProfile } from "@/features/creator-profile/hooks/useCreatorProfile";

export default function CreatorProfilePage() {
  const queryClient = useQueryClient();
  const { profile, isLoading } = useCreatorProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["creator-profile"] });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* ─── HEADER BAR (Aligned with profil-toko.png) ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8FF] px-3 py-1 text-xs font-semibold text-[#6355D9] border border-[#DDD6FE] shadow-2xs">
              <Sparkles className="size-3.5 text-[#8B7CF6]" />
              <span className="uppercase tracking-wider">PENGATURAN SANGGAR</span>
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111827] tracking-tight leading-tight">
            {isEditing ? "Edit Profil Sanggar Kreator" : "Profil Toko & Etalase Kreator"}
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] font-normal leading-normal">
            {isEditing
              ? "Perbarui nama toko, logo, lokasi workshop, dan nomor WhatsApp bisnis Anda."
              : "Tampilan identitas toko dan profil sanggar Anda yang siap dilihat oleh pelanggan di katalog."}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              className="rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Pencil className="mr-1.5 size-3.5" />
              <span>Edit Profil</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/dashboard/creator" />}
            className="rounded-xl border-[#E7E5E4] text-xs sm:text-sm font-medium text-[#111827] hover:bg-[#FAFAF9] shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="mr-1.5 size-3.5 text-[#78716C]" />
            <span>Kembali ke Ringkasan</span>
          </Button>
        </div>
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="h-96 rounded-3xl border border-[#E7E5E4] bg-white p-6 animate-pulse space-y-4 shadow-2xs">
            <div className="h-44 w-full rounded-2xl bg-[#F5F5F4]" />
            <div className="h-8 w-1/3 rounded-xl bg-[#FAFAF9]" />
            <div className="h-16 w-full rounded-xl bg-[#F5F5F4]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 rounded-3xl border border-[#E7E5E4] bg-white p-6 animate-pulse shadow-2xs" />
            <div className="h-48 rounded-3xl border border-[#E7E5E4] bg-white p-6 animate-pulse shadow-2xs" />
          </div>
        </div>
      ) : isEditing ? (
        <CreatorProfileForm
          key={profile?.id || "profile-form"}
          initialData={profile}
          onSaveSuccess={handleSaveSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <CreatorProfileView
          data={profile}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
}
