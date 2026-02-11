import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AdminHiddenNavbar from '@/components/AdminHiddenNavbar';
import { prisma } from '@/lib/db'; // Import de Prisma pour les catégories

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // On définit les langues supportées directement ici pour éviter l'erreur d'import
  const locales = ['fr', 'en', 'de'];
  
  // Vérification de la langue
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Chargement des messages de traduction
  const messages = await getMessages();

  // RÉCUPÉRATION DES CATÉGORIES (Côté Serveur pour la Navbar)
  const categories = await prisma.category.findMany({
    orderBy: { slug: 'asc' }
  });

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased bg-viconol-dark text-white">
        {/* Fournisseur de traductions pour les composants clients (Navbar, etc.) */}
        <NextIntlClientProvider messages={messages}>
          
          {/* CORRECTION : AdminHiddenNavbar doit ENTOURER la Navbar */}
          <AdminHiddenNavbar>
            {/* On passe les catégories récupérées en haut à la Navbar */}
            <Navbar locale={locale} categories={categories} />
          </AdminHiddenNavbar>
          
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}