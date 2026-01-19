import { setRequestLocale, getTranslations } from 'next-intl/server';
import AISolutionsClient from './AISolutionsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home.services' });

    return {
        title: t('ai_ml.title'),
        description: t('ai_ml.desc'),
        alternates: {
            canonical: `/${locale}/ai-solutions`,
            languages: {
                'en': '/en/ai-solutions',
                'th': '/th/ai-solutions',
            },
        },
    };
}

export default async function AISolutionsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <AISolutionsClient />;
}
