# 🚀 Pull Request: CREAT-40 Pengaturan Profil Sanggar & Etalase Kreator

## 📌 Ringkasan Perubahan
Pull Request ini mengimplementasikan fitur **Pengaturan Profil Sanggar & Etalase Kreator** pada dashboard mitra Creathon. Fitur ini memungkinkan artisan/kreator kriya untuk memperbarui identitas sanggar (nama toko, deskripsi filosofi kado, logo studio), detail lokasi workshop untuk pengiriman, nomor kontak WhatsApp bisnis, serta melihat simulasi pratinjau etalase publik secara real-time.

---

## 🛠️ Rincian Implementasi

### 1. **Presentation Layer (Frontend UI)**
- [`app/dashboard/creator/profile/page.tsx`](file:///d:/2-Project/creathon/app/dashboard/creator/profile/page.tsx):
  - Halaman utama manajemen profil kreator berbasis App Router.
  - Integrasi TanStack React Query (`useCreatorProfile`) dengan skeleton loading state.
- [`features/creator-profile/components/CreatorProfileForm.tsx`](file:///d:/2-Project/creathon/features/creator-profile/components/CreatorProfileForm.tsx):
  - Form modular dengan desain **Modern Editorial Creative** (Violet 500 `#6355D9`, Playfair Display, dan Warm Neutrals).
  - Unggah logo/avatar instan dengan dukungan Supabase Storage (`/api/upload`).
  - Kartu simulasi etalase publik (*Live Preview Card*) yang tersinkronisasi secara real-time.

### 2. **Backend & Data Layer (API & Prisma)**
- [`app/api/creator-profile/route.ts`](file:///d:/2-Project/creathon/app/api/creator-profile/route.ts):
  - Handler `GET` & `PUT` yang menghubungkan tabel `CreatorProfile` dan model `User`.
- [`app/api/upload/route.ts`](file:///d:/2-Project/creathon/app/api/upload/route.ts):
  - Endpoint upload file gambar mandiri ke Supabase Storage.

---

## 🧪 Quality Gate & Verifikasi
- [x] **`npm run type-check`**: 0 Type Errors (100% Passed)
- [x] **`npm run lint`**: 0 Errors (100% Passed)
- [x] **Accessibility & Responsivitas**: Mendukung resolusi layar mobile (375px) hingga ultrawide (1440px+).

---

## 📋 Checklist Pengujian Manual
Checklist uji QA selengkapnya tersedia pada dokumen:
👉 [`docs/test/CREAT-40-creator-profile.md`](file:///d:/2-Project/creathon/docs/test/CREAT-40-creator-profile.md)
