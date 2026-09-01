# 🚀 Pull Request: Release `develop` ➔ `main` (Creathon v1.0.0-beta)

## 📌 Ringkasan Rilis (Executive Summary)
Pull Request ini menggabungkan seluruh fitur inti, perbaikan performa, dan pembaruan visual dari branch `develop` ke branch `main` untuk rilis production marketplace **Creathon (Marketplace Gift, Hampers & Creative Kriya)**.

---

## 📦 Fitur & Modul yang Dirilis

### 1. 🔐 Autentikasi & Registrasi Mitra (`CREAT-21` & Design Update)
- Sistem login & registrasi terintegrasi dengan **Supabase Auth** (Email + Google OAuth).
- Desain *Modern Editorial Luxury* dengan layout responsif, validasi Zod form, dan proteksi rute middleware Next.js.

### 2. 🌸 Halaman Beranda & Showcase Katalog (`CREAT-22`)
- Landing page interaktif dengan animasi **GSAP + Lenis Momentum Smooth Scrolling**.
- Showcase produk kriya unggulan, micro-interactions, navigasi dinamis, dan tipografi harmonis (*Playfair Display* & *Plus Jakarta Sans*).

### 3. 🛍️ Dashboard & Manajemen Produk Kreator (`CREAT-39`)
- Manajemen katalog kriya: Tambah produk baru (`/products/new`), edit detail, dan hapus produk.
- Pencarian cerdas *real-time* dan filter kategori (*Floral, Hampers, Custom Art, Kriya*).
- Unggah multi-foto produk terhubung ke **Supabase Storage**.

### 4. 🏪 Profil Sanggar & Etalase Toko Kreator (`CREAT-40`)
- **Mode Tampilan Etalase (*Showcase View*)**: Menampilkan identitas sanggar, cerita kriya, status operasional, alamat workshop, dan tautan *Direct WhatsApp*.
- **Mode Edit Profil**: Pengaturan nama toko, deskripsi kado, unggah **Foto Logo** dan **Banner Sampul Toko (Landscape)**.

---

## 🧪 Quality Gate & Verifikasi Produksi

| Pengujian | Status | Keterangan |
|---|---|---|
| **TypeScript (`tsc`)** | ✅ **Passed (0 Errors)** | Strict type checking lolos 100% |
| **ESLint** | ✅ **Passed (0 Errors, 0 Warnings)** | Kode bersih dan mematuhi standar Next.js |
| **Turbopack Build** | ✅ **Passed (18/18 Routes)** | 100% rute statis & dinamis ter-compile sukses |
| **Database Sync** | ✅ **Synchronized** | Skema Prisma & PostgreSQL Supabase tersinkronisasi |

---

## 📋 Catatan Deployment
1. Pastikan seluruh Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`, `DIRECT_URL`) terisi pada dashboard hosting production (Vercel/Netlify).
2. Tidak ada langkah migrasi manual yang tertunda (`prisma db push` sudah mutakhir).
