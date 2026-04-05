'use client';

import { withBasePath } from "@/lib/utils";

import { useState, useMemo, useEffect } from 'react';
import { GAS_WEB_APP_URL } from '@/lib/constants';
import Image from 'next/image';
import { CareersForm } from "@/components/sections/CareersForm";
import { MapPin, Clock, ChevronRight, CheckCircle2, List, Briefcase, GraduationCap, Coins, Search, ChevronDown, Share2 } from "lucide-react";
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
    slots?: string;
    urgent?: boolean;
    active?: boolean;
}

interface CareersClientProps {
    locale: string;
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
        labels: {
            experience: string;
            education: string;
            salary: string;
        };
        benefits_title: string;
        responsibilities_label: string;
        client?: {
            share_tooltip: string;
            copied_toast: string;
            share_text: string;
            search_placeholder?: string;
            all_departments?: string;
            no_results?: string;
        };
    };
    dataSource?: 'sheets' | 'local';
}

// Animation Variants
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const JobCard = ({ pos, isExpanded, onToggle, translations }: {
    pos: CareerPosition,
    isExpanded: boolean,
    onToggle: () => void,
    translations: CareersClientProps['translations']
}) => {
    const [isCopied, setIsCopied] = useState(false);
    return (
        <motion.div
            variants={itemVariants}
            className={`group relative transition-all duration-500 rounded-2xl cursor-pointer ${isExpanded
                ? 'bg-zinc-900 ring-1 ring-green-primary/50 shadow-2xl shadow-green-dark/20'
                : 'bg-white border border-zinc-100 hover:border-emerald-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5'
                }`}
            onClick={onToggle}
        >
            {/* Refined Urgent Badge - Conditional background based on expand state */}
            {pos.urgent && (
                <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                    <div className={`px-3 py-1 backdrop-blur-md text-rose-500 text-[9px] font-black uppercase tracking-[0.25em] rounded-full shadow-lg border transition-colors duration-500 shadow-rose-500/5 ${isExpanded
                        ? 'bg-zinc-900/90 border-rose-500/30'
                        : 'bg-white border-rose-200'
                        } flex items-center gap-2`}>
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                        </span>
                        URGENT
                    </div>
                </motion.div>
            )}

            <div className="p-5 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
                    <div className="space-y-3 flex-grow">
                        {/* Header: Dept & Location */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-green-pale text-green-dark font-bold text-[10px] uppercase tracking-wider">
                                {pos.dept}
                            </span>
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                                <MapPin size={14} />
                                {pos.location}
                            </div>
                            {pos.slots && (
                                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                                    <List size={12} />
                                    {pos.slots}
                                </div>
                            )}
                        </div>

                        {/* Title - Optimized for Mobile font size */}
                        <h3 className={`text-lg md:text-2xl font-bold leading-snug transition-colors ${isExpanded ? 'text-white' : 'text-zinc-900 group-hover:text-emerald-600'
                            }`}>
                            {pos.title}
                        </h3>

                        {/* Meta Grid - 2 columns even on mobile to save space */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-y-3 gap-x-4 pt-1">
                            {[
                                { icon: Briefcase, text: pos.experience, label: translations.labels.experience || 'Experience' },
                                { icon: GraduationCap, text: pos.education, label: translations.labels.education || 'Education' },
                                { icon: Clock, text: pos.type, label: 'Type' },
                                { icon: Coins, text: pos.salary, label: translations.labels.salary || 'Salary' }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <div className={`p-1.5 rounded-lg shrink-0 ${isExpanded ? 'bg-zinc-800 text-emerald-400' : 'bg-zinc-100 text-zinc-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'}`}>
                                        <stat.icon size={14} className="md:w-4 md:h-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className={`text-[8px] md:text-[9px] uppercase font-bold tracking-wider truncate transform-gpu ${isExpanded ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                            {stat.label}
                                        </span>
                                        <span className={`text-[11px] md:text-xs font-semibold truncate ${isExpanded ? 'text-zinc-200' : 'text-zinc-700'}`}>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    {/* Left Column: Qualifications */}
                                    <div className="space-y-4 md:space-y-6">
                                        {pos.qualification && pos.qualification.length > 0 && (
                                            <div className="space-y-2 md:space-y-3">
                                                <h4 className="flex items-center gap-2 font-bold text-emerald-500 uppercase tracking-widest text-[9px] md:text-[10px]">
                                                    <CheckCircle2 size={13} className="md:w-3.5 md:h-3.5" /> Qualifications
                                                </h4>
                                                <ul className="grid grid-cols-1 gap-1.5 md:gap-2">
                                                    {pos.qualification.map((line, idx) => (
                                                        <li key={idx} className="flex gap-2.5 text-[13px] md:text-sm text-zinc-400">
                                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 flex-shrink-0"></span>
                                                            <span className="leading-relaxed">{line}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: Responsibilities & Apply */}
                                    <div className="space-y-4 md:space-y-6 flex flex-col h-full mt-4 md:mt-0">
                                        {/* Separator - Mobile only */}
                                        <div className="block md:hidden h-px bg-zinc-800/50 w-full mb-4"></div>

                                        {pos.desc && (Array.isArray(pos.desc) ? pos.desc.length > 0 : !!pos.desc) && (
                                            <div className="space-y-2 md:space-y-3 flex-grow">
                                                <h4 className="flex items-center gap-2 font-bold text-emerald-500 uppercase tracking-widest text-[9px] md:text-[10px]">
                                                    <Briefcase size={13} className="md:w-3.5 md:h-3.5" /> Responsibilities
                                                </h4>
                                                <div className="grid grid-cols-1 gap-1.5 md:gap-2">
                                                    {Array.isArray(pos.desc) ? (
                                                        pos.desc.map((line, idx) => (
                                                            <div key={idx} className="flex gap-2.5 text-[13px] md:text-sm text-zinc-400">
                                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/50 flex-shrink-0"></span>
                                                                <span className="leading-relaxed">{line}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-zinc-400 leading-relaxed text-[13px] md:text-sm">{pos.desc}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="pt-2 md:pt-4 mt-auto space-y-3 md:space-y-4">
                                            {pos.slots && (
                                                <div className="flex items-center gap-3 p-2.5 md:p-3 rounded-[20px] md:rounded-2xl bg-zinc-900/40 border border-white/5">
                                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                                        <List size={14} className="md:w-4 md:h-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] md:text-[9px] uppercase font-bold tracking-wider text-zinc-600">Operational Slots</span>
                                                        <span className="text-xs md:text-sm font-bold text-emerald-400/90 leading-tight">{pos.slots}</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.dispatchEvent(new CustomEvent('apply-position', { detail: pos.title }));
                                                        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    }}
                                                    className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2"
                                                >
                                                    {translations.apply_now}
                                                    <ChevronRight size={14} className="md:w-4 md:h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const url = window.location.href.split('#')[0] + '#open=' + encodeURIComponent(pos.title);

                                                        const handleSuccess = () => {
                                                            setIsCopied(true);
                                                            setTimeout(() => setIsCopied(false), 1000);
                                                        };

                                                        if (navigator.share) {
                                                            const shareText = translations.client?.share_text?.replace('{job_title}', pos.title) || `ร่วมงานตำแหน่ง ${pos.title} ที่ Eureka Automation!`;
                                                            navigator.share({ title: pos.title, url, text: shareText }).catch(console.error);
                                                        } else if (navigator.clipboard && window.isSecureContext) {
                                                            navigator.clipboard.writeText(url).then(handleSuccess).catch(console.error);
                                                        } else {
                                                            // Fallback for non-HTTPS (e.g. testing over LAN HTTP)
                                                            const textArea = document.createElement("textarea");
                                                            textArea.value = url;
                                                            textArea.style.position = "fixed";
                                                            document.body.appendChild(textArea);
                                                            textArea.focus();
                                                            textArea.select();
                                                            try {
                                                                document.execCommand('copy');
                                                                handleSuccess();
                                                            } catch (err) {
                                                                console.error('Fallback: Oops, unable to copy', err);
                                                            }
                                                            document.body.removeChild(textArea);
                                                        }
                                                    }}
                                                    title={translations.client?.share_tooltip || "แชร์ หรือ คัดลอกลิงก์ตำแหน่งงานนี้"}
                                                    className="min-w-[48px] shrink-0 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold flex items-center justify-center px-3 transition-all shadow-lg shadow-zinc-900/20"
                                                >
                                                    {isCopied ? <span className="text-emerald-400 font-bold tracking-wider text-[10px] flex gap-1 items-center animate-in fade-in zoom-in duration-200"><CheckCircle2 size={13} /> {translations.client?.copied_toast || "Copied!"}</span> : <Share2 size={16} />}
                                                </button>
                                            </div>
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
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CareersClient({ locale, benefits, positions, translations, dataSource = 'local' }: CareersClientProps) {
    const [expandedPositions, setExpandedPositions] = useState<string[]>([]);

    // Real-Time Data Sync logic
    const [livePositions, setLivePositions] = useState<CareerPosition[]>(positions);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const fetchLivePositions = async () => {
            setIsRefreshing(true);
            try {
                const url = new URL(GAS_WEB_APP_URL);
                url.searchParams.append('t', Date.now().toString()); // Cache buster
                url.searchParams.append('key', process.env.NEXT_PUBLIC_GAS_API_KEY || '');

                // [CRITICAL FIX] Removed { cache: 'no-store' } because it triggers a CORS OPTIONS preflight request.
                // The 't' parameter above is enough to prevent browser caching.
                const res = await fetch(url.toString());
                if (res.ok) {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const allPositions = await res.json();
                        if (Array.isArray(allPositions)) {
                            // Parse function exactly same as server-side
                            const parseArray = (text?: string) => {
                                if (!text) return [];
                                return String(text).split('\n').map(item => item.trim()).filter(Boolean);
                            };
                            /* eslint-disable @typescript-eslint/no-explicit-any */
                            const freshPositions = allPositions
                                .filter((pos: any) => {
                                    if (!pos) return false;
                                    // ตรวจสอบสถานะ: รองรับทั้ง Boolean และ String 'true'
                                    const status = pos.status;
                                    return status === true || String(status).toUpperCase() === 'TRUE';
                                })
                                .map((pos: any, idx: number) => {
                                    // จัดการข้อมูล Slots (จำนวนตำแหน่ง)
                                    const rawSlots = String(pos.slots || '');
                                    const slotsSuffix = locale === 'th' ? ' ตำแหน่ง' : ' Position';
                                    const formattedSlots = rawSlots ? (rawSlots.includes('ตำแหน่ง') || rawSlots.includes('Position') ? rawSlots : `${rawSlots}${slotsSuffix}`) : '';

                                    return {
                                        // ใช้ ID จาก Sheet ถ้าไม่มีให้ใช้ index
                                        id: pos.id ? String(pos.id) : `live-job-${idx}`,
                                        dept: String(locale === 'th' ? (pos.dept_th || '') : (pos.dept_en || '')) || 'Uncategorized',
                                        title: String(locale === 'th' ? (pos.title_th || '') : (pos.title_en || '')) || 'Untitled',
                                        location: String(locale === 'th' ? (pos.location_th || '') : (pos.location_en || '')),
                                        type: String(locale === 'th' ? (pos.type_th || '') : (pos.type_en || '')),
                                        desc: parseArray(locale === 'th' ? (pos.desc_th || pos.description_th) : (pos.desc_en || pos.description_en)),
                                        experience: String(locale === 'th' ? (pos.experience_th || '') : (pos.experience_en || '')),
                                        education: String(locale === 'th' ? (pos.education_th || '') : (pos.education_en || '')),
                                        salary: String(locale === 'th' ? (pos.salary_th || '') : (pos.salary_en || '')),
                                        qualification: parseArray(locale === 'th' ? (pos.qualification_th || pos.qual_th) : (pos.qualification_en || pos.qual_en)),
                                        slots: formattedSlots,
                                        urgent: pos.urgent === true || String(pos.urgent).toUpperCase() === 'TRUE'
                                    };
                                })
                                .sort((a: any, b: any) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
                            /* eslint-enable @typescript-eslint/no-explicit-any */

                            // Prevent empty data from wiping out fallback data
                            if (freshPositions.length > 0) {
                                setLivePositions(freshPositions);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to refresh live positions:", err);
            } finally {
                setIsRefreshing(false);
            }
        };
        fetchLivePositions();
    }, [locale]);

    // Handle deep link sharing (#open=PositionName)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        let checks = 0;
        const maxChecks = 25; // Try for ~5 seconds

        const tryFillAndScroll = () => {
            const hash = window.location.hash;
            if (!hash.startsWith('#open=')) return;

            const formSection = document.getElementById('apply');
            if (formSection) {
                const positionTitle = decodeURIComponent(hash.replace('#open=', ''));
                // Fill the position field
                window.dispatchEvent(new CustomEvent('apply-position', { detail: positionTitle }));
                // Scroll into view gently
                formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (checks < maxChecks) {
                checks++;
                setTimeout(tryFillAndScroll, 200); // Check DOM every 200ms
            }
        };

        // Start checking
        setTimeout(tryFillAndScroll, 300);

        // Listen to SPA hash change events
        window.addEventListener('hashchange', tryFillAndScroll);
        return () => window.removeEventListener('hashchange', tryFillAndScroll);
    }, []);

    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    // Memoize unique departments with safety check
    const uniqueDepts = useMemo(() => {
        try {
            const depts = livePositions
                .map(p => {
                    const d = typeof p.dept === 'string' ? p.dept.trim() : '';
                    return d || 'Uncategorized';
                })
                .filter(Boolean);
            return Array.from(new Set(depts)).sort();
        } catch (err) {
            console.error("Error calculating unique depts:", err);
            return [];
        }
    }, [livePositions]);

    const togglePosition = (id: string) => {
        setExpandedPositions(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    // Filter Logic with extreme safety
    const filteredPositions = useMemo(() => {
        return livePositions.filter(pos => {
            try {
                const title = String(pos.title || '').toLowerCase();
                const id = String(pos.id || '').toLowerCase();
                const desc = Array.isArray(pos.desc) ? pos.desc.join(' ').toLowerCase() : String(pos.desc || '').toLowerCase();
                const search = searchTerm.toLowerCase();

                const matchesSearch = title.includes(search) || id.includes(search) || desc.includes(search);
                const matchesDept = selectedDept === 'All' || String(pos.dept || '').trim() === selectedDept;

                return matchesSearch && matchesDept;
            } catch (err) {
                console.error("Filter error for position:", pos, err);
                return true; // Show it anyway if filter fails
            }
        });
    }, [livePositions, searchTerm, selectedDept]);

    return (
        <div className="bg-zinc-50 min-h-screen overflow-hidden">
            {/* 1. Hero Section - Compact */}
            <section className="bg-zinc-950 pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 text-white overflow-hidden relative">
                <div className="absolute inset-0">
                    {/* Dynamic Glows - Optimized for Mobile View */}
                    <div className="absolute top-[-10%] right-[-10%] w-[120vw] md:w-[600px] h-[120vw] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none opacity-60 md:opacity-100"></div>
                    <div className="absolute bottom-[-10%] left-[-20%] w-[100vw] md:w-[400px] h-[100vw] md:h-[400px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none opacity-40 md:opacity-100"></div>

                    {/* Tech Pattern Grid */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20 md:opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="font-mono text-[7px] md:text-[9px] text-zinc-700 absolute top-0 left-4 md:left-8 hidden sm:block tracking-[0.5em] [writing-mode:vertical-lr] uppercase h-full opacity-30 md:opacity-50">
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
                            className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 bg-zinc-900/60 border border-white/10 rounded-full mb-6 md:mb-8 backdrop-blur-xl"
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">{translations.join_tag}</span>
                            </span>
                            <div className="w-[1px] h-3 bg-white/10"></div>
                            <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">System_Live</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-[0.95] md:leading-[0.9] uppercase italic group">
                            {translations.title.split(' ').map((word: string, i: number) => (
                                <span key={i} className={`
                                    ${i === 0 ? "text-white" : "text-zinc-800 md:text-zinc-900 p-0.5 md:p-0"}
                                    block md:inline
                                `}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-[13px] md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-10 px-6 opacity-90">
                            {translations.subtitle}
                        </p>

                    </motion.div>
                </div>
            </section>

            {/* 2. Benefits Section - Hero + List Design */}
            <section className="py-8 md:py-12 bg-zinc-50/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 md:mb-16"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-12 bg-emerald-600"></div>
                            <span className="font-mono text-emerald-600 font-bold tracking-[0.4em] uppercase text-[10px]">CULTURE_&_BENEFITS</span>
                        </div>
                        <h2 className="text-4xl md:text-8xl font-black text-zinc-900 tracking-tighter leading-[0.85] uppercase italic">
                            {translations.benefits}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left: Large Visual Hero - Now more compact */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="md:col-span-5 lg:col-span-5 relative rounded-[2.5rem] overflow-hidden border border-zinc-200 group bg-zinc-900 aspect-[16/10] md:aspect-square lg:h-[500px] shadow-2xl shadow-emerald-500/5"
                        >
                            <Image
                                src={withBasePath("/images/careers-hologram.webp")}
                                alt="Eureka Culture"
                                fill
                                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="font-mono text-emerald-500 font-bold tracking-[0.6em] uppercase text-[9px] mb-3">JOIN_THE_LEGACY</div>
                                <h3 className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-[0.8] uppercase italic">Building<br />the Future</h3>
                            </div>
                        </motion.div>

                        {/* Right: Clean Minimalist List - More space for text */}
                        <div className="md:col-span-7 lg:col-span-7">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-1 gap-y-1">
                                {benefits.map((benefit: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-white hover:border-emerald-500/20 transition-all duration-300"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 shrink-0"></div>
                                        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight italic leading-tight">
                                            {benefit}
                                        </h3>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
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
                        <div className="font-mono text-zinc-600 text-[9px] md:text-right border border-white/5 p-3 rounded-lg bg-white/[0.02] tracking-widest uppercase flex flex-col items-end gap-1">
                            <span>Operational_Slots: {livePositions.length}</span>
                            {isRefreshing ? (
                                <span className="text-emerald-500 animate-pulse">Syncing Live Updates...</span>
                            ) : (
                                <span className="text-emerald-600">Real-Time Synced</span>
                            )}
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
                                placeholder={translations.client?.search_placeholder || "Search positions..."}
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
                                <option value="All" className="bg-zinc-900 text-zinc-300">{translations.client?.all_departments || "All Departments"}</option>
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

                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={`list-${selectedDept}-${searchTerm}-${livePositions.length}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            {filteredPositions.length > 0 ? (
                                filteredPositions.map((pos, idx) => {
                                    // Debug Check for positions (Check your Console in DevTools)
                                    // if (idx === 0) console.log("Rendering Position Sample:", pos);

                                    return (
                                        <JobCard
                                            key={pos.id || `job-idx-${idx}`}
                                            pos={pos}
                                            isExpanded={expandedPositions.includes(pos.id)}
                                            onToggle={() => togglePosition(pos.id)}
                                            translations={translations}
                                        />
                                    );
                                })
                            ) : (
                                <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mb-3 text-zinc-600">
                                        <Search size={20} />
                                    </div>
                                    <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
                                        {translations.client?.no_results || "No positions found matching criteria"}
                                    </p>
                                </div>
                            )}
                        </motion.div>
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