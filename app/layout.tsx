import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Gifteria — Marketplace Gift, Hampers & Creative Kriya",
  description: "Tempat bertemunya kreator, karya gift personal, buket bunga, dan kerajinan tangan terbaik Nusantara.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`h-full antialiased ${playfairDisplay.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-[#FAFAF9] text-[#111827]">
        {children}
      </body>
    </html>
  );
}
