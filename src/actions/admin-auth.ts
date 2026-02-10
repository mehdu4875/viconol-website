"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "viconol_admin_session";

// 1. Vérifier le mot de passe et créer la session
export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;

  if (password === process.env.ADMIN_PASSWORD) {
    // Si mot de passe OK, on crée un cookie qui dure 24h
    cookies().set(COOKIE_NAME, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
      path: "/",
    });
    return { success: true };
  } else {
    return { success: false, error: "Mot de passe incorrect" };
  }
}

// 2. Se déconnecter
export async function logoutAdmin() {
  cookies().delete(COOKIE_NAME);
  redirect("/");
}

// 3. Vérifier si on est admin (pour protéger les pages)
export async function isAdmin() {
  const cookieStore = cookies();
  return cookieStore.has(COOKIE_NAME);
}