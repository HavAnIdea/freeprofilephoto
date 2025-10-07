import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – FreeProfilePhoto",
  description: "Privacy-first: no server uploads, no tracking by default.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

