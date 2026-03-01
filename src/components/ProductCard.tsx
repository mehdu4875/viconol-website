import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Import pour les traductions

interface ProductCardProps {
  product: any;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations('Products'); // Utilisation du hook de traduction
  
  const getDbVal = (field: any) => {
    if (!field) return "";
    if (typeof field === 'string') return field;
    return field[locale] || field['fr'] || field['en'] || "";
  };

  const categoryName = getDbVal(product.category?.name);
  const productName = getDbVal(product.name);
  const rangeName = getDbVal(product.range?.name);
  const shortDesc = getDbVal(product.shortDesc);

  return (
    <Link 
      href={`/${locale}/products/${product.slug}`}
      className="group relative flex flex-col bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-viconol-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)] hover:-translate-y-1"
    >
      <div className="relative aspect-square w-full bg-white/5 overflow-hidden p-6 md:p-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-viconol-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Image 
          src={product.imageUrl || "/images/placeholder.jpg"} 
          alt={productName} 
          fill 
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col flex-grow p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3 h-3 text-viconol-primary" />
          <span className="text-xs font-bold text-viconol-primary uppercase tracking-widest">
            {categoryName || t('default_category')}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-viconol-primary transition-colors">
          {productName}
        </h3>

        {rangeName && (
          <p className="text-sm text-gray-500 mb-2 font-medium">
            {t('range_label')}: {rangeName}
          </p>
        )}
        
        {shortDesc && (
            <p className="text-xs text-gray-600 mb-4 line-clamp-2 font-light">
                {shortDesc}
            </p>
        )}

        <div className="mt-auto pt-2 flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
          <span className="border-b border-viconol-primary/0 group-hover:border-viconol-primary transition-all pb-0.5">
            {t('view_details')}
          </span>
          <ArrowRight className="w-4 h-4 ml-2 text-viconol-primary" />
        </div>
      </div>
    </Link>
  );
}