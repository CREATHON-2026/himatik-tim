import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun • Creathon",
  description: "Buat akun baru Creathon sebagai Customer (Penyewa) atau Creator (Mitra Rental).",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Buat Akun Baru"
      subtitle="Bergabunglah dengan ekosistem rental busana adat & karya kreatif Nusantara."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
