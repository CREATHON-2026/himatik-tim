"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../schema";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { Eye, EyeOff, Loader2, AlertCircle, User, Mail, Lock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role")?.toUpperCase();
  const role = roleParam === "CREATOR" ? "CREATOR" : "CUSTOMER";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  const { signUp, signInWithGoogle, isLoading, error, setError } = useAuth();

  useGSAP(
    () => {
      gsap.fromTo(
        ".register-stagger",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.035,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    const payload = {
      role,
      name,
      email,
      password,
      confirmPassword,
    };

    const validation = registerSchema.safeParse(payload);
    if (!validation.success) {
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setFieldErrors(formattedErrors);
      return;
    }

    await signUp(validation.data);
  };

  return (
    <div ref={containerRef} className="space-y-2.5 sm:space-y-3">
      {/* Brand Header Section */}
      <div className="register-stagger text-center space-y-1">
        {/* Logo with Sparkle */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-0.5 font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-neutral-900 group"
        >
          <span>Gifteria</span>
          {/* Violet 4-Point Star Motif */}
          <span className="text-[#6355D9] inline-block -translate-y-1.5 translate-x-0.5 text-sm select-none">
            ✦
          </span>
        </Link>

        {/* Delicate Center Divider with Diamond */}
        <div className="flex items-center justify-center gap-2.5 py-0.5">
          <div className="w-10 h-[1px] bg-neutral-200" />
          <span className="text-[#6355D9] text-[9px] select-none">✦</span>
          <div className="w-10 h-[1px] bg-neutral-200" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-0.5">
          <h1 className="font-serif text-xl sm:text-[24px] font-normal tracking-tight text-neutral-900 leading-tight">
            Create your account
          </h1>
          <p className="text-[11px] sm:text-xs text-neutral-500 font-sans leading-tight">
            Start discovering creators and bringing your ideas to life.
          </p>
        </div>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="register-stagger p-2.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-[11px] flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Full Name */}
        <div className="register-stagger space-y-0.5 text-left">
          <label className="text-[11px] font-medium text-neutral-700">
            Full name
          </label>
          <div className="relative flex items-center">
            <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              disabled={isLoading}
              className="w-full pl-9 pr-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-neutral-200/90 focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-[13px] outline-none transition duration-150"
            />
          </div>
          {fieldErrors.name && (
            <p className="text-[10px] text-rose-500">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="register-stagger space-y-0.5 text-left">
          <label className="text-[11px] font-medium text-neutral-700">
            Email address
          </label>
          <div className="relative flex items-center">
            <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              className="w-full pl-9 pr-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-neutral-200/90 focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-[13px] outline-none transition duration-150"
            />
          </div>
          {fieldErrors.email && (
            <p className="text-[10px] text-rose-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="register-stagger space-y-0.5 text-left">
          <label className="text-[11px] font-medium text-neutral-700">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              disabled={isLoading}
              className="w-full pl-9 pr-9 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-neutral-200/90 focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-[13px] outline-none transition duration-150"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
              className="absolute right-2.5 text-neutral-400 hover:text-neutral-600 transition cursor-pointer p-0.5"
            >
              {showPassword ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-[10px] text-rose-500">{fieldErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="register-stagger space-y-0.5 text-left">
          <label className="text-[11px] font-medium text-neutral-700">
            Confirm password
          </label>
          <div className="relative flex items-center">
            <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              disabled={isLoading}
              className="w-full pl-9 pr-9 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-neutral-200/90 focus:border-[#6355D9] focus:ring-2 focus:ring-[#6355D9]/15 text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-[13px] outline-none transition duration-150"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Sembunyikan konfirmasi password" : "Lihat konfirmasi password"}
              className="absolute right-2.5 text-neutral-400 hover:text-neutral-600 transition cursor-pointer p-0.5"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-3.5 h-3.5" />
              ) : (
                <Eye className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="text-[10px] text-rose-500">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="register-stagger pt-0.5">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-2.5 px-4 rounded-lg sm:rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-indigo-700/20 active:scale-[0.995]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Create account</span>
            )}
          </button>
        </div>
      </form>

      {/* Divider — sesuai referensi fixed.png: garis horizontal kiri-kanan, teks centered sejajar di tengah */}
      <div className="register-stagger flex items-center gap-2.5 py-0.5">
        <div className="flex-1 h-[1px] bg-neutral-200" />
        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-medium select-none whitespace-nowrap">
          OR CONTINUE WITH
        </span>
        <div className="flex-1 h-[1px] bg-neutral-200" />
      </div>

      {/* Google OAuth Button */}
      <div className="register-stagger">
        <GoogleAuthButton
          onClick={() => signInWithGoogle(role)}
          isLoading={isLoading}
          label="Continue with Google"
        />
      </div>

      {/* Switch to Login */}
      <div className="register-stagger text-center text-[11px] sm:text-xs text-neutral-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#6355D9] hover:text-[#5145C6] font-semibold hover:underline"
        >
          Sign in
        </Link>
      </div>

      {/* Terms and Privacy Legal Notice */}
      <div className="register-stagger text-center text-[10px] sm:text-[11px] text-neutral-400 leading-tight max-w-xs mx-auto">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-neutral-600 transition">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-neutral-600 transition">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
