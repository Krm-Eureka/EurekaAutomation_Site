'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { CareersForm } from "@/components/sections/CareersForm";
import { MapPin, Clock, ChevronRight, CheckCircle2, List, Grid3x3, Briefcase, GraduationCap, Coins, Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CareerPosition {
    id: string;
    dept: string;
    title: string;
    location: string;
    type: string;
    desc: string | string[];
    experience: string;
    education: string;
    salary: string;
    qualification?: string[];
    benefits?: string[];
}

interface CareersClientProps {
    locale: string;
    positionKeys: string[];
    benefits: string[];
    positions: CareerPosition[];
    translations: {
        title: string;
        subtitle: string;
        benefits: string;
        open_positions: string;
        apply_now: string;
        apply_today: string;
        apply_desc: string;
        join_tag: string;
        view_all: string;
        view_category: string;
        labels: {
            experience: string;
            education: string;
            salary: string;
        };
        benefits_title: string;
        responsibilities_label: string;
    };
}

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const JobCard = ({ pos, isExpanded, onToggle, translations }: {
    pos: CareerPosition,
    isExpanded: boolean,
    onToggle: () => void,
    translations: any
}) => (
    <motion.div
        variants={itemVariants}
        className={`group relative transition-all duration-700 rounded-[2rem] overflow-hidden ${isExpanded
            ? 'bg-zinc-900 border-zinc-700 shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)]'
            : 'bg-zinc-950/40 border-white/[0.03] hover:border-emerald-500/30 hover:bg-zinc-900/60'
            } border`}
    >
        {/* Technical Corner Accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-4 right-6 font-mono text-[8px] text-zinc-700 uppercase tracking-widest pointer-events-none">
            [ ID: {pos.id.slice(0, 8)} ]
        </div>

        <div
            className="p-4 md:p-8 cursor-pointer select-none"
            onClick={onToggle}
        >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="space-y-4 flex-grow">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                                {pos.dept}
                            </span>
                        </div>
                        <div className="h-[10px] w-[1px] bg-zinc-800"></div>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                            <MapPin size={10} className="text-zinc-600" /> {pos.location}
                        </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tighter uppercase italic leading-none">
                        {pos.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        {[
                            { icon: Briefcase, text: pos.experience, color: 'emerald' },
                            { icon: GraduationCap, text: pos.education, color: 'blue' },
                            { icon: Clock, text: pos.type, color: 'zinc' },
                            { icon: Coins, text: pos.salary, color: 'zinc' }
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-400/30 rounded-lg border border-white/[0.05] group-hover:border-white/[0.1] transition-colors">
                                <stat.icon size={16} className={`text-${stat.color}-500/70`} />
                                <span className="font-mono text-[9px] text-zinc-300 font-bold uppercase tracking-wider">{stat.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center self-end md:self-start">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-700 ${isExpanded
                        ? 'bg-emerald-500 border-emerald-400 text-zinc-950 rotate-180 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-zinc-900 border-white/10 text-zinc-500 group-hover:border-emerald-500/50 group-hover:text-emerald-400'
                        }`}>
                        <ChevronDown size={20} />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="pt-10 mt-10 border-t border-white/[0.05] space-y-12">
                            {pos.qualification && pos.qualification.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/60">
                                            Qualifications
                                        </span>
                                        <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
                                    </div>
                                    <div className="grid gap-2">
                                        {pos.qualification.map((line, idx) => (
                                            <div key={idx} className="flex gap-2 p-1 md:p-2 rounded-2xl bg-zinc-950/50 border border-white/[0.03] hover:border-emerald-500/20 hover:bg-zinc-900/50 transition-all duration-300 group/item">
                                                <div className="font-mono text-[10px] text-emerald-500/40 p-1 w-6 h-6 rounded bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/item:border-emerald-500/30 group-hover/item:text-emerald-400 transition-colors">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </div>
                                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-200 transition-colors">{line}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pos.benefits && pos.benefits.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/60">
                                            Benefits
                                        </span>
                                        <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
                                    </div>
                                    <div className="grid gap-2">
                                        {pos.benefits.map((line, idx) => (
                                            <div key={idx} className="flex gap-2 p-1 md:p-2 rounded-2xl bg-zinc-950/50 border border-white/[0.03] hover:border-emerald-500/20 hover:bg-zinc-900/50 transition-all duration-300 group/item">
                                                <div className="font-mono text-[10px] text-emerald-500/40 p-1 w-6 h-6 rounded bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/item:border-emerald-500/30 group-hover/item:text-emerald-400 transition-colors">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </div>
                                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-200 transition-colors">{line}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pos.desc && (Array.isArray(pos.desc) ? pos.desc.length > 0 : !!pos.desc) && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/60">
                                            Responsibilities
                                        </span>
                                        <div className="h-[1px] flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
                                    </div>

                                    <div className="grid gap-2">
                                        {Array.isArray(pos.desc) ? (
                                            pos.desc.map((line, idx) => (
                                                <div key={idx} className="flex gap-2 p-1 md:p-2 rounded-2xl bg-zinc-950/50 border border-white/[0.03] hover:border-emerald-500/20 hover:bg-zinc-900/50 transition-all duration-300 group/item">
                                                    <div className="font-mono text-[10px] text-emerald-500/40 p-1 w-6 h-6 rounded bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/item:border-emerald-500/30 group-hover/item:text-emerald-400 transition-colors">
                                                        {(idx + 1).toString().padStart(2, '0')}
                                                    </div>
                                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-200 transition-colors">{line}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-zinc-400 italic p-6">{pos.desc}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.05]">
                                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.2em] hidden sm:block">
                                    Status: Awaiting_Deployment
                                </div>
                                <button
                                    onClick={() => {
                                        window.dispatchEvent(new CustomEvent('apply-position', { detail: pos.title }));
                                        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }}
                                    className="w-full sm:w-auto px-10 py-5 bg-emerald-500 text-zinc-950 rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                                >
                                    {translations.apply_now}
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.div>
);

export default function CareersClient({ locale, positionKeys, benefits, positions, translations }: CareersClientProps) {
    const [viewMode, setViewMode] = useState<'all' | 'category'>('all');
    const [expandedPositions, setExpandedPositions] = useState<string[]>([]);

    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    // Memoize unique departments to prevent re-calculations and ensure stability
    const uniqueDepts = useMemo(() => {
        return Array.from(new Set(positions.map(p => p.dept?.trim()).filter(Boolean))).sort();
    }, [positions]);

    const togglePosition = (id: string) => {
        setExpandedPositions(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    // Filter Logic
    const filteredPositions = positions.filter(pos => {
        const matchesSearch = pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pos.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (Array.isArray(pos.desc) ? pos.desc.join(' ') : pos.desc).toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDept = selectedDept === 'All' || pos.dept?.trim() === selectedDept;

        return matchesSearch && matchesDept;
    });

    return (
        <div className="bg-zinc-50 min-h-screen">
            {/* 1. Hero Section - Refined Pro Tech */}
            <section className="bg-zinc-950 pt-28 sm:pt-36 md:pt-48 pb-20 sm:pb-32 text-white overflow-hidden relative">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-450 to-zinc-950"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="font-mono text-[8px] sm:text-[10px] text-zinc-700 absolute top-0 left-8 hidden lg:block tracking-[0.5em] [writing-mode:vertical-lr] uppercase h-full opacity-50">
                        Eureka Automation || Your Automation Partner
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-4 px-4 py-2 bg-zinc-900/80 border border-white/5 rounded-full mb-8 backdrop-blur-2xl"
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">{translations.join_tag}</span>
                            </span>
                            <div className="w-[1px] h-3 bg-white/10"></div>
                            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">System_Live</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] uppercase italic">
                            {translations.title.split(' ').map((word: string, i: number) => (
                                <span key={i} className={i === 0 ? "text-white" : "text-zinc-800 block md:inline"}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-16 px-4">
                            {translations.subtitle}
                        </p>

                        {/* View Toggle Buttons - Interface Style */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="flex p-1.5 bg-zinc-900 border border-white/10 rounded-2xl backdrop-blur-xl">
                                <button
                                    onClick={() => setViewMode('all')}
                                    className={`px-8 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2.5 transition-all duration-500 ${viewMode === 'all'
                                        ? 'bg-emerald-500 text-zinc-950 shadow-[0_10px_20px_rgba(16,185,129,0.2)]'
                                        : 'text-zinc-500 hover:text-white'
                                        }`}
                                >
                                    <List size={14} />
                                    {translations.view_all}
                                </button>
                                <button
                                    onClick={() => setViewMode('category')}
                                    className={`px-8 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2.5 transition-all duration-500 ${viewMode === 'category'
                                        ? 'bg-emerald-500 text-zinc-950 shadow-[0_10px_20px_rgba(16,185,129,0.2)]'
                                        : 'text-zinc-500 hover:text-white'
                                        }`}
                                >
                                    <Grid3x3 size={14} />
                                    {translations.view_category}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Benefits Section - Structured Tech */}
            <section className="py-16 bg-zinc-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white hidden lg:block"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8 bg-emerald-600"></div>
                                <span className="font-mono text-emerald-600 font-bold tracking-[0.4em] uppercase text-[10px]">EUREKA_CULTURE</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-zinc-900 mb-8 tracking-tighter leading-[0.9] uppercase italic">
                                {translations.benefits}
                            </h2>
                            <div className="grid gap-3">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-1.5 p-2 rounded-2xl bg-white border border-zinc-100 hover:border-emerald-500/30 hover:shadow-xl transition-all duration-500 group"
                                    >
                                        <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-500 shadow-sm">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-zinc-900 font-bold text-lg leading-tight">{benefit}</span>
                                            <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-widest mt-1">Confirmed_Standard</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full transform -translate-y-8"></div>
                            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-zinc-200 shadow-2xl bg-zinc-950 shadow-emerald-500/10">
                                <Image
                                    src="/images/careers-hologram.png"
                                    alt="Careers at Eureka"
                                    fill
                                    className="object-cover opacity-80 mix-blend-screen group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                                <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-white/10 rounded-full backdrop-blur-md">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">Feed: Internal_Operations</span>
                                </div>
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="font-mono text-emerald-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-3">Enterprise Core</div>
                                    <h3 className="text-white text-4xl font-black tracking-tight leading-none uppercase italic">The Robotics<br />Revolution</h3>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Open Positions Section */}
            <section className="py-8 sm:py-16 bg-zinc-950 border-t border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-8 bg-emerald-500"></div>
                                <span className="font-mono text-emerald-500 font-black tracking-[0.4em] uppercase text-[10px]">DEPLOYMENT_UNIT</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase italic">
                                {translations.open_positions}
                            </h2>
                        </div>
                        <div className="font-mono text-zinc-600 text-[10px] md:text-right border border-white/5 p-4 rounded-xl bg-white/[0.02] tracking-widest uppercase">
                            Operational_Slots: {positionKeys.length} / Found
                        </div>
                    </motion.div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12">
                        <div className="relative flex-grow group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-zinc-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder={locale === 'th' ? "ค้นหาตำแหน่งงาน..." : "Search positions..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all uppercase tracking-wider text-sm font-medium"
                            />
                        </div>

                        {/* Department Filter */}
                        <div className="relative min-w-[200px] z-10">
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="w-full pl-4 pr-10 py-4 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 appearance-none uppercase tracking-wider text-sm font-medium cursor-pointer hover:bg-zinc-800 transition-colors"
                            >
                                <option value="All" className="bg-zinc-900 text-zinc-300">{locale === 'th' ? "ทุกแผนก" : "All Departments"}</option>
                                {uniqueDepts.map(dept => (
                                    <option key={dept} value={dept} className="bg-zinc-900 text-zinc-300">
                                        {dept}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-500">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {viewMode === 'all' ? (
                            <motion.div
                                key={`all-${selectedDept}-${searchTerm}`}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                {filteredPositions.length > 0 ? (
                                    filteredPositions.map((pos) => (
                                        <JobCard
                                            key={pos.id}
                                            pos={pos}
                                            isExpanded={expandedPositions.includes(pos.id)}
                                            onToggle={() => togglePosition(pos.id)}
                                            translations={translations}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4 text-zinc-600">
                                            <Search size={24} />
                                        </div>
                                        <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                                            {locale === 'th' ? "ไม่พบตำแหน่งงานที่ค้นหา" : "No positions found matching criteria"}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key={`category-${selectedDept}-${searchTerm}`}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0 }}
                                className="space-y-16"
                            >
                                {(() => {
                                    // Group filtered positions by department
                                    const availableDepts = Array.from(new Set(filteredPositions.map(p => p.dept))).filter(Boolean);

                                    if (availableDepts.length === 0) {
                                        return (
                                            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4 text-zinc-600">
                                                    <Search size={24} />
                                                </div>
                                                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                                                    {locale === 'th' ? "ไม่พบตำแหน่งงานที่ค้นหา" : "No positions found matching criteria"}
                                                </p>
                                            </div>
                                        );
                                    }

                                    return availableDepts.map((dept) => (
                                        <div key={dept} className="space-y-8">
                                            <div className="flex items-center gap-6">
                                                <h3 className="text-2xl md:text-3xl font-black text-white italic italic-none tracking-tighter uppercase">
                                                    {dept}
                                                </h3>
                                                <div className="h-[1px] flex-grow bg-white/5"></div>
                                                <div className="text-zinc-600 text-[10px] font-black tracking-widest uppercase">
                                                    {filteredPositions.filter(p => p.dept === dept).length} SLOT(S)
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                {filteredPositions
                                                    .filter(p => p.dept === dept)
                                                    .map((pos) => (
                                                        <JobCard
                                                            key={pos.id}
                                                            pos={pos}
                                                            isExpanded={expandedPositions.includes(pos.id)}
                                                            onToggle={() => togglePosition(pos.id)}
                                                            translations={translations}
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 4. Application Form Section */}
            <section id="apply" className="py-8 sm:py-16 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-5 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20 space-y-6"
                    >
                        <span className="text-emerald-600 font-black tracking-[0.4em] uppercase text-[10px] block">Ready to deploy?</span>
                        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-none uppercase italic">
                            {translations.apply_today}
                        </h2>
                        <p className="text-lg text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                            {translations.apply_desc}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-50 p-2 md:p-3 rounded-[3rem] shadow-2xl shadow-zinc-200/50 border border-zinc-100"
                    >
                        <div className="bg-white rounded-[2.5rem] overflow-hidden">
                            <CareersForm />
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

// Helper component for arrow animation
function ArrowIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover/btn:translate-x-1 transition-transform"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}