import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime Avatar Maker – Stylized Profile Pictures",
  description:
    "Design anime-inspired avatars with customizable hair, eyes, expressions and backgrounds. 100% free, no watermarks.",
};

export default function AnimeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

