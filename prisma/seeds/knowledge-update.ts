/**
 * Update knowledge base dengan informasi tambahan
 * Run: npx ts-node prisma/seeds/knowledge-update.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const additionalKnowledge = [
  {
    slug: "sistem-komisi-demo",
    title: "Bagaimana sistem komisi di Gifteria?",
    category: "Komisi & Pembayaran",
    content: `Untuk demo saat ini, sistem komisi Gifteria masih dalam tahap konsep dan belum diimplementasikan secara otomatis.

**Yang Perlu Diketahui:**
- Model pendapatan Gifteria adalah komisi per transaksi
- Detail persentase komisi dan mekanisme payout masih dalam tahap finalisasi
- Untuk informasi terbaru dan paling akurat tentang sistem komisi, silakan hubungi tim Operations Gifteria

**Fokus Demo:**
Saat ini platform fokus pada membuktikan nilai utama: chat bebas yang diubah AI menjadi brief pesanan terstruktur, bukan pada implementasi sistem pembayaran otomatis.

Jika kamu tertarik bergabung sebagai creator, tim Operations akan menjelaskan detail komisi dan persyaratan secara lengkap.`,
    keywords: "komisi, pembayaran, biaya, fee, persentase, payout",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS", "REGISTER_CREATOR"]),
  },
  {
    slug: "pengiriman-dan-cakupan-area",
    title: "Bagaimana dengan pengiriman dan cakupan area?",
    category: "Pengiriman",
    content: `**Fokus Pasar Awal:**
Gifteria saat ini memulai dengan fokus pasar di Makassar dan sekitarnya.

**Tentang Pengiriman:**
- Setiap creator mengelola pengiriman produknya sendiri
- Kamu bisa menggunakan jasa pengiriman yang kamu pilih (JNE, JNT, GoSend, dll)
- Kamu yang menentukan area pengiriman yang kamu layani
- Brief pesanan akan mencakup detail alamat dan kebutuhan pengiriman

**Ekspansi Area:**
Jika toko kamu di kota lain (misalnya Surabaya) dan ingin melayani pengiriman ke seluruh Indonesia:
- Kamu bisa mengatur sendiri layanan pengiriman yang kamu tawarkan
- Diskusikan dengan pembeli melalui chat untuk koordinasi pengiriman
- Platform tidak membatasi area pengiriman yang kamu layani

**Rekomendasi:**
Untuk pengaturan pengiriman yang optimal, diskusikan langsung dengan tim Operations agar sesuai dengan model bisnis toko kamu.`,
    keywords: "pengiriman, kirim, area, cakupan, surabaya, makassar, ekspedisi, ongkir",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },
  {
    slug: "proses-pendaftaran-creator",
    title: "Bagaimana proses pendaftaran dan verifikasi creator?",
    category: "Pendaftaran",
    content: `**Proses Pendaftaran Creator:**

1. **Daftar Akun**
   - Buka halaman registrasi
   - Isi data: nama, email, nomor telepon, password
   - Verifikasi email melalui link yang dikirim

2. **Login & Setup Profil Toko**
   - Login dengan akun yang sudah dibuat
   - Lengkapi profil toko: nama toko, deskripsi, lokasi
   - Upload banner toko (opsional)

3. **Upload Produk Pertama**
   - Tambah produk dengan foto berkualitas
   - Tulis deskripsi produk yang jelas
   - Tentukan harga dan kategori

4. **Mulai Menerima Pesanan**
   - Dashboard creator siap digunakan
   - Chat dengan pembeli langsung di platform
   - AI membantu menyusun brief pesanan

**Untuk Demo:**
Verifikasi creator otomatis belum diimplementasikan. Creator yang mendaftar bisa langsung mulai setup toko dan upload produk.

**Pertanyaan Lebih Lanjut:**
Jika ada pertanyaan spesifik tentang persyaratan atau proses verifikasi, hubungi tim Operations.`,
    keywords: "daftar, pendaftaran, registrasi, verifikasi, proses, cara daftar",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["REGISTER_CREATOR", "LOGIN"]),
  },
  {
    slug: "fitur-chat-dan-brief-compiler",
    title: "Bagaimana cara kerja chat dan Order Brief Compiler?",
    category: "Fitur Utama",
    content: `**Chat In-App:**
Gifteria menggantikan WhatsApp dengan chat langsung di platform. Pembeli dan creator bisa diskusi bebas tentang pesanan, custom request, dan detail lainnya.

**Order Brief Compiler (AI):**
Ini adalah fitur unggulan Gifteria yang mengubah chat bebas menjadi brief pesanan terstruktur.

**Cara Kerjanya:**
1. Pembeli dan creator chat bebas di platform
2. AI membaca transkrip chat
3. AI menyusun brief terstruktur: produk, occasion, budget, deadline
4. Setiap field di brief terhubung ke potongan chat aslinya (bisa dirujuk balik)
5. Kedua pihak review dan setujui brief
6. Brief menjadi final dan immutable setelah disetujui

**Keunggulan:**
- Tidak perlu form checkout yang kaku
- Validator AI jujur menampilkan "missing" jika data tidak ada (tidak mengarang)
- Semua kesepakatan tercatat dengan jelas
- Menghindari miskomunikasi

**Evidence-based:**
Setiap isi brief bisa dirujuk balik ke chat aslinya, jadi pembeli dan creator bisa cek: "Ini dari mana? Oh iya, kita bahas ini di chat kemarin."`,
    keywords: "chat, order brief, compiler, ai, pesanan, custom order",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },
];

async function main() {
  console.log("🔄 Updating knowledge base dengan artikel tambahan...");

  for (const article of additionalKnowledge) {
    const existing = await prisma.creatorKnowledgeArticle.findUnique({
      where: { slug: article.slug },
    });

    if (existing) {
      await prisma.creatorKnowledgeArticle.update({
        where: { slug: article.slug },
        data: {
          ...article,
          updatedAt: new Date(),
        },
      });
      console.log(`✅ Updated: ${article.title}`);
    } else {
      await prisma.creatorKnowledgeArticle.create({
        data: article,
      });
      console.log(`✅ Created: ${article.title}`);
    }
  }

  console.log("\n📊 Final Summary:");
  const total = await prisma.creatorKnowledgeArticle.count();
  const approved = await prisma.creatorKnowledgeArticle.count({
    where: { status: "APPROVED" },
  });

  console.log(`Total articles: ${total}`);
  console.log(`APPROVED: ${approved}`);
  
  console.log("\n✨ Knowledge base updated successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error updating knowledge:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
