'use client';

import { useState } from 'react';
import { CareersForm } from "@/components/sections/CareersForm";
import { MapPin, Clock, ChevronRight, CheckCircle2, List, Grid3x3, Briefcase, GraduationCap, Coins } from "lucide-react";

interface CareersClientProps {
    locale: string;
    positionKeys: string[];
    benefits: string[];
    positions: any[];
    translations: {
        title: string;
        subtitle: string;
        benefits: string;
        open_positions: string;
        apply_now: string;
        apply_today: string;
        apply_desc: string;
    };
}

export default function CareersClient({ locale, positionKeys, benefits, positions, translations }: CareersClientProps) {
    const [viewMode, setViewMode] = useState<'all' | 'category'>('all');

    return (
        <div className="bg-white min-h-screen">
            {/* Dark Hero Section */}
            <section className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 pt-32 pb-16 text-white overflow-hidden relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 right-40 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-40 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-300 mb-6">
                            {locale === 'th' ? '// มาร่วมเป็นส่วนหนึ่งกับเรา' : '// Join Eureka Automation'}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                            {translations.title}
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            {translations.subtitle}
                        </p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => setViewMode('all')}
                            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${viewMode === 'all'
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/50'
                                : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                                }`}
                        >
                            <List size={18} />
                            {locale === 'th' ? 'รวมทั้งหมด' : 'All Positions'}
                        </button>
                        <button
                            onClick={() => setViewMode('category')}
                            className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${viewMode === 'category'
                                ? 'bg-red-600 text-white shadow-lg shadow-red-500/50'
                                : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                                }`}
                        >
                            <Grid3x3 size={18} />
                            {locale === 'th' ? 'แยกหมวดหมู่' : 'By Category'}
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6 tracking-tight">
                                {translations.benefits}
                            </h2>
                            <div className="space-y-6">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-lg text-zinc-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-zinc-100 rounded-3xl aspect-video relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                                <span className="text-white/10 text-9xl font-black italic select-none">EUREKA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-16 bg-zinc-50 border-y border-zinc-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">
                            {translations.open_positions}
                        </h2>
                    </div>

                    {viewMode === 'all' ? (
                        <div className="grid gap-6">
                            {positionKeys.map((key) => {
                                const pos = positions.find(p => p.id === key);
                                if (!pos) return null;

                                return (
                                    <div key={key} className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="space-y-4 flex-grow">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="px-3 py-1 bg-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                                        {pos.dept}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-zinc-600 text-sm">
                                                        <MapPin size={14} /> {pos.location}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-zinc-600 text-sm">
                                                        <Clock size={14} /> {pos.type}
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                                                    {pos.title}
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                                                    <div className="flex items-center gap-2 text-zinc-700 text-sm">
                                                        <Briefcase size={16} className="text-emerald-600" />
                                                        <span className="font-bold">{locale === 'th' ? 'ประสบการณ์:' : 'Experience:'}</span> {pos.experience}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-zinc-700 text-sm">
                                                        <GraduationCap size={16} className="text-emerald-600" />
                                                        <span className="font-bold">{locale === 'th' ? 'จบจาก:' : 'Education:'}</span> {pos.education}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-zinc-800 text-sm">
                                                        <Coins size={16} className="text-emerald-600" />
                                                        <span className="font-bold">{locale === 'th' ? 'เงินเดือน:' : 'Salary:'}</span> {pos.salary}
                                                    </div>
                                                </div>
                                                <p className="text-zinc-700 max-w-2xl leading-relaxed mt-4">
                                                    {pos.desc}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    window.dispatchEvent(new CustomEvent('apply-position', { detail: pos.title }));
                                                    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 group/btn shadow-lg shadow-emerald-600/30 cursor-pointer"
                                            >
                                                {translations.apply_now} <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {(() => {
                                const departments = [...new Set(positions.map(p => p.dept))];
                                return departments.map((dept) => (
                                    <div key={dept}>
                                        <h3 className="text-2xl font-bold text-zinc-900 mb-6 pb-4 border-b-2 border-zinc-900">
                                            {dept}
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {positionKeys.map((key) => {
                                                const pos = positions.find(p => p.id === key && p.dept === dept);
                                                if (!pos) return null;

                                                return (
                                                    <div key={key} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-lg transition-all group">
                                                        <div className="space-y-4">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <div className="flex items-center gap-1.5 text-zinc-600 text-sm">
                                                                    <MapPin size={14} /> {pos.location}
                                                                </div>
                                                                <div className="flex items-center gap-1.5 text-zinc-600 text-sm">
                                                                    <Clock size={14} /> {pos.type}
                                                                </div>
                                                            </div>
                                                            <h4 className="text-xl font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                                                                {pos.title}
                                                            </h4>
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center gap-2 text-zinc-800 text-[13px]">
                                                                    <Briefcase size={14} className="text-emerald-600 shrink-0" />
                                                                    <span>{pos.experience}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-zinc-800 text-[13px]">
                                                                    <GraduationCap size={14} className="text-emerald-600 shrink-0" />
                                                                    <span>{pos.education}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-zinc-800 text-[13px]">
                                                                    <Coins size={14} className="text-emerald-600 shrink-0" />
                                                                    <span>{pos.salary}</span>
                                                                </div>
                                                            </div>
                                                            <p className="text-zinc-700 text-sm leading-relaxed line-clamp-2 mt-2">
                                                                {pos.desc}
                                                            </p>
                                                            <button
                                                                onClick={() => {
                                                                    window.dispatchEvent(new CustomEvent('apply-position', { detail: pos.title }));
                                                                    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                                                                }}
                                                                className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all hover:text-emerald-700 cursor-pointer"
                                                            >
                                                                {translations.apply_now} <ChevronRight size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    )}
                </div>
            </section>

            {/* Application Form Section */}
            <section id="apply" className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 tracking-tight">{translations.apply_today}</h2>
                        <p className="text-base text-zinc-700">{translations.apply_desc}</p>
                    </div>
                    <CareersForm />
                </div>
            </section>
        </div>
    );
}
