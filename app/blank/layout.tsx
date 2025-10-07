import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Default/Blank Avatar Generator – Initials & Geometric Backgrounds",
  description:
    "Create clean anonymous or default avatars with initials, solid or gradient backgrounds and subtle patterns. Free download.",
  alternates: {
    canonical: "/blank",
  },
};

export default function BlankLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
