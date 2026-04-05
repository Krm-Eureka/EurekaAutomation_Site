import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";
import newsDataRaw from "@/data/news.json";
import { GAS_WEB_APP_URL } from "@/lib/constants";
import { getGoogleDriveDirectLink, processNewsContent } from "@/lib/googleDriveUtils";

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

// Allow dynamic params so new news in Google Sheets work immediately
export const dynamicParams = true;

// Pre-render static paths for local JSON data (remains fast for known news)
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
    
    let item: any = null;
    let otherNews: any[] = [];
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
                const remoteItem = remoteNews.find(n => String(n.id) === id);
                if (remoteItem) {
                    const rawContent = locale === 'th' ? (remoteItem.content_th || '') : (remoteItem.content_en || '');
                    // Handle both array and newline string formats
                    const contentArray = typeof rawContent === 'string' ? rawContent.split('\n') : rawContent;
                    
                    item = {
                        id,
                        title: locale === 'th' ? (remoteItem.title_th || '') : (remoteItem.title_en || ''),
                        date: locale === 'th' ? (remoteItem.date_th || '') : (remoteItem.date_en || ''),
                        postedDate: remoteItem.posted_date,
                        description: locale === 'th' ? (remoteItem.desc_th || '') : (remoteItem.desc_en || ''),
                        images: Array.isArray(remoteItem.images) 
                            ? remoteItem.images.map((u: string) => getGoogleDriveDirectLink(u))
                            : [getGoogleDriveDirectLink(remoteItem.images)],
                        content: processNewsContent(contentArray),
                        paragraphs: processNewsContent(contentArray)
                    };
                }

                // Map other news for sidebar/bottom
                otherNews = remoteNews.map((n: any) => ({
                    id: String(n.id),
                    title: locale === 'th' ? (n.title_th || '') : (n.title_en || ''),
                    date: locale === 'th' ? (n.date_th || '') : (n.date_en || ''),
                    postedDate: n.posted_date || "",
                    images: Array.isArray(n.images) 
                        ? n.images.map((u: string) => getGoogleDriveDirectLink(u))
                        : [getGoogleDriveDirectLink(n.images)],
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
            description: itemData.desc[locale as 'th' | 'en'] || itemData.desc.en,
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
