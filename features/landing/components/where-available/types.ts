export interface StockistItem {
  id: string;
  name: string;
  address: string;
}

export interface CityStockists {
  city: string;
  stores: StockistItem[];
}

export interface DirectProduct {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  glowColor: string;
  price4Pack: number;
  price12Pack: number;
  tag: string;
}

export const CITIES_STOCKISTS_DATA: CityStockists[] = [
  {
    city: "Jabodetabek",
    stores: [
      {
        id: "jkt-1",
        name: "Florist Senopati Artisan",
        address: "Buket Bunga Segar & Balon · Jl. Senopati No. 42",
      },
      {
        id: "jkt-2",
        name: "Gifteria Hampers Atelier",
        address: "Luxury Hardbox Korporat · Kuningan City Mall",
      },
      {
        id: "jkt-3",
        name: "Kemang Clay & Keepsake",
        address: "Kriya Keramik Kustom · Jl. Kemang Raya No. 18",
      },
      {
        id: "jkt-4",
        name: "BSD Botanical Studio",
        address: "Preserved Flower Abadi · Green Office Park BSD",
      },
      {
        id: "jkt-5",
        name: "Kelapa Gading Gift Collective",
        address: "Hampers Tematik & Souvenir · Boulevard Raya",
      },
    ],
  },
  {
    city: "Bandung & Jawa Barat",
    stores: [
      {
        id: "bdg-1",
        name: "Sanggar Bunga Dago",
        address: "Florist Segar & Rustic · Jl. Ir. H. Juanda No. 84",
      },
      {
        id: "bdg-2",
        name: "Studio Keramik Riau",
        address: "Kriya Cangkir & Piring Grafir · Jl. Riau No. 56",
      },
      {
        id: "bdg-3",
        name: "Braga Keepsake Atelier",
        address: "Kado Kayu Pahat & Grafir Nama · Jl. Braga No. 22",
      },
      {
        id: "bdg-4",
        name: "Cihampelas Gift Haven",
        address: "Hampers Souvenir Personal · Jl. Cihampelas No. 110",
      },
      {
        id: "bdg-5",
        name: "Lembang Herb & Flower Lab",
        address: "Bunga Kering & Aromaterapi · Jl. Raya Lembang",
      },
    ],
  },
  {
    city: "Bali & Indonesia Timur",
    stores: [
      {
        id: "dps-1",
        name: "Ubud Wood & Soul",
        address: "Seni Pahat Kayu Solid · Jl. Hanoman, Ubud",
      },
      {
        id: "dps-2",
        name: "Seminyak Bloom & Botanical",
        address: "Florist Tropis & Hampers · Jl. Kayu Aya, Seminyak",
      },
      {
        id: "dps-3",
        name: "Canggu Clay Society",
        address: "Artisan Keramik Handcrafted · Batu Bolong, Canggu",
      },
      {
        id: "dps-4",
        name: "Sanur Natural Aromatics",
        address: "Lilin Kedelai & Diffuser Alami · Jl. Danau Tamblingan",
      },
      {
        id: "dps-5",
        name: "Denpasar Kriya Heritage",
        address: "Cenderamata Eksklusif Nusantara · Jl. Teuku Umar",
      },
    ],
  },
];

export const COMING_SOON_CITIES: string[] = [
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Medan",
  "Makassar",
  "Malang",
];

export const DIRECT_PRODUCTS_DATA: DirectProduct[] = [];
