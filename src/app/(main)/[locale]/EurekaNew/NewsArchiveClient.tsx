"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface NewsItem {
    id: string;
    title: string;
    date: string;
    postedDate?: string;
    images: string[];
    desc: string;
}

export default function NewsArchiveClient({
    news,
    title,
    tagline
}: {
    news: NewsItem[],
    title: string,
    tagline: string
}) {
    // Group news by year based on postedDate
    const groupedNews = news.reduce((acc, item) => {
        let year = "Unknown";
        if (item.postedDate) {
            year = new Date(item.postedDate).getFullYear().toString();
        } else {
            // Fallback to parsing the display date if it's in a format like "10 ม.ค. 2568"
            const match = item.date.match(/\d{4}$/);
            if (match) year = match[0];
        }

        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
    }, {} as Record<string, NewsItem[]>);

    // Sort years descending
    const sortedYears = Object.keys(groupedNews).sort((a, b) => b.localeCompare(a));

    // Sort items within each year descending by postedDate
    sortedYears.forEach(year => {
        groupedNews[year].sort((a, b) => {
            const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
            const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
            return dateB - dateA;
        });
    });

    return (
        <div className="min-h-screen bg-zinc-300 font-sans pt-20">
            {/* Hero Section */}
            <section className="bg-zinc-300 py-4 md:py-6 border-b border-zinc-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 bg-green-ultra text-green-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full"
                        >
                            {tagline}
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-[8rem] font-black text-ink leading-[0.85] italic uppercase tracking-tighter"
                        >
                            {title}
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* Archive Content */}
            <main className="container mx-auto px-4 py-8 md:py-6">
                <div className="max-w-5xl mx-auto space-y-16">
                    {sortedYears.map((year) => (
                        <div key={year} className="space-y-8">
                            {/* Year Header */}
                            <div className="flex items-center gap-4 group">
                                <h2 className="text-5xl md:text-[6rem] font-black text-zinc-100 italic leading-none select-none transition-colors group-hover:text-zinc-200">
                                    {year}
                                </h2>
                                <div className="h-[2px] flex-grow bg-zinc-100" />
                            </div>

                            {/* News List */}
                            <div className="space-y-8 md:space-y-12">
                                {groupedNews[year].map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            href={`/EurekaNew/${item.id}`}
                                            className="group block bg-white rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-zinc-100"
                                        >
                                            <div className="flex flex-col md:flex-row min-h-[350px]">
                                                {/* Left: Image Container */}
                                                <div className="md:w-2/5 relative overflow-hidden shrink-0 aspect-video md:aspect-auto">
                                                    <Image
                                                        src={item.images[0] || "/images/Our_Legacy.webp"}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>

                                                {/* Right: Content Container */}
                                                <div className="md:w-3/5 p-4 md:p-8 flex flex-col justify-center space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-[2px] bg-green-primary" />
                                                        <div className="text-green-primary text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                                            <Calendar size={8} />
                                                            {item.date}
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl md:text-4xl font-black text-ink leading-[1] italic uppercase tracking-tighter group-hover:text-green-primary transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-zinc-500 text-lg font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                                                        {item.desc}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-green-primary transition-colors">
                                                        <Clock size={8} />
                                                        Read Full Article
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
