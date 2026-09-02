/**
 * Improved knowledge base - hapus mention "demo", lebih natural
 * Run: npx ts-node prisma/seeds/knowledge-improved.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const improvedKnowledge = [
  {
    slug: "sistem-komisi-demo",
    title: "Bagaimana sistem komisi di Gifteria?",
    category: "Komisi & Pembayaran",
    content: `**Model Pendapatan Gifteria:**
Gifteria menggunakan model komisi per transaksi. Platform mengambil persentase kecil dari setiap transaksi yang berhasil untuk menutupi biaya operasional dan pengembangan platform.

**Detail Komisi:**
Besaran persentase komisi dan mekanisme payout sedang dalam proses finalisasi untuk memastikan fair bagi semua pihak - kreator, pembeli, dan platform.

**Yang Perlu Kamu Ketahui:**
- Tidak ada biaya pendaftaran atau biaya bulanan
- Komisi hanya dikenakan saat ada transaksi berhasil
- Mekanisme payout akan dijelaskan lengkap saat onboarding
- Sistem dirancang agar menguntungkan kreator dan sustainable untuk platform

**Informasi Lebih Lanjut:**
Untuk detail terbaru tentang persentase komisi, jadwal payout, dan persyaratan lainnya, silakan hubungi tim Operations. Mereka akan menjelaskan secara detail dan menjawab semua pertanyaanmu sebelum kamu memutuskan bergabung.`,
    keywords: "komisi, biaya, pembayaran, fee, persentase, payout, pendapatan, transaksi",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 2,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS", "REGISTER_CREATOR"]),
  },
  {
    slug: "pengiriman-dan-cakupan-area",
    title: "Bagaimana dengan pengiriman dan cakupan area?",
    category: "Pengiriman & Logistik",
    content: `**Fleksibilitas Pengiriman:**
Di Gifteria, setiap creator punya kebebasan penuh untuk mengelola pengiriman produknya sendiri. Kamu yang menentukan:
- Jasa pengiriman yang digunakan (JNE, JNT, SiCepat, GoSend, Grab, dll)
- Area pengiriman yang kamu layani
- Estimasi waktu pengiriman
- Ongkos kirim (bisa sama-rata atau berbeda per area)

**Pasar Utama:**
Gifteria memulai fokus di Makassar dan sekitarnya, tapi platform tidak membatasi area operasional kamu.

**Contoh Skenario:**
- Toko kamu di Surabaya? Bisa melayani pengiriman ke seluruh Indonesia
- Mau fokus lokal saja di Makassar? Bisa juga
- Mau tawarkan same-day delivery via GoSend? Silakan
- Prefer pakai ekspedisi regular? No problem

**Koordinasi dengan Pembeli:**
Chat di platform memudahkan kamu diskusi detail pengiriman dengan pembeli. AI Order Brief Compiler akan mencatat alamat dan preferensi pengiriman di brief pesanan.

**Tips:**
Untuk setup strategi pengiriman yang optimal untuk bisnis kamu, diskusikan dengan tim Operations. Mereka bisa bantu kamu tentukan model pengiriman yang paling cocok.`,
    keywords: "pengiriman, kirim, ekspedisi, ongkir, area, cakupan, surabaya, makassar, jne, jnt, gosend, logistik, delivery",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 2,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },
  {
    slug: "apa-itu-gifteria",
    title: "Apa itu Gifteria?",
    category: "Tentang Platform",
    content: `**Gifteria adalah Platform Marketplace Hadiah Custom**

Gifteria menghubungkan kreator lokal (penjual bucket bunga, gift box, hampers, dan produk handmade) dengan pembeli yang mencari hadiah spesial dan personal.

**Masalah yang Dipecahkan:**
Selama ini, pesan hadiah custom itu ribet:
- Pembeli cari kreator manual di Instagram/TikTok
- Negosiasi panjang lewat WhatsApp pribadi
- Pesanan berantakan, sering ada miskomunikasi
- Tidak ada catatan resmi tentang apa yang disepakati

**Solusi Gifteria:**
Chat bebas di platform → AI mengubahnya jadi brief pesanan terstruktur → Kedua pihak setuju → Brief jadi final → Checkout → Kreator proses pesanan.

**Keunggulan Utama:**
- **Chat Natural:** Seperti WhatsApp, tapi di platform
- **Order Brief Compiler:** AI menyusun pesanan dari chat (produk, occasion, budget, deadline)
- **Evidence-Based:** Setiap isi brief bisa dirujuk ke chat aslinya
- **Persetujuan 2 Pihak:** Brief final setelah pembeli dan kreator setuju
- **Dashboard Kreator:** Kelola produk, pesanan, dan lihat performa jualan
- **AI Assistant:** Tanya apa aja tentang platform (ini yang lagi kamu pakai!)

**Fokus Produk:**
Bucket bunga, gift box/hampers, dan produk handmade lokal yang cocok untuk wisuda, ulang tahun, anniversary, dan occasion spesial lainnya.`,
    keywords: "gifteria, tentang, platform, marketplace, hadiah, custom, bucket bunga, gift box, hampers, apa itu, pengenalan",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 2,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["REGISTER_CREATOR"]),
  },
];

async function main() {
  console.log("🔄 Improving knowledge base - removing demo mentions...");

  for (const article of improvedKnowledge) {
    await prisma.creatorKnowledgeArticle.update({
      where: { slug: article.slug },
      data: {
        ...article,
        updatedAt: new Date(),
      },
    });
    console.log(`✅ Updated: ${article.title}`);
  }

  console.log("\n✨ Knowledge base improved!");
  console.log("📊 Articles updated: 3");
  console.log("✅ No more 'demo' mentions");
  console.log("✅ More natural, production-ready content");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
