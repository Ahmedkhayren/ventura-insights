import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "./fonts/source-serif-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/source-serif-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/source-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: siteConfig.name, title: siteConfig.title, description: siteConfig.description, images: ["/images/architecture.png"] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/images/architecture.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} data-scroll-behavior="smooth">
      <body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></body>
    </html>
  );
}
