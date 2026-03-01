import { prisma } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { getTranslations } from 'next-intl/server';
import { SearchX, Filter } from 'lucide-react';
import CategoryFilterBar from '@/components/CategoryFilterBar'; // <--- IMPORT

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

  // --- RÉCUPÉRATION ---
  const products = await prisma.product.findMany({
    where: whereClause,
    include: { category: true, range: true },
    orderBy: { name: 'asc' }
  });

  const categories = await prisma.category.findMany({ orderBy: { slug: 'asc' } });
  
  const currentCategory = searchParams.cat 
    ? categories.find(c => c.id === searchParams.cat)
    : null;
    
  const getDbVal = (field: any) => {
    if (!field) return "";
    if (typeof field === 'string') return field;
    return field[locale] || field['fr'] || field['en'] || "";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 md:pt-32">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* EN-TÊTE RESPONSIVE */}
        <div className="flex flex-col gap-4 mb-6 md:mb-10 border-b border-white/10 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2 leading-tight">
                {searchParams.q 
                  ? t('search_results', { query: searchParams.q }) 
                  : t('title')}
              </h1>
              
              <div className="flex items-center gap-2 text-gray-400 font-medium text-sm md:text-base">
                <Filter className="w-4 h-4 text-viconol-primary" />
                <p>
                  {searchParams.q 
                    ? t('found_products', { count: products.length })
                    : currentCategory 
                      ? t('category_count', { category: getDbVal(currentCategory.name), count: products.length })
                      : t('count_catalogue', { count: products.length })
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- NOUVEAU : BARRE DE FILTRES HORIZONTALE --- */}
        {/* On ne l'affiche que s'il n'y a pas de recherche textuelle en cours (pour ne pas embrouiller) */}
        {!searchParams.q && (
          <CategoryFilterBar 
            categories={categories} 
            currentCatId={searchParams.cat} 
            locale={locale} 
          />
        )}

        {/* GRILLE RESPONSIVE */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-xl bg-white/5 mx-4">
            <SearchX className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">{t('no_results')}</h3>
            <p className="text-gray-500 max-w-xs mx-auto">{t('try_another_keyword')}</p>
          </div>
        )}

      </div>
    </div>
  );
}