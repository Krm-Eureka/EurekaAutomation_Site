"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";

import { useTranslations } from "next-intl";

export default function ContactClient({ locale }: { locale: string }) {
    const t = useTranslations('contact');
    const tNav = useTranslations('nav');

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(t('form.submit') + " (Demo)");
    };

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-zinc-950 pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 lg:pb-24 text-white overflow-hidden relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white/70 mb-8">
                        <Sparkles size={16} className="text-emerald-400" /> {tNav('contact').toUpperCase()}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
                        {t('description')}
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-20">
                        {/* Contact Form */}
                        <div className="bg-zinc-50 p-8 md:p-12 rounded-3xl border border-zinc-100 shadow-sm">
                            <h2 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">
                                {t('form.submit')}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{t('form.name')}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-all text-zinc-900 placeholder:text-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{t('form.email')}</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-all text-zinc-900 placeholder:text-zinc-300"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{t('form.company')}</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-all text-zinc-900 placeholder:text-zinc-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{t('form.message')}</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-all resize-none text-zinc-900 placeholder:text-zinc-300"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> {t('form.submit')}
                                </button>
                            </form>
                        </div>

                        {/* Information */}
                        <div className="space-y-12 py-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">{t('tag')}</h3>
                                <p className="text-lg text-zinc-500 leading-relaxed">
                                    {t('support_hours')}
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-600 transition-all">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{t('call_us')}</p>
                                        <p className="font-bold text-zinc-900 text-lg">+66 XX XXX XXXX</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-red-600 transition-all">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{t('email_us')}</p>
                                        <p className="font-bold text-zinc-900 text-lg">info@eureka-automation.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-zinc-800 transition-all">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{t('visit_us')}</p>
                                        <p className="font-bold text-zinc-900 text-lg">Bangkok, Thailand</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
