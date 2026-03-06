"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function StickyProductBar({ product, locale }: { product: any, locale: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('ProductDetail');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // bg-[#050505]/95 -> bg-white/95, border-white/10 -> border-viconol-border-light
    <div className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-viconol-border-light z-50 transform transition-transform duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="container mx-auto px-6 h-20 md:h-24 flex items-center justify-between gap-4">
        <div className="hidden md:block flex-shrink-0">
          {/* text-white -> text-viconol-text-dark */}
          <div className="text-sm font-black text-viconol-text-dark uppercase tracking-wider truncate max-w-md">{product.name}</div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <Link 
            href={`/${locale}#contact`} 
            className="flex-1 md:flex-none text-center bg-viconol-primary text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-black uppercase tracking-widest hover:bg-viconol-text-dark transition-colors shadow-lg text-xs md:text-sm whitespace-nowrap"
          >
            {t('contactSales')}
          </Link>
        </div>
      </div>
    </div>
  );
}