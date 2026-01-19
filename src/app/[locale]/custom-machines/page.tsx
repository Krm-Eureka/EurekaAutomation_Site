import { setRequestLocale, getTranslations } from 'next-intl/server';
import CustomMachinesClient from './CustomMachinesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home.services' });

    return {
        title: t('custom_machines.title'),
        description: t('custom_machines.desc'),
        alternates: {
            canonical: `/${locale}/custom-machines`,
            languages: {
                'en': '/en/custom-machines',
                'th': '/th/custom-machines',
            },
        },
    };
}

export default async function CustomMachinesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <CustomMachinesClient />;
}
