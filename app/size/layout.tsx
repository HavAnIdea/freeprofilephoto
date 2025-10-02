import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Photo Size Helper – Instagram, LinkedIn, Facebook, Discord",
  description:
    "Upload once and download perfectly sized profile pictures for Instagram, LinkedIn, Facebook, Discord, WhatsApp and more.",
};

export default function SizeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

