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
    ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
    : 'bg-transparent py-5';

  const textColor = scrolled ? 'text-ink-soft hover:text-green-primary' : 'text-white/80 hover:text-white';
  // Logo is likely dark/colored by default. Since background is light (paper/green-ultra), we show original logo.
  const logoFilter = scrolled ? 'transition-all' : 'brightness-0 invert transition-all';


  const buttonStyle = scrolled
    ? 'bg-green-primary text-white hover:bg-green-dark shadow-lg'
    : 'bg-green-primary text-white hover:bg-green-dark shadow-[0_4px_16px_rgba(52,168,83,0.25)]';

  const isLinkActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname === href;
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${headerBg}`}>
      <nav className="mx-auto max-w-7xl px-5 sm:px-3 lg:px-4 flex items-center justify-between h-[76px]">
        {/* Logo */}
        <Link href="/" className="flex items-center group relative z-10">
          <div className={`relative h-11 w-44 transition-all duration-300 ${logoFilter}`}>
            <Image src={withBasePath("/eureka-logo.png")} alt="Logo" fill className="object-contain object-left" priority />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[0.85rem] font-normal tracking-wide transition-all relative group/item ${active ? 'text-green-primary font-medium' : textColor
                  }`}
              >
                {item.name}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-green-primary rounded-full transition-all duration-250 ${active ? 'w-full' : 'w-0 group-hover/item:w-full'}`} />
              </Link>
            );
          })}

          <div className={`w-px h-6 mx-2 bg-green-primary/20`} />

          {/* Language Switcher */}
          <div className={`flex p-1 rounded-full border backdrop-blur-md transition-all bg-green-ultra border-green-primary/10`}>
            <Link
              href={pathname}
              locale="en"
              scroll={false}
              className={`px-3 py-1.5 rounded-full text-[0.7rem] font-medium tracking-wider transition-all ${lang === 'en'
                ? 'bg-green-primary text-white shadow-sm'
                : 'text-ink-muted hover:text-green-primary bg-transparent'
                }`}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="th"
              scroll={false}
              className={`px-3 py-1.5 rounded-full text-[0.7rem] font-medium tracking-wider transition-all ${lang === 'th'
                ? 'bg-green-primary text-white shadow-sm'
                : 'text-ink-muted hover:text-green-primary bg-transparent'
                }`}
            >
              TH
            </Link>
          </div>

          <Link
            href="/#contact"
            className={`ml-2 px-6 py-3 text-[0.8rem] font-medium tracking-wide rounded-full transition-all duration-300 hover:-translate-y-0.5 ${buttonStyle}`}
          >
            {Translation('contact')}
          </Link>
        </div>

        {/* Mobile Menu Btn */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden relative z-[100] p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center min-w-[44px] min-h-[44px] ${'text-ink bg-white/50 border-green-primary/20 backdrop-blur-sm'
            }`}
        >
          {mobileMenuOpen ? <X size={24} className="text-green-primary" /> : <Menu size={24} className="text-ink" />}
          <span className="sr-only">Menu</span>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-paper/95 backdrop-blur-2xl border-b border-green-primary/10 shadow-xl overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="flex flex-col p-6 gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-6 py-4 text-[0.9rem] font-medium text-ink-soft hover:text-green-primary hover:bg-green-ultra/50 rounded-2xl transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="h-px bg-green-primary/10 my-4" />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Link
                href={pathname}
                locale="en"
                scroll={false}
                className={`flex items-center justify-center py-3 rounded-xl text-xs font-bold transition-all border ${lang === 'en' ? 'bg-green-primary border-green-primary text-white' : 'bg-white border-green-primary/10 text-ink-muted'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                ENGLISH
              </Link>
              <Link
                href={pathname}
                locale="th"
                scroll={false}
                className={`flex items-center justify-center py-3 rounded-xl text-xs font-bold transition-all border ${lang === 'th' ? 'bg-green-primary border-green-primary text-white' : 'bg-white border-green-primary/10 text-ink-muted'
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                ภาษาไทย
              </Link>
            </div>

            <Link
              href="/#contact"
              className="block px-6 py-4 text-xs font-bold uppercase tracking-widest text-white bg-green-primary rounded-xl text-center shadow-lg"
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