"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isAdmin } from "./admin-auth";

// --- 1. CRÉER UN PRODUIT ---
export async function createProduct(formData: FormData) {
  if (!await isAdmin()) throw new Error("Non autorisé");

  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/ /g, "-");
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;
  const rangeId = formData.get("rangeId") as string;

  const shortDescFr = formData.get("shortDescFr") as string;
  const shortDescDe = formData.get("shortDescDe") as string;
  const longDescFr = formData.get("longDescFr") as string;
  const longDescDe = formData.get("longDescDe") as string;

  await prisma.product.create({
    data: {
      name,
      slug,
      imageUrl,
      categoryId,
      rangeId: rangeId || null,
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
    }
  });

  revalidatePath("/", "layout");
}

// --- 2. MODIFIER UN PRODUIT ---
export async function updateProduct(formData: FormData) {
  if (!await isAdmin()) throw new Error("Non autorisé");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;
  const rangeId = formData.get("rangeId") as string;
  
  const shortDescFr = formData.get("shortDescFr") as string;
  const shortDescDe = formData.get("shortDescDe") as string;
  const longDescFr = formData.get("longDescFr") as string;
  const longDescDe = formData.get("longDescDe") as string;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      imageUrl,
      categoryId,
      rangeId: rangeId || null,
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
    }
  });

  revalidatePath("/", "layout");
}

// --- 3. SUPPRIMER UN PRODUIT ---
export async function deleteProduct(productId: string) {
  if (!await isAdmin()) throw new Error("Non autorisé");

  await prisma.product.delete({
    where: { id: productId }
  });

  revalidatePath("/", "layout");
}