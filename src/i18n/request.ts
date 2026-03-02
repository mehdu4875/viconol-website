import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'de']; // J'ai retiré 'en' si tu ne l'utilises pas, remets-le si besoin

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupère la locale demandée
  let locale = await requestLocale;

  // Si la locale n'existe pas ou n'est pas supportée, on force une erreur 404 (ou on définit 'fr' par défaut)
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale, // <--- C'est CETTE LIGNE qui corrige l'erreur Vercel !
    messages: (await import(`../messages/${locale}.json`)).default
  };
});