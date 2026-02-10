"use client";

import { updateProduct } from "@/actions/admin-products";
import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminProductForm({ product, categories, locale }: any) {
  // Helper pour lire les valeurs JSON existantes
  const getVal = (json: any, lang: string) => json?.[lang] || "";

  return (
    <form action={updateProduct} className="space-y-8 max-w-4xl mx-auto">
      {/* ID caché pour savoir quel produit on modifie */}
      <input type="hidden" name="id" value={product.id} />

      {/* En-tête avec bouton retour et sauvegarde */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <Link href={`/${locale}/admin/dashboard`} className="flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Link>
        <h1 className="text-2xl font-bold text-white">Modifier : {product.name}</h1>
        <button type="submit" className="bg-viconol-primary text-black px-6 py-3 font-bold uppercase rounded-sm flex items-center gap-2 hover:bg-white transition-colors">
          <Save className="w-5 h-5" /> Enregistrer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Colonne Gauche : Infos Générales */}
        <div className="space-y-6 bg-[#121212] p-6 rounded-sm border border-white/5">
          <h3 className="text-viconol-primary font-bold uppercase tracking-widest text-sm mb-4">Informations</h3>
          
          <div>
            <label className="block text-gray-500 text-sm mb-2">Nom du produit</label>
            <input name="name" defaultValue={product.name} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-viconol-primary outline-none" required />
          </div>

          <div>
            <label className="block text-gray-500 text-sm mb-2">Slug (URL)</label>
            <input name="slug" defaultValue={product.slug} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-viconol-primary outline-none font-mono text-sm" required />
          </div>

          <div>
            <label className="block text-gray-500 text-sm mb-2">Catégorie</label>
            <select name="categoryId" defaultValue={product.categoryId} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-viconol-primary outline-none">
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name['fr'] || cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-500 text-sm mb-2">URL de l'image</label>
            <input name="imageUrl" defaultValue={product.imageUrl} className="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-viconol-primary outline-none text-sm" required />
            <div className="mt-4 flex justify-center bg-white/5 p-4 rounded">
              <Image src={product.imageUrl} alt="Aperçu" width={100} height={100} className="object-contain h-32" />
            </div>
          </div>
        </div>

        {/* Colonne Droite : Textes Multilingues */}
        <div className="space-y-6 bg-[#121212] p-6 rounded-sm border border-white/5">
          <h3 className="text-viconol-primary font-bold uppercase tracking-widest text-sm mb-4">Traductions</h3>
          
          {/* Description Courte */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 text-xs mb-1">Desc. Courte (FR)</label>
              <textarea name="shortDescFr" defaultValue={getVal(product.shortDesc, 'fr')} rows={3} className="w-full bg-black/50 border border-white/10 p-3 text-white text-sm focus:border-viconol-primary outline-none" />
            </div>
            <div>
              <label className="block text-gray-500 text-xs mb-1">Desc. Courte (DE)</label>
              <textarea name="shortDescDe" defaultValue={getVal(product.shortDesc, 'de')} rows={3} className="w-full bg-black/50 border border-white/10 p-3 text-white text-sm focus:border-viconol-primary outline-none" />
            </div>
          </div>

          {/* Description Longue */}
          <div>
            <label className="block text-gray-500 text-xs mb-1">Description Longue (FR)</label>
            <textarea name="longDescFr" defaultValue={getVal(product.longDesc, 'fr')} rows={6} className="w-full bg-black/50 border border-white/10 p-3 text-white text-sm focus:border-viconol-primary outline-none" />
          </div>
          <div>
            <label className="block text-gray-500 text-xs mb-1">Description Longue (DE)</label>
            <textarea name="longDescDe" defaultValue={getVal(product.longDesc, 'de')} rows={6} className="w-full bg-black/50 border border-white/10 p-3 text-white text-sm focus:border-viconol-primary outline-none" />
          </div>

        </div>
      </div>
    </form>
  );
}