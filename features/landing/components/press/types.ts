export interface PressQuote {
  id: string;
  quote: string;
  source: string;
  issue: string;
}

export const PRESS_QUOTES_DATA: PressQuote[] = [
  {
    id: "quote-1",
    quote:
      "The rare functional drink that tastes like a decision, not a compromise.",
    source: "MERIDIAN",
    issue: "Vol. 14 · Autumn Issue",
  },
  {
    id: "quote-2",
    quote:
      "Proof that a can of adaptogens can be as considered as the desk it sits on.",
    source: "FOLDOUT",
    issue: "Design & Living · Oct 2024",
  },
  {
    id: "quote-3",
    quote:
      "We stopped drinking coffee at our editorial meetings. Nobody has said so out loud.",
    source: "QUIET HOURS",
    issue: "Editorial Review · 2025",
  },
];

export const PRESS_MARQUEE_ITEMS: string[] = [
  "Meridian",
  "The Long Lunch",
  "Foldout",
  "Salt Journal",
  "Quiet Hours",
  "Monocle",
  "Sight Unseen",
  "Kinfolk",
];
