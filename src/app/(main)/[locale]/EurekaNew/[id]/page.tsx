import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";
import newsDataRaw from "@/data/news.json";
import { GAS_WEB_APP_URL } from "@/lib/constants";
import { getGoogleDriveDirectLink, processNewsContent } from "@/lib/googleDriveUtils";
import { NewsItem } from "./NewsDetailClient";

interface PageProps {
    params: Promise<{
        locale: string;
        id: string;
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
    content_th?: string | string[];
    content_en?: string | string[];
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

// In static export mode, all paths must be pre-rendered
export const dynamicParams = false;

// Pre-render static paths for local JSON data and Google Sheets data
export async function generateStaticParams() {
    const locales = ['en', 'th'] as const;
    let keys = Object.keys(newsDataRaw).filter(key => !key.startsWith('_'));

    // Try to fetch remote IDs to pre-render them
    try {
        const apiKey = process.env.GAS_API_KEY || "";
        const response = await fetch(`${GAS_WEB_APP_URL}?sheet=EA-NEWS&key=${apiKey}`);
        if (response.ok) {
            const remoteNews = await response.json();
            if (Array.isArray(remoteNews)) {
                const remoteKeys = remoteNews.map((n: { id: string | number }) => String(n.id));
                keys = Array.from(new Set([...keys, ...remoteKeys]));
            }
        }
    } catch (e) {
        console.error("Static params fetch error:", e);
    }
    
    const params = locales.flatMap(locale => 
        keys.map(id => ({ locale, id }))
    );
    
    return params;
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    
    let item: NewsItem | null = null;
    let otherNews: NewsItem[] = [];
    let isFallback = false;

    try {
        const apiKey = process.env.GAS_API_KEY || "";
        const response = await fetch(`${GAS_WEB_APP_URL}?sheet=EA-NEWS&key=${apiKey}`, {
            next: { revalidate: 60 }
        });

        if (response.ok) {
            const remoteNews = await response.json();
            if (Array.isArray(remoteNews)) {
                // Find current item
                const remoteItem = remoteNews.find((n: RawNewsItem) => String(n.id) === id);
                if (remoteItem) {
                    const rawContent = locale === 'th' ? (remoteItem.content_th || '') : (remoteItem.content_en || '');
                    // Handle both array and newline string formats
                    const contentArray = typeof rawContent === 'string' ? rawContent.split('\n') : (rawContent as string[]);
                    
                    item = {
                        id,
                        title: locale === 'th' ? (String(remoteItem.title_th) || '') : (String(remoteItem.title_en) || ''),
                        date: locale === 'th' ? (String(remoteItem.date_th) || '') : (String(remoteItem.date_en) || ''),
                        postedDate: String(remoteItem.posted_date || ""),
                        images: Array.isArray(remoteItem.images) 
                            ? remoteItem.images.map((u: string) => getGoogleDriveDirectLink(u))
                            : [getGoogleDriveDirectLink(String(remoteItem.images || ""))],
                        content: processNewsContent(contentArray),
                        paragraphs: processNewsContent(contentArray)
                    };
                }

                // Map other news for sidebar/bottom
                otherNews = remoteNews.map((n: RawNewsItem) => ({
                    id: String(n.id),
                    title: locale === 'th' ? (String(n.title_th) || '') : (String(n.title_en) || ''),
                    date: locale === 'th' ? (String(n.date_th) || '') : (String(n.date_en) || ''),
                    postedDate: String(n.posted_date || ""),
                    images: Array.isArray(n.images) 
                        ? n.images.map((u: string) => getGoogleDriveDirectLink(u))
                        : [getGoogleDriveDirectLink(String(n.images || ""))],
                    paragraphs: []
                }));
            } else {
                isFallback = true;
            }
        } else {
            isFallback = true;
        }
    } catch (error) {
        console.error("News Detail fetch error:", error);
        isFallback = true;
    }

    // Fallback logic
    if (!item && isFallback) {
        const typedNewsData = newsDataRaw as unknown as NewsData;
        const itemData = typedNewsData[id];
        
        if (!itemData) return notFound();

        item = {
            id,
            title: itemData.title[locale as 'th' | 'en'] || itemData.title.en,
            date: itemData.date[locale as 'th' | 'en'] || itemData.date.en,
            postedDate: itemData.postedDate,
            images: itemData.images || ["/images/Our_Legacy.webp"],
            content: itemData.content?.[locale as 'th' | 'en'] || itemData.content?.en || [],
            paragraphs: itemData.content?.[locale as 'th' | 'en'] || itemData.content?.en || []
        };

        const keys = Object.keys(newsDataRaw).filter(key => !key.startsWith('_'));
        otherNews = keys.map(key => {
            const otherData = typedNewsData[key];
            return {
                id: key,
                title: otherData.title[locale as 'th' | 'en'] || otherData.title.en,
                date: otherData.date[locale as 'th' | 'en'] || otherData.date.en,
                postedDate: otherData.postedDate || "",
                images: otherData.images || ["/images/Our_Legacy.webp"],
                paragraphs: []
            };
        });
    }

    if (!item) return notFound();

    // Sort other news
    otherNews.sort((a, b) => {
        const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
        const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
        return dateB - dateA;
    });

    return <NewsDetailClient item={item} otherNews={otherNews} />;
}
