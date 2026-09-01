import { Suspense } from "react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register • Creatons",
  description: "Daftar akun Creatons dan mulai wujudkan karya kreatif Anda.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      imagePosition="left"
      heroHeadline={
        <h2 className="font-serif text-[32px] xl:text-[38px] font-normal leading-[1.18] text-[#111827] tracking-tight">
          Bring your <br />
          creative vision <br />
          <span className="italic text-[#4F46E5] font-normal">to life.</span>
        </h2>
      }
      heroSubtitle="Join a community where creators and ideas come together."
    >
      <Suspense
        fallback={
          <div className="py-8 text-center text-xs text-neutral-500">
            Memuat formulir...
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </AuthLayout>
  );
}
