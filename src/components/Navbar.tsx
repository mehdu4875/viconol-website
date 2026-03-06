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
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
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

  const closeMenu = () => {
    setIsOpen(false);
    setIsMobileProductsOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const getCatName = (jsonName: any) => {
    if (!jsonName) return "";
    if (typeof jsonName === 'string') return jsonName;
    return jsonName[locale] || jsonName['fr'] || jsonName['de'] || "";
  };

  return (
    <>
      {/* MISE À JOUR DU DESIGN :
        - bg-[#050505] -> bg-viconol-bg-light
        - border-white/10 -> border-viconol-border-light
      */}
      <nav className="fixed top-0 w-full z-[100] border-b border-viconol-border-light bg-viconol-bg-light h-20 md:h-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between"> 
          
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="relative h-14 w-40 sm:h-16 sm:w-48 md:h-24 md:w-64 flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="VICONÖL Logo" 
                fill 
                className="object-contain object-left" 
                priority 
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {/* Lien : text-viconol-metal -> text-viconol-text-dark */}
            <Link href={`/${locale}`} className="text-xs font-bold text-viconol-text-dark hover:text-viconol-primary transition-colors uppercase tracking-widest">
              {t('home')}
            </Link>

            <div className="group relative h-28 flex items-center">
              {/* text-white -> text-viconol-text-dark */}
              <Link href={`/${locale}/products`} className="flex items-center gap-1 text-xs font-bold text-viconol-text-dark group-hover:text-viconol-primary transition-colors uppercase tracking-widest">
                {t('products')} <ChevronDown className="w-4 h-4 text-viconol-primary" />
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                {/* Carte : bg-[#0a0a0a] -> bg-white, border-viconol-primary/20 -> border-viconol-border-light */}
                <div className="bg-white border border-viconol-border-light rounded-xl p-2 flex flex-col shadow-2xl">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={`/${locale}/products?cat=${cat.id}`} 
                      // text-gray-400 -> text-viconol-text-muted, hover:bg-white/5 -> hover:bg-viconol-bg-alt
                      className="block px-4 py-3 text-[10px] text-viconol-text-muted hover:text-viconol-primary hover:bg-viconol-bg-alt rounded-lg transition-all uppercase tracking-widest"
                    >
                      {getCatName(cat.name)}
                    </Link>
                  ))}
                  <div className="h-px bg-viconol-border-light my-2 mx-4"></div>
                  <Link href={`/${locale}/products`} className="block px-4 py-3 text-[10px] font-black text-viconol-primary hover:text-white hover:bg-viconol-primary rounded-lg transition-colors text-center uppercase tracking-widest">
                    {t('all_catalogue')}
                  </Link>
                </div>
              </div>
            </div>

            <Link href={`/${locale}#society`} className="text-xs font-bold text-viconol-text-dark hover:text-viconol-primary transition-colors uppercase tracking-widest">{t('society')}</Link>
            <Link href={`/${locale}#contact`} className="text-xs font-bold text-viconol-text-dark hover:text-viconol-primary transition-colors uppercase tracking-widest">{t('contact')}</Link>
          </div>

          <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
            {/* Bordure : md:border-white/10 -> md:border-viconol-border-light */}
            <div className="flex items-center gap-2 md:gap-4 md:border-l md:border-viconol-border-light md:pl-6 z-[120]">
               <SearchModal locale={locale} translations={searchTranslations} />
               <LanguageSwitcher locale={locale} />
            </div>
            
            <button 
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-viconol-primary cursor-pointer active:scale-90 transition-transform z-[120]"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MENU MOBILE : BLANC --- */}
      {/* bg-[#050505] -> bg-viconol-bg-light */}
      <div className={`fixed inset-0 z-[110] bg-viconol-bg-light transition-transform duration-500 ease-in-out md:hidden flex flex-col h-[100dvh] w-full ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header : border-white/5 -> border-viconol-border-light, bg-black -> bg-viconol-bg-light */}
        <div className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-viconol-border-light bg-viconol-bg-light">
          <div className="relative h-10 w-32">
            <Image src="/images/logo.png" alt="VICONÖL" fill className="object-contain object-left" />
          </div>
          <div className="w-10"></div> 
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-4 pb-32">
          
          {/* text-white -> text-viconol-text-dark, border-white/5 -> border-viconol-border-light, bg-white/[0.02] -> bg-viconol-bg-alt */}
          <Link href={`/${locale}`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-viconol-text-dark p-5 rounded-xl border border-viconol-border-light bg-viconol-bg-alt active:bg-viconol-primary/10 transition-colors">
            <Home className="w-6 h-6 text-viconol-primary" /> {t('home')}
          </Link>
          
          {/* Carte : border-white/5 -> border-viconol-border-light, bg-white/[0.02] -> bg-viconol-bg-alt */}
          <div className="flex flex-col rounded-xl border border-viconol-border-light bg-viconol-bg-alt overflow-hidden flex-shrink-0 transition-colors">
            <div className="flex items-center justify-between p-5 active:bg-viconol-primary/10 transition-colors">
              {/* text-white -> text-viconol-text-dark */}
              <Link href={`/${locale}/products`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-viconol-text-dark flex-grow">
                <Package className="w-6 h-6 text-viconol-primary" /> {t('products')}
              </Link>
              <button 
                onClick={(e) => { e.preventDefault(); setIsMobileProductsOpen(!isMobileProductsOpen); }}
                // text-gray-400 -> text-viconol-text-muted, hover:text-white -> hover:text-viconol-text-dark
                className="p-4 -m-4 text-viconol-text-muted hover:text-viconol-text-dark"
                aria-label={isMobileProductsOpen ? "Fermer les catégories" : "Ouvrir les catégories"}
                aria-expanded={isMobileProductsOpen}
              >
                <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180 text-viconol-primary' : ''}`} />
              </button>
            </div>

            {/* bg-[#080808] -> bg-viconol-bg-alt, border-white/5 -> border-viconol-border-light */}
            <div className={`flex flex-col bg-viconol-bg-alt transition-all duration-500 ease-in-out ${isMobileProductsOpen ? 'max-h-[2000px] opacity-100 border-t border-viconol-border-light' : 'max-h-0 opacity-0'}`}>
              <div className="py-2 pl-16 pr-4 flex flex-col gap-1">
                {categories.map((cat) => (
                  <Link 
                    key={cat.id} 
                    href={`/${locale}/products?cat=${cat.id}`} 
                    onClick={closeMenu}
                    // text-gray-400 -> text-viconol-text-muted, hover:text-white -> hover:text-viconol-text-dark
                    className="block py-3 text-sm text-viconol-text-muted hover:text-viconol-text-dark hover:pl-2 transition-all border-l-2 border-transparent hover:border-viconol-primary uppercase tracking-widest"
                  >
                    {getCatName(cat.name)}
                  </Link>
                ))}
                <Link 
                  href={`/${locale}/products`} 
                  onClick={closeMenu}
                  className="block py-3 text-sm font-bold text-viconol-primary hover:text-viconol-text-dark hover:pl-2 transition-all mt-2 uppercase tracking-widest"
                >
                  {t('all_catalogue')} →
                </Link>
              </div>
            </div>
          </div>

          <Link href={`/${locale}#society`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-viconol-text-dark p-5 rounded-xl border border-viconol-border-light bg-viconol-bg-alt active:bg-viconol-primary/10 transition-colors">
            <Info className="w-6 h-6 text-viconol-primary" /> {t('society')}
          </Link>

          <Link href={`/${locale}#contact`} onClick={closeMenu} className="flex items-center gap-5 text-xl font-bold text-viconol-text-dark p-5 rounded-xl border border-viconol-border-light bg-viconol-bg-alt active:bg-viconol-primary/10 transition-colors">
            <Phone className="w-6 h-6 text-viconol-primary" /> {t('contact')}
          </Link>
        </div>

        {/* bg-black -> bg-viconol-bg-light, border-white/10 -> border-viconol-border-light */}
        <div className="mt-auto p-8 bg-viconol-bg-light flex flex-col gap-6 items-center border-t border-viconol-border-light shrink-0 safe-area-bottom">
          {/* text-viconol-metal -> text-viconol-text-muted */}
          <p className="text-[10px] text-viconol-text-muted tracking-[0.5em] uppercase opacity-60">VICONÖL</p>
        </div>
      </div>
    </>
  );
}