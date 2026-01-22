"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"; // เพิ่ม ArrowRight
import Image from "next/image";

interface Video {
    title: { th: string; en: string };
    thumbnail: string;
    youtubeUrl: string;
    category: { th: string; en: string };
    description: { th: string; en: string } | { th: string; en: string }[];
}

interface VideoGalleryProps {
    videos: Video[];
    locale: string;
    hideFilter?: boolean;
}

export default function VideoGallery({ videos, locale, hideFilter = false }: VideoGalleryProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Generate stable IDs based on index
    const videosWithId = videos.map((v, idx) => ({ ...v, id: idx.toString() }));

    const [selectedVideo, setSelectedVideo] = useState<typeof videosWithId[0] | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category[locale as "th" | "en"])))];

    const filteredVideos = selectedCategory === "All"
        ? videosWithId
        : videosWithId.filter((v) => v.category[locale as "th" | "en"] === selectedCategory);

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

    const getYouTubeThumbnail = (
        url: string,
        quality: 'max' | 'hq' = 'hq'
    ) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        const videoId = match && match[2].length === 11 ? match[2] : null;

        if (!videoId) return '';

        return quality === 'max'
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    };

    return (
        <div className="space-y-8">
            {/* Category Filter */}
            {!hideFilter && (
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
            )}

            {/* Video Slider Container */}
            <div className="relative group/gallery">
                {/* Navigation Buttons */}
                <button
                    onClick={(e) => { e.stopPropagation(); scroll('left'); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-zinc-100 text-zinc-600 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:block"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); scroll('right'); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-zinc-100 text-zinc-600 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:block"
                >
                    <ChevronRight size={24} />
                </button>

                {/* เพิ่ม items-stretch เพื่อให้การ์ดสูงเท่ากัน */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 items-stretch"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                locale={locale}
                                onClick={() => setSelectedVideo(video)}
                                getYouTubeThumbnail={getYouTubeThumbnail}
                            />
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
                            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-zinc-950 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
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

                            <div className="p-10 text-white">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {selectedVideo.category[locale as "th" | "en"]}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{selectedVideo.title[locale as "th" | "en"]}</h2>
                                {Array.isArray(selectedVideo.description) ? (
                                    <div className="space-y-3">
                                        {selectedVideo.description.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <span className="text-emerald-500 font-bold text-xl mt-[-2px]">›</span>
                                                <span className="text-zinc-300">{item[locale as "th" | "en"]}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-zinc-400 text-lg md:text-xl leading-relaxed whitespace-pre-wrap max-w-4xl">
                                        {selectedVideo.description[locale as "th" | "en"]}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-component to handle individual video card state
function VideoCard({
    video,
    locale,
    onClick,
    getYouTubeThumbnail
}: {
    video: Video,
    locale: string,
    onClick: () => void,
    getYouTubeThumbnail: (url: string, quality?: 'max' | 'hq') => string
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            // ปรับแก้ CSS เป็น Card เต็มรูปแบบ: flex-col, h-full, bg-white, border
            className="flex-none w-[250px] md:w-[350px] group cursor-pointer snap-start flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={onClick}
        >
            {/* Image Container - ตัด margin-bottom และ border-radius ออกเพราะ Parent จัดการแล้ว */}
            <div className="relative aspect-video bg-zinc-200">
                <div className={`absolute inset-0 bg-zinc-300 animate-pulse ${isLoaded ? 'hidden' : 'block'}`} />

                <Image
                    src={video.thumbnail || getYouTubeThumbnail(video.youtubeUrl, 'hq')}
                    alt={video.title[locale as "th" | "en"]}
                    fill
                    unoptimized
                    loading="lazy"
                    className={`object-cover group-hover:scale-110 transition-all duration-700 ease-in-out ${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-110'
                        }`}
                    onLoad={() => setIsLoaded(true)}
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                        <Play className="text-white fill-current translate-x-1" size={24} />
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                        {video.category[locale as "th" | "en"]}
                    </span>
                </div>
            </div>

            {/* Content Container - ใช้ flex-1 เพื่อยืดเนื้อหา */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-1">
                    {video.title[locale as "th" | "en"]}
                </h3>

                <div className="text-sm text-zinc-500 line-clamp-2 mb-4 flex-1">
                    {Array.isArray(video.description)
                        ? video.description.map(d => d[locale as "th" | "en"]).join(" ")
                        : video.description[locale as "th" | "en"]}
                </div>

                {/* Footer Section - ใช้ mt-auto เพื่อดันลงล่างสุด */}
                <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                        Discover more <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}