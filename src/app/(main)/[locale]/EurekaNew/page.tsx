import { getTranslations } from "next-intl/server";
import NewsArchiveClient from "./NewsArchiveClient";
import newsDataRaw from "@/data/news.json";

interface PageProps {
    params: Promise<{
        locale: string;
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

export default async function NewsArchivePage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    
    const typedNewsData = newsDataRaw as unknown as NewsData;
    const keys = Object.keys(newsDataRaw).filter(key => !key.startsWith('_'));
    const allNews = keys.map(key => {
        const itemData = typedNewsData[key];
        return {
            id: key,
            title: itemData.title[locale as 'th' | 'en'] || itemData.title.en,
            date: itemData.date[locale as 'th' | 'en'] || itemData.date.en,
            postedDate: itemData.postedDate,
            desc: itemData.desc[locale as 'th' | 'en'] || itemData.desc.en,
            images: itemData.images || ["/images/Our_Legacy.webp"],
        };
    }).sort((a, b) => {
        const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
        const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
        return dateB - dateA;
    });

    return (
        <NewsArchiveClient 
            news={allNews} 
            title={t('home.news.archive_title')}
            tagline={t('home.news.tag')}
        />
    );
}
