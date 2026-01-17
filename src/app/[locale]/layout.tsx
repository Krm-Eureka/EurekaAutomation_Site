import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  metadataBase: new URL('https://eureka-automation.com'),
  title: {
    default: "Eureka Automation | Industrial Automation Solutions Thailand",
    template: "%s | Eureka Automation"
  },
  description: " Leading provider of custom machine design, CNC machining, PLC programming, and AMR/AGV integration services in Thailand. ISO 9001:2015 Certified.",
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'th': '/th',
    },
  },
  openGraph: {
    title: 'Eureka Automation',
    description: 'Industrial Automation Solutions',
    url: 'https://eureka-automation.com',
    siteName: 'Eureka Automation',
    locale: 'en_US',
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
      <Footer lang={locale} />
    </NextIntlClientProvider>
  );
}