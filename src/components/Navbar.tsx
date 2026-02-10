import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { ChevronDown, Menu } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import SearchModal from './SearchModal';
import LanguageSwitcher from './LanguageSwitcher';

export default async function Navbar({ locale }: { locale: string }) {
  const categories = await prisma.category.findMany({
    orderBy: { slug: 'asc' }
  });

  // 1. On charge TOUS les namespaces nécessaires (Navbar ET Search)
  const t = await getTranslations({locale, namespace: 'Navbar'});
  const tSearch = await getTranslations({locale, namespace: 'Search'});

  // 2. On prépare l'objet de traduction pour le SearchModal
  const searchTranslations = {
    placeholder: tSearch('placeholder'),
    examples: tSearch('examples'),
    enter: tSearch('enter'),
    validate: tSearch('validate'),
    esc: tSearch('esc')
  };

  const getCatName = (jsonName: any) => {
    if (!jsonName) return "";
    if (typeof jsonName === 'string') return jsonName;
    return jsonName[locale] || jsonName['en'] || jsonName['fr'] || "";
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-28 flex items-center justify-between"> 
        
        <Link href={`/${locale}`} className="relative h-24 w-64 flex items-center">
          <Image src="/images/logo.png" alt="VICONÖL Logo" fill className="object-contain object-left" priority />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}`} className="text-sm font-medium text-viconol-metal hover:text-viconol-primary transition-colors uppercase tracking-widest">
            {t('home')}
          </Link>

          <div className="group relative h-28 flex items-center">
            <button className="flex items-center gap-1 text-sm font-bold text-white group-hover:text-viconol-primary transition-colors uppercase tracking-widest">
              {t('products')} <ChevronDown className="w-4 h-4 text-viconol-primary" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="bg-[#121212] border border-viconol-primary/20 rounded-sm shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] overflow-hidden p-2 flex flex-col">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/${locale}/products?cat=${cat.id}`} className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 hover:border-l-2 hover:border-viconol-primary transition-all">
                    {getCatName(cat.name)}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-2 mx-4"></div>
                <Link href={`/${locale}/products`} className="block px-4 py-3 text-sm font-bold text-viconol-primary hover:text-white hover:bg-viconol-primary transition-colors text-center uppercase tracking-wider">
                  {t('all_catalogue')}
                </Link>
              </div>
            </div>
          </div>

          <Link href={`/${locale}#society`} className="text-sm font-medium text-viconol-metal hover:text-viconol-primary transition-colors uppercase tracking-widest scroll-smooth">
            {t('society')}
          </Link>
          <Link href={`/${locale}#contact`} className="text-sm font-medium text-viconol-metal hover:text-viconol-primary transition-colors uppercase tracking-widest scroll-smooth">
            {t('contact')}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* 3. On passe l'objet de traductions au composant */}
          <SearchModal locale={locale} translations={searchTranslations} />
          <LanguageSwitcher locale={locale} />
          <button className="md:hidden p-2 text-white"><Menu className="w-6 h-6" /></button>
        </div>

      </div>
    </nav>
  );
}