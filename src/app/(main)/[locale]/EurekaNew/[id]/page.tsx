import { getTranslations } from "next-intl/server";
import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const locales = ['en', 'th'] as const;
    
    // In static export mode, next-intl's getTranslations might not resolve reliably 
    // in generateStaticParams. Direct JSON imports are more robust here.
    const params = await Promise.all(locales.map(async (locale) => {
        try {
            // Load the message file directly
            const messages = (await import(`@/messages/${locale}.json`)).default;
            const items = messages?.home?.news?.items;
            
            if (items && typeof items === 'object') {
                return Object.keys(items)
                    .filter(key => !key.startsWith('_'))
                    .map(id => ({ locale, id }));
            }
        } catch {
            console.error(`Failed to generate static params for locale ${locale}`);
        }
        return [];
    }));
    
    return params.flat();
}

export default async function NewsDetailPage({ params }: PageProps) {
    const { locale, id } = await params;
    const t = await getTranslations({ locale });
    const items = t.raw('home.news.items') || {};
    const staticKeys = Object.keys(items).filter(key => !key.startsWith('_'));
    
    if (!staticKeys.includes(id)) {
        return notFound();
    }

    // Prepare all news items for the "Other News" section
    const otherNews = staticKeys.map(key => {
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
            images: newsImages,
            paragraphs: []
        };
    }).sort((a, b) => {
        const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
        const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
        return dateB - dateA;
    });

    const currentBase = otherNews.find(n => n.id === id);
    const currentItemData = items[id] || {};
    
    let paragraphs: string[] = [];
    let content: string[] = [];
    
    if (Array.isArray(currentItemData.content)) {
        content = currentItemData.content;
    }

    if (Array.isArray(currentItemData.paragraphs)) {
        paragraphs = currentItemData.paragraphs;
    } else if (currentItemData.full_content) {
        paragraphs = currentItemData.full_content.split('\n').filter((p: string) => p.trim());
    } else if (currentItemData.desc) {
        paragraphs = [currentItemData.desc];
    }

    const item = {
        ...currentBase!,
        paragraphs,
        content,
        images: currentBase!.images
    };

    return <NewsDetailClient item={item} otherNews={otherNews} />;
}
