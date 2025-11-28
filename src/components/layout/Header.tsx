"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

type HeaderProps = {
  lang: string;
  dict: {
    nav: {
      home: string;
      about: string;
      services: string;
      products: string;
      solutions: string;
      blog: string;
      contact: string;
      careers: string;
    };
  };
};

export function Header({ lang, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.about, href: `/${lang}/about` },
    { name: dict.nav.services, href: `/${lang}/services` },
    { name: dict.nav.products, href: `/${lang}/products` },
    { name: dict.nav.solutions, href: `/${lang}/solutions` },
    { name: dict.nav.blog, href: `/${lang}/blog` },
    { name: dict.nav.contact, href: `/${lang}/contact` },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="flex items-center group">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative h-10 w-48"
              >
                <Image
                  src="/eureka-logo.png"
                  alt="Eureka Automation"
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language switcher */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={`/en`}
              className={`px-3 py-1 rounded transition-all ${
                lang === "en" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              EN
            </Link>
            <Link
              href={`/th`}
              className={`px-3 py-1 rounded transition-all ${
                lang === "th" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              TH
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 space-y-2"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md hover:bg-slate-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex gap-2 px-3 pt-2">
              <Link href={`/en`} className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors">
                EN
              </Link>
              <Link href={`/th`} className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 transition-colors">
                TH
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
