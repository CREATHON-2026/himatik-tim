"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schema";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { Eye, EyeOff, Loader2, AlertCircle, Mail, Lock } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement>(null);

  const { signInWithEmail, signInWithGoogle, isLoading, error, setError } =
    useAuth();

  useGSAP(
    () => {
      gsap.fromTo(
        ".form-stagger",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
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

    const validation = loginSchema.safeParse({ email, password });
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

    await signInWithEmail(validation.data);
  };

  return (
    <div ref={containerRef} className="space-y-3 sm:space-y-4">
      {/* Brand Header Section */}
      <div className="form-stagger text-center space-y-1">
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
            Welcome back
          </h1>
          <p className="text-[11px] sm:text-xs text-neutral-500 font-sans leading-tight">
            Sign in to continue your creative journey.
          </p>
        </div>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="form-stagger p-2.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-[11px] flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Email / Password Form */}
      <form onSubmit={handleSubmit} className="space-y-2.5">
        {/* Email Field */}
        <div className="form-stagger space-y-0.5 text-left">
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

        {/* Password Field */}
        <div className="form-stagger space-y-0.5 text-left">
          <label className="text-[11px] font-medium text-neutral-700">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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
          
          {/* Forgot Password Link */}
          <div className="text-right pt-0.5">
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-[#6355D9] hover:text-[#5145C6] transition hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Primary Login Button */}
        <div className="form-stagger pt-0.5">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-2.5 px-4 rounded-lg sm:rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-indigo-700/20 active:scale-[0.995]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </div>
      </form>

      {/* Divider — sesuai referensi fixed.png */}
      <div className="form-stagger flex items-center gap-2.5 py-0.5">
        <div className="flex-1 h-[1px] bg-neutral-200" />
        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-400 font-medium select-none whitespace-nowrap">
          OR CONTINUE WITH
        </span>
        <div className="flex-1 h-[1px] bg-neutral-200" />
      </div>

      {/* Google OAuth Button */}
      <div className="form-stagger">
        <GoogleAuthButton
          onClick={() => signInWithGoogle("CUSTOMER")}
          isLoading={isLoading}
          label="Continue with Google"
        />
      </div>

      {/* Switch to Sign Up */}
      <div className="form-stagger text-center text-[11px] sm:text-xs text-neutral-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#6355D9] hover:text-[#5145C6] font-semibold hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
