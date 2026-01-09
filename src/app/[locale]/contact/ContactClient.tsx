"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Sparkles, ChevronRight } from "lucide-react";

export default function ContactClient({ locale }: { locale: string }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent (Demo).");
    };

    const isEn = locale === 'en';

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-zinc-950 pt-48 pb-24 text-white overflow-hidden relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white/70 mb-8">
                        <Sparkles size={16} className="text-emerald-400" /> {isEn ? 'CONTACT' : 'ติดต่อเรา'}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                        {isEn ? 'Start Your Project' : 'เริ่มต้นโครงการของคุณ'}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
                        {isEn
                            ? 'Connect with our engineering team to discuss custom automation solutions.'
                            : 'ติดต่อทีมวิศวกรของเราเพื่อปรึกษาเกี่ยวกับโซลูชันระบบอัตโนมัติ'}
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-20">
                        {/* Contact Form */}
                        <div className="bg-zinc-50 p-8 md:p-12 rounded-3xl border border-zinc-100 shadow-sm">
                            <h2 className="text-3xl font-bold text-zinc-900 mb-8 tracking-tight">
                                {isEn ? 'Send Message' : 'ส่งข้อความ'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{isEn ? 'Name' : 'ชื่อ'}</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-all text-zinc-900 placeholder:text-zinc-300"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{isEn ? 'Email' : 'อีเมล'}</label>
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
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{isEn ? 'Company' : 'บริษัท'}</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-all text-zinc-900 placeholder:text-zinc-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 ml-1">{isEn ? 'Message' : 'ข้อความ'}</label>
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
                                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> {isEn ? 'Submit' : 'ส่งข้อมูล'}
                                </button>
                            </form>
                        </div>

                        {/* Information */}
                        <div className="space-y-12 py-8">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">{isEn ? 'Get in touch' : 'ข้อมูลติดต่อ'}</h3>
                                <p className="text-lg text-zinc-500 leading-relaxed">
                                    {isEn ? 'Our support team is available Monday to Friday, 9:00 AM – 6:00 PM.' : 'ทีมสนับสนุนของเราพร้อมให้บริการวันจันทร์ถึงศุกร์ 9:00 น. – 18:00 น.'}
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-600 transition-all">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{isEn ? 'Call Us' : 'โทรหาเรา'}</p>
                                        <p className="font-bold text-zinc-900 text-lg">+66 XX XXX XXXX</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-red-600 transition-all">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{isEn ? 'Email Us' : 'อีเมล'}</p>
                                        <p className="font-bold text-zinc-900 text-lg">info@eureka-automation.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 bg-zinc-950 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-zinc-800 transition-all">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{isEn ? 'Visit Us' : 'ที่อยู่'}</p>
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
