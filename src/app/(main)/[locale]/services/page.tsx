import Link from "next/link";
import { Wrench, Zap, Settings, Code, Radio, Package, ArrowRight, Sparkles } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('capabilities'),
    description: t('transform_desc'),
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        'en': '/en/services',
        'th': '/th/services',
      },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tNav = await getTranslations('nav');
  const tServices = await getTranslations('home.services');

  const serviceKeys = ['ai_ml', 'automation', 'custom_machines', 'smart_logistics', 'plc', 'cnc'] as const;
  const serviceIcons = {
    ai_ml: Zap,
    automation: Settings,
    custom_machines: Wrench,
    smart_logistics: Package,
    plc: Code,
    cnc: Radio
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-zinc-950 pt-48 pb-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
            <Sparkles size={14} className="text-emerald-400" /> {tNav('services')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            {t('capabilities')}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {t('transform_desc')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map((key) => {
              const Icon = serviceIcons[key];
              return (
                <div key={key} className="group p-10 bg-white rounded-3xl border border-zinc-100 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all">
                  <div className="mb-8 w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-900 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">
                    {tServices(`${key}.title`)}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed mb-8">
                    {tServices(`${key}.desc`)}
                  </p>
                  <Link href={`/${locale}/#services`} className="inline-flex items-center font-bold text-zinc-900 hover:text-emerald-600 transition-colors">
                    {t('learn_more')} <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
