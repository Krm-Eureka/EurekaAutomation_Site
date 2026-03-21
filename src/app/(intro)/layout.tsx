import { Inter, Sarabun } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-inter'
});

const sarabun = Sarabun({
    subsets: ["latin", "thai"],
    weight: ["400", "500", "600", "700", "800"],
    variable: '--font-sarabun'
});

export const metadata = {
    title: 'Eureka Automation - Initializing...'
};

export default function IntroLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${sarabun.variable} scroll-smooth`}>
            <body className="font-sans antialiased min-h-screen flex flex-col bg-zinc-950 text-white">
                {children}
            </body>
        </html>
    );
}
