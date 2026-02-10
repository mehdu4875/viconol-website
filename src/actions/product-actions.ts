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

// ADMIN: Créer un produit
export async function createProduct(data: FormData) {
  // 1. Extraction et sécurisation des données
  // "as string" dit à TypeScript : "Je te promets que c'est du texte"
  const name = data.get("name") as string;
  
  // Génération du slug (gestion du cas où le nom serait vide)
  let slug = data.get("slug") as string;
  if (!slug && name) {
    slug = name.toLowerCase().replace(/ /g, "-");
  } else if (!slug) {
    slug = `product-${Date.now()}`; // Fallback ultime
  }
  
  const imageUrl = (data.get("imageUrl") as string) || "/images/placeholder.jpg";
  const categoryId = data.get("categoryId") as string;
  const rangeId = data.get("rangeId") as string;

  const shortDescFr = data.get("shortDescFr") as string;
  const shortDescDe = data.get("shortDescDe") as string;
  const longDescFr = data.get("longDescFr") as string;
  const longDescDe = data.get("longDescDe") as string;

  // 2. Création en base de données
  await prisma.product.create({
    data: {
      slug,
      name,
      // Construction propre du JSON
      shortDesc: { 
        fr: shortDescFr || "", 
        de: shortDescDe || "",
        en: shortDescFr || "" 
      },
      longDesc: { 
        fr: longDescFr || "", 
        de: longDescDe || "",
        en: longDescFr || "" 
      },
      imageUrl,
      categoryId,
      // Si rangeId est vide ou "null", on envoie null à la DB
      rangeId: rangeId && rangeId !== "null" ? rangeId : null,
    }
  });

  revalidatePath('/products');
  revalidatePath('/admin/products');
}