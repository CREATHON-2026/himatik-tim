import { Metadata } from "next";
import { AskGifteriaChat } from "@/components/creator-assistant/AskGifteriaChat";

export const metadata: Metadata = {
  title: "Tanya Gifteria • AI Creator Assistant",
  description:
    "Tanyakan tentang pendaftaran creator, produk yang dapat dijual, dan proses onboarding di Gifteria.",
};

export default function CreatorAskGifteriaPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <AskGifteriaChat />
    </div>
  );
}
