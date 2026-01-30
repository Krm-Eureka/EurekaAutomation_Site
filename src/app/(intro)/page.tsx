"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { withBasePath } from '@/lib/utils';
import Image from 'next/image';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    console.log("⚡ [EUREKA] System Booting...");

    const timer = setTimeout(() => {
      router.replace('/en');
    }, 1200);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen overflow-hidden font-sans relative">

      {/* Modern Minimalist Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-red-500 to-emerald-500" />
      </div>

      <div className="relative flex flex-col items-center">

        {/* Logo Container with Sophisticated Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-16"
        >
          {/* Animated Logo Glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-8 bg-emerald-500/5 rounded-full blur-2xl"
          />

          <div className="relative w-64 h-24">
            <Image
              src={withBasePath("/eureka-logo.png")}
              alt="Eureka Automation"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Scanned Line Effect */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent z-10"
          />
        </motion.div>

        {/* New Modern Progress Tab Interface */}
        <div className="relative w-72">
          {/* Progress Label */}
          <div className="flex justify-between items-end mb-3">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
            >
              Initializing <span className="text-emerald-500">v4.0</span>
            </motion.span>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex gap-1"
            >
              <div className="w-1 h-1 bg-zinc-300 rounded-full" />
              <div className="w-1 h-1 bg-zinc-300 rounded-full" />
              <div className="w-1 h-1 bg-zinc-300 rounded-full" />
            </motion.div>
          </div>

          {/* Main Progress Bar (The "Tab" Style) */}
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50 p-[2px]">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-zinc-900 via-emerald-600 to-red-600 rounded-full"
            />
          </div>

          {/* Status Indicators below breadcrumb */}
          <div className="mt-4 flex justify-between">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">Engine_Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-red-500 rounded-full"
                />
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">Syncing...</span>
              </div>
            </div>
            <span className="text-[9px] font-mono text-zinc-300">0xEF-449</span>
          </div>
        </div>

      </div>

      {/* Minimal Footer */}
      <div className="fixed bottom-10 flex flex-col items-center gap-1">
        <div className="w-10 h-1 bg-zinc-100 rounded-full mb-3" />
        <p className="text-[9px] text-zinc-300 uppercase tracking-[0.4em] font-medium opacity-50">
          Industrial Automation Excellence
        </p>
      </div>

    </div>
  );
}
