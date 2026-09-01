import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import {
  getProductsByCreator,
  createProduct,
} from "@/features/products/services/productService";
import { ProductFormSchema } from "@/features/products/schema";
import { ZodError } from "zod";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find creator profile, or return empty list gracefully
    let creator = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!creator) {
      // Auto-create creator profile for seamless onboarding
      creator = await prisma.creatorProfile.create({
        data: {
          userId: user.id,
          storeName: user.user_metadata?.studio_name || "Creathon Studio",
          city: user.user_metadata?.city || "Makassar",
        },
      });
    }

    const products = await getProductsByCreator(creator.id);
    return NextResponse.json(products ?? []);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find or ensure creator profile
    let creator = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!creator) {
      creator = await prisma.creatorProfile.create({
        data: {
          userId: user.id,
          storeName: user.user_metadata?.studio_name || "Creathon Studio",
          city: user.user_metadata?.city || "Makassar",
        },
      });
    }

    const body = await request.json();
    const validatedData = ProductFormSchema.parse(body);

    const newProduct = await createProduct(creator.id, validatedData);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
