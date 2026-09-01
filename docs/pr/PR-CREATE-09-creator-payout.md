# Pull Request: Modul Saldo & Penarikan Dana Sanggar (Creator Payout & Wallet)

## 📌 Ringkasan Singkat
Pull Request ini menghadirkan fitur **Manajemen Saldo & Penarikan Dana Kreator ([`/dashboard/creator/payout`](file:///d:/2-Project/creathon/app/dashboard/creator/payout/page.tsx))**, yang memungkinkan mitra sanggar kriya Creathon memantau pendapatan bersih secara transparan (*Available Balance, Escrow Balance, Lifetime Revenue*), mengatur rekening bank pencairan, dan mengajukan penarikan saldo langsung ke rekening.

---

## 🎯 Target Branch
- **Source Branch**: `feat/CREATE-06-katalog`
- **Target Branch**: `develop`

---

## 🚀 Cakupan Fitur (Must-Have & Should-Have)

### 🔴 Must-Have (Kritis & Wajib)
1. **Ringkasan Saldo 3 Metrik Utama ([`features/payout/components/PayoutBalanceHeader.tsx`](file:///d:/2-Project/creathon/features/payout/components/PayoutBalanceHeader.tsx))**:
   - **Saldo Siap Ditarik (*Available Balance*)**: Akumulasi pendapatan bersih dari transaksi `COMPLETED`.
   - **Saldo Tertahan di Escrow (*In Escrow Balance*)**: Dana pesanan `IN_ESCROW` yang sedang dirangkai atau dalam pengiriman kurir.
   - **Total Omzet Kumulatif (*Lifetime Revenue*)**: Akumulasi seluruh omzet kriya sanggar.
2. **Dialog Pengajuan Penarikan Dana ([`features/payout/components/RequestPayoutModal.tsx`](file:///d:/2-Project/creathon/features/payout/components/RequestPayoutModal.tsx))**:
   - Input nominal penarikan dengan validasi minimal Rp50.000 dan batas saldo tersedia.
   - *Quick Preset Chips* (`Rp100.000`, `Rp250.000`, `Rp500.000`, `Rp1.000.000`, dan tombol *"Tarik Semua"*).
   - Ringkasan rekening tujuan dan estimasi waktu dana tiba.
3. **Pengaturan Rekening Bank Pencairan ([`features/payout/components/BankAccountCard.tsx`](file:///d:/2-Project/creathon/features/payout/components/BankAccountCard.tsx))**:
   - Menampilkan data bank terdaftar (BCA, Mandiri, BRI, BNI, BSI, Bank Jago, SeaBank, e-Wallet).
   - Modal edit untuk memperbarui rekening bank pencairan kapan saja.
4. **Riwayat Penarikan Dana (*Payout History Table*) ([`features/payout/components/PayoutHistoryTable.tsx`](file:///d:/2-Project/creathon/features/payout/components/PayoutHistoryTable.tsx))**:
   - Tabel riwayat pencairan: Tanggal, No. Referensi (`#WD-XXXXXXXX`), Bank Tujuan, Nominal, dan Badge Status (*Sedang Diproses `PROCESSING`, Berhasil `SUCCESS`, Ditolak `REJECTED`*).
5. **Backend Endpoints**:
   - `GET /api/creator/payout`: Agregasi saldo riil dari tabel transaksi Prisma.
   - `POST /api/creator/payout`: Pembuatan pengajuan penarikan dana baru.
   - `PUT /api/creator/payout`: Pembaruan informasi rekening bank sanggar.

---

### 🟡 Should-Have (Penting untuk Efisiensi & UX)
1. **Aksi Salin No. Referensi Transaksi**:
   - Kemudahan menyalin nomor transaksi pencairan untuk keperluan konfirmasi/bantuan.
2. **Pencarian Riwayat Penarikan (*Search Filter*)**:
   - Filter cepat pada tabel riwayat berdasarkan ID transaksi atau nama bank.
3. **Tombol "Segarkan Saldo" (*Live Sync*)**:
   - Memuat ulang saldo secara reaktif tanpa reload halaman.
4. **Bebas Biaya Admin Antarbank (Rp0 Promo)**:
   - Informasi transparansi pembebasan biaya transfer antarbank bagi sanggar.

---

## 🧪 Quality Gate & Verifikasi

| Quality Check | Status | Keterangan |
|---|---|---|
| **`npm run type-check`** | ✅ **PASSED** | 0 Type Errors |
| **`npm run lint`** | ✅ **PASSED** | 0 Errors |
| **`npm run build`** | ✅ **PASSED** | 25/25 Routes Compiled (Termasuk `/dashboard/creator/payout` & `/api/creator/payout`) |

---

## 📂 File yang Ditambahkan / Dimodifikasi
- 📄 `app/api/creator/payout/route.ts` *(Endpoint Backend Saldo & Penarikan)*
- 📄 `features/payout/types.ts` *(TypeScript Interfaces)*
- 📄 `features/payout/api.ts` *(API Client Fetcher)*
- 📄 `features/payout/components/PayoutBalanceHeader.tsx` *(Kartu Metrik Saldo)*
- 📄 `features/payout/components/RequestPayoutModal.tsx` *(Modal Pengajuan Penarikan)*
- 📄 `features/payout/components/BankAccountCard.tsx` *(Pengaturan Rekening Bank)*
- 📄 `features/payout/components/PayoutHistoryTable.tsx` *(Tabel Riwayat Pencairan)*
- 📄 `app/dashboard/creator/payout/page.tsx` *(Halaman Utama Saldo & Penarikan)*
