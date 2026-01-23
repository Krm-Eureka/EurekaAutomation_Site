"use client";

import { JsonLd, generateOrganizationSchema } from "@/components/seo/JsonLd";
import {
    ArrowRight, Cpu, Cog, Database, Truck, Zap, Activity,
    Target, Award, Users, Factory, Sparkles,
    Phone, Mail, MapPin
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { withBasePath } from "@/lib/utils";
import Image from "next/image";
import { Link } from '@/i18n/routing';
import VideoGallery from "@/components/sections/VideoGallery";
import videoDataRaw from "@/data/videos.json";

const videoData = Object.values(videoDataRaw).flat();

const clientLogos = [
    { name: "Daikin", logo: withBasePath("/images/logos/Daikin-logo.svg"), href: "https://www.daikin.co.th/" },
    { name: "Ford", logo: withBasePath("/images/logos/Ford-logo.svg"), href: "https://www.ford.co.th/" },
    { name: "Honda", logo: withBasePath("/images/logos/Honda-logo.svg"), href: "https://www.honda.co.th/" },
    { name: "Kawasaki", logo: withBasePath("/images/logos/Kawasaki-logo.jpg"), href: "https://www.kawasaki.co.th/th" },
    { name: "Mahle", logo: withBasePath("/images/logos/Mahle-logo.svg"), href: "https://www.mahle.com/" },
    { name: "Mitsubishi", logo: withBasePath("/images/logos/Mitsubishi-logo.svg"), href: "https://www.mitsubishi-motors.co.th/" },
    { name: "OR", logo: withBasePath("/images/logos/OR-logo.svg"), href: "https://www.pttplc.com/th" },
    { name: "Panasonic", logo: withBasePath("/images/logos/Panasonic-logo.svg"), href: "https://www.panasonic.com/" },
    { name: "Schneider Electric", logo: withBasePath("/images/logos/Schneider-Electric-logo.svg"), href: "https://www.se.com/" },
    { name: "Valeo", logo: withBasePath("/images/logos/Valeo-logo.png"), href: "https://www.valeo.com/en/" },
    { name: "Lumentum", logo: withBasePath("/images/logos/Lumentum-logo.png"), href: "https://www.lumentum.com/en" },
    { name: "Suzuki", logo: withBasePath("/images/logos/Suzuki-logo.png"), href: "https://www.marutisuzuki.com/" },
    { name: "MEK", logo: withBasePath("/images/logos/Mek-logo.jpg"), href: "https://www.mektec.co.th/" },
    { name: "Toshiba Carrier", logo: withBasePath("/images/logos/Toshiba-Carrier-logo.png"), href: "https://www.toshiba-carrier.co.th/" },
    { name: "Yamada", logo: withBasePath("/images/logos/Yamada-logo.jpg"), href: "https://www.yscthai.com/" },
    { name: "Visteon Thailand", logo: withBasePath("/images/logos/Visteon-logo.svg"), href: "https://www.visteon.com/overview/default.aspx" },
    { name: "Sappe TH", logo: withBasePath("/images/logos/Sappe_logo.svg"), href: "https://www.daikin.co.th/" },
];

export default function HomeClient({ locale }: { locale: string }) {
    const tHero = useTranslations('hero');
    const tHome = useTranslations('home');
    const tServices = useTranslations('home.services');
    const tAbout = useTranslations('about');
    const tProducts = useTranslations('products');
    const tContact = useTranslations('contact');

    const serviceKeys = ['custom_machines', 'ai_ml', 'automation', 'smart_logistics'] as const;
    const orgSchema = generateOrganizationSchema(locale);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    const serviceIcons = {
        ai_ml: Activity,
        automation: Zap,
        custom_machines: Cog,
        smart_logistics: Truck,
        plc: Cpu,
        cnc: Database
    };

    const valueIcons = [Target, Award, Users];
    const valueColors = ['bg-emerald-600', 'bg-zinc-900', 'bg-zinc-700'];
    const valueKeys = ['innovation', 'quality', 'partnership'] as const;

    return (
        <>
            <JsonLd data={orgSchema} />
            <div className="bg-white min-h-screen selection:bg-emerald-600 selection:text-white overflow-x-hidden">

                {/* 1. HERO SECTION */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-900">
                    <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                        <Image
                            src={withBasePath("/images/eureka-og.png")}
                            alt="Industrial Automation"
                            fill
                            className="object-cover opacity-90 scale-110"
                            priority
                            unoptimized
                        />
                        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>

                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                    </motion.div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="max-w-4xl"
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                                <span className="h-[2px] w-8 md:w-12 bg-emerald-500"></span>
                                <span className="text-emerald-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
                                    {tHero('certified')}
                                </span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                                Eureka <br />
                                <span className="text-transparent bg-clip-text bg-emerald-500 ">
                                    <span className="text-red-500">A</span>utomat<span className="text-red-500">i</span>on.
                                </span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-zinc-300 max-w-2xl mb-10 leading-relaxed font-light">
                                {tHero('subtitle')}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/#productsandservices"
                                    className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1"
                                >
                                    {tHero('cta')}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white hover:text-zinc-900 transition-all text-center hover:-translate-y-1"
                                >
                                    {tHero('contact')}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ delay: 2, duration: 2, repeat: Infinity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent"></div>
                    </motion.div>
                </section>

                {/* Industrial Trust Section */}
                <section className="py-16 sm:py-20 bg-zinc-900 text-white border-b border-zinc-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="grid lg:grid-cols-2 gap-16 items-start"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{useTranslations('industrialTrust')('title')}</h2>
                                <p className="text-lg text-zinc-400 leading-relaxed">
                                    {useTranslations('industrialTrust')('description')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                {[
                                    { k: 'headquarters', delay: 0 },
                                    { k: 'globalReach', delay: 0.1 },
                                    { k: 'exporting', delay: 0.2 },
                                    { k: 'coreFocus', delay: 0.3 }
                                ].map((item) => (
                                    <motion.div
                                        key={item.k}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: item.delay, duration: 0.5 }}
                                        className="space-y-2"
                                    >
                                        <div className="w-8 h-1 bg-emerald-500 mb-3"></div>
                                        <p className="font-semibold text-white uppercase text-xs tracking-wider opacity-70">{useTranslations('industrialTrust')(`${item.k}.label`)}</p>
                                        <p className="text-xl text-white font-medium">{useTranslations('industrialTrust')(`${item.k}.value`)}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-16 sm:py-20 lg:py-24 bg-zinc-200 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                            <motion.div
                                className="flex-1 space-y-8"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm border-b-2 border-emerald-100 pb-1 inline-block">
                                    {tAbout('tag')}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
                                    {tAbout('title')}
                                </h2>
                                <p className="text-xl text-zinc-600 leading-relaxed font-light">
                                    {tAbout('description')}
                                </p>

                                <div className="space-y-6 pt-6">
                                    {valueKeys.map((key, i) => {
                                        const Icon = valueIcons[i];
                                        return (
                                            <motion.div
                                                key={key}
                                                className="flex gap-6 items-start group"
                                                whileHover={{ x: 10 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className={`w-12 h-12 ${valueColors[i]} rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-zinc-900 mb-1">{tAbout(`values.${key}.title`)}</h3>
                                                    <p className="text-zinc-500 text-sm leading-relaxed">{tAbout(`values.${key}.desc`)}</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex-1 relative"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.div
                                    className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-zinc-100"
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* รูป Eureka OG */}
                                    <Image
                                        src={withBasePath("/images/hero-automation.png")}
                                        alt="Eureka Automation Facility"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block border border-zinc-100"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <p className="text-4xl font-black text-emerald-600 mb-1">20+</p>
                                    <p className="text-zinc-600 font-bold">Years of Excellence</p>
                                    <p className="text-zinc-400 text-sm mt-2">Delivering world-class automation solutions.</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="py-16 sm:py-20 lg:py-24 bg-zinc-950 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-zinc-500 font-mono tracking-[0.2em] uppercase text-sm mb-4 block">
                                {tHome('timeline.tag')}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                                {tHome('timeline.title')}
                            </h2>
                        </motion.div>

                        <div className="relative">
                            <motion.div
                                className="hidden md:block absolute top-8 left-10 right-10 h-[2px] bg-zinc-800"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            ></motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
                                {[
                                    { year: '2002', circle: 'Start' },
                                    { year: '2014', circle: 'Global' },
                                    { year: '2015', circle: 'Auto' },
                                    { year: '2019', circle: 'AI' }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative flex flex-col items-center text-center group"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2, duration: 0.5 }}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-600 group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-colors mb-6 z-10 relative">
                                            <div className="absolute inset-0 bg-emerald-500/50 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                                        </div>

                                        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors font-mono">{item.year}</h3>

                                        <div className="px-4">
                                            <p className="font-bold text-white mb-2 text-lg">{tHome(`timeline.milestones.${item.year}.title`)}</p>
                                            <p className="text-zinc-500 text-sm leading-relaxed">{tHome(`timeline.milestones.${item.year}.desc`)}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section - ปรับปรุงใหม่ */}
                <section id="productsandservices" className="py-16 sm:py-20 lg:py-24 bg-zinc-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-16 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3 block">
                                {tHome('capabilities_tag')}
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-6">{tHome('capabilities')}</h2>
                            <p className="text-lg sm:text-xl text-zinc-500">{tHome('transform_desc')}</p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {serviceKeys.map((key, index) => {
                                const Icon = serviceIcons[key];
                                const routeMap: { [key: string]: string } = {
                                    custom_machines: '/custom-machines',
                                    ai_ml: '/ai-solutions',
                                    automation: '/robotics',
                                    smart_logistics: '/logistics'
                                };
                                const route = routeMap[key];
                                return (
                                    <Link href={route} key={key} className="h-full block">
                                        <motion.div
                                            variants={itemVariants}
                                            className="group relative h-full flex flex-row sm:flex-col items-center sm:items-start bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden gap-5 sm:gap-0"
                                            whileHover={{ y: -10 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-zinc-50 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 mb-0 sm:mb-8 group-hover:bg-emerald-600 group-hover:rotate-6 transition-all duration-500">
                                                <Icon size={32} className="text-zinc-700 w-7 h-7 sm:w-8 sm:h-8 group-hover:text-white transition-colors duration-300" />
                                            </div>

                                            <div className="flex-1 min-w-0 sm:w-full flex flex-col h-full">
                                                <h3 className="relative text-lg sm:text-xl font-bold text-zinc-900 mb-1 sm:mb-4 group-hover:text-emerald-700 transition-colors line-clamp-1 sm:line-clamp-none">
                                                    {tServices(`${key}.title`)}
                                                </h3>

                                                <div className="relative text-zinc-500 leading-relaxed sm:mb-8 text-sm line-clamp-2 sm:line-clamp-3">
                                                    {tServices(`${key}.desc`)}
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-zinc-100 relative z-10 items-center justify-between hidden sm:flex">
                                                    <span className="text-sm font-bold text-zinc-400 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                                                        {tHome('learn_more')}
                                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="py-8 sm:py-10 lg:py-12 bg-white border-t border-zinc-100">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div>
                                <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">{tProducts('tag')}</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900">
                                    {tProducts('title')}
                                </h2>
                            </div>
                            <Link href="/#contact" className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-bold transition-all shrink-0">
                                {tProducts('view_catalogue')}
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div
                                className="group relative overflow-hidden rounded-[2.5rem] aspect-[16/9] cursor-pointer"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="absolute inset-0 bg-zinc-900 group-hover:scale-110 transition-transform duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 z-10">
                                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
                                        <Factory size={14} /> {tProducts('standard.tag')}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                        {tProducts('standard.title')}
                                    </h3>
                                    <p className="text-zinc-400 max-w-md">Ready-to-use automation units designed for efficiency.</p>
                                </div>
                                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all">
                                    <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative overflow-hidden rounded-[2.5rem] aspect-[16/9] cursor-pointer"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="absolute inset-0 bg-emerald-900 group-hover:scale-110 transition-transform duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 z-10">
                                    <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
                                        <Sparkles size={14} /> {tProducts('custom.tag')}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                        {tProducts('custom.title')}
                                    </h3>
                                    <p className="text-emerald-100/70 max-w-md">Tailor-made machines for complex manufacturing challenges.</p>
                                </div>
                                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-emerald-900 transition-all">
                                    <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Video Gallery Section */}
                <section id="showcase" className="py-8 sm:py-16 lg:py-24 bg-zinc-100 overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-12 space-y-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">
                                {tHome('showcase.tag')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
                                {tHome('showcase.title')}
                            </h2>
                            <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-light">
                                {tHome('showcase.description')}
                            </p>
                        </motion.div>

                        <VideoGallery videos={videoData} locale={locale} />
                    </div>
                </section>

                {/* Client Logos Section */}
                <section className="py-12 sm:py-16 border-y border-zinc-100 bg-white">
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">{tHome('trusted_by')}</span>
                    </div>

                    <div className="relative group/slider overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                        <div className="flex w-max animate-infinite-scroll group-hover/slider:pause-animation">
                            {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, i) => (
                                <Link
                                    key={i}
                                    href={client.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center min-w-[200px] px-8 transition-opacity hover:opacity-100 opacity-40 grayscale hover:grayscale-0 duration-500"
                                >
                                    <div className="relative w-32 h-16">
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
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes scroll-left {
                            from { transform: translateX(0); }
                            to { transform: translateX(-25%); }
                        }
                        .animate-infinite-scroll {
                            animation: scroll-left 80s linear infinite;
                        }
                        .pause-animation {
                            animation-play-state: paused !important;
                        }
                    `}} />
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-zinc-950 text-white relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]"></div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div
                                className="space-y-8"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 border border-emerald-800 rounded-full text-sm font-bold text-emerald-400">
                                    <Mail size={16} /> {tContact('tag')}
                                </div>
                                <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                                    {tContact('title')}
                                </h2>
                                <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-lg">
                                    {tContact('description')}
                                </p>

                                <div className="space-y-4 pt-4">
                                    {[
                                        { icon: Phone, label: tContact('call_us'), val: "+66 2 123 4567" },
                                        { icon: Mail, label: tContact('email_us'), val: "info@eureka-automation.com" },
                                        { icon: MapPin, label: tContact('visit_us'), val: "Pathum Thani, Thailand" }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
                                            whileHover={{ x: 10 }}
                                        >
                                            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
                                                <p className="font-medium text-white text-lg">{item.val}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 shadow-2xl"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{tHome('careers_cta.title')}</h3>
                                    <p className="text-zinc-400">We are always looking for talent.</p>
                                </div>
                                <Link
                                    href="/careers"
                                    className="flex items-center justify-between w-full p-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all group"
                                >
                                    <span>{tHome('careers_cta.button')}</span>
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ArrowRight size={20} />
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}