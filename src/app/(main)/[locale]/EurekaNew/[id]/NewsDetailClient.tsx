"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { withBasePath } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    postedDate?: string;
    paragraphs: string[];
    content?: string[];
    images: string[];
    locale: string;
    isFallback?: boolean;
}

export default function NewsDetailClient({ item, otherNews, isFallback }: { item: NewsItem, otherNews: NewsItem[], isFallback?: boolean }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const t = useTranslations();

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    // Calculate if it's new (within 7 days)
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

    // Sort other news by date (newest first)
    const sortedOtherNews = [...otherNews]
        .filter(n => n.id !== item.id)
        .sort((a, b) => {
            const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
            const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
            return dateB - dateA;
        })
        .map(n => ({
            ...n,
            paragraphs: Array.isArray(n.paragraphs) ? n.paragraphs : []
        }));

    return (
        <div className="min-h-screen bg-white pt-20">
            <main className="container mx-auto px-4 py-6 md:py-10">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Title & Date */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 text-center md:text-left"
                    >
                        <div className="inline-flex items-center gap-2 text-green-primary font-bold text-sm uppercase tracking-wider bg-green-ultra px-4 py-2 rounded-full">
                            <Calendar size={16} />
                            {item.date}
                        </div>
                        <motion.h1 
                            className="text-4xl md:text-6xl font-black text-ink leading-tight italic uppercase tracking-tighter"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            {item.title}
                            {isFallback && (
                                <span className="ml-4 text-xs font-bold bg-green-primary/10 text-green-primary px-2 py-1 rounded-full align-middle">
                                    {t('home.news.fallbackTag')}
                                </span>
                            )}
                        </motion.h1>
                    </motion.div>

                    {/* Newspaper Style Content Layout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Featured Image (Always First) */}
                        {item.images.length > 0 && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="relative aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl border-b-8 border-green-primary"
                            >
                                <Image
                                    src={withBasePath(item.images[0])}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute top-8 right-8 px-4 py-2 bg-green-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                                    Main Coverage
                                </div>
                            </motion.div>
                        )}

                        <div className="max-w-3xl mx-auto space-y-4">
                            {(() => {
                                const { paragraphs, images, content } = item;

                                // NEW Content Block Rendering Logic
                                if (content && content.length > 0) {
                                    return content.map((block, idx) => {
                                        if (block.startsWith('GRID:')) {
                                            const gridImages = block.replace('GRID:', '').split(',').map(s => s.trim());
                                            const colSpan = gridImages.length === 1 ? 'grid-cols-1' : gridImages.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3';

                                            return (
                                                <div key={`grid-${idx}`} className={`grid ${colSpan} gap-1 my-1`}>
                                                    {gridImages.map((img, imgIdx) => (
                                                        <motion.div
                                                            key={`grid-img-${idx}-${imgIdx}`}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
                                                        >
                                                            <Image src={withBasePath(img)} alt={`Gallery ${idx}-${imgIdx}`} fill className="object-cover" />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            );
                                        }

                                        if (block.startsWith('IMAGE:')) {
                                            const imgPath = block.replace('IMAGE:', '').trim();
                                            return (
                                                <motion.div
                                                    key={`img-${idx}`}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    className="relative aspect-video rounded-3xl overflow-hidden shadow-xl my-4 hover:scale-[1.01] transition-transform"
                                                >
                                                    <Image src={withBasePath(imgPath)} alt={`Full Image ${idx}`} fill className="object-cover" />
                                                </motion.div>
                                            );
                                        }

                                        const isFirst = idx === 0;

                                        return (
                                            <div key={`p-${idx}`} className={`prose prose-zinc max-w-none`}>
                                                <p className={`${isFirst ? 'text-xl font-medium' : 'text-lg md:text-xl'} text-zinc-600 leading-relaxed font-light`}>
                                                    {block}
                                                </p>
                                            </div>
                                        );
                                    });
                                }

                                // FALLBACK: Old Paragraph/Image matching logic
                                const result = [];
                                if (paragraphs.length > 0) {
                                    result.push(
                                        <div key="p-0" className="prose prose-zinc max-w-none">
                                            <p className="text-xl font-medium text-zinc-600 leading-relaxed font-light">
                                                {paragraphs[0]}
                                            </p>
                                        </div>
                                    );
                                }

                                const maxLen = Math.max(paragraphs.length, images.length);
                                for (let i = 1; i < maxLen; i++) {
                                    if (images[i]) {
                                        result.push(
                                            <motion.div
                                                key={`img-${i}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl my-4 hover:scale-[1.01] transition-transform ${i % 2 === 0 ? "md:rotate-1" : "md:-rotate-1"
                                                    }`}
                                            >
                                                <Image src={images[i]} alt={`Detail ${i}`} fill className="object-cover" />
                                            </motion.div>
                                        );
                                    }
                                    if (paragraphs[i]) {
                                        result.push(
                                            <div key={`p-${i}`} className="prose prose-zinc max-w-none">
                                                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-light">
                                                    {paragraphs[i]}
                                                </p>
                                            </div>
                                        );
                                    }
                                }
                                return result;
                            })()}
                        </div>
                    </motion.div>

                    {/* More News Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-16 border-t border-zinc-100 space-y-10"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                            <div className="space-y-2">
                                <h4 className="text-green-primary font-bold text-[10px] uppercase tracking-[0.2em]">Read More</h4>
                                <h2 className="text-3xl font-black text-ink italic uppercase tracking-tighter">Explore Other News</h2>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => scroll('left')}
                                        className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-green-primary hover:text-green-primary transition-all"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() => scroll('right')}
                                        className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:border-green-primary hover:text-green-primary transition-all"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                                <Link
                                    href="/EurekaNew"
                                    className="px-6 py-2.5 bg-zinc-900 hover:bg-green-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                                >
                                    More
                                </Link>
                            </div>
                        </div>

                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 pb-8 px-4 -mx-4 scroll-smooth"
                        >
                            {sortedOtherNews.map((news) => (
                                <Link
                                    key={news.id}
                                    href={`/EurekaNew/${news.id}`}
                                    className="flex-none w-[85vw] md:w-[350px] snap-center group space-y-4 block"
                                >
                                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-100 shadow-lg">
                                        <Image
                                            src={withBasePath(news.images[0] || "/images/Our_Legacy.webp")}
                                            alt={news.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {isNew(news.postedDate) && (
                                            <div className="absolute top-4 right-4 bg-green-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xl animate-bounce">
                                                NEW
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 px-1">
                                        <div className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider">{news.date}</div>
                                        <h3 className="text-lg font-black text-ink leading-tight line-clamp-2 italic uppercase group-hover:text-green-primary transition-colors">
                                            {news.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
