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
    city: "Wellington",
    stores: [
      {
        id: "wlg-1",
        name: "Moore Wilson's Fresh",
        address: "93 Tory Street",
      },
      {
        id: "wlg-2",
        name: "Commonsense Organics",
        address: "260 Wakefield Street",
      },
      {
        id: "wlg-3",
        name: "Customs by Coffee Supreme",
        address: "39 Ghuznee Street",
      },
      {
        id: "wlg-4",
        name: "Mecca Cuba",
        address: "71 Cuba Street",
      },
      {
        id: "wlg-5",
        name: "Goodness Gracious",
        address: "122 Aro Street",
      },
    ],
  },
  {
    city: "Auckland",
    stores: [
      {
        id: "akl-1",
        name: "Farro Fresh Grey Lynn",
        address: "422 Great North Road",
      },
      {
        id: "akl-2",
        name: "Daily Bread Britomart",
        address: "11 Britomart Place",
      },
      {
        id: "akl-3",
        name: "Allpress Espresso Ponsonby",
        address: "12 Drake Street",
      },
      {
        id: "akl-4",
        name: "Cazador",
        address: "854 Dominion Road",
      },
      {
        id: "akl-5",
        name: "Eighthirty Newmarket",
        address: "53 Davis Crescent",
      },
    ],
  },
  {
    city: "Christchurch",
    stores: [
      {
        id: "chc-1",
        name: "Vic's Cafe",
        address: "132 Victoria Street",
      },
      {
        id: "chc-2",
        name: "C1 Espresso",
        address: "185 High Street",
      },
      {
        id: "chc-3",
        name: "Caffeine Laboratory",
        address: "1 New Regent Street",
      },
      {
        id: "chc-4",
        name: "Hummingbird Coffee",
        address: "269 Tuam Street",
      },
      {
        id: "chc-5",
        name: "Black Betty",
        address: "165 Madras Street",
      },
    ],
  },
];

export const COMING_SOON_CITIES: string[] = [
  "Melbourne",
  "Sydney",
  "London",
  "New York",
  "Tokyo",
];

export const DIRECT_PRODUCTS_DATA: DirectProduct[] = [
  {
    id: "still-01",
    sku: "STILL.01",
    name: "Clear",
    subtitle: "Cucumber & Yuzu",
    description: "For when you need to think clearly, all day.",
    accentColor: "#BCD3D8",
    glowColor: "rgba(188, 211, 216, 0.4)",
    price4Pack: 24,
    price12Pack: 68,
    tag: "Signature",
  },
  {
    id: "still-02",
    sku: "STILL.02",
    name: "Dawn",
    subtitle: "Ginger & Bergamot",
    description: "For mornings that need momentum without the spike.",
    accentColor: "#E8C9A0",
    glowColor: "rgba(232, 201, 160, 0.4)",
    price4Pack: 24,
    price12Pack: 68,
    tag: "Morning",
  },
  {
    id: "still-03",
    sku: "STILL.03",
    name: "Dusk",
    subtitle: "Blackcurrant & Manuka",
    description: "For late focus that won't follow you to bed.",
    accentColor: "#C9B5C8",
    glowColor: "rgba(201, 181, 200, 0.4)",
    price4Pack: 24,
    price12Pack: 68,
    tag: "Evening",
  },
];
