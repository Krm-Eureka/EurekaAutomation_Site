"use client";

import { Link, usePathname } from '@/i18n/routing';
import Image from "next/image";
import { withBasePath } from '@/lib/utils';
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

type HeaderProps = {
  lang: string;
};

export function Header({ lang }: HeaderProps) {
  const Translation = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: Translation('about'), href: '/#about' },
    { name: Translation('products & Services'), href: '/#productsandservices' },
    { name: Translation('showcase'), href: '/#showcase' },
    { name: Translation('careers'), href: '/careers' },
  ];

  // Dynamic Styles
  const headerBg = scrolled
    ? 'bg-zinc-550 backdrop-blur-md border-b border-white/5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
    : 'bg-transparent py-5';

  const textColor = scrolled ? 'text-zinc-550 hover:text-white' : 'text-white/80 hover:text-white';
  const logoFilter = scrolled ? 'opacity-90 group-hover:opacity-100 transition-all' : 'brightness-0 invert opacity-90 group-hover:opacity-100 transition-all';
  const buttonStyle = 'bg-emerald-500 text-zinc-950 hover:bg-white shadow-[0_0_20px_rgba(16,185,129,0.2)]';

  const isLinkActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname === href;
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${headerBg}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center group relative z-10">
          <div className={`relative h-10 w-40 transition-all duration-300 ${logoFilter}`}>
            <Image src={withBasePath("/eureka-logo.png")} alt="Logo" fill className="object-contain object-left" priority />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.2em] transition-all rounded-lg relative group/item ${active ? 'text-emerald-400' : textColor
                  }`}
              >
                {item.name}
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full"
                  />
                )}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full scale-x-0 group-hover/item:scale-x-100 transition-transform origin-left" />
              </Link>
            );
          })}

          <div className="w-px h-4 bg-white/10 mx-4" />

          {/* Language Switcher */}
          <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
            <Link
              href={pathname}
              locale="en"
              scroll={false}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-500 hover:text-white'
                }`}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="th"
              scroll={false}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${lang === 'th' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-500 hover:text-white'
                }`}
            >
              TH
            </Link>
          </div>

          <Link
            href="/#contact"
            className={`ml-6 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-500 ${buttonStyle}`}
          >
            {Translation('contact')}
          </Link>
        </div>

        {/* Mobile Menu Btn */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="flex flex-col p-6 gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-emerald-400 hover:bg-white/5 rounded-2xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="h-px bg-white/10 my-4" />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link
                href={pathname}
                locale="en"
                scroll={false}
                className={`flex items-center justify-center py-4 rounded-2xl text-[10px] font-bold transition-all border ${lang === 'en' ? 'bg-emerald-500 border-emerald-400 text-zinc-950' : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                ENGLISH
              </Link>
              <Link
                href={pathname}
                locale="th"
                scroll={false}
                className={`flex items-center justify-center py-4 rounded-2xl text-[10px] font-bold transition-all border ${lang === 'th' ? 'bg-emerald-500 border-emerald-400 text-zinc-950' : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                ภาษาไทย
              </Link>
            </div>

            <Link
              href="/#contact"
              className="block px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-950 bg-emerald-500 rounded-2xl text-center shadow-[0_10px_20px_rgba(16,185,129,0.2)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {Translation('contact')}
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}