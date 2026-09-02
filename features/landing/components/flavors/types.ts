export interface CraftSpecItem {
  label: string;
  value: string;
  isLead?: boolean;
}

export interface FlavorItem {
  id: string;
  number: string;
  tag: string;
  categorySlug: string;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  glowColor: string;
  startingPrice: string;
  leadTime: string;
  ingredients: { name: string; dose: string; isLead?: boolean }[];
  totalActiveBlend: string;
  previewBadge: string;
}

export const FLAVORS_DATA: FlavorItem[] = [
  {
    id: "floral",
    number: "01",
    tag: "Artisan Floral",
    categorySlug: "floral",
    name: "Buket Bunga",
    subtitle: "Bunga Segar yang Merangkai Cerita",
    description:
      "Rangkaian bunga segar pilihan dan preserved flowers yang dirangkai manual oleh florist independen untuk mengabadikan momen kelulusan, anniversary, dan ungkapan kasih.",
    accentColor: "#E76F61",
    glowColor: "rgba(231, 111, 97, 0.35)",
    startingPrice: "Rp125.000",
    leadTime: "Same Day / 1 Hari",
    ingredients: [
      { name: "Fresh & Preserved Flora", dose: "100% Organik", isLead: true },
      { name: "Kemasan Kraft Artisan", dose: "Double Wrap" },
      { name: "Pita Satin & Greeting Card", dose: "Termasuk" },
      { name: "Proteksi Pengiriman", dose: "Water Tube" },
    ],
    totalActiveBlend: "100% Handcrafted",
    previewBadge: "Siap Kirim & Pre-Order",
  },
  {
    id: "hampers",
    number: "02",
    tag: "Luxury Hampers",
    categorySlug: "hampers",
    name: "Hampers Tematik",
    subtitle: "Bingkisan Elegan Segala Perayaan",
    description:
      "Kurasi kado tematik dalam luxury hardbox eksklusif, memadukan wewangian aromaterapi, camilan artisan, dan cenderamata istimewa untuk korporat maupun perayaan keluarga.",
    accentColor: "#6355D9",
    glowColor: "rgba(99, 85, 217, 0.35)",
    startingPrice: "Rp250.000",
    leadTime: "1 - 2 Hari Kerja",
    ingredients: [
      { name: "Luxury Magnetic Hardbox", dose: "Tebal & Kokoh", isLead: true },
      { name: "Isi Kado Terkurasi", dose: "3 - 5 Item" },
      { name: "Gold Foil Greeting Card", dose: "Personal" },
      { name: "Proteksi Pengiriman", dose: "Double Dus" },
    ],
    totalActiveBlend: "Best Seller Kado",
    previewBadge: "Eksklusif & Tematik",
  },
  {
    id: "custom",
    number: "03",
    tag: "Bespoke Keepsakes",
    categorySlug: "custom",
    name: "Kriya Kustom",
    subtitle: "Sentuhan Personal yang Abadi",
    description:
      "Karya keramik, ukiran kayu solid, dan ilustrasi seni dengan ukiran nama atau pesan personal yang dikerjakan satu per satu oleh pengrajin sanggar kriya terpercaya.",
    accentColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.35)",
    startingPrice: "Rp150.000",
    leadTime: "2 - 3 Hari Kerja",
    ingredients: [
      { name: "Kayu Solid & Keramik", dose: "Autentik", isLead: true },
      { name: "Ukiran Nama / Tanggal", dose: "Presisi" },
      { name: "Sertifikat Karya Sanggar", dose: "Verified" },
      { name: "Garansi Kerusakan", dose: "100% Ganti" },
    ],
    totalActiveBlend: "Kustomisasi Bebas",
    previewBadge: "Karya Personal",
  },
];
