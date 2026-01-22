'use client';

import { useState } from 'react';
import { CareersForm } from "@/components/sections/CareersForm";
import { MapPin, Clock, ChevronRight, CheckCircle2, List, Grid3x3, Briefcase, GraduationCap, Coins, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม Framer Motion

interface CareerPosition {
    id: string;
    dept: string;
    title: string;
    location: string;
    type: string;
    desc: string;
    experience: string;
    education: string;
    salary: string;
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
    };
}

export default function CareersClient({ locale, positionKeys, benefits, positions, translations }: CareersClientProps) {
    const [viewMode, setViewMode] = useState<'all' | 'category'>('all');

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // ให้ลูกๆ โผล่มาทีละนิด
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-zinc-50 min-h-screen">
            {/* 1. Hero Section - Animated */}
            <section className="bg-zinc-950 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 text-white overflow-hidden relative">
                <div className="absolute inset-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6 backdrop-blur-md"
                        >
                            {translations.join_tag}
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                            {translations.title}
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {translations.subtitle}
                        </p>
                    </motion.div>

                    {/* View Toggle Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4 justify-center"
                    >
                        <button
                            onClick={() => setViewMode('all')}
                            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 ${viewMode === 'all'
                                ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                                : 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <List size={18} />
                            {translations.view_all}
                        </button>
                        <button
                            onClick={() => setViewMode('category')}
                            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-300 ${viewMode === 'category'
                                ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                                : 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Grid3x3 size={18} />
                            {translations.view_category}
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* 2. Benefits Section - Staggered List */}
            <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8 tracking-tight">
                                {translations.benefits}
                            </h2>
                            <div className="space-y-6">
                                {benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className="flex items-center gap-5 p-4 rounded-2xl hover:bg-zinc-50 transition-colors group border border-transparent hover:border-zinc-100"
                                    >
                                        <div className="w-12 h-12 bg-emerald-100/50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-emerald-200">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <span className="text-lg text-zinc-700 font-medium group-hover:text-zinc-900">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-emerald-600/20 blur-3xl rounded-full transform -translate-y-4 translate-x-4"></div>
                            <div className="bg-zinc-900 rounded-[2.5rem] aspect-[4/3] relative overflow-hidden shadow-2xl flex items-center justify-center border border-zinc-800">
                                <div className="absolute inset-0 opacity-30">
                                    {/* Abstract shapes or pattern could go here */}
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad)" />
                                        <defs>
                                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" style={{ stopColor: 'rgb(16, 185, 129)', stopOpacity: 0.2 }} />
                                                <stop offset="100%" style={{ stopColor: 'rgb(6, 78, 59)', stopOpacity: 0 }} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="text-center z-10 p-8">
                                    <span className="block text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase mb-2">Join the future</span>
                                    <span className="text-white text-5xl md:text-7xl font-black tracking-tighter">EUREKA</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Open Positions Section - Layout Animation */}
            <section className="py-16 sm:py-20 lg:py-24 bg-zinc-50 border-t border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
                    >
                        <div>
                            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">We are hiring</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                                {translations.open_positions}
                            </h2>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {viewMode === 'all' ? (
                            <motion.div
                                key="all"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0 }}
                                className="grid gap-6"
                            >
                                {positionKeys.map((key) => {
                                    const pos = positions.find(p => p.id === key);
                                    if (!pos) return null;

                                    return (
                                        <motion.div
                                            key={key}
                                            variants={itemVariants}
                                            className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                                            whileHover={{ y: -4 }}
                                        >
                                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                                                <Briefcase size={120} className="text-emerald-500 transform rotate-12" />
                                            </div>

                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                                <div className="space-y-5 flex-grow">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className="px-3 py-1 bg-emerald-50 rounded-full text-[11px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-100">
                                                            {pos.dept}
                                                        </span>
                                                        <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
                                                        <div className="flex items-center gap-1.5 text-zinc-500 text-sm font-medium">
                                                            <MapPin size={14} /> {pos.location}
                                                        </div>
                                                        <div className="w-1 h-1 bg-zinc-300 rounded-full"></div>
                                                        <div className="flex items-center gap-1.5 text-zinc-500 text-sm font-medium">
                                                            <Clock size={14} /> {pos.type}
                                                        </div>
                                                    </div>

                                                    <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                                                        {pos.title}
                                                    </h3>

                                                    <div className="flex flex-wrap gap-4 md:gap-8">
                                                        <div className="flex items-center gap-2 text-zinc-600 text-sm">
                                                            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-emerald-600 shrink-0">
                                                                <Briefcase size={14} />
                                                            </div>
                                                            <div>
                                                                <span className="block text-[10px] uppercase text-zinc-400 font-bold">{translations.labels.experience}</span>
                                                                <span className="font-semibold">{pos.experience}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-zinc-600 text-sm">
                                                            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-emerald-600 shrink-0">
                                                                <GraduationCap size={14} />
                                                            </div>
                                                            <div>
                                                                <span className="block text-[10px] uppercase text-zinc-400 font-bold">{translations.labels.education}</span>
                                                                <span className="font-semibold">{pos.education}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-zinc-600 text-sm">
                                                            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-emerald-600 shrink-0">
                                                                <Coins size={14} />
                                                            </div>
                                                            <div>
                                                                <span className="block text-[10px] uppercase text-zinc-400 font-bold">{translations.labels.salary}</span>
                                                                <span className="font-semibold">{pos.salary}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="text-zinc-500 max-w-2xl leading-relaxed text-sm pt-2">
                                                        {pos.desc}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        window.dispatchEvent(new CustomEvent('apply-position', { detail: pos.title }));
                                                        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="px-8 py-3 bg-zinc-900 text-white rounded-full font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-emerald-500/30 shrink-0"
                                                >
                                                    {translations.apply_now}
                                                    <ArrowIcon />
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="category"
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0 }}
                                className="space-y-16"
                            >
                                {(() => {
                                    const departments = [...new Set(positions.map(p => p.dept))];
                                    return departments.map((dept, deptIndex) => (
                                        <motion.div key={dept} variants={itemVariants} custom={deptIndex}>
                                            <div className="flex items-center gap-4 mb-8">
                                                <h3 className="text-2xl font-bold text-zinc-900">
                                                    {dept}
                                                </h3>
                                                <div className="h-[1px] flex-grow bg-zinc-200"></div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                {positionKeys.map((key) => {
                                                    const pos = positions.find(p => p.id === key && p.dept === dept);
                                                    if (!pos) return null;

                                                    return (
                                                        <motion.div
                                                            key={key}
                                                            className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-lg transition-all group h-full flex flex-col"
                                                            whileHover={{ y: -5 }}
                                                        >
                                                            <div className="space-y-4 flex-grow">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                                                                        <MapPin size={12} /> {pos.location}
                                                                        <span className="text-zinc-300">|</span>
                                                                        <Clock size={12} /> {pos.type}
                                                                    </div>
                                                                </div>

                                                                <h4 className="text-xl font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                                                                    {pos.title}
                                                                </h4>

                                                                <div className="space-y-2 py-2 border-y border-zinc-50 my-2">
                                                                    <div className="flex items-center gap-2 text-zinc-600 text-xs">
                                                                        <Briefcase size={14} className="text-emerald-500" />
                                                                        <span className="font-semibold text-zinc-900">{translations.labels.experience}:</span> {pos.experience}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-zinc-600 text-xs">
                                                                        <GraduationCap size={14} className="text-emerald-500" />
                                                                        <span className="font-semibold text-zinc-900">{translations.labels.education}:</span> <span className="truncate">{pos.education}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-zinc-600 text-xs">
                                                                        <Coins size={14} className="text-emerald-500" />
                                                                        <span className="font-semibold text-zinc-900">{translations.labels.salary}:</span> {pos.salary}
                                                                    </div>
                                                                </div>

                                                                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                                                                    {pos.desc}
                                                                </p>
                                                            </div>

                                                            <button
                                                                onClick={() => {
                                                                    window.dispatchEvent(new CustomEvent('apply-position', { detail: pos.title }));
                                                                    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                                                                }}
                                                                className="mt-6 w-full py-3 border border-zinc-200 rounded-xl text-zinc-600 font-bold hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all flex items-center justify-center gap-2 group/btn"
                                                            >
                                                                {translations.apply_now} <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                                            </button>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    ));
                                })()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* 4. Application Form Section */}
            <section id="apply" className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">{translations.apply_today}</h2>
                        <p className="text-lg text-zinc-500 font-light max-w-2xl mx-auto">{translations.apply_desc}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-1 rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-100"
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