# 🎨 Dokumen Spesifikasi Redesign: Halaman Katalog Produk (`/katalog`)
## Creatons UI/UX Design System Handover Specification
**Target Halaman:** `/katalog` (Katalog Busana Adat, Kostum Kreatif & Gift Kriya)\
**Tema Visual:** *Modern Editorial Creative*\
**Dokumen Referensi:** [`Creatons_UI_UX_Design_System.md`](file:///d:/2-Project/creathon/docs/designs/Creatons_UI_UX_Design_System.md) & Poster Panduan [`nilai.jpeg`](file:///d:/2-Project/creathon/docs/designs/nilai.jpeg)\
**Target Audiens Dokumen:** UI/UX Designer, Frontend Developer, Product Owner

---

## 1. 🎯 Latar Belakang & Tujuan Redesign

Halaman `/katalog` saat ini masih menggunakan tema gelap (*dark neon*) yang tidak mencerminkan brand identity Creatons. 

Tujuan dari dokumen ini adalah memberikan panduan teknis dan visual kepada **Tim UI/UX Design** untuk merombak antarmuka katalog menjadi **Modern Editorial Creative**: perpaduan tipografi editorial premium, kanvas terang yang hangat (*warm neutral surface*), *generous whitespace*, dan aksen ungu (*refined violet*) yang mencerminkan karya seni bernilai tinggi, manusiawi, dan terpercaya.

> **Motto Desain:** *"Creativity first, clarity always."*

---

## 2. 🎨 Token Warna & Sistem Palet (Color Tokens)

Seluruh komponen pada halaman katalog **WAJIB** menggunakan token palet resmi berikut:

### A. Surface & Neutral (Kanvas & Teks)
| Token | Hex Code | Penggunaan di Halaman Katalog |
| :--- | :--- | :--- |
| **`Neutral 50`** | `#FAFAFA` | Latar belakang (*page background*) utama halaman |
| **`Neutral 100`** | `#F5F5F7` | Background section filter & soft card hover |
| **`Neutral 200`** | `#E5E7EB` | Garis batas (*border*) card, search bar, dan divider |
| **`Neutral 300`** | `#D1D5DB` | Garis batas non-aktif & placeholder divider |
| **`Neutral 500`** | `#6B7280` | Teks sekunder (nama kota, kategori, subtitle) |
| **`Neutral 900`** | `#111827` | Teks utama (judul produk, harga, nama toko) |
| **`White`** | `#FFFFFF` | Permukaan kartu produk (*card surface*) & container modal |

### B. Primary Action — Violet
| Token | Hex Code | Penggunaan di Halaman Katalog |
| :--- | :--- | :--- |
| **`Violet 50`** | `#F5F3FF` | Background badge kategori & soft pill aktif |
| **`Violet 100`** | `#EDE9FE` | State hover pada pill kategori |
| **`Violet 500`** | `#6366F1` | **Tombol Aksi Utama** ("Sewa Sekarang", "Cari") |
| **`Violet 600`** | `#4F46E5` | State hover tombol aksi utama |
| **`Violet 700`** | `#4338CA` | State pressed / active |

### C. Aksen & Semantik
| Token | Hex Code | Penggunaan |
| :--- | :--- | :--- |
| **`Warning Yellow`**| `#F59E0B` | Bintang ulasan rating produk (`★ 4.9`) |
| **`Success Green`** | `#22C55E` | Badge *"Ready Stock"* / *"Mitra Terverifikasi"* |
| **`Coral Accent`**  | `#FF6B6B` | Tombol Wishlist / Favorite Icon |

---

## 3. ✍️ Hierarki Tipografi (Typography Hierarchy)

Karakter editorial dibangun dengan memadukan **Serif (Editorial)** dan **Sans-serif (Modern UI)**:

```
[ EDITORIAL SERIF ]  ──►  Headline Hero & Section Title (Playfair Display / Canela)
[ MODERN SANS-SERIF ] ──►  UI Label, Search Bar, Card Metadata, Button (Plus Jakarta Sans / Inter)
```

### Panduan Skala Ukuran:
1. **Hero Display Heading (Serif)**: `36px–48px` / Line-height `1.2` (Desktop), `28px–32px` (Mobile) — *Contoh: "Where heritage meets modern craftsmanship."*
2. **Section Title (Serif/Sans)**: `24px–28px` / Bold — *Contoh: "Koleksi Busana Adat Terpopuler"*
3. **Card Title (Sans-serif)**: `15px–16px` / Semi-bold (Neutral 900)
4. **Body & Price Text**: `14px–16px` / Bold (Neutral 900 atau Violet 600)
5. **Caption & Metadata**: `12px–13px` / Regular (Neutral 500)

---

## 4. 📐 Wireframe & Anatomi Komponen Halaman

### Section 1: Navigation Header (Sticky Top)
- **Karakter**: Background putih / Neutral 50 transparan (`backdrop-blur-md`), tinggi 64px, border-b 1px `Neutral 200`.
- **Elemen**:
  - Logo: `Creatons✦` (dengan spark icon violet).
  - Search Input: Lebar max 480px, rounded-full atau radius 12px, border `Neutral 200`, icon pencarian di sisi kiri.
  - User Action: Link *"Masuk"* (Ghost text) + Tombol *"Buka Studio Rental"* (`Violet 500`, radius 12px).

---

### Section 2: Editorial Hero Banner
- **Karakter**: Tampilan bersih, luas, dan menenangkan (bukan banner gelap/neon).
- **Elemen**:
  - **Badge Pemandu**: `✦ Kurasi Pakaian Adat & Karya Seni Nusantara` (Pill `Violet 50`, text `Violet 600`).
  - **Hero Title**: Tipografi Serif elegan berukuran besar.
  - **Hero Subtitle**: Deskripsi ramah (Neutral 600) yang menjelaskan garansi sewa aman via Escrow Midtrans.
  - **Dekorasi**: Aksen garis halus botani/flora di sudut kanan (transparansi lembut, tidak menutupi teks).

---

### Section 3: Filter & Discovery Bar
- **Pills / Chips Filter Kategori**:
  - Mengadopsi komponen *Chip/Tag* poster design system:
  - `Semua Kategori`, `Pakaian Adat Jawa`, `Busana Sulawesi`, `Kebaya & Beskap`, `Kostum Karnaval`, `Gift & Aksesoris`.
  - **State Aktif**: Background `Violet 500` teks putih atau Neutral 900 (Black pill) dengan shadow tipis.
  - **State Inaktif**: Background putih, border `Neutral 200`, text `Neutral 700`.
- **Filter Bar Kanan**:
  - Filter Kota (Dropdown: Jakarta, Bandung, Makassar, Solo, Bali, Yogyakarta).
  - Urutkan (Dropdown: Terpopuler, Harga Terendah, Rating Tertinggi).

---

### Section 4: Product & Creator Grid (Katalog Card)
Mengadopsi komponen **`04. Component Library (Card)`** pada poster design system:

```
┌────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────┐  │
│  │                                                  │  │
│  │           FOTOGRAFI BUSANA / PRODUK              │  │  <- Ratio 4:3
│  │                                                  │  │     Radius 12px
│  │  ┌─────────────────────┐    ┌─────────────────┐  │  │
│  │  │ ★ Top Rated         │    │ ♡ (Wishlist)    │  │  │
│  │  └─────────────────────┘    └─────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  Studio Flora ✦ Terverifikasi                          │  <- Creator Store (12px, Neutral 500)
│  Baju Bodo Modern Sutera Halus                         │  <- Product Title (16px, Semi-Bold)
│  Makassar, Sulawesi Selatan                            │  <- City (13px, Neutral 500)
│                                                        │
│  ★ 4.9 (38x disewa)            Rp 150.000 / hari       │  <- Rating & Price
│  ────────────────────────────────────────────────────  │
│  [             Tombol "Sewa Sekarang"               ]  │  <- CTA Button (Violet 500)
└────────────────────────────────────────────────────────┘
```

**Spesifikasi Teknis Card:**
- **Surface**: Putih murni (`#FFFFFF`).
- **Border**: `1px solid #E5E7EB` (Neutral 200).
- **Radius**: `16px` (Card Luar), `12px` (Gambar & Tombol).
- **Elevation**: *Soft Shadow* (`box-shadow: 0 1px 3px rgba(16, 24, 40, 0.05)`).
- **Hover Effect**: Card naik halus 2px (`transform: translateY(-2px)`) dengan *Raised Shadow* (`box-shadow: 0 8px 20px rgba(16, 24, 40, 0.08)`).
- **Fotografi**: Pencahayaan natural, model memakai busana secara humanis, tone hangat (*warm tone*).

---

### Section 5: Pagination & Empty State
- **Pagination**: Numbered pagination (`1`, `2`, `3`, `...`, `Next`) dengan active state pill `Violet 500`.
- **Empty State (Bila pencarian tidak ditemukan)**:
  - Ilustrasi outline etnik halus.
  - Teks: *"Belum ada busana yang cocok dengan pencarian Anda."*
  - Tombol: *"Reset Semua Filter"*.

---

## 5. 📱 Panduan Responsivitas (Responsive Breakpoints)

| Breakpoint | Grid Layout Card | Spacing / Gutter | Perilaku Khusus |
| :--- | :--- | :--- | :--- |
| **Mobile (< 640px)** | 1 Kolom (Full width) | Margin 16px, Gutter 16px | Filter Chips menjadi horizontal scroll bar; tombol CTA memenuhi lebar card (*w-full*). |
| **Tablet (640px–1024px)** | 2 Kolom | Margin 24px, Gutter 20px | Filter bar rapi 2 baris; search input menyesuaikan lebar. |
| **Desktop (> 1024px)** | 3 atau 4 Kolom | Margin 32px, Gutter 24px | Layout grid simetris dengan whitespace lega di sekelilingnya. |

---

## 6. 🚦 Acceptance Criteria (Checklist Serah Terima UI/UX)

- [ ] Tidak ada penggunaan warna hitam pekat (*pure dark mode*) atau efek neon cyberpunk pada katalog.
- [ ] Menggunakan palet **Neutral 50 (`#FAFAFA`)** sebagai background dan **Violet 500 (`#6366F1`)** sebagai primary action.
- [ ] Tipografi judul mengadopsi **Editorial Serif**, sedangkan teks UI dan deskripsi menggunakan **Modern Sans-serif**.
- [ ] Card produk memiliki elemen lengkap: Foto (4:3, R: 12px), Tag Status, Nama Toko Creator, Judul Produk, Kota, Rating Bintang Kuning, Harga Sewa/Hari, dan Tombol "Sewa Sekarang".
- [ ] Menggunakan sistem grid 8pt dengan radius standar `12px` (komponen) dan `16px` (container card).
- [ ] Desain telah diuji responsif pada lebar layar HP (375px) tanpa elemen yang terpotong.
