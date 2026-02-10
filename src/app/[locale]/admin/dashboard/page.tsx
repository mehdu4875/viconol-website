import { prisma } from "@/lib/db";
import { isAdmin, logoutAdmin } from "@/actions/admin-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // <--- Important pour le lien Modifier
import { deleteProduct } from "@/actions/admin-products";
import { Trash2, Plus, LogOut, Package, Pencil } from "lucide-react"; // <--- J'ai ajouté Pencil

export default async function DashboardPage({ params: { locale } }: { params: { locale: string } }) {
  // 1. Protection Côté Serveur (Si pas admin -> dehors)
  const isAuth = await isAdmin();
  if (!isAuth) redirect(`/${locale}/admin`);

  // 2. Récupérer les produits
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      {/* Header Admin */}
      <header className="border-b border-white/10 bg-[#121212] py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-viconol-primary uppercase tracking-widest">
            Viconöl <span className="text-white">Admin</span>
          </h1>
          <form action={logoutAdmin}>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </form>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Gestion des Produits ({products.length})</h2>
          {/* Ce bouton est pour l'instant visuel ou peut rediriger vers une page create plus tard */}
          <button className="bg-viconol-primary text-black px-6 py-3 font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-white transition-colors">
            <Plus className="w-5 h-5" /> Ajouter un produit
          </button>
        </div>

        {/* Tableau des produits */}
        <div className="bg-[#121212] border border-white/5 rounded-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-gray-500 text-xs uppercase tracking-widest font-bold">
            <div className="col-span-1">Img</div>
            <div className="col-span-4">Nom</div>
            <div className="col-span-3">Catégorie</div>
            <div className="col-span-2">Référence (Slug)</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors">
              
              {/* Image */}
              <div className="col-span-1 relative h-12 w-12 bg-white/5 rounded p-1">
                <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
              </div>

              {/* Nom */}
              <div className="col-span-4 font-bold text-white">
                {product.name}
              </div>

              {/* Catégorie (On gère le JSON) */}
              <div className="col-span-3 text-gray-400 text-sm">
                <span className="px-2 py-1 border border-white/10 rounded-full bg-white/5">
                  {(product.category.name as any)['fr'] || 'N/A'}
                </span>
              </div>

              {/* Slug */}
              <div className="col-span-2 text-gray-500 text-xs font-mono">
                /{product.slug}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex justify-end gap-2">
                
                {/* Bouton Modifier (Redirige vers la page d'édition) */}
                <Link 
                  href={`/${locale}/admin/dashboard/${product.id}`}
                  className="p-2 text-gray-500 hover:text-viconol-primary hover:bg-viconol-primary/10 rounded transition-all"
                  title="Modifier"
                >
                  <Pencil className="w-5 h-5" />
                </Link>

                {/* Bouton Supprimer */}
                <form action={deleteProduct.bind(null, product.id)}>
                  <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all" title="Supprimer">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>

              </div>

            </div>
          ))}

          {products.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Aucun produit dans la base de données.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}