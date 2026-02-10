import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // 1. La liste des langues
  locales: ['fr', 'en', 'de'],
 
  // 2. La langue par défaut (Allemand)
  defaultLocale: 'de',

  // 3. IMPORTANT : On désactive la détection automatique du navigateur
  // Cela force le site à utiliser 'defaultLocale' (donc l'Allemand) 
  // si l'utilisateur n'a pas encore de cookie de préférence.
  localeDetection: false
});
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};