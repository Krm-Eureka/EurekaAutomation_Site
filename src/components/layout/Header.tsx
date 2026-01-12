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
    { name: Translation('products'), href: '/#products' },
    { name: Translation('services'), href: '/#services' },
    // { name: Translation('careers'), href: '/careers' },
  ];

  // Dynamic Styles
  const headerBg = scrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 py-2 shadow-sm' : 'bg-transparent py-4';
  const textColor = scrolled ? 'text-zinc-600 hover:text-zinc-900' : 'text-white/80 hover:text-white';
  const logoFilter = scrolled ? '' : 'brightness-0 invert opacity-90'; // Make logo white when transparent
  const buttonStyle = scrolled ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-zinc-900 hover:bg-zinc-100';

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/#" className="flex items-center group">
          <div className={`relative h-15 w-50 transition-all duration-300 ${logoFilter}`}>
            <Image src={withBasePath("/eureka-logo.png")} alt="Logo" fill className="object-contain object-left" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${textColor}`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/#contact"
            className={`px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${buttonStyle}`}
          >
            {Translation('contact')}
          </Link>

          {/* Language Switcher */}
          <div className={`flex gap-2 text-xs font-semibold ml-4 border-l pl-4 ${scrolled ? 'border-zinc-200' : 'border-white/20'}`}>
            <Link href={pathname} locale="en" scroll={false} className={`${lang === 'en' ? (scrolled ? 'text-zinc-900' : 'text-white') : (scrolled ? 'text-zinc-400 hover:text-zinc-600' : 'text-white/50 hover:text-white')}`}>EN</Link>
            <Link href={pathname} locale="th" scroll={false} className={`${lang === 'th' ? (scrolled ? 'text-zinc-900' : 'text-white') : (scrolled ? 'text-zinc-400 hover:text-zinc-600' : 'text-white/50 hover:text-white')}`}>TH</Link>
          </div>
        </div>

        {/* Mobile Menu Btn */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-2 ${scrolled ? 'text-zinc-900' : 'text-white'}`}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 bg-white border-b border-zinc-100 shadow-xl overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="flex flex-col p-4 gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-base font-medium text-zinc-900 hover:bg-zinc-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="block px-4 py-2 text-base font-medium text-white bg-zinc-900 rounded-lg text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {Translation('contact')}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-zinc-100">
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Language:</span>
              <Link
                href={pathname}
                locale="en"
                scroll={false}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang === 'en' ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="th"
                scroll={false}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${lang === 'th' ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                TH
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}