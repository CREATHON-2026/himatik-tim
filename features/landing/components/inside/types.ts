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
    id: "l-theanine",
    number: "01",
    name: "L-THEANINE",
    botanicalName: "Camellia sinensis",
    glyph: "leaf",
    description:
      "Promotes calm focus by encouraging alpha brain wave activity. Found naturally in green tea leaves.",
    source: "green tea leaf",
    role: "Calm, without sedation",
    dose: "200 MG OF 1,150",
    doseMg: 200,
    rotationY: 0,
  },
  {
    id: "lions-mane",
    number: "02",
    name: "LION'S MANE",
    botanicalName: "Hericium erinaceus",
    glyph: "mushroom",
    description:
      "A medicinal mushroom that supports nerve growth factor production and long-term cognitive clarity.",
    source: "whole fruiting body",
    role: "Long-term clarity",
    dose: "400 MG OF 1,150",
    doseMg: 400,
    rotationY: 55,
  },
  {
    id: "rhodiola",
    number: "03",
    name: "RHODIOLA",
    botanicalName: "Rhodiola rosea",
    glyph: "root",
    description:
      "An adaptogenic root that reduces mental fatigue and supports sustained attention under stress.",
    source: "arctic root extract",
    role: "Fatigue resistance",
    dose: "150 MG OF 1,150",
    doseMg: 150,
    rotationY: 110,
  },
  {
    id: "bacopa",
    number: "04",
    name: "BACOPA",
    botanicalName: "Bacopa monnieri",
    glyph: "herb",
    description:
      "An ayurvedic herb traditionally used to enhance memory and information retention over time.",
    source: "whole plant extract",
    role: "Memory and retention",
    dose: "300 MG OF 1,150",
    doseMg: 300,
    rotationY: 165,
  },
];
