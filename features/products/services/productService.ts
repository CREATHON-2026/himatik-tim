import { prisma } from "@/lib/prisma";
import type { Prisma, Product as PrismaProduct } from "@prisma/client";
import { CreateProductInput, UpdateProductInput } from "../types";
import type { Product as ApiProduct } from "../types";

function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;
}

/**
 * Maps a raw Prisma Product row to the normalized API shape.
 *
 * Root cause fix: Gifteria's Prisma schema uses different field names
 * (title/images/isPublished/weightGrams) than the shared API contract
 * (name/imageUrl+gallery/isActive/weight) used by hooks and components.
 * This mapping happens once here instead of being duplicated ad-hoc in
 * every page that consumes the API (as it previously was in the edit page).
 *
 * Fields not yet present in the Prisma schema (type, shippingOptions,
 * tags, showStock) are given safe defaults on read and are NOT persisted
 * on write until the schema is extended.
 */
function toApiProduct(p: PrismaProduct): ApiProduct {
  const [imageUrl = null, ...gallery] = p.images ?? [];
  return {
    id: p.id,
    creatorId: p.creatorId,
    name: p.title,
    category: p.category,
    description: p.description,
    price: p.price,
    imageUrl,
    gallery,
    stock: p.stock,
    weight: p.weightGrams ?? null,
    sku: p.sku ?? null,
    type: "READY",
    shippingOptions: ["PICKUP", "REGULER"],
    tags: [],
    showStock: true,
    isActive: p.isPublished,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function getProductsByCreator(creatorId: string) {
  const products = await prisma.product.findMany({
    where: { creatorId },
    orderBy: { createdAt: "desc" },
  });
  return products.map(toApiProduct);
}

export async function getPublicProducts(options?: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const where: Prisma.ProductWhereInput = {
    isPublished: true,
  };

  // Category mapping dictionary for smooth matching
  const CATEGORY_MAP: Record<string, string[]> = {
    HAMPERS: ["Gift Box & Hampers", "Hampers", "Gift Box"],
    FLORAL: ["Bouquet & Floral Gifts", "Buket", "Floral", "Bunga"],
    CUSTOM_ART: ["Personalized & Custom Gifts", "Custom Art", "Kriya", "Custom"],
    FOOD: ["Food & Sweet Gifts", "Food", "Cookies", "Cake"],
    HANDMADE: ["Handmade & Creative Gifts", "Handmade", "Craft"],
    LIFESTYLE: ["Lifestyle & Accessories Gifts", "Accessories", "Aksesoris"],
    SOUVENIR: ["Souvenir & Cendera Mata", "Souvenir", "Cendera Mata"],
  };

  if (options?.category && options.category !== "ALL") {
    const catKey = options.category.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
    const mappedTerms = CATEGORY_MAP[catKey];

    if (mappedTerms && mappedTerms.length > 0) {
      where.OR = mappedTerms.map((term) => ({
        category: { contains: term, mode: "insensitive" as const },
      }));
    } else {
      where.category = { contains: options.category, mode: "insensitive" as const };
    }
  }

  if (options?.search && options.search.trim()) {
    const q = options.search.trim();
    const searchConditions: Prisma.ProductWhereInput[] = [
      { title: { contains: q, mode: "insensitive" as const } },
      { description: { contains: q, mode: "insensitive" as const } },
      { category: { contains: q, mode: "insensitive" as const } },
    ];

    if (where.OR) {
      where.AND = [{ OR: where.OR }, { OR: searchConditions }];
      delete where.OR;
    } else {
      where.OR = searchConditions;
    }
  }

  let orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" };
  if (options?.sort === "price_asc") orderBy = { price: "asc" };
  else if (options?.sort === "price_desc") orderBy = { price: "desc" };
  else if (options?.sort === "newest") orderBy = { createdAt: "desc" };

  const take = options?.limit || 50;
  const skip = options?.page ? (options.page - 1) * take : 0;

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take,
    skip,
    include: {
      creatorProfile: {
        include: {
          user: true,
        },
      },
    },
  });

  return products.map(toApiProduct);
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product ? toApiProduct(product) : null;
}

export async function getProductDetailById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      creatorProfile: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!product) return null;

  const base = toApiProduct(product);
  const creator = product.creatorProfile;

  return {
    ...base,
    price: Number(base.price),
    averageRating: 4.9,
    reviewCount: 12,
    creator: {
      id: creator.id,
      shopName: creator.storeName || "Gifteria Studio",
      photoUrl: creator.user?.avatarUrl || null,
      bannerUrl: creator.bannerUrl || null,
      bio: creator.description || "Pengrajin & Kreator Kado Nusantara",
      whatsapp: creator.user?.phone || "6281234567890",
      district: creator.city || "Makassar",
      subdistrict: creator.address || "Sulawesi Selatan",
      openingHours: "08:00 - 20:00 WITA",
      createdAt: creator.createdAt,
      activeProductCount: 8,
      averageRating: 4.9,
      totalReviewCount: 24,
    },
    reviews: [],
  };
}

export async function createProduct(
  creatorId: string,
  input: CreateProductInput,
) {
  const images = input.imageUrl
    ? [input.imageUrl, ...(input.gallery || [])]
    : input.gallery || [];

  const created = await prisma.product.create({
    data: {
      creatorId,
      title: input.name,
      slug: generateSlug(input.name),
      description: input.description,
      price: input.price,
      stock: input.stock,
      category: input.category,
      sku: input.sku || null,
      images,
      weightGrams: input.weight || 500,
      isPublished: input.isActive ?? true,
    },
  });
  return toApiProduct(created);
}

export async function updateProduct(
  id: string,
  creatorId: string,
  input: UpdateProductInput,
) {
  const images = input.imageUrl
    ? [input.imageUrl, ...(input.gallery || [])]
    : input.gallery || [];

  const updated = await prisma.product.update({
    where: {
      id,
      creatorId,
    },
    data: {
      title: input.name,
      description: input.description,
      price: input.price,
      stock: input.stock,
      category: input.category,
      sku: input.sku || null,
      images,
      weightGrams: input.weight || 500,
      isPublished: input.isActive ?? true,
    },
  });
  return toApiProduct(updated);
}

export async function deleteProduct(id: string, creatorId: string) {
  return await prisma.product.delete({
    where: {
      id,
      creatorId,
    },
  });
}
