import { getTranslations } from "next-intl/server";
import NewsArchiveClient from "./NewsArchiveClient";

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default async function NewsArchivePage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    const items = t.raw('home.news.items') || {};
    const staticKeys = Object.keys(items).filter(key => !key.startsWith('_'));
    
    const allNews = staticKeys.map(key => {
        const itemData = items[key] || {};
        let newsImages: string[] = ["/images/Our_Legacy.webp"];
        
        if (Array.isArray(itemData.images)) {
            newsImages = itemData.images.map((img: string) => img.startsWith('/') ? img : `/${img}`);
        }
        
        return {
            id: key,
            title: itemData.title || "",
            date: itemData.date || "",
            postedDate: itemData.postedDate || "",
            desc: itemData.desc || "",
            images: newsImages,
        };
    });

    return (
        <NewsArchiveClient 
            news={allNews} 
            title={t('home.news.archive_title')}
            tagline={t('home.news.tag')}
        />
    );
}
