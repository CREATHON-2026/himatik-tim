import { z } from "zod";
import {
  VALID_CATEGORIES,
  VALID_TYPES,
  VALID_SHIPPING_OPTIONS,
  ProductCategory,
  ProductType,
  ShippingOption,
} from "./constants";

/**
 * Zod schema for product form validation
 * Used in both API routes and frontend form
 */
export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nama produk wajib diisi")
    .max(255, "Nama produk maksimal 255 karakter")
    .transform((v) => v.trim()),

  category: z
    .string()
    .min(1, "Kategori produk wajib dipilih")
    .refine((v) => VALID_CATEGORIES.includes(v as ProductCategory), {
      message: `Kategori tidak valid. Pilihan: ${VALID_CATEGORIES.join(", ")}`,
    }),

  description: z
    .string()
    .refine(
      (v) => {
        const plainText = v.replace(/<[^>]*>/g, "").trim();
        return plainText.length >= 10;
      },
      { message: "Deskripsi minimal 10 karakter" }
    )
    .refine(
      (v) => {
        const plainText = v.replace(/<[^>]*>/g, "");
        return plainText.length <= 2000;
      },
      { message: "Deskripsi maksimal 2000 karakter" }
    )
    .transform((v) => v.trim()),

  price: z
    .number()
    .min(1000, "Harga minimal Rp 1.000")
    .max(999999999, "Harga maksimal Rp 999.999.999"),

  imageUrl: z
    .string()
    .min(1, "Foto utama produk wajib diunggah")
    .transform((v) => v.trim())
    .refine(
      (url) =>
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("/") ||
        url.startsWith("data:image/"),
      { message: "URL foto produk tidak valid atau menggunakan protokol tidak aman" }
    ),

  gallery: z
    .array(
      z
        .string()
        .transform((v) => v.trim())
        .refine(
          (url) =>
            url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("/") ||
            url.startsWith("data:image/"),
          { message: "URL galeri foto tidak valid" }
        )
    )
    .max(8, "Galeri maksimal 8 foto")
    .default([]),

  stock: z.number().min(0, "Stok tidak boleh negatif").default(0),

  weight: z
    .number()
    .min(1, "Berat minimal 1 gram")
    .max(50000, "Berat maksimal 50000 gram")
    .optional()
    .nullable(),

  sku: z
    .string()
    .max(100, "SKU maksimal 100 karakter")
    .transform((v) => (v ? v.trim() : null))
    .optional()
    .nullable(),

  type: z
    .string()
    .refine((v) => VALID_TYPES.includes(v as ProductType), {
      message: `Tipe produk tidak valid. Pilihan: ${VALID_TYPES.join(", ")}`,
    })
    .default("READY"),

  shippingOptions: z
    .array(z.string())
    .min(1, "Pilih minimal 1 opsi pengiriman")
    .refine(
      (opts) => opts.every((o) => VALID_SHIPPING_OPTIONS.includes(o as ShippingOption)),
      {
        message: `Opsi pengiriman tidak valid. Pilihan: ${VALID_SHIPPING_OPTIONS.join(", ")}`,
      }
    ),

  tags: z.array(z.string()).max(10, "Maksimal 10 tags").default([]),

  showStock: z.boolean().default(true),

  isActive: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof ProductFormSchema>;
