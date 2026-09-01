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
    role: z.enum(["CUSTOMER", "CREATOR"]).default("CUSTOMER"),
    name: z
      .string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(60, "Nama terlalu panjang"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    phone: z.string().optional(),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung setidaknya 1 huruf besar")
      .regex(/[0-9]/, "Password harus mengandung setidaknya 1 angka"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    // Field khusus role Creator (opsional jika registrasi multi-step)
    storeName: z.string().optional(),
    city: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
