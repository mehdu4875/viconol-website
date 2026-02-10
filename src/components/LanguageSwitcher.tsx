"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  // Fonction pour changer la langue
  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;

    // On remplace le préfixe de la langue dans l'URL (ex: /fr/products -> /de/products)
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="relative group">
      {/* Bouton Principal */}
      <button className="flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-viconol-primary text-white hover:text-viconol-primary rounded-sm transition-all duration-300">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-bold uppercase tracking-wider">{locale}</span>
        <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
      </button>

      {/* Menu Déroulant */}
      <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
        <div className="bg-[#121212] border border-viconol-primary/20 rounded-sm shadow-[0_5px_20px_-5px_rgba(212,175,55,0.2)] overflow-hidden min-w-[120px]">
          
          {/* Option Français */}
          <button 
            onClick={() => switchLanguage('fr')}
            className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${locale === 'fr' ? 'text-viconol-primary font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            <span>Français</span>
            {locale === 'fr' && <span className="w-1.5 h-1.5 rounded-full bg-viconol-primary"></span>}
          </button>

          <div className="h-px bg-white/5 mx-2"></div>

          {/* Option Allemand */}
          <button 
            onClick={() => switchLanguage('de')} // Assure-toi que 'de' est configuré dans ton i18n
            className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${locale === 'de' ? 'text-viconol-primary font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            <span>Deutsch</span>
            {locale === 'de' && <span className="w-1.5 h-1.5 rounded-full bg-viconol-primary"></span>}
          </button>

        </div>
      </div>
    </div>
  );
}