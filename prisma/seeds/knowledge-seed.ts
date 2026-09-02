/**
 * Knowledge seed script for Ask Gifteria Creator Assistant
 * 
 * Using official Gifteria product description as source
 * Articles are set to APPROVED status with proper metadata
 * 
 * To run this seed:
 * npx ts-node --compiler-options {"module":"commonjs"} prisma/seeds/knowledge-seed.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const knowledgeArticles = [
  {
    slug: "apa-itu-gifteria",
    title: "Apa itu Gifteria?",
    category: "Tentang Platform",
    content: `Gifteria adalah platform marketplace hadiah custom (kategori awal: bucket bunga dan gift box) yang menghubungkan kreator lokal dengan pembeli, dengan fokus pasar awal di Makassar.

Saat ini, proses pesan hadiah custom masih berantakan: pembeli mencari kreator secara manual di Instagram/TikTok, lalu negosiasi dan custom order dilakukan satu-per-satu lewat WhatsApp. Di sisi kreator, pesanan yang masuk berantakan di chat pribadi tanpa struktur yang jelas.

Gifteria mengubah chat bebas antara pembeli dan kreator menjadi brief pesanan yang terstruktur dan disetujui dua pihak, tanpa perlu form checkout yang kaku, tanpa payment gateway asli, dan tanpa admin tools yang berat.

**Tiga prinsip utama Gifteria:**
- Setiap field dalam brief pesanan bisa dirujuk balik ke potongan chat aslinya
- Brief baru dianggap final setelah pembeli dan kreator sama-sama menyetujuinya
- Jawaban asisten AI selalu disertai sitasi ke sumbernya`,
    keywords: "gifteria, tentang, platform, marketplace, hadiah custom, bucket bunga, gift box, makassar",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "REGISTER_CREATOR",
    ]),
  },
  {
    slug: "cara-kerja-gifteria",
    title: "Bagaimana cara kerja Gifteria?",
    category: "Cara Kerja",
    content: `Alur penggunaan Gifteria:

**Untuk Pembeli:**
1. Daftar/login ke platform
2. Temukan produk lewat beranda dan halaman detail produk
3. Chat bebas dengan kreator di dalam platform (menggantikan WhatsApp)
4. AI menyusun brief pesanan terstruktur dari transkrip chat
5. Setujui brief pesanan
6. Checkout sederhana (status "berhasil" tanpa payment gateway asli untuk demo)

**Untuk Kreator:**
1. Daftar sebagai kreator di platform
2. Kelola produk di dashboard kreator
3. Menerima pesanan dari pembeli
4. Chat dengan pembeli untuk negosiasi
5. AI membantu menyusun brief pesanan
6. Kelola pesanan yang masuk
7. Gunakan Ask Gifteria untuk bertanya soal platform
8. Lihat Business Insight untuk memahami performa penjualan`,
    keywords: "cara kerja, alur, proses, pembeli, kreator, chat, brief pesanan",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "REGISTER_CREATOR",
      "LOGIN",
    ]),
  },
  {
    slug: "area-operasional-kreator",
    title: "Di mana saja kreator bisa berjualan?",
    category: "Area & Pengiriman",
    content: `**Area Operasional Kreator:**

Gifteria adalah platform yang berbasis di Makassar, dengan fokus pasar utama di Makassar dan sekitarnya. NAMUN, kreator dari area lain (seperti Jakarta, Surabaya, Bandung, dll) tetap BISA mendaftar dan berjualan di Gifteria.

**Prinsip Penting:**
- Platform fokus awal di Makassar, tapi TIDAK membatasi lokasi kreator
- Kreator bebas mengatur area pengiriman mereka sendiri
- Kreator bertanggung jawab untuk ketersediaan dan logistik di area mereka

**Contoh Skenario:**
- Kreator di Jakarta → bisa berjualan, atur sendiri cakupan pengiriman (Jakarta only, atau Jabodetabek, atau seluruh Indonesia via ekspedisi)
- Kreator di Surabaya → bisa berjualan, atur sendiri area layanan
- Kreator di Makassar → target utama platform, bisa fokus lokal atau ekspansi

**Yang Perlu Diperhatikan:**
1. Atur area pengiriman dengan jelas di profil toko
2. Komunikasikan lead time dan ongkir dengan transparan
3. Pastikan bisa memenuhi pesanan di area yang dipilih
4. Update profil jika ada perubahan cakupan layanan

**Kesimpulan:**
Ya, toko di Jakarta (atau area lain) bisa bergabung dan berjualan di Gifteria. Yang penting adalah kreator bisa melayani area pengiriman yang mereka pilih dengan baik.`,
    keywords: "area, lokasi, jakarta, surabaya, makassar, pengiriman, cakupan, wilayah, operasional, bisa jualan dimana, kota mana",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "SETUP_STORE",
    ]),
  },
  {
    slug: "produk-yang-dapat-dijual",
    title: "Produk apa yang dapat dijual di Gifteria?",
    category: "Produk",
    content: `Gifteria berfokus pada hadiah custom dengan kategori awal:

**Kategori Utama:**
- Bucket bunga (fresh flowers, preserved flowers)
- Gift box / hampers
- Produk handmade lokal

**Ciri Produk yang Sesuai:**
- Bisa dikustomisasi sesuai kebutuhan pembeli
- Dibuat oleh kreator/UMKM lokal
- Sesuai untuk occasion seperti wisuda, ulang tahun, anniversary

**Pasar Awal:**
Makassar dan sekitarnya, dengan target pembeli mahasiswa, pelajar, pasangan, dan pembeli hadiah umum.

**Catatan:**
Kreators dapat menawarkan produk custom lainnya selama sesuai dengan nilai platform dan bisa diproses melalui sistem chat dan brief pesanan.`,
    keywords: "produk, jual, kategori, bucket bunga, gift box, hampers, handmade, custom",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "REGISTER_CREATOR",
    ]),
  },
  {
    slug: "fitur-ai-gifteria",
    title: "Fitur AI apa saja yang ada di Gifteria?",
    category: "Fitur AI",
    content: `Gifteria memiliki tiga fitur AI utama:

**1. Ask Gifteria (Asisten AI)**
Asisten berbasis RAG yang menjawab pertanyaan kreator berdasarkan knowledge base resmi platform. Jawaban selalu disertai sitasi ke sumber, dan akan mengeskalasi ke tim operasional bila pertanyaan di luar cakupan.

**2. Order Brief Compiler**
Fitur yang mengubah transkrip chat menjadi brief pesanan terstruktur (produk, occasion, budget, deadline). Setiap field terhubung ke potongan chat aslinya. Validator dirancang jujur menampilkan status "missing" pada field yang datanya tidak ada, alih-alih menebak.

**3. Business Insight**
Menghasilkan narasi ringkas dari data transaksi kreator. Angka yang ditampilkan dikunci ke data transaksi asli, AI hanya menyusun penjelasannya dalam bahasa yang mudah dipahami.

**Prinsip AI di Gifteria:**
- Evidence-per-field: setiap klaim bisa dirujuk ke sumbernya
- AI mengurangi beban kerja, tidak mengurangi kendali kreator
- Kreator tetap yang memutuskan dan menyetujui`,
    keywords: "ai, fitur, ask gifteria, order brief compiler, business insight, asisten",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "OPEN_CREATOR_DASHBOARD",
    ]),
  },
  {
    slug: "keuntungan-untuk-kreator",
    title: "Apa keuntungan bergabung sebagai kreator?",
    category: "Kreator",
    content: `Keuntungan menjadi kreator di Gifteria:

**Operasional yang Lebih Mudah:**
- Pesanan terstruktur dan tidak berantakan di WhatsApp
- Brief pesanan yang jelas dengan persetujuan dua pihak
- Dashboard untuk mengelola produk dan pesanan

**Bantuan AI:**
- Ask Gifteria membantu menjawab pertanyaan seputar platform
- Order Brief Compiler membantu menyusun pesanan dari chat
- Business Insight memberikan gambaran performa penjualan

**Jangkauan Pasar:**
- Terhubung dengan pembeli di Makassar dan sekitarnya
- Tidak perlu investasi besar di pemasaran atau teknologi
- Platform yang bisa diakses dari browser HP

**Kontrol Penuh:**
- Kreator tetap memutuskan dan menyetujui setiap pesanan
- AI membantu proses, tidak mengambil alih keputusan
- Transparansi dengan sitasi ke sumber chat asli`,
    keywords: "keuntungan, manfaat, kreator, keunggulan, value",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "REGISTER_CREATOR",
    ]),
  },
  {
    slug: "keuntungan-untuk-pembeli",
    title: "Apa keuntungan menggunakan Gifteria sebagai pembeli?",
    category: "Pembeli",
    content: `Keuntungan menjadi pembeli di Gifteria:

**Kemudahan Pemesanan:**
- Pesan hadiah custom tanpa form yang kaku
- Chat bebas dengan kreator seperti di WhatsApp
- AI membantu menyusun brief pesanan yang terstruktur

**Kejelasan Transaksi:**
- Setiap detail pesanan bisa dirujuk ke chat aslinya
- Brief disetujui dua pihak sebelum final
- Tidak ada kesalahpahaman antara pembeli dan kreator

**Discovery Produk:**
- Temukan produk kreator lokal dengan mudah
- Halaman beranda dan detail produk yang informatif
- Berbagai pilihan bucket bunga, gift box, dan handmade

**Proses yang Aman:**
- Chat dalam platform, tidak perlu pindah ke WhatsApp
- Persetujuan yang tercatat dan bisa diaudit
- Sistem yang transparan dan dapat dipercaya`,
    keywords: "keuntungan, manfaat, pembeli, value, kemudahan",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "LOGIN",
    ]),
  },
  {
    slug: "model-bisnis-gifteria",
    title: "Bagaimana model bisnis Gifteria?",
    category: "Bisnis",
    content: `Model bisnis Gifteria:

**Segmen Pelanggan:**
- Pembeli hadiah di Makassar (mahasiswa, pelajar, pasangan, pembeli umum)
- Kreator/UMKM bucket bunga dan produk handmade lokal

**Model Pendapatan:**
Komisi per transaksi (untuk demo dijelaskan sebagai konsep, tidak diimplementasikan sebagai logika otomatis)

**Saluran untuk Demo:**
Presentasi langsung ke juri lewat web app yang bisa diakses dari browser HP

**Biaya:**
- Waktu pengerjaan tim
- Biaya API LLM (diminimalisir dengan mode demo berisi respons yang di-cache)

**Rencana Jangka Panjang:**
- Integrasi payment gateway asli
- Sistem escrow
- Verifikasi kreator otomatis
- Sistem komisi otomatis
- Ekspansi ke kategori dan kota lain`,
    keywords: "model bisnis, komisi, pendapatan, segmen, rencana",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([
      "CONTACT_OPERATIONS",
    ]),
  },
  {
    slug: "prinsip-ai-gifteria",
    title: "Apa prinsip AI di Gifteria?",
    category: "AI & Teknologi",
    content: `Prinsip fundamental AI di Gifteria:

**1. Evidence-per-field**
Setiap field dalam brief pesanan bisa dirujuk balik ke potongan chat aslinya. AI tidak "mengarang" isi pesanan.

**2. Consent dua pihak**
Brief baru dianggap final (immutable) setelah pembeli dan kreator sama-sama menyetujuinya.

**3. AI yang bisa diaudit**
Jawaban asisten AI selalu disertai sitasi ke sumbernya. Angka pada laporan insight dikunci ke data transaksi asli, bukan dihitung ulang oleh AI.

**4. AI membantu, tidak menggantikan**
AI mengurangi beban kerja kreator, tidak mengurangi kendali kreator atas keputusannya. Kreator tetap yang memutuskan, menyetujui, menjual, dan bertindak — AI hanya membantu proses memahami, membuat, mempublikasikan, dan belajar dari data.

**Prinsip yang sama untuk pembeli:**
AI membantu menemukan hadiah yang cocok, tetapi tidak mengambil keputusan pembelian atas nama pembeli.`,
    keywords: "prinsip, ai, evidence, consent, audit, transparansi",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },
  {
    slug: "kontak-operations",
    title: "Bagaimana cara menghubungi tim Operations?",
    category: "Bantuan",
    content: `Jika Anda memiliki pertanyaan yang memerlukan jawaban resmi dari tim Gifteria, atau informasi yang tidak tersedia di knowledge base, Anda dapat menghubungi tim Operations.

Tim Operations dapat membantu dengan:
- Pertanyaan tentang kebijakan dan persyaratan
- Masalah teknis atau kendala akun
- Pertanyaan khusus yang memerlukan penjelasan detail
- Eskalasi sengketa atau masalah transaksi

Untuk menghubungi tim Operations, gunakan tombol "Hubungi Tim Operations" yang tersedia di interface Ask Gifteria.`,
    keywords: "kontak, operations, bantuan, help, support",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },
];

async function main() {
  console.log("🌱 Seeding APPROVED knowledge articles from Gifteria documentation...");

  for (const article of knowledgeArticles) {
    const existing = await prisma.creatorKnowledgeArticle.findUnique({
      where: { slug: article.slug },
    });

    if (existing) {
      // Update existing article to APPROVED
      await prisma.creatorKnowledgeArticle.update({
        where: { slug: article.slug },
        data: {
          ...article,
          updatedAt: new Date(),
        },
      });
      console.log(`✅ Updated: ${article.title} (APPROVED)`);
    } else {
      // Create new APPROVED article
      await prisma.creatorKnowledgeArticle.create({
        data: article,
      });
      console.log(`✅ Created: ${article.title} (APPROVED)`);
    }
  }

  console.log("\n📊 Summary:");
  const total = await prisma.creatorKnowledgeArticle.count();
  const approved = await prisma.creatorKnowledgeArticle.count({
    where: { status: "APPROVED" },
  });
  const draft = await prisma.creatorKnowledgeArticle.count({
    where: { status: "DRAFT" },
  });

  console.log(`Total articles: ${total}`);
  console.log(`APPROVED: ${approved}`);
  console.log(`DRAFT: ${draft}`);
  
  console.log("\n✨ All articles are now APPROVED and ready to use!");
  console.log("🚀 Ask Gifteria can now answer questions based on official Gifteria knowledge.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding knowledge:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
