"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface NewsItem {
    title: string;
    description: string;
    date?: string;
    full_content?: string;
    images?: string[];
}

interface NewsDetailModalProps {
    item: NewsItem | null;
    onClose: () => void;
}

export default function NewsDetailModal({ item, onClose }: NewsDetailModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!item) return null;

    const nextImage = () => {
        if (item.images) {
            setCurrentImageIndex((prev) => (prev + 1) % item.images!.length);
        }
    };

    const prevImage = () => {
        if (item.images) {
            setCurrentImageIndex((prev) => (prev - 1 + item.images!.length) % item.images!.length);
        }
    };

    return (
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
                >
                    <motion.div
                        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-100 shrink-0">
                            <div className="flex items-center gap-2 text-green-primary font-bold text-sm uppercase tracking-wider">
                                <Calendar size={16} />
                                {item.date}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Scroll Area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden">
                            {/* Hero Image / Gallery */}
                            {item.images && item.images.length > 0 && (
                                <div className="relative aspect-video bg-zinc-100 overflow-hidden">
                                    <Image
                                        src={item.images[currentImageIndex]}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {item.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
                                            >
                                                <ChevronLeft size={24} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
                                            >
                                                <ChevronRight size={24} />
                                            </button>
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-full">
                                                {item.images.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-3' : 'bg-white/40'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            <div className="p-8 md:p-12 space-y-8">
                                <h2 className="text-3xl md:text-4xl font-black text-ink leading-tight">
                                    {item.title}
                                </h2>

                                <div className="prose prose-zinc max-w-none">
                                    {item.full_content ? (
                                        <div className="whitespace-pre-line text-lg text-zinc-600 leading-relaxed font-light">
                                            {item.full_content}
                                        </div>
                                    ) : (
                                        <p className="text-lg text-zinc-600 leading-relaxed font-light">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-end shrink-0">
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-green-primary hover:bg-green-dark text-white rounded-xl font-bold transition-all shadow-lg shadow-green-primary/10 uppercase text-sm tracking-widest"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
