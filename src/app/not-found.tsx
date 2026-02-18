import "@/app/globals.css";
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <html lang="en">
            <body className="bg-zinc-950 text-white antialiased">
                <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden text-center font-sans">
                    {/* Background Decor */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')]"></div>

                    <div className="max-w-2xl w-full relative z-10">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500/10 rounded-3xl mb-8 border border-emerald-500/20">
                            <Search size={40} className="text-emerald-500" />
                        </div>

                        <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-white/5 mb-[-20px] md:mb-[-40px] select-none">
                            404
                        </h1>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Page Not Found
                        </h2>

                        <p className="text-zinc-400 text-lg md:text-xl mb-12 font-light leading-relaxed max-w-lg mx-auto">
                            The page you are looking for doesn&apos;t exist or has been moved.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/en"
                                className="flex items-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)] group"
                            >
                                <Home size={20} />
                                Back to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
