import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { getTranslations } from 'next-intl/server';

interface ProductProps {
  product: any;
  locale: string;
}

export default async function ProductCard({ product, locale }: ProductProps) {
  const t = await getTranslations({locale, namespace: 'Products'});

  const getDbVal = (field: any) => {
    if (!field) return "";
    if (typeof field === 'string') return field;
    return field[locale] || field['fr'] || field['en'] || "";
  };

  return (
    <div className="group bg-viconol-panel border border-white/5 hover:border-viconol-primary/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] overflow-hidden rounded-sm flex flex-col h-full relative">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-viconol-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative h-64 w-full bg-gradient-to-b from-white/5 to-transparent p-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-viconol-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          width={220} 
          height={220}
          className="object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
        />

        {product.range && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 border border-viconol-primary/30 text-viconol-primary uppercase tracking-widest bg-black/50 backdrop-blur-sm">
            {getDbVal(product.range.name)}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-viconol-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow font-light">
          {getDbVal(product.shortDesc)}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <Link 
            href={`/${locale}/products/${product.slug}`}
            className="flex items-center text-white font-medium text-sm hover:text-viconol-primary transition-colors group/link"
          >
            {t('view_product')} <ArrowRight className="w-4 h-4 ml-2 text-viconol-primary transition-transform group-hover/link:translate-x-1" />
          </Link>
          
          {product.pdfUrl && (
            <a href={product.pdfUrl} target="_blank" className="text-gray-500 hover:text-viconol-primary transition-colors" title={t('view_product')}>
              <FileText className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}