import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creathon — Marketplace Gift, Hampers & Creative Kriya",
  description: "Tempat bertemunya kreator, karya gift personal, buket bunga, dan kerajinan tangan terbaik Nusantara.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAFAF9] text-[#111827]">
        {children}
      </body>
    </html>
  );
}
