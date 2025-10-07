import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – FreeProfilePhoto",
  description: "Get in touch with the FreeProfilePhoto team.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

