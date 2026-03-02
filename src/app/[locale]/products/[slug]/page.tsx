import { getProductBySlug } from "@/actions/product-actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server'; 
import ProductAccordion from "@/components/ProductAccordion";
import StickyProductBar from "@/components/StickyProductBar";

export default async function ProductDetail({ params }: { params: { slug: string, locale: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const t = await getTranslations({locale: params.locale, namespace: 'ProductDetail'});

  const getDbVal = (field: any) => {
    if (!field) return "";
    if (typeof field === 'string') return field;
    return field[params.locale] || field['en'] || field['fr'] || "";
  };

  // Préparation des labels traduits pour le composant Client
  const accordionLabels = {
    protection: t('protection'),
    performance: t('performance'),
    datasheet: t('datasheet'),
    datasheet_unavailable: t('datasheet_unavailable'),
    contact_us: t('contact_us'),
    // Utiliser les clés existantes dans `ProductDetail`
    description_title: t('description'),
    specs_title: t('performance'),
    docs_title: t('documents')
  };

  return (
    <div className="min-h-screen bg-viconol-dark pt-24 pb-32 md:pb-20 md:pt-32 text-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* BOUTON RETOUR SEULEMENT AJOUTÉ ICI */}
        <Link 
          href={`/${params.locale}/products`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-viconol-primary transition-colors mb-6 md:mb-8 group"
        >
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-viconol-primary/50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest">{t('backToProducts')}</span>
        </Link>

        {/* Layout : Colonne simple sur Mobile / 2 Colonnes sur PC */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* COLONNE GAUCHE : IMAGE */}
          <div className="w-full lg:sticky lg:top-32">
            <div className="bg-[#121212] rounded-2xl p-8 md:p-12 flex justify-center border border-white/5 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-radial from-viconol-primary/10 to-transparent opacity-50"></div>
              
              <Image 
                src={product.imageUrl || "/images/placeholder.jpg"} 
                alt={product.name} 
                width={500} 
                height={500} 
                className="object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* COLONNE DROITE : INFO & ACCORDÉONS */}
          <div className="w-full">
            
            {/* Badges Catégorie */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-viconol-primary font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs border border-viconol-primary/30 px-3 py-1.5 rounded-full bg-viconol-primary/5">
                {getDbVal(product.category.name)}
              </span>
              {product.range && (
                <span className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs px-2">
                  — {getDbVal(product.range.name)}
                </span>
              )}
            </div>

            {/* Titre Produit */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
              {product.name}
            </h1>
            
            {/* Description Courte */}
            {product.shortDesc && (
               <p className="text-gray-400 text-sm md:text-base font-light mb-8 leading-relaxed">
                 {getDbVal(product.shortDesc)}
               </p>
            )}

            {/* Accordéons avec labels traduits */}
            <ProductAccordion 
              description={getDbVal(product.longDesc)}
              pdfUrl={product.pdfUrl}
              contactUrl={`/${params.locale}#contact`}
              labels={accordionLabels}
            />

          </div>

        </div>
      </div>

      {/* Barre d'action fixe mobile */}
      <StickyProductBar 
        pdfUrl={product.pdfUrl}
        contactUrl={`/${params.locale}#contact`}
        productName={product.name}
      />

    </div>
  );
}