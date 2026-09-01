import { prisma } from "@/lib/prisma";
import { CreateProductInput, UpdateProductInput } from "../types";

function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;
}

export async function getProductsByCreator(creatorId: string) {
  return await prisma.product.findMany({
    where: { creatorId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(creatorId: string, input: CreateProductInput) {
  const images = input.imageUrl
    ? [input.imageUrl, ...(input.gallery || [])]
    : input.gallery || [];

  return await prisma.product.create({
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
}

export async function updateProduct(
  id: string,
  creatorId: string,
  input: UpdateProductInput
) {
  const images = input.imageUrl
    ? [input.imageUrl, ...(input.gallery || [])]
    : input.gallery || [];

  return await prisma.product.update({
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
}

export async function deleteProduct(id: string, creatorId: string) {
  return await prisma.product.delete({
    where: {
      id,
      creatorId,
    },
  });
}
