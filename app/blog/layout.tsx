import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – FreeProfilePhoto",
  description: "Tips, tutorials and inspiration for profile pictures.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

