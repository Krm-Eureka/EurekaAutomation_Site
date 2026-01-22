"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import { ChevronLeft, Truck } from "lucide-react";
import VideoGallery from "@/components/sections/VideoGallery";
import videoDataRaw from "@/data/videos.json";
import { withBasePath } from "@/lib/utils";

interface Video {
    title: { th: string; en: string };
    thumbnail: string;
    youtubeUrl: string;
    category: { th: string; en: string };
    description: { th: string; en: string };
}

export default function LogisticsClient() {
    const router = useRouter();
    const locale = useLocale();
    const tHome = useTranslations('home.services');

    const allVideos = Object.values(videoDataRaw).flat() as Video[];
    const logisticsVideos = allVideos.filter((v) => v.category.en === 'Logistics');

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, -100]); // Adjusted for sub-page header
    const y2 = useTransform(scrollY, [0, 500], [0, 50]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Animated Hero Header */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 text-white overflow-hidden bg-zinc-950">
                <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                    <video
                        src={withBasePath("/videos/hero-background.mp4")}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute z-0 w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[90px] animate-pulse delay-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
                </motion.div>

                <motion.div style={{ y: y2 }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.button 
                            variants={itemVariants} 
                            onClick={() => router.back()} 
                            className="inline-flex items-center gap-2 text-zinc-300 hover:text-white mb-8 transition-colors"
                        >
                            <ChevronLeft size={20} /> Back to Home
                        </motion.button>
                        
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold mb-6">
                            <Truck size={16} /> {tHome('smart_logistics.title')}
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                            Smart Logistics Solutions
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl text-white/70 max-w-2xl">
                            {tHome('smart_logistics.desc')}
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
                        <div>
                            <h2 className="text-3xl font-bold text-zinc-900 mb-8">Related Videos</h2>
                            <VideoGallery videos={logisticsVideos} locale={locale} hideFilter={true} />
                        </div>

                        {/* Description */}
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-3xl font-bold text-zinc-900">Intelligent Warehouse & Material Flow</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Optimize your supply chain with our smart logistics solutions featuring autonomous mobile robots (AMR),
                                automated guided vehicles (AGV), and warehouse management systems (WMS). Streamline material handling,
                                reduce errors, and increase throughput across your operations.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
