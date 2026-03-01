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

  // Met à jour la visibilité des flèches en fonction du scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // S'il y a du scroll vers la gauche
    setShowLeftArrow(scrollLeft > 0);
    // S'il reste du contenu vers la droite (avec 5px de tolérance)
    setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    handleScroll(); // Vérifie au chargement
    window.addEventListener('resize', handleScroll); // Vérifie si on redimensionne l'écran
    return () => window.removeEventListener('resize', handleScroll);
  }, [categories]);

  // Fonction pour défiler au clic sur une flèche
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full mb-8">
      
      {/* 1. EN-TÊTE : Titre et Bouton Menu Déroulant */}
      <div className="flex items-center justify-between mb-4 px-1">
         <span className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-bold">
           {locale === 'de' ? 'Kategorien' : 'Catégories'}
         </span>
         
         <button 
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
           className="flex items-center gap-2 text-viconol-primary text-xs md:text-sm font-bold uppercase tracking-widest hover:text-white transition-colors bg-viconol-primary/10 px-4 py-2 rounded-full border border-viconol-primary/20"
         >
           {isDropdownOpen ? (
             <><X size={16} /> {locale === 'de' ? 'Schließen' : 'Fermer'}</>
           ) : (
             <><ChevronDown size={16} /> {locale === 'de' ? 'Alle anzeigen' : 'Tout voir'}</>
           )}
         </button>
      </div>

      {/* 2. LE MENU DÉROULANT (Toutes les options) */}
      <div 
        className={`transition-all duration-300 overflow-hidden ${
          isDropdownOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-4 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link 
              href={`/${locale}/products`}
              onClick={() => setIsDropdownOpen(false)}
              className={`px-4 py-3 rounded-xl text-xs md:text-sm font-bold text-center transition-colors ${!currentCatId ? 'bg-viconol-primary text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
              {locale === 'de' ? 'Alle' : 'Tout'}
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/${locale}/products?cat=${cat.id}`}
                onClick={() => setIsDropdownOpen(false)}
                className={`px-4 py-3 rounded-xl text-xs md:text-sm font-bold text-center transition-colors ${currentCatId === cat.id ? 'bg-viconol-primary text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
              >
                {getCatName(cat.name)}
              </Link>
            ))}
        </div>
      </div>

      {/* 3. BARRE DE DÉFILEMENT HORIZONTALE AVEC FLÈCHES */}
      <div className="relative flex items-center group">
        
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

          {/* Bouton Reset */}
          <Link 
            href={`/${locale}/products`}
            className={`flex-shrink-0 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest border transition-all duration-300 ${!currentCatId ? 'bg-viconol-primary text-black border-viconol-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white hover:text-white'}`}
          >
            {locale === 'de' ? 'Alle' : 'Tout'}
          </Link>

          {/* Boutons Catégories */}
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/${locale}/products?cat=${cat.id}`}
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
  );
}