import type { Metadata } from "next";
import { Cormorant_Garamond, Spectral, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const bodySerif = Spectral({
  subsets: ["latin"],
  variable: "--font-serif-body",
  weight: ["400", "500", "600"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "CAISLEÁN DUBH — Screenplay Atlas",
    template: "%s — CAISLEÁN DUBH",
  },
  description:
    "A cinematic screenplay reader and structural atlas for CAISLEÁN DUBH. Written by Leigh Akin.",
  authors: [{ name: "Leigh Akin" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${bodySerif.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
