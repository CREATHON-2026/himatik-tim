/**
 * Product Taxonomy & Validation Constants
 * Aligned with BICKET Product Taxonomy & Category Requirements v1.0
 * Shared across API routes, database mapping, and frontend forms
 */

export const VALID_CATEGORIES = [
  "Gift Box & Hampers",
  "Bouquet & Floral Gifts",
  "Personalized & Custom Gifts",
  "Food & Sweet Gifts",
  "Handmade & Creative Gifts",
  "Lifestyle & Accessories Gifts",
] as const;

export type ProductCategory = (typeof VALID_CATEGORIES)[number];

export interface CategoryMeta {
  name: ProductCategory;
  subtext: string;
  description: string;
  examples: string;
  badge: string;
}

/**
 * Contextual metadata for each category to guide Creators and Buyers
 */
export const CATEGORY_METADATA: Record<ProductCategory, CategoryMeta> = {
  "Gift Box & Hampers": {
    name: "Gift Box & Hampers",
    subtext: "Hampers, snack box & curated kit",
    description: "Paket hadiah yang dikurasi atau dikemas rapi dalam satu box atau hampers.",
    examples: "Hampers Hari Raya, Gift Box Ulang Tahun, Snack Box, Self-Care Package, Curated Gift Set.",
    badge: "Paket Hadiah",
  },
  "Bouquet & Floral Gifts": {
    name: "Bouquet & Floral Gifts",
    subtext: "Buket bunga segar, artificial & uang",
    description: "Buket atau produk hadiah dengan elemen bunga/floral, uang, atau snack.",
    examples: "Buket Bunga Segar, Buket Bunga Kering/Artificial, Buket Uang, Buket Snack, Bunga Meja/Papan.",
    badge: "Buket & Floral",
  },
  "Personalized & Custom Gifts": {
    name: "Personalized & Custom Gifts",
    subtext: "Frame acrylic, ukir nama & foto",
    description: "Produk hadiah bernilai personal dengan cetak foto, ukiran, atau nama penerima.",
    examples: "Frame Acrylic Custom, Lampu Tidur Akrilik Nama, Cetak Foto Hadiah, Plakat Kenang-kenangan, Jam Custom.",
    badge: "Custom Personal",
  },
  "Food & Sweet Gifts": {
    name: "Food & Sweet Gifts",
    subtext: "Cookies, dessert box & parcel cokelat",
    description: "Makanan, kue, atau camilan manis yang dikemas khusus sebagai bingkisan hadiah.",
    examples: "Cookies Jar Gift, Dessert Box, Parcel Cokelat, Mini Cake Hadiah, Pastry Box.",
    badge: "Kuliner Manis",
  },
  "Handmade & Creative Gifts": {
    name: "Handmade & Creative Gifts",
    subtext: "Rajut crochet, clay, resin & dekorasi",
    description: "Karya kerajinan tangan kreatif yang unik dan bernilai seni.",
    examples: "Rajut Bunga / Amigurumi Crochet, Clay Art, Kerajinan Resin, Lukisan Mini, Hiasan Dinding Handmade.",
    badge: "Kriya Handmade",
  },
  "Lifestyle & Accessories Gifts": {
    name: "Lifestyle & Accessories Gifts",
    subtext: "Aksesori, lilin aromaterapi, pouch",
    description: "Aksesori personal, fashion, atau perlengkapan lifestyle estetik untuk hadiah.",
    examples: "Aksesori Fashion, Lilin Aromaterapi Estetik, Pouch / Dompet Craft, Gantungan Kunci Estetik.",
    badge: "Aksesori Gaya",
  },
};

export function getCategoryMeta(category?: string | null): CategoryMeta | null {
  if (!category) return null;
  const normalized = normalizeProductCategory(category);
  return CATEGORY_METADATA[normalized] || null;
}

/**
 * Controlled Tag Vocabularies for discovery (Occasion & Recipient)
 */
export const CONTROLLED_OCCASION_TAGS = [
  "Ulang Tahun",
  "Wisuda",
  "Anniversary",
  "Pernikahan",
  "Lamaran",
  "Hari Ibu",
  "Hari Ayah",
  "Hari Raya",
  "Valentine",
  "Natal",
] as const;

export const CONTROLLED_RECIPIENT_TAGS = [
  "Untuk Pasangan",
  "Untuk Sahabat",
  "Untuk Keluarga",
  "Untuk Orang Tua",
  "Untuk Rekan Kerja",
  "Untuk Guru",
] as const;

/**
 * Legacy Category to Approved MVP Category Mapping
 * Ensures 100% backward compatibility for existing products
 */
export const LEGACY_CATEGORY_MAP: Record<string, ProductCategory> = {
  // Legacy Bouquet Categories
  "Buket Mawar": "Bouquet & Floral Gifts",
  "Buket Uang": "Bouquet & Floral Gifts",
  "Buket Balon": "Bouquet & Floral Gifts",
  "Buket Snack": "Bouquet & Floral Gifts",
  "Buket Bunga": "Bouquet & Floral Gifts",
  "Bunga Papan": "Bouquet & Floral Gifts",

  // Legacy Hampers & Box
  "Hampers": "Gift Box & Hampers",
  "Box Bunga": "Gift Box & Hampers",

  // Legacy Custom & Acrylic
  "Bunga Acrylic": "Personalized & Custom Gifts",

  // Legacy Accessories
  "Aksesori": "Lifestyle & Accessories Gifts",

  // Legacy Fallback
  "Lainnya": "Handmade & Creative Gifts",
};

/**
 * Normalizes any category string (including legacy ones) to one of the 6 official MVP categories
 */
export function normalizeProductCategory(category?: string | null): ProductCategory {
  if (!category) return "Handmade & Creative Gifts";

  if (VALID_CATEGORIES.includes(category as ProductCategory)) {
    return category as ProductCategory;
  }

  if (LEGACY_CATEGORY_MAP[category]) {
    return LEGACY_CATEGORY_MAP[category];
  }

  return "Handmade & Creative Gifts";
}

export const VALID_TYPES = ["READY", "PREORDER"] as const;
export const VALID_SHIPPING_OPTIONS = ["PICKUP", "INSTANT", "REGULER"] as const;

export type ProductType = (typeof VALID_TYPES)[number];
export type ShippingOption = (typeof VALID_SHIPPING_OPTIONS)[number];
