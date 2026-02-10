"use client";

import { usePathname } from "next/navigation";

export default function AdminHiddenNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Si on est dans l'admin, on cache le contenu (la navbar)
  if (pathname?.includes("/admin")) return null;
  return <>{children}</>;
}