import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let creator = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    });

    // Auto create default profile if not present
    if (!creator) {
      creator = await prisma.creatorProfile.create({
        data: {
          userId: user.id,
          storeName: user.user_metadata?.studio_name || user.user_metadata?.name || "Creathon Studio",
          city: user.user_metadata?.city || "Makassar",
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              avatarUrl: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      id: creator.id,
      userId: creator.userId,
      shopName: creator.storeName,
      storeName: creator.storeName,
      description: creator.description,
      city: creator.city,
      address: creator.address,
      isVerified: creator.isVerified,
      photoUrl: creator.user?.avatarUrl || null,
      email: creator.user?.email,
      name: creator.user?.name,
      createdAt: creator.createdAt,
      updatedAt: creator.updatedAt,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const updated = await prisma.creatorProfile.upsert({
      where: { userId: user.id },
      update: {
        storeName: body.shopName || body.storeName,
        description: body.description,
        city: body.city,
        address: body.address,
      },
      create: {
        userId: user.id,
        storeName: body.shopName || body.storeName || "Creathon Studio",
        description: body.description,
        city: body.city || "Makassar",
        address: body.address,
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
