"use client";

import { useTranslations } from "next-intl";
import { Link } from '@/i18n/routing';
import { MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyCTA() {
    const t = useTranslations('common');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Only render on client to avoid hydration mismatch
    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[99] md:bottom-6 md:right-6 md:left-auto md:w-auto w-full transition-transform duration-500 ease-in-out">
            <Link
                href="/#contact"
                className="bg-green-primary hover:bg-green-dark text-white font-bold tracking-wide w-full md:w-auto py-4 md:py-3 px-6 md:rounded-full shadow-[0_-5px_20px_rgba(34,169,82,0.3)] md:shadow-[0_10px_30px_rgba(34,169,82,0.4)] flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 border-t border-green-light/30 md:border-none"
            >
                <MessageSquareText size={20} className="animate-pulse" />
                <span className="text-[15px] md:text-sm">{t('sticky_cta')}</span>
            </Link>
        </div>
    );
}
