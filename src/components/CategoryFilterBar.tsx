"use client";

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';

interface CategoryFilterBarProps {
  categories: any[];
  currentCatId?: string;
  locale: string;
}

export default function CategoryFilterBar({ categories, currentCatId, locale }: CategoryFilterBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // États pour les flèches et le menu
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fonction pour traduire le nom
  const getCatName = (jsonName: any) => {
    if (!jsonName) return "";
    if (typeof jsonName === 'string') return jsonName;
    return jsonName[locale] || jsonName['fr'] || "";
  };

  // Trouver le nom de la catégorie actuellement sélectionnée
  const activeCat = categories.find(c => c.id === currentCatId);
  const activeCatName = activeCat ? getCatName(activeCat.name) : (locale === 'de' ? 'Alle' : 'Tout');

  // Met à jour la visibilité des flèches en fonction du scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5);
  };

  // Recalculer les flèches quand on ouvre le menu ou redimensionne
  useEffect(() => {
    if (isDropdownOpen) {
      setTimeout(handleScroll, 100); // Petit délai pour laisser le menu s'ouvrir
    }
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [categories, isDropdownOpen]);

  // Fonction pour défiler au clic sur une flèche
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-20 md:top-28 z-40 bg-[#0a0a0a] pt-4 pb-4 -mx-4 px-4 md:-mx-6 md:px-6 mb-8 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] border-b border-white/5">
      
      {/* 1. EN-TÊTE : Catégorie active et Bouton Menu */}
      <div className="flex items-center justify-between px-1">
         <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
           <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">
             {locale === 'de' ? 'Kategorien' : 'Catégories'}
           </span>
           <span className="text-white text-sm md:text-base font-bold">
             <span className="hidden md:inline text-gray-600 mr-2">•</span>
             {activeCatName}
           </span>
         </div>
         
         <button 
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
           className="flex items-center gap-2 text-viconol-primary text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white transition-colors bg-viconol-primary/10 px-4 py-2 rounded-full border border-viconol-primary/20 whitespace-nowrap"
         >
           {isDropdownOpen ? (
             <><X size={16} /> {locale === 'de' ? 'Schließen' : 'Fermer'}</>
           ) : (
             <><ChevronDown size={16} /> {locale === 'de' ? 'Alle anzeigen' : 'Tout voir'}</>
           )}
         </button>
      </div>

      {/* 2. LE MENU HORIZONTAL DÉFILANT (Caché par défaut) */}
      <div 
        className={`transition-all duration-300 overflow-hidden ${
          isDropdownOpen ? 'max-h-[120px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="relative flex items-center group py-2">
          
          {/* Flèche Gauche */}
          <div className={`absolute left-0 z-10 transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button 
              onClick={() => scroll('left')}
              className="flex items-center justify-center -ml-2 drop-shadow-2xl bg-[#1a1a1a] text-viconol-primary hover:bg-viconol-primary hover:text-black transition-colors p-2 rounded-full border border-viconol-primary/30 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          {/* Conteneur Défilable */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-center gap-3 overflow-x-auto py-2 scroll-smooth no-scrollbar px-4 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>

            <Link 
              href={`/${locale}/products`}
              onClick={() => setIsDropdownOpen(false)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${!currentCatId ? 'bg-viconol-primary text-black border-viconol-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white hover:text-white'}`}
            >
              {locale === 'de' ? 'Alle' : 'Tout'}
            </Link>

            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/${locale}/products?cat=${cat.id}`}
                onClick={() => setIsDropdownOpen(false)}
                className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${currentCatId === cat.id ? 'bg-viconol-primary text-black border-viconol-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white hover:text-white'}`}
              >
                {getCatName(cat.name)}
              </Link>
            ))}
          </div>

          {/* Flèche Droite */}
          <div className={`absolute right-0 z-10 transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button 
              onClick={() => scroll('right')}
              className="flex items-center justify-center -mr-2 drop-shadow-2xl bg-[#1a1a1a] text-viconol-primary hover:bg-viconol-primary hover:text-black transition-colors p-2 rounded-full border border-viconol-primary/30 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}