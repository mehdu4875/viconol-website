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
  
  // SÉCURITÉ : Si le slug est vide dans la base de données, on utilise l'ID du produit.
  const productUrl = product.slug ? product.slug : product.id;

  return (
    <Link 
      href={`/${locale}/products/${productUrl}`}
      className="group flex flex-col bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden hover:border-viconol-primary/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300"
    >
      {/* FOND 100% BLANC POUR LA PHOTO DU PRODUIT */}
      <div className="relative aspect-square w-full bg-white p-6 flex items-center justify-center overflow-hidden">
        <Image 
          src={product.imageUrl || '/images/products/neutre.png'} 
          alt={product.name} 
          fill 
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow border-t border-white/5">
        <div className="mb-4 flex-grow">
          <h3 className="text-lg font-black text-white mb-2 uppercase line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-gray-400 line-clamp-2">
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