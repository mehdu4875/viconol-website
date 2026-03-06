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
  if (catParam) {
    const cat = categories.find(c => c.id === catParam);
    if (cat) {
      currentCatName = typeof cat.name === 'string' ? cat.name : (cat.name as any)[locale] || (cat.name as any)['fr'] || "";
    }
  }

  return (
    // bg-viconol-dark -> bg-viconol-bg-alt
    <main className="min-h-screen bg-viconol-bg-alt pt-20 md:pt-28 pb-20">
      
      {/* HERO SECTION avec l'image TUF PISTE */}
      <section className="relative bg-white py-16 md:py-24 border-b border-viconol-border-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/tuf piste.png" // NOUVELLE IMAGE ICI !
            alt="Viconol Catalogue" 
            fill 
            className="object-cover object-center" 
            priority
          />
          {/* Masque blanc translucide pour pouvoir lire le texte sombre par-dessus */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-viconol-text-dark mb-6 uppercase italic">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-viconol-text-dark font-medium mb-8">
              {catParam 
                ? t('category_count', { category: currentCatName, count: products.length })
                : qParam 
                  ? t('search_results', { query: qParam })
                  : t('count_catalogue', { count: products.length })
              }
            </p>

            {/* BARRE DE RECHERCHE CLAIRE */}
            <form action={`/${locale}/products`} className="relative max-w-xl shadow-lg rounded-xl">
              {catParam && <input type="hidden" name="cat" value={catParam} />}
              <input 
                type="text" 
                name="q"
                defaultValue={qParam || ""}
                placeholder="Rechercher un produit..." 
                className="w-full bg-white border border-viconol-border-light text-viconol-text-dark placeholder-gray-400 font-medium px-6 py-4 rounded-xl outline-none focus:border-viconol-primary focus:ring-1 focus:ring-viconol-primary pr-12 transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-viconol-text-muted hover:text-viconol-primary">
                <Search className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FILTRES CATÉGORIES */}
      <CategoryFilterBar categories={categories} locale={locale} allLabel={t('all_catalogue')} />

      {/* GRILLE PRODUITS */}
      <section className="container mx-auto px-6 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-2xl border border-viconol-border-light shadow-sm">
            <Search className="w-16 h-16 text-viconol-border-light mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-viconol-text-dark mb-4">{t('no_results')}</h3>
            <p className="text-viconol-text-muted font-medium">{t('try_another_keyword')}</p>
          </div>
        )}
      </section>
    </main>
  );
}