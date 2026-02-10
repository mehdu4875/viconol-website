import { Inter } from "next/font/google";
import "../globals.css"; // Assure-toi que le chemin est bon (souvent ../globals.css ou ./globals.css selon ton dossier)
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import AdminHiddenNavbar from "@/components/AdminHiddenNavbar"; // <--- IMPORT AJOUTÉ

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VICONÖL Lubricants",
  description: "L'excellence allemande en matière de lubrifiants.",
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Récupération des messages de traduction côté serveur
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          
          {/* On entoure la Navbar pour qu'elle disparaisse sur l'Admin */}
          <AdminHiddenNavbar>
            <Navbar locale={locale} />
          </AdminHiddenNavbar>

          {/* Le contenu de la page (Admin ou Site Public) */}
          {children}

          {/* Si tu as un Footer, entoure-le aussi ! 
          <AdminHiddenNavbar>
            <Footer />
          </AdminHiddenNavbar> 
          */}

        </NextIntlClientProvider>
      </body>
    </html>
  );
}