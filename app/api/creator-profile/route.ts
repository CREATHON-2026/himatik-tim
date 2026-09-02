import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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
            phone: true,
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
          storeName:
            user.user_metadata?.studio_name ||
            user.user_metadata?.name ||
            "Gifteria Studio",
          city: user.user_metadata?.city || "Makassar",
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true,
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
      bannerUrl: creator.bannerUrl || null,
      isVerified: creator.isVerified,
      photoUrl: creator.user?.avatarUrl || null,
      avatarUrl: creator.user?.avatarUrl || null,
      email: creator.user?.email || user.email,
      name: creator.user?.name || user.user_metadata?.name || "Kreator Gifteria",
      phone: creator.user?.phone || "",
      createdAt: creator.createdAt,
      updatedAt: creator.updatedAt,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
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

    // 1. Update Creator Profile
    const updated = await prisma.creatorProfile.upsert({
      where: { userId: user.id },
      update: {
        storeName: body.shopName || body.storeName,
        description: body.description,
        city: body.city,
        address: body.address,
        bannerUrl: body.bannerUrl !== undefined ? body.bannerUrl : undefined,
      },
      create: {
        userId: user.id,
        storeName: body.shopName || body.storeName || "Gifteria Studio",
        description: body.description,
        city: body.city || "Makassar",
        address: body.address,
        bannerUrl: body.bannerUrl || null,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
      },
    });

    // 2. Update User Profile if fields provided
    if (
      body.photoUrl !== undefined ||
      body.avatarUrl !== undefined ||
      body.name !== undefined ||
      body.phone !== undefined
    ) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          avatarUrl: body.photoUrl ?? body.avatarUrl,
          name: body.name || undefined,
          phone: body.phone || undefined,
        },
      });
    }

    return NextResponse.json({
      ...updated,
      bannerUrl: updated.bannerUrl || null,
      photoUrl: body.photoUrl ?? body.avatarUrl ?? updated.user?.avatarUrl,
      name: body.name || updated.user?.name,
      phone: body.phone || updated.user?.phone,
      email: updated.user?.email || user.email,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
