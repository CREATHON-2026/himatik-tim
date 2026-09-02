import { Metadata } from "next";
import { AskGifteriaChat } from "@/components/creator-assistant/AskGifteriaChat";

export const metadata: Metadata = {
  title: "Tanya Gifteria • AI Creator Assistant",
  description:
    "Tanyakan tentang pendaftaran creator, produk yang dapat dijual, dan proses onboarding di Gifteria.",
};

export default function AskGifteriaPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <AskGifteriaChat />
    </div>
  );
}
