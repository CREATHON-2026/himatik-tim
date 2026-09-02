export interface AdaptogenIngredient {
  id: string;
  number: string;
  name: string;
  botanicalName: string;
  glyph: "leaf" | "mushroom" | "root" | "herb";
  description: string;
  source: string;
  role: string;
  dose: string;
  doseMg: number;
  rotationY: number;
}

export const ADAPTOGENS_DATA: AdaptogenIngredient[] = [
  {
    id: "kurasi",
    number: "01",
    name: "KURASI SANGGAR",
    botanicalName: "Vetted Artisan Florist & Craft Maker",
    glyph: "leaf",
    description:
      "Setiap mitra sanggar bunga dan perajin kriya melalui seleksi ketat portofolio, standar keaslian bahan, dan komitmen waktu pengerjaan.",
    source: "Kurasi Portofolio",
    role: "100% Pengrajin Terverifikasi",
    dose: "Rating & Ulasan Riil",
    doseMg: 100,
    rotationY: 0,
  },
  {
    id: "personalisasi",
    number: "02",
    name: "PERSONALISASI",
    botanicalName: "Bespoke Greeting Cards & Packaging",
    glyph: "herb",
    description:
      "Ruang dialog terbuka antara pembeli dan sanggar. Dilengkapi kartu ucapan eksklusif, pilihan pita kado, dan permintaan khusus sesuai momen.",
    source: "Gratis Kartu Ucapan",
    role: "Personalisasi Pesan Bebas",
    dose: "Konsultasi Langsung",
    doseMg: 100,
    rotationY: 55,
  },
  {
    id: "escrow",
    number: "03",
    name: "PROTEKSI ESCROW",
    botanicalName: "100% Guaranteed Safe Payment System",
    glyph: "root",
    description:
      "Dana Anda diamankan di sistem Creathon/Gifteria hingga pesanan selesai. Sanggar baru menerima pencairan dana setelah kado tiba dengan selamat.",
    source: "Rekening Bersama Escrow",
    role: "Nol Risiko Keamanan Dana",
    dose: "Garansi 100% Kembali",
    doseMg: 100,
    rotationY: 110,
  },
  {
    id: "pengiriman",
    number: "04",
    name: "PENGIRIMAN AMAN",
    botanicalName: "Delicate Same-Day & Instant Courier",
    glyph: "mushroom",
    description:
      "Standar proteksi ganda: tabung air khusus untuk bunga segar, bantalan hardbox, dan opsi kurir Same Day agar kado tiba dalam kondisi sempurna.",
    source: "Double Protection Box",
    role: "Instant & Sameday Delivery",
    dose: "Garansi Rusak Ganti Baru",
    doseMg: 100,
    rotationY: 165,
  },
];
