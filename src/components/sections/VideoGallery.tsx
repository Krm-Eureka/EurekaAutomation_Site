"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
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

    // State for mouse dragging on desktop
    const [isDragging, setIsDragging] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false); // Track if mouse is held
    const [startX, setStartX] = useState(0);
    const [mouseDownX, setMouseDownX] = useState(0); // Track initial down position
    const [scrollLeftState, setScrollLeftState] = useState(0);

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
            const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;

            let targetScroll;
            if (direction === 'left') {
                // Infinite Loop: If at the very beginning, go to the end
                if (scrollLeft <= 50) {
                    targetScroll = scrollWidth;
                } else {
                    targetScroll = scrollLeft - scrollAmount;
                }
            } else {
                // Infinite Loop: If at the very end, go back to start
                if (scrollLeft + clientWidth >= scrollWidth - 50) {
                    targetScroll = 0;
                } else {
                    targetScroll = scrollLeft + scrollAmount;
                }
            }

            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    // Drag Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsMouseDown(true);
        // Don't set isDragging to true yet, just record the start position
        setMouseDownX(e.pageX);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeftState(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown || !scrollContainerRef.current) return;

        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const distance = Math.abs(e.pageX - mouseDownX);

        // Only start dragging if the distance is greater than the threshold (e.g., 15 pixels)
        if (distance > 15) {
            if (!isDragging) setIsDragging(true);
            e.preventDefault();
            const walk = (x - startX) * 2; // Scroll speed multiplier
            scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
        }
    };

    const handleMouseUpOrLeave = () => {
        setIsMouseDown(false);
        // Use a small timeout to allow a click event to finish if it was a very brief drag or click
        setTimeout(() => setIsDragging(false), 50);
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
                            className={`px-6 py-2.5 rounded-full text-[15px] font-bold transition-all ${selectedCategory === category
                                ? 'bg-green-primary text-white shadow-[0_8px_20px_rgba(34,169,82,0.3)]'
                                : 'bg-transparent text-ink-muted border border-green-primary/20 hover:border-green-primary hover:text-green-primary'
                                }`}
                        >
                            {category === "All" ? (locale === "th" ? "ทั้งหมด" : "All") : category}
                        </button>
                    ))}
                </div>
            )}

            {/* Video Slider Container */}
            <div className="relative group/gallery">
                {/* Navigation Buttons - Positioned outside the carousel area */}
                <button
                    onClick={(e) => { e.stopPropagation(); scroll('left'); }}
                    className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-zinc-100 text-zinc-600 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:block"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); scroll('right'); }}
                    className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-zinc-100 text-zinc-600 hover:text-emerald-600 hover:scale-110 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:block"
                >
                    <ChevronRight size={24} />
                </button>

                {/* เพิ่ม items-stretch เพื่อให้การ์ดสูงเท่ากัน */}
                <div
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    className={`flex overflow-x-auto gap-6 pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 items-stretch select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredVideos.map((video) => (
                            <div key={video.id} className={isDragging ? "pointer-events-none" : ""}>
                                <VideoCard
                                    video={video}
                                    locale={locale}
                                    onClick={() => setSelectedVideo(video)}
                                    getYouTubeThumbnail={getYouTubeThumbnail}
                                />
                            </div>
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
            className="flex-none w-[300px] md:w-[350px] group cursor-pointer snap-start flex flex-col h-full bg-paper rounded-[20px] overflow-hidden border border-black/5 hover:border-green-primary/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            onClick={onClick}
        >
            <div className="relative aspect-video w-full overflow-hidden shrink-0">
                {(video.thumbnail || getYouTubeThumbnail(video.youtubeUrl, 'hq')) ? (
                    <>
                        <div className={`absolute inset-0 bg-zinc-200 animate-pulse ${isLoaded ? 'hidden' : 'block'}`} />
                        <Image
                            src={video.thumbnail || getYouTubeThumbnail(video.youtubeUrl, 'hq')}
                            alt={video.title[locale as "th" | "en"]}
                            fill
                            unoptimized
                            loading="lazy"
                            className={`object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'
                                }`}
                            onLoad={() => setIsLoaded(true)}
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 text-zinc-400">
                        <span className="text-xs uppercase tracking-wider font-medium">No Preview</span>
                    </div>
                )}

                {/* Overlay with subtle dark gradient at bottom for category pill visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity z-0"></div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110">
                    <div className="w-[60px] h-[60px] bg-white backdrop-blur-md rounded-[15px] flex items-center justify-center text-green-primary shadow-[0_10px_20px_rgba(0,0,0,0.15)] group-hover:rotate-12 transition-all">
                        <Play className="fill-current" size={24} />
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 bg-green-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-md shadow-md">
                        {video.category[locale as "th" | "en"]}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-6 relative bg-white z-10">
                <h3 className="text-[1.2rem] font-bold text-ink group-hover:text-green-primary transition-colors mb-3 line-clamp-2 leading-snug">
                    {video.title[locale as "th" | "en"]}
                </h3>

                <div className="text-[15px] text-ink-muted line-clamp-2 leading-relaxed mb-4">
                    {Array.isArray(video.description)
                        ? video.description.map(d => d[locale as "th" | "en"]).join(" ")
                        : video.description[locale as "th" | "en"]}
                </div>
            </div>
        </motion.div>
    );
}