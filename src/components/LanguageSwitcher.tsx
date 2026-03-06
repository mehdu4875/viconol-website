"use client";
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    if (locale === newLocale) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || '/');
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-[#111111] border border-white/10 rounded-full shadow-sm">
      <button onClick={() => switchLanguage('fr')} aria-label="FR" className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 ${locale === 'fr' ? 'bg-viconol-primary text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>FR</button>
      <button onClick={() => switchLanguage('de')} aria-label="DE" className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black tracking-wider transition-all duration-300 ${locale === 'de' ? 'bg-viconol-primary text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>DE</button>
    </div>
  );
}