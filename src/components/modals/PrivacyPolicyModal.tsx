"use client";
import { X, ShieldCheck, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import enMessages from '@/messages/en.json';
import thMessages from '@/messages/th.json';

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept?: () => void;
}

const ContentSection = ({ t, lang }: { t: typeof thMessages.privacy, lang: 'th' | 'en' }) => (
    <div className={`space-y-8 ${lang === 'en' ? 'font-sans' : 'font-sans'}`}>
        <div className="prose prose-zinc max-w-none">
            <h2 className="text-2xl font-black text-zinc-900 mb-2">{t.title}</h2>
            <p className="lead text-base text-zinc-600 font-medium">
                {t.subtitle}
            </p>
        </div>

        {/* 1. Introduction */}
        <section>
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-xs font-black text-zinc-500">01</span>
                {t.intro.title}
            </h3>
            <div className="text-zinc-600 space-y-3 leading-relaxed text-sm">
                <p>{t.intro.content_1}</p>
                <p>{t.intro.content_2}</p>
            </div>
        </section>

        {/* 2. Data Collection */}
        <section>
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-xs font-black text-zinc-500">02</span>
                {t.collection.title}
            </h3>
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                <p className="mb-4 text-zinc-600 text-sm">{t.collection.desc}</p>
                <ul className="grid sm:grid-cols-2 gap-3">
                    {Object.entries(t.collection.items).map(([key, value]) => (
                        <li key={key} className="flex items-start gap-2 text-sm text-zinc-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                            <span>{value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

        {/* 3. Purpose */}
        <section>
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-xs font-black text-zinc-500">03</span>
                {t.purpose.title}
            </h3>
            <ul className="space-y-2">
                {Object.entries(t.purpose.items).map(([key, value]) => (
                    <li key={key} className="flex gap-3 text-zinc-600 group hover:bg-zinc-50 p-2 rounded-lg transition-colors text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover:scale-125 transition-transform"></div>
                        <span>{value}</span>
                    </li>
                ))}
            </ul>
        </section>

        {/* 4. Rights */}
        <section>
            <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-xs font-black text-zinc-500">04</span>
                {t.rights.title}
            </h3>
            <p className="text-zinc-600 mb-6 text-sm">{t.rights.desc}</p>
            <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(t.rights).filter(([key]) => key !== 'title' && key !== 'desc').map(([key, value]) => {
                    const right = value as { title: string; desc: string };
                    return (
                        <div key={key} className="p-3 rounded-xl border border-zinc-200 hover:border-green-primary/50 hover:bg-green-ultra/10 transition-colors">
                            <h4 className="font-bold text-green-dark text-sm mb-1">{right.title}</h4>
                            <p className="text-xs text-zinc-500">{right.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>

        {/* 5. Contact */}
        <section className="pt-6 border-t border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-2">{t.contact.title}</h3>
            <p className="text-zinc-600 text-sm mb-4">{t.contact.desc}</p>
            <div className="flex flex-wrap gap-4 text-sm">
                <a href="mailto:hr@eurekaautomation.co.th" className="flex items-center gap-2 text-zinc-600 hover:text-emerald-600 font-medium bg-zinc-50 px-3 py-2 rounded-lg">
                    <Mail size={16} />
                    HR@eurekaautomation.co.th
                </a>
                <a href="tel:02-192-3737" className="flex items-center gap-2 text-zinc-600 hover:text-emerald-600 font-medium bg-zinc-50 px-3 py-2 rounded-lg">
                    <Phone size={16} />
                    02-192-3737
                </a>
            </div>
        </section>
    </div>
);

export default function PrivacyPolicyModal({ isOpen, onClose, onAccept }: PrivacyPolicyModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const handle = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(handle);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const preventScroll = () => {
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                document.body.style.touchAction = 'none'; // Prevent touch scrolling on body
            };

            const allowScroll = () => {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
            };

            if (isOpen) {
                preventScroll();
            } else {
                allowScroll();
            }

            // Cleanup function to ensure scroll is restored when component unmounts or modal closes
            return () => {
                allowScroll();
            };
        }
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 isolates">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-[10000]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white z-20 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-zinc-900 leading-tight">
                                        {thMessages.privacy.metadata.modal_title}
                                    </h2>
                                    <p className="text-xs text-zinc-500 font-mono">
                                        {thMessages.privacy.metadata.last_updated}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-zinc-50 text-zinc-500 flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar overscroll-contain">
                            <div className="max-w-3xl mx-auto space-y-12">

                                {/* Thai Section */}
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-transparent rounded-full opacity-30"></div>
                                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-6">
                                        {thMessages.privacy.metadata.lang_th}
                                    </span>
                                    <ContentSection t={thMessages.privacy} lang="th" />
                                </div>

                                {/* Divider */}
                                <div className="relative h-px bg-zinc-200 my-12">
                                    <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-zinc-400 text-xs uppercase tracking-widest">
                                        {thMessages.privacy.metadata.version_en}
                                    </div>
                                </div>

                                {/* English Section */}
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-zinc-300 to-transparent rounded-full opacity-30"></div>
                                    <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-full mb-6">
                                        {thMessages.privacy.metadata.lang_en}
                                    </span>
                                    <ContentSection t={enMessages.privacy} lang="en" />
                                </div>

                            </div>
                        </div>

                        {/* Footer / Actions */}
                        {onAccept && (
                            <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 flex justify-end gap-3 z-10">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2.5 rounded-xl text-zinc-600 font-bold text-sm hover:bg-zinc-100 transition-colors"
                                >
                                    {thMessages.privacy.metadata.btn_close}
                                </button>
                                <button
                                    onClick={() => {
                                        onAccept();
                                        onClose();
                                    }}
                                    className="flex-1 py-4 bg-green-primary hover:bg-green-dark text-white rounded-2xl font-bold transition-all shadow-lg shadow-green-primary/20"
                                >
                                    <ShieldCheck size={16} />
                                    <span>{thMessages.privacy.metadata.btn_accept}</span>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
