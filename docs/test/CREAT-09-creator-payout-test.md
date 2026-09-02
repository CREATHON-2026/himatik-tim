# 🧪 Manual Testing Checklist: Saldo & Penarikan Dana Sanggar (`/dashboard/creator/payout`)
## QA Test Plan — Story CREAT-09: Manajemen Saldo, Pengajuan Penarikan Dana & Rekening Bank

**Task ID**: `CREAT-09`\
**Target URL**: `http://localhost:3000/dashboard/creator/payout`\
**Tipe Pengujian**: Functional Finance, Withdrawal Form Validation, Bank Account CRUD, Table Filter & UI/UX QA\
**Standar SOP**: [`docs/sop/06-sop-qa-manual-testing-checklist.md`](file:///d:/2-Project/Gifteria/docs/sop/06-sop-qa-manual-testing-checklist.md)

---

### 📋 Ringkasan Fitur yang Diuji
1. **Ringkasan Saldo Sanggar**: Menampilkan Saldo Siap Ditarik, Saldo Tertahan di Escrow, dan Total Omzet Bersih Kumulatif.
2. **Formulir Pengajuan Penarikan Dana**: Dialog penarikan saldo dengan preset chips nominal, validasi batas saldo, dan konfirmasi.
3. **Manajemen Rekening Bank**: Menampilkan rekening terdaftar dan modal edit rekening bank pencairan.
4. **Buku Kas & Riwayat Pencairan**: Tabel riwayat penarikan dana dengan nomor referensi unik, nominal, dan badge status.
5. **Backend Endpoints**: `/api/creator/payout` (GET, POST, PUT).

---

## 🔴 1. MUST-HAVE TEST CASES (Fungsionalitas Utama & Transaksi Finansial)
*Kriteria: Jika ada salah satu test case yang gagal, rilis dinyatakan FAILED / BLOCKER.*

- [ ] **TC-M01: [Ringkasan Saldo] Memuat Saldo Transaksi Sanggar**
  - **Langkah**:
    1. Login sebagai Mitra Kreator Sanggar.
    2. Buka URL `http://localhost:3000/dashboard/creator/payout`.
    3. Pastikan halaman termuat dengan benar.
  - **Expected**:
    - Menampilkan 3 kartu saldo: *Saldo Siap Ditarik* (kartu gradien ungu), *Tertahan di Escrow*, dan *Total Omzet Bersih*.
    - Nominal saldo terformat dalam format Rupiah yang rapi (contoh: `Rp1.450.000`).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M02: [Modal Tarik Saldo] Membuka Formulir Pengajuan Penarikan**
  - **Langkah**:
    1. Klik tombol **"Tarik Saldo ke Rekening"** pada kartu utama saldo.
  - **Expected**:
    - Dialog modal penarikan dana terbuka secara halus.
    - Menampilkan sisa saldo tersedia, input nominal, preset chips nominal, dan rekening bank tujuan.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M03: [Validasi Input] Pembatasan Nominal Minimal & Melebihi Saldo**
  - **Langkah**:
    1. Masukkan nominal di bawah Rp50.000 (misal: `10000`).
    2. Periksa pesan peringatan di bawah input.
    3. Masukkan nominal melebihi saldo tersedia (misal: `99999999`).
    4. Periksa status tombol "Konfirmasi Penarikan".
  - **Expected**:
    - Muncul peringatan: *"Minimal penarikan dana adalah Rp50.000"*.
    - Muncul peringatan: *"Nominal melebihi saldo tersedia"*.
    - Tombol konfirmasi otomatis nonaktif (*disabled*).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M04: [Submit Penarikan] Pengajuan Penarikan Berhasil**
  - **Langkah**:
    1. Klik chip preset `Rp500.000` atau tombol `"Tarik Semua"`.
    2. Klik tombol **"Konfirmasi Penarikan"**.
  - **Expected**:
    - Muncul toast notifikasi sukses: *"Pengajuan penarikan dana berhasil diajukan dan sedang diproses."*.
    - Modal otomatis tertutup dan data saldo tersinkronisasi kembali.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M05: [Edit Rekening Bank] Memperbarui Data Rekening Pencairan**
  - **Langkah**:
    1. Pada kartu "Rekening Bank Pencairan", klik tombol **"Ubah"**.
    2. Ubah Nama Bank (misal: `"Bank Mandiri"`), Nomor Rekening (`"140001928374"`), dan Nama Pemilik Rekening.
    3. Klik tombol **"Simpan Perubahan"**.
  - **Expected**:
    - Muncul toast sukses: *"Informasi rekening bank berhasil diperbarui!"*.
    - Kartu rekening langsung menampilkan data bank dan nomor rekening yang baru.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M06: [Tabel Riwayat] Menampilkan Daftar Transaksi Pencairan**
  - **Langkah**:
    1. Periksa tabel "Riwayat Penarikan Saldo" di bagian bawah halaman.
  - **Expected**:
    - Menampilkan kolom: Tanggal Pengajuan, No. Referensi (`#WD-XXXXXXXX`), Rekening Tujuan, Nominal, dan Badge Status (*Berhasil Ditransfer / Sedang Diproses*).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## 🟡 2. SHOULD-HAVE TEST CASES (Fitur Efisiensi, UX & Salin Data)
*Kriteria: Fitur penting untuk kenyamanan dan efisiensi pengguna.*

- [ ] **TC-S01: [Pencarian Riwayat] Filter Cepat Berdasarkan ID Penarikan**
  - **Langkah**:
    1. Ketik kata kunci nomor referensi (contoh: `"WD-"` atau `"BCA"`) pada kolom pencarian tabel.
  - **Expected**:
    - Daftar baris tabel langsung tersaring secara instan sesuai kata kunci.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S02: [Salin No. Referensi] Copy ID Transaksi ke Clipboard**
  - **Langkah**:
    1. Klik nomor referensi `#WD-XXXXXXXX` pada salah satu baris tabel.
  - **Expected**:
    - Nomor referensi berhasil disalin ke clipboard.
    - Muncul toast notifikasi: *"No. Referensi berhasil disalin!"*.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S03: [Tombol Segarkan] Sinkronisasi Manual Saldo**
  - **Langkah**:
    1. Klik tombol **"Segarkan Saldo"** di pojok kanan atas halaman.
  - **Expected**:
    - Ikon refresh berputar halus dan data saldo termuat ulang dari server.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S04: [Responsive Viewport] Akses Halaman Keuangan di Smartphone**
  - **Langkah**:
    1. Buka halaman `/dashboard/creator/payout` pada viewport mobile (375px - 414px).
  - **Expected**:
    - 3 kartu metrik saldo tertumpuk (*stack*) rapi secara vertikal.
    - Tabel riwayat dapat di-*scroll* secara horizontal (*overflow-x*) tanpa merusak layout utama.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## 📊 Lembar Rekapitulasi QA

| Kategori Pengujian | Total Test Case | Passed | Failed | Status Rilis |
|---|---|---|---|---|
| **Must-Have (P0)** | 6 | [ ] | [ ] | **READY / NOT READY** |
| **Should-Have (P1)** | 4 | [ ] | [ ] | **READY / NOT READY** |
| **Total** | **10** | **-** | **-** | - |

**Sign-Off QA Lead / Developer**: _____________________\
**Tanggal Pengujian**: _____________________
