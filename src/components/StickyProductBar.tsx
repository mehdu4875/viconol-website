"use client";

import { Mail, FileText } from 'lucide-react';

interface StickyProductBarProps {
  pdfUrl?: string | null;
  contactUrl: string;
  productName: string; // This prop is now unused but kept for interface compatibility
}

export default function StickyProductBar({ pdfUrl, contactUrl, productName }: StickyProductBarProps) {
  // No state needed anymore as the share button is removed

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
      {/* Shadow gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent -z-10 pointer-events-none"></div>

      <div className="bg-[#121212]/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex items-center gap-3 safe-area-bottom">
        
        {/* Bouton 1 : PDF (Si dispo) - Secondaire */}
        {pdfUrl && (
          <a 
            href={pdfUrl} 
            target="_blank"
            className="flex-1 flex flex-col items-center justify-center h-12 rounded-xl bg-white/5 border border-white/10 active:bg-white/10 active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4 text-gray-400 mb-0.5" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fiche</span>
          </a>
        )}

        {/* Bouton 2 : CONTACT (Principal - Doré) */}
        {/* Il prend toute la place (flex-2) si le PDF est là, sinon toute la place (flex-1) */}
        <a 
          href={contactUrl}
          className={`${pdfUrl ? 'flex-[2]' : 'flex-1'} flex items-center justify-center gap-2 h-12 rounded-xl bg-viconol-primary text-black font-black uppercase tracking-widest shadow-[0_0_20px_-5px_rgba(212,175,55,0.4)] active:scale-95 transition-all`}
        >
          <Mail className="w-4 h-4" />
          <span className="text-xs">Contacter</span>
        </a>

      </div>
    </div>
  );
}