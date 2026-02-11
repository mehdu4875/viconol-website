"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Home, Package, Info, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SearchModal from './SearchModal';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ locale, categories = [] }: { locale: string, categories?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const t = useTranslations('Navbar');
  const tSearch = useTranslations('Search');

  const searchTranslations = {
    placeholder: tSearch('placeholder'),
    examples: tSearch('examples'),
    enter: tSearch('enter'),
    validate: tSearch('validate'),
    esc: tSearch('esc')
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Fonction pour récupérer le nom de la catégorie selon la langue
  const getCatName = (jsonName: any) => {
    if (!jsonName) return "";
    if (typeof jsonName === 'string') return jsonName;
    return jsonName[locale] || jsonName['fr'] || jsonName['de'] || "";
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#050505] h-20 md:h-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between"> 
          
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="relative h-10 w-28 md:h-24 md:w-64 flex items-center">
              <Image src="/images/logo.png" alt="VICONÖL Logo" fill className="object-contain object-left" priority />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            <Link href={`/${locale}`} className="text-xs font-bold text-viconol-metal hover:text-viconol-primary transition-colors uppercase tracking-widest">
              {t('home')}
            </Link>

            <div className="group relative h-28 flex items-center">
              <button className="flex items-center gap-1 text-xs font-bold text-white group-hover:text-viconol-primary transition-colors uppercase tracking-widest">
                {t('products')} <ChevronDown className="w-4 h-4 text-viconol-primary" />
              </button>
              
              {/* MENU DÉROULANT PC AVEC TES CATÉGORIES */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-[#0a0a0a] border border-viconol-primary/20 p-2 flex flex-col shadow-2xl">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={`/${locale}/products?cat=${cat.id}`} 
                      className="block px-4 py-3 text-[10px] text-gray-400 hover:text-viconol-primary hover:bg-white/5 transition-all uppercase tracking-widest"
                    >
                      {getCatName(cat.name)}
                    </Link>
                  ))}
                  <div className="h-px bg-white/10 my-2 mx-4"></div>
                  <Link href={`/${locale}/products`} className="block px-4 py-3 text-[10px] font-black text-viconol-primary hover:text-white transition-colors text-center uppercase tracking-widest">
                    {t('all_catalogue')}
                  </Link>
                </div>
              </div>
            </div>

            <Link href={`/${locale}#society`} className="text-xs font-bold text-viconol-metal hover:text-viconol-primary transition-colors uppercase tracking-widest">{t('society')}</Link>
            <Link href={`/${locale}#contact`} className="text-xs font-bold text-viconol-metal hover:text-viconol-primary transition-colors uppercase tracking-widest">{t('contact')}</Link>
          </div>

          <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
            <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
               <SearchModal locale={locale} translations={searchTranslations} />
               <LanguageSwitcher locale={locale} />
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-viconol-primary cursor-pointer active:scale-90 transition-transform"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MENU MOBILE --- */}
      <div className={`fixed inset-0 bg-[#050505] z-[110] transition-transform duration-500 ease-in-out md:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-white/5 bg-black">
          <div className="relative h-8 w-24 opacity-50">
            <Image src="/images/logo.png" alt="VICONÖL" fill className="object-contain object-left" />
          </div>
          <button onClick={closeMenu} className="p-2 text-viconol-primary">
            <X className="w-10 h-10" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-4 overflow-y-auto">
          <Link href={`/${locale}`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-white p-5 rounded-xl border border-white/5 bg-white/[0.02] active:bg-viconol-primary/10">
            <Home className="w-6 h-6 text-viconol-primary" /> {t('home')}
          </Link>
          
          {/* Pour le mobile, on peut aussi lister les catégories si tu veux, 
              mais par simplicité on laisse le lien direct vers tous les produits */}
          <Link href={`/${locale}/products`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-white p-5 rounded-xl border border-white/5 bg-white/[0.02] active:bg-viconol-primary/10">
            <Package className="w-6 h-6 text-viconol-primary" /> {t('products')}
          </Link>

          <Link href={`/${locale}#society`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-white p-5 rounded-xl border border-white/5 bg-white/[0.02] active:bg-viconol-primary/10">
            <Info className="w-6 h-6 text-viconol-primary" /> {t('society')}
          </Link>
          <Link href={`/${locale}#contact`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-white p-5 rounded-xl border border-white/5 bg-white/[0.02] active:bg-viconol-primary/10">
            <Phone className="w-6 h-6 text-viconol-primary" /> {t('contact')}
          </Link>
        </div>

        <div className="mt-auto p-10 bg-black flex flex-col gap-8 items-center border-t border-white/10">
          <div className="flex items-center justify-center gap-12 w-full">
            <SearchModal locale={locale} translations={searchTranslations} />
            <div className="w-px h-8 bg-white/10"></div>
            <LanguageSwitcher locale={locale} />
          </div>
          <p className="text-[10px] text-viconol-metal tracking-[0.5em] uppercase opacity-30">VICONÖL</p>
        </div>
      </div>
    </>
  );
}