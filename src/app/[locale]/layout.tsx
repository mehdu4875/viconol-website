import type { Metadata } from "next/metadata";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "VICONÖL",
  description: "German High-Performance Lubricants",
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  
  const messages = await getMessages();

  let categories = [];
  try {
    categories = await prisma.category.findMany({
      orderBy: { id: 'asc' }
    });
  } catch (error) {
    console.error("Impossible de charger les catégories");
  }

  return (
    <html lang={locale}>
      {/* MISE À JOUR DU DESIGN :
        - bg-viconol-bg-light : Applique le fond blanc
        - text-viconol-text-dark : Applique le texte sombre
      */}
      <body className={`${inter.variable} font-sans bg-viconol-bg-light text-viconol-text-dark antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} categories={categories} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}