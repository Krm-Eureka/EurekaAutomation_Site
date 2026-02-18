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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${outfit.variable} ${prompt.variable}`}>
            <body className="font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
