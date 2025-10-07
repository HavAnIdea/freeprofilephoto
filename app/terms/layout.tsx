import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – FreeProfilePhoto",
  description: "Simple, fair terms for using FreeProfilePhoto.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

