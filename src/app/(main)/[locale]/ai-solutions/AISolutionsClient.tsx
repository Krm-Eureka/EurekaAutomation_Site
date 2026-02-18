"use client";

import ServiceDetailClient from "@/components/templates/ServiceDetailClient";
import { Sparkles } from "lucide-react";

export default function AISolutionsClient() {
    return (
        <ServiceDetailClient
            namespace="ai"
            videoCategory="AI"
            themeColor="bg-fuchsia-500/10"
            secondThemeColor="bg-cyan-500/10"
            backgroundImage="/images/hero-automation.webp"
            icon={Sparkles}
            homeServiceKey="ai_ml"
        />
    );
}

