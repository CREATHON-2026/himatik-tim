# 🔍 Analisis Mendalam & Troubleshooting: Error `Unsupported provider: provider is not enabled`

> **Mode:** Deep Research & Troubleshooting Analysis (Tanpa perubahan kode).

---

### 1. 🎯 Akar Masalah (Root Cause)

Pesan error:
```json
{
  "code": 400,
  "error_code": "validation_failed",
  "msg": "Unsupported provider: provider is not enabled"
}
```

Error ini **bukan disebabkan oleh bug pada kode Next.js atau TypeScript**, melainkan karena **Provider Google OAuth di Dashboard Supabase project Anda saat ini masih berstatus NON-AKTIF (*Disabled*)**.

Secara default, Supabase hanya mengaktifkan provider **Email & Password**. Ketika tombol *"Daftar / Masuk dengan Google"* diklik, kode memanggil API Supabase Auth (`/auth/v1/authorize?provider=google`). Karena Supabase mendeteksi switch provider Google belum dinyalakan di backend dashboard, Supabase menolak request tersebut dengan status `400 Validation Failed`.

---

### 2. 🛠️ Solusi & Panduan Langkah Demi Langkah (Step-by-Step Fix)

Untuk mengaktifkan Google Auth, Anda hanya perlu melakukan konfigurasi di **Google Cloud Console** dan **Dashboard Supabase**:

```
┌─────────────────────────┐          ┌─────────────────────────┐
│   Google Cloud Console  │ ───────► │   Supabase Dashboard    │ ───────► Next.js App
│ (Dapatkan Client ID &   │          │ (Aktifkan Google Auth & │          (Tombol Google
│      Client Secret)     │          │  Paste Client ID/Secret)│           Langsung Jalan)
└─────────────────────────┘          └─────────────────────────┘
```

---

#### 📌 FASE 1: Dapatkan Kredensial di Google Cloud Console
1. Buka [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
2. Buat / Pilih Project Google Cloud Anda.
3. Di tab **OAuth consent screen**:
   - Pilih **External** ➜ Klik *Create*.
   - Isi *App name* (misal: `Creathon App`) dan *User support email*.
4. Di tab **Credentials** ➜ Klik **+ CREATE CREDENTIALS** ➜ **OAuth client ID**:
   - Application type: **Web application**.
   - Name: `Creathon Supabase Auth`.
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `https://nkawrfgkahsjxvbvmjix.supabase.co`
   - **Authorized redirect URIs (PENTING)**:
     - `https://nkawrfgkahsjxvbvmjix.supabase.co/auth/v1/callback`
5. Klik **CREATE**. Salin **Client ID** dan **Client Secret** yang muncul.

---

#### 📌 FASE 2: Aktifkan Provider di Supabase Dashboard
1. Buka dashboard Supabase Anda:
   👉 **[Supabase Project Authentication Providers](https://supabase.com/dashboard/project/nkawrfgkahsjxvbvmjix/auth/providers)**
2. Cari dan klik provider **Google**.
3. Nyalakan toggle **"Enable Google provider"** (Ubah dari *Off* menjadi *On*).
4. Masukkan:
   - **Client ID (for OAuth)**: Paste *Client ID* dari Google Cloud.
   - **Client Secret (for OAuth)**: Paste *Client Secret* dari Google Cloud.
5. Klik **Save**.

---

#### 📌 FASE 3: Atur Redirect URLs di Supabase
1. Masuk ke menu **Authentication** ➜ **URL Configuration**:
   👉 **[Supabase URL Configuration](https://supabase.com/dashboard/project/nkawrfgkahsjxvbvmjix/auth/url-configuration)**
2. Pastikan:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Tambahkan `http://localhost:3000/auth/callback` dan `http://localhost:3000/**`.
3. Klik **Save**.

---

### 3. 🧪 Cara Verifikasi Setelah Diaktifkan

Setelah Anda menekan tombol **Save** di Supabase Dashboard:
1. Kembali ke browser di `http://localhost:3000/register`.
2. Klik tombol **"Daftar dengan Google (Customer)"**.
3. Browser akan langsung membuka layar pop-up pemilihan akun Google (*Google Consent Screen*) tanpa memunculkan error `Unsupported provider` lagi!