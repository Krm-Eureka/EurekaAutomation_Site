import { setRequestLocale, getTranslations } from "next-intl/server";
// import { CareersForm } from "@/components/sections/CareersForm";
import { routing } from '@/i18n/routing';
import CareersClient from "./CareersClient";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tSeo = await getTranslations({ locale, namespace: 'common.seo' });
    return {
        title: tSeo('careers_title'),
        description: tSeo('careers_description'),
        alternates: {
            canonical: `/${locale}/careers/`,
        }
    };
}

import { GAS_WEB_APP_URL } from "@/lib/constants";
import positionsDataFallback from "@/data/careers.json";

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('careers');

    // Fetch dynamic data from Google Sheets API
    let allPositions: Record<string, any>[] = [];
    let isFallback = false;
    try {
        if (!GAS_WEB_APP_URL) {
            console.warn("GAS_WEB_APP_URL is not defined. Using local fallback.");
            isFallback = true;
        } else {
            const apiKey = process.env.GAS_API_KEY || process.env.NEXT_PUBLIC_GAS_API_KEY || "";
            const response = await fetch(`${GAS_WEB_APP_URL}?sheet=EA-CAREERS&key=${apiKey}`, {
                next: { revalidate: 60 }
            });

            if (response.ok) {
                const result = await response.json();
                const remoteData = result.data || result; // Handle both wrapped and unwrapped
                if (Array.isArray(remoteData) && remoteData.length > 0) {
                    console.log(`[CAREERS] Successfully fetched ${remoteData.length} items from Google Sheets (EA-CAREERS).`);
                    allPositions = remoteData.map((item: any) => ({
                        ...item,
                        // Ensure ID is string and status is checked
                        id: String(item.id),
                    }));
                } else {
                    isFallback = true;
                }
            } else {
                console.error(`[CAREERS] Response not OK. Status: ${response.status}`);
                isFallback = true;
            }
        }
    } catch (error) {
        console.error("[CAREERS] Failed to fetch from Google Sheets:", error);
        isFallback = true;
    }

    if (isFallback || !Array.isArray(allPositions) || allPositions.length === 0) {
        // Fallback to local JSON data if Google Sheets is down, returns HTML, or has an error
        console.log("[CAREERS] Source: Local JSON (src/data/careers.json)");
        console.info("Using Fallback JSON Data for Careers...");
        const flatFallback = Object.values(positionsDataFallback as Record<string, unknown[] | unknown>)
            .filter((value): value is unknown[] => Array.isArray(value))
            .flat();

        allPositions = flatFallback.map((val, index: number) => {
            const pos = val as Record<string, any>;
            return {
                id: String(pos.id || `fallback-${index}`),
                status: pos.status,
                dept_th: pos.dept?.th, dept_en: pos.dept?.en,
                title_th: pos.title?.th, title_en: pos.title?.en,
                location_th: pos.location?.th, location_en: pos.location?.en,
                type_th: pos.type?.th, type_en: pos.type?.en,
                desc_th: Array.isArray(pos.desc?.th) ? pos.desc.th.join('\n') : pos.desc?.th,
                desc_en: Array.isArray(pos.desc?.en) ? pos.desc.en.join('\n') : pos.desc?.en,
                experience_th: pos.experience?.th, experience_en: pos.experience?.en,
                education_th: pos.education?.th, education_en: pos.education?.en,
                salary_th: pos.salary?.th, salary_en: pos.salary?.en,
                qualification_th: Array.isArray(pos.qualification?.th) ? pos.qualification.th.join('\n') : pos.qualification?.th,
                qualification_en: Array.isArray(pos.qualification?.en) ? pos.qualification.en.join('\n') : pos.qualification?.en,
                urgent: pos.urgent || false,
                slots: pos.slots,
                active: pos.active !== undefined ? pos.active : (pos.status === 'open'),
            };
        });
    }

    // Helper to split newlines into arrays for UI
    const parseArray = (text?: string) => {
        if (!text) return [];
        return String(text).split('\n').map(item => item.trim()).filter(Boolean);
    };

    const positions = Array.isArray(allPositions) ? allPositions
        // Filter by Boolean status (supports TRUE/FALSE from Sheets)
        .filter((pos: Record<string, any>) => {
            if (!pos) return false;
            const status = pos.status;
            return status === true || String(status).toUpperCase() === 'TRUE';
        })
        .map((pos: Record<string, any>, idx: number) => {
            const rawSlots = String(pos.slots || '');
            const slotsSuffix = locale === 'th' ? ' ตำแหน่ง' : ' Position';
            const formattedSlots = rawSlots ? `${rawSlots}${slotsSuffix}` : '';

            return {
                // Combine original ID and index for unique React keys
                id: `${pos.id || 'job'}-${idx}`,
                dept: String(locale === 'th' ? (pos.dept_th || '') : (pos.dept_en || '')) || 'Uncategorized',
                title: String(locale === 'th' ? (pos.title_th || '') : (pos.title_en || '')) || 'Untitled',
                location: String(locale === 'th' ? (pos.location_th || '') : (pos.location_en || '')),
                type: String(locale === 'th' ? (pos.type_th || '') : (pos.type_en || '')),
                desc: parseArray(locale === 'th' ? pos.desc_th : pos.desc_en),
                experience: String(locale === 'th' ? (pos.experience_th || '') : (pos.experience_en || '')),
                education: String(locale === 'th' ? (pos.education_th || '') : (pos.education_en || '')),
                salary: String(locale === 'th' ? (pos.salary_th || '') : (pos.salary_en || '')),
                qualification: parseArray(locale === 'th' ? pos.qualification_th : pos.qualification_en),
                slots: formattedSlots,
                urgent: pos.urgent === true || String(pos.urgent).toUpperCase() === 'TRUE',
                active: true // Filtered above
            };
        })
        .sort((a: any, b: any) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0)) : [];

    const benefits = (t.raw('benefits_list') as string[]) || [];

    const translations = {
        title: t('title'),
        subtitle: t('subtitle'),
        benefits: t('benefits'),
        open_positions: t('open_positions'),
        apply_now: t('apply_now'),
        apply_today: t('apply_today'),
        apply_desc: t('apply_desc'),
        join_tag: t('join_tag'),
        sticky_cta: locale === 'th' ? "ติดต่อรับคำปรึกษากับวิศวกรและฝ่ายขายฟรีทันที" : "Free consultation with engineers & sales.",
        fallbackTag: locale === 'th' ? "(ข้อมูลสำรอง)" : "(Local Data)",
        seo: {
            experience: t('labels.experience'),
            education: t('labels.education'),
            salary: t('labels.salary'),
        },
        benefits_title: t('benefits'),
        responsibilities_label: t('responsibilities_label'),
        client: {
            share_tooltip: t('client.share_tooltip'),
            copied_toast: t('client.copied_toast'),
            share_text: t('client.share_text', { job_title: '{job_title}' }), // Placeholder; client replaces at runtime
            search_placeholder: t('client.search_placeholder'),
            all_departments: t('client.all_departments'),
            no_results: t('client.no_results')
        }
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": positions.map((pos, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "JobPosting",
                "title": pos.title,
                "description": (pos.desc || []).join('\n') || "No description provided.",
                "identifier": {
                    "@type": "PropertyValue",
                    "name": "Eureka Automation",
                    "value": pos.id
                },
                "hiringOrganization": {
                    "@type": "Organization",
                    "name": "Eureka Automation",
                    "sameAs": "https://www.eurekaautomation.co.th",
                    "logo": "https://www.eurekaautomation.co.th/images/eureka-og.webp"
                },
                "jobLocation": {
                    "@type": "Place",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": pos.location || "Thailand",
                        "addressCountry": "TH"
                    }
                },
                "employmentType": String(pos.type).toUpperCase().includes('FULL') ? "FULL_TIME" : "CONTRACTOR",
                "datePosted": new Date().toISOString().split('T')[0],
                "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CareersClient
                locale={locale}
                benefits={benefits}
                positions={positions}
                translations={translations}
                dataSource={isFallback ? 'local' : 'sheets'}
            />
        </>
    );
}
