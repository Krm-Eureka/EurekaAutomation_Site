import Link from "next/link";
import { Factory, Sparkles, ChevronRight, Package, Cog, ShieldCheck, HeartHandshake } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('products');
  const tNav = await getTranslations('nav');

  const categories = [
    {
      slug: "custom-machines",
      icon: Cog,
      title: t('custom.title'),
      description: t('custom.tag'),
      tagColor: "bg-emerald-500",
    },
    {
      slug: "standard-machines",
      icon: Factory,
      title: t('standard.title'),
      description: t('standard.tag'),
      tagColor: "bg-red-500",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-zinc-950 pt-48 pb-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/10 skew-x-12 translate-x-32"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
            <Package size={14} className="text-red-400" /> {tNav('products')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {t('tag')}
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.slug}
                  className="group relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[16/10] flex flex-col justify-end p-10 hover:shadow-2xl transition-all"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${category.tagColor} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>

                  <div className="relative z-20 space-y-4">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                      <Icon size={32} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{category.description}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {category.title}
                    </h2>
                    <button className="flex items-center gap-2 text-white/60 font-bold group-hover:text-white transition-colors">
                      {t('view_catalogue')} <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">{locale === 'en' ? 'Quality Assurance' : 'การรับประกันคุณภาพ'}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">ISO-certified manufacturing processes ensuring peak performance.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-600">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">{locale === 'en' ? 'Custom Engineering' : 'วิศวกรรมเฉพาะทาง'}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">Tailored solutions for complex manufacturing challenges.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-zinc-900">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">{locale === 'en' ? 'Expert Support' : 'การสนับสนุนจากผู้เชี่ยวชาญ'}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">Full after-sales maintenance and operator training programs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
