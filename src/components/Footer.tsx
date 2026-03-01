"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, Mail, MapPin, Globe, ShieldCheck } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* 1. LOGO & DESC */}
          <div className="col-span-1 md:col-span-1">
            <div className="relative h-12 w-40 mb-6">
              <Image src="/images/logo.png" alt="VICONÖL" fill className="object-contain object-left" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
              {t('description')}
            </p>
            <div className="flex items-center gap-3">
               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-viconol-primary/10 border border-viconol-primary/20">
                  <ShieldCheck className="w-5 h-5 text-viconol-primary" />
               </div>
               <span className="text-[10px] font-black tracking-widest uppercase text-viconol-primary">
                 Made in Germany
               </span>
            </div>
          </div>

          {/* 2. LIENS RAPIDES */}
          <div>
            <button 
              onClick={() => toggle('links')}
              className="w-full md:cursor-default flex items-center justify-between py-4 md:py-0 mb-0 md:mb-6 border-b border-white/5 md:border-none"
            >
              <span className="text-xs font-black tracking-[0.2em] uppercase">{t('quick_links')}</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${openSection === 'links' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-4 pt-4 md:pt-0 overflow-hidden transition-all duration-300 ${openSection === 'links' ? 'max-h-40' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100'}`}>
              <li><Link href={`/${locale}`} className="text-gray-500 hover:text-viconol-primary text-sm transition-colors">{tNav('home')}</Link></li>
              <li><Link href={`/${locale}/products`} className="text-gray-500 hover:text-viconol-primary text-sm transition-colors">{tNav('products')}</Link></li>
              <li><Link href={`/${locale}#society`} className="text-gray-500 hover:text-viconol-primary text-sm transition-colors">{tNav('society')}</Link></li>
              <li><Link href={`/${locale}#contact`} className="text-gray-500 hover:text-viconol-primary text-sm transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* 3. LÉGAL */}
          <div className="hidden">
            <button 
              onClick={() => toggle('legal')}
              className="w-full md:cursor-default flex items-center justify-between py-4 md:py-0 mb-0 md:mb-6 border-b border-white/5 md:border-none"
            >
              <span className="text-xs font-black tracking-[0.2em] uppercase">{t('legal')}</span>
              <ChevronDown className={`w-4 h-4 md:hidden transition-transform ${openSection === 'legal' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-4 pt-4 md:pt-0 overflow-hidden transition-all duration-300 ${openSection === 'legal' ? 'max-h-40' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100'}`}>
              <li><Link href={`/${locale}/impressum`} className="text-gray-500 hover:text-viconol-primary text-sm transition-colors">{t('impressum')}</Link></li>
              <li><Link href={`/${locale}/privacy`} className="text-gray-500 hover:text-viconol-primary text-sm transition-colors">{t('privacy')}</Link></li>
            </ul>
          </div>

          {/* 4. NEWSLETTER / CONTACT RAPIDE */}
          <div className="bg-white/[0.03] border border-white/5 p-6 rounded-2xl">
             <span className="text-[10px] font-black tracking-[0.2em] uppercase text-viconol-primary block mb-4">Export Global</span>
             <div className="flex items-center gap-3 text-gray-400 mb-4">
                <Mail className="w-4 h-4 text-viconol-primary" />
                <span className="text-sm">info@viconol.com</span>
             </div>
             <div className="flex items-center gap-3 text-gray-400">
                <Globe className="w-4 h-4 text-viconol-primary" />
                <span className="text-sm">www.viconol.com</span>
             </div>
          </div>

        </div>

        {/* BAS DU FOOTER */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-[10px] tracking-widest uppercase">
            © 2026 VICONÖL LUBRICANTS. {t('rights')}
          </p>
          <div className="flex items-center gap-6 opacity-30 grayscale contrast-125">
             <span className="text-[8px] font-bold border border-white px-2 py-1">ISO 9001</span>
             <span className="text-[8px] font-bold border border-white px-2 py-1">ISO 14001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}