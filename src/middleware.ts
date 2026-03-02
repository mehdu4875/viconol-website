import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Une liste de toutes les langues supportées
  locales: ['fr', 'de'],
  
  // Si l'utilisateur arrive sur la racine (/) sans langue, il est redirigé vers /fr
  defaultLocale: 'fr',
  
  // On ne met pas le préfixe pour la langue par défaut (Optionnel, mais plus propre)
  // localePrefix: 'as-needed' 
});

export const config = {
  // Le "matcher" définit quelles routes doivent passer par ce middleware
  matcher: [
    // 1. Accepter la racine
    '/',
    // 2. Accepter toutes les routes avec /fr ou /de
    '/(fr|de)/:path*',
    // 3. IMPORTANT : Ignorer expressément tout ce qui est système, api, images, etc.
    // Cela évite l'erreur "middleware didn't run" sur Vercel !
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};