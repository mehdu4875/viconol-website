import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/db';
import Image from 'next/image';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import CategoryFilterBar from '@/components/CategoryFilterBar';

export default async function ProductsPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string },
  searchParams: { cat?: string, q?: string }
}) {
  const t = await getTranslations('Products');
  const catParam = searchParams.cat;
  const qParam = searchParams.q?.toLowerCase();

  const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
  
  let whereClause: any = {};
  if (catParam) whereClause.categoryId = catParam;
  
  const allProducts = await prisma.product.findMany({
    where: whereClause,
    orderBy: { name: 'asc' },
    include: { category: true }
  });

  const products = qParam 
    ? allProducts.filter(p => p.name.toLowerCase().includes(qParam) || (typeof p.shortDesc === 'object' && JSON.stringify(p.shortDesc).toLowerCase().includes(qParam)))
    : allProducts;

  let currentCatName = "";
  
  // SYSTÈME INFAILLIBLE POUR LES IMAGES DYNAMIQUES
  let heroImage = '/images/tuf piste.png'; // L'image par défaut
  
  if (catParam) {
    const cat = categories.find(c => c.id === catParam);
    if (cat) {
      currentCatName = typeof cat.name === 'string' ? cat.name : (cat.name as any)[locale] || (cat.name as any)['fr'] || "";
      const slug = cat.slug.toLowerCase();
      
      if (slug.includes('vehicule') || slug.includes('auto') || cat.id === 'VL') {
        heroImage = '/images/photo voiture .jpeg';
      } else if (slug.includes('industrie') || slug.includes('indus') || cat.id === 'IN') {
        heroImage = '/images/Industrie .jpeg';
      } else if (slug.includes('poids') || slug.includes('lourd') || cat.id === 'PL') {
        heroImage = '/images/Photo camio.jpeg';
      } else if (slug.includes('nautisme') || slug.includes('marine') || slug.includes('jet') || cat.id === 'NA') {
        heroImage = '/images/labo jet.png';
      } else if (slug.includes('moto') || cat.id === 'MO') {
        heroImage = '/images/moto.png';
      } else if (slug.includes('agri') || cat.id === 'AG') {
        heroImage = '/images/agri.png';
      } else if (slug.includes('transmission') || cat.id === 'TR') {
        // NOUVELLE RÈGLE AJOUTÉE ICI !
        heroImage = '/images/transmission.jpg';
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] pt-20 md:pt-28 pb-20 overflow-x-hidden">
      
      {/* --- HERO SECTION CINÉMATOGRAPHIQUE PARFAITE --- */}
      <section className="relative bg-[#050505] py-16 md:py-0 border-b border-white/5 overflow-hidden min-h-[400px] md:h-[50vh] lg:h-[60vh] flex items-center">
        
        {/* 1. L'IMAGE PRINCIPALE */}
        <div className="absolute top-0 right-0 h-full w-full md:w-[60%] lg:w-[65%] z-0">
          <Image 
            src={heroImage} 
            alt="Viconol Catalogue" 
            fill 
            className="object-cover object-center md:object-right" 
            priority 
          />
        </div>

        {/* 2. LE MASQUE MAGIQUE (LE FONDANT) */}
        <div className="absolute inset-0 z-10 md:hidden bg-[#050505]/75"></div>
        <div className="hidden md:block absolute top-0 left-0 h-full w-[80%] z-10 bg-gradient-to-r from-[#050505] via-[#050505] to-transparent"></div>
        
        {/* 3. LE CONTENU (TEXTE) */}
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase italic leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium mb-10 leading-relaxed border-l-2 border-viconol-primary pl-6 md:pl-8 mx-auto md:mx-0 max-w-lg md:max-w-none">
              {catParam 
                ? t('category_count', { category: currentCatName, count: products.length })
                : qParam 
                  ? t('search_results', { query: qParam })
                  : t('count_catalogue', { count: products.length })
              }
            </p>

            <form action={`/${locale}/products`} className="relative max-w-xl shadow-2xl rounded-xl mx-auto md:mx-0">
              {catParam && <input type="hidden" name="cat" value={catParam} />}
              <input 
                type="text" 
                name="q"
                defaultValue={qParam || ""}
                placeholder="Rechercher un produit..." 
                className="w-full bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 font-medium px-6 py-4 rounded-xl outline-none focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary pr-12 transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-viconol-primary">
                <Search className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <CategoryFilterBar categories={categories} locale={locale} allLabel={t('all_catalogue')} />

      <section className="container mx-auto px-6 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-sm">
            <Search className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">{t('no_results')}</h3>
            <p className="text-gray-400 font-medium">{t('try_another_keyword')}</p>
          </div>
        )}
      </section>
    </main>
  );
}