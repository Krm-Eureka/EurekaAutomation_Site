import "@/app/globals.css";
import { Prompt, Outfit } from "next/font/google";

const prompt = Prompt({
    subsets: ["latin", "thai"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-prompt'
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-outfit'
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
        <html lang="en" className={`${outfit.variable} ${prompt.variable}`}>
            <body className="font-sans antialiased min-h-screen flex flex-col bg-zinc-950">
                {children}
            </body>
        </html>
    );
}
