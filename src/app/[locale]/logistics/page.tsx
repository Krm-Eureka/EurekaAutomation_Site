"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import { ChevronLeft, Truck } from "lucide-react";
import VideoGallery from "@/components/sections/VideoGallery";
import videoData from "@/data/videos.json";

export default function LogisticsPage() {
    const router = useRouter();
    const locale = useLocale();
    const tHome = useTranslations('home.services');

    const logisticsVideos = videoData.filter(v => v.category.en === 'Logistics');

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="pt-32 pb-16 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-zinc-300 hover:text-white mb-6 transition-colors">
                        <ChevronLeft size={20} /> Back
                    </button>
                    <motion.div
                        className="space-y-4"
                        initial={fadeIn.initial}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold">
                            <Truck size={16} /> {tHome('smart_logistics.title')}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Smart Logistics Solutions</h1>
                        <p className="text-xl text-white/70 max-w-2xl">{tHome('smart_logistics.desc')}</p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="space-y-12"
                        initial={fadeIn.initial}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Video Section */}
                        <div>
                            <h2 className="text-3xl font-bold text-zinc-900 mb-8">Related Videos</h2>
                            <VideoGallery videos={logisticsVideos} locale={locale} />
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
