"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/features/auth/hooks/useAuth";

const registerSchema = z
  .object({
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Kata sandi minimal harus 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register: registerAccount, loginWithGoogle, isRegistering } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);
    try {
      // Default to "BUYER" role for general registration as per specifications
      await registerAccount({
        email: data.email,
        password: data.password,
        role: "BUYER",
      });
      toast.success("Akun berhasil didaftarkan!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Pendaftaran gagal. Silakan coba lagi.";
      setApiError(message);
      toast.error(message);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal menghubungkan ke Google.";
      toast.error(message);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Outer Main Register Container with Neumorphic Dual Shadow Relief & Double Gold Accent */}
      <Card className="skeuo-neumorphic-container paper-texture relative p-3 sm:p-4 md:p-5">
        <CardContent className="p-0">
          {/* Inner 2-Panel Layered Block - Swapped (Image Left, Form Right) */}
          <div className="relative flex flex-col items-stretch justify-center lg:flex-row">
            
            {/* Left Side Image Showcase Panel (Swapped to Left) */}
            <div className="bg-card group relative z-10 hidden flex-col justify-between self-stretch overflow-hidden rounded-2xl border-[2px] border-double border-[#B89A57]/50 p-8 shadow-sm lg:flex lg:w-[58%] xl:w-[60%]">
              <Image
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200&auto=format&fit=crop"
                alt="Bicket Fresh Florist Showcase"
                fill
                unoptimized
                className="pointer-events-none object-cover transition-transform duration-500 ease-out select-none group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

              {/* Top Left Quotation Overlay */}
              <div className="bg-card/65 relative z-10 mr-auto max-w-xs rounded-xl border border-white/40 p-4 text-left shadow-sm backdrop-blur-md">
                <h3 className="font-heading text-foreground text-lg leading-tight font-bold">
                  Start your artisan journey
                </h3>
                <div className="my-1.5 h-px w-10 bg-[#B89A57]" />
                <p className="text-muted-foreground text-xs leading-relaxed font-medium">
                  Create a Bicket account and explore fresh bouquets.
                </p>
              </div>

              {/* Corner Ornament on Image Frame */}
              <div className="pointer-events-none absolute left-3 bottom-3 z-10 text-white/70 select-none">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M96 4 C 70 4, 50 24, 50 50 C 76 50, 96 30, 96 4 Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Right Form Container (Swapped to Right, overlapping Left Image Container with shadow cast to the left) */}
            <div className="bg-card paper-texture relative z-20 w-full rounded-2xl border-[2px] border-double border-[#B89A57]/60 p-6 shadow-[-8px_0_28px_rgba(62,82,55,0.15)] sm:p-8 md:p-10 lg:-ml-8 lg:w-[48%] xl:w-[46%]">
              
              {/* Art Nouveau Corner Floral Ornaments */}
              <div className="pointer-events-none absolute top-2.5 right-2.5 z-10 text-[#B89A57]/60 select-none">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M96 4 C 70 4, 50 24, 50 50 C 76 50, 96 30, 96 4 Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="82" cy="18" r="3" fill="currentColor" />
                </svg>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-20 flex flex-col justify-center"
              >
                <FieldGroup>
                  <div className="mb-4 flex flex-col items-center text-center">
                    <div className="mb-1 flex flex-col items-center">
                      <div className="mb-1 text-[#B89A57] opacity-85">
                        <svg
                          width="42"
                          height="24"
                          viewBox="0 0 80 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M40 5 C 35 15, 25 18, 10 18 C 25 22, 35 25, 40 35 C 45 25, 55 22, 70 18 C 55 18, 45 15, 40 5 Z"
                            fill="currentColor"
                            opacity="0.35"
                          />
                          <circle cx="40" cy="20" r="3" fill="currentColor" />
                          <path
                            d="M40 5 Q 30 20, 15 20 Q 30 20, 40 35 Q 50 20, 65 20 Q 50 20, 40 5 Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                      </div>
                      <h1 className="font-heading text-primary-dark text-4xl font-bold tracking-tight sm:text-5xl">
                        Bicket
                      </h1>
                    </div>

                    <h2 className="font-heading text-foreground/85 mt-1 text-xl font-semibold">
                      Daftar Akun
                    </h2>
                    <p className="text-muted-foreground mt-0.5 text-xs font-medium text-balance">
                      Mulai perjalanan Anda bersama Bicket
                    </p>

                    {/* Ornamental Floral Line Divider */}
                    <div className="my-2.5 flex w-full items-center justify-center gap-2 text-[#B89A57]/60">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B89A57]/50" />
                      <svg
                        width="24"
                        height="12"
                        viewBox="0 0 40 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 2 C 15 8, 8 10, 2 10 C 8 10, 15 12, 20 18 C 25 12, 32 10, 38 10 C 32 10, 25 8, 20 2 Z"
                          fill="currentColor"
                          opacity="0.5"
                        />
                        <circle cx="20" cy="10" r="2" fill="currentColor" />
                      </svg>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B89A57]/50" />
                    </div>
                  </div>

                  {apiError && (
                    <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-xl border p-3 text-xs font-medium">
                      ⚠️ {apiError}
                    </div>
                  )}

                  {/* Email Field */}
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel
                      htmlFor="email"
                      className="text-foreground/80 text-xs font-semibold tracking-wider uppercase"
                    >
                      EMAIL
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="text-muted-foreground/80 pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email Anda"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-destructive mt-1 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </Field>

                  {/* Password Field */}
                  <Field data-invalid={!!errors.password}>
                    <FieldLabel
                      htmlFor="password"
                      className="text-foreground/80 text-xs font-semibold tracking-wider uppercase"
                    >
                      PASSWORD
                    </FieldLabel>
                    <div className="relative">
                      <Lock className="text-muted-foreground/80 pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2" />
                      <PasswordInput
                        id="password"
                        placeholder="Masukkan password baru"
                        {...register("password")}
                        aria-invalid={!!errors.password}
                        className="pl-10"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-destructive mt-1 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>

                  {/* Confirm Password Field */}
                  <Field data-invalid={!!errors.confirmPassword}>
                    <FieldLabel
                      htmlFor="confirmPassword"
                      className="text-foreground/80 text-xs font-semibold tracking-wider uppercase"
                    >
                      KONFIRMASI PASSWORD
                    </FieldLabel>
                    <div className="relative">
                      <Lock className="text-muted-foreground/80 pointer-events-none absolute top-1/2 left-3.5 z-10 size-4 -translate-y-1/2" />
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="Ulangi password"
                        {...register("confirmPassword")}
                        aria-invalid={!!errors.confirmPassword}
                        className="pl-10"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-destructive mt-1 text-xs">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>

                  {/* Register Button */}
                  <Field>
                    <Button
                      type="submit"
                      disabled={isRegistering || isGoogleLoading}
                      className="h-11 w-full rounded-full"
                    >
                      {isRegistering ? "Loading..." : "Daftar Akun"}
                    </Button>
                  </Field>

                  <FieldSeparator className="text-muted-foreground *:data-[slot=field-separator-content]:bg-card font-heading my-1 text-[11px] tracking-wider uppercase">
                    Or continue with
                  </FieldSeparator>

                  {/* Google OAuth Button */}
                  <Field>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={isRegistering || isGoogleLoading}
                      className="h-11 w-full rounded-full"
                    >
                      <svg
                        className="size-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                      Continue with Google
                    </Button>
                  </Field>

                  <FieldDescription className="text-center text-xs font-medium">
                    Sudah memiliki akun?{" "}
                    <Link
                      href="/login"
                      className="hover:text-foreground text-primary font-semibold underline"
                    >
                      Masuk
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="text-muted-foreground px-6 text-center text-xs">
        By clicking continue, you agree to our{" "}
        <a
          href="#"
          className="hover:text-foreground underline underline-offset-2"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="hover:text-foreground underline underline-offset-2"
        >
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}
