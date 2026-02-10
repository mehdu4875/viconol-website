'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Récupérer les produits pour le catalogue
export async function getProducts(filters?: { categoryId?: string; rangeId?: string }) {
  const where: any = {};
  if (filters?.categoryId) where.categoryId = filters.categoryId;
  if (filters?.rangeId) where.rangeId = filters.rangeId;

  return await prisma.product.findMany({
    where,
    include: { category: true, range: true },
    orderBy: { createdAt: 'desc' }
  });
}

// Récupérer un produit par slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: { category: true, range: true }
  });
}

// ADMIN: Créer un produit (Correction des types ici)
export async function createProduct(data: FormData) {
  // Image placeholder par défaut si pas d'upload
  const imageUrl = "/uploads/placeholder.jpg"; 
  
  // 1. On récupère les valeurs en forçant le type string
  const name = data.get("name") as string;
  // Génération slug sécurisée
  const slug = name ? name.toLowerCase().replace(/ /g, "-") : "produit-sans-nom";
  
  const shortDescFr = data.get("shortDescFr") as string;
  const shortDescDe = data.get("shortDescDe") as string;
  const longDescFr = data.get("longDescFr") as string;
  const longDescDe = data.get("longDescDe") as string;
  
  const categoryId = data.get("categoryId") as string;
  const rangeId = data.get("rangeId") as string;

  await prisma.product.create({
    data: {
      slug,
      name,
      // 2. On construit les objets JSON proprement
      shortDesc: { 
        fr: shortDescFr || "", 
        de: shortDescDe || "",
        en: shortDescFr || "" // Fallback
      },
      longDesc: { 
        fr: longDescFr || "", 
        de: longDescDe || "",
        en: longDescFr || "" // Fallback
      },
      imageUrl: imageUrl,
      categoryId: categoryId,
      // Si rangeId est vide, on met null
      rangeId: rangeId || null,
    }
  });

  revalidatePath('/products');
  revalidatePath('/admin/products');
}