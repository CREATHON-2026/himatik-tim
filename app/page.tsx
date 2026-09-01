import {
  SectionHero,
  SectionAgitation,
  SectionSolution,
  SectionEarlyBird,
  SectionShowcase,
  SectionFooter,
} from "@/features/landing";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500 selection:text-white">
      <SectionHero />
      <SectionAgitation />
      <SectionSolution />
      <SectionEarlyBird />
      <SectionShowcase />
      <SectionFooter />
    </main>
  );
}
