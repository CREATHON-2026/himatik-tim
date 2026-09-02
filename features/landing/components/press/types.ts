export interface PressQuote {
  id: string;
  quote: string;
  source: string;
  issue: string;
  rating?: string;
  badge?: string;
}

export const PRESS_QUOTES_DATA: PressQuote[] = [
  {
    id: "quote-1",
    quote:
      "Rangkaian bunganya jauh lebih indah daripada foto. Sanggar sangat ramah saat berdiskusi tentang warna pita dan kartu ucapan kustom. Penerimanya sampai terharu bahagia.",
    source: "Sarah Anindya",
    issue: "Pembeli Buket Florist Jakarta",
    rating: "★★★★★",
    badge: "Pembeli Terverifikasi",
  },
  {
    id: "quote-2",
    quote:
      "Memesan 25 paket hampers luxury hardbox untuk apresiasi mitra akhir tahun. Rangkaian aromaterapi dan kriya lokalnya sangat berkelas, dipuji seluruh rekan direksi.",
    source: "Dimas Prasetyo",
    issue: "Managing Director, Studio Kreatif",
    rating: "★★★★★",
    badge: "Pesanan Korporat",
  },
  {
    id: "quote-3",
    quote:
      "Sebagai pengrajin kriya independen, sistem proteksi escrow Gifteria memberi rasa aman bertransaksi dan mempertemukan kami dengan pembeli yang benar-benar menghargai karya tangan.",
    source: "Sanggar Tanah Liat",
    issue: "Pengrajin Keramik & Kriya Bali",
    rating: "Verified Partner",
    badge: "Mitra Sanggar Terverifikasi",
  },
];

export const PRESS_MARQUEE_ITEMS: string[] = [
  "Manual Jakarta",
  "Kompas Lifestyle",
  "The Jakarta Post",
  "Bridestory",
  "Dewi Magazine",
  "Femina Living",
  "Harper's Bazaar Living",
  "Dekoruma Journal",
  "Indonesian Craft Council",
];
