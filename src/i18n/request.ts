import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'en', 'de'];

export default getRequestConfig(async ({ requestLocale }) => {
  // Récupère la langue demandée (mise à jour next-intl 3.22+)
  let locale = await requestLocale;

  // Si aucune langue n'est trouvée ou si elle n'est pas dans la liste, on force l'Allemand
  if (!locale || !locales.includes(locale as any)) {
    locale = 'de';
  }

  return {
    locale, // <-- C'EST CETTE LIGNE QUI MANQUAIT ET QUI CRÉAIT LE CRASH VERCEL
    messages: (await import(`../messages/${locale}.json`)).default
  };
});