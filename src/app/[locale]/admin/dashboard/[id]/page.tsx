import { prisma } from "@/lib/db";
import { isAdmin } from "@/actions/admin-auth";
import { redirect, notFound } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";

export default async function EditProductPage({ 
  params: { locale, id } 
}: { 
  params: { locale: string; id: string } 
}) {
  // 1. Vérif Admin
  const isAuth = await isAdmin();
  if (!isAuth) redirect(`/${locale}/admin`);

  // 2. Récupérer le produit et les catégories
  const product = await prisma.product.findUnique({ where: { id } });
  const categories = await prisma.category.findMany();

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 pt-12">
      <AdminProductForm product={product} categories={categories} locale={locale} />
    </div>
  );
}