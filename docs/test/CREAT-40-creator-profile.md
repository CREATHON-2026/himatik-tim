# 🧪 Manual Testing Checklist: CREAT-40 Profil Sanggar & Etalase Kreator

Dokumen checklist pengujian manual (*QA Manual Test*) untuk memverifikasi fungsionalitas, keamanan data, dan responsivitas fitur **Profil Sanggar & Etalase Kreator** pada marketplace Creathon.

---

## 📋 Informasi Pengujian
* **ID Tiket**: `CREAT-40`
* **Fitur**: Profil Sanggar & Etalase Kreator (*Creator Studio Profile Management*)
* **Lingkungan Uji**: Local (`http://localhost:3000/dashboard/creator/profile`) & Staging
* **Akun Penguji**: Akun Kreator (`role: CREATOR`)

---

## 🟢 1. MUST-HAVE TEST CASES (Fungsionalitas Inti & Bisnis)
*Kriteria: Wajib lulus 100% sebelum Pull Request di-merge ke branch `develop`.*

- [ ] **TC-M01: [Load Page] Memuat Informasi Profil Sanggar Kreator**
  - **Langkah**:
    1. Buka halaman `/dashboard/creator/profile`.
  - **Expected**:
    - Data profil sanggar (nama toko, deskripsi, kota, kontak, logo) terambil dari database dan terisi otomatis pada form.
    - Menampilkan skeleton loading halus saat proses fetch data.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M02: [Update Profile] Mengubah Nama Toko & Deskripsi Filosofi Kriya**
  - **Langkah**:
    1. Ubah *Nama Sanggar / Brand Kriya* (misal: `"Rose & Ribbon Studio"`).
    2. Ubah *Deskripsi Sanggar & Filosofi Kado*.
    3. Klik tombol **`Simpan Profil Sanggar`**.
  - **Expected**:
    - Notifikasi toast sukses muncul: *"Profil sanggar kreator berhasil diperbarui!"*.
    - Data nama sanggar baru langsung tersimpan dan ter-update di sidebar dan database.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M03: [Upload Logo] Unggah & Ganti Foto Profil / Logo Studio**
  - **Langkah**:
    1. Klik area upload foto profil atau klik logo yang ada.
    2. Pilih file gambar (.jpg / .png / .webp).
  - **Expected**:
    - File terunggah ke endpoint `/api/upload` (Supabase Storage).
    - Pratinjau logo sanggar seketika muncul pada form dan kartu *Live Preview*.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M04: [Location & Contact] Update Alamat Workshop & Nomor WhatsApp**
  - **Langkah**:
    1. Isi *Kota Asal Workshop* (misal: `"Makassar"`).
    2. Isi *Nomor WhatsApp Bisnis* (misal: `"081234567890"`).
    3. Isi *Alamat Lengkap Workshop / Studio*.
    4. Klik **`Simpan Profil Sanggar`**.
  - **Expected**:
    - Data kontak dan alamat tersimpan dengan benar.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M05: [Live Preview Simulation] Sinkronisasi Pratinjau Etalase Publik**
  - **Langkah**:
    1. Ketik nama toko atau deskripsi baru pada form.
  - **Expected**:
    - Kartu *Pratinjau Etalase Publik* di kolom kanan langsung berubah secara dinamis (*real-time*).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M06: [Validation] Validasi Kolom Wajib (*Required Fields*)**
  - **Langkah**:
    1. Kosongkan *Nama Sanggar / Brand Kriya*.
    2. Klik **`Simpan Profil Sanggar`**.
  - **Expected**:
    - Form menolak submit dan menampilkan notifikasi: *"Nama Sanggar / Toko wajib diisi"*.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## 🟡 2. SHOULD-HAVE TEST CASES (Responsivitas, UI Polish & Performa)
*Kriteria: Verifikasi kenyamanan visual dan konsistensi lintas perangkat.*

- [ ] **TC-S01: [Responsive Layout] Tampilan Mobile & Tablet (375px–768px)**
  - **Langkah**:
    1. Buka DevTools (F12) ➔ Atur viewport ke ukuran Mobile (375px) atau Tablet (768px).
    2. Periksa tampilan form dan kartu preview.
  - **Expected**:
    - Form tersusun 1 kolom rapi tanpa horizontal overflow.
    - Tombol simpan mudah ditekan dengan target sentuh (*touch target*) minimal 44px.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S02: [Navigation] Tombol Navigasi Kembali ke Ringkasan**
  - **Langkah**:
    1. Klik tombol **`Kembali ke Ringkasan`**.
  - **Expected**:
    - Halaman berpindah ke `/dashboard/creator` dengan mulus.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

## ✍️ 3. Verifikasi & Sign-Off QA

- **Ringkasan Hasil QA**:
  - `[ ]` Seluruh 6 Must-Have Test Cases Lolos Uji (100% Passed).
  - `[ ]` Seluruh 2 Should-Have Test Cases Lolos Uji.
- **Status Keputusan**: `[  ] READY TO MERGE TO DEVELOP` / `[  ] REVISION NEEDED`
- **Tester / QA Lead**: _______________________ (Tanggal: _____________)
