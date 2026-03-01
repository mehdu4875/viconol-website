import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <--- Import
import { prisma } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VICONÖL | Premium Lubricants",
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
  const categories = await prisma.category.findMany();

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-viconol-dark`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} categories={categories} />
          {children}
          <Footer locale={locale} /> {/* <--- FOOTER ICI */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}