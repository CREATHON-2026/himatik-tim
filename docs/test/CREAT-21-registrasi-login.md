# 🧪 Manual Test Checklist: CREAT-21 - Registrasi & Login Multi-Role (Supabase + Prisma)
## Modul: `features/auth` | Target: Staging / Local Dev Environment

---

| Informasi Pengujian | Keterangan |
| :--- | :--- |
| **Feature / Task ID** | `CREAT-21` / `feat/CREAT-21-registrasi-login` |
| **Modul Aplikasi** | Autentikasi Supabase Multi-Role & PostgreSQL Prisma Sync |
| **Developer** | Fullstack Engineering Team |
| **QA Tester / Reviewer** | [Nama QA Tester / Reviewer] |
| **Target URL** | `http://localhost:3000` / `https://himatik-tim.vercel.app` |
| **Tanggal Uji** | 1 September 2026 |
| **Status Akhir** | [ ] **PASSED (Siap Rilis)** / [ ] **FAILED (Perlu Fix)** |

---

### 🔑 1. Kebutuhan Pengujian (Pre-Conditions)
- **Supabase Credentials**: `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` telah terpasang di `.env.local`.
- **Database**: PostgreSQL Supabase dalam kondisi online dan skema telah disinkronkan (`prisma/schema.prisma`).
- **Browser**: Google Chrome / Firefox / Safari (Mode Desktop & Device Toolbar Mobile 375px).

---

### 🔴 2. MUST-HAVE TEST CASES (Fungsi Inti, Keamanan & Validasi Kritis)
*Fokus: Alur utama pengguna (Happy Path), Pendaftaran Role (Buyer vs Creator), Verifikasi Email, Google OAuth, Sinkronisasi PostgreSQL via Prisma, dan Role-Based Redirection.*

- [ ] **TC-M01: [Happy Path] Registrasi Akun Customer / Buyer dengan Email**
  - **Langkah**:
    1. Buka `/register`.
    2. Pastikan tab terpilih adalah **"Customer (Penyewa)"**.
    3. Isi Nama: `Budi Buyer`, Email: `budi.test@example.com`, No HP: `081234567890`, Kata Sandi: `Gifteria2026!`, Konfirmasi: `Gifteria2026!`.
    4. Klik tombol **"Daftar Sebagai Customer"**.
  - **Expected**:
    - Aplikasi me-redirect ke halaman `/verify-email?email=budi.test%40example.com`.
    - Muncul instruksi ramah untuk membuka kotak masuk email verifikasi.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M02: [Happy Path] Registrasi Akun Creator / Mitra Rental (Dynamic Fields)**
  - **Langkah**:
    1. Buka `/register`.
    2. Klik tab **"Creator (Mitra Rental)"**.
    3. Periksa apakah field khusus (*Nama Toko / Brand* & *Kota Domisili*) muncul otomatis.
    4. Isi Nama: `Siti Creator`, Email: `siti.rental@example.com`, No HP: `081298765432`, Nama Toko: `Nusantara Bodo Studio`, Kota: `Makassar`, Password & Konfirmasi: `Gifteria2026!`.
    5. Klik tombol **"Daftar Sebagai Creator"**.
  - **Expected**:
    - Berhasil submit dan diarahkan ke `/verify-email`.
    - Data user dan profil toko siap disinkronkan ke tabel `users` & `creator_profiles` saat konfirmasi email diklik.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M03: [Validasi Kritis] Validasi Zod Form Registrasi & Password Mismatch**
  - **Langkah**:
    1. Buka `/register`.
    2. Masukkan email tidak valid (`budi-bukan-email`), password kurang dari 8 karakter (`12345`), atau konfirmasi password tidak cocok.
    3. Klik submit.
  - **Expected**:
    - Submit dicegah secara instan di sisi klien.
    - Pesan error spesifik muncul di bawah field yang bermasalah (*"Format email tidak valid"*, *"Password minimal 8 karakter"*, *"Konfirmasi password tidak cocok"*).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M04: [Happy Path] Login Email & Role-Based Redirection**
  - **Langkah**:
    1. Buka `/login`.
    2. Masukkan kredensial akun Customer yang sudah terdaftar & terverifikasi.
    3. Klik **"Masuk ke Akun"**.
  - **Expected**:
    - Sesi berhasil dibuat.
    - User Customer otomatis dialihkan langsung ke **Katalog Baju / Gift (`/katalog`)**.
    - Jika login menggunakan akun Creator ➔ Otomatis dialihkan ke **`/dashboard/creator`**.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M05: [Keamanan] Penolakan Kredensial Salah (Invalid Password)**
  - **Langkah**:
    1. Buka `/login`.
    2. Masukkan email terdaftar namun kata sandi sengaja disalahkan.
    3. Klik submit.
  - **Expected**:
    - Muncul banner peringatan merah: *"Email atau password yang Anda masukkan salah."*
    - Form tidak crash dan state loading berhenti.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M06: [OAuth & Callback] Login / Register Menggunakan Google**
  - **Langkah**:
    1. Buka `/login` atau `/register`.
    2. Klik tombol **"Masuk dengan Google"** / **"Daftar dengan Google"**.
  - **Expected**:
    - Browser membuka consent dialog Google OAuth.
    - Setelah akun Google dipilih, user di-redirect ke `/auth/callback?code=...` dan otomatis diarahkan ke halaman tujuan sesuai role.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-M07: [Database Sync] Sinkronisasi Supabase Auth ke PostgreSQL via Prisma**
  - **Langkah**:
    1. Setelah user berhasil konfirmasi email / OAuth.
    2. Periksa database PostgreSQL via Prisma Studio (`npx prisma studio`) atau Supabase Table Editor.
  - **Expected**:
    - Record baru terbentuk di tabel `users` dengan `id` sama persis dengan `auth.users.id` Supabase.
    - Jika Creator: record `creator_profiles` terisi `store_name` dan `city` yang sesuai.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

### 🟡 3. SHOULD-HAVE TEST CASES (Responsif Mobile, UX & State Handling)
*Fokus: Tampilan layar HP (375px), interaktivitas tombol show/hide password, loading state spinner, dan navigasi.*

- [ ] **TC-S01: [Tampilan Mobile] Responsivitas Form pada Layar 375px**
  - **Langkah**: Buka `/login`, `/register`, dan `/verify-email` pada mode responsif mobile (iPhone SE / 375px).
  - **Expected**:
    - Role Switcher tab pas di layar tanpa horizontal scrolling.
    - Input form, tombol Google, dan tombol submit dapat ditekan dengan nyaman (touch target >= 44px).
    - Teks tidak ada yang terpotong (*overflow*).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S02: [Interaktivitas UX] Toggle Show / Hide Password**
  - **Langkah**: Ketik kata sandi di form Login / Register ➔ Klik icon mata (*Eye Icon*).
  - **Expected**: Tipe input berubah dari `password` (titik-titik) menjadi `text` (terbaca), dan icon berubah menjadi `EyeOff`.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S03: [State UX] Loading State & Anti Double-Submit**
  - **Langkah**: Klik tombol Submit / Google Auth saat jaringan lambat.
  - **Expected**:
    - Tombol berubah menjadi disabled dengan animasi spinner (`Loader2`).
    - Mencegah klik berulang (*double-submit prevention*).
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

- [ ] **TC-S04: [Navigasi] Link Antar Halaman Auth**
  - **Langkah**:
    - Klik link *"Daftar Sekarang"* di `/login` ➔ Pindah ke `/register`.
    - Klik link *"Masuk di Sini"* di `/register` ➔ Pindah ke `/login`.
    - Klik logo *"Gifteria"* di header ➔ Pindah ke beranda `/`.
  - **Expected**: Navigasi instan via Next.js Link tanpa full page reload.
  - **Hasil QA**: `[ PASSED / FAILED ]` — *Catatan:*

---

### ✍️ 4. Verifikasi & Sign-Off QA

- **Ringkasan Temuan QA**:
  - `[ ]` Seluruh 7 Must-Have Test Cases lolos uji (100% Passed).
  - `[ ]` Seluruh 4 Should-Have Test Cases lolos uji.
- **Catatan / Feedback Tambahan**: __________________________________
- **Status Keputusan**: `[  ] APPROVED FOR DEVELOP / MAIN` / `[  ] REVISION NEEDED`
- **Tanda Tangan QA**: _______________________ (Tanggal: _____________)
