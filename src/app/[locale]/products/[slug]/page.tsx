import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ProductAccordion from '@/components/ProductAccordion';
import StickyProductBar from '@/components/StickyProductBar';

export default async function ProductDetailPage({
  params: { locale, slug }
}: {
  params: { locale: string, slug: string }
}) {
  const t = await getTranslations('ProductDetail');
  const tProducts = await getTranslations('Products');

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!product) notFound();

  const getTranslatedText = (field: any) => {
    if (!field) return "";
    if (typeof field === 'string') return field;
    return field[locale] || field['fr'] || field['de'] || "";
  };

  const name = product.name;
  const shortDesc = getTranslatedText(product.shortDesc);
  const longDesc = getTranslatedText(product.longDesc);
  const specs = getTranslatedText(product.specs);
  const categoryName = getTranslatedText(product.category.name);

  return (
    // bg-[#050505] -> bg-viconol-bg-light
    <main className="min-h-screen bg-viconol-bg-light pt-20 md:pt-28 pb-32">
      
      {/* Fil d'Ariane clair */}
      <div className="border-b border-viconol-border-light bg-viconol-bg-alt">
        <div className="container mx-auto px-6 py-4 flex items-center text-xs font-bold uppercase tracking-widest text-viconol-text-muted overflow-x-auto whitespace-nowrap">
          <Link href={`/${locale}/products`} className="hover:text-viconol-primary transition-colors">{tProducts('title')}</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-viconol-border-light flex-shrink-0" />
          <Link href={`/${locale}/products?cat=${product.categoryId}`} className="hover:text-viconol-primary transition-colors">{categoryName}</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-viconol-border-light flex-shrink-0" />
          <span className="text-viconol-text-dark">{name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* IMAGE PRODUIT SUR FOND BLANC */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="relative aspect-square w-full bg-white rounded-3xl flex items-center justify-center p-8 border border-viconol-border-light shadow-xl">
              <Image 
                src={product.imageUrl || '/images/products/neutre.png'} 
                alt={name} 
                fill 
                className="object-contain p-8"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* INFOS PRODUITS (TEXTE SOMBRE) */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-viconol-border-light bg-white shadow-sm self-start">
              <span className="w-2 h-2 rounded-full bg-viconol-primary animate-pulse"></span>
              <span className="text-viconol-text-dark text-[10px] font-bold tracking-[0.2em] uppercase">{categoryName}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-viconol-text-dark mb-6 uppercase italic leading-tight">
              {name}
            </h1>

            <p className="text-lg md:text-xl text-viconol-text-muted font-medium mb-10 leading-relaxed border-l-2 border-viconol-primary pl-6">
              {shortDesc}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white p-4 rounded-xl border border-viconol-border-light shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-viconol-primary" />
                <span className="text-sm font-bold text-viconol-text-dark uppercase tracking-wider">{t('protection')}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-viconol-border-light shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-viconol-primary" />
                <span className="text-sm font-bold text-viconol-text-dark uppercase tracking-wider">{t('performance')}</span>
              </div>
            </div>

            {/* ACCORDÉON DESCRIPTIONS */}
            <ProductAccordion 
              title={t('description')} 
              content={longDesc || shortDesc} 
              isOpenInit={true} 
            />
            
            {specs && (
              <div className="mt-4">
                <ProductAccordion 
                  title="Spécifications & Normes" 
                  content={specs} 
                />
              </div>
            )}

            {/* DOCUMENTS */}
            <div className="mt-12">
              <h3 className="text-sm font-black text-viconol-primary uppercase tracking-[0.2em] mb-6">{t('documents')}</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-5 rounded-xl border border-viconol-border-light bg-white hover:border-viconol-primary transition-colors group cursor-pointer shadow-sm">
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-viconol-text-muted group-hover:text-viconol-primary transition-colors" />
                    <span className="font-bold text-viconol-text-dark uppercase tracking-wide">{t('datasheet')}</span>
                  </div>
                  <span className="text-xs font-bold text-viconol-text-muted bg-viconol-bg-alt px-3 py-1 rounded-full uppercase tracking-widest">{t('datasheet_unavailable')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- NOUVELLE SECTION QUALITÉ ET PRODUCTION AVEC LES 2 IMAGES --- */}
      <section className="mt-12 border-t border-viconol-border-light bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            {/* Textes de la section */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-viconol-border-light bg-viconol-bg-alt">
                <span className="text-viconol-text-dark text-[10px] font-bold tracking-[0.2em] uppercase">Made in Germany</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-viconol-text-dark uppercase italic leading-tight">
                L'Excellence <br/><span className="text-viconol-primary">Du Laboratoire à l'Usine</span>
              </h3>
              <p className="text-viconol-text-muted font-medium leading-relaxed">
                Chaque lot de <strong>{name}</strong> est rigoureusement testé dans nos laboratoires avant d'être approuvé. De l'analyse moléculaire de nos chimistes jusqu'au conditionnement final dans nos lignes de remplissage automatisées, nous vous garantissons une qualité et une pureté inégalées pour vos moteurs.
              </p>
            </div>

            {/* Les 2 images (Laboratoire + Fûts Usine) */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl transform md:translate-y-8">
                <Image 
                  src="/images/Fille labo viconol .png" 
                  alt="Laboratoire Viconol" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/Fut dans  l'usine .png" 
                  alt="Usine de conditionnement Viconol" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <StickyProductBar product={product} locale={locale} />
    </main>
  );
}