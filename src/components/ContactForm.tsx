"use client";

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  translations: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // Récupération des données du formulaire
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      // Envoi des données vers notre nouvelle route API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-viconol-primary/5 border border-viconol-primary/20 rounded-2xl h-full min-h-[400px] text-center animate-fade-in-up">
        <CheckCircle2 className="w-16 h-16 text-viconol-primary mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
        <p className="text-gray-400 font-light">
          Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#121212] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl space-y-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-radial from-viconol-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3 relative z-10">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard ou nous contacter directement par e-mail.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{translations.name}</label>
          <input 
            required 
            type="text" 
            name="name" /* <-- AJOUT TRÈS IMPORTANT */
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-viconol-primary/50 focus:ring-1 focus:ring-viconol-primary/50 transition-all" 
            placeholder="Jean Dupont" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{translations.email}</label>
          <input 
            required 
            type="email" 
            name="email" /* <-- AJOUT TRÈS IMPORTANT */
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-viconol-primary/50 focus:ring-1 focus:ring-viconol-primary/50 transition-all" 
            placeholder="jean@entreprise.com" 
          />
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{translations.message}</label>
        <textarea 
          required 
          rows={5} 
          name="message" /* <-- AJOUT TRÈS IMPORTANT */
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:border-viconol-primary/50 focus:ring-1 focus:ring-viconol-primary/50 transition-all resize-none" 
          placeholder="Comment pouvons-nous vous aider ?"
        ></textarea>
      </div>

      <button 
        disabled={status === 'loading'} 
        type="submit" 
        className="w-full flex items-center justify-center gap-2 bg-viconol-primary text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 relative z-10"
      >
        {status === 'loading' ? (
          <span className="animate-pulse">Envoi en cours...</span>
        ) : (
          <>
            {translations.send} <Send className="w-4 h-4 ml-1" />
          </>
        )}
      </button>
    </form>
  );
}