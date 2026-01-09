"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';

export function CareersForm() {
    const t = useTranslations('careers.form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        resume: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Job Application: ${formData.position} - ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPosition: ${formData.position}\nResume: ${formData.resume}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:hr@eureka-automation.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">{t('name')}</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">{t('email')}</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">{t('position')}</label>
                    <input
                        type="text"
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">{t('resume')}</label>
                    <input
                        type="url"
                        name="resume"
                        placeholder="https://drive.google.com/..."
                        required
                        value={formData.resume}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">{t('message')}</label>
                    <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-4 rounded-lg hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/25"
                >
                    {t('submit')}
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
