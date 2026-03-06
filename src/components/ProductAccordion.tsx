"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProductAccordion({ title, content, isOpenInit = false }: { title: string, content: string, isOpenInit?: boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenInit);

  return (
    // bg-[#0a0a0a] -> bg-white, border-white/10 -> border-viconol-border-light
    <div className="border border-viconol-border-light rounded-xl overflow-hidden bg-white shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-viconol-bg-alt transition-colors"
      >
        {/* text-white -> text-viconol-text-dark */}
        <span className="font-bold text-viconol-text-dark uppercase tracking-wide">{title}</span>
        <ChevronDown className={`w-5 h-5 text-viconol-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] border-t border-viconol-border-light' : 'max-h-0'}`}>
        {/* text-gray-400 -> text-viconol-text-muted */}
        <div className="p-5 text-viconol-text-muted font-medium leading-relaxed whitespace-pre-wrap bg-viconol-bg-alt">
          {content}
        </div>
      </div>
    </div>
  );
}