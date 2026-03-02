import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'en', 'de'];

export default getRequestConfig(async ({ requestLocale }) => {
  // 1. On attend la langue demandée (nouvelle méthode obligatoire)
  let locale = await requestLocale;

  // 2. Si aucune langue n'est détectée ou si elle n'est pas dans la liste
  if (!locale || !locales.includes(locale)) {
    locale = 'fr'; // On force le Français par défaut pour éviter que ça crashe
  }

  // 3. On charge les messages traduits
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    
    // 4. On retourne obligatoirement la locale ET les messages
    return {
      locale,
      messages
    };
  } catch (error) {
    notFound();
  }
});