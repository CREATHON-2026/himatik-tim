-- Update keywords untuk artikel komisi
UPDATE creator_knowledge_articles 
SET 
  keywords = 'komisi, biaya, pembayaran, fee, persentase, payout, pendapatan, transaksi, sistem komisi, bagaimana komisi, berapa komisi',
  content = '**Model Pendapatan Gifteria:**
Gifteria menggunakan model komisi per transaksi. Platform mengambil persentase kecil dari setiap transaksi yang berhasil untuk menutupi biaya operasional dan pengembangan platform.

**Detail Komisi:**
Besaran persentase komisi dan mekanisme payout sedang dalam proses finalisasi untuk memastikan fair bagi semua pihak - kreator, pembeli, dan platform.

**Yang Perlu Kamu Ketahui:**
- Tidak ada biaya pendaftaran atau biaya bulanan
- Komisi hanya dikenakan saat ada transaksi berhasil
- Mekanisme payout akan dijelaskan lengkap saat onboarding
- Sistem dirancang agar menguntungkan kreator dan sustainable untuk platform

**Informasi Lebih Lanjut:**
Untuk detail terbaru tentang persentase komisi, jadwal payout, dan persyaratan lainnya, silakan hubungi tim Operations. Mereka akan menjelaskan secara detail dan menjawab semua pertanyaanmu sebelum kamu memutuskan bergabung.',
  version = 2,
  "updatedAt" = NOW()
WHERE slug = 'sistem-komisi-demo';

-- Update keywords untuk artikel pengiriman
UPDATE creator_knowledge_articles 
SET 
  keywords = 'pengiriman, kirim, ekspedisi, ongkir, area, cakupan, surabaya, makassar, jne, jnt, gosend, logistik, delivery, kirim ke luar kota, kirim ke seluruh indonesia',
  "updatedAt" = NOW()
WHERE slug = 'pengiriman-dan-cakupan-area';
