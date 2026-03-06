"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProductAccordion({ title, content, isOpenInit = false }: { title: string, content: string, isOpenInit?: boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenInit);
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden bg-[#0a0a0a] shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 bg-[#0a0a0a] hover:bg-white/5 transition-colors">
        <span className="font-bold text-white uppercase tracking-wide">{title}</span>
        <ChevronDown className={`w-5 h-5 text-viconol-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] border-t border-white/5' : 'max-h-0'}`}>
        <div className="p-5 text-gray-400 font-medium leading-relaxed whitespace-pre-wrap bg-[#050505]">{content}</div>
      </div>
    </div>
  );
}