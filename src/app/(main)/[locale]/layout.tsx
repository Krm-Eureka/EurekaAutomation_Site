import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { Prompt, Outfit } from "next/font/google";

// ตั้งค่า Font
const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-prompt'
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-outfit'
});

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tSeo = await getTranslations({ locale, namespace: 'common.seo' });

  return {
    metadataBase: new URL('https://th.eurekaautomation.co.th'),
    title: {
      default: tSeo('default_title'),
      template: "%s | Eureka Automation"
    },
    description: tSeo('default_description'),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        'en': '/en/',
        'th': '/th/',
      },
    },
    openGraph: {
      title: 'Eureka Automation',
      description: tSeo('default_description'),
      url: `https://th.eurekaautomation.co.th/${locale}/`,
      siteName: 'Eureka Automation',
      images: [
        {
          url: '/images/eureka-og.webp',
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
      title: tSeo('default_title'),
      description: tSeo('default_description'),
      images: ['/images/eureka-og.webp'],
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

  if (!routing.locales.includes(locale as "en" | "th")) {
    notFound();
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${prompt.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-zinc-950">
        <NextIntlClientProvider messages={messages}>
          {gaId && <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />}

          <Header lang={locale} />
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}