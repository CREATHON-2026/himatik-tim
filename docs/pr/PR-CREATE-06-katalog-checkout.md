# Pull Request: Public Catalog, Direct Gift Checkout, & Interactive Invoice Tracking

## 📌 Ringkasan Singkat
Pull Request ini menghadirkan alur transaksi belanja kado & kriya personal secara menyeluruh (**End-to-End Buyer Flow**), mulai dari pencarian karya di **Katalog Publik (`/katalog`)**, eksplorasi **Detail Produk Kriya (`/katalog/[id]`)**, personalisasi kartu ucapan dan alamat pada **Checkout Kado (`/checkout`)**, hingga **Invoice Digital & Pelacakan Progres Kado 5-Tahap (`/orders/[id]`)**.

---

## 🎯 Target Branch
- **Source Branch**: `feat/CREATE-06-katalog`
- **Target Branch**: `develop`

---

## 🚀 Cakupan Fitur (Must-Have & Should-Have)

### 🔴 Must-Have (Kritis & Wajib)
1. **Katalog Publik Kriya ([`app/katalog/page.tsx`](file:///d:/2-Project/creathon/app/katalog/page.tsx))**:
   - Integrasi TanStack React Query mengambil data produk riil dari Prisma & PostgreSQL.
   - Filter kategori kriya (*Buket Bunga, Hampers Box, Custom Art, Souvenir, Aksesoris*).
   - Pencarian judul produk dan sorting harga (Terbaru, Termurah, Termahal).
2. **Detail Produk Kriya ([`app/katalog/[id]/page.tsx`](file:///d:/2-Project/creathon/app/katalog/[id]/page.tsx))**:
   - Galeri foto produk kado, badge status siap kirim / pre-order.
   - Tombol utama **"Beli Sekarang"** terhubung langsung ke `/checkout?productId=...&qty=...`.
   - Tombol *"Tambah ke Keranjang"* di-disable dengan keterangan jelas *(Segera Hadir)* untuk memfokuskan alur ke pemesanan langsung kado personal.
3. **Formulir Checkout Kado ([`app/checkout/page.tsx`](file:///d:/2-Project/creathon/app/checkout/page.tsx))**:
   - Pengisian detail penerima (Nama, No. WhatsApp, Alamat Pengiriman Lengkap, Kota).
   - Input khusus **Pesan Kartu Ucapan Kado (*Greeting Card*)** & instruksi khusus.
   - Pilihan kurir pengiriman (*Instant / Same Day*) dan opsi kemasan kado (*Luxury Hardbox / Artisan Wrap*).
4. **Invoice Digital & Pelacakan 5-Tahap ([`app/orders/[id]/page.tsx`](file:///d:/2-Project/creathon/app/orders/[id]/page.tsx))**:
   - Menampilkan seluruh data formulir checkout yang diisi pelanggan secara **100% presisi**.
   - Stepper visual 5 tahap: *Pesanan Dibuat ➔ Pembayaran Escrow ➔ Dirangkai Sanggar ➔ Pengiriman Kurir ➔ Selesai*.
   - Box pratinjau pesan kartu ucapan kado + tombol *"Salin Pesan"*.
   - Rincian kalkulasi biaya transparan (Subtotal + Ongkir + Kemasan).
   - Simulasi QRIS pembayaran instan untuk keperluan demo.
5. **Backend Endpoints**:
   - `POST /api/orders`: Pembuatan transaksi baru di database Prisma.
   - `GET /api/orders/[id]` & `PUT /api/orders/[id]`: Rincian invoice dan update status pembayaran.

---

### 🟡 Should-Have (Penting untuk Efisiensi & UX)
1. **Panduan Pembayaran QRIS (*Accordion Guide*)**:
   - Langkah scan QRIS untuk M-Banking (BCA, Mandiri, BRI) dan E-Wallet (GoPay, OVO, ShopeePay).
2. **Integrasi WhatsApp Sanggar**:
   - Tombol satu-klik mengirimkan konfirmasi pesanan dengan nomor invoice `#CRT-XXXXXXXX` ke WhatsApp sanggar.
3. **Cetak Invoice / Bukti Pembelian**:
   - Tombol cetak langsung (*Print/PDF layout*) tanpa menyertakan elemen navigasi navbar.
4. **Proteksi & Garansi 100% Escrow Creathon**:
   - Indikator keamanan dana pembeli hingga kado diterima dengan memuaskan.

---

## 🧪 Quality Gate & Verifikasi

| Quality Check | Status | Keterangan |
|---|---|---|
| **`npm run type-check`** | ✅ **PASSED** | 0 Type Errors |
| **`npm run build`** | ✅ **PASSED** | 23/23 Routes Compiled (Termasuk `/katalog`, `/katalog/[id]`, `/checkout`, `/orders/[id]`) |

---

## 📂 File yang Ditambahkan / Dimodifikasi
- 📄 `app/katalog/page.tsx` *(Halaman Katalog Publik)*
- 📄 `app/katalog/[id]/page.tsx` *(Halaman Detail Produk Kado)*
- 📄 `features/products/components/ProductPurchaseCard.tsx` *(Kartu Pembelian Desktop)*
- 📄 `features/products/components/ProductMobileActionBar.tsx` *(Action Bar Mobile)*
- 📄 `app/checkout/page.tsx` *(Formulir Checkout Kado)*
- 📄 `app/orders/[id]/page.tsx` *(Invoice Digital & Pelacak Pesanan)*
- 📄 `app/api/orders/route.ts` *(Endpoint POST Order)*
- 📄 `app/api/orders/[id]/route.ts` *(Endpoint GET & PUT Order Detail)*
