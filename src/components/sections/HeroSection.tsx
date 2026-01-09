"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type HeroSectionProps = {
  lang: string;
  title: string;
  subtitle: string;
  cta: string;
  contactText: string;
};

export function HeroSection({ lang, title, subtitle, cta, contactText }: HeroSectionProps) {
  const formatTitle = (text: string) => {
    if (text === "Eureka Automation 4.0") {
      return (
        <>
          Eureka <span className="text-red-500">A</span>utomat<span className="text-red-500">i</span>on 4.0
        </>
      );
    }
    return text;
  };

  return (
    <section className="relative bg-zinc-950 text-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients/Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <motion.h1
            className="font-sans text-5xl md:text-8xl font-black mb-8 tracking-tight text-white leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {formatTitle(title)}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              href={`/#solutions`}
              className="px-10 py-4 bg-white text-zinc-950 rounded-full font-bold hover:bg-zinc-200 transition-all flex items-center gap-3 shadow-xl shadow-white/5 active:scale-95"
            >
              {cta} <ArrowRight size={20} />
            </Link>

            <Link
              href={`/#contact`}
              className="px-10 py-4 bg-transparent text-white border border-white/20 rounded-full font-bold hover:bg-white/10 hover:border-white/40 transition-all active:scale-95"
            >
              {contactText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
