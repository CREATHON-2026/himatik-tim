# Skenario Pengujian Manual: Alur Belanja Marketplace, Checkout, & Order Invoicing

**ID Pengujian**: `TC-BUYER-FLOW-01`  
**Fitur**: Marketplace Publik, Detail Produk Kriya, Checkout & Kustomisasi Kado, Invoice Digital  
**Branch**: `feat/CREATE-06-katalog`  
**Target URL**: `http://localhost:3000`

---

## 📋 Skenario 1: Penjelajahan Katalog Publik (`/katalog`)

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1.1 | Buka browser ke URL `http://localhost:3000/katalog` | Halaman memuat grid kartu produk asli dari database dengan gaya visual Modern Editorial (Violet `#6355D9`). | [ ] PASS |
| 1.2 | Ketik kata kunci pada Search Bar (misal: "Buket" atau "Lilac") | Daftar produk terfilter secara reaktif sesuai judul yang diketik. | [ ] PASS |
| 1.3 | Klik pill kategori (misal: "Buket & Floral" atau "Hampers & Gift Box") | Kartu produk hanya menampilkan karya dari kategori terpilih. | [ ] PASS |
| 1.4 | Ganti opsi Urutan pada dropdown (misal: "Harga Terendah") | Urutan kartu produk berubah sesuai harga dari termurah ke termahal. | [ ] PASS |
| 1.5 | Klik tombol Love/Heart pada salah satu kartu produk | Muncul toast notifikasi "Ditambahkan ke daftar favorit". | [ ] PASS |

---

## 📋 Skenario 2: Halaman Detail Produk Kriya (`/katalog/[id]`)

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 2.1 | Klik salah satu kartu produk dari katalog | Terbuka halaman `/katalog/[id]` dengan breadcrumb, galeri foto, judul, harga, dan badge autentik. | [ ] PASS |
| 2.2 | Klik thumbnail foto di bawah gambar utama | Gambar utama berganti sesuai foto thumbnail yang dipilih. | [ ] PASS |
| 2.3 | Klik tab "Deskripsi", "Spesifikasi", atau "Ulasan" | Konten tab berganti dengan lancar menampilkan spesifikasi kado dan panduan perawatan. | [ ] PASS |
| 2.4 | Ubah counter kuantitas (qty) menjadi `2` | Counter berubah menjadi 2 dan tidak melebihi stok yang tersedia. | [ ] PASS |
| 2.5 | Klik tombol "Tambah ke Keranjang" | Muncul toast hijau: `"2x [Nama Produk] berhasil ditambahkan ke keranjang!"`. | [ ] PASS |
| 2.6 | Klik tombol "Beli Sekarang" | Browser langsung dialihkan ke halaman checkout: `/checkout?productId=[id]&qty=2`. | [ ] PASS |

---

## 📋 Skenario 3: Formulir Checkout & Kustomisasi Kado (`/checkout`)

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 3.1 | Masuk ke halaman `/checkout?productId=...` | Halaman memuat ringkasan produk di kolom kanan dan formulir pengiriman di kolom kiri. | [ ] PASS |
| 3.2 | Isi Nama Lengkap, No. WhatsApp, dan Alamat Lengkap | Input terisi dengan benar. | [ ] PASS |
| 3.3 | Pilih opsi kurir "Same Day Delivery" atau "Kurir Instant" | Biaya ongkir di kolom kanan otomatis terupdate secara dinamis. | [ ] PASS |
| 3.4 | Isi teks pada kotak "Pesan Kartu Ucapan" (Greeting Card) | Teks ucapan kado tersimpan di state form. | [ ] PASS |
| 3.5 | Pilih opsi kemasan "Luxury Gift Hardbox" | Biaya kemasan (+Rp15.000) otomatis ditambahkan ke total pembayaran di ringkasan. | [ ] PASS |
| 3.6 | Pilih metode pembayaran "QRIS Instan" | Radio button terpilih dengan border violet aktif. | [ ] PASS |
| 3.7 | Klik tombol "Konfirmasi & Bayar Sekarang" | Muncul loading spinner, pesanan tersimpan ke database, dan halaman berpindah ke `/orders/[id]`. | [ ] PASS |

---

## 📋 Skenario 4: Invoice Digital & Konfirmasi WhatsApp (`/orders/[id]`)

| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 4.1 | Masuk ke halaman `/orders/[id]` | Menampilkan No. Invoice `#CRT-XXXXXXXX`, status "Menunggu Pembayaran", dan barcode QRIS. | [ ] PASS |
| 4.2 | Klik tombol "Salin Nominal" | Nominal tagihan tersalin ke clipboard dan muncul toast notifikasi. | [ ] PASS |
| 4.3 | Klik tombol "Simulasikan Bayar Sekarang (Demo)" | Status pesanan berganti menjadi "Pembayaran Terverifikasi (Escrow Safe)" dengan warna hijau. | [ ] PASS |
| 4.4 | Klik tombol "Kirim Rincian ke WhatsApp Sanggar" | Membuka tab baru WhatsApp ke nomor sanggar dengan format pesan invoice otomatis. | [ ] PASS |
| 4.5 | Klik link "Lanjut Belanja Kriya" di pojok kanan atas | Kembali ke halaman `/katalog` dengan aman. | [ ] PASS |

---

## 📝 Catatan Tambahan Developer
> **Tips Build Windows**: Jika menjalankan `npm run build` yang memicu `prisma generate` saat `npm run dev` aktif, sistem Windows akan mengunci file engine `.dll.node` (`EPERM`). Matikan sementara dev server (`Ctrl+C`) atau jalankan `npx next build` langsung untuk build produksi.
