import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang diunggah" },
        { status: 400 }
      );
    }

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const filePath = `uploads/${fileName}`;

    // Upload to Supabase storage bucket 'products'
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.warn("Supabase bucket upload notice:", uploadError.message);
      // If bucket 'products' doesn't exist or is restricted, fallback to base64 data url for reliability
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      return NextResponse.json({ url: base64, success: true });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      success: true,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Gagal mengunggah file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
