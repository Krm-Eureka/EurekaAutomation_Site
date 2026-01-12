"use client";

import { JsonLd, generateOrganizationSchema } from "@/components/seo/JsonLd";
import {
    ArrowRight, Cpu, Cog, Database, Truck, Zap, Activity,
    Target, Award, Users, Factory, Sparkles, Package,
    Phone, Mail, MapPin, Send, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { withBasePath } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Client logos data
const clientLogos = [
    { name: "Alpha Tech", logo: withBasePath("/images/logos/client-1.png"), href: "https://www.google.com" },
    { name: "Sigma Automation", logo: withBasePath("/images/logos/client-2.png"), href: "https://www.google.com" },
    { name: "Omega Systems", logo: withBasePath("/images/logos/client-3.png"), href: "https://www.google.com" },
    { name: "Delta Robotics", logo: withBasePath("/images/logos/client-4.png"), href: "https://www.google.com" },
];

export default function HomeClient({ locale }: { locale: string }) {
    const tHero = useTranslations('hero');
    const tHome = useTranslations('home');
    const tServices = useTranslations('home.services');
    const tAbout = useTranslations('about');
    const tProducts = useTranslations('products');
    const tContact = useTranslations('contact');

    const serviceKeys = ['ai_ml', 'automation', 'custom_machines', 'smart_logistics', 'plc', 'cnc'] as const;
    const orgSchema = generateOrganizationSchema(locale);

    // Easing as specific tuple for Framer Motion
    const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: customEase }
    };

    const serviceIcons = {
        ai_ml: Activity,
        automation: Zap,
        custom_machines: Cog,
        smart_logistics: Truck,
        plc: Cpu,
        cnc: Database
    };

    // Brand color palette: Green, Red, Black, White
    const serviceColors = [
        { gradient: 'from-emerald-500 to-emerald-700', text: 'text-emerald-600', border: 'border-emerald-200' },
        { gradient: 'from-red-500 to-red-700', text: 'text-red-600', border: 'border-red-200' },
        { gradient: 'from-zinc-800 to-zinc-950', text: 'text-zinc-900', border: 'border-zinc-300' },
        { gradient: 'from-emerald-500 to-emerald-700', text: 'text-emerald-600', border: 'border-emerald-200' },
        { gradient: 'from-red-500 to-red-700', text: 'text-red-600', border: 'border-red-200' },
        { gradient: 'from-zinc-800 to-zinc-950', text: 'text-zinc-900', border: 'border-zinc-300' },
    ];

    const valueIcons = [Target, Award, Users];
    const valueColors = ['bg-emerald-600', 'bg-red-600', 'bg-zinc-900'];
    const valueKeys = ['innovation', 'quality', 'partnership'] as const;

    return (
        <>
            <JsonLd data={orgSchema} />
            <div className="bg-white min-h-screen selection:bg-emerald-600 selection:text-white">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/5 to-red-500/5 rounded-full blur-3xl"></div>
                    </div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: customEase }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white/80 mb-8">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                {tHero('certified')}
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                                {tHero('title')}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
                                {tHero('subtitle')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/#services"
                                    className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {tHero('cta')}
                                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white hover:text-zinc-900 transition-all"
                                >
                                    {tHero('contact')}
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                            <div className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-24 overflow-hidden bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <motion.div
                                className="flex-1 space-y-8"
                                initial={fadeIn.initial}
                                whileInView={fadeIn.whileInView}
                                viewport={fadeIn.viewport}
                                transition={fadeIn.transition}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-sm font-bold text-emerald-700 border border-emerald-200">
                                    <Sparkles size={16} /> {tAbout('tag')}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
                                    {tAbout('title')}
                                </h2>
                                <p className="text-lg text-zinc-600 leading-relaxed">
                                    {tAbout('description')}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                                    {valueKeys.map((key, i) => {
                                        const Icon = valueIcons[i];
                                        return (
                                            <motion.div
                                                key={key}
                                                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-zinc-100 group"
                                                whileHover={{ y: -5 }}
                                            >
                                                <div className={`w-12 h-12 ${valueColors[i]} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                                                    <Icon size={24} />
                                                </div>
                                                <h3 className="font-bold text-zinc-900">{tAbout(`values.${key}.title`)}</h3>
                                                <p className="text-sm text-zinc-500 mt-1">{tAbout(`values.${key}.desc`)}</p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex-1 w-full aspect-square lg:aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: customEase }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-zinc-900">
                                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white/30 text-center">
                                            <Factory size={120} strokeWidth={0.5} className="animate-pulse" />
                                            <p className="mt-4 text-xs tracking-widest uppercase italic font-bold text-white/50">{tAbout('placeholder')}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-24 bg-zinc-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16 space-y-4"
                            initial={fadeIn.initial}
                            whileInView={fadeIn.whileInView}
                            viewport={fadeIn.viewport}
                            transition={fadeIn.transition}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-zinc-700 border border-zinc-200 shadow-sm">
                                <Zap size={16} className="text-emerald-600" /> {tHome('capabilities_tag')}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">{tHome('capabilities')}</h2>
                            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">{tHome('transform_desc')}</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {serviceKeys.map((key, index) => {
                                const Icon = serviceIcons[key];
                                const color = serviceColors[index];
                                return (
                                    <motion.div
                                        key={key}
                                        className={`group relative p-8 bg-white rounded-2xl border ${color.border} hover:shadow-xl transition-all overflow-hidden cursor-pointer`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className={`w-14 h-14 bg-gradient-to-br ${color.gradient} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 mb-3">{tServices(`${key}.title`)}</h3>
                                        <p className="text-zinc-500 leading-relaxed mb-6 line-clamp-3">
                                            {tServices(`${key}.desc`)}
                                        </p>
                                        <div className={`flex items-center text-sm font-bold ${color.text} group-hover:gap-3 transition-all`}>
                                            {tHome('learn_more')} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="py-24 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
                            initial={fadeIn.initial}
                            whileInView={fadeIn.whileInView}
                            viewport={fadeIn.viewport}
                            transition={fadeIn.transition}
                        >
                            <div className="max-w-2xl space-y-4">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full text-sm font-bold text-red-700 border border-red-200">
                                    <Package size={16} /> {tProducts('tag')}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
                                    {tProducts('title')}
                                </h2>
                            </div>
                            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-lg hover:shadow-emerald-500/25 transition-all shrink-0">
                                {tProducts('view_catalogue')}
                            </button>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                className="group relative overflow-hidden rounded-3xl aspect-[16/10] cursor-pointer shadow-xl"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-zinc-900"></div>
                                <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2">
                                    <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-widest">
                                        <Sparkles size={14} /> {tProducts('custom.tag')}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {tProducts('custom.title')}
                                    </h3>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <Cog size={160} className="animate-[spin_20s_linear_infinite] text-white" />
                                </div>
                            </motion.div>
                            <motion.div
                                className="group relative overflow-hidden rounded-3xl aspect-[16/10] cursor-pointer shadow-xl"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-zinc-900"></div>
                                <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                <div className="absolute bottom-8 left-8 right-8 z-20 space-y-2">
                                    <div className="flex items-center gap-2 text-red-200 text-xs font-bold uppercase tracking-widest">
                                        <Factory size={14} /> {tProducts('standard.tag')}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">
                                        {tProducts('standard.title')}
                                    </h3>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <Package size={160} className="text-white" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Customer Logo Slider Section */}
                <section className="py-20 border-y border-zinc-100 overflow-hidden bg-white">
                    <motion.div
                        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12"
                        initial={fadeIn.initial}
                        whileInView={fadeIn.whileInView}
                        viewport={fadeIn.viewport}
                        transition={fadeIn.transition}
                    >
                        <div className="text-center space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-400">{tHome('trusted_by')}</h3>
                            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-red-500 mx-auto rounded-full"></div>
                        </div>
                    </motion.div>

                    <div className="relative group/slider overflow-hidden py-4">
                        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                        <div className="flex w-max animate-infinite-scroll group-hover/slider:pause-animation">
                            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, i) => (
                                <Link
                                    key={i}
                                    href={client.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center min-w-[250px] px-12 group/logo transition-all duration-500"
                                >
                                    <div className="relative w-40 h-20 grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-500">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <style dangerouslySetInnerHTML={{
                            __html: `
              @keyframes scroll-left {
                from { transform: translateX(0); }
                to { transform: translateX(-25%); }
              }
              .animate-infinite-scroll {
                animation: scroll-left 40s linear infinite;
              }
              .pause-animation {
                animation-play-state: paused !important;
              }
            `}} />
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-24 bg-zinc-950 text-white overflow-hidden relative">
                    {/* Background Effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-20">
                            <motion.div
                                className="space-y-12"
                                initial={fadeIn.initial}
                                whileInView={fadeIn.whileInView}
                                viewport={fadeIn.viewport}
                                transition={fadeIn.transition}
                            >
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-bold text-white/70">
                                        <Mail size={16} className="text-emerald-400" /> {tContact('tag')}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                                        {tContact('title')}
                                    </h2>
                                    <p className="text-lg text-white/60 max-w-lg leading-relaxed">
                                        {tContact('description')}
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { icon: Phone, label: tContact('call_us'), val: "+66 XX XXX XXXX", color: 'bg-emerald-600' },
                                        { icon: Mail, label: tContact('email_us'), val: "info@eureka-automation.com", color: 'bg-red-600' },
                                        { icon: MapPin, label: tContact('visit_us'), val: "Bangkok, Thailand", color: 'bg-zinc-700' }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-center gap-6 group cursor-pointer"
                                            whileHover={{ x: 10 }}
                                        >
                                            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                <item.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
                                                <p className="font-medium text-white text-lg">{item.val}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{tContact('form.name')}</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-white placeholder:text-white/30" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{tContact('form.email')}</label>
                                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-white placeholder:text-white/30" />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{tContact('form.subject')}</label>
                                        <div className="relative">
                                            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-emerald-500/50 transition-all appearance-none text-white">
                                                <option className="bg-zinc-900">{tContact('form.options.custom')}</option>
                                                <option className="bg-zinc-900">{tContact('form.options.cnc')}</option>
                                                <option className="bg-zinc-900">{tContact('form.options.wms')}</option>
                                                <option className="bg-zinc-900">{tContact('form.options.general')}</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                                <ChevronRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/50 ml-1">{tContact('form.message')}</label>
                                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none text-white placeholder:text-white/30"></textarea>
                                    </div>
                                    <button type="submit" className="sm:col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]">
                                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> {tContact('form.submit')}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
