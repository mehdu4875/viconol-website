"use client";

import { useState } from "react";
import { useLocale } from 'next-intl';

interface ContactFormProps {
  translations: {
    name: string;
    email: string;
    message: string;
    placeholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}

export default function ContactForm({ translations }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", company_website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", company_website: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    // Carte : bg-white/[0.02] -> bg-white, border-white/5 -> border-viconol-border-light
    <div className="w-full max-w-2xl mx-auto p-6 md:p-10 rounded-2xl bg-white border border-viconol-border-light shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Honeypot invisible */}
        <div className="absolute left-[-9999px] opacity-0" aria-hidden="true">
          <label htmlFor="company_website">Laissez ce champ vide si vous êtes humain</label>
          <input
            type="text"
            id="company_website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_website}
            onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            {/* Label : text-gray-400 -> text-viconol-text-muted */}
            <label className="text-xs font-bold text-viconol-text-muted uppercase tracking-widest pl-1">
              {translations.name}
            </label>
            {/* Input : bg-[#0a0a0a] -> bg-viconol-bg-alt, border-white/10 -> border-viconol-border-light, text-white -> text-viconol-text-dark, placeholder-gray-600 -> placeholder-gray-400 */}
            <input
              type="text"
              required
              className="w-full px-5 py-4 bg-viconol-bg-alt border border-viconol-border-light rounded-xl text-viconol-text-dark placeholder-gray-400 font-medium focus:outline-none focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary transition-all duration-300"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-viconol-text-muted uppercase tracking-widest pl-1">
              {translations.email}
            </label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 bg-viconol-bg-alt border border-viconol-border-light rounded-xl text-viconol-text-dark placeholder-gray-400 font-medium focus:outline-none focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary transition-all duration-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-xs font-bold text-viconol-text-muted uppercase tracking-widest pl-1">
            {translations.message}
          </label>
          <textarea
            placeholder={translations.placeholder}
            required
            rows={5}
            className="w-full px-5 py-4 bg-viconol-bg-alt border border-viconol-border-light rounded-xl text-viconol-text-dark placeholder-gray-400 font-medium focus:outline-none focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary transition-all duration-300 resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>
        
        {/* Bouton : shadow doré -> shadow plus discret, hover:bg-white -> hover:bg-viconol-text-dark */}
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="mt-4 w-full bg-viconol-primary text-white font-black py-4 px-8 rounded-xl hover:bg-viconol-text-dark active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm shadow-lg hover:shadow-2xl"
        >
          {status === "loading" ? translations.sending : translations.send}
        </button>

        {status === "success" && (
          <div className="p-4 mt-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-sm font-semibold text-center animate-fade-in-up">
            {translations.success}
          </div>
        )}
        {status === "error" && (
          <div className="p-4 mt-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-semibold text-center animate-fade-in-up">
            {translations.error}
          </div>
        )}
      </form>
    </div>
  );
}