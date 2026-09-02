# Dashboard Creator — UI Content & Structure Documentation

**Halaman:** `/dashboard/creator`
**Source files:**

- `app/dashboard/creator/layout.tsx` — shell layout (sidebar + inset)
- `app/dashboard/creator/page.tsx` — konten dashboard (Server Component)
- `components/shadcn-studio/sidebar/sidebar-creator.tsx` — sidebar navigasi
- `components/DashboardCharts.tsx` — bar chart & donut chart performa produk

**Tujuan dokumen:** Memetakan seluruh konten, struktur komponen, dan styling yang dipakai di halaman ini saat ini (as-built), sebagai acuan untuk re-create/redesign UI supaya konsisten dengan `design-system.md` (Modern Editorial Creative).

---

## ⚠️ Temuan Penting Sebelum Re-create

Halaman ini **tidak konsisten** dengan design system resmi project (`docs/designs/design-system.md`):

| Area                            | Kondisi saat ini                                                          | Seharusnya (design system)                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Layout shell (`layout.tsx`)     | Tema terang, background `#FAFAF9`                                         | ✅ Sudah sesuai                                                                                                                           |
| Sidebar (`sidebar-creator.tsx`) | Tema terang, violet `#6355D9`, radius 12px                                | ✅ Sudah sesuai                                                                                                                           |
| Konten dashboard (`page.tsx`)   | Tema **gelap** (`bg-neutral-950`, card `bg-neutral-900/40`)               | ❌ Harus tema terang, neutral surface                                                                                                     |
| Warna aksen di konten           | **Emerald/green** (`emerald-500`), biru, amber                            | ❌ Harus **Violet** `#6355D9` sebagai primary, Coral hanya restrained accent                                                              |
| Chart (`DashboardCharts.tsx`)   | Warna hardcoded: `#10b981`, `#3b82f6`, `#f59e0b`, dst — tidak pakai token | ❌ Harus pakai token warna dari design system                                                                                             |
| Tombol "Tambah Produk"          | `bg-emerald-500`                                                          | ❌ Harus violet primary (`bg-[#6355D9]`)                                                                                                  |
| Font                            | Tidak eksplisit set (default sans)                                        | Body pakai sans-serif (Plus Jakarta Sans sesuai `globals.css`), heading serif (Playfair Display) tidak dipakai sama sekali di halaman ini |

**Kesimpulan:** Saat re-create, sidebar bisa dijadikan referensi visual (sudah on-brand), tapi seluruh area konten (`main`) perlu di-restyle total ke tema terang + token warna violet/neutral/coral sesuai design system, bukan hanya "porting" warna gelap ke terang secara 1:1.

---

## 1. Struktur Halaman (Layout Shell)

```
<QueryClientProvider>
  <SidebarProvider defaultOpen={true}>
    <div className="flex min-h-screen w-full bg-[#FAFAF9]">
      <SidebarCreator />              ← sidebar kiri, collapsible
      <SidebarInset>                  ← area konten kanan
        {children}                    ← page.tsx dirender di sini
      </SidebarInset>
    </div>
  </SidebarProvider>
</QueryClientProvider>
```

- Root container: flex row, `min-h-screen`, background `#FAFAF9`, text `#111827`.
- Sidebar collapsible (icon mode), lebar animasi 68px (collapsed) ↔ 252px (expanded).
- `SidebarInset` memegang seluruh konten dashboard, `overflow-x-hidden`.

---

## 2. Sidebar Creator — Konten & Styling

### Struktur navigasi (data-driven)

```
Brand Header
  → Icon "spark" (Sparkles) dalam box violet-50, border violet-200
  → Judul "Gifteria" (serif, bold) + subjudul "Creator Studio" (violet, uppercase, tracking wide)

Creator Profile Capsule (soft box)
  → Avatar toko (foto atau fallback icon Store)
  → Nama toko (shopName, dari useCreatorProfile hook)
  → Status "Toko Aktif" (dot hijau + teks)

Nav Section: UTAMA
  - Ringkasan       → /dashboard/creator (exact match, aktif = highlight)
  - Produk Saya     → /dashboard/creator/products
  - Pesanan Masuk   → /dashboard/creator/orders (badge count dari pending orders)

Nav Section: KEUANGAN
  - Saldo & Penarikan → /dashboard/creator/payout

Nav Section: TOKO & PENGATURAN
  - Profil Toko & Etalase → /dashboard/creator/profile
  - Pesan / Chat Pembeli  → disabled, badge "Soon"

Footer
  - Link "Lihat Marketplace" → /katalog
  - Copyright "© 2026 Gifteria Creative"
```

### Styling kunci (sidebar — SUDAH sesuai design system)

- Container: `bg-white`, `border border-[#E7E5E4]`, `rounded-2xl`, `shadow-xs`
- Nav item aktif: `bg-[#F5F3FF]` (violet-50), `text-[#6355D9]`, `border-[#DDD6FE]` (violet-200)
- Nav item hover: `bg-[#F5F5F4]` (neutral-100)
- Badge count: `bg-[#6355D9]` (violet-500), teks putih, rounded-full
- Font brand: serif untuk "Gifteria", sans untuk sisanya
- Animasi: Framer Motion, collapse/expand pakai spring (`stiffness: 350, damping: 30`), durasi teks reveal ~200ms — sudah sejalan dengan motion principle design system (200-350ms, no bounce berlebihan)
- Menghormati `prefers-reduced-motion` via `useReducedMotion()`

---

## 3. Konten Dashboard (page.tsx) — Urutan & Isi Section

### Section 1 — Welcome & Action Banner

```
┌──────────────────────────────────────────────────────┐
│ Studio {storeName}  [✓ Terverifikasi]   [+ Tambah Produk] │
│ Kelola produk, pantau transaksi, dan monitor          │
│ pencairan escrow.                                     │
└──────────────────────────────────────────────────────┘
```

- Judul dinamis: `Studio {storeName}` atau fallback "Creator Studio"
- Badge "Terverifikasi" muncul kondisional (`isVerified`), icon `CheckCircle2`
- Subteks deskripsi statis
- CTA kanan: tombol "Tambah Produk" dengan icon `Plus`
- Styling saat ini: card gelap `bg-neutral-900/50`, border `neutral-800`, radius `rounded-2xl`, tombol `bg-emerald-500`

### Section 2 — 4 Kartu Metrik (Grid)

Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, gap 16px (`gap-4`)

| Kartu                 | Icon                   | Nilai utama                                | Sub-teks                                                                         |
| --------------------- | ---------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| Produk Terdaftar      | `Package`              | `{distinctProducts} Produk`                | `{distinctCategories} Kategori`                                                  |
| Transaksi (28 Hari)   | `Calendar`             | `{transactions} Transaksi`                 | `+{trendPct}% dari periode lalu` (warna berubah sesuai arah trend: up/down/flat) |
| Omzet Kotor (28 Hari) | `Wallet`               | `Rp{revenueFormatted}` (warna hijau/aksen) | `Rata-rata Rp{aovFormatted} / transaksi`                                         |
| Pembeli Unik          | `Star` (filled kuning) | `{uniqueBuyers} Pembeli`                   | `{repeatRatio} transaksi / pembeli`                                              |

- Setiap card: padding 20px (`p-5`), `rounded-2xl`, border tipis, background surface
- Semua data **real dari database** (Prisma query + `buildInsightInputs`), bukan dummy statis
- Data source: `metrics` object dibangun dari `insightInputs.totals`, `comparison`, `breakdown`

### Section 3 — Visualisasi Data (2 Chart, kondisional)

Muncul hanya jika `insightInputs.breakdown.by_product` ada data. Grid 2 kolom (`lg:grid-cols-2`):

**Chart A — Bar Chart Horizontal: "Pendapatan per Produk (28 Hari)"**

- Library: Recharts (`BarChart`, layout vertical/horizontal bar)
- Data: nama produk (Y axis) vs revenue (X axis, format `Rp{val/1000}k`)
- Bar color: hardcoded `#10b981` (emerald)
- Custom tooltip menampilkan: nama produk, "Pendapatan: Rp...", "Terjual: {n}x"

**Chart B — Donut Chart: "Porsi Transaksi Produk"**

- Library: Recharts (`PieChart` dengan `innerRadius`)
- Data: porsi transaksi per produk (dataKey `transactions`)
- Warna per slice: array `["#10b981","#3b82f6","#f59e0b","#6366f1","#8b5cf6","#ec4899"]` (hardcoded, tidak dari token)
- Legend di bawah chart, `iconType="circle"`

### Section 4 — AI Business Insight (kondisional)

Muncul jika ada `insightNarration` dan `insightInputs.facts`. Card dengan border `emerald-500/30` dan gradient background.

```
┌────────────────────────────────────────────────────┐
│ [📈] AI Business Insight            [Period label] │
│      Analisis otomatis dari data transaksimu        │
├────────────────────────────────────────────────────┤
│ • RINGKASAN PERFORMA (observation facts)            │
│   [teks naratif dari template + slot data]          │
│                                                      │
│ • ANALISIS DATA (interpretation facts)              │
│   [teks naratif]                                    │
│                                                      │
│ • REKOMENDASI (suggestion facts)                    │
│   💡 [teks rekomendasi]                             │
├────────────────────────────────────────────────────┤
│ Mode: {mode} • {n} fakta dianalisis   Footer note   │
└────────────────────────────────────────────────────┘
```

- Konten insight dibangun dari **facts engine** (`features/insight/services/narrator.ts` + `insightInputs.ts`) — bukan LLM call langsung, tapi template + slot filling dari data transaksi nyata
- Tiga layer fakta dengan aksen warna berbeda: observation (emerald dot), interpretation (blue dot), suggestion (amber dot + emoji 💡)
- Ini adalah komponen yang **paling cocok memakai AI Lavender language** dari design system (bukan emerald/blue/amber) — lihat section 10 design-system.md soal "AI States" dan lavender accent untuk AI

### Section 5 — Tabel "5 Transaksi Terakhir"

```
┌─────────────────────────────────────────────────────────┐
│ 5 Transaksi Terakhir                    [Lihat Semua Data] │
├──────────┬──────────────┬─────────────┬────────┬─────────┤
│ ID/Tgl   │ Produk Utama │ Metode Bayar│ Status │ Nilai   │
├──────────┴──────────────┴─────────────┴────────┴─────────┤
│ ...rows dari query prisma.transaction.findMany...        │
└─────────────────────────────────────────────────────────┘
```

- Data di-fetch via async Server Component terpisah (`RecentTransactions`)
- Kolom: ID (8 char + tanggal format id-ID), Produk Utama, Metode Bayar, Status (badge berwarna sesuai status: COMPLETED=emerald, PENDING=amber, lainnya=neutral), Nilai Transaksi (format Rupiah)
- Empty state: "Belum ada transaksi di tokomu." jika tidak ada data

---

## 4. Ringkasan Data yang Ditampilkan (bukan visual, tapi konten/informasi)

Semua angka di dashboard ini **live dari database**, bersumber dari:

- `prisma.user` + `creatorProfile` → nama toko, status verifikasi
- `prisma.product.count()` → jumlah produk terdaftar & published
- `buildInsightInputs()` → agregat transaksi 28 hari terakhir: total transaksi, omzet kotor, AOV, pembeli unik, breakdown per kategori & per produk, comparison vs periode sebelumnya
- `narrate()` → generate narasi AI insight dari facts (observation/interpretation/suggestion)
- `prisma.transaction.findMany()` → 5 transaksi terbaru toko

Tidak ada data dummy/placeholder statis di halaman ini — semua kondisional terhadap ada/tidaknya data (jika creator baru belum punya transaksi, section chart & insight tidak dirender).

---

## 5. Checklist Redesign (mapping ke Design System)

Gunakan token dari `docs/designs/design-system.md` saat re-create:

- [ ] Ganti seluruh `bg-neutral-950` / `bg-neutral-900/*` di konten → `bg-[#FAFAF9]` (page) & `bg-white` (card surface)
- [ ] Ganti border `border-neutral-800` → `border-[#E7E5E4]` (Neutral 200)
- [ ] Ganti teks putih (`text-white`) → `text-[#111827]` (Neutral 900), teks abu (`text-neutral-400`) → `text-[#78716C]` (Neutral 500)
- [ ] Ganti warna aksen utama emerald → **Violet `#6355D9`** untuk CTA primary, angka penting, active state
- [ ] Pertimbangkan Coral `#E76F61` untuk highlight terbatas (misal badge trend naik), bukan emerald
- [ ] AI Insight card → gunakan **Lavender** (`#8B7CF6` / bg `#F5F3FF`) sebagai bahasa visual AI, bukan emerald/blue/amber campur
- [ ] Chart colors → ganti hardcoded hex di `DashboardCharts.tsx` dengan token warna project (violet primary + neutral tone untuk multi-series, hindari kombinasi merah-hijau untuk aksesibilitas)
- [ ] Radius card → pastikan konsisten 12-16px sesuai spec (`rounded-2xl` = 16px, sudah cukup dekat)
- [ ] Tambahkan heading serif (Playfair Display) untuk judul besar "Studio {storeName}" agar sejalan dengan editorial typography direction
- [ ] Badge status transaksi → pastikan tidak hanya mengandalkan warna (tambahkan icon/label teks yang sudah ada — ini sudah OK karena ada teks status)
- [ ] Cek kontras teks pada tema terang baru (terutama teks sekunder abu di atas background `#FAFAF9`)

---

## 6. Referensi Cepat: Komponen Reusable yang Terlibat

| Komponen                         | Lokasi                                                 | Dipakai untuk                           |
| -------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| `SidebarCreator`                 | `components/shadcn-studio/sidebar/sidebar-creator.tsx` | Navigasi utama dashboard                |
| `ProductCharts`                  | `components/DashboardCharts.tsx`                       | Bar chart + donut chart performa produk |
| `useCreatorProfile`              | `features/creator-profile/hooks/useCreatorProfile.ts`  | Data profil toko di sidebar             |
| `useCreatorOrders`               | `features/orders/hooks/useCreatorOrders.ts`            | Badge jumlah pesanan pending di sidebar |
| `buildInsightInputs` / `narrate` | `features/insight/services/`                           | Data & narasi AI Business Insight       |
