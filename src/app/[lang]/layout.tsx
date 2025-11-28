import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary } from "@/lib/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eureka Automation",
  description: "Industrial Automation Solutions",
};

type PageProps = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'th' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');
  
  return (
    <html lang={lang}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header lang={lang} dict={dict} />
        <main className="flex-grow">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
