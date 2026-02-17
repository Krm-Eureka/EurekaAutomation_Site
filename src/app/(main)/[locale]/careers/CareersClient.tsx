'use client';

import { withBasePath } from "@/lib/utils";

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
    translations: Record<string, any>
}) => (
    <motion.div
        variants={itemVariants}
        className={`group relative transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer ${isExpanded
            ? 'bg-zinc-900 ring-1 ring-emerald-500/50 shadow-2xl shadow-emerald-900/20'
            : 'bg-white border border-zinc-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5'
            }`}
        onClick={onToggle}
    >
        <div className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
                <div className="space-y-3 flex-grow">
                    {/* Header: Dept & Location */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] uppercase tracking-wider">
                            {pos.dept}
                        </span>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                            <MapPin size={14} />
                            {pos.location}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl md:text-2xl font-bold leading-tight transition-colors ${isExpanded ? 'text-white' : 'text-zinc-900 group-hover:text-emerald-600'
                        }`}>
                        {pos.title}
                    </h3>

                    {/* Meta Grid - High Legibility */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 pt-1">
                        {[
                            { icon: Briefcase, text: pos.experience, label: translations.labels.experience || 'Experience' },
                            { icon: GraduationCap, text: pos.education, label: translations.labels.education || 'Education' },
                            { icon: Clock, text: pos.type, label: 'Type' },
                            { icon: Coins, text: pos.salary, label: translations.labels.salary || 'Salary' }
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className={`p-1.5 rounded-lg ${isExpanded ? 'bg-zinc-800 text-emerald-400' : 'bg-zinc-100 text-zinc-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                                    <stat.icon size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[9px] uppercase font-bold tracking-wider ${isExpanded ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                        {stat.label}
                                    </span>
                                    <span className={`text-xs font-semibold ${isExpanded ? 'text-zinc-200' : 'text-zinc-700'}`}>
                                        {stat.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expand Toggle */}
                <div className="flex items-center self-end md:self-start mt-3 md:mt-0">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${isExpanded
                        ? 'bg-emerald-500 text-zinc-900'
                        : 'bg-zinc-100 text-zinc-600 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                        }`}>
                        {isExpanded ? 'Close' : 'Details'}
                        <ChevronDown size={14} className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`pt-6 mt-6 border-t ${isExpanded ? 'border-zinc-800' : 'border-zinc-100'}`}>

                            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                {/* Left Column: Qualifications & Benefits */}
                                <div className="space-y-6">
                                    {pos.qualification && pos.qualification.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="flex items-center gap-2 font-bold text-emerald-500 uppercase tracking-widest text-[10px]">
                                                <CheckCircle2 size={14} /> Qualifications
                                            </h4>
                                            <ul className="space-y-2">
                                                {pos.qualification.map((line, idx) => (
                                                    <li key={idx} className="flex gap-2.5 text-sm text-zinc-400 group/item">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 flex-shrink-0"></span>
                                                        <span className="leading-relaxed">{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {pos.benefits && pos.benefits.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="flex items-center gap-2 font-bold text-emerald-500 uppercase tracking-widest text-[10px]">
                                                <CheckCircle2 size={14} /> Benefits
                                            </h4>
                                            <ul className="space-y-2">
                                                {pos.benefits.map((line, idx) => (
                                                    <li key={idx} className="flex gap-2.5 text-sm text-zinc-400">
                                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 flex-shrink-0"></span>
                                                        <span className="leading-relaxed">{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: Responsibilities & Apply */}
                                <div className="space-y-6 flex flex-col h-full">
                                    {pos.desc && (Array.isArray(pos.desc) ? pos.desc.length > 0 : !!pos.desc) && (
                                        <div className="space-y-3 flex-grow">
                                            <h4 className="flex items-center gap-2 font-bold text-emerald-500 uppercase tracking-widest text-[10px]">
                                                <Briefcase size={14} /> Responsibilities
                                            </h4>
                                            <div className="space-y-2">
                                                {Array.isArray(pos.desc) ? (
                                                    pos.desc.map((line, idx) => (
                                                        <div key={idx} className="flex gap-2.5 text-sm text-zinc-400">
                                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 flex-shrink-0"></span>
                                                            <span className="leading-relaxed">{line}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-zinc-400 leading-relaxed text-sm">{pos.desc}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4 mt-auto">
                                        <button
                                            onClick={() => {
                                                window.dispatchEvent(new CustomEvent('apply-position', { detail: pos.title }));
                                                document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }}
                                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
                                        >
                                            {translations.apply_now}
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
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
        <div className="bg-zinc-50 min-h-screen overflow-hidden">
            {/* 1. Hero Section - Compact */}
            <section className="bg-zinc-950 pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-20 text-white overflow-hidden relative">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-450 to-zinc-950"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="font-mono text-[8px] sm:text-[9px] text-zinc-700 absolute top-0 left-8 hidden lg:block tracking-[0.5em] [writing-mode:vertical-lr] uppercase h-full opacity-50">
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
                            className="inline-flex items-center gap-3 px-3 py-1.5 bg-zinc-900/80 border border-white/5 rounded-full mb-6 backdrop-blur-2xl"
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">{translations.join_tag}</span>
                            </span>
                            <div className="w-[1px] h-3 bg-white/10"></div>
                            <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">System_Live</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] uppercase italic">
                            {translations.title.split(' ').map((word: string, i: number) => (
                                <span key={i} className={i === 0 ? "text-white" : "text-zinc-800 block md:inline"}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-10 px-4">
                            {translations.subtitle}
                        </p>

                        {/* View Toggle Buttons - Interface Style */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <div className="flex p-1 bg-zinc-900 border border-white/10 rounded-xl backdrop-blur-xl">
                                <button
                                    onClick={() => setViewMode('all')}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-[9px] uppercase tracking-widest flex items-center gap-2 transition-all duration-500 ${viewMode === 'all'
                                        ? 'bg-emerald-500 text-zinc-950 shadow-[0_10px_20px_rgba(16,185,129,0.2)]'
                                        : 'text-zinc-500 hover:text-white'
                                        }`}
                                >
                                    <List size={14} />
                                    {translations.view_all}
                                </button>
                                <button
                                    onClick={() => setViewMode('category')}
                                    className={`px-6 py-2.5 rounded-lg font-bold text-[9px] uppercase tracking-widest flex items-center gap-2 transition-all duration-500 ${viewMode === 'category'
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

            {/* 2. Benefits Section - Compact */}
            <section className="py-12 bg-zinc-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white hidden lg:block"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1px] w-6 bg-emerald-600"></div>
                                <span className="font-mono text-emerald-600 font-bold tracking-[0.4em] uppercase text-[9px]">EUREKA_CULTURE</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-6 tracking-tighter leading-[0.9] uppercase italic">
                                {translations.benefits}
                            </h2>
                            <div className="grid gap-2">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white border border-zinc-100 hover:border-emerald-500/30 hover:shadow-lg transition-all duration-500 group"
                                    >
                                        <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-500 shadow-sm">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-zinc-900 font-bold text-base leading-tight">{benefit}</span>
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
                            className="relative hidden lg:block"
                        >
                            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full transform -translate-y-8"></div>
                            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-[2rem] border border-zinc-200 shadow-2xl bg-zinc-950 shadow-emerald-500/10">
                                <Image
                                    src={withBasePath("/images/careers-hologram.webp")}
                                    alt="Careers at Eureka"
                                    fill
                                    className="object-cover opacity-80 mix-blend-screen group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                                <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1 bg-zinc-900/80 border border-white/10 rounded-full backdrop-blur-md">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">Feed: Internal_Operations</span>
                                </div>
                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="font-mono text-emerald-500 font-bold tracking-[0.5em] uppercase text-[9px] mb-2">Enterprise Core</div>
                                    <h3 className="text-white text-3xl font-black tracking-tight leading-none uppercase italic">The Robotics<br />Revolution</h3>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Open Positions Section - Compact */}
            <section className="py-8 sm:py-12 bg-zinc-950 border-t border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1px] w-6 bg-emerald-500"></div>
                                <span className="font-mono text-emerald-500 font-black tracking-[0.4em] uppercase text-[9px]">DEPLOYMENT_UNIT</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase italic">
                                {translations.open_positions}
                            </h2>
                        </div>
                        <div className="font-mono text-zinc-600 text-[9px] md:text-right border border-white/5 p-3 rounded-lg bg-white/[0.02] tracking-widest uppercase">
                            Operational_Slots: {positionKeys.length} / Found
                        </div>
                    </motion.div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-3 mb-10">
                        <div className="relative flex-grow group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-zinc-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder={locale === 'th' ? "ค้นหาตำแหน่งงาน..." : "Search positions..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-400 text-sm"
                            />
                        </div>

                        {/* Department Filter */}
                        <div className="relative min-w-[200px] z-10">
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="w-full pl-4 pr-10 py-3 bg-zinc-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 appearance-none uppercase tracking-wider text-xs font-medium cursor-pointer hover:bg-zinc-800 transition-colors"
                            >
                                <option value="All" className="bg-zinc-900 text-zinc-300">{locale === 'th' ? "ทุกแผนก" : "All Departments"}</option>
                                {uniqueDepts.map(dept => (
                                    <option key={dept} value={dept} className="bg-zinc-900 text-zinc-300">
                                        {dept}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-500">
                                <ChevronDown size={14} />
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
                                className="space-y-3"
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
                                    <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mb-3 text-zinc-600">
                                            <Search size={20} />
                                        </div>
                                        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
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
                                className="space-y-12"
                            >
                                {(() => {
                                    // Group filtered positions by department
                                    const availableDepts = Array.from(new Set(filteredPositions.map(p => p.dept))).filter(Boolean);

                                    if (availableDepts.length === 0) {
                                        return (
                                            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mb-3 text-zinc-600">
                                                    <Search size={20} />
                                                </div>
                                                <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
                                                    {locale === 'th' ? "ไม่พบตำแหน่งงานที่ค้นหา" : "No positions found matching criteria"}
                                                </p>
                                            </div>
                                        );
                                    }

                                    return availableDepts.map((dept) => (
                                        <div key={dept} className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-xl md:text-2xl font-black text-white italic italic-none tracking-tighter uppercase">
                                                    {dept}
                                                </h3>
                                                <div className="h-[1px] flex-grow bg-white/5"></div>
                                                <div className="text-zinc-600 text-[9px] font-black tracking-widest uppercase">
                                                    {filteredPositions.filter(p => p.dept === dept).length} SLOT(S)
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3">
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

            {/* 4. Application Form Section - Compact */}
            <section id="apply" className="py-12 sm:py-20 bg-zinc-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-5 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 space-y-4"
                    >
                        <span className="text-emerald-600 font-black tracking-[0.4em] uppercase text-[9px] block">Ready to deploy?</span>
                        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tighter leading-none uppercase italic">
                            {translations.apply_today}
                        </h2>
                        <p className="text-base text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                            {translations.apply_desc}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-zinc-200/50"
                    >
                        <CareersForm />
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