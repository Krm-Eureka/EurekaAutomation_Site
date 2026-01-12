import Link from "next/link";
import { Truck, Database, Network, ChevronRight, Activity, ArrowRight } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('solutions');
  const tNav = await getTranslations('nav');

  const solutions = [
    {
      icon: Truck,
      slug: "amr-agv",
      title: t('amr_agv.title'),
      description: t('amr_agv.tag'),
      features: t.raw('amr_agv.features') as string[],
    },
    {
      icon: Database,
      slug: "wms",
      title: t('wms.title'),
      description: t('wms.tag'),
      features: t.raw('wms.features') as string[],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-zinc-950 pt-48 pb-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
            <Activity size={14} className="text-emerald-400" /> {tNav('solutions')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {t('tag')}
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <div key={solution.slug} className="group p-10 bg-zinc-50 rounded-3xl border border-zinc-100 hover:border-emerald-500/20 hover:bg-white hover:shadow-2xl transition-all">
                  <div className="mb-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-zinc-900 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Icon size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">
                    {solution.title}
                  </h2>
                  <p className="text-zinc-600 leading-relaxed mb-8">
                    {solution.description}
                  </p>
                  <ul className="space-y-4 mb-10">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-500 font-medium">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/#contact`} className="inline-flex items-center gap-2 font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                    {locale === 'th' ? 'เริ่มต้นใช้งาน' : 'Get Started'} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
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
