"use client";
import { useState } from "react";
import { useLocale } from 'next-intl';

export default function ContactForm({ translations }: { translations: any }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", company_website: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...formData, locale }) });
      if (response.ok) { setStatus("success"); setFormData({ name: "", email: "", message: "", company_website: "" }); setTimeout(() => setStatus("idle"), 5000); } else setStatus("error");
    } catch (error) { setStatus("error"); }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="absolute left-[-9999px] opacity-0" aria-hidden="true"><input type="text" name="company_website" tabIndex={-1} value={formData.company_website} onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}/></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">{translations.name}</label><input required className="w-full px-5 py-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-gray-600 font-medium focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/></div>
          <div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">{translations.email}</label><input type="email" required className="w-full px-5 py-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-gray-600 font-medium focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary transition-all" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/></div>
        </div>
        <div className="flex flex-col gap-2 mt-2"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">{translations.message}</label><textarea placeholder={translations.placeholder} required rows={5} className="w-full px-5 py-4 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-gray-600 font-medium focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary transition-all resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}/></div>
        <button type="submit" disabled={status === "loading" || status === "success"} className="mt-4 w-full bg-viconol-primary text-black font-black py-4 px-8 rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-50 uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)]">{status === "loading" ? translations.sending : translations.send}</button>
        {status === "success" && <div className="p-4 mt-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold text-center">{translations.success}</div>}
        {status === "error" && <div className="p-4 mt-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold text-center">{translations.error}</div>}
      </form>
    </div>
  );
}