import { getTranslations } from "next-intl/server";
import NewsArchiveClient from "./NewsArchiveClient";
import newsDataRaw from "@/data/news.json";
import { GAS_WEB_APP_URL } from "@/lib/constants";
import { getGoogleDriveDirectLink } from "@/lib/googleDriveUtils";
import { NewsItem } from "./NewsArchiveClient";

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

interface RawNewsItem {
    id: string | number;
    title_th?: string;
    title_en?: string;
    date_th?: string;
    date_en?: string;
    posted_date?: string;
    desc_th?: string;
    desc_en?: string;
    images?: string | string[];
    content_th?: string;
    content_en?: string;
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
    
    // Fetch dynamic News from Google Sheets
    let allNews: NewsItem[] = [];
    let isFallback = false;

    try {
        if (!GAS_WEB_APP_URL) {
            console.warn("GAS_WEB_APP_URL is not defined. Using local fallback.");
            isFallback = true;
        } else {
            const apiKey = process.env.GAS_API_KEY || process.env.NEXT_PUBLIC_GAS_API_KEY || "";
            const response = await fetch(`${GAS_WEB_APP_URL}?sheet=EA-NEWS&key=${apiKey}`, {
                next: { revalidate: 60 }
            });

            if (response.ok) {
                const remoteNews = await response.json();
                if (Array.isArray(remoteNews) && remoteNews.length > 0) {
                    console.log(`[NEWS] Successfully fetched ${remoteNews.length} items from Google Sheets.`);
                    allNews = remoteNews.map((item: RawNewsItem) => ({
                        id: String(item.id),
                        title: locale === 'th' ? (String(item.title_th) || '') : (String(item.title_en) || ''),
                        date: locale === 'th' ? (String(item.date_th) || '') : (String(item.date_en) || ''),
                        postedDate: String(item.posted_date || ""),
                        desc: locale === 'th' ? (String(item.desc_th) || '') : (String(item.desc_en) || ''),
                        // Map multiple images and convert Drive links
                        images: Array.isArray(item.images) 
                            ? item.images.map((u: string) => getGoogleDriveDirectLink(u))
                            : (item.images ? [getGoogleDriveDirectLink(String(item.images))] : ["/images/Our_Legacy.webp"]),
                    }));
                } else {
                    isFallback = true;
                }
            } else {
                isFallback = true;
            }
        }
    } catch (error) {
        console.error("News fetch error:", error);
        isFallback = true;
    }

    // Fallback to local JSON if sheets fails
    if (isFallback) {
        console.log("[NEWS] Source: Local JSON (src/data/news.json)");
        const typedNewsData = newsDataRaw as unknown as NewsData;
        const keys = Object.keys(newsDataRaw).filter(key => !key.startsWith('_'));
        console.log(`[NEWS] Processing ${keys.length} local items.`);
        allNews = keys.map(key => {
            console.log(`[NEWS] Processing item ID: ${key}`);
            const itemData = typedNewsData[key];
            return {
                id: key,
                title: itemData.title[locale as 'th' | 'en'] || itemData.title.en,
                date: itemData.date[locale as 'th' | 'en'] || itemData.date.en,
                postedDate: itemData.postedDate,
                desc: itemData.desc[locale as 'th' | 'en'] || itemData.desc.en,
                images: itemData.images || ["/images/Our_Legacy.webp"],
            };
        });
    }

    // Final sort
    allNews.sort((a, b) => {
        const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
        const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
        return dateB - dateA;
    });

    // Deduplicate news by ID before passing to client component
    const uniqueNews = Array.from(
        new Map(allNews.map(item => [item.id, item])).values()
    );

    return (
        <NewsArchiveClient 
            news={uniqueNews} 
            title={t('home.news.archive_title')}
            tagline={t('home.news.tag')}
            isFallback={isFallback}
        />
    );
}
