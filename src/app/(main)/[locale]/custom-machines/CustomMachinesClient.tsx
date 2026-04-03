"use client";

import ServiceDetailClient from "@/components/templates/ServiceDetailClient";
import { Settings } from "lucide-react";

export default function CustomMachinesClient() {
    return (
        <ServiceDetailClient
            namespace="machines"
            videoCategory="machines"
            themeColor="bg-indigo-500/10"
            secondThemeColor="bg-blue-500/10"
            backgroundImage="/images/Our_Legacy.webp"
            icon={Settings}
            homeServiceKey="custom_machines"
        />
    );
}
