"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../schema";
import { RoleSwitcher } from "./RoleSwitcher";
import { Eye, EyeOff, Loader2, AlertCircle, Building2, MapPin } from "lucide-react";

export function RegisterForm() {
  const [role, setRole] = useState<"CUSTOMER" | "CREATOR">("CUSTOMER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { signUp, isLoading, error, setError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    const payload = {
      role,
      name,
      email,
      phone,
      password,
      confirmPassword,
      storeName: role === "CREATOR" ? storeName : undefined,
      city: role === "CREATOR" ? city : undefined,
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
    <div className="space-y-5">
      {/* Role Selection Switcher */}
      <RoleSwitcher selectedRole={role} onSelectRole={setRole} />

      {/* Global Error Banner */}
      {error && (
        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Rian Pratama"
            disabled={isLoading}
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder:text-neutral-600 text-sm outline-none transition"
          />
          {fieldErrors.name && (
            <p className="text-xs text-rose-400">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Alamat Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            disabled={isLoading}
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder:text-neutral-600 text-sm outline-none transition"
          />
          {fieldErrors.email && (
            <p className="text-xs text-rose-400">{fieldErrors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Nomor WhatsApp / HP
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="081234567890"
            disabled={isLoading}
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder:text-neutral-600 text-sm outline-none transition"
          />
          {fieldErrors.phone && (
            <p className="text-xs text-rose-400">{fieldErrors.phone}</p>
          )}
        </div>

        {/* Dynamic Fields for Creator */}
        {role === "CREATOR" && (
          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3 animate-in fade-in-50 duration-200">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <Building2 className="w-4 h-4" />
              <span>Informasi Toko / Rental Studio</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">
                Nama Toko / Brand Busana
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Contoh: Nusantara Kostum Studio"
                disabled={isLoading}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500 text-white placeholder:text-neutral-600 text-sm outline-none transition"
              />
              {fieldErrors.storeName && (
                <p className="text-xs text-rose-400">{fieldErrors.storeName}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-300">
                Kota Domisili Toko
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Contoh: Jakarta Selatan"
                  disabled={isLoading}
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500 text-white placeholder:text-neutral-600 text-sm outline-none transition"
                />
                <MapPin className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
              {fieldErrors.city && (
                <p className="text-xs text-rose-400">{fieldErrors.city}</p>
              )}
            </div>
          </div>
        )}

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Kata Sandi
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 karakter, 1 huruf besar, 1 angka"
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-neutral-950/60 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder:text-neutral-600 text-sm outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-xs text-rose-400">{fieldErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-300">
            Ulangi Kata Sandi
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ketik ulang kata sandi Anda"
            disabled={isLoading}
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder:text-neutral-600 text-sm outline-none transition"
          />
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-rose-400">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 pt-2.5"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>Mendaftarkan Akun...</span>
            </>
          ) : (
            <span>Daftar Sebagai {role === "CREATOR" ? "Kreator" : "Customer"}</span>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center text-xs text-neutral-400 pt-1">
        Sudah memiliki akun?{" "}
        <Link
          href="/login"
          className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4"
        >
          Masuk di Sini
        </Link>
      </div>
    </div>
  );
}
