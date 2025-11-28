"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type HeroSectionProps = {
  lang: string;
  title: string;
  subtitle: string;
  cta: string;
};

export function HeroSection({ lang, title, subtitle, cta }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      {/* Floating AI Icon */}
      <motion.div
        className="absolute top-20 right-20 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={120} className="text-emerald-400" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
            >
              {cta}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20">
            <div className="text-4xl font-bold text-emerald-400">10+</div>
            <div className="text-slate-300 mt-2">
              {lang === "en" ? "Years Experience" : "ปีประสบการณ์"}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20">
            <div className="text-4xl font-bold text-emerald-400">100+</div>
            <div className="text-slate-300 mt-2">
              {lang === "en" ? "Projects Completed" : "โครงการสำเร็จ"}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-emerald-500/20">
            <div className="text-4xl font-bold text-emerald-400">50+</div>
            <div className="text-slate-300 mt-2">
              {lang === "en" ? "Happy Clients" : "ลูกค้าพึงพอใจ"}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
