"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schema";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { signInWithEmail, signInWithGoogle, isLoading, error, setError } =
    useAuth();

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
    <div className="space-y-5">
      {/* OAuth Button */}
      <GoogleAuthButton
        onClick={() => signInWithGoogle("CUSTOMER")}
        isLoading={isLoading}
        label="Masuk dengan Google"
      />

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-neutral-200 w-full" />
        <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
          atau dengan email
        </span>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Email / Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-700">
            Alamat Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            disabled={isLoading}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-neutral-900 placeholder:text-neutral-400 text-sm outline-none transition"
          />
          {fieldErrors.email && (
            <p className="text-xs text-rose-500">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-neutral-700">
              Kata Sandi
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white border border-neutral-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 text-neutral-900 placeholder:text-neutral-400 text-sm outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-xs text-rose-500">{fieldErrors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Memproses...</span>
            </>
          ) : (
            <span>Masuk ke Akun</span>
          )}
        </button>
      </form>

      {/* Switch to Register */}
      <div className="text-center text-xs text-neutral-500 pt-1">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="text-indigo-600 hover:text-indigo-700 font-semibold underline underline-offset-4"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
