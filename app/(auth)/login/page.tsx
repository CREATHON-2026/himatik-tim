import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk • Gifteria",
  description: "Masuk ke akun Gifteria untuk mulai sewa busana adat & karya kreatif.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Masuk untuk menjelajahi katalog sewa pakaian adat dan busana kreatif."
    >
      <LoginForm />
    </AuthLayout>
  );
}
