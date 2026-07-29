import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeadModalProvider from "@/components/lead/LeadModalProvider";
import ScrollProgress from "@/components/fx/ScrollProgress";
import FxLayer from "@/components/fx/FxLayer";
import { siteConfig } from "@/data/site";
import "./globals.css";

// Sora не має кирилиці — українські заголовки падають на Inter 700/800
// (за поведінкою прототипу, де кирилиця рендериться фолбеком).
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Електромонтаж під ключ у Києві`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "електромонтаж Київ",
    "проєктування електропостачання",
    "підключення ДТЕК",
    "електромонтаж під ключ",
    "автоматизація KNX",
  ],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Електромонтаж під ключ у Києві`,
    description: siteConfig.description,
  },
};

// Структуровані дані для локального SEO (Google: картка компанії в пошуку)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: "+380505556640",
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Куренівська 5/7",
    addressLocality: "Київ",
    addressCountry: "UA",
  },
  areaServed: ["Київ", "Київська область"],
  description: siteConfig.description,
  openingHours: "Mo-Su 00:00-24:00",
  priceRange: "від 5 000 грн",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${sora.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-btn focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти до вмісту
        </a>
        <LeadModalProvider>
          <ScrollProgress />
          <FxLayer />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LeadModalProvider>
      </body>
    </html>
  );
}
