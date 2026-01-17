"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Video {
    id: string;
    title: { th: string; en: string };
    thumbnail: string;
    youtubeUrl: string;
    category: { th: string; en: string };
    description: { th: string; en: string };
}

interface VideoGalleryProps {
    videos: Video[];
    locale: string;
}

export default function VideoGallery({ videos, locale }: VideoGalleryProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category[locale as "th" | "en"])))];

    const filteredVideos = selectedCategory === "All"
        ? videos
        : videos.filter((v) => v.category[locale as "th" | "en"] === selectedCategory);

    const getEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;
            const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === category
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                            }`}
                    >
                        {category === "All" ? (locale === "th" ? "ทั้งหมด" : "All") : category}
                    </button>
                ))}
            </div>

            {/* Video Slider Container */}
            <div className="relative group/gallery">
                {/* Navigation Buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-xl border border-zinc-100 text-zinc-400 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:block"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-xl border border-zinc-100 text-zinc-400 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:block"
                >
                    <ChevronRight size={24} />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory px-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredVideos.map((video) => (
                            <motion.div
                                key={video.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="flex-none w-[300px] md:w-[400px] group cursor-pointer snap-start"
                                onClick={() => setSelectedVideo(video)}
                            >
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-zinc-100 mb-4">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title[locale as "th" | "en"]}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                                            <Play className="text-white fill-current translate-x-1" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                                            {video.category[locale as "th" | "en"]}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-1">
                                    {video.title[locale as "th" | "en"]}
                                </h3>
                                <p className="text-sm text-zinc-500 line-clamp-2">
                                    {video.description[locale as "th" | "en"]}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl bg-zinc-950 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="aspect-video w-full bg-black">
                                <iframe
                                    src={`${getEmbedUrl(selectedVideo.youtubeUrl)}?autoplay=1`}
                                    title={selectedVideo.title[locale as "th" | "en"]}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="p-8 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {selectedVideo.category[locale as "th" | "en"]}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedVideo.title[locale as "th" | "en"]}</h2>
                                <p className="text-zinc-400 text-lg leading-relaxed">{selectedVideo.description[locale as "th" | "en"]}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
