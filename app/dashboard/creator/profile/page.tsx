"use client";

import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreatorProfileForm } from "@/features/creator-profile/components/CreatorProfileForm";
import { useCreatorProfile } from "@/features/creator-profile/hooks/useCreatorProfile";

export default function CreatorProfilePage() {
  const { profile, isLoading } = useCreatorProfile();

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E7E5E4] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F5F3FF] px-2.5 py-0.5 text-xs font-semibold text-[#6355D9] border border-[#DDD6FE]">
              <Sparkles className="h-3 w-3" /> Pengaturan Sanggar
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Profil Toko & Etalase Kreator
          </h1>
          <p className="mt-1 text-sm text-[#78716C]">
            Kelola identitas merek, logo sanggar, alamat pengiriman, dan informasi kontak bisnis Anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/dashboard/creator" />}
            className="rounded-xl border-[#E7E5E4] text-xs font-medium"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Kembali ke Ringkasan
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-64 rounded-2xl border border-[#E7E5E4] bg-white p-6 animate-pulse space-y-4">
              <div className="h-5 w-1/3 rounded bg-[#F5F5F4]" />
              <div className="h-20 w-full rounded-xl bg-[#FAFAF9]" />
              <div className="h-10 w-full rounded-xl bg-[#F5F5F4]" />
            </div>
            <div className="h-48 rounded-2xl border border-[#E7E5E4] bg-white p-6 animate-pulse space-y-4">
              <div className="h-5 w-1/4 rounded bg-[#F5F5F4]" />
              <div className="h-10 w-full rounded-xl bg-[#F5F5F4]" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-40 rounded-2xl border border-[#E7E5E4] bg-white p-6 animate-pulse" />
            <div className="h-64 rounded-2xl border border-[#E7E5E4] bg-white p-6 animate-pulse" />
          </div>
        </div>
      ) : (
        <CreatorProfileForm initialData={profile} />
      )}
    </div>
  );
}
