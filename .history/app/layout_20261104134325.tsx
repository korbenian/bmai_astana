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
  title: 'BMAI Astana — Официальный магазин спортивной обуви в Астане',
  description: 'Купить беговые кроссовки BMAI в Астане. Профессиональная обувь для бега, марафонов и трейла. Примерка в магазине.',
  keywords: ['BMAI', 'BMAI Астана', 'кроссовки Астана', 'беговая обувь', 'Pace 6.0', 'Fly 2.0'],
  openGraph: {
    title: 'BMAI Astana — Магазин спортивной обуви',
    description: 'Примерь идеальную пару под твой темп в Астане!',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
