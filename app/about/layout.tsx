import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – FreeProfilePhoto",
  description: "Learn about FreeProfilePhoto and our mission.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

