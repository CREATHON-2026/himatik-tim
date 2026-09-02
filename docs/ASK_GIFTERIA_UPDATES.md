# Ask Gifteria - Updates & Improvements

## Update Terbaru (September 2, 2026)

### ✅ Knowledge Base Diperkuat

Ditambahkan 4 artikel baru (total 13 artikel APPROVED):

1. **Sistem Komisi** - Menjelaskan bahwa komisi masih dalam tahap konsep untuk demo
2. **Pengiriman & Cakupan Area** - Creator bisa atur sendiri area pengiriman, tidak dibatasi platform
3. **Proses Pendaftaran Creator** - Step-by-step lengkap dari daftar sampai upload produk
4. **Chat & Order Brief Compiler** - Penjelasan detail fitur unggulan Gifteria

### ✅ UI/UX Improvements

- **Hapus tombol "Lihat Panduan Creator"** - Menyederhanakan CTA
- **WhatsApp Integration** - Tombol "Hubungi Tim Operations" langsung ke WhatsApp

### ✅ Response Quality

- **Lebih Friendly** - Tone lebih conversational dan membantu
- **No Thinking Process** - Filter untuk tidak menampilkan proses berpikir AI
- **Context-Aware** - Jawaban menyesuaikan dengan pertanyaan spesifik

## Contoh Responses

### Pertanyaan: "Bagaimana sistem komisinya?"

**Jawaban:**
> "Untuk demo saat ini, sistem komisi Gifteria masih dalam tahap konsep. Model pendapatannya adalah komisi per transaksi, tapi detail persentase dan mekanisme payout masih dalam finalisasi. Untuk info paling update, bisa hubungi tim Operations ya!"

**Action:** Hubungi Tim Operations (WhatsApp)

### Pertanyaan: "Toko saya di Surabaya, gimana bisa kirim ke seluruh Indonesia?"

**Jawaban:**
> "Setiap creator mengelola pengiriman produknya sendiri. Kamu bisa gunakan jasa pengiriman pilihanmu (JNE, JNT, GoSend, dll) dan menentukan area yang kamu layani. Platform tidak membatasi area pengiriman, jadi kalau dari Surabaya mau kirim ke seluruh Indonesia, bisa banget! Untuk setup optimal, diskusikan dengan tim Operations."

**Action:** Hubungi Tim Operations (WhatsApp)

### Pertanyaan: "Apakah bisa jual HP?"

**Jawaban:**
> "Gifteria saat ini fokus pada produk hadiah custom seperti bucket bunga, gift box/hampers, dan produk handmade lokal. Untuk produk elektronik seperti HP, belum termasuk dalam kategori yang kami layani. Jika kamu punya ide produk lain, bisa hubungi tim Operations untuk diskusi lebih lanjut!"

**Action:** Hubungi Tim Operations (WhatsApp)

## Configuration

### Environment Variables

Update `.env` dengan nomor WhatsApp Operations yang sebenarnya:

```bash
NEXT_PUBLIC_OPERATIONS_CONTACT_URL="https://wa.me/628123456789"
```

Format:
- Harus diawali `https://wa.me/`
- Gunakan country code (62 untuk Indonesia)
- Nomor tanpa spasi, tanda +, atau karakter khusus
- Contoh: 0812-3456-7890 → 628123456789

## Knowledge Base Management

### Menambah Artikel Baru

```typescript
await prisma.creatorKnowledgeArticle.create({
  data: {
    slug: "unique-slug",
    title: "Judul Artikel",
    category: "Kategori",
    content: "Konten lengkap artikel...",
    keywords: "keyword1, keyword2, keyword3",
    status: "APPROVED",
    riskLevel: "GENERAL", // atau "POLICY", "LEGAL_OR_FINANCIAL"
    version: 1,
    effectiveFrom: new Date(),
    approvedAt: new Date(),
    allowedActionKeys: JSON.stringify(["CONTACT_OPERATIONS"]),
  }
});
```

### Update Artikel Existing

```typescript
await prisma.creatorKnowledgeArticle.update({
  where: { slug: "existing-slug" },
  data: {
    content: "Konten yang diupdate...",
    version: 2,
    updatedAt: new Date(),
  }
});
```

## Testing Checklist

- [ ] Tanya "Bagaimana sistem komisinya?" → Harus ada penjelasan dan tombol WA
- [ ] Tanya "Toko saya di Surabaya gimana bisa kirim ke seluruh Indonesia?" → Harus ada penjelasan pengiriman
- [ ] Tanya "Apakah bisa jual HP?" → Harus jelaskan fokus ke bucket/gift
- [ ] Klik "Hubungi Tim Operations" → Harus buka WhatsApp dengan nomor yang benar
- [ ] Tidak ada tombol "Lihat Panduan Creator" yang muncul
- [ ] Tidak ada thinking process yang tertampil di response

## Next Steps

1. **Update nomor WhatsApp** di `.env` dengan nomor Operations yang sebenarnya
2. **Test semua pertanyaan** di checklist di atas
3. **Monitor feedback** dari user untuk improve knowledge base
4. **Tambah artikel** sesuai pertanyaan yang sering muncul

## Notes

- Semua 13 artikel sudah status APPROVED dan siap digunakan
- Tombol "Lihat Panduan Creator" sudah di-comment (tidak muncul di UI)
- WhatsApp link sudah diset dengan nomor placeholder (perlu diganti dengan nomor asli)
- System prompt sudah dioptimalkan untuk response yang lebih friendly
