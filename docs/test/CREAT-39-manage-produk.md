# 🧪 Manual Testing Checklist: Kelola Produk & Profil Creator (`/dashboard/creator/products`)
## QA Test Plan — Story CREAT-39: Kelola Produk (Gift, Buket, Hampers & Kriya) & Profil Creator

**Task ID**: `CREAT-39`\
**Target URL**: `http://localhost:3000/dashboard/creator/products` & `http://localhost:3000/dashboard/creator`\
**Tipe Pengujian**: Functional CRUD, Input Validation, UI/UX Interaction, Responsive & Error State QA\
**Standar SOP**: [`docs/sop/06-sop-qa-manual-testing-checklist.md`](file:///d:/2-Project/Gifteria/docs/sop/06-sop-qa-manual-testing-checklist.md)

---

### 📋 Ringkasan Fitur yang Diuji
1. **Navigasi Sidebar Creator Interaktif**: Akses menu Ringkasan, Produk Saya, Pesanan, Saldo, dan Profil Toko.
2. **Katalog Produk Kreator**: Menampilkan daftar gift, pencarian (*Search*), filter kategori, dan status stok.
3. **Formulir Tambah Produk Baru (`/products/new`)**: Upload foto, input data produk kado, validasi Zod schema, dan simpan ke database.
4. **Formulir Edit Produk (`/products/[id]/edit`)**: Memuat data awal produk, perubahan harga/stok/deskripsi, dan pembaruan data.
5. **Aksi Hapus Produk**: Dialog konfirmasi dan penghapusan produk dari etalase.
6. **API Endpoints & Profil**: `/api/products` dan `/api/creator-profile`.

---

## 🔴 1. MUST-HAVE TEST CASES (Fungsionalitas Utama & CRUD Flow)
*Kriteria: Jika ada salah satu yang gagal, rilis dinyatakan FAILED / BLOCKER.*

- [ ] **TC-M01: [Katalog Produk] Memuat Daftar Produk Kreator**
  - **Langkah**:
    1. Buka URL `http://localhost:3000/dashboard/creator/products`.
    2. Pastikan halaman termuat dengan benar.
  - **Expected**:
    - Menampilkan kartu/tabel daftar kado milik kreator dengan informasi: Foto, Judul, Kategori, Harga (format Rupiah `Rp`), dan Sisa Stok.
    - Menampilkan *Empty State* yang estetik jika belum ada produk kado yang ditambahkan.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M02: [Search & Filter] Pencarian Real-Time & Filter Kategori**
  - **Langkah**:
    1. Masukkan kata kunci nama produk pada kolom pencarian (misal: `"Buket"`, `"Hampers"`).
    2. Pilih salah satu pill kategori (Semua, Buket Bunga, Hampers, Custom Art, Souvenir, Kriya).
  - **Expected**:
    - Daftar produk langsung tersaring secara instan sesuai kata kunci atau kategori yang dipilih tanpa reload halaman.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M03: [Tambah Produk] Validasi Form & Publikasi Kado Baru**
  - **Langkah**:
    1. Klik tombol **"+ Tambah Produk"** di halaman kelola produk atau buka `http://localhost:3000/dashboard/creator/products/new`.
    2. Isi form:
       - Nama Produk: `"Buket Bunga Mawar Velvet Custom"`
       - Kategori: `"Buket Bunga"`
       - Harga: `150000`
       - Stok: `25`
       - Deskripsi: `"Buket kado spesial dengan wrapping satin premium."`
       - Upload Foto Cover Produk.
    3. Klik tombol **"Publikasikan Produk"**.
  - **Expected**:
    - Muncul toast notifikasi sukses: *"Produk berhasil ditambahkan!"*.
    - Halaman otomatis dialihkan kembali ke `/dashboard/creator/products`.
    - Produk baru langsung muncul di etalase katalog produk kreator.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M04: [Validasi Input] Penolakan Data Form Kosong / Invalid**
  - **Langkah**:
    1. Buka form tambah produk baru.
    2. Biarkan Nama Produk kosong atau masukkan harga `0`.
    3. Klik **"Publikasikan Produk"**.
  - **Expected**:
    - Form menolak submit dan menampilkan pesan error validasi (misal: *"Nama produk minimal 3 karakter"*, *"Harga minimal Rp 1.000"*).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M05: [Edit Detail Produk] Memperbarui Harga & Stok Kado**
  - **Langkah**:
    1. Pada salah satu produk di katalog, klik ikon titik tiga `(...)` ➔ Pilih **"Edit Detail"**.
    2. Halaman membuka URL `/dashboard/creator/products/[id]/edit` dengan form terisi data produk sebelumnya.
    3. Ubah harga menjadi `175000` dan stok menjadi `50`.
    4. Klik **"Simpan Perubahan"**.
  - **Expected**:
    - Notifikasi toast sukses muncul: *"Produk berhasil diperbarui!"*.
    - Nilai harga dan stok terbarui secara akurat di database dan katalog.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M06: [Hapus Produk] Menghapus Kado dari Etalase**
  - **Langkah**:
    1. Klik titik tiga `(...)` pada salah satu produk kado.
    2. Pilih menu **"Hapus"** dan konfirmasi tindakan.
  - **Expected**:
    - Item produk langsung terhapus dari daftar dan database (`/api/products/[id]` `DELETE` status 200).
    - Muncul notifikasi toast: *"Produk berhasil dihapus"*.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M07: [Sidebar Interactivity] Navigasi & Status Profil Sanggar**
  - **Langkah**:
    1. Buka sidebar creator di sisi kiri.
    2. Klik tombol toggle *Expand / Collapse* sidebar (atau tombol pintas `Ctrl+B`).
    3. Klik navigasi menu: *Ringkasan*, *Produk Saya*, *Pesanan Masuk*, *Saldo & Penarikan*, *Profil Toko*.
  - **Expected**:
    - Sidebar beranimasi mulus (*spring physics*) tanpa error hydration konsol browser.
    - Nama toko sanggar kreator dan badge status tampil dengan benar.
    - Rute berpindah dengan mulus ke URL tujuan.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## 🟡 2. SHOULD-HAVE TEST CASES (Responsivitas, Kecepatan & UI Polish)
*Kriteria: Verifikasi kenyamanan visual dan konsistensi lintas perangkat.*

- [ ] **TC-S01: [Responsive Layout] Tampilan Dashboard pada Tablet & Mobile (375px–768px)**
  - **Langkah**:
    1. Buka DevTools (F12) ➔ Pilih tampilan Mobile (375px) atau Tablet (768px).
    2. Uji navigasi etalase produk dan form tambah produk.
  - **Expected**:
    - Grid kartu produk beradaptasi otomatis (*1 kolom di mobile, 2–3 kolom di desktop*).
    - Tombol aksi dan form input dapat diakses dengan mudah tanpa horizontal scrolling.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S02: [Empty State & Fast Search Feedback] Pencarian Nihil**
  - **Langkah**:
    1. Masukkan kata kunci acak yang tidak ada di etalase (misal: `"xyz999"`).
  - **Expected**:
    - Menampilkan pesan *"Tidak ada produk ditemukan"* dengan tombol reset pencarian.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S03: [Image Upload Preview] Preview Foto & Galeri Produk**
  - **Langkah**:
    1. Pilih file gambar (.jpg / .png / .webp) di form upload foto.
  - **Expected**:
    - Preview gambar langsung tampil seketika sebelum form disimpan.
    - Pengguna dapat menghapus atau mengganti gambar dengan tombol hapus preview.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## ✍️ 3. Verifikasi & Sign-Off QA

- **Ringkasan Hasil QA**:
  - `[ ]` Seluruh 7 Must-Have Test Cases Lolos Uji (100% Passed).
  - `[ ]` Seluruh 3 Should-Have Test Cases Lolos Uji.
- **Catatan / Evaluasi Tambahan**: __________________________________
- **Status Keputusan**: `[  ] READY TO MERGE TO DEVELOP` / `[  ] REVISION NEEDED`
- **Tester / QA Lead**: _______________________ (Tanggal: _____________)
