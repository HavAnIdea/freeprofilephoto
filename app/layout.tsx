import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreeProfilePhoto – Free Profile Picture Maker (No Watermarks)",
    template: "%s · FreeProfilePhoto",
  },
  description:
    "Create funny, cute, cool and anime profile pictures instantly. 100% free, no sign‑up, no watermarks. Works on any device.",
  metadataBase: new URL("https://freeprofilephoto.com"),
  themeColor: "#8b5cf6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: "website",
    title: "FreeProfilePhoto – Free Profile Picture Maker",
    description:
      "Create funny, cute, cool and anime profile pictures instantly. Free, no watermarks.",
    url: "https://freeprofilephoto.com",
    siteName: "FreeProfilePhoto",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeProfilePhoto – Free Profile Picture Maker",
    description:
      "Create funny, cute, cool and anime profile pictures instantly. Free, no watermarks.",
    creator: "@FreeProfilePhoto",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
