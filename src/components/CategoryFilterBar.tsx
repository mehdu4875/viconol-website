"use client";

import Link from 'next/link';
import { useRef, useEffect } from 'react';

interface CategoryFilterBarProps {
  categories: any[];
  currentCatId?: string;
  locale: string;
}

export default function CategoryFilterBar({ categories, currentCatId, locale }: CategoryFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper pour traduire le nom
  const getCatName = (jsonName: any) => {
    if (!jsonName) return "";
    if (typeof jsonName === 'string') return jsonName;
    return jsonName[locale] || jsonName['fr'] || "";
  };

  // Optionnel : Scroll automatique vers le bouton actif pour qu'il soit toujours visible
  useEffect(() => {
    if (scrollRef.current) {
      // Logique simple : si on voulait centrer l'élément actif.
      // Pour l'instant on laisse le comportement natif.
    }
  }, [currentCatId]);

  return (
    <div className="w-full mb-8 overflow-hidden">
      {/* overflow-x-auto : Permet le scroll horizontal
         no-scrollbar : On cachera la barre de scroll moche via CSS ou Tailwind
         mask-image : Crée un fondu sur les côtés pour montrer qu'il y a plus de contenu
      */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto pb-4 scroll-smooth no-scrollbar px-1"
        style={{ 
          scrollbarWidth: 'none',  /* Firefox */
          msOverflowStyle: 'none'  /* IE/Edge */
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Webkit */
          }
        `}</style>

        {/* BOUTON "TOUT" (Reset) */}
        <Link 
          href={`/${locale}/products`}
          className={`
            flex-shrink-0 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest border transition-all duration-300
            ${!currentCatId 
              ? 'bg-viconol-primary text-black border-viconol-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
              : 'bg-white/5 text-gray-400 border-white/10 hover:border-white hover:text-white'
            }
          `}
        >
          Tout
        </Link>

        {/* LISTE DES CATÉGORIES */}
        {categories.map((cat) => {
          const isActive = currentCatId === cat.id;
          return (
            <Link 
              key={cat.id} 
              href={`/${locale}/products?cat=${cat.id}`}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest border transition-all duration-300
                ${isActive 
                  ? 'bg-viconol-primary text-black border-viconol-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-white hover:text-white'
                }
              `}
            >
              {getCatName(cat.name)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}