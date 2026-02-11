import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ShieldCheck, Zap, Globe, Award, MapPin, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Home');
  const tFooter = useTranslations('Footer');

  // --- 🛠️ CONFIGURATION MAINTENANCE 🛠️ ---
  const isMaintenanceMode = true; 

  if (isMaintenanceMode) {
    return (
      <main className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center text-center px-4">
        
        {/* Logo agrandi (w-80 sur mobile, w-[500px] sur PC) */}
        <div className="relative w-80 h-40 md:w-[500px] md:h-[250px] mb-12 animate-pulse">
          <Image 
            src="/images/logo.png" 
            alt="VICONÖL Logo" 
            fill 
            className="object-contain" 
            priority
          />
        </div>

        {/* (Le titre H1 VICONÖL a été supprimé ici) */}

        {/* Message EN ALLEMAND */}
        <div className="max-w-md space-y-4">
          <h2 className="text-xl md:text-3xl text-viconol-primary font-bold uppercase tracking-widest">
            Webseite im Aufbau
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            Wir arbeiten derzeit an unserem neuen Online-Erlebnis.
            Besuchen Sie uns bald wieder.
          </p>
        </div>

        {/* Petit trait décoratif */}
        <div className="w-24 h-1 bg-viconol-primary mt-12 rounded-full opacity-50"></div>
      </main>
    );
  }

  // --- 🌟 TON SITE NORMAL 🌟 ---
  return (
    <main className="flex flex-col min-h-screen bg-viconol-dark">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100dvh] md:h-[90vh] flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bg.jpg" 
            alt="Viconol Background" 
            fill 
            className="object-cover object-center opacity-30 mix-blend-soft-light grayscale-[20%]" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-viconol-dark via-viconol-dark/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-viconol-primary/30 bg-black/50 backdrop-blur-md shadow-[0_0_30px_-5px_rgba(212,175,55,0.3)]">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-viconol-primary" />
            <span className="text-viconol-primary text-[10px] md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase">
              {t('badge')}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-black mb-6 md:mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-viconol-primary via-[#FCEEAC] to-viconol-warning drop-shadow-sm leading-tight px-2">
            {t('hero_title')}
          </h1>
          
          <div className="max-w-3xl mx-auto mb-8 md:mb-12 space-y-4 px-4">
            <p className="text-lg md:text-3xl text-white font-light leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <Link href={`/${locale}/products`} className="group relative inline-flex items-center gap-3 md:gap-4 px-8 py-4 md:px-12 md:py-5 bg-viconol-primary text-black font-black text-sm md:text-lg uppercase tracking-widest rounded-sm overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <span className="relative z-10">{t('cta')}</span>
            <Zap className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:rotate-12 transition-transform" />
            <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
          </Link>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] border-t border-viconol-primary/10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="group p-8 rounded-sm bg-white/[0.02] border border-white/5 hover:border-viconol-primary/40 transition-all duration-500">
                <Zap className="text-viconol-metal w-10 h-10 mb-6 group-hover:text-viconol-primary transition-colors" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{t('stats.tech_title')}</h3>
                <p className="text-viconol-metal font-light text-sm md:text-base">{t('stats.tech_desc')}</p>
              </div>
              <div className="group p-8 rounded-sm bg-white/[0.02] border border-white/5 hover:border-viconol-primary/40 transition-all duration-500">
                <ShieldCheck className="text-viconol-metal w-10 h-10 mb-6 group-hover:text-viconol-primary transition-colors" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{t('stats.iso_title')}</h3>
                <p className="text-viconol-metal font-light text-sm md:text-base">{t('stats.iso_desc')}</p>
              </div>
              <div className="group p-8 rounded-sm bg-white/[0.02] border border-white/5 hover:border-viconol-primary/40 transition-all duration-500">
                <Globe className="text-viconol-metal w-10 h-10 mb-6 group-hover:text-viconol-primary transition-colors" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{t('stats.global_title')}</h3>
                <p className="text-viconol-metal font-light text-sm md:text-base">{t('stats.global_desc')}</p>
              </div>
          </div>
        </div>
      </section>

      {/* --- SOCIÉTÉ SECTION --- */}
      <section id="society" className="py-16 md:py-32 relative overflow-hidden bg-viconol-dark scroll-mt-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-viconol-primary/5 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-viconol-primary text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4">{t('history')}</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 md:mb-8 leading-tight">
                {t('history_title')} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-viconol-primary to-viconol-warning">{t('history_made_in')}</span>
              </h3>
              <div className="space-y-6 text-gray-400 font-light leading-relaxed text-base md:text-lg">
                <p>{t('history_text_1')}</p>
                <p>{t('history_text_2')}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-[500px] relative rounded-sm overflow-hidden border border-white/10">
              <Image src="/images/hero-bg.jpg" alt="Usine Viconol" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-16 md:py-32 bg-[#080808] border-t border-white/5 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-viconol-primary text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4">{t('contact_header')}</h2>
            <h3 className="text-3xl md:text-4xl md:text-5xl font-black text-white">{t('contact_title')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-viconol-panel p-8 md:p-10 rounded-sm border border-white/5 text-center">
              <MapPin className="w-8 h-8 mx-auto mb-6 text-viconol-primary" />
              <h4 className="text-white font-bold text-lg md:text-xl mb-4">{t('contact_cards.address_title')}</h4>
              <p className="text-gray-400 text-sm md:text-base">{t('contact_cards.address_text')}</p>
            </div>
            <div className="bg-viconol-panel p-8 md:p-10 rounded-sm border border-white/5 text-center">
              <Mail className="w-8 h-8 mx-auto mb-6 text-viconol-primary" />
              <h4 className="text-white font-bold text-lg md:text-xl mb-4">{t('contact_cards.support_title')}</h4>
              <p className="text-gray-400 text-sm md:text-base font-light mb-2">info@viconol.de</p>
            </div>
            <div className="bg-viconol-panel p-8 md:p-10 rounded-sm border border-white/5 text-center">
              <Clock className="w-8 h-8 mx-auto mb-6 text-viconol-primary" />
              <h4 className="text-white font-bold text-lg md:text-xl mb-4">{t('contact_cards.hours_title')}</h4>
              <p className="text-gray-400 text-sm md:text-base font-light">{t('contact_cards.hours_text')}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-black border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm">© 2024 VICONÖL Lubricants. {tFooter('rights')}</p>
      </footer>
    </main>
  );
}