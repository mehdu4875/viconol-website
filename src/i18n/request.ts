import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'de', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Récupérer la locale avec la nouvelle méthode de next-intl
  let locale = await requestLocale;

  // 2. Si aucune locale n'est trouvée (par exemple par Vercel lors de la compilation)
  if (!locale || !locales.includes(locale)) {
    locale = 'fr'; // On force la langue par défaut pour empêcher le crash
  }

  return {
    locale, // <-- C'EST CETTE LIGNE QUI RÈGLE L'ERREUR DE VERCEL !
    messages: (await import(`../messages/${locale}.json`)).default
  };
});