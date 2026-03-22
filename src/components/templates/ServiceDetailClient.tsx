"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import { ChevronLeft, LucideIcon } from "lucide-react";
import VideoGallery from "@/components/sections/VideoGallery";
import videoDataRaw from "@/data/videos.json";
import { withBasePath } from "@/lib/utils";

interface Video {
    title: { th: string; en: string };
    thumbnail: string;
    youtubeUrl: string;
    category: { th: string; en: string };
    description: { th: string; en: string }[];
}

interface ServiceDetailClientProps {
    namespace: string; // e.g., 'ai', 'machines', 'robotics', 'logistics'
    videoCategory: 'AI' | 'MACHINES' | 'ROBOTICS' | 'LOGISTICS';
    themeColor: string; // Tailwind class for the glowing effect, e.g., 'bg-fuchsia-500/10'
    secondThemeColor?: string; // Optional second color for the other blob
    backgroundVideo?: string;
    backgroundImage?: string;
    icon: LucideIcon;
    homeServiceKey: string; // key in home.services, e.g., 'ai_ml', 'custom_machines'
}

export default function ServiceDetailClient({
    namespace,
    videoCategory,
    themeColor,
    secondThemeColor = themeColor,
    backgroundVideo,
    backgroundImage,
    icon: Icon,
    homeServiceKey
}: ServiceDetailClientProps) {
    const router = useRouter();
    const locale = useLocale();
    const tHome = useTranslations('home.services');
    const tSub = useTranslations(`subpages.${namespace}`);
    const tCommon = useTranslations('common');
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(err => {
                console.log("Autoplay was prevented:", err);
            });
        }
    }, []);

    // Filter videos based on category
    const videos = (videoDataRaw as Record<string, Video[]>)[videoCategory] || [];

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]); // Parallax for background
    const y2 = useTransform(scrollY, [0, 500], [0, 50]);   // Parallax for content

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Animated Hero Header */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 text-white overflow-hidden bg-zinc-950">
                <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                    {backgroundVideo && (
                        <video
                            ref={videoRef}
                            src={withBasePath(backgroundVideo)}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute z-0 w-full h-full object-cover opacity-20"
                        />
                    )}
                    {backgroundImage && (
                        <>
                            <div className={`absolute inset-0 z-0 bg-zinc-900 animate-pulse transition-opacity duration-1000`} />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
                                style={{ backgroundImage: `url(${withBasePath(backgroundImage)})` }}
                            />
                        </>
                    )}
                    {/* Theme Glow Effects */}
                    <div className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] ${themeColor} rounded-full blur-[100px] animate-pulse`}></div>
                    <div className={`absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] ${secondThemeColor} rounded-full blur-[90px] animate-pulse delay-500`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none"></div>
                </motion.div>

                <motion.div style={{ y: y2 }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col items-start">
                        <motion.button
                            variants={itemVariants}
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-zinc-300 hover:text-white mb-8 transition-colors"
                        >
                            <ChevronLeft size={20} /> {tCommon('back')}
                        </motion.button>

                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold mb-6">
                            <Icon size={16} /> {tHome(`${homeServiceKey}.title`)}
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            {tSub('title')}
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-white/70 max-w-2xl">
                            {tHome(`${homeServiceKey}.desc`)}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Content */}
            <div className="py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="space-y-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Video Section */}
                        {videos.length > 0 && (
                            <div>
                                <h2 className="text-3xl font-bold text-zinc-900 mb-8">{tCommon('related_videos')}</h2>
                                <VideoGallery videos={videos} locale={locale} hideFilter={true} />
                            </div>
                        )}

                        {/* Description */}
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-3xl font-bold text-zinc-900">{tSub('content_title')}</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                {tSub('content_desc')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
