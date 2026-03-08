import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
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
    default: "curate",
    template: "%s — curate",
  },
  description: "turn long-form content into ship-ready clips. ai extracts, you curate.",
  metadataBase: new URL("https://curate-xi.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "curate",
    title: "curate",
    description: "turn long-form content into ship-ready clips. ai extracts, you curate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "curate",
    description: "turn long-form content into ship-ready clips. ai extracts, you curate.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
