import { prisma } from "@/lib/prisma";
import type { Product as PrismaProduct } from "@prisma/client";
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
 * Root cause fix: Creathon's Prisma schema uses different field names
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

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product ? toApiProduct(product) : null;
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
