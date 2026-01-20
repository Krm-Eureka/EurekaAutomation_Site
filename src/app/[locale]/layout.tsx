import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Eureka Automation | Advanced Industrial Solutions Thailand",
    th: "Eureka Automation | โซลูชันระบบอัตโนมัติและนวัตกรรมอุตสาหกรรม"
  };

  const descriptions: Record<string, string> = {
    en: "Leading provider of custom machine design, AI solutions, and industrial automation in Thailand. Precision engineering for the future. ISO 9001:2015 Certified.",
    th: "ผู้เชี่ยวชาญด้านการออกแบบเครื่องจักร, โซลูชัน AI และระบบอัตโนมัติอุตสาหกรรมในประเทศไทย เพิ่มประสิทธิภาพการผลิตด้วยเทคโนโลยีระดับโลก"
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  return {
    metadataBase: new URL('https://eureka-automation.com'),
    title: {
      default: titles[locale] || titles.en,
      template: "%s | Eureka Automation"
    },
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'th': '/th',
      },
    },
    openGraph: {
      title: 'Eureka Automation',
      description: descriptions[locale] || descriptions.en,
      url: `https://eureka-automation.com/${locale}`,
      siteName: 'Eureka Automation',
      images: [
        {
          url: '/images/eureka-og.png',
          width: 1200,
          height: 630,
          alt: 'Eureka Automation - Industrial Innovation',
        },
      ],
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale],
      description: descriptions[locale],
      images: ['/images/eureka-og.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {gaId && <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />}
      <Header lang={locale} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}