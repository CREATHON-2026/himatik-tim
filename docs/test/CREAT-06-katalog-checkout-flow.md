# Panduan Pengujian Manual: Alur Belanja, Checkout Kado, & Pelacakan Invoice

**Fitur**: Marketplace Buyer Flow (`/katalog` ➔ `/katalog/[id]` ➔ `/checkout` ➔ `/orders/[id]`)  
**Target URL**: `http://localhost:3000/katalog`  
**Role**: Pembeli (Customer / Guest)  

---

## 🔴 BAGIAN 1: MUST-HAVE (Kritis & Wajib Berfungsi)

### TC-01: Eksplorasi & Filter Katalog Publik
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1.1 | Buka `http://localhost:3000/katalog` | Katalog memuat daftar produk kado dari database dengan foto, nama, sanggar, dan harga. | [ ] PASS |
| 1.2 | Klik tombol kategori (misal: "Buket Bunga" atau "Hampers") | Grid produk langsung terfilter menampilkan kado sesuai kategori. | [ ] PASS |
| 1.3 | Ketik nama produk pada search bar | Daftar produk terfilter secara reaktif sesuai kata kunci. | [ ] PASS |

---

### TC-02: Detail Produk & Aksi Pembelian
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 2.1 | Klik salah satu kartu produk di katalog | Masuk ke halaman detail `/katalog/[id]` dengan galeri foto, spesifikasi, dan info sanggar. | [ ] PASS |
| 2.2 | Periksa tombol "Tambah ke Keranjang" | Tombol berstatus nonaktif (*disabled*) dengan label "(Segera Hadir)". | [ ] PASS |
| 2.3 | Klik tombol "Beli Sekarang" | Langsung diarahkan ke halaman checkout: `/checkout?productId=...&qty=1`. | [ ] PASS |

---

### TC-03: Formulir Checkout & Personalisasi Kado
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 3.1 | Pada form checkout, isi Nama Penerima, No. WhatsApp, dan Alamat Lengkap | Data terinput dengan validasi wajib isi. | [ ] PASS |
| 3.2 | Ketik pesan pada kolom "Teks Kartu Ucapan Kado" (misal: "Selamat Wisuda Sarah!") | Teks kartu ucapan tersimpan ke data pesanan. | [ ] PASS |
| 3.3 | Pilih opsi kurir (*Kurir Instant*) dan kemasan (*Paper Wrap / Luxury Box*) | Kalkulasi total tagihan otomatis bertambah secara real-time. | [ ] PASS |
| 3.4 | Klik tombol "Konfirmasi & Bayar Sekarang" | Muncul toast sukses dan dialihkan ke invoice digital `/orders/[id]`. | [ ] PASS |

---

### TC-04: Invoice Digital & Sinkronisasi Data 100%
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 4.1 | Periksa tampilan halaman invoice `/orders/[id]` | Nomor invoice `#CRT-XXXXXXXX` dan status "Menunggu Pembayaran" muncul. | [ ] PASS |
| 4.2 | Periksa box pesan kartu ucapan | Pesan kartu ucapan yang diisi saat checkout tampil 100% sama dengan tipografi serif elegan. | [ ] PASS |
| 4.3 | Periksa kartu penerima kado | Nama, nomor telepon, dan alamat pengiriman tampil 100% sesuai input sebelumnya. | [ ] PASS |
| 4.4 | Klik tombol "Simulasikan Bayar Sekarang (Demo)" | Status berganti menjadi "Pembayaran Terverifikasi (Escrow Safe)" dan stepper tahap 2 aktif. | [ ] PASS |

---

## 🟡 BAGIAN 2: SHOULD-HAVE (Penting untuk Efisiensi & UX)

### TC-05: Panduan Pembayaran QRIS (*Accordion Guide*)
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 5.1 | Klik accordion "Cara Pembayaran QRIS" pada kolom kiri invoice | Accordion terbuka menampilkan tab panduan M-Banking & E-Wallet. | [ ] PASS |
| 5.2 | Klik tombol "Salin Nominal" di bawah total tagihan | Nominal berhasil disalin ke clipboard dengan notifikasi toast. | [ ] PASS |

---

### TC-06: Tombol Aksi WhatsApp & Cetak Struk
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 6.1 | Klik tombol "Kirim Rincian ke WhatsApp Sanggar" | Membuka tab WhatsApp ke nomor sanggar dengan rincian invoice otomatis. | [ ] PASS |
| 6.2 | Klik tombol "Cetak Invoice" di navbar atas | Membuka dialog print browser dengan layout struk yang bersih (*clean printable layout*). | [ ] PASS |
