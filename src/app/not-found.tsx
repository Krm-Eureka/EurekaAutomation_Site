"use client";

import "@/app/globals.css";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown <= 0) {
            router.push('/en');
            return;
        }
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown, router]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden text-center font-sans bg-zinc-950 text-white">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwaC00MFoiLz48cGF0aCBkPSJNMCAwaDF2NDBIOFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjxwYXRoIGQ9Ik0wIDBoNDB2MUgwWiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')]"></div>

            <div className="max-w-2xl w-full relative z-10">

                <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-white/5 mb-[-20px] md:mb-[-40px] select-none">
                    404
                </h1>

                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    Page Not Found
                </h2>

                <p className="text-zinc-400 text-lg md:text-xl mb-6 font-light leading-relaxed max-w-lg mx-auto">
                    The page you are looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="mb-12">
                    <p className="text-green-primary font-bold animate-pulse">
                        Redirecting to homepage in {countdown}...
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/en"
                        className="flex items-center gap-3 px-10 py-5 bg-green-primary hover:bg-green-light text-white rounded-2xl font-bold transition-all shadow-[0_20px_40px_rgba(52,168,83,0.2)] group"
                    >
                        <Home size={20} />
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
