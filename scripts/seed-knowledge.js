const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const initialKnowledge = [
  {
    slug: "apa-itu-gifteria",
    title: "Apa itu Gifteria?",
    category: "General",
    content: "Gifteria (Seller Studio) adalah platform marketplace untuk para kreator lokal yang ingin menjual produk-produk karya kriya, suvenir, custom art, floral, dan hampers. Gifteria menghubungkan pembeli yang mencari hadiah unik dan personalisasi dengan kreator yang membuatnya.",
    keywords: "Gifteria, tentang, platform, marketplace",
    status: "APPROVED",
    riskLevel: "GENERAL",
    version: 1,
    effectiveFrom: new Date(),
    allowedActionKeys: ["VIEW_CREATOR_GUIDE"]
  },
  {
    slug: "cara-mendaftar-kreator",
    title: "Bagaimana cara mendaftar sebagai kreator?",
    category: "Onboarding",
    content: "Untuk mendaftar sebagai kreator di Gifteria, Anda harus mendaftarkan akun (sign up) terlebih dahulu, lalu mengisi profil toko dan mengirimkan aplikasi pendaftaran. Tim operasional Gifteria akan melakukan review terhadap aplikasi Anda. Jika disetujui, Anda dapat mulai mengunggah produk.",
    keywords: "daftar, kreator, registrasi, sign up, aplikasi",
    status: "APPROVED",
    riskLevel: "GENERAL",
    version: 1,
    effectiveFrom: new Date(),
    allowedActionKeys: ["REGISTER_CREATOR", "LOGIN"]
  },
  {
    slug: "biaya-dan-komisi",
    title: "Kebijakan Biaya dan Komisi Kreator",
    category: "Policy",
    content: "Pendaftaran sebagai kreator di Gifteria adalah GRATIS. Namun, untuk setiap transaksi produk yang berhasil dan selesai, Gifteria akan mengenakan biaya komisi platform (Platform Fee) sebesar 5% dari total harga jual. Komisi ini digunakan untuk pemeliharaan server dan layanan pelanggan. Tidak ada biaya langganan bulanan tersembunyi.",
    keywords: "biaya, komisi, platform fee, potongan, gratis, langganan",
    status: "APPROVED",
    riskLevel: "POLICY",
    version: 1,
    effectiveFrom: new Date(),
    allowedActionKeys: ["CONTACT_OPERATIONS"]
  },
  {
    slug: "produk-yang-diizinkan",
    title: "Produk Apa Saja yang Boleh Dijual?",
    category: "Policy",
    content: "Gifteria mengizinkan produk kriya, barang seni kustom, suvenir acara, pakaian buatan tangan, aksesoris, serta hampers atau floral arrangement. Kami TIDAK mengizinkan penjualan barang bekas (thrift), produk digital murni tanpa fisik, barang ilegal, senjata, atau produk yang melanggar hak cipta merek lain.",
    keywords: "produk, dijual, larangan, dilarang, kriya, suvenir",
    status: "APPROVED",
    riskLevel: "POLICY",
    version: 1,
    effectiveFrom: new Date(),
    allowedActionKeys: ["CONTACT_OPERATIONS"]
  },
  {
    slug: "proses-payout",
    title: "Proses Pencairan Dana (Payout)",
    category: "Policy",
    content: "Dana hasil penjualan akan masuk ke Saldo Kreator Anda setelah pembeli mengonfirmasi penerimaan barang dan transaksi berstatus COMPLETED. Anda dapat mengajukan penarikan dana (Payout Request) kapan saja melalui Dashboard Kreator. Proses pencairan ke rekening bank memakan waktu 1-3 hari kerja.",
    keywords: "payout, pencairan, tarik dana, saldo, rekening",
    status: "APPROVED",
    riskLevel: "LEGAL_OR_FINANCIAL",
    version: 1,
    effectiveFrom: new Date(),
    allowedActionKeys: ["OPEN_CREATOR_DASHBOARD", "CONTACT_OPERATIONS"]
  }
];

async function main() {
  console.log("Seeding CreatorKnowledgeArticles...");
  
  for (const article of initialKnowledge) {
    await prisma.creatorKnowledgeArticle.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }
  
  console.log("Knowledge seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
