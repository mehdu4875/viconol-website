"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isAdmin } from "./admin-auth";

export async function deleteProduct(productId: string) {
  // Sécurité : On vérifie encore si c'est l'admin
  if (!await isAdmin()) throw new Error("Non autorisé");

  await prisma.product.delete({
    where: { id: productId }
  });

  // On rafraichit les pages pour voir la disparition
  revalidatePath("/"); 
}
// ... imports existants (prisma, isAdmin, revalidatePath)

// Ajoute ça à la suite dans src/actions/admin-products.ts :

export async function updateProduct(formData: FormData) {
  // 1. Vérif Admin
  if (!await isAdmin()) throw new Error("Non autorisé");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;
  
  // Récupération des descriptions multilingues
  const shortDescFr = formData.get("shortDescFr") as string;
  const shortDescDe = formData.get("shortDescDe") as string;
  const longDescFr = formData.get("longDescFr") as string;
  const longDescDe = formData.get("longDescDe") as string;

  // 2. Mise à jour en Base de Données
  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      imageUrl,
      categoryId,
      // On reconstruit le JSON pour les langues
      shortDesc: { fr: shortDescFr, de: shortDescDe, en: shortDescFr }, // Fallback EN = FR
      longDesc: { fr: longDescFr, de: longDescDe, en: longDescFr },
    }
  });

  // 3. Rafraîchir le cache
  revalidatePath("/", "layout");
}