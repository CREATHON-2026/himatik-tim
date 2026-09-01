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
    id: "story-2021",
    year: "2021",
    watermarkNumber: "21",
    chapterNumber: "01",
    title: "An idea, in a flat white office.",
    description:
      "STILL began on the south coast of the North Island, in a Cuba Street studio that smelled faintly of the harbor. The founders had spent a decade in tech and beverage R&D, watching a generation caffeinate itself toward burnout. The brief was simple: build a drink that delivered focus without the spike, the crash, or the dependency.",
    figureNumber: "FIG. 01",
    figureCaption: "Founders' first whiteboard sketch",
    figureLocation: "Cuba Street, Wellington",
    figureDate: "November 2021",
    figureTag: "R&D Studio",
  },
  {
    id: "story-2022",
    year: "2022",
    watermarkNumber: "22",
    chapterNumber: "02",
    title: "Formula development.",
    description:
      "Working with a clinical nutrition researcher at Massey University, the team narrowed the active blend to four functional inputs: L-Theanine, Lion's Mane, Rhodiola, and Bacopa. Twelve months of iteration on flavor, dosage, and shelf stability followed. The first drinkable prototype tasted of cucumber, yuzu, and faint regret. The team kept going.",
    figureNumber: "FIG. 02",
    figureCaption: "Lab samples, formulation phase",
    figureLocation: "Massey Lab, Palmerston North",
    figureDate: "August 2022",
    figureTag: "Clinical Batch 14",
  },
  {
    id: "story-2023",
    year: "2023",
    watermarkNumber: "23",
    chapterNumber: "03",
    title: "Wellington launch.",
    description:
      "STILL launched on a Tuesday in March, stocked at three specialty grocers across Wellington. SKU 01 Clear arrived first. The cans sold out in a week. Within a month, the brand was on the shelves of every meaningful corner store from Newtown to Karori. STILL Beverages Ltd. was officially incorporated.",
    figureNumber: "FIG. 03",
    figureCaption: "First shelf placement",
    figureLocation: "Moore Wilson's Fresh, Wellington",
    figureDate: "March 2023",
    figureTag: "Commercial Launch",
  },
  {
    id: "story-2024",
    year: "2024",
    watermarkNumber: "24",
    chapterNumber: "04",
    title: "A second flavor. A second city.",
    description:
      "SKU 02 Dawn (ginger and bergamot) released in late winter, designed for mornings that needed momentum without the spike. STILL expanded to Auckland and Christchurch through specialty grocers and independent cafes. The brand stayed deliberately small, refusing supermarket distribution. Word of mouth carried it further than budget ever could.",
    figureNumber: "FIG. 04",
    figureCaption: "Auckland stockist launch event",
    figureLocation: "Ponsonby Central, Auckland",
    figureDate: "July 2024",
    figureTag: "National Distribution",
  },
  {
    id: "story-2025",
    year: "2025",
    watermarkNumber: "25",
    chapterNumber: "05",
    title: "Late focus, by design.",
    description:
      "SKU 03 Dusk (blackcurrant and manuka) closed the trio, formulated for evening work without bedtime interference. STILL crossed the Tasman with a limited launch at Melbourne specialty grocers, and was featured in Monocle's autumn wellness issue. The studio doubled in size. The cans stayed the same.",
    figureNumber: "FIG. 05",
    figureCaption: "Melbourne launch stockist showcase",
    figureLocation: "Smith Street Grocer, Melbourne",
    figureDate: "September 2025",
    figureTag: "Trans-Tasman Expansion",
  },
];
