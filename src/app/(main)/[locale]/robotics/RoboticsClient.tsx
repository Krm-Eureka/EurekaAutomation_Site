"use client";

import ServiceDetailClient from "@/components/templates/ServiceDetailClient";
import { Zap } from "lucide-react";

export default function RoboticsClient() {
    return (
        <ServiceDetailClient
            namespace="robotics"
            videoCategory="ROBOTICS"
            themeColor="bg-cyan-500/10"
            secondThemeColor="bg-violet-500/10"
            backgroundImage="/images/Our_Legacy.webp"
            icon={Zap}
            homeServiceKey="automation"
        />
    );
}

