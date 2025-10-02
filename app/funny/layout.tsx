import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funny Avatar Maker – Create Hilarious Profile Pics",
  description:
    "Make funny profile pictures with emojis, stickers and colorful backgrounds. Free, instant PNG download.",
};

export default function FunnyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

