import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'privacy' });
    return {
        title: t('seo.title'),
        description: t('seo.description')
    };
}

export default async function PrivacyPolicy({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'privacy' });

    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            {/* Header */}
            <div className="bg-zinc-50 border-b border-zinc-100 mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="text-emerald-600" size={32} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4 tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
                        {t('subtitle')}
                    </p>
                    <p className="text-sm text-zinc-400 mt-6 font-mono uppercase tracking-widest">
                        {t('last_updated')}: {t('last_updated_date')}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                {/* 1. Introduction */}
                <section>
                    <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-sm font-black text-zinc-500">01</span>
                        {t('intro.title')}
                    </h2>
                    <div className="prose prose-zinc max-w-none text-zinc-600 space-y-4">
                        <p>{t('intro.content_1')}</p>
                        <p>{t('intro.content_2')}</p>
                    </div>
                </section>

                {/* 2. Data Collection */}
                <section>
                    <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-sm font-black text-zinc-500">02</span>
                        {t('collection.title')}
                    </h2>
                    <div className="prose prose-zinc max-w-none text-zinc-600">
                        <p className="mb-4">{t('collection.desc')}</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-emerald-500 grid md:grid-cols-2 gap-x-8">
                            <li>{t('collection.items.name')}</li>
                            <li>{t('collection.items.contact')}</li>
                            <li>{t('collection.items.resume')}</li>
                            <li>{t('collection.items.cookies')}</li>
                            <li>{t('collection.items.device')}</li>
                        </ul>
                    </div>
                </section>

                {/* 3. Purpose */}
                <section>
                    <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-sm font-black text-zinc-500">03</span>
                        {t('purpose.title')}
                    </h2>
                    <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                        <ul className="space-y-3">
                            {[1, 2, 3, 4].map((item) => (
                                <li key={item} className="flex gap-3 text-zinc-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                    <span>{t(`purpose.items.${item}`)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 4. Rights */}
                <section>
                    <h2 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-sm font-black text-zinc-500">04</span>
                        {t('rights.title')}
                    </h2>
                    <p className="text-zinc-600 mb-6">{t('rights.desc')}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {['access', 'rectification', 'erasure', 'restriction'].map((right) => (
                            <div key={right} className="p-4 rounded-xl border border-zinc-200 hover:border-emerald-500/50 transition-colors">
                                <h3 className="font-bold text-zinc-900 mb-1">{t(`rights.${right}.title`)}</h3>
                                <p className="text-sm text-zinc-500">{t(`rights.${right}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Contact */}
                <section className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

                    <h2 className="text-xl font-bold mb-6 relative z-10">{t('contact.title')}</h2>
                    <p className="text-zinc-400 mb-8 relative z-10">{t('contact.desc')}</p>

                    <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Mail size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Email</div>
                                <a href={`mailto:${t('contact.email')}`} className="hover:text-emerald-400 transition-colors font-medium">{t('contact.email')}</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <Phone size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Phone</div>
                                <a href={`tel:${t('contact.phone')}`} className="hover:text-emerald-400 transition-colors font-medium">{t('contact.phone')}</a>
                            </div>
                        </div>
                        <div className="col-span-full flex items-start gap-4 pt-4 border-t border-white/10">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Address</div>
                                <div className="text-zinc-300 text-sm leading-relaxed">
                                    Eureka Automation Co., Ltd.<br />
                                    Pathum Thani, Thailand
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
