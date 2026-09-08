import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ante — influence-агентство для gambling и iGaming брендов",
    template: "%s — Ante",
  },
  description:
    "Ante связывает casino и betting-бренды с 1400+ проверенными gambling-стримерами и инфлюенсерами: подбор креаторов, медиабаинг, отчётность под ключ.",
  keywords: [
    "gambling influencer marketing",
    "casino influencer agency",
    "iGaming influencer marketing",
    "gambling streamers",
    "инфлюенс-маркетинг казино",
    "реклама у стримеров gambling",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Ante",
    title: "Ante — influence-агентство для gambling и iGaming брендов",
    description:
      "1400+ проверенных gambling-стримеров и инфлюенсеров. Подбор креаторов, медиабаинг и отчётность под ключ.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ante — influence-агентство для gambling и iGaming брендов",
    description: "1400+ проверенных gambling-стримеров и инфлюенсеров под ключ.",
  },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ante",
  url: siteUrl,
  description:
    "Influence-агентство полного цикла для gambling и iGaming брендов: подбор стримеров, медиабаинг, отчётность.",
  areaServed: "Worldwide",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0A0B0E] font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
