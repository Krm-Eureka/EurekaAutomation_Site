import { setRequestLocale, getTranslations } from 'next-intl/server';
import RoboticsClient from './RoboticsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home.services' });

    return {
        title: t('automation.title'),
        description: t('automation.desc'),
        alternates: {
            canonical: `/${locale}/robotics`,
            languages: {
                'en': '/en/robotics',
                'th': '/th/robotics',
            },
        },
    };
}

export default async function RoboticsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <RoboticsClient />;
}
