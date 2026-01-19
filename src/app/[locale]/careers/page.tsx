import { setRequestLocale, getTranslations } from "next-intl/server";
// import { CareersForm } from "@/components/sections/CareersForm";
import { routing } from '@/i18n/routing';
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
        alternates: {
            canonical: `/${locale}/careers`,
            languages: {
                'en': '/en/careers',
                'th': '/th/careers',
            },
        },
    };
}

import positionsData from "@/data/careers.json";

interface CareerPosition {
    status: string;
    dept: { th: string; en: string };
    title: { th: string; en: string };
    location: { th: string; en: string };
    type: { th: string; en: string };
    desc: { th: string; en: string };
    experience: { th: string; en: string };
    education: { th: string; en: string };
    salary: { th: string; en: string };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('careers');

    // Use centralized JSON data instead of translation files for positions
    // Flatten the grouped data first
    const allPositions = (Object.values(positionsData) as unknown as CareerPosition[][])
        .flat()
        .filter(p => typeof p === 'object');

    // Filter only those with status 'open'
    const positions = allPositions
        .filter((pos) => pos.status === 'open')
        .map((pos, idx) => ({
            id: idx.toString(),
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
        join_tag: t('join_tag'),
        view_all: t('view_all'),
        view_category: t('view_category'),
        labels: {
            experience: t('labels.experience'),
            education: t('labels.education'),
            salary: t('labels.salary'),
        }
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
