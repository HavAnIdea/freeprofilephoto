import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cute Avatar Maker – Kawaii Profile Pictures",
  description:
    "Create adorable cute avatars (cats, bears, bunnies, pandas, foxes) with backgrounds and accessories. Free, no watermarks.",
};

export default function CuteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

