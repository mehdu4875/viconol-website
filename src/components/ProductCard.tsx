"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product, locale }: { product: any, locale: string }) {
  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === 'string') return field;
    return field[locale] || field['fr'] || field['de'] || "";
  };

  const shortDesc = getTranslatedText(product.shortDesc);

  return (
    // bg-[#0a0a0a] -> bg-white, border-white/5 -> border-viconol-border-light
    <Link 
      href={`/${locale}/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-viconol-border-light overflow-hidden hover:border-viconol-primary/50 hover:shadow-2xl transition-all duration-300"
    >
      {/* FOND DE L'IMAGE 100% BLANC */}
      <div className="relative aspect-square w-full bg-white p-6 flex items-center justify-center overflow-hidden">
        <Image 
          src={product.imageUrl || '/images/products/neutre.png'} 
          alt={product.name} 
          fill 
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow bg-viconol-bg-alt border-t border-viconol-border-light">
        <div className="mb-4 flex-grow">
          {/* text-white -> text-viconol-text-dark */}
          <h3 className="text-lg font-black text-viconol-text-dark mb-2 uppercase line-clamp-2 leading-tight">
            {product.name}
          </h3>
          {/* text-gray-400 -> text-viconol-text-muted */}
          <p className="text-sm font-medium text-viconol-text-muted line-clamp-2">
            {shortDesc}
          </p>
        </div>

        <div className="flex items-center text-viconol-primary text-xs font-bold uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform">
          Voir les détails <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Link>
  );
}