import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['fr', 'en', 'de'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    // C'est ici qu'on charge le fichier JSON correspondant à la langue
    // On remonte d'un cran (../) pour sortir de 'i18n' et aller dans 'messages'
  messages: (await import(`../messages/${locale}.json`)).default
  };
});