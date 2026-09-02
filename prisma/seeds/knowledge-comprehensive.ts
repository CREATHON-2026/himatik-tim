/**
 * Comprehensive Knowledge Base - Based on gifteria-deskripsi.md
 * Full FAQ bank, policies, Order Brief Compiler details
 * Run: npx ts-node prisma/seeds/knowledge-comprehensive.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const comprehensiveKnowledge = [
  // ===== TENTANG PLATFORM =====
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
- **Ask Gifteria:** AI Assistant yang siap bantu kamu (ini yang lagi kamu pakai!)

**Fokus Produk:**
Bucket bunga, gift box/hampers, dan produk handmade lokal yang cocok untuk wisuda, ulang tahun, anniversary, dan occasion spesial lainnya.`,
    keywords: "gifteria, tentang, platform, marketplace, hadiah, custom, bucket bunga, gift box, hampers, apa itu, pengenalan",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 3,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["REGISTER_CREATOR"]),
  },

  // ===== ORDER BRIEF COMPILER =====
  {
    slug: "apa-itu-order-brief-compiler",
    title: "Apa itu Order Brief Compiler?",
    category: "Fitur Unggulan",
    content: `**Order Brief Compiler: Fitur Unggulan Gifteria**

Order Brief Compiler adalah AI yang "mendengarkan" percakapan antara pembeli dan kreator, kemudian menyusunnya menjadi brief pesanan yang terstruktur dan jelas.

**Cara Kerjanya:**
1. **Chat Natural:** Pembeli dan kreator ngobrol bebas seperti WhatsApp
2. **AI Ekstrak Info:** AI secara real-time mengidentifikasi detail pesanan dari chat
3. **Brief Tersusun Otomatis:** AI menyusun field-field pesanan (produk, budget, deadline, dll)
4. **Evidence-Based:** Setiap field bisa diklik untuk lihat chat aslinya
5. **Review & Approve:** Kedua pihak review dan setujui brief sebelum checkout

**Field yang Dikompilasi:**
- **Produk:** Produk apa yang dipesan (ex: Bucket Bunga Mawar)
- **Quantity:** Berapa banyak
- **Budget:** Range harga yang disepakati
- **Occasion:** Untuk acara apa (wisuda, ultah, anniversary)
- **Recipient Info:** Untuk siapa (nama, gender, hubungan)
- **Deadline:** Kapan harus siap
- **Shipping:** Alamat pengiriman
- **Special Requests:** Customization khusus (warna, pesan kartu, dll)

**Field States:**
- **Confirmed:** Kedua pihak sudah sepakat
- **Missing:** Belum dibahas di chat
- **Conflicting:** Ada perbedaan pendapat
- **Proposed by AI:** AI usulkan berdasarkan konteks

**Keunggulan:**
✅ Tidak ada yang terlewat
✅ Mengurangi miskomunikasi
✅ Brief final = kontrak pesanan
✅ Transparansi penuh dengan evidence dari chat`,
    keywords: "order brief, compiler, AI, chat, pesanan, brief, field, evidence, automatic, fitur",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== PRODUK =====
  {
    slug: "produk-yang-bisa-dijual",
    title: "Produk apa yang bisa dijual di Gifteria?",
    category: "Produk",
    content: `**Kategori Produk Utama:**

**1. Bucket Bunga**
Rangkaian bunga dalam bucket/ember dekoratif - favorit untuk wisuda, ulang tahun, anniversary.

**2. Gift Box / Hampers**
Paket hadiah berisi kombinasi produk (makanan, minuman, aksesoris, dll) dalam box/keranjang cantik.

**3. Produk Handmade Lokal**
Kerajinan tangan buatan UMKM lokal seperti:
- Lilin aromaterapi custom
- Mug/tumbler custom print
- Keychain/gantungan kunci custom
- Totebag custom design
- Aksesoris handmade
- Dan produk kreatif lainnya

**Kriteria Produk yang Cocok:**
✅ Bisa dikustomisasi (warna, pesan, design)
✅ Cocok untuk occasion spesial (wisuda, ultah, anniversary, congratulations)
✅ Buatan UMKM/kreator lokal
✅ Memiliki nilai personal/emotional

**Produk Lain:**
Kreator bisa menawarkan produk custom lain selama:
- Sesuai dengan nilai platform (hadiah personal)
- Bisa diproses melalui sistem chat & Order Brief
- Memenuhi standar kualitas Gifteria

**Produk yang TIDAK Sesuai:**
❌ Elektronik mass-produced (HP, laptop, TV)
❌ Barang ilegal atau dilarang
❌ Produk tanpa nilai personal/customization

**Pertanyaan Khusus Produk:**
Jika produk kamu unik atau tidak masuk kategori di atas, hubungi Operations untuk diskusi kelayakan.`,
    keywords: "produk, jual, bucket bunga, gift box, hampers, handmade, custom, katalog, kategori",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 2,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  {
    slug: "cara-upload-produk",
    title: "Bagaimana cara upload produk?",
    category: "Produk",
    content: `**Step-by-Step Upload Produk:**

**1. Masuk ke Dashboard Kreator**
   - Login ke akun kreator kamu
   - Pilih menu "Produk"

**2. Klik "Tambah Produk Baru"**
   
**3. Isi Detail Produk:**
   - **Nama Produk:** Deskriptif dan menarik (contoh: "Bucket Bunga Mawar Premium")
   - **Kategori:** Pilih kategori yang sesuai
   - **Harga Base:** Harga dasar produk
   - **Range Customization:** Jika ada varian custom dengan harga berbeda
   - **Deskripsi:** Jelaskan produk, bahan, ukuran, keunggulan
   - **Foto Produk:** Upload foto berkualitas baik (min 3-5 foto)
   
**4. Set Options & Variants**
   - **Ukuran:** Small, Medium, Large (jika applicable)
   - **Warna:** Pilihan warna yang tersedia
   - **Add-ons:** Opsi tambahan (kartu ucapan, bonus coklat, dll)

**5. Informasi Produksi & Pengiriman:**
   - **Lead Time:** Waktu yang kamu butuhkan untuk produksi
   - **Area Pengiriman:** Area yang kamu layani
   - **Estimasi Ongkir:** Jika applicable

**6. Preview & Publish**
   - Review semua info
   - Klik "Publish" untuk tampilkan di katalog

**Tips Upload Produk:**
✅ Gunakan foto asli produk kamu (bukan stock photo)
✅ Tulis deskripsi lengkap dan jujur
✅ Set lead time realistis
✅ Update stok secara berkala`,
    keywords: "upload produk, tambah produk, cara, dashboard, foto, deskripsi, publish",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== KOMISI & PEMBAYARAN =====
  {
    slug: "sistem-komisi",
    title: "Bagaimana sistem komisi di Gifteria?",
    category: "Komisi & Pembayaran",
    content: `**Model Pendapatan Gifteria:**
Gifteria menggunakan model komisi per transaksi. Platform mengambil persentase dari setiap transaksi yang berhasil untuk menutupi biaya operasional dan pengembangan platform.

**Struktur Komisi:**
- **Tidak ada biaya pendaftaran** - Gratis join sebagai kreator
- **Tidak ada biaya bulanan** - Tidak ada subscription fee
- **Komisi hanya saat transaksi berhasil** - Pay only when you earn

**Besaran Komisi:**
Persentase komisi yang kompetitif dan fair, dirancang agar menguntungkan kreator sekaligus sustainable untuk platform. Detail persentase akan dijelaskan saat onboarding.

**Mekanisme Payout:**
- **Jadwal Payout:** Regular payout schedule (mingguan/bulanan)
- **Minimum Payout:** Threshold minimum untuk withdrawal
- **Metode Transfer:** Transfer bank ke rekening kreator
- **Transparansi:** Dashboard lengkap untuk track pendapatan & komisi

**Informasi Lebih Lanjut:**
Untuk detail lengkap tentang:
- Persentase komisi spesifik
- Jadwal payout
- Minimum withdrawal
- Metode pembayaran
- Tax/invoice handling

Silakan hubungi tim Operations. Mereka akan menjelaskan secara detail sebelum kamu memutuskan bergabung.`,
    keywords: "komisi, biaya, pembayaran, fee, persentase, payout, pendapatan, transaksi, withdrawal",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 3,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS", "REGISTER_CREATOR"]),
  },

  {
    slug: "cara-terima-pembayaran",
    title: "Bagaimana cara terima pembayaran dari pesanan?",
    category: "Komisi & Pembayaran",
    content: `**Alur Pembayaran di Gifteria:**

**1. Pembeli Checkout:**
   - Setelah Order Brief disetujui kedua pihak
   - Pembeli melakukan payment via payment gateway
   - Uang masuk ke escrow Gifteria

**2. Kreator Proses Pesanan:**
   - Kamu terima notifikasi pesanan baru
   - Mulai produksi sesuai brief
   - Update status produksi di dashboard

**3. Pengiriman & Konfirmasi:**
   - Kamu kirim produk ke pembeli
   - Upload bukti pengiriman (resi/foto)
   - Pembeli konfirmasi terima barang

**4. Dana Dicairkan ke Kreator:**
   - Setelah pembeli konfirmasi atau periode konfirmasi habis
   - Platform memotong komisi
   - Sisa dana masuk ke saldo kreator

**5. Withdrawal:**
   - Kamu bisa withdraw ke rekening bank
   - Sesuai jadwal payout & minimum withdrawal

**Proteksi untuk Kreator:**
✅ Dana pembeli sudah di-hold sejak checkout
✅ Tidak perlu khawatir pembeli tidak bayar
✅ Tracking lengkap di dashboard
✅ Dispute resolution jika ada masalah

**Detail Lebih Lanjut:**
Untuk informasi spesifik tentang timeline payout, metode transfer, dan handling dispute, hubungi tim Operations.`,
    keywords: "pembayaran, terima uang, payout, transfer, dana, escrow, withdraw, rekening",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  // ===== PENGIRIMAN =====
  {
    slug: "pengiriman-dan-area",
    title: "Bagaimana dengan pengiriman dan cakupan area?",
    category: "Pengiriman & Logistik",
    content: `**Fleksibilitas Pengiriman:**
Di Gifteria, setiap kreator punya kebebasan penuh untuk mengelola pengiriman produknya sendiri.

**Kamu yang Menentukan:**
- **Jasa Ekspedisi:** JNE, JNT, SiCepat, GoSend, Grab, kurir pribadi, dll
- **Area Pengiriman:** Lokal, regional, nasional - terserah kamu
- **Estimasi Waktu:** Berapa lama hingga sampai
- **Ongkos Kirim:** Flat rate atau vary by distance

**Pasar Utama:**
Gifteria memulai fokus di **Makassar** dan sekitarnya, tapi platform tidak membatasi area operasional kamu.

**Skenario Fleksibel:**
- **Toko di Surabaya, kirim ke seluruh Indonesia?** ✅ Bisa!
- **Fokus lokal Makassar saja?** ✅ Bisa!
- **Same-day delivery via GoSend?** ✅ Bisa!
- **Prefer ekspedisi regular?** ✅ No problem!

**Koordinasi dengan Pembeli:**
- Chat di platform untuk diskusi detail pengiriman
- Order Brief Compiler akan catat alamat & preferensi pengiriman
- Kamu bisa nego ongkir & metode pengiriman dengan pembeli

**Tracking Pengiriman:**
Setelah kamu kirim, upload resi/bukti kirim di dashboard agar pembeli bisa track.

**Tips Strategi Pengiriman:**
Untuk setup model pengiriman yang optimal untuk bisnis kamu, diskusikan dengan tim Operations.`,
    keywords: "pengiriman, kirim, ekspedisi, ongkir, area, cakupan, surabaya, makassar, jne, jnt, gosend, logistik, delivery, same day",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 3,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  {
    slug: "keterlambatan-pengiriman",
    title: "Bagaimana jika pengiriman terlambat?",
    category: "Pengiriman & Logistik",
    content: `**Kebijakan Keterlambatan Pengiriman:**

**Tanggung Jawab Kreator:**
Kamu bertanggung jawab memastikan produk sampai sesuai deadline yang disepakati di Order Brief.

**Jika Terjadi Keterlambatan:**

**1. Komunikasi Proaktif (WAJIB):**
   - Segera informasikan ke pembeli via chat platform
   - Jelaskan alasan keterlambatan (cuaca, ekspedisi delay, dll)
   - Tawarkan solusi (refund, diskon, compensation)

**2. Update di Dashboard:**
   - Update status pesanan
   - Catat alasan keterlambatan

**3. Koordinasi dengan Platform:**
   - Jika delay signifikan, hubungi Operations
   - Untuk dispute handling atau mediation

**Skenario Keterlambatan:**

**A. Delay Produksi:**
- **Penyebab:** Bahan habis, workload tinggi
- **Solusi:** Inform buyer ASAP, nego new deadline

**B. Delay Ekspedisi:**
- **Penyebab:** Force majeure, cuaca, peak season
- **Solusi:** Share tracking, keep buyer updated

**C. Kesalahan Alamat:**
- **Penyebab:** Alamat tidak lengkap/salah
- **Solusi:** Koordinasi re-delivery dengan buyer

**Pencegahan:**
✅ Set lead time realistis saat upload produk
✅ Buffer time untuk unexpected delays
✅ Komunikasi ekspektasi jelas sejak awal
✅ Pilih ekspedisi reliable

**Dampak Rating:**
Keterlambatan dapat mempengaruhi rating & review kamu. Komunikasi baik adalah kunci.`,
    keywords: "keterlambatan, delay, terlambat, pengiriman, deadline, kompensasi, refund",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  // ===== CHAT & ORDER BRIEF =====
  {
    slug: "cara-kerja-chat-platform",
    title: "Bagaimana cara kerja chat dengan pembeli?",
    category: "Chat & Order Brief",
    content: `**Chat Platform Gifteria:**

Chat di Gifteria seperti WhatsApp - natural, real-time, tapi dengan AI yang membantu.

**Fitur Chat:**
- **Real-time messaging:** Instant delivery
- **Media sharing:** Kirim foto, video untuk referensi
- **Order Brief Preview:** Lihat brief yang sedang dikompilasi AI
- **Evidence linking:** Klik field brief untuk lihat chat aslinya

**Cara Kerjanya:**

**1. Pembeli Mulai Chat:**
   - Pembeli pilih produk kamu atau chat langsung
   - Mereka ceritakan kebutuhan mereka

**2. Kamu Respon:**
   - Tanya detail yang kamu butuhkan
   - Tawarkan opsi customization
   - Diskusi budget, deadline, dll

**3. AI Bekerja di Background:**
   - Ekstrak info dari chat
   - Susun Order Brief secara otomatis
   - Update real-time saat chat berlangsung

**4. Review Brief:**
   - Kamu dan pembeli review brief yang disusun AI
   - Koreksi jika ada yang salah
   - Kedua pihak approve jika sudah sesuai

**5. Checkout:**
   - Brief final jadi "kontrak"
   - Pembeli checkout
   - Kamu mulai produksi

**Tips Chat Efektif:**
✅ Respons cepat (dalam 24 jam)
✅ Tanya detail spesifik (ukuran, warna, occasion)
✅ Kirim foto referensi untuk clarity
✅ Confirm budget & deadline di awal
✅ Friendly & professional

**AI Assistant (Ask Gifteria):**
Jika pembeli tanya sesuatu yang umum, AI bisa bantu jawab otomatis. Tapi untuk custom details, kamu yang handle.`,
    keywords: "chat, pesan, pembeli, komunikasi, respon, order brief, AI, realtime",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  {
    slug: "edit-order-brief",
    title: "Bisakah edit Order Brief setelah disetujui?",
    category: "Chat & Order Brief",
    content: `**Editing Order Brief:**

**Sebelum Checkout (Brief Belum Final):**
✅ Bisa edit kapan saja
✅ Kreator atau pembeli bisa request changes
✅ AI akan update brief based on chat terbaru
✅ Approval ulang diperlukan setelah edit

**Setelah Checkout (Brief Sudah Final):**
⚠️ Brief jadi "kontrak" pesanan
⚠️ Edit lebih sulit dan butuh approval kedua pihak

**Cara Edit Setelah Checkout:**

**1. Minor Changes (tidak ubah harga/scope):**
   - Contoh: ganti warna, ubah pesan kartu
   - Diskusi via chat
   - Update manual di brief dengan mutual agreement

**2. Major Changes (ubah harga/scope):**
   - Contoh: tambah item, ganti produk, ubah quantity
   - Butuh re-negotiation
   - Mungkin perlu adjustment payment
   - Hubungi Operations untuk facilitation

**3. Pembatalan/Refund:**
   - Jika perubahan terlalu besar, consider cancellation
   - Follow kebijakan refund
   - Hubungi Operations

**Best Practice:**
✅ Pastikan brief benar-benar lengkap & akurat sebelum approve
✅ Klarifikasi semua detail di chat
✅ Tanya pembeli konfirmasi final sebelum mereka checkout

**Proteksi:**
Brief final melindungi kedua pihak. Kreator tidak bisa diminta hal di luar brief, pembeli tidak bisa komplain untuk hal yang tidak ada di brief.`,
    keywords: "edit, ubah, order brief, revisi, perubahan, checkout, final",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  // ===== PESANAN & PROSES =====
  {
    slug: "proses-setelah-dapat-pesanan",
    title: "Apa yang harus dilakukan setelah dapat pesanan?",
    category: "Pesanan & Proses",
    content: `**Step-by-Step Setelah Dapat Pesanan:**

**1. Notifikasi Masuk:**
   - Kamu dapat notif email & di dashboard
   - Order Brief sudah final
   - Payment sudah masuk ke escrow

**2. Review Order Brief (dalam 24 jam):**
   - Baca ulang semua detail di brief
   - Pastikan kamu bisa fulfill semua requirement
   - Jika ada yang tidak mungkin, inform ASAP

**3. Accept Pesanan:**
   - Klik "Accept Order" di dashboard
   - Ini commit kamu untuk proses pesanan

**4. Mulai Produksi:**
   - Siapkan bahan/materials
   - Kerjakan sesuai spesifikasi di brief
   - Update status produksi di dashboard (opsional tapi recommended)

**5. Komunikasi Progress:**
   - Update pembeli via chat jika ada pertanyaan
   - Share progress photos (jika buyer minta)
   - Inform jika ada delay atau kendala

**6. Quality Check:**
   - Pastikan produk sesuai brief
   - Photo documentation (untuk dispute protection)

**7. Packaging & Pengiriman:**
   - Pack dengan aman dan cantik
   - Attach kartu ucapan (jika ada di brief)
   - Kirim via ekspedisi yang disepakati

**8. Upload Proof of Shipment:**
   - Upload resi/tracking number
   - Upload foto paket (jika applicable)
   - System otomatis notify pembeli

**9. Tunggu Konfirmasi:**
   - Pembeli confirm received
   - Atau auto-confirm setelah periode tertentu

**10. Dana Cair:**
   - Setelah konfirmasi, dana masuk ke saldo kamu
   - Dikurangi komisi platform

**Tips:**
✅ Respons cepat = rating bagus
✅ Over-communicate lebih baik dari under-communicate
✅ Photo documentation penting untuk proteksi`,
    keywords: "pesanan, proses, langkah, setelah, checkout, produksi, accept, terima",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  {
    slug: "cancel-refund-pesanan",
    title: "Bagaimana dengan pembatalan dan refund?",
    category: "Pesanan & Proses",
    content: `**Kebijakan Pembatalan & Refund:**

**Pembatalan oleh Pembeli:**

**Sebelum Kreator Accept:**
✅ Full refund
✅ Mudah, langsung dari dashboard
✅ Dana return ke pembeli dalam 3-7 hari kerja

**Setelah Kreator Accept, Sebelum Produksi:**
⚠️ Butuh persetujuan kreator
⚠️ Possible cancellation fee (nego with kreator)
⚠️ Jika kreator sudah beli bahan, mungkin partial refund

**Setelah Produksi Dimulai:**
❌ Sulit untuk cancel
❌ Jika cancel, kreator berhak charge production cost
❌ Nego case-by-case

**Setelah Dikirim:**
❌ Tidak bisa cancel, tapi bisa return jika produk bermasalah

**Pembatalan oleh Kreator:**

**Sebelum Accept:**
✅ Boleh reject dengan alasan jelas
✅ Full refund ke pembeli

**Setelah Accept:**
⚠️ Sangat tidak direkomendasikan (bad rating)
⚠️ Full refund + possible penalty
⚠️ Hubungi Operations untuk facilitation

**Refund Scenarios:**

**1. Produk Tidak Sesuai Brief:**
   - Pembeli foto & report
   - Platform review
   - Jika terbukti, full/partial refund + kreator kena penalty

**2. Produk Rusak saat Pengiriman:**
   - Tergantung siapa yang handle shipping
   - Jika kreator arrange: kreator tanggung jawab
   - Jika buyer arrange: buyer tanggung jawab
   - Insurance claim jika applicable

**3. Keterlambatan Ekstrim:**
   - Jika delay signifikan tanpa komunikasi
   - Buyer berhak refund
   - Kreator rating turun

**Dispute Resolution:**
Jika ada sengketa refund, hubungi Operations. Mereka akan mediasi secara fair berdasarkan evidence (chat, brief, foto).`,
    keywords: "cancel, batalkan, refund, pengembalian, uang, dana, dispute, rusak",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  // ===== DASHBOARD & FITUR =====
  {
    slug: "fitur-dashboard-kreator",
    title: "Apa saja fitur di Dashboard Kreator?",
    category: "Dashboard & Fitur",
    content: `**Dashboard Kreator - Control Center kamu:**

**1. Overview / Home:**
   - **Total Penjualan:** Revenue sampai saat ini
   - **Pesanan Aktif:** Pesanan yang sedang diproses
   - **Rating & Review:** Feedback dari pembeli
   - **Grafik Performa:** Sales trend, popular products

**2. Produk Management:**
   - **Katalog Produk:** List semua produk kamu
   - **Tambah Produk:** Upload produk baru
   - **Edit/Hapus Produk:** Update info atau remove dari katalog
   - **Stok Management:** Update availability

**3. Pesanan (Orders):**
   - **Pesanan Baru:** Notif pesanan yang butuh action
   - **In Progress:** Pesanan yang sedang kamu kerjakan
   - **Completed:** History pesanan selesai
   - **Cancelled/Refunded:** Track pembatalan

**4. Chat & Messages:**
   - **Active Chats:** Chat dengan pembeli
   - **Order Brief Preview:** Lihat brief yang dikompilasi
   - **Quick Actions:** Approve brief, request changes

**5. Keuangan:**
   - **Saldo Tersedia:** Dana siap withdraw
   - **Pending Balance:** Dana di escrow (pesanan in-progress)
   - **Transaction History:** Detail income & komisi
   - **Withdrawal:** Request payout ke rekening

**6. Analytics & Insights:**
   - **Sales Performance:** Grafik penjualan
   - **Popular Products:** Produk terlaris
   - **Customer Insights:** Demographics & behavior
   - **Peak Times:** Kapan pembeli paling aktif

**7. Profile & Settings:**
   - **Creator Profile:** Bio, foto, contact info
   - **Bank Details:** Info rekening untuk payout
   - **Notification Settings:** Email/push notif preferences
   - **Operational Hours:** Jam operasional toko

**8. Ask Gifteria (AI Assistant):**
   - **Help Center:** Tanya apa aja tentang platform
   - **Knowledge Base:** Artikel panduan
   - **Quick Tips:** Saran optimize jualan

Semua fitur dirancang untuk memudahkan kamu manage bisnis dari satu tempat.`,
    keywords: "dashboard, fitur, kreator, pesanan, produk, analytics, saldo, keuangan",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  {
    slug: "ask-gifteria-ai-assistant",
    title: "Apa itu Ask Gifteria?",
    category: "Dashboard & Fitur",
    content: `**Ask Gifteria - AI Assistant untuk Kreator**

Ask Gifteria adalah chatbot AI yang siap bantu kamu dengan pertanyaan seputar platform Gifteria. Ini yang lagi kamu pakai sekarang!

**Apa yang Bisa Ask Gifteria Bantu:**
✅ **Panduan Platform:** Cara upload produk, terima pesanan, withdraw dana
✅ **Kebijakan:** Komisi, refund, shipping, terms & conditions
✅ **Troubleshooting:** Kenapa produk tidak muncul, kenapa dana belum cair, dll
✅ **Best Practices:** Tips optimize katalog, komunikasi dengan pembeli, dll
✅ **FAQ:** Jawab pertanyaan umum instant

**Cara Menggunakan:**
1. Klik icon "Ask Gifteria" di dashboard
2. Ketik pertanyaan kamu dalam bahasa natural (Indonesia/English)
3. AI akan jawab berdasarkan knowledge base resmi Gifteria

**Keunggulan:**
- **24/7 Available:** Tanya kapan aja
- **Instant Answer:** Tidak perlu tunggu tim human
- **Evidence-Based:** Jawaban berdasarkan dokumentasi resmi
- **Friendly & Conversational:** Seperti chat dengan teman

**Batasan:**
❌ Tidak bisa akses data pribadi/transaksi spesifik kamu
❌ Tidak bisa approve/reject pesanan atau action dashboard
❌ Tidak bisa jawab pertanyaan di luar konteks Gifteria

**Kapan Harus Hubungi Operations:**
Jika pertanyaan kamu tentang:
- Detail kontrak/legal spesifik
- Dispute yang butuh mediasi human
- Request fitur baru
- Komplain/escalation serius
- Data keuangan spesifik (tax, invoice)

Maka Ask Gifteria akan suggest kamu hubungi tim Operations.

**Feedback:**
Setiap jawaban Ask Gifteria bisa kamu rate 👍👎 untuk bantu improve accuracy.`,
    keywords: "ask gifteria, AI, assistant, chatbot, bantuan, help, tanya jawab, FAQ",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== REGISTRASI & ONBOARDING =====
  {
    slug: "cara-daftar-jadi-kreator",
    title: "Bagaimana cara daftar jadi kreator di Gifteria?",
    category: "Registrasi & Onboarding",
    content: `**Step-by-Step Daftar Kreator:**

**1. Persiapan Dokumen:**
   - **KTP/Identitas:** Untuk verifikasi
   - **Foto Produk:** Portfolio produk kamu (min 3-5 foto)
   - **Info Rekening Bank:** Untuk payout
   - **Contact Info:** Email & nomor HP aktif

**2. Registrasi Online:**
   - Kunjungi website Gifteria
   - Klik "Daftar Sebagai Kreator"
   - Isi form registrasi (nama, email, bisnis name, kategori produk)

**3. Verifikasi:**
   - Cek email untuk verification link
   - Klik link untuk activate account

**4. Complete Profile:**
   - Login ke dashboard kreator
   - Lengkapi profile (bio, foto profile, banner toko)
   - Upload portfolio produk

**5. Onboarding Call (Opsional):**
   - Tim Operations mungkin schedule call
   - Untuk explain detail platform, komisi, best practices
   - Kesempatan kamu tanya apa aja

**6. Upload Produk Pertama:**
   - Mulai upload 1-3 produk
   - Ikuti guideline upload produk

**7. Review & Approval:**
   - Tim review profile & produk kamu
   - Biasanya 1-3 hari kerja
   - Kamu dapat notif jika approved/need revision

**8. Go Live:**
   - Setelah approved, toko kamu live!
   - Pembeli bisa lihat & pesan produk kamu

**Syarat Kreator:**
✅ UMKM/individu dengan produk gift custom
✅ Bisa produksi & fulfill order
✅ Commit untuk komunikasi responsif
✅ Komitmen kualitas produk & service

**Timeline:**
- Registrasi: 10-15 menit
- Verifikasi: Instant
- Approval: 1-3 hari kerja

**Pertanyaan Detail:**
Untuk pertanyaan spesifik seputar registrasi atau persyaratan, hubungi tim Operations.`,
    keywords: "daftar, registrasi, join, kreator, seller, sign up, cara, syarat",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["REGISTER_CREATOR", "CONTACT_OPERATIONS"]),
  },

  // ===== OPERATIONS & SUPPORT =====
  {
    slug: "cara-hubungi-operations",
    title: "Bagaimana cara menghubungi tim Operations?",
    category: "Operations & Support",
    content: `**Kontak Tim Operations Gifteria:**

**WhatsApp:**
[Nomor akan di-update setelah finalisasi]
- Fastest response untuk urgent matters
- Available during operational hours

**Email:**
operations@gifteria.com
- Untuk pertanyaan non-urgent
- Untuk dokumentasi tertulis

**Dari Dashboard:**
- Ada tombol "Hubungi Operations" di beberapa section
- Form contact langsung terintegrasi dengan ticketing system

**Response Time:**
- WhatsApp: 1-4 jam during business hours
- Email: 24-48 jam

**Kapan Harus Hubungi Operations:**
✅ Pertanyaan detail tentang komisi, payout, kontrak
✅ Dispute dengan pembeli yang butuh mediasi
✅ Technical issue yang tidak resolved via Ask Gifteria
✅ Request fitur atau feedback platform
✅ Pertanyaan kelayakan produk khusus
✅ Verifikasi akun atau approval delays
✅ Escalation untuk urgent matters

**Sebelum Hubungi Operations:**
1. Cek dulu Ask Gifteria - banyak pertanyaan umum bisa langsung dijawab
2. Cek FAQ & knowledge base
3. Siapkan detail lengkap (order ID, screenshot, dll) untuk faster resolution

Tim Operations siap membantu untuk hal-hal yang butuh intervention human atau detail spesifik di luar knowledge base.`,
    keywords: "hubungi, kontak, operations, support, bantuan, tim, email, whatsapp, help",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  // ===== FAQ KREATOR: RATING & REVIEW =====
  {
    slug: "sistem-rating-dan-review",
    title: "Bagaimana sistem rating dan review di Gifteria?",
    category: "Rating & Review",
    content: `**Sistem Rating & Review:**

**Rating:**
- **Scale:** 1-5 bintang (⭐)
- **Categories:** Overall, Kualitas Produk, Komunikasi, Ketepatan Waktu, Sesuai Brief
- **Average:** Ditampilkan di profile kreator & setiap produk

**Review:**
- **Kapan:** Setelah pesanan completed & confirmed
- **Format:** Text review + rating bintang
- **Visibility:** Public di profile kreator
- **Response:** Kreator bisa reply ke review

**Komponen Rating:**
1. **Kualitas Produk (40%):** Sesuai ekspektasi, bahan bagus, finishing rapi
2. **Komunikasi (20%):** Responsif, jelas, friendly
3. **Ketepatan Waktu (20%):** On-time delivery sesuai deadline
4. **Sesuai Brief (20%):** Produk match dengan Order Brief yang disetujui

**Impact Rating:**
✅ **Rating Tinggi (4.5-5.0):**
   - Produk muncul lebih tinggi di search results
   - Badge "Top Rated Creator"
   - Lebih dipercaya pembeli

⚠️ **Rating Sedang (3.5-4.4):**
   - Perlu improvement
   - Kompetisi lebih ketat

❌ **Rating Rendah (<3.5):**
   - Produk turun di ranking
   - Warning dari platform
   - Possible account review jika konsisten rendah

**Cara Improve Rating:**
✅ Kualitas produk konsisten
✅ Komunikasi responsif & jelas
✅ Deliver on-time atau lebih cepat
✅ Follow Order Brief dengan presisi
✅ Handle komplain dengan baik
✅ Over-deliver expectations (bonus item, packaging cantik, dll)

**Jika Dapat Review Negatif:**
1. **Tetap Tenang:** Jangan defensive
2. **Reply Professional:** Acknowledge issue, explain, apologize if needed
3. **Offer Solution:** Refund, remake, compensation
4. **Learn & Improve:** Jangan repeat mistake
5. **Report Jika Unfair:** Jika review jelas tidak fair/abusive, report ke Operations

**Fake Reviews:**
Platform punya system detect fake/manipulated reviews. Don't try to game the system - fokus pada kualitas asli.`,
    keywords: "rating, review, bintang, feedback, ulasan, reputasi, testimoni",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== FAQ KREATOR: KOMPETISI =====
  {
    slug: "kompetisi-dengan-kreator-lain",
    title: "Bagaimana kalau ada kreator lain jual produk serupa?",
    category: "Kompetisi & Diferensiasi",
    content: `**Kompetisi Sehat di Gifteria:**

**Realita:**
Di marketplace, wajar ada banyak kreator dengan produk serupa (misalnya: bucket bunga, gift box coklat). Gifteria encourage kompetisi sehat yang benefit customer.

**Cara Diferensiasi:**

**1. Unique Style/Signature:**
   - Punya ciri khas design (warna, arrangement, packaging)
   - Build recognizable brand aesthetic

**2. Kualitas Konsisten:**
   - Lebih baik konisten bagus daripada hit-or-miss
   - Rating tinggi = repeat customer

**3. Service Excellence:**
   - Respons cepat
   - Komunikasi friendly
   - Extra mile (handwritten card, bonus item)

**4. Customization Flexibility:**
   - Lebih flexible untuk request khusus
   - Bisa handle last-minute orders

**5. Pricing Strategy:**
   - Tidak harus termurah - value matters
   - Offer bundle/package deals
   - Loyalty discount for repeat customers

**6. Story & Branding:**
   - Share behind-the-scenes
   - Tell your story (local UMKM, sustainable materials, dll)
   - Build emotional connection dengan customers

**7. Portfolio & Portofolio:**
   - Upload banyak foto real results
   - Before-after showcase
   - Testimonial photos dari happy customers

**Platform Fairness:**
- Gifteria tidak favorit satu kreator
- Ranking based on relevance, rating, & sales performance
- Semua kreator punya equal opportunity

**Kolaborasi > Kompetisi:**
- Bisa refer customer ke kreator lain jika kamu fully booked
- Share tips & tricks di community (jika ada)
- Grow together

**Focus on You:**
Jangan terlalu fokus pada kompetitor. Focus improve produk & service kamu. Customers appreciate authenticity & quality.`,
    keywords: "kompetisi, pesaing, kreator lain, diferensiasi, unik, beda, saingan",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== FAQ PEMBELI =====
  {
    slug: "cara-pesan-di-gifteria",
    title: "Bagaimana cara pesan produk di Gifteria? (Pembeli)",
    category: "FAQ Pembeli",
    content: `**Panduan Pesan untuk Pembeli:**

**Step 1: Browse Katalog**
   - Lihat-lihat produk di katalog
   - Filter berdasarkan kategori, harga, lokasi kreator

**Step 2: Pilih Produk & Kreator**
   - Klik produk yang menarik
   - Lihat detail, foto, rating kreator

**Step 3: Chat dengan Kreator**
   - Klik "Chat Kreator"
   - Ceritakan kebutuhan kamu:
     * Untuk occasion apa (wisuda, ultah, dll)
     * Budget range
     * Deadline kapan
     * Special requests (warna, pesan kartu, dll)

**Step 4: Order Brief Dikompilasi**
   - AI menyusun brief pesanan dari chat
   - Brief otomatis update selama kamu diskusi dengan kreator
   - Lihat preview brief di sidebar chat

**Step 5: Review & Approve Brief**
   - Cek semua detail di brief: produk, harga, deadline, alamat
   - Klik field untuk lihat evidence dari chat
   - Jika ada yang salah, diskusi lagi dengan kreator
   - Jika sudah oke, klik "Approve Brief"

**Step 6: Kreator Juga Approve**
   - Kreator review brief
   - Jika kreator juga approve, brief jadi final

**Step 7: Checkout**
   - Klik "Checkout"
   - Pilih metode pembayaran
   - Bayar

**Step 8: Kreator Proses Pesanan**
   - Kamu dapat notif setiap update status
   - Bisa track progress di dashboard

**Step 9: Terima Produk**
   - Cek kualitas produk
   - Klik "Confirm Received"

**Step 10: Rating & Review**
   - Kasih rating & review untuk kreator
   - Bantu pembeli lain membuat keputusan

**Tips:**
✅ Komunikasi jelas sejak awal
✅ Upload foto referensi untuk customization
✅ Pastikan alamat lengkap & benar
✅ Order jauh-jauh hari untuk produk custom (min 3-7 hari)`,
    keywords: "cara pesan, order, beli, pembeli, buyer, checkout, langkah, panduan customer",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== FAQ TENTANG AI =====
  {
    slug: "apakah-ai-bisa-salah",
    title: "Apakah AI di Gifteria bisa salah?",
    category: "FAQ Tentang AI",
    content: `**AI & Akurasi:**

**Jawaban Jujur: Ya, AI bisa salah.**

AI di Gifteria (Order Brief Compiler & Ask Gifteria) adalah tool yang sangat membantu, tapi tidak sempurna 100%.

**Bagaimana AI Bisa Salah:**

**1. Order Brief Compiler:**
   - Bisa salah ekstrak info dari chat (misalnya: salah baca angka, salah interpret context)
   - Bisa propose field yang tidak sesuai
   - Bisa miss detail yang subtle

**2. Ask Gifteria (AI Assistant):**
   - Bisa salah interpret pertanyaan
   - Bisa tidak punya knowledge untuk pertanyaan sangat specific
   - Bisa jawab based on outdated info (jika knowledge base belum updated)

**Proteksi Terhadap Kesalahan AI:**

**Untuk Order Brief:**
✅ **Human in the Loop:** Brief HARUS approved oleh kreator & pembeli
✅ **Evidence-Based:** Setiap field bisa diklik untuk cek chat aslinya
✅ **Edit Capability:** Kreator & pembeli bisa edit manual
✅ **Final Review:** Ada langkah final review sebelum checkout

**Untuk Ask Gifteria:**
✅ **Knowledge Base Verified:** Jawaban based on approved knowledge
✅ **Disclaimer:** Ask Gifteria akan bilang "Hubungi Operations" jika tidak yakin
✅ **Feedback Loop:** Kamu bisa rate jawaban 👍👎 untuk improve

**Best Practice:**
- **Jangan 100% Trust AI:** Selalu human verify
- **Double Check Brief:** Sebelum approve, baca baik-baik
- **Communicate:** Jika AI salah ekstrak, diskusi via chat
- **Report:** Jika AI konsisten salah di area tertentu, report ke Operations

**AI Sebagai Assistant, Bukan Replacement:**
AI di Gifteria designed untuk membantu, mempercepat, dan mempermudah - tapi keputusan final tetap di tangan manusia (kamu & pembeli).`,
    keywords: "AI salah, akurasi, error, kesalahan, artificial intelligence, machine learning",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== PERTANYAAN DI LUAR TOPIK =====
  {
    slug: "pertanyaan-di-luar-gifteria",
    title: "Bagaimana dengan pertanyaan di luar topik Gifteria?",
    category: "FAQ Tentang AI",
    content: `**Batasan Ask Gifteria:**

Ask Gifteria dirancang khusus untuk menjawab pertanyaan seputar platform Gifteria. 

**Yang BISA dijawab:**
✅ Cara gunakan platform
✅ Kebijakan & aturan Gifteria
✅ Fitur dashboard
✅ Order Brief Compiler
✅ Sistem komisi, pembayaran, pengiriman
✅ Troubleshooting platform
✅ Best practices untuk kreator

**Yang TIDAK BISA dijawab:**
❌ Pertanyaan umum di luar Gifteria (programming, kesehatan, berita, dll)
❌ Tugas sekolah/kuliah
❌ Request coding/technical di luar Gifteria
❌ Pertanyaan pribadi yang tidak relevan dengan bisnis di Gifteria

**Jika Kamu Tanya di Luar Topik:**
Ask Gifteria akan ramah remind bahwa fokusnya adalah Gifteria, dan suggest kamu cari di tempat lain untuk pertanyaan umum.

**Kenapa Dibatasi:**
- Agar jawaban fokus & akurat untuk Gifteria context
- Menghindari misinformasi untuk topik di luar expertise
- Menjaga kualitas knowledge base yang verified

**Untuk Pertanyaan Umum:**
Silakan gunakan search engine umum (Google) atau AI assistant general-purpose (ChatGPT, Gemini, dll).

Ask Gifteria tetap siap membantu untuk SEMUA hal yang berkaitan dengan platform Gifteria! 🎁`,
    keywords: "luar topik, off topic, tidak relevan, batasan, scope, general question",
    status: "APPROVED" as const,
    riskLevel: "GENERAL" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify([]),
  },

  // ===== KEBIJAKAN OPERASIONAL (POLICIES) =====
  {
    slug: "kebijakan-produk-terlarang",
    title: "Kebijakan: Produk yang Dilarang",
    category: "Kebijakan Operasional",
    content: `**Produk yang DILARANG di Gifteria:**

**Kategori Terlarang:**

❌ **Ilegal/Restricted Items:**
   - Narkoba, obat-obatan terlarang
   - Senjata api, senjata tajam
   - Bahan peledak, bahan berbahaya
   - Produk copyright infringement (fake branded items)

❌ **Produk Sensitif:**
   - Produk dengan konten pornografi/dewasa
   - Produk yang promote kekerasan, kebencian, diskriminasi
   - Produk dengan simbol offensive

❌ **Produk Non-Gift:**
   - Elektronik mass-produced (HP, laptop, TV) - kecuali custom gift-wrapped
   - Peralatan rumah tangga generic
   - Barang industrial/wholesale
   - Kendaraan

❌ **Makanan/Minuman Tanpa Izin:**
   - Makanan/minuman yang butuh BPOM/izin khusus tapi tidak punya
   - Produk expired atau tidak layak konsumsi

❌ **Live Animals:**
   - Hewan hidup (pets, dll)

**Jika Upload Produk Terlarang:**
1. Tim review akan reject produk
2. Kamu dapat notifikasi penjelasan
3. Bisa resubmit dengan produk yang compliant
4. Jika repeat violation: warning atau account suspension

**Jika Ragu:**
Jika produk kamu unique dan kamu tidak yakin apakah allowed, hubungi Operations sebelum upload.

**Tujuan Policy:**
- Menjaga keamanan & legalitas platform
- Melindungi pembeli dari produk berbahaya
- Maintain brand image Gifteria sebagai platform gift yang positif`,
    keywords: "terlarang, dilarang, prohibited, ilegal, restricted, kebijakan, policy, banned",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  {
    slug: "kebijakan-komunikasi-di-luar-platform",
    title: "Kebijakan: Komunikasi & Transaksi di Luar Platform",
    category: "Kebijakan Operasional",
    content: `**Aturan Komunikasi & Transaksi:**

**WAJIB melalui Platform:**
✅ Semua komunikasi order harus via chat platform
✅ Semua transaksi pembayaran harus via payment gateway Gifteria
✅ Order Brief harus disusun & disetujui di platform

**DILARANG:**
❌ Minta pembeli transfer langsung ke rekening pribadi
❌ Lanjutkan negosiasi di WhatsApp pribadi/Instagram DM
❌ Checkout di luar platform untuk hindari komisi
❌ Share kontak pribadi untuk bypass platform

**Kenapa Aturan Ini Penting:**

**Untuk Kreator:**
✅ Proteksi payment (dana di-hold sampai confirmed)
✅ Dispute resolution by platform (evidence dari chat & brief)
✅ Legal protection jika ada masalah
✅ Track record penjualan & rating

**Untuk Pembeli:**
✅ Payment security (refund jika bermasalah)
✅ Clear order specification (Order Brief)
✅ Platform mediation jika dispute
✅ Verified seller

**Exception:**
- **Koordinasi Pengiriman:** Boleh share nomor HP untuk koordinasi kurir (after checkout)
- **Urgent Communication:** Jika platform down, boleh komunikasi via personal contact untuk urgent matters (tapi tetap document di platform setelahnya)

**Konsekuensi Violation:**
1. **Warning pertama:** Notifikasi & edukasi
2. **Repeat offense:** Temporary suspension
3. **Serious/repeated violation:** Account termination

**Report:**
Jika pembeli minta transaksi di luar platform, inform Operations. Jangan comply.

**Bottom Line:**
Platform fee (komisi) adalah exchange untuk proteksi, tools, & marketplace access. Bypass platform = lose protections.`,
    keywords: "komunikasi, transaksi, di luar platform, bypass, whatsapp pribadi, transfer langsung, kebijakan",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },

  {
    slug: "kebijakan-manipulasi-rating",
    title: "Kebijakan: Manipulasi Rating & Review",
    category: "Kebijakan Operasional",
    content: `**Anti-Manipulation Policy:**

**Yang DILARANG:**
❌ **Fake Reviews:**
   - Minta teman/keluarga buat fake order & kasih 5 bintang
   - Beli review dari pihak ketiga

❌ **Incentivized Reviews:**
   - Tawarkan diskon/bonus untuk review positif
   - Paksa/minta pembeli kasih 5 bintang

❌ **Review Competitor:**
   - Buat fake account untuk kasih review negatif ke competitor

❌ **Delete/Hide Negative Reviews:**
   - Minta pembeli hapus/edit review negatif dengan imbalan

**Yang BOLEH:**
✅ **Remind to Review:**
   - "Kalau puas, boleh kasih review ya!" - OK

✅ **Respond to Reviews:**
   - Reply ke review (positif/negatif) dengan professional - Encouraged

✅ **Improve Based on Feedback:**
   - Learn from negative reviews & improve

**Detection System:**
Platform punya algoritma detect:
- Suspicious review patterns
- Fake accounts
- Unnatural 5-star spikes
- Reviews dari IP/device yang sama

**Konsekuensi:**
1. **Detected fake reviews:** Removed + warning
2. **Repeat offense:** Account suspension
3. **Serious manipulation:** Permanent ban + refund affected buyers

**Fair Competition:**
Gifteria committed untuk fair marketplace. Manipulasi rating = unfair advantage = not tolerated.

**Report:**
Jika kamu suspect kompetitor manipulasi rating, report ke Operations dengan evidence.

**Grow Organically:**
Focus on quality & service. Authentic positive reviews will come naturally.`,
    keywords: "rating, review, manipulasi, fake, cheating, fraud, kebijakan, banned",
    status: "APPROVED" as const,
    riskLevel: "POLICY" as const,
    version: 1,
    effectiveFrom: new Date("2026-01-01"),
    approvedAt: new Date("2026-01-01"),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  },
];

async function main() {
  console.log("🚀 Seeding comprehensive knowledge base...");
  console.log("📚 Total articles: " + comprehensiveKnowledge.length);

  // Clear existing knowledge (optional - comment out if you want to keep old articles)
  console.log("\n⚠️  Clearing existing knowledge...");
  await prisma.creatorKnowledgeArticle.deleteMany({});

  // Insert comprehensive knowledge
  for (const article of comprehensiveKnowledge) {
    await prisma.creatorKnowledgeArticle.create({
      data: article,
    });
    console.log(`✅ Created: ${article.title}`);
  }

  console.log("\n✨ Comprehensive knowledge base seeded successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - Tentang Platform: 2 articles`);
  console.log(`   - Order Brief Compiler: 1 article`);
  console.log(`   - Produk: 2 articles`);
  console.log(`   - Komisi & Pembayaran: 2 articles`);
  console.log(`   - Pengiriman: 2 articles`);
  console.log(`   - Chat & Order Brief: 2 articles`);
  console.log(`   - Pesanan & Proses: 2 articles`);
  console.log(`   - Dashboard & Fitur: 2 articles`);
  console.log(`   - Registrasi: 1 article`);
  console.log(`   - Operations: 1 article`);
  console.log(`   - Rating & Review: 1 article`);
  console.log(`   - Kompetisi: 1 article`);
  console.log(`   - FAQ Pembeli: 1 article`);
  console.log(`   - FAQ Tentang AI: 2 articles`);
  console.log(`   - Kebijakan Operasional: 3 articles`);
  console.log(`   ───────────────────────────`);
  console.log(`   Total: ${comprehensiveKnowledge.length} articles`);
  console.log("\n🎯 All using 'Ask Gifteria' branding");
  console.log("🚫 No 'demo' mentions");
  console.log("✅ Ready for production!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
