# Pull Request: Manajemen Pesanan Masuk Kreator (Creator Order Management)

## 📌 Ringkasan Singkat
Pull Request ini menghadirkan fitur **Manajemen Pesanan Masuk (`/dashboard/creator/orders`)** bagi kreator sanggar di Gifteria untuk memantau, memproses alur perangkaian kado, menghubungi pembeli via WhatsApp, dan memperbarui status pesanan hingga selesai.

---

## 🎯 Target Branch
- **Source Branch**: `feat/CREATE-06-katalog`
- **Target Branch**: `develop`

---

## 🚀 Cakupan Fitur (Must-Have & Should-Have)

### 🔴 Must-Have (Kritis & Wajib)
1. **Daftar Pesanan Masuk Real-Time ([`app/dashboard/creator/orders/page.tsx`](file:///d:/2-Project/Gifteria/app/dashboard/creator/orders/page.tsx))**:
   - Menampilkan seluruh pesanan kriya yang masuk ke sanggar kreator dari database.
   - Mengambil data foto produk, nama produk, status transaksi, tanggal, dan nominal pendapatan bersih.
2. **Filter Status Alur Kado**:
   - Tab filter status: `Semua`, `Perlu Dirangkai` (`IN_ESCROW`), `Menunggu Bayar` (`PENDING`), `Selesai` (`COMPLETED`), dan `Dibatalkan` (`CANCELLED`).
3. **Pencarian Cepat (*Search Bar*)**:
   - Mencari pesanan secara instan berdasarkan No. Invoice (`#CRT-...`) atau nama produk kado.
4. **Lembar Kerja Pesanan & Detail ([`app/dashboard/creator/orders/[id]/page.tsx`](file:///d:/2-Project/Gifteria/app/dashboard/creator/orders/[id]/page.tsx))**:
   - Menampilkan detail produk, harga satuan, dan kalkulasi pendapatan bersih sanggar.
   - Aksi pembaruan status pengerjaan: *"Mulai Rangkai"*, *"Tandai Selesai & Diserahkan ke Kurir"*, *"Batalkan"*.
5. **Backend Endpoints**:
   - `GET /api/creator/orders`: Query transaksi scoped ke toko sanggar yang login.
   - `PUT /api/creator/orders/[id]`: Endpoint update status pengerjaan pesanan.

---

### 🟡 Should-Have (Penting untuk UX & Efisiensi)
1. **Ringkasan Metrik KPI (*CreatorOrderStatsBar*)**:
   - Menampilkan total pesanan, jumlah perlu dirangkai, pesanan selesai, dan total omzet bersih toko.
2. **Integrasi Direct WhatsApp Pembeli**:
   - Tombol satu-klik **"Chat Pembeli"** untuk konfirmasi pesanan kustom atau pengiriman foto hasil karya kado.
3. **Aksi Cepat Kartu (*Quick Action Button*)**:
   - Tombol *"Tandai Selesai"* langsung dari kartu pesanan tanpa harus membuka halaman detail.
4. **Empty State & Loading Skeleton**:
   - Tampilan visual saat pesanan kosong atau sedang dimuat.

---

## 🧪 Quality Gate & Verifikasi

| Quality Check | Status | Keterangan |
|---|---|---|
| **`npm run type-check`** | ✅ **PASSED** | 0 Type Errors |
| **`npm run build`** | ✅ **PASSED** | 23/23 Routes Compiled (Termasuk `/dashboard/creator/orders` & `/dashboard/creator/orders/[id]`) |

---

## 📂 File yang Ditambahkan / Dimodifikasi
- 📄 `app/api/creator/orders/route.ts` *(Endpoint List Pesanan)*
- 📄 `app/api/creator/orders/[id]/route.ts` *(Endpoint Detail & Update Status)*
- 📄 `features/orders/api.ts` *(API Client fetcher)*
- 📄 `features/orders/types.ts` *(TypeScript Types & Interfaces)*
- 📄 `features/orders/components/CreatorOrderCard.tsx` *(Komponen Kartu Pesanan)*
- 📄 `features/orders/components/CreatorOrderStatsBar.tsx` *(Komponen Bar Metrik KPI)*
- 📄 `app/dashboard/creator/orders/page.tsx` *(Halaman List Pesanan Masuk)*
- 📄 `app/dashboard/creator/orders/[id]/page.tsx` *(Halaman Lembar Kerja Pesanan)*
