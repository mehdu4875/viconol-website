import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'en', 'de'];

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. Récupérer la locale avec la NOUVELLE méthode
  let locale = await requestLocale;

  // 2. Vérifier si elle est valide, sinon forcer une locale par défaut
  if (!locale || !locales.includes(locale)) {
    locale = 'fr';
  }

  // 3. Retourner la locale ET les messages
  return {
    locale, // <-- TRÈS IMPORTANT, C'EST CE QUE VERCEL RÉCLAME
    messages: (await import(`../messages/${locale}.json`)).default
  };
});