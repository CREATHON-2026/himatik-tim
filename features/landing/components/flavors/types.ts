export interface FlavorIngredient {
  name: string;
  dose: string;
  isLead?: boolean;
}

export interface FlavorItem {
  id: string;
  number: string;
  tag: string;
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  glowColor: string;
  ingredients: FlavorIngredient[];
  totalActiveBlend: string;
}

export const FLAVORS_DATA: FlavorItem[] = [
  {
    id: "clear",
    number: "01",
    tag: "signature",
    name: "Clear",
    subtitle: "Cucumber & Yuzu",
    description:
      "The signature blend, paired with cucumber and yuzu. Clean, dry, faintly green. Built for the kind of work that asks you to stay present without raising the volume.",
    accentColor: "#BCD3D8",
    glowColor: "rgba(188, 211, 216, 0.4)",
    ingredients: [
      { name: "L-Theanine", dose: "200mg", isLead: true },
      { name: "Lion's Mane", dose: "500mg" },
      { name: "Rhodiola Rosea", dose: "150mg" },
      { name: "Bacopa Monnieri", dose: "300mg" },
    ],
    totalActiveBlend: "1,150",
  },
  {
    id: "dawn",
    number: "02",
    tag: "citrus",
    name: "Dawn",
    subtitle: "Ginger & Bergamot",
    description:
      "Ginger and bergamot, lifted by the same blend. The first one of the day. For the start of something, when you want the rise without the descent.",
    accentColor: "#E8C9A0",
    glowColor: "rgba(232, 201, 160, 0.45)",
    ingredients: [
      { name: "Rhodiola Rosea", dose: "150mg", isLead: true },
      { name: "L-Theanine", dose: "200mg" },
      { name: "Lion's Mane", dose: "500mg" },
      { name: "Bacopa Monnieri", dose: "300mg" },
    ],
    totalActiveBlend: "1,150",
  },
  {
    id: "dusk",
    number: "03",
    tag: "berry",
    name: "Dusk",
    subtitle: "Blackcurrant & Manuka",
    description:
      "Blackcurrant and manuka, with the same four adaptogens. A late drink that won't keep you up. For the hours that should still end in sleep.",
    accentColor: "#C9B5C8",
    glowColor: "rgba(201, 181, 200, 0.45)",
    ingredients: [
      { name: "Bacopa Monnieri", dose: "300mg", isLead: true },
      { name: "L-Theanine", dose: "200mg" },
      { name: "Lion's Mane", dose: "500mg" },
      { name: "Rhodiola Rosea", dose: "150mg" },
    ],
    totalActiveBlend: "1,150",
  },
];
