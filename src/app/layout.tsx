import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
    subsets: ["latin", "thai"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: '--font-prompt'
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className="scroll-smooth">
            <body className={`${prompt.variable} font-sans antialiased text-zinc-900 bg-white flex flex-col min-h-screen`}>
                {children}
            </body>
        </html>
    );
}
