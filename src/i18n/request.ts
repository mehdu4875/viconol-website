import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // On attend la locale demandée (mise à jour next-intl 3.22+)
  let locale = await requestLocale;

  // Sécurité absolue : si pas de locale, on force l'Allemand ('de')
  if (!locale || !['fr', 'de', 'en'].includes(locale)) {
    locale = 'de';
  }

  // On importe les messages dynamiquement
  const messages = (await import(`../messages/${locale}.json`)).default;

  // On retourne bien la locale pour empêcher Vercel de crasher !
  return {
    locale,
    messages
  };
});