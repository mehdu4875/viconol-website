import { getProductBySlug } from "@/actions/product-actions";
import { notFound } from "next/navigation";
import { Download, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { getTranslations } from 'next-intl/server'; 

export default async function ProductDetail({ params }: { params: { slug: string, locale: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const t = await getTranslations({locale: params.locale, namespace: 'ProductDetail'});

  const getDbVal = (field: any) => {
    if (!field) return "";
    if (typeof field === 'string') return field;
    return field[params.locale] || field['en'] || field['fr'] || "";
  };

  return (
    // CORRECTION ICI : Changement de 'py-12' à 'pt-36 pb-20' pour éviter que la Navbar cache le contenu
    <div className="min-h-screen bg-viconol-dark pt-36 pb-20 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          <div className="bg-viconol-panel rounded-sm p-12 flex justify-center border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-viconol-primary/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              width={400} 
              height={400} 
              className="object-contain relative z-10 drop-shadow-2xl"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-viconol-primary font-bold uppercase tracking-widest text-xs border border-viconol-primary/30 px-3 py-1 rounded-full bg-viconol-primary/10">
                {getDbVal(product.category.name)}
              </span>
              {product.range && (
                <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  — {getDbVal(product.range.name)}
                </span>
              )}
            </div>

            <h1 className="text-5xl font-black text-white mb-6 tracking-tight">{product.name}</h1>
            
            <p className="text-lg text-slate-300 mb-10 leading-relaxed font-light border-l-4 border-viconol-primary pl-6">
              {getDbVal(product.longDesc)}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-4 p-5 bg-viconol-panel rounded-sm border border-white/5 hover:border-viconol-primary/30 transition-colors">
                <ShieldCheck className="text-viconol-primary w-8 h-8" />
                <span className="font-bold text-white">{t('protection')}</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-viconol-panel rounded-sm border border-white/5 hover:border-viconol-primary/30 transition-colors">
                <Zap className="text-viconol-primary w-8 h-8" />
                <span className="font-bold text-white">{t('performance')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {product.pdfUrl ? (
                <a 
                  href={product.pdfUrl} 
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-viconol-primary text-white px-8 py-4 rounded-sm font-bold hover:bg-yellow-600 transition-all shadow-lg hover:shadow-viconol-primary/25"
                >
                  <Download className="w-5 h-5" />
                  {t('datasheet')}
                </a>
              ) : (
                <button disabled className="flex items-center justify-center gap-2 bg-white/10 text-white/50 px-8 py-4 rounded-sm font-bold cursor-not-allowed">
                   <Download className="w-5 h-5" />
                   {t('datasheet_unavailable')}
                </button>
              )}
              
              <a href={`/${params.locale}#contact`} className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-sm font-bold hover:bg-white/5 transition-colors">
                {t('contact_us')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}