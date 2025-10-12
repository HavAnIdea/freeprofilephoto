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
    default: "Free Profile Photo Generator – Create Profile Pictures",
    template: "%s · FreeProfilePhoto",
  },
  description:
    "Generate free profile photos instantly for Instagram, TikTok, X, Facebook. Create custom profile pictures online. Free profile photo maker with no sign-up or watermarks.",
  metadataBase: new URL("https://freeprofilephoto.com"),
  alternates: {
    canonical: "/",
  },
  themeColor: "#8b5cf6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: "website",
    title: "Free Profile Photo Generator",
    description:
      "Generate free profile photos for Instagram, TikTok, X, Facebook. Create profile pictures instantly online with no watermarks.",
    url: "https://freeprofilephoto.com",
    siteName: "FreeProfilePhoto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Profile Photo Generator",
    description:
      "Generate free profile photos for Instagram, TikTok, X, Facebook. Create profile pictures instantly online with no watermarks.",
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
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3316733072599542"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
