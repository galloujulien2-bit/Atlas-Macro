import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ParticleField from "@/components/particles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas Macro — Free Download",
  description: "Atlas Macro — The ultimate macro built for performance, simplicity, and reliability. Download for free.",
  keywords: ["Atlas Macro", "macro", "download", "automation", "gaming", "tool"],
  authors: [{ name: "Atlas Macro" }],
  openGraph: {
    title: "Atlas Macro",
    description: "The ultimate macro to optimize your gameplay.",
    siteName: "Atlas Macro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Macro",
    description: "The ultimate macro to optimize your gameplay.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ParticleField />
        <div className="content-layer">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
