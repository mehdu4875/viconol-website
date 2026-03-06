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
    <main className="min-h-screen bg-[#050505] pt-20 md:pt-28 pb-20">
      
      <section className="relative bg-[#0a0a0a] py-16 md:py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/tuf piste.png" alt="Viconol Catalogue" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium mb-8">
              {catParam 
                ? t('category_count', { category: currentCatName, count: products.length })
                : qParam 
                  ? t('search_results', { query: qParam })
                  : t('count_catalogue', { count: products.length })
              }
            </p>

            <form action={`/${locale}/products`} className="relative max-w-xl shadow-2xl rounded-xl">
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