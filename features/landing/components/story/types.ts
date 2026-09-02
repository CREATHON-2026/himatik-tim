export interface StoryChapter {
  id: string;
  year: string;
  watermarkNumber: string;
  chapterNumber: string;
  title: string;
  description: string;
  figureNumber: string;
  figureCaption: string;
  figureLocation: string;
  figureDate: string;
  figureTag: string;
}

export const STORY_CHAPTERS_DATA: StoryChapter[] = [
  {
    id: "story-niat",
    year: "01 NIAT",
    watermarkNumber: "01",
    chapterNumber: "01",
    title: "Bermula dari Niat Menyampaikan Rasa.",
    description:
      "Setiap kado di Gifteria berawal dari momen berharga—ucapan selamat wisuda, rasa syukur hari pernikahan, perayaan hari jadi, atau peluk hangat di hari ulang tahun. Pembeli menemukan inspirasi karya istimewa dari sanggar kriya terpercaya di seluruh penjuru Indonesia.",
    figureNumber: "FIG. 01",
    figureCaption: "Catatan Kartu & Inspirasi Momen",
    figureLocation: "Eksplorasi Katalog Gifteria",
    figureDate: "Langkah Pertama",
    figureTag: "Momen Personal",
  },
  {
    id: "story-dialog",
    year: "02 DIALOG",
    watermarkNumber: "02",
    chapterNumber: "02",
    title: "Kreativitas yang Lahir dari Percakapan.",
    description:
      "Gifteria membuka ruang dialog langsung antara pembeli dan pembuat kado. Anda dapat berdiskusi mengenai pemilihan warna bunga segar, nuansa pita satin, hingga penulisan kartu ucapan personal yang tulus—semua tanpa biaya tambahan tersembunyi.",
    figureNumber: "FIG. 02",
    figureCaption: "Sketsa Rangkaian & Palet Pita",
    figureLocation: "Studio Percakapan Kreator",
    figureDate: "Personalisasi Kado",
    figureTag: "Kolaborasi Sanggar",
  },
  {
    id: "story-kriya",
    year: "03 KRIYA",
    watermarkNumber: "03",
    chapterNumber: "03",
    title: "Dirangkai dengan Ketelitian Manusia.",
    description:
      "Tangan terampil pengrajin mulai memilah tangkai bunga segar pilihan, menata isi hampers dalam luxury hardbox, dan memahat kriya kayu solid dengan penuh dedikasi. Sentuhan rasa manusia hadir di setiap simpul ikatan dan detail karya.",
    figureNumber: "FIG. 03",
    figureCaption: "Meja Kerja & Bahan Kriya Autentik",
    figureLocation: "Sanggar Kriya Terverifikasi",
    figureDate: "Proses Pengerjaan",
    figureTag: "100% Handcrafted",
  },
  {
    id: "story-antar",
    year: "04 ANTAR",
    watermarkNumber: "04",
    chapterNumber: "04",
    title: "Pengawalan Aman & Proteksi Escrow.",
    description:
      "Kado dikemas menggunakan standar proteksi ganda: tabung air segar untuk bunga, bantalan pelindung tebal, dan segel pita eksklusif. Dana pembeli tersimpan aman di rekening bersama escrow hingga kado tiba utuh di tujuan.",
    figureNumber: "FIG. 04",
    figureCaption: "Kemasan Double Protection & Segel",
    figureLocation: "Kurir Instant & Sameday",
    figureDate: "Pengiriman Terproteksi",
    figureTag: "Escrow Guarantee",
  },
  {
    id: "story-kesan",
    year: "05 KESAN",
    watermarkNumber: "05",
    chapterNumber: "05",
    title: "Senyum Bahagia & Kenangan Abadi.",
    description:
      "Pintu terbuka dan kado diserahkan. Senyum tulus merekah di wajah penerima. Rasa kasih tersampaikan sempurna, kenangan terukir abadi, dan sanggar menerima pencairan dana serta apresiasi yang pantas atas karya hebatnya.",
    figureNumber: "FIG. 05",
    figureCaption: "Momen Serah Terima Penuh Makna",
    figureLocation: "Tangan Penerima Kado",
    figureDate: "Tuntas dengan Sempurna",
    figureTag: "Kenangan Abadi",
  },
];
