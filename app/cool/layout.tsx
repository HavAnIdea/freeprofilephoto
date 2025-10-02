import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cool & Stylish Avatars – Modern Gradients and Frames",
  description:
    "Generate cool profile pictures with geometric shapes, gradient backgrounds and stylish frames. Free PNG export.",
};

export default function CoolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

