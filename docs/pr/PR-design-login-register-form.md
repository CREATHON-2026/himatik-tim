# 🚀 Pull Request: `design/login-form` ➔ `develop`

## 📌 Metadata PR
- **Task Reference**: `DESIGN-AUTH` / `CREAT-21`
- **Tipe**: `Design & UI Overhaul (style / feat)`
- **Target Branch**: `develop`
- **Source Branch**: `design/login-form`
- **Author**: Frontend & UI/UX Engineering Team
- **Tanggal**: 1 September 2026

---

## 📝 Ringkasan Perubahan (Summary of Changes)

Pembaruan menyeluruh antarmuka **Login** dan **Register Form** mengadopsi estetika **Modern Editorial Creative** berbasis referensi desain resmi ([`docs/designs/login-form.png`](file:///d:/Gifteria/himatik-tim/docs/designs/login-form.png), [`docs/designs/register-from.png`](file:///d:/Gifteria/himatik-tim/docs/designs/register-from.png), [`docs/designs/fixed.png`](file:///d:/Gifteria/himatik-tim/docs/designs/fixed.png), dan [`docs/designs/design-system.md`](file:///d:/Gifteria/himatik-tim/docs/designs/design-system.md)), serta penerapan **Fluid Responsive Engine (`clamp()`)** sesuai [`docs/designs/clamp.md`](file:///d:/Gifteria/himatik-tim/docs/designs/clamp.md):

### 1. 🎨 Identitas Brand & Tipografi Editorial
- Pembaruan nama brand resmi menjadi **`Gifteria✦`** pada header login dan registrasi.
- Konfigurasi font pairing editorial: Google Font **Playfair Display** (Serif) untuk brand title, headings, dan display accents berpadu dengan **Geist Sans** untuk UI form elements.
- Aksen editorial italic violet (`to life.` pada register, `conversation.` pada login).

### 2. 📐 Two-Panel Symmetrical Layout (`AuthLayout.tsx`)
- **Login (`/login`)**: Formulir di sisi **Kiri**, Studio Photography Hero di sisi **Kanan**.
- **Register (`/register`)**: Studio Photography Hero di sisi **Kiri**, Formulir di sisi **Kanan**.
- **Ornamen Antar-Panel**: Emblem diamond star (`✦`) tepat di tengah sumbu vertikal pembatas panel (desktop view).
- **Layer Ornamen Visual**: Ilustrasi botanical floral line art halus, corner bracket geometris, 4x4 subtle dot grid watermark, serta aksen bintang Coral (`#E76F61`).

### 3. 📱 Fluid Responsive Sizing Engine (`clamp()`)
- Mengganti seluruh ukuran statis tinggi/padding yang menyebabkan *overflow* di laptop resolusi standar (1366x768 / 1080p scaling).
- Card container fluid: `maxWidth: clamp(320px, 90vw, 1140px)` dengan batas tinggi `max-h-[calc(100dvh-2rem)]` dan `overflow-y-auto` di form panel.
- Spacing form & font size fluid menggunakan formula `clamp(MIN, IDEAL, MAX)` sehingga proporsional dan tidak terpotong dari resolusi smartphone hingga monitor 4K.

### 4. ⚡ Form UX & Ergonomi Pendaftaran
- **4-Field Frictionless Onboarding**:
  - `Full name` (Leading icon: `User`)
  - `Email address` (Leading icon: `Mail`)
  - `Password` (Leading icon: `Lock`, trailing toggle: `Eye` / `EyeOff`)
  - `Confirm password` (Leading icon: `Lock`, trailing toggle: `Eye` / `EyeOff`)
- **Divider Horizontal**: Format `— OR CONTINUE WITH —` sejajar dengan garis horizontal sesuai `fixed.png`.
- **Social OAuth Button**: Tombol Google OAuth yang selaras dan ringkas.
- **Legal Compliance**: Catatan persetujuan *Terms of Service & Privacy Policy*.

### 5. 🎭 GSAP Motion & Micro-Interactions
- Smooth card entrance animation (`scale: 0.99 -> 1`, `opacity: 0 -> 1`).
- Staggered entrance untuk elemen form input menggunakan `@gsap/react` `useGSAP`.

---

## 📂 Daftar File yang Diubah (Changed Files)

| File | Deskripsi Perubahan |
| :--- | :--- |
| [`features/auth/components/AuthLayout.tsx`](file:///d:/Gifteria/himatik-tim/features/auth/components/AuthLayout.tsx) | Layout split-panel editorial, inter-panel notch, fluid responsive clamp, GSAP card entrance |
| [`features/auth/components/LoginForm.tsx`](file:///d:/Gifteria/himatik-tim/features/auth/components/LoginForm.tsx) | Redesign form login, logo Gifteria✦, icon Mail/Lock/Eye, divider fixed layout |
| [`features/auth/components/RegisterForm.tsx`](file:///d:/Gifteria/himatik-tim/features/auth/components/RegisterForm.tsx) | Redesign form register 4-input, logo Gifteria✦, compact vertical rhythm, divider fixed layout |
| [`features/auth/components/GoogleAuthButton.tsx`](file:///d:/Gifteria/himatik-tim/features/auth/components/GoogleAuthButton.tsx) | Penyesuaian ukuran button compact fluid & style Google OAuth |
| [`features/auth/schema.ts`](file:///d:/Gifteria/himatik-tim/features/auth/schema.ts) | Penyesuaian Zod schema register untuk 4-input esensial |
| [`app/(auth)/login/page.tsx`](file:///d:/Gifteria/himatik-tim/app/%28auth%29/login/page.tsx) | Metadata & konfigurasi AuthLayout login |
| [`app/(auth)/register/page.tsx`](file:///d:/Gifteria/himatik-tim/app/%28auth%29/register/page.tsx) | Metadata, konfigurasi imagePosition="left", hero headline & subtitle |
| [`app/layout.tsx`](file:///d:/Gifteria/himatik-tim/app/layout.tsx) | Head preconnect & stylesheet Google Font Playfair Display |
| [`app/globals.css`](file:///d:/Gifteria/himatik-tim/app/globals.css) | Token variabel `--font-serif` dan utilitas `.font-serif` |
| [`docs/designs/clamp.md`](file:///d:/Gifteria/himatik-tim/docs/designs/clamp.md) | Panduan teknis implementasi formula Fluid Responsive Sizing |

---

## 🧪 Hasil Pengujian & Quality Gates (Test Results)

Sesuai panduan **SOP-DEV-001 (SOP-01 Git Workflow)** Bagian 5:
- [x] **TypeScript Type-Check (`npm run type-check`)**: `tsc --noEmit --skipLibCheck` ➔ **PASSED (0 Errors)**
- [x] **ESLint Quality Check (`npm run lint`)**: `eslint .` ➔ **PASSED (0 Errors)**
- [x] **Local Runtime Verification**:
  - `http://localhost:3000/login` ➔ **Status 200 OK**
  - `http://localhost:3000/register` ➔ **Status 200 OK**
- [x] **Cross-Resolution Responsive Testing**:
  - Mobile Viewport (360px - 480px) ➔ Single Column, scrollable form, full visibility
  - Laptop Viewport (1366x768 & 1080p 125% scaling) ➔ Dua panel seimbang, zero vertical cut-off
  - Desktop Viewport (1920x1080 & Ultrawide) ➔ Proporsional maksimal 1140px, centering sempurna

---

## 🚦 Checklist Verifikasi Developer Sebelum Merge

- [x] Nama branch dan alur merge sesuai standar SOP-01 (`design/login-form` ➔ `develop`)
- [x] Tidak ada file *credential / secret key* (`.env.local`) yang masuk ke Git tracking
- [x] Kode bersih dari *syntax error*, *type error*, dan *unused variables*
- [x] Seluruh komponen UI memanfaatkan design system dan tokens yang konsisten
- [x] Siap untuk deploy ke lingkungan **Staging / Preview**
