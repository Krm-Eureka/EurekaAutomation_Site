import { setRequestLocale, getTranslations } from "next-intl/server";
import { CareersForm } from "@/components/sections/CareersForm";
import { routing } from '@/i18n/routing';
import { Briefcase, MapPin, Clock, ChevronRight, CheckCircle2, List, Grid3x3 } from "lucide-react";
import CareersClient from "./CareersClient";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'careers' });
    return {
        title: `${t('title')} | Eureka Automation`,
        description: t('subtitle'),
    };
}

import positionsData from "@/data/careers.json";

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('careers');

    // Use centralized JSON data instead of translation files for positions
    // Filter only those with status 'open'
    const positions = (positionsData.positions as any[])
        .filter(pos => pos.status === 'open')
        .map(pos => ({
            id: pos.id,
            dept: pos.dept[locale as 'th' | 'en'],
            title: pos.title[locale as 'th' | 'en'],
            location: pos.location[locale as 'th' | 'en'],
            type: pos.type[locale as 'th' | 'en'],
            desc: pos.desc[locale as 'th' | 'en'],
            experience: pos.experience[locale as 'th' | 'en'],
            education: pos.education[locale as 'th' | 'en'],
            salary: pos.salary[locale as 'th' | 'en']
        }));

    const positionKeys = positions.map(pos => pos.id);
    const benefits = t.raw('benefits_list') as string[];

    // Convert translations to plain objects for client component
    const translations = {
        title: t('title'),
        subtitle: t('subtitle'),
        benefits: t('benefits'),
        open_positions: t('open_positions'),
        apply_now: t('apply_now'),
        apply_today: t('apply_today'),
        apply_desc: t('apply_desc'),
    };

    return (
        <CareersClient
            locale={locale}
            positionKeys={positionKeys}
            benefits={benefits}
            positions={positions}
            translations={translations}
        />
    );
}
