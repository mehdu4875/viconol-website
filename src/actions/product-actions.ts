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
  // Ici, logique d'upload de fichier (ex: vers Vercel Blob ou AWS S3)
  // Simulation des URLs pour l'exemple
  const imageUrl = "/uploads/placeholder.jpg"; 
  
  await prisma.product.create({
    data: {
      slug: data.get("name")!.toString().toLowerCase().replace(/ /g, "-"),
      name: data.get("name") as string,
      shortDesc: { fr: data.get("shortDescFr"), de: data.get("shortDescDe") },
      longDesc: { fr: data.get("longDescFr"), de: data.get("longDescDe") },
      imageUrl: imageUrl,
      categoryId: data.get("categoryId") as string,
      rangeId: data.get("rangeId") as string,
    }
  });

  revalidatePath('/products');
  revalidatePath('/admin/products');
}