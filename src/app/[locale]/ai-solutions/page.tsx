"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import { ChevronLeft, Sparkles } from "lucide-react";
import VideoGallery from "@/components/sections/VideoGallery";
import videoData from "@/data/videos.json";

export default function AISolutionsPage() {
    const router = useRouter();
    const locale = useLocale();
    const tHome = useTranslations('home.services');

    const aiVideos = videoData.filter(v => v.category.en === 'AI');

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
                            <Sparkles size={16} /> {tHome('ai_ml.title')}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">AI & Machine Learning Solutions</h1>
                        <p className="text-xl text-white/70 max-w-2xl">{tHome('ai_ml.desc')}</p>
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
                            <VideoGallery videos={aiVideos} locale={locale} />
                        </div>

                        {/* Description */}
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="text-3xl font-bold text-zinc-900">Intelligent Manufacturing with AI</h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Harness the power of artificial intelligence and machine learning for predictive maintenance,
                                quality control optimization, and production forecasting. Our AI solutions transform raw data
                                into actionable insights for smarter decision-making.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
