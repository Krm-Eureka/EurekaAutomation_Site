"use client";

import ServiceDetailClient from "@/components/templates/ServiceDetailClient";
import { Truck } from "lucide-react";

export default function LogisticsClient() {
    return (
        <ServiceDetailClient
            namespace="logistics"
            videoCategory="logistics"
            themeColor="bg-emerald-500/10"
            secondThemeColor="bg-blue-500/10"
            backgroundImage="/images/eureka-og.webp"
            icon={Truck}
            homeServiceKey="smart_logistics"
        />
    );
}
