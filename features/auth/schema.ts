import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    role: z.enum(["CUSTOMER", "CREATOR"]),
    name: z
      .string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(60, "Nama terlalu panjang"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    phone: z
      .string()
      .min(10, "Nomor telepon/WhatsApp minimal 10 digit")
      .regex(/^[0-9+]+$/, "Format nomor telepon hanya angka"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung setidaknya 1 huruf besar")
      .regex(/[0-9]/, "Password harus mengandung setidaknya 1 angka"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    // Field khusus role Creator
    storeName: z.string().optional(),
    city: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "CREATOR") {
        return !!data.storeName && data.storeName.trim().length >= 3;
      }
      return true;
    },
    {
      message: "Nama Toko / Studio Rental minimal 3 karakter",
      path: ["storeName"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "CREATOR") {
        return !!data.city && data.city.trim().length >= 2;
      }
      return true;
    },
    {
      message: "Kota domisili toko wajib diisi",
      path: ["city"],
    }
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
