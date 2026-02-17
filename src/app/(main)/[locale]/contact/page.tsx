import { setRequestLocale, getTranslations } from 'next-intl/server';
import ContactClient from './ContactClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: 'common.seo' });

  return {
    title: tSeo('contact_title'),
    description: tSeo('contact_description'),
    alternates: {
      canonical: `/${locale}/contact/`,
      languages: {
        'en': '/en/contact/',
        'th': '/th/contact/',
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
