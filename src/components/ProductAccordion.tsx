"use client";

import { useState } from 'react';
import { ChevronDown, Download, ShieldCheck, Zap, Mail, FileText, Layers } from 'lucide-react';

interface ProductAccordionProps {
  description: string;
  pdfUrl?: string | null;
  contactUrl: string;
  labels: {
    protection: string;
    performance: string;
    datasheet: string;
    datasheet_unavailable: string;
    contact_us: string;
    description_title: string;
    specs_title: string;
    docs_title: string;
  };
}

export default function ProductAccordion({ description, pdfUrl, contactUrl, labels }: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>('desc');

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const AccordionItem = ({ id, title, icon: Icon, children }: any) => {
    const isOpen = openSection === id;
    
    return (
      <div className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden mb-3">
        {/* BOUTON D'EN-TÊTE */}
        <button 
          onClick={() => toggle(id)}
          className="w-full flex items-center justify-between p-4 text-left group focus:outline-none bg-transparent active:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 transition-colors duration-500 ${isOpen ? 'text-viconol-primary' : 'text-gray-400 group-hover:text-white'}`} />
            <span className={`font-bold uppercase tracking-widest text-sm transition-colors duration-500 ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
              {title}
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'rotate-180 text-viconol-primary' : ''}`} />
        </button>

        {/* --- ANIMATION --- 
            1. Le wrapper externe gère la hauteur (Grid)
            2. duration-700 pour que ce soit lent et fluide
            3. cubic-bezier pour un effet naturel
        */}
        <div 
          className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          {/* --- WRAPPER INTERNE --- 
              IMPÉRATIF : overflow-hidden ici pour cacher le contenu quand la grille se ferme
          */}
          <div className="overflow-hidden">
            
            {/* --- CONTENU RÉEL --- 
                Le padding et la bordure sont ICI, pas sur les wrappers parents.
                J'ai aussi ajouté une transition d'opacité pour que le texte apparaisse doucement.
            */}
            <div className={`
              p-5 border-t border-white/5 bg-black/20 text-gray-300 leading-relaxed font-light
              transition-opacity duration-700 delay-100
              ${isOpen ? 'opacity-100' : 'opacity-0'}
            `}>
              {children}
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mt-8">
      
      {/* 1. DESCRIPTION */}
      <AccordionItem id="desc" title={labels.description_title} icon={FileText}>
        <div className="whitespace-pre-line text-sm md:text-base">
          {description}
        </div>
      </AccordionItem>

      {/* 2. PERFORMANCE & SPECS */}
      <AccordionItem id="specs" title={labels.specs_title} icon={Layers}>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-md bg-white/5 border border-white/5">
            <ShieldCheck className="text-viconol-primary w-6 h-6 flex-shrink-0" />
            <span className="text-white text-sm font-medium">{labels.protection}</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-md bg-white/5 border border-white/5">
            <Zap className="text-viconol-primary w-6 h-6 flex-shrink-0" />
            <span className="text-white text-sm font-medium">{labels.performance}</span>
          </div>
        </div>
      </AccordionItem>

      {/* 3. TÉLÉCHARGEMENTS & CONTACT */}
      <AccordionItem id="docs" title={labels.docs_title} icon={Download}>
        <div className="flex flex-col gap-3">
          {pdfUrl ? (
            <a 
              href={pdfUrl} 
              target="_blank"
              className="flex items-center justify-center gap-3 bg-viconol-primary text-black px-6 py-4 rounded-sm font-bold hover:bg-white transition-all uppercase text-xs md:text-sm tracking-widest"
            >
              <Download className="w-4 h-4" />
              {labels.datasheet}
            </a>
          ) : (
            <button disabled className="flex items-center justify-center gap-3 bg-white/5 text-gray-500 px-6 py-4 rounded-sm font-bold cursor-not-allowed uppercase text-xs md:text-sm tracking-widest border border-white/5">
               <Download className="w-4 h-4" />
               {labels.datasheet_unavailable}
            </button>
          )}
          
          <a href={contactUrl} className="flex items-center justify-center gap-3 border border-white/20 text-white px-6 py-4 rounded-sm font-bold hover:bg-white hover:text-black transition-all uppercase text-xs md:text-sm tracking-widest">
            <Mail className="w-4 h-4" />
            {labels.contact_us}
          </a>
        </div>
      </AccordionItem>

    </div>
  );
}