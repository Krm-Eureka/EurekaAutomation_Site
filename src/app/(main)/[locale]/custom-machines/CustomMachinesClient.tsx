"use client";

import ServiceDetailClient from "@/components/templates/ServiceDetailClient";
import { Settings } from "lucide-react";

export default function CustomMachinesClient() {
    return (
        <ServiceDetailClient
            namespace="machines"
            videoCategory="MACHINES"
            themeColor="bg-indigo-500/10"
            secondThemeColor="bg-blue-500/10"
            backgroundImage="/images/hero-automation.webp"
            icon={Settings}
            homeServiceKey="custom_machines"
        />
    );
}
