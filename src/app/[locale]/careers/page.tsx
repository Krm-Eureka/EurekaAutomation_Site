import { setRequestLocale, getTranslations } from "next-intl/server";
import { CareersForm } from "@/components/sections/CareersForm";
import { routing } from '@/i18n/routing';
import { Briefcase, MapPin, Clock, ChevronRight, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'careers' });
    return {
        title: `${t('title')} | Eureka Automation`,
        description: t('subtitle'),
    };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('careers');

    // Retrieve positions using the correct method for raw arrays/objects if needed or mapped
    // In next-intl, for arrays we often have to handle it carefully or use index-based access if standard t('positions') returns a string.
    // However, if we defined them as objects in json, we can iterate if we have a known structure.
    const positionKeys = ['plc-eng', 'mech-des', 'full-stack'];
    const benefits = t.raw('benefits_list') as string[];

    return (
        <div className="bg-white min-h-screen">
            {/* Dark Hero Section */}
            <section className="bg-zinc-950 pt-48 pb-24 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900/50 skew-x-12 translate-x-32 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
                        // Join Eureka Automation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8 tracking-tight">
                                {t('benefits')}
                            </h2>
                            <div className="space-y-6">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-950 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-lg text-zinc-600 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-zinc-100 rounded-3xl aspect-video relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                                <span className="text-white/10 text-9xl font-black italic select-none">EUREKA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-24 bg-zinc-50 border-y border-zinc-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                            {t('open_positions')}
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        {positionKeys.map((key) => {
                            // Find the position in the translation data
                            // Note: This logic assumes positions is an array in the raw data
                            const positions = t.raw('positions') as any[];
                            const pos = positions.find(p => p.id === key);

                            if (!pos) return null;

                            return (
                                <div key={key} className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                                    {pos.dept}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
                                                    <MapPin size={14} /> {pos.location}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-zinc-400 text-sm">
                                                    <Clock size={14} /> {pos.type}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                                                {pos.title}
                                            </h3>
                                            <p className="text-zinc-500 max-w-2xl leading-relaxed">
                                                {pos.desc}
                                            </p>
                                        </div>
                                        <div className="shrink-0 flex items-center md:flex-col gap-4">
                                            <a
                                                href="#apply"
                                                className="px-8 py-3 bg-zinc-900 text-white rounded-full font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 group/btn"
                                            >
                                                Apply Now <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            <section id="apply" className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">Apply Today</h2>
                        <p className="text-lg text-zinc-500">Submit your details and we'll get back to you soon.</p>
                    </div>
                    <CareersForm />
                </div>
            </section>
        </div>
    );
}
