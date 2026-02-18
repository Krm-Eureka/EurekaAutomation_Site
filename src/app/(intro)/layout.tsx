export const metadata = {
    title: 'Eureka Automation - Initializing...'
};

export default function IntroLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="font-sans antialiased min-h-screen flex flex-col bg-zinc-950 text-white">
            {children}
        </div>
    );
}
