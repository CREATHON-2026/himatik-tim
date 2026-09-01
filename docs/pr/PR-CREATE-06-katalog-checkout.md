# Pull Request: Marketplace Publik, Detail Produk Buyer, Checkout & Order Invoicing

## 📌 Deskripsi Singkat
Pull Request ini mengimplementasikan alur lengkap belanja kriya dan kado dari sisi pembeli (Buyer Journey), mulai dari penjelajahan katalog publik, halaman detail produk kado, form checkout & kustomisasi ucapan, hingga invoice digital dan integrasi WhatsApp sanggar.

---

## 🎯 Target Branch
- **Source Branch**: `feat/CREATE-06-katalog`
- **Target Branch**: `develop`

---

## 🚀 Fitur & Komponen Baru

### 1. 🛍️ Katalog Publik ([`app/katalog/page.tsx`](file:///d:/2-Project/creathon/app/katalog/page.tsx))
- Menggantikan mock rental fashion busana adat lama menjadi **Marketplace Kado & Kriya Asli** terhubung ke database.
- Search bar reaktif (*real-time*).
- Filter pills kategori kriya (*Floral, Hampers, Custom Art, Souvenir, Aksesoris*).
- Sort dropdown (*Terbaru, Harga Terendah, Harga Tertinggi*).
- Desain konsisten dengan *Design System Modern Editorial* (Playfair Display + Plus Jakarta Sans + Violet `#6355D9`).

### 2. 📦 Detail Produk Buyer ([`app/katalog/[id]/page.tsx`](file:///d:/2-Project/creathon/app/katalog/[id]/page.tsx))
- Galeri foto produk interaktif dengan image carousel & zoom.
- Informasi produk, harga, stok, badge autentik, dan tag.
- Profil toko/sanggar pembuat dengan badge terverifikasi dan lokasi.
- Tab lengkap: Deskripsi kado, Spesifikasi & Dimensi, Opsi Pengemasan, dan Panduan Perawatan.
- Tombol **"Beli Sekarang"** yang langsung menghubungkan ke halaman checkout.

### 3. 📝 Formulir Checkout & Kustomisasi Kado ([`app/checkout/page.tsx`](file:///d:/2-Project/creathon/app/checkout/page.tsx))
- Input data penerima kado & nomor WhatsApp aktif.
- Pilihan kurir: *Kurir Instant (1-3 Jam)*, *Same Day*, *Ekspedisi Reguler*.
- **Sentuhan Personal Kado (*Gift Customization*)**:
  - Input teks kartu ucapan (*Greeting Card message*).
  - Pilihan kotak & pita (*Paper Wrap Artisan* vs *Luxury Hardbox*).
  - Catatan khusus untuk sanggar.
- Pilihan pembayaran: *QRIS Instan Escrow* & *Virtual Account Bank*.

### 4. 🧾 Invoice Digital & Status Pesanan ([`app/orders/[id]/page.tsx`](file:///d:/2-Project/creathon/app/orders/[id]/page.tsx))
- Menampilkan No. Invoice unik `#CRT-XXXXXXXX`.
- QRIS Code generator dan tombol Salin Nominal.
- Tombol simulasi bayar instan (*Demo Testing*).
- Tombol **"Kirim Rincian ke WhatsApp Sanggar"** dengan template chat invoice otomatis.

### 5. 🌐 Backend Endpoints
- **`GET /api/products?public=true`**: Query publik produk aktif dengan filter & sorting.
- **`GET /api/products/[id]`**: Detail produk publik + profil sanggar kreator.
- **`POST /api/orders`**: Membuat transaksi baru di database Prisma.
- **`GET /api/orders/[id]`** & **`PUT /api/orders/[id]`**: Fetch detail invoice dan update status pembayaran escrow.

### 6. ⚙️ Infrastruktur Global
- **[`components/providers/query-provider.tsx`](file:///d:/2-Project/creathon/components/providers/query-provider.tsx)**: Wrapper global TanStack Query di root layout (`app/layout.tsx`) untuk mencegah error missing QueryClientProvider.

---

## 🧪 Quality Gate & Verifikasi

| Check | Hasil | Keterangan |
|---|---|---|
| **TypeScript (`npm run type-check`)** | ✅ **Passed** | 0 Type Errors |
| **ESLint (`npm run lint`)** | ✅ **Passed** | 0 Errors, 0 Warnings |
| **Next.js Production Build (`npx next build`)** | ✅ **Passed** | 20/20 Routes Compiled Successfully |

---

## 📸 Checklist Pengujian
- [x] Pencarian & filter kategori di `/katalog` berfungsi responsif.
- [x] Klik kartu produk di `/katalog` membuka halaman detail `/katalog/[id]`.
- [x] Tombol "Beli Sekarang" mengarahkan ke `/checkout?productId=...&qty=1`.
- [x] Form checkout menyimpan pesanan ke database dan redirect ke `/orders/[id]`.
- [x] Halaman invoice menampilkan rincian pesanan, QRIS, dan tombol WhatsApp.
