"use client";

import { JsonLd, generateOrganizationSchema } from "@/components/seo/JsonLd";
import {
    ArrowRight, Cpu, Cog, Database, Truck, Zap,
    Target, Award, Users,
    Phone, Mail, MapPin,
    MessageSquare,
    ChevronLeft, ChevronRight,
    Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { withBasePath } from "@/lib/utils";
import Image from "next/image";
import CountUp from 'react-countup';
import { Link } from '@/i18n/routing';
import VideoGallery from "@/components/sections/VideoGallery";
import ContactModal from "@/components/modals/ContactModal";
import { GAS_WEB_APP_URL } from "@/lib/constants";
import { clientLogos } from "@/data/clients";
import videoDataRaw from "@/data/videos.json";
import newsDataRaw from "@/data/news.json";

interface Video {
    title: { th: string; en: string };
    thumbnail: string;
    youtubeUrl: string;
    category: { th: string; en: string };
    description: { th: string; en: string }[];
}

interface NewsItem {
    id?: string;
    title: string;
    description: string;
    date?: string; // Display date (e.g., "25-27 ก.พ. 2569")
    postedDate?: string; // Parseable date for "New" badge (e.g., "2026-03-24")
    link?: string;
    image?: string;
    full_content?: string;
    images?: string[];
}

const videoData = (Object.entries(videoDataRaw)
    .filter(([key]) => !key.startsWith('_'))
    .flatMap(([, value]) => value) as Video[]);

export default function HomeClient({ locale }: { locale: string }) {
    const tHero = useTranslations('hero');
    const tHome = useTranslations('home');
    const tServices = useTranslations('home.services');
    const tAbout = useTranslations('about');
    const tContact = useTranslations('contact');
    const tTrust = useTranslations('industrialTrust');

    const [selectedContact, setSelectedContact] = useState<{ type: string, value: string, label: string, href?: string } | null>(null);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Contact Form State
    const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [contactRetryCount, setContactRetryCount] = useState(0);
    const [contactErrorMessage, setContactErrorMessage] = useState('');
    const [contactFormData, setContactFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactStatus('loading');
        setContactRetryCount(0);

        const payload = {
            ...contactFormData,
            name: `${contactFormData.firstName} ${contactFormData.lastName}`,
            type: 'contact',
            recipient: 'witsarut.sx@gmail.com',
            _origin: typeof window !== 'undefined' ? window.location.origin : ''
        };

        console.info("Submitting contact request...");
        
        const MAX_RETRIES = 3;
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                await fetch(GAS_WEB_APP_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...payload,
                        key: process.env.NEXT_PUBLIC_GAS_API_KEY
                    }),
                });

                // Since mode is 'no-cors', we can't reliably check response.ok or status
                // But we assume if it finishes without error, it's sent to the queue
                setContactStatus('success');
                setContactFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' });
                break;
            } catch (err: unknown) {
                if (attempt === MAX_RETRIES) {
                    setContactStatus('error');
                    setContactErrorMessage(err instanceof Error ? err.message : 'Submission failed');
                } else {
                    setContactRetryCount(attempt);
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            }
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(err => {
                console.log("Autoplay was prevented:", err);
            });
        }
    }, []);

    useEffect(() => {
        const loadNews = () => {
            try {
                const typedNewsData = newsDataRaw as unknown as Record<string, {
                    title: { th: string; en: string };
                    date: { th: string; en: string };
                    desc: { th: string; en: string };
                    postedDate: string;
                    images?: string[];
                }>;
                const keys = Object.keys(newsDataRaw).filter(key => !key.startsWith('_'));
                const localizedItems: NewsItem[] = keys.map((key: string) => {
                    const itemData = typedNewsData[key];
                    return {
                        id: key,
                        title: itemData.title[locale as 'th' | 'en'] || itemData.title.en,
                        date: itemData.date[locale as 'th' | 'en'] || itemData.date.en,
                        description: itemData.desc[locale as 'th' | 'en'] || itemData.desc.en,
                        postedDate: itemData.postedDate,
                        image: itemData.images?.[0] || '',
                        images: itemData.images || []
                    };
                }).sort((a: NewsItem, b: NewsItem) => {
                    const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
                    const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
                    return dateB - dateA;
                });
                setNews(localizedItems);
            } catch (error) {
                console.error("Failed to load news:", error);
            } finally {
                setIsLoadingNews(false);
            }
        };
        loadNews();
    }, [locale]);

    const isNew = (postedDate?: string) => {
        if (!postedDate) return false;
        try {
            const date = new Date(postedDate);
            if (isNaN(date.getTime())) return false;
            const today = new Date(); // Use current system time
            const diffTime = today.getTime() - date.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays >= 0 && diffDays <= 7;
        } catch {
            return false;
        }
    };

    const handleConfirm = () => {
        if (!selectedContact) return;
        if (selectedContact.type === 'map' || selectedContact.type === 'line') {
            window.open(selectedContact.href || selectedContact.value, '_blank');
        } else {
            window.location.href = `${selectedContact.type}:${selectedContact.value}`;
        }
        setTimeout(() => setSelectedContact(null), 100);
    };

    // News Scroll State
    const [isNewsDragging, setIsNewsDragging] = useState(false);
    const [isNewsMouseDown, setIsNewsMouseDown] = useState(false);
    const [newsStartX, setNewsStartX] = useState(0);
    const [newsMouseDownX, setNewsMouseDownX] = useState(0);
    const [newsScrollLeftState, setNewsScrollLeftState] = useState(0);
    const newsScrollRef = useRef<HTMLDivElement>(null);

    const scrollNews = (direction: 'left' | 'right') => {
        if (newsScrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = newsScrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            let targetScroll;
            if (direction === 'left') {
                targetScroll = scrollLeft <= 50 ? scrollWidth : scrollLeft - scrollAmount;
            } else {
                targetScroll = scrollLeft + clientWidth >= scrollWidth - 50 ? 0 : scrollLeft + scrollAmount;
            }
            newsScrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
        }
    };

    const handleNewsMouseDown = (e: React.MouseEvent) => {
        if (!newsScrollRef.current) return;
        setIsNewsMouseDown(true);
        setNewsMouseDownX(e.pageX);
        setNewsStartX(e.pageX - newsScrollRef.current.offsetLeft);
        setNewsScrollLeftState(newsScrollRef.current.scrollLeft);
    };

    const handleNewsMouseMove = (e: React.MouseEvent) => {
        if (!isNewsMouseDown || !newsScrollRef.current) return;
        const x = e.pageX - newsScrollRef.current.offsetLeft;
        const distance = Math.abs(e.pageX - newsMouseDownX);
        if (distance > 25) {
            if (!isNewsDragging) setIsNewsDragging(true);
            e.preventDefault();
            const walk = (x - newsStartX) * 2;
            newsScrollRef.current.scrollLeft = newsScrollLeftState - walk;
        }
    };

    const handleNewsMouseUpOrLeave = () => {
        setIsNewsMouseDown(false);
        setTimeout(() => setIsNewsDragging(false), 50);
    };

    const serviceKeys = ['automation', 'custom_machines', 'smart_logistics'] as const;
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
        automation: Zap,
        custom_machines: Cog,
        smart_logistics: Truck,
        plc: Cpu,
        cnc: Database
    };

    const valueIcons = [Target, Award, Users];
    const valueKeys = ['innovation', 'quality', 'partnership'] as const;

    return (
        <>
            <JsonLd data={orgSchema} />
            <div className="bg-white min-h-screen selection:bg-emerald-600 selection:text-white overflow-x-hidden">

                {/* 1. HERO SECTION */}
                <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-900 border-b-4 border-green-primary">
                    <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                        {/* 1. Base Image - Always shows first/as fallback */}
                        <Image
                            src={withBasePath("/images/eureka-og.webp")}
                            alt="Eureka Automation Facility"
                            fill
                            className="object-cover scale-110"
                            priority
                            sizes="100vw"
                        />

                        {/* 2. Video Background - Overlays image */}
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            poster={withBasePath("/images/eureka-og.webp")}
                            className="absolute inset-0 w-full h-full object-cover scale-110 z-10"
                        >
                            <source src={withBasePath("/videos/hero-video.mp4")} type="video/mp4" />
                        </video>

                        {/* 3. Gradient Overlay - Topmost layer for readablity */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-900/80 to-green-primary/30 z-20 pointer-events-none"></div>
                    </motion.div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-left flex flex-col items-start">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="max-w-4xl flex flex-col items-start"
                        >
                            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-primary"></span>
                                </span>
                                <span className="text-white font-medium text-xs md:text-sm tracking-widest uppercase">
                                    {tHero('certified')}
                                </span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className={`text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 ${locale === 'th' ? 'leading-[1.45] tracking-normal' : 'tracking-tight leading-[1.05]'}`}>
                                {locale === 'th' ? (
                                    <>
                                        ยูเรกา <br />
                                        <span className="text-green-primary">
                                            ออโตเมชั่น
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Eureka<br />
                                        <span className="text-green-primary">
                                            <span className="text-red-accent">A</span>utomat<span className="text-red-accent">i</span>on
                                        </span>
                                    </>
                                )}
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/80 max-w-2xl mb-5 leading-relaxed font-light">
                                {tHero('subtitle')}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                                <Link
                                    href="/#productsandservices"
                                    className="px-4 py-2 bg-green-primary hover:bg-green-dark text-white rounded-full font-bold text-lg shadow-[0_8px_24px_rgba(34,169,82,0.4)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto text-center"
                                >
                                    {tHero('cta')}
                                </Link>
                                <Link
                                    href="/#contact"
                                    className="px-4 py-2 bg-transparent border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 w-full sm:w-auto text-center"
                                >
                                    {tHero('contact')}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    >
                        <span className="text-[10px] uppercase font-bold tracking-[4px] text-white/50">Scroll</span>
                        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[30%] bg-white"
                                animate={{ y: ['-100%', '300%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: [0.77, 0, 0.175, 1] }}
                            />
                        </div>
                    </motion.div>
                </section>

                {/* Stats Section */}
                <section className="py-6 bg-green-primary text-white border-b border-green-dark relative z-20">
                    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-8 md:justify-between">
                            {[
                                { val: 20, suffix: "+", k: "years" },
                                { val: 2000, suffix: "+", k: "projects" },
                                { val: 100, suffix: "+", k: "clients" },
                                { val: 14, suffix: "", k: "countries" },
                                { val: 2, suffix: "", k: "offices" }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="text-center flex-1 min-w-[150px]"
                                >
                                    <h2 className="text-4xl md:text-[3rem] font-black mb-1 flex items-center justify-center">
                                        <CountUp end={stat.val} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
                                        {stat.suffix}
                                    </h2>
                                    <p className="text-sm font-medium uppercase tracking-[1px] text-white/90">
                                        {tTrust(`stats.${stat.k}.label`)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-10 sm:py-12 bg-paper overflow-hidden">
                    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">

                            {/* Left Image & Badge */}
                            <motion.div
                                className="flex-1 relative w-full lg:w-1/2"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                                    <Image
                                        src={withBasePath("/images/Our_Legacy.webp")}
                                        alt="Eureka Automation Facility"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-green-primary/10 mix-blend-multiply"></div>
                                </div>

                                <motion.div
                                    className="absolute -bottom-4 -right-2 md:-right-4 bg-paper p-4 lg:p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] max-w-[280px] border border-green-light"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="text-4xl font-black text-green-primary mb-1 mt-0">20+</p>
                                    <p className="text-ink font-bold m-0 leading-tight">Years of Excellence</p>
                                    <p className="text-ink-muted text-sm mt-2 mb-0">Delivering world-class automation solutions.</p>
                                </motion.div>
                            </motion.div>

                            {/* Right Content */}
                            <motion.div
                                className="flex-1 w-full lg:w-1/2 space-y-4 lg:pl-4"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div>
                                    <span className="text-white bg-green-primary px-4 py-1.5 rounded-full text-[13px] font-bold tracking-[2px] uppercase mb-4 inline-block shadow-sm">
                                        {tAbout('tag')}
                                    </span>
                                    <h2 className={`text-4xl md:text-5xl font-black text-green-primary mb-2 ${locale === 'th' ? 'leading-[1.5] tracking-normal' : 'tracking-tight leading-[1.2]'}`}>
                                        {tAbout('professionalism_title')}
                                    </h2>
                                    <p className="text-xl md:text-2xl font-bold text-green-primary/80 mb-6 leading-relaxed">
                                        {tAbout('professionalism_subtitle')}
                                    </p>
                                    <p className="text-[17px] text-ink-muted leading-relaxed font-light mb-6">
                                        {tAbout('professionalism_desc')}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-black/5">
                                    {[
                                        { k: 'headquarters' },
                                        { k: 'globalReach' },
                                        { k: 'exporting' },
                                        { k: 'coreFocus' }
                                    ].map((item) => (
                                        <div key={item.k}>
                                            <h4 className="font-bold text-[15px] text-ink mb-1">{tTrust(`${item.k}.label`)}</h4>
                                            <p className="text-sm text-ink-muted leading-relaxed m-0">{tTrust(`${item.k}.value`)}</p>
                                        </div>
                                    ))}
                                </div>

                                <ul className="space-y-3 pt-2 m-0 p-0 list-none">
                                    {valueKeys.map((key, i) => {
                                        const Icon = valueIcons[i];
                                        return (
                                            <li key={key} className="flex gap-4 items-start group">
                                                <div className="w-12 h-12 bg-green-ultra rounded-[14px] flex items-center justify-center text-green-primary shrink-0 transition-all duration-300 group-hover:bg-green-primary group-hover:text-white group-hover:scale-110 shadow-sm group-hover:shadow-[0_4px_15px_rgba(34,169,82,0.3)]">
                                                    <Icon size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-[17px] text-ink mb-1 group-hover:text-green-primary transition-colors">{tAbout(`values.${key}.title`)}</h4>
                                                    <p className="text-ink-muted text-[15px] leading-relaxed m-0">{tAbout(`values.${key}.desc`)}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* Milestones Section */}
                <section className="py-5 sm:py-6 bg-ink text-white overflow-hidden">
                    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-8 max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-green-primary font-bold tracking-widest uppercase text-sm border border-green-primary/30 px-4 py-1.5 rounded-full inline-block mb-5">
                                {tHome('timeline.tag')}
                            </span>
                            <h2 className={`text-3xl md:text-[3rem] font-black text-white mb-6 ${locale === 'th' ? 'leading-[1.5] tracking-normal' : 'tracking-tight'}`}>
                                {tHome('timeline.title')}
                            </h2>
                        </motion.div>

                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block"></div>

                            <div className="flex flex-col gap-6 md:gap-8">
                                {[
                                    { year: '2002' },
                                    { year: '2014' },
                                    { year: '2015' },
                                    { year: '2019' }
                                ].map((item, index) => {
                                    const isEven = index % 2 === 0;
                                    return (
                                        <motion.div
                                            key={index}
                                            className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${!isEven ? 'md:flex-row-reverse' : ''}`}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ delay: index * 0.1, duration: 0.6 }}
                                        >
                                            {/* Year */}
                                            <div className={`w-full md:w-[45%] text-6xl font-black text-white/10 mb-4 md:mb-0 ${isEven ? 'md:text-right text-center' : 'md:text-left text-center'}`}>
                                                {item.year}
                                            </div>

                                            {/* Dot */}
                                            <div className="hidden md:block w-5 h-5 bg-green-primary rounded-full border-4 border-ink z-10 relative shadow-[0_0_15px_rgba(34,169,82,0.5)]">
                                            </div>

                                            {/* Card */}
                                            <div className="w-full md:w-[45%] bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/5 hover:-translate-y-1 hover:bg-white/10 hover:border-green-primary/30 transition-all duration-300 shadow-xl">
                                                <h3 className="text-xl lg:text-2xl font-bold text-green-primary mb-2">{tHome(`timeline.milestones.${item.year}.title`)}</h3>
                                                <p className="text-white/70 leading-relaxed text-sm lg:text-base m-0">{tHome(`timeline.milestones.${item.year}.desc`)}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Capabilities Section */}
                <section id="productsandservices" className="py-10 lg:py-12 bg-white text-ink">
                    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-green-primary font-bold tracking-widest uppercase text-sm border-b-2 border-green-primary/20 pb-1 inline-block mb-3">
                                {tHome('capabilities_tag')}
                            </span>
                            <h2 className={`text-3xl sm:text-4xl md:text-[3rem] font-black text-ink mb-3 ${locale === 'th' ? 'leading-[1.5] tracking-normal' : 'tracking-tight'}`}>{tHome('capabilities')}</h2>
                            <p className="text-[17px] text-ink-muted max-w-2xl mx-auto leading-relaxed font-light">{tHome('transform_desc')}</p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {serviceKeys.map((key) => {
                                const Icon = serviceIcons[key];
                                const routeMap: { [key: string]: string } = {
                                    ai_ml: '/ai-solutions',
                                    custom_machines: '/custom-machines',
                                    automation: '/robotics',
                                    smart_logistics: '/logistics'
                                };
                                const route = routeMap[key];
                                const features = tServices.raw(`${key}.features`) as string[] || [];

                                return (
                                    <motion.div
                                        key={key}
                                        variants={itemVariants}
                                        className="group bg-paper-warm p-8 rounded-[20px] border border-transparent hover:border-green-primary/30 hover:-translate-y-2 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden flex flex-col"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-[15px] flex items-center justify-center text-green-primary mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.05)] group-hover:bg-green-primary group-hover:text-white group-hover:rotate-12 transition-all duration-300 pointer-events-none">
                                            <Icon size={28} />
                                        </div>

                                        <h3 className="text-[1.4rem] font-black text-ink mb-4 group-hover:text-green-primary transition-colors">
                                            {tServices(`${key}.title`)}
                                        </h3>

                                        <p className="text-ink-muted leading-[1.6] mb-4 font-light">
                                            {tServices(`${key}.desc`)}
                                        </p>

                                        {features && features.length > 0 && (
                                            <ul className="mb-6 space-y-2 mt-auto list-none pl-0">
                                                {features.map((ft, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-ink font-medium text-[15px]">
                                                        <div className="w-5 h-5 bg-green-primary rounded-full shrink-0 flex items-center justify-center">
                                                            <div className="w-[5px] h-[10px] border-b-2 border-r-2 border-white rotate-45 -mt-[2px]"></div>
                                                        </div>
                                                        {ft}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="mt-auto pt-4 pointer-events-auto">
                                            <Link href={route} className="inline-flex items-center gap-2 font-bold text-green-primary group-hover:gap-4 transition-all uppercase text-[13px] tracking-wider">
                                                Discover More <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Products Section */}
                {/* <section className="py-8 sm:py-10 lg:py-12 bg-white border-t border-zinc-100">
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
                </section> */}

                {/* Video Gallery Section */}
                <section id="showcase" className="py-4 sm:py-6 lg:py-8 bg-paper overflow-hidden">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center mb-6 space-y-2"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-green-primary font-bold tracking-wider uppercase text-sm">
                                {tHome('showcase.tag')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-ink">
                                {tHome('showcase.title')}
                            </h2>
                            <p className="text-lg text-ink-soft max-w-2xl mx-auto font-light">
                                {tHome('showcase.description')}
                            </p>
                        </motion.div>

                        <VideoGallery videos={videoData} locale={locale} />
                    </div>
                </section>

                {/* Client Logos Section */}
                <section className="py-10 border-y border-black/5 bg-white overflow-hidden">
                    <div className="text-center mb-5">
                        <span className="text-sm font-bold uppercase tracking-[2px] text-black/40">{tHome('trusted_by')}</span>
                    </div>

                    <div className="relative group/slider max-w-[1200px] mx-auto">
                        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                        <div className="flex w-max animate-infinite-scroll group-hover/slider:pause-animation">
                            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, i) => (
                                <Link
                                    key={i}
                                    href={client.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-[200px] h-[100px] px-8 transition-all hover:opacity-100 opacity-50 grayscale hover:grayscale-0 duration-300 hover:scale-110"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            fill
                                            className="object-contain"
                                            loading="lazy"
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
                            to { transform: translateX(-33.33%); }
                        }
                        .animate-infinite-scroll {
                            animation: scroll-left 40s linear infinite;
                        }
                        .pause-animation {
                            animation-play-state: paused !important;
                        }
                    `}} />
                </section>

                {/* News & Insights Section */}
                <section className="py-10 lg:py-12 bg-paper-warm">
                    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
                        <div className="relative mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <motion.div
                                className="text-left"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-green-primary font-bold tracking-widest uppercase text-sm border-b-2 border-green-primary/20 pb-1 inline-block mb-4">
                                    {tHome('news.tag')}
                                </span>
                                <h2 className="text-3xl md:text-[3rem] font-black text-ink tracking-tight mb-2">
                                    {tHome('news.title')}
                                </h2>
                            </motion.div>
                            <Link
                                href="/EurekaNew"
                                className="px-8 py-3 bg-zinc-900 hover:bg-green-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 inline-flex items-center gap-2 w-fit"
                            >
                                {tHome('news.view_all')} <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* News Carousel Container */}
                        <div
                            ref={newsScrollRef}
                            onMouseDown={handleNewsMouseDown}
                            onMouseMove={handleNewsMouseMove}
                            onMouseUp={handleNewsMouseUpOrLeave}
                            onMouseLeave={handleNewsMouseUpOrLeave}
                            className={`flex overflow-x-auto gap-6 pb-8 px-6 md:px-0 scrollbar-hide scroll-smooth snap-x snap-mandatory select-none ${isNewsDragging ? 'cursor-grabbing' : 'cursor-grab'
                                }`}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {isLoadingNews ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <div key={idx} className="flex-none w-[300px] md:w-[380px] snap-start bg-white rounded-[20px] border border-black/5 flex flex-col overflow-hidden animate-pulse min-h-[400px]">
                                        <div className="aspect-[3/2] bg-zinc-200"></div>
                                        <div className="p-6 flex flex-col flex-1 gap-4">
                                            <div className="h-4 bg-zinc-200 rounded w-1/4"></div>
                                            <div className="h-6 bg-zinc-200 rounded w-3/4"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-zinc-200 rounded w-full"></div>
                                                <div className="h-4 bg-zinc-200 rounded w-full"></div>
                                                <div className="h-4 bg-zinc-200 rounded w-2/3"></div>
                                            </div>
                                            <div className="h-4 bg-zinc-200 rounded w-1/3 mt-auto"></div>
                                        </div>
                                    </div>
                                ))
                            ) : news.length > 0 ? (
                                news.map((item, idx) => (
                                    <motion.div
                                        key={item.id || idx}
                                        className={`flex-none w-[85vw] md:w-[380px] snap-center md:snap-start group bg-white rounded-[20px] overflow-hidden border border-black/5 hover:border-green-primary/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col ${isNewsDragging ? 'pointer-events-none' : ''}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    >
                                        <Link href={`/EurekaNew/${item.id || idx}`} className="flex flex-col h-full w-full">
                                            <div className="relative aspect-[3/2] bg-green-ultra overflow-hidden shrink-0">
                                                {item.image ? (
                                                    <Image src={withBasePath(item.image)} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-green-primary/20 to-transparent z-10 transition-opacity group-hover:opacity-50"></div>
                                                )}

                                                {/* New Badge */}
                                                {isNew(item.postedDate) && (
                                                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-green-primary text-white text-[11px] font-bold rounded-full shadow-lg animate-pulse uppercase tracking-wider">
                                                        New
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="text-green-primary font-bold text-[13px] tracking-wider uppercase mb-2 text-left">{item.date || "News"}</div>
                                                <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-green-primary transition-colors line-clamp-2 text-left">
                                                    {item.title}
                                                </h3>
                                                <p className="text-ink-muted text-[15px] leading-relaxed mb-4 line-clamp-3 flex-1 text-left">
                                                    {item.description}
                                                </p>
                                                <div className="inline-flex items-center gap-2 font-bold text-green-primary group-hover:gap-3 transition-all uppercase text-[13px] tracking-wider mt-auto text-left w-max">
                                                    Read More <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                ['expo2026', 'foodpack2026'].map((newsKey, idx) => (
                                    <motion.div
                                        key={newsKey}
                                        className={`flex-none w-[85vw] md:w-[380px] snap-center md:snap-start group bg-white rounded-[20px] overflow-hidden border border-black/5 hover:border-green-primary/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col ${isNewsDragging ? 'pointer-events-none' : ''}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                                    >
                                        <Link href={`/EurekaNew/${newsKey}`} className="flex flex-col h-full w-full">
                                            <div className="relative aspect-[3/2] bg-green-ultra overflow-hidden shrink-0">
                                                <div className="absolute inset-0 bg-gradient-to-br from-green-primary/20 to-transparent z-10 transition-opacity group-hover:opacity-50"></div>

                                                {/* New Badge for fallback items (Optional, based on key or date) */}
                                                {newsKey === 'expo2026' && (
                                                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-green-primary text-white text-[11px] font-bold rounded-full shadow-lg animate-pulse uppercase tracking-wider">
                                                        New
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="text-green-primary font-bold text-[13px] tracking-wider uppercase mb-2 text-left">
                                                    {tHome(`news.items.${newsKey}.date`) || "Mar 15, 2024"}
                                                </div>
                                                <h3 className="text-xl font-bold text-ink mb-2 group-hover:text-green-primary transition-colors line-clamp-2 text-left">
                                                    {tHome(`news.items.${newsKey}.title`)}
                                                </h3>
                                                <p className="text-ink-muted text-[15px] leading-relaxed mb-4 line-clamp-3 flex-1 text-left">
                                                    {tHome(`news.items.${newsKey}.desc`)}
                                                </p>
                                                <div className="inline-flex items-center gap-2 font-bold text-green-primary group-hover:gap-3 transition-all uppercase text-[13px] tracking-wider mt-auto text-left w-max">
                                                    Read More <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Slider Navigation Controls - Centered at Bottom */}
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <button
                                onClick={() => scrollNews('left')}
                                className="p-4 bg-white rounded-full shadow-md border border-black/5 text-ink-soft hover:text-green-primary hover:border-green-primary active:scale-90 transition-all"
                                aria-label="Previous news"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Visual Indicator Dots (Optional/Decorative) */}
                            <div className="flex gap-1.5 px-4">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-green-primary' : 'bg-green-primary/20'}`}></div>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollNews('right')}
                                className="p-4 bg-white rounded-full shadow-md border border-black/5 text-ink-soft hover:text-green-primary hover:border-green-primary active:scale-90 transition-all"
                                aria-label="Next news"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Contact & Careers Section */}
                <section id="contact" className="py-10 lg:py-12 bg-white text-ink relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IiMzNEE4NTMiIGZpbGwtb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')] pointer-events-none"></div>

                    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
                        {/* Contact Block */}
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                            <motion.div
                                className="space-y-4 lg:space-y-6"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 border-b-2 border-green-primary/30 text-sm font-bold text-green-primary uppercase tracking-widest">
                                    {tContact('tag')}
                                </div>
                                <h2 className={`text-3xl sm:text-4xl md:text-[3rem] font-black ${locale === 'th' ? 'leading-[1.5] tracking-normal' : 'tracking-tight leading-[1.1]'}`}>
                                    {tContact('title')}
                                </h2>
                                <p className="text-[17px] text-ink-muted font-light leading-relaxed max-w-lg">
                                    {tContact('description')}
                                </p>

                                <div className="space-y-4 pt-2">
                                    {[
                                        { icon: MapPin, label: "Headquarters", val: "15, 48 BIGGERLAND 4 KLONG 8, Pathum Thani 12150", action: { type: 'map', value: 'https://www.google.com/maps/search/?api=1&query=Eureka+Automation+Thailand+48/15+Moo+4+Biggerland+4+Klong+8' } },
                                        { icon: Phone, label: "Call Us", val: "02-096-3556", action: { type: 'tel', value: '020963556' } },
                                        { icon: Mail, label: "Email", val: "Marketing@eurekaautomation.co.th", action: { type: 'mailto', value: 'Marketing@eurekaautomation.co.th' } },
                                        { icon: MessageSquare, label: "Line OA", val: "@636ekooa", action: { type: 'line', value: '@636ekooa', href: 'https://line.me/ti/p/@636ekooa' } }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex items-start gap-4 group transition-colors cursor-pointer"
                                            whileHover={{ x: 5 }}
                                            onClick={() => {
                                                if (item.action.type === 'line' && item.action.href) {
                                                    window.open(item.action.href, '_blank', 'noopener,noreferrer');
                                                    return;
                                                }
                                                setSelectedContact({ type: item.action.type, value: item.action.value, label: item.label, href: item.action.href });
                                            }}
                                        >
                                            <div className="w-12 h-12 bg-paper-warm rounded-2xl flex shrink-0 items-center justify-center text-green-primary group-hover:bg-green-primary group-hover:text-white transition-all shadow-sm group-hover:shadow-[0_10px_20px_rgba(34,169,82,0.2)] group-hover:-translate-y-1">
                                                <item.icon size={20} />
                                            </div>
                                            <div className="min-w-0 pt-1">
                                                <p className="text-[13px] font-bold text-ink mb-1">{item.label}</p>
                                                <p className="font-light text-ink-muted text-[15px] break-all sm:break-words leading-relaxed">{item.val}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Contact Form OR Careers CTA inside Contact right-side? */}
                            <motion.div
                                className="bg-paper-warm p-6 md:p-8 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                {contactStatus === 'loading' && (
                                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center space-y-4">
                                        <Loader2 className="text-green-primary animate-spin" size={48} />
                                        <p className="font-bold text-ink animate-pulse text-center px-4 whitespace-pre-line">
                                            {contactRetryCount > 0 ? tContact('form.retrying', { count: contactRetryCount }) : tContact('form.processing')}
                                        </p>
                                    </div>
                                )}

                                {contactStatus === 'success' ? (
                                    <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500 h-full flex flex-col items-center justify-center">
                                        <div className="w-20 h-20 bg-green-primary rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-green-primary/20">
                                            <CheckCircle2 className="text-white" size={40} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-ink">
                                                {tContact('form.success_title')}
                                            </h3>
                                            <p className="text-ink-muted max-w-sm mx-auto font-medium leading-relaxed">
                                                {tContact('form.success_desc')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setContactStatus('idle')}
                                            className="px-8 py-3 bg-zinc-900 hover:bg-green-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1"
                                        >
                                            {tContact('form.send_more')}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-2xl font-black text-ink mb-8">{tContact('title')}</h3>
                                        <form className="space-y-6" onSubmit={handleContactSubmit}>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[13px] font-bold text-ink uppercase tracking-wider mb-2">{tContact('form.firstName')}</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        required
                                                        placeholder="John"
                                                        value={contactFormData.firstName}
                                                        onChange={handleContactChange}
                                                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 placeholder-black/20 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all text-[15px]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[13px] font-bold text-ink uppercase tracking-wider mb-2">{tContact('form.lastName')}</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        required
                                                        placeholder="Doe"
                                                        value={contactFormData.lastName}
                                                        onChange={handleContactChange}
                                                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 placeholder-black/20 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all text-[15px]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[13px] font-bold text-ink uppercase tracking-wider mb-2">{tContact('form.email')}</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        placeholder="john@example.com"
                                                        value={contactFormData.email}
                                                        onChange={handleContactChange}
                                                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 placeholder-black/20 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all text-[15px]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[13px] font-bold text-ink uppercase tracking-wider mb-2">{tContact('form.phone')}</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        placeholder="0XX-XXX-XXXX"
                                                        value={contactFormData.phone}
                                                        onChange={handleContactChange}
                                                        className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 placeholder-black/20 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all text-[15px]"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[13px] font-bold text-ink uppercase tracking-wider mb-2">{tContact('form.company')}</label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Company Co., Ltd."
                                                    value={contactFormData.company}
                                                    onChange={handleContactChange}
                                                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 placeholder-black/20 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all text-[15px]"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[13px] font-bold text-ink uppercase tracking-wider mb-2">{tContact('form.message')}</label>
                                                <textarea
                                                    name="message"
                                                    rows={4}
                                                    required
                                                    placeholder="..."
                                                    value={contactFormData.message}
                                                    onChange={handleContactChange}
                                                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 placeholder-black/20 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all text-[15px] resize-none"
                                                ></textarea>
                                            </div>

                                            {contactStatus === 'error' && (
                                                <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3 text-xs font-bold animate-shake">
                                                    <AlertCircle size={18} />
                                                    <span>{contactErrorMessage}</span>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={contactStatus === 'loading'}
                                                className="w-full bg-green-primary hover:bg-green-dark text-white rounded-xl py-4 font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                                            >
                                                {contactStatus === 'loading' ? tContact('form.sending') : tContact('form.submit')}
                                                <ArrowRight size={18} />
                                            </button>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        </div>

                        {/* Careers CTA Banner
                        <motion.div
                            className="bg-green-ultra rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center border border-green-primary/20 relative"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-1 p-8 md:p-10 lg:p-12 relative z-10">
                                <h2 className="text-3xl font-black text-ink mb-3">{tHome('careers_cta.title')}</h2>
                                <p className="text-[15px] lg:text-[17px] text-ink-soft mb-6 max-w-lg leading-relaxed">{tHome('careers_cta.hr_contact')} - {tHome('careers_cta.hr_phone')}</p>
                                <Link
                                    href="/careers"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-primary hover:bg-green-dark text-white rounded-full font-bold transition-all group"
                                >
                                    {tHome('careers_cta.button')}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                            <div className="w-full md:w-[40%] h-[300px] md:h-auto md:absolute md:right-0 md:top-0 md:bottom-0 shrink-0">
                                <div className="absolute inset-0 bg-green-primary/10"></div>
                                <Image
                                    src={withBasePath("/images/hero-bg.webp")}
                                    alt="Careers at Eureka Automation"
                                    fill
                                    className="object-cover opacity-80 mix-blend-multiply"
                                />
                            </div>
                        </motion.div> */}

                    </div>
                </section>
            </div>

            {/* Contact Confirmation Modal */}
            <ContactModal
                selectedContact={selectedContact}
                onClose={() => setSelectedContact(null)}
                onConfirm={handleConfirm}
            />
        </>
    );
}
