"use client";

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // Fonction pour changer la langue dans l'URL
  const switchLanguage = (newLocale: string) => {
    if (locale === newLocale) return;
    
    const segments = pathname.split('/');
    // On remplace le segment de la langue actuelle par la nouvelle
    segments[1] = newLocale;
    const newPath = segments.join('/') || '/';
    
    router.push(newPath);
  };

  return (
    // Fond gris très clair avec une bordure subtile
    <div className="flex items-center gap-1 p-1 bg-viconol-bg-alt border border-viconol-border-light rounded-full shadow-sm">
      
      {/* Bouton FR */}
      <button 
        onClick={() => switchLanguage('fr')}
        aria-label="Passer en Français"
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 ${
          locale === 'fr' 
            ? 'bg-viconol-primary text-white shadow-md' // Actif : Doré avec texte blanc
            : 'text-viconol-text-muted hover:text-viconol-text-dark hover:bg-white' // Inactif : Gris avec survol foncé
        }`}
      >
        FR
      </button>

      {/* Bouton DE */}
      <button 
        onClick={() => switchLanguage('de')}
        aria-label="Auf Deutsch wechseln"
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 ${
          locale === 'de' 
            ? 'bg-viconol-primary text-white shadow-md' // Actif : Doré avec texte blanc
            : 'text-viconol-text-muted hover:text-viconol-text-dark hover:bg-white' // Inactif : Gris avec survol foncé
        }`}
      >
        DE
      </button>

    </div>
  );
}