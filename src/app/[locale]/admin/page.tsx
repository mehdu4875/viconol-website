"use client";

import { loginAdmin } from "@/actions/admin-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage({ params: { locale } }: { params: { locale: string } }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await loginAdmin(formData);
    if (res.success) {
      router.push(`/${locale}/admin/dashboard`); // Redirection vers le dashboard
    } else {
      setError(res.error || "Erreur inconnue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
      <div className="w-full max-w-md p-8 bg-[#121212] border border-white/10 rounded-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-viconol-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-viconol-primary/20">
            <Lock className="w-8 h-8 text-viconol-primary" />
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">Espace Admin</h1>
          <p className="text-gray-500 text-sm mt-2">Accès réservé à la direction</p>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <input
              name="password"
              type="password"
              placeholder="Mot de passe maître"
              className="w-full bg-black/50 border border-white/10 p-4 text-center text-white focus:border-viconol-primary focus:outline-none transition-colors rounded-sm"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-viconol-primary text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            Entrer <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}