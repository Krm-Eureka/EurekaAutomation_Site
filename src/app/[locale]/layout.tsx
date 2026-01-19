import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Eureka Automation | Industrial Automation Solutions Thailand",
    th: "Eureka Automation | โซลูชันระบบอัตโนมัติอุตสาหกรรมในประเทศไทย"
  };

  const descriptions: Record<string, string> = {
    en: "Leading provider of custom machine design, CNC machining, PLC programming, and AMR/AGV integration services in Thailand. ISO 9001:2015 Certified.",
    th: "ผู้นำด้านการออกแบบเครื่องจักรตามสั่ง, งาน CNC, โปรแกรม PLC และการรวมระบบ AMR/AGV ในประเทศไทย มาตรฐาน ISO 9001:2015"
  };

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
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
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

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header lang={locale} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}