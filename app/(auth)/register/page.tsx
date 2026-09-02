import { Suspense } from "react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun • Gifteria",
  description: "Buat akun baru Gifteria sebagai Customer (Penyewa) atau Creator (Mitra Rental).",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Buat Akun Baru"
      subtitle="Bergabunglah dengan ekosistem rental busana adat & karya kreatif Nusantara."
    >
      <Suspense fallback={<div className="py-8 text-center text-xs text-neutral-500">Memuat formulir...</div>}>
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
