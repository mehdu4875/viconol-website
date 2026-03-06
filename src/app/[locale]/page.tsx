import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FlaskConical, Zap, Globe, ArrowRight, Cog, Truck, Car, Anchor } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Home');
  const tNavbar = useTranslations('Navbar');
  const tProducts = useTranslations('Products');
  const tContact = useTranslations('Contact');

  const universes = [
    { id: 'VL', icon: Car, title: "Automotive", descKey: 'stats.tech_desc', image: '/images/photo voiture .jpeg' },
    { id: 'IN', icon: Cog, title: "Industrie", descKey: 'stats.tech_desc', image: '/images/Industrie .jpeg' },
    { id: 'PL', icon: Truck, title: "Heavy Duty", descKey: 'stats.tech_desc', image: '/images/Photo camio.jpeg' },
    { id: 'NA', icon: Anchor, title: "Nautisme & Jetski", descKey: 'stats.tech_desc', image: '/images/labo jet.png' },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-[#050505] overflow-x-hidden pt-20 md:pt-28">
      
      {/* 1. HERO SECTION SOMBRE */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Viconol Background" fill className="object-cover object-center animate-slow-zoom" priority sizes="100vw" quality={90} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center pt-20">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-viconol-primary animate-pulse"></span>
            <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">{t('badge')}</span>
          </div>
          
          <div className="relative mb-12 animate-fade-in-up delay-100">
            <div className="absolute inset-0 bg-viconol-primary/20 blur-[60px] rounded-full scale-110"></div>
            <div className="relative w-[280px] h-[140px] md:w-[600px] md:h-[300px]">
              <Image src="/images/logo.png" alt="VICONÖL Logo" fill className="object-contain" priority sizes="(max-width: 768px) 280px, 600px" />
            </div>
          </div>
          
          <div className="flex animate-fade-in-up delay-300 w-full md:w-auto px-4 justify-center mt-6">
            <Link href={`/${locale}/products`} className="flex items-center justify-center gap-2 bg-viconol-primary text-[#050505] px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              {t('cta')} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. NOS UNIVERS */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-viconol-primary text-xs font-bold tracking-[0.3em] uppercase mb-2">{tNavbar('products')}</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase">{tProducts('title')}</h3>
          </div>
          <Link href={`/${locale}/products`} className="hidden md:flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
             {tProducts('discover')} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-4 md:gap-8 md:overflow-visible">
          {universes.map((item) => (
            <Link key={item.id} href={`/${locale}/products?cat=${item.id}`} className="group min-w-[280px] md:min-w-0 snap-center relative aspect-[3/4] bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-viconol-primary/30 transition-all duration-500 shadow-xl">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <item.icon className="w-10 h-10 text-viconol-primary mb-4" />
                <h4 className="text-2xl font-bold text-white uppercase mb-2 italic">{item.title}</h4>
                <p className="text-gray-400 text-sm font-medium mb-4 line-clamp-2">{t(item.descKey)}</p>
                <div className="flex items-center text-viconol-primary text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  {tProducts('discover')} <ArrowRight className="w-3 h-3 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. STATS & CONFIANCE */}
      <section className="py-20 border-t border-white/5 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="p-8 border-l-2 border-viconol-primary/30 bg-white/[0.02] rounded-r-2xl shadow-sm">
                <FlaskConical className="w-12 h-12 text-viconol-primary mb-6 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{t('stats.iso_title')}</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">{t('stats.iso_desc')}</p>
              </div>
              <div className="p-8 border-l-2 border-viconol-primary/30 bg-white/[0.02] rounded-r-2xl shadow-sm">
                <Zap className="w-12 h-12 text-viconol-primary mb-6 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{t('stats.tech_title')}</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">{t('stats.tech_desc')}</p>
              </div>
              <div className="p-8 border-l-2 border-viconol-primary/30 bg-white/[0.02] rounded-r-2xl shadow-sm">
                <Globe className="w-12 h-12 text-viconol-primary mb-6 mx-auto md:mx-0" />
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{t('stats.global_title')}</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">{t('stats.global_desc')}</p>
              </div>
          </div>
        </div>
      </section>

      {/* 4. HISTOIRE */}
      <section id="society" className="py-20 md:py-32 relative overflow-hidden bg-[#050505]">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-viconol-primary/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-700"></div>
                <Image src="/images/image usine ligne de remplissage .png" alt="Usine Viconol" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h2 className="text-viconol-primary text-xs font-bold tracking-[0.3em] uppercase mb-4">{t('history')}</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-none italic uppercase">
                {t('history_title')}<br/>
                <span className="text-2xl md:text-4xl font-light text-gray-400 tracking-normal not-italic">{t('history_made_in')}</span>
              </h3>
              <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
                <p className="border-l border-viconol-primary pl-6">{t('history_text_1')}</p>
                <p className="pl-6">{t('history_text_2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT */}
      <section id="contact" className="py-16 md:py-32 bg-[#080808] border-t border-white/5 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-viconol-primary text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 italic">{tNavbar('contact')}</h2>
            <h3 className="text-3xl md:text-4xl md:text-5xl font-black text-white uppercase">{tContact('title')}</h3>
          </div>
          <div className="max-w-3xl mx-auto w-full">
            <ContactForm translations={{
                name: tContact('form_name'), email: tContact('form_email'), message: tContact('form_message'), placeholder: tContact('form_placeholder'), send: tContact('send_btn'), sending: tContact('sending'), success: tContact('success_msg'), error: tContact('error_msg')
              }} 
            />
          </div>
        </div>
      </section>
    </main>
  );
}