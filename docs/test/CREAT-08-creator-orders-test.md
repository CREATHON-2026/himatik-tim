# 🧪 Manual Testing Checklist: Manajemen Pesanan Masuk Kreator (`/dashboard/creator/orders`)
## QA Test Plan — Story CREAT-08: Manajemen Pesanan Masuk, Lembar Kerja Kado & Update Status Sanggar

**Task ID**: `CREAT-08`\
**Target URL**: `http://localhost:3000/dashboard/creator/orders` & `http://localhost:3000/dashboard/creator/orders/[id]`\
**Tipe Pengujian**: Functional, Order State Machine, Buyer Profile Verification, WhatsApp Integration, UI/UX Interaction QA\
**Standar SOP**: [`docs/sop/06-sop-qa-manual-testing-checklist.md`](file:///d:/2-Project/creathon/docs/sop/06-sop-qa-manual-testing-checklist.md)

---

### 📋 Ringkasan Fitur yang Diuji
1. **Daftar Pesanan Masuk Sanggar (`/dashboard/creator/orders`)**: Menampilkan seluruh pesanan kriya yang masuk ke toko kreator secara real-time dari database.
2. **Filter Status Pesanan**: Filter tab (*Semua, Perlu Dirangkai `IN_ESCROW`, Menunggu Bayar `PENDING`, Selesai `COMPLETED`, Dibatalkan `CANCELLED`*).
3. **Pencarian Reaktif (*Search Bar*)**: Cari instan berdasarkan nomor invoice `#CRT-XXXXXXXX` atau judul produk kado.
4. **Metrik Statistik KPI (*CreatorOrderStatsBar*)**: Ringkasan *Total Pesanan, Menunggu Bayar, Perlu Dirangkai, Selesai,* dan *Total Omzet Toko*.
5. **Lembar Kerja Pesanan & Rincian Kriya (`/dashboard/creator/orders/[id]`)**:
   - Foto karya kriya, harga satuan, dan kalkulasi pendapatan bersih sanggar.
   - **Profil Pembeli & Penerima**: Nama pembeli, nomor WhatsApp, email, dan alamat tujuan lengkap.
   - **Kartu Ucapan & Personalisasi Kado**: Teks ucapan yang diminta pembeli, opsi kemasan kado, kurir pengiriman, dan tombol salin pesan.
6. **Alur Update Status Pengerjaan**: Aksi transisi status (*Mulai Rangkai Kado ➔ Tandai Selesai & Diserahkan ke Kurir ➔ Batalkan Pesanan*).
7. **Integrasi Direct WhatsApp Pembeli**: Tombol satu-klik membuka obrolan WhatsApp dengan nomor pembeli.

---

## 🔴 1. MUST-HAVE TEST CASES (Fungsionalitas Utama & Alur Transaksi Kritis)
*Kriteria: Jika ada salah satu test case yang gagal, rilis dinyatakan FAILED / BLOCKER.*

- [ ] **TC-M01: [Daftar Pesanan] Memuat Pesanan Masuk dari Database**
  - **Langkah**:
    1. Login sebagai Mitra Kreator Sanggar.
    2. Buka URL `http://localhost:3000/dashboard/creator/orders`.
    3. Pastikan halaman termuat dengan benar.
  - **Expected**:
    - Menampilkan kartu daftar pesanan yang masuk ke toko sanggar dengan informasi: No. Invoice `#CRT-XXXXXXXX`, tanggal pemesanan, foto produk kriya, nama kado, badge status, dan nominal pendapatan bersih toko.
    - Menampilkan *Empty State* yang estetik jika sanggar belum menerima pesanan masuk.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M02: [Filter Status] Penyaringan Pesanan Sesuai Alur Pengerjaan**
  - **Langkah**:
    1. Buka tab filter **"Perlu Dirangkai"** (`IN_ESCROW`).
    2. Periksa daftar kartu pesanan yang muncul.
    3. Buka tab filter **"Selesai"** (`COMPLETED`).
    4. Buka tab filter **"Menunggu Bayar"** (`PENDING`).
  - **Expected**:
    - Tab "Perlu Dirangkai" hanya menampilkan pesanan yang dananya sudah aman di Escrow Creathon dan siap dibuatkan kado.
    - Tab "Selesai" hanya menampilkan transaksi yang sudah selesai dikerjakan.
    - Transisi antar tab berjalan instan tanpa reload halaman.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M03: [Pencarian Reaktif] Cari Berdasarkan No. Invoice & Nama Produk**
  - **Langkah**:
    1. Ketik 4 digit nomor invoice (contoh: `"CRT-"` atau nomor pesanan spesifik) di Search Bar.
    2. Ketik nama kado kriya (contoh: `"Buket"`, `"Hampers"`).
  - **Expected**:
    - Kartu pesanan langsung tersaring secara reaktif menampilkan transaksi yang cocok dengan kata kunci.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M04: [Lembar Kerja Detail] Memuat Rincian Kriya & Personalisasi Kado**
  - **Langkah**:
    1. Klik tombol **"Rincian"** pada salah satu kartu pesanan.
    2. Halaman dialihkan ke `/dashboard/creator/orders/[id]`.
  - **Expected**:
    - Menampilkan No. Invoice resmi di header halaman.
    - Menampilkan foto produk kriya, kategori, dan harga satuan.
    - Menampilkan box **Kartu Ucapan & Personalisasi Kado** yang berisi teks ucapan personal pembeli, jenis kemasan (*Luxury Hardbox/Paper Wrap*), dan jenis kurir.
    - Menampilkan kartu **Profil Pembeli & Penerima** lengkap dengan nama, nomor telepon, dan alamat pengiriman.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M05: [Update Status] Transisi Status Pengerjaan Kado**
  - **Langkah**:
    1. Pada pesanan berstatus "Menunggu Pembayaran", klik tombol **"Konfirmasi Pembayaran Diterima (Mulai Rangkai)"**.
    2. Pada pesanan berstatus "Perlu Dirangkai", klik tombol **"Tandai Selesai & Diserahkan ke Kurir"**.
  - **Expected**:
    - Muncul toast notifikasi sukses: *"Status pesanan berhasil diperbarui!"*.
    - Badge status berubah menjadi "Selesai" (warna hijau) dan status terupdate di database Prisma.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M06: [Aksi Cepat Kartu] Tandai Selesai Langsung dari Halaman Utama**
  - **Langkah**:
    1. Buka kembali halaman `http://localhost:3000/dashboard/creator/orders`.
    2. Pada kartu pesanan berstatus "Perlu Dirangkai", klik tombol cepat **"Tandai Selesai"**.
  - **Expected**:
    - Kartu langsung terupdate statusnya menjadi "Selesai" tanpa harus membuka halaman detail.
    - Angka statistik pada bar metrik atas langsung sinkron terupdate.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## 🟡 2. SHOULD-HAVE TEST CASES (Fitur Efisiensi, UX & Komunikasi)
*Kriteria: Fitur penting untuk menunjang kenyamanan mitra kreator sanggar.*

- [ ] **TC-S01: [Bar Statistik KPI] Sinkronisasi Metrik Transaksi Toko**
  - **Langkah**:
    1. Perhatikan 5 kartu statistik di bagian atas halaman pesanan:
       - *Total Pesanan*
       - *Menunggu Bayar*
       - *Perlu Dirangkai*
       - *Selesai*
       - *Total Omzet Toko (Rp)*
  - **Expected**:
    - Angka dan nominal pendapatan bersih pada bar statistik sesuai dengan akumulasi data transaksi nyata milik sanggar.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S02: [Direct WhatsApp] Hubungi Pembeli via WhatsApp**
  - **Langkah**:
    1. Klik tombol hijau **"Hubungi Pembeli via WhatsApp"** pada kartu pesanan atau halaman detail.
  - **Expected**:
    - Browser membuka tab baru mengarah ke `https://wa.me/[nomor_pembeli]` dengan template pesan salam otomatis yang menyertakan nama kado dan nomor invoice `#CRT-XXXXXXXX`.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S03: [Salin Pesan Ucapan] Copy Teks Kartu Ucapan Pembeli**
  - **Langkah**:
    1. Pada halaman lembar kerja pesanan (`/dashboard/creator/orders/[id]`), klik tombol **"Salin Teks"** di pojok box kartu ucapan.
  - **Expected**:
    - Teks kartu ucapan berhasil disalin ke clipboard pengguna.
    - Muncul toast notifikasi: *"Pesan kartu ucapan berhasil disalin!"*.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S04: [Rincian Finansial] Transparansi Pendapatan Bersih Sanggar**
  - **Langkah**:
    1. Periksa kartu "Rincian Pendapatan Sanggar" pada kolom kanan lembar kerja.
  - **Expected**:
    - Menampilkan Total Bruto Transaksi, Biaya Platform (Rp0 Promo), dan Pendapatan Bersih Sanggar.
    - Menampilkan pesan konfirmasi: *"Dana akan diteruskan ke saldo sanggar setelah pesanan selesai"*.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S05: [Responsive & Mobile UX] Akses Dashboard Pesanan di Layar Smartphone**
  - **Langkah**:
    1. Buka tampilan mobile viewport (375px - 414px) via Chrome DevTools.
    2. Navigasi ke `/dashboard/creator/orders` dan buka salah satu detail pesanan.
  - **Expected**:
    - Kartu pesanan, filter tab, bar statistik, dan lembar kerja kriya menyesuaikan layout secara proporsional (*single column stack*) tanpa ada overflow horizontal yang rusak.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## 📊 Lembar Rekapitulasi QA

| Kategori Pengujian | Total Test Case | Passed | Failed | Status Rilis |
|---|---|---|---|---|
| **Must-Have (P0)** | 6 | [ ] | [ ] | **READY / NOT READY** |
| **Should-Have (P1)** | 5 | [ ] | [ ] | **READY / NOT READY** |
| **Total** | **11** | **-** | **-** | - |

**Sign-Off QA Lead / Developer**: _____________________\
**Tanggal Pengujian**: _____________________
