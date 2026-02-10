"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, CornerDownLeft } from "lucide-react";

// On définit le format des traductions attendues
interface SearchModalProps {
  locale: string;
  translations: {
    placeholder: string;
    examples: string;
    enter: string;
    validate: string;
    esc: string;
  };
}

export default function SearchModal({ locale, translations }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
      setQuery("");
    }, 300);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${locale}/products?q=${encodeURIComponent(query)}`);
    closeModal();
  };

  return (
    <>
      <button 
        onClick={openModal} 
        className="p-2 text-viconol-metal hover:text-viconol-primary transition-colors group"
        aria-label="Search"
      >
        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div 
          onClick={handleBackdropClick}
          className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-start justify-center pt-[15vh] transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            ref={modalRef}
            className={`w-full max-w-2xl bg-[#121212] border border-white/10 shadow-2xl rounded-lg overflow-hidden transform transition-all duration-300 ${
              isAnimating ? "scale-100 translate-y-0" : "scale-95 -translate-y-4"
            }`}
          >
            <form onSubmit={handleSearch} className="relative flex items-center border-b border-white/5 p-4">
              <Search className="w-6 h-6 text-viconol-primary ml-2" />
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                // ICI : On utilise le texte traduit passé en props
                placeholder={translations.placeholder}
                className="flex-1 bg-transparent text-xl text-white placeholder-gray-500 px-4 py-2 focus:outline-none"
                autoComplete="off"
              />

              {query && (
                <button 
                  type="button" 
                  onClick={() => setQuery("")}
                  className="text-gray-500 hover:text-white mr-4"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <button 
                type="button" 
                onClick={closeModal}
                className="px-3 py-1 text-xs font-medium text-gray-500 border border-white/10 rounded hover:border-white/30 transition-colors uppercase tracking-wider"
              >
                {translations.esc}
              </button>
            </form>

            <div className="bg-[#0a0a0a] p-3 px-6 flex items-center justify-between text-xs text-gray-500">
              <div className="flex gap-4">
                <span>{translations.examples}</span>
                <span className="text-gray-400 cursor-pointer hover:text-viconol-primary transition-colors" onClick={() => setQuery("5W30")}>5W30</span>
                <span className="text-gray-400 cursor-pointer hover:text-viconol-primary transition-colors" onClick={() => setQuery("Hydraulique")}>Hydraulique</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="font-bold text-viconol-primary">{translations.enter}</span>
                <CornerDownLeft className="w-3 h-3" />
                <span>{translations.validate}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}