import { setRequestLocale, getTranslations } from 'next-intl/server';
import LogisticsClient from './LogisticsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home.services' });

    return {
        title: t('smart_logistics.title'),
        description: t('smart_logistics.desc'),
        alternates: {
            canonical: `/${locale}/logistics`,
            languages: {
                'en': '/en/logistics',
                'th': '/th/logistics',
            },
        },
    };
}

export default async function LogisticsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <LogisticsClient />;
}
