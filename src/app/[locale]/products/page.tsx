import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { getTranslations } from 'next-intl/server';
import { SearchX } from 'lucide-react';

export default async function ProductsPage({ 
  params: { locale },
  searchParams 
}: { 
  params: { locale: string },
  searchParams: { cat?: string; q?: string }
}) {
  const t = await getTranslations({locale, namespace: 'Products'});

  // --- LOGIQUE DE FILTRE ---
  const whereClause: any = {};
  if (searchParams.cat) whereClause.categoryId = searchParams.cat;
  if (searchParams.q) {
    whereClause.OR = [
      { name: { contains: searchParams.q, mode: 'insensitive' } },
      { slug: { contains: searchParams.q, mode: 'insensitive' } },
    ];
  }

  // --- RÉCUPÉRATION DES PRODUITS ET CATÉGORIES ---
  const products = await prisma.product.findMany({
    where: whereClause,
    include: { category: true, range: true },
    orderBy: { name: 'asc' }
  });

  const categories = await prisma.category.findMany({ orderBy: { slug: 'asc' } });
  
  const currentCategoryName = searchParams.cat 
    ? categories.find(c => c.id === searchParams.cat)?.name 
    : null;
    
  const getCatName = (jsonName: any) => {
    if (!jsonName) return "";
    return jsonName[locale] || jsonName['fr'] || "";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* En-tête de page responsive */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div className="w-full">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 leading-tight">
              {searchParams.q 
                ? t('search_results', { query: searchParams.q }) 
                : t('title')}
            </h1>
            
            <p className="text-gray-400 font-light">
              {searchParams.q 
                ? t('found_products', { count: products.length })
                : currentCategoryName 
                  ? t('category_count', { category: getCatName(currentCategoryName), count: products.length })
                  : t('count_catalogue', { count: products.length })
              }
            </p>
          </div>
        </div>

        {/* Grille de produits : 1 col sur mobile, 2 sur tablette, 4 sur PC */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-sm bg-white/5">
            <SearchX className="w-16 h-16 text-viconol-metal mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">{t('no_results')}</h3>
            <p className="text-gray-500">{t('try_another_keyword')}</p>
          </div>
        )}

      </div>
    </div>
  );
}