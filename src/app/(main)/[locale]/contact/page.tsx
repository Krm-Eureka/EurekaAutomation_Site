import { setRequestLocale, getTranslations } from 'next-intl/server';
import ContactClient from './ContactClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const tContact = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('contact'),
    description: tContact('description'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'en': '/en/contact',
        'th': '/th/contact',
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactClient locale={locale} />;
}
