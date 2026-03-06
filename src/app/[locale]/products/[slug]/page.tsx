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

  // SÉCURITÉ : On cherche le produit par son slug, mais aussi par son ID au cas où !
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { slug: slug },
        { id: slug }
      ]
    },
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
  const categoryName = getTranslatedText(product.category?.name);

  return (
    <main className="min-h-screen bg-[#050505] pt-20 md:pt-28 pb-32">
      
      <div className="border-b border-white/5 bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-4 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href={`/${locale}/products`} className="hover:text-viconol-primary transition-colors">{tProducts('title')}</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-white/20 flex-shrink-0" />
          <Link href={`/${locale}/products?cat=${product.categoryId}`} className="hover:text-viconol-primary transition-colors">{categoryName}</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-white/20 flex-shrink-0" />
          <span className="text-white">{name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* IMAGE PRODUIT SUR FOND BLANC */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="relative aspect-square w-full bg-white rounded-3xl flex items-center justify-center p-8 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
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

          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 shadow-sm self-start">
              <span className="w-2 h-2 rounded-full bg-viconol-primary animate-pulse"></span>
              <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">{categoryName}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic leading-tight">
              {name}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 font-medium mb-10 leading-relaxed border-l-2 border-viconol-primary pl-6">
              {shortDesc}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5 shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-viconol-primary" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">{t('protection')}</span>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5 shadow-sm flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-viconol-primary" />
                <span className="text-sm font-bold text-white uppercase tracking-wider">{t('performance')}</span>
              </div>
            </div>

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

            <div className="mt-12">
              <h3 className="text-sm font-black text-viconol-primary uppercase tracking-[0.2em] mb-6">{t('documents')}</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-5 rounded-xl border border-white/5 bg-[#0a0a0a] hover:border-viconol-primary transition-colors group cursor-pointer shadow-sm">
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-gray-500 group-hover:text-viconol-primary transition-colors" />
                    <span className="font-bold text-white uppercase tracking-wide">{t('datasheet')}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">{t('datasheet_unavailable')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- SECTION QUALITÉ ET PRODUCTION --- */}
      <section className="mt-12 border-t border-white/5 bg-[#080808] py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5">
                <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Made in Germany</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-tight">
                L'Excellence <br/><span className="text-viconol-primary">Du Laboratoire à l'Usine</span>
              </h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                Chaque lot de <strong>{name}</strong> est rigoureusement testé dans nos laboratoires avant d'être approuvé. De l'analyse moléculaire de nos chimistes jusqu'au conditionnement final dans nos lignes de remplissage automatisées, nous vous garantissons une qualité et une pureté inégalées pour vos moteurs.
              </p>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] transform md:translate-y-8">
                <Image 
                  src="/images/Fille labo viconol .png" 
                  alt="Laboratoire Viconol" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
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