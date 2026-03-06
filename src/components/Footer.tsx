"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Clock, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Footer');
  const tNavbar = useTranslations('Navbar');
  const tContact = useTranslations('Contact');

  const navLinks = [
    { name: tNavbar('home'), href: `/${locale}` },
    { name: tNavbar('products'), href: `/${locale}/products` },
    { name: tNavbar('society'), href: `/${locale}#society` },
    { name: tNavbar('contact'), href: `/${locale}#contact` }
  ];

  return (
    <footer className="bg-viconol-bg-alt text-viconol-text-dark border-t border-viconol-border-light mt-auto">
      <div className="container mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        <div className="space-y-6 flex flex-col items-center md:items-start">
          <Link href={`/${locale}`} className="relative h-16 w-60 block">
            <Image 
              src="/images/logo.png" 
              alt="VICONÖL German Lubricants" 
              fill 
              className="object-contain object-left" 
            />
          </Link>
          <p className="text-sm font-medium text-viconol-text-muted leading-relaxed text-center md:text-left">
            German high-performance lubricants.<br/>Engineering excellence since 1996.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center md:items-start">
          <h4 className="text-sm font-black text-viconol-primary uppercase tracking-[0.2em]">{t('quick_links')}</h4>
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href} className="flex justify-center md:justify-start">
                <Link href={link.href} className="text-sm font-semibold hover:text-viconol-primary transition-colors uppercase tracking-widest flex items-center gap-2">
                   <ArrowRight className="w-3 h-3 text-viconol-primary" /> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 items-center md:items-start md:col-span-2">
          <h4 className="text-sm font-black text-viconol-primary uppercase tracking-[0.2em]">{tContact('title')}</h4>
          <ul className="space-y-6">
            {/* L'adresse a été supprimée d'ici */}
            <li className="flex gap-4 items-center">
              <Mail className="w-5 h-5 text-viconol-primary flex-shrink-0" />
              <div>
                <span className="font-bold text-viconol-text-dark">{tContact('support_title')}</span>
                <p className="text-sm text-viconol-text-muted font-medium">info@viconol.com</p>
              </div>
            </li>
            <li className="flex gap-4 items-center">
              <Clock className="w-5 h-5 text-viconol-primary flex-shrink-0" />
              <div>
                <span className="font-bold text-viconol-text-dark">{tContact('hours_title')}</span>
                <p className="text-sm text-viconol-text-muted font-medium">Mo - Fr: 8:00 - 18:00</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div className="bg-white border-t border-viconol-border-light py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-medium text-viconol-text-muted tracking-wide">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}