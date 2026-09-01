# Panduan Pengujian Manual: Manajemen Pesanan Masuk Kreator

**Fitur**: Manajemen Pesanan Kreator (`/dashboard/creator/orders`)  
**Target URL**: `http://localhost:3000/dashboard/creator/orders`  
**Role**: Creator / Mitra Sanggar  

---

## 🔴 BAGIAN 1: MUST-HAVE (Kritis & Wajib Berfungsi)

### TC-01: Memuat Daftar Pesanan Masuk
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 1.1 | Buka `http://localhost:3000/dashboard/creator/orders` | Halaman memuat daftar transaksi pesanan kriya milik toko yang login. | [ ] PASS |
| 1.2 | Periksa informasi pada setiap kartu pesanan | Kartu menampilkan No. Invoice (`#CRT-...`), tanggal, foto produk, nama produk, dan pendapatan bersih. | [ ] PASS |

---

### TC-02: Filter Status Pesanan & Pencarian
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 2.1 | Klik tab filter "Perlu Dirangkai" (`IN_ESCROW`) | Daftar pesanan hanya menampilkan transaksi yang pembayarannya sudah aman di escrow. | [ ] PASS |
| 2.2 | Klik tab filter "Selesai" (`COMPLETED`) | Daftar pesanan hanya menampilkan transaksi yang telah selesai. | [ ] PASS |
| 2.3 | Ketik kata kunci pada Search Bar (misal: "Buket" atau nomor invoice) | Daftar pesanan langsung terfilter secara reaktif sesuai kata kunci. | [ ] PASS |

---

### TC-03: Lembar Kerja & Pembaruan Status Pesanan
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 3.1 | Klik tombol "Rincian" pada salah satu kartu pesanan | Masuk ke halaman lembar kerja: `/dashboard/creator/orders/[id]`. | [ ] PASS |
| 3.2 | Klik tombol "Tandai Selesai & Diserahkan ke Kurir" | Status pesanan berganti menjadi "Selesai", muncul toast sukses, dan status terupdate di database. | [ ] PASS |
| 3.3 | Klik tombol "Batalkan Pesanan" (pada pesanan belum selesai) | Status pesanan berganti menjadi "Dibatalkan". | [ ] PASS |

---

## 🟡 BAGIAN 2: SHOULD-HAVE (Penting untuk Efisiensi & UX)

### TC-04: Metrik Statistik KPI Pesanan (*Stats Bar*)
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 4.1 | Perhatikan 5 kartu statistik di bagian atas halaman | Angka "Total Pesanan", "Menunggu Bayar", "Perlu Dirangkai", "Selesai", dan "Total Omzet" sinkron dengan jumlah transaksi aktual. | [ ] PASS |

---

### TC-05: Integrasi WhatsApp Pembeli
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 5.1 | Klik tombol "Chat Pembeli" pada kartu pesanan atau halaman detail | Membuka tab WhatsApp ke nomor pembeli dengan format salam dan nomor invoice otomatis. | [ ] PASS |

---

### TC-06: Aksi Cepat pada Kartu (*Quick Action*)
| Langkah | Aksi | Hasil yang Diharapkan | Status |
|---|---|---|---|
| 6.1 | Pada kartu dengan status "Perlu Dirangkai", klik tombol "Tandai Selesai" | Status langsung berganti menjadi "Selesai" tanpa harus membuka halaman detail. | [ ] PASS |
| 6.2 | Klik tombol "Segarkan Data" di pojok kanan atas | Data pesanan dan statistik ter-refresh ulang dengan animasi indikator loading. | [ ] PASS |
