import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";
import newsDataRaw from "@/data/news.json";

interface PageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

interface NewsData {
    [key: string]: {
        title: { th: string; en: string };
        date: { th: string; en: string };
        postedDate: string;
        desc: { th: string; en: string };
        images?: string[];
        content?: { th: string[]; en: string[] };
    };
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const locales = ['en', 'th'] as const;
    const keys = Object.keys(newsDataRaw).filter(key => !key.startsWith('_'));
    
    const params = locales.flatMap(locale => 
        keys.map(id => ({ locale, id }))
    );
    
    return params;
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    
    const typedNewsData = newsDataRaw as unknown as NewsData;
    const itemData = typedNewsData[id];
    
    if (!itemData) {
        return notFound();
    }

    const keys = Object.keys(newsDataRaw).filter(key => !key.startsWith('_'));
    const otherNews = keys.map(key => {
        const otherData = typedNewsData[key];
        return {
            id: key,
            title: otherData.title[locale as 'th' | 'en'] || otherData.title.en,
            date: otherData.date[locale as 'th' | 'en'] || otherData.date.en,
            postedDate: otherData.postedDate || "",
            images: otherData.images || ["/images/Our_Legacy.webp"],
            paragraphs: []
        };
    }).sort((a, b) => {
        const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
        const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
        return dateB - dateA;
    });

    const item = {
        id,
        title: itemData.title[locale as 'th' | 'en'] || itemData.title.en,
        date: itemData.date[locale as 'th' | 'en'] || itemData.date.en,
        postedDate: itemData.postedDate,
        description: itemData.desc[locale as 'th' | 'en'] || itemData.desc.en,
        images: itemData.images || ["/images/Our_Legacy.webp"],
        content: itemData.content?.[locale as 'th' | 'en'] || itemData.content?.en || [],
        paragraphs: itemData.content?.[locale as 'th' | 'en'] || itemData.content?.en || []
    };

    return <NewsDetailClient item={item} otherNews={otherNews} />;
}
