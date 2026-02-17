"use client";
import { useState } from "react";
import { Link } from '@/i18n/routing';
import Image from "next/image";
import { withBasePath } from '@/lib/utils';
import { Mail, Phone, MapPin, Facebook, Linkedin, MessageSquare, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import ContactModal from "@/components/modals/ContactModal";

export function Footer() {
  const [selectedContact, setSelectedContact] = useState<{ type: string, value: string, label: string, href?: string } | null>(null);

  const handleConfirm = () => {
    if (!selectedContact) return;
    if (selectedContact.type === 'map' || selectedContact.type === 'line') {
      window.open(selectedContact.href || selectedContact.value, '_blank');
    } else {
      window.location.href = `${selectedContact.type}:${selectedContact.value}`;
    }
    setTimeout(() => setSelectedContact(null), 100);
  };
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');

  return (
    <>
      <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Company Info */}
            <div className="space-y-6">
              <Link href="/" className="block">
                <div className={`relative h-14 w-52 brightness-0 invert opacity-100 hover:opacity-100 transition-opacity cursor-pointer`}>
                  <Image
                    src={withBasePath("/eureka-logo.png")}
                    alt="Eureka Automation"
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">
                {t('description')}
              </p>
              <div className="flex gap-4">
                <a href="https://linkedin.com/company/eureka-automation-thailand" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="https://facebook.com/EurekaAutomationThailand" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://www.youtube.com/channel/UCk8yICYGWD3uvI7QPjA08kQ" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 rounded-full hover:text-white transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">
                {t('quick_links')}
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <Link href="#productsandservices" className="hover:text-white transition-colors">
                    {tNav('products & Services')}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    {tNav('careers')}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">
                {t('services')}
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="/custom-machines" className="hover:text-white transition-colors">
                    {tHome('services.custom_machines.title')}
                  </Link>
                </li>

                <li>
                  <Link href="/robotics" className="hover:text-white transition-colors">
                    {tHome('services.automation.title')}
                  </Link>
                </li>
                <li>
                  <Link href="/logistics" className="hover:text-white transition-colors">
                    {tHome('services.smart_logistics.title')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">
                {t('contact')}
              </h4>
              <ul className="space-y-4 text-sm">
                <li
                  className="flex items-center gap-4 group cursor-pointer"
                  onClick={() => {
                    console.log('Footer: Phone Clicked');
                    setSelectedContact({ type: 'tel', value: '020963556', label: 'Call Us' });
                  }}
                >
                  <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <Phone size={16} className="text-zinc-300 group-hover:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mb-0.5">Call Us</span>
                    <span className="text-zinc-300">02-096-3556</span>
                  </div>
                </li>
                <li
                  className="flex items-start gap-4 group cursor-pointer"
                  onClick={() => {
                    console.log('Footer: Email Clicked');
                    setSelectedContact({ type: 'mailto', value: 'Marketing@eurekaautomation.co.th', label: 'Marketing' });
                  }}
                >
                  <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <Mail size={16} className="text-zinc-300 group-hover:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mb-0.5 block">Marketing</span>
                    <span className="text-zinc-300 break-all lg:break-normal">Marketing@eurekaautomation.co.th</span>
                  </div>
                </li>
                <li
                  className="flex items-center gap-4 group cursor-pointer"
                  onClick={() => {
                    console.log('Footer: Line Clicked');
                    setSelectedContact({ type: 'line', value: '@636ekooa', label: 'Line OA', href: 'https://line.me/ti/p/@636ekooa' });
                  }}
                >
                  <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <MessageSquare size={16} className="text-zinc-300 group-hover:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mb-0.5">Line OA</span>
                    <span className="text-zinc-300">@636ekooa</span>
                  </div>
                </li>
                <li
                  className="flex items-start gap-4 group cursor-pointer"
                  onClick={() => {
                    console.log('Footer: Map Clicked');
                    setSelectedContact({ type: 'map', value: 'https://www.google.com/maps/search/?api=1&query=Eureka+Automation+Thailand+48/15+Moo+4+Biggerland+4+Klong+8', label: 'Location' });
                  }}
                >
                  <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 mt-1 group-hover:bg-emerald-600 transition-colors">
                    <MapPin size={16} className="text-zinc-300 group-hover:text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mb-0.5">Location</span>
                    <span className="text-zinc-300">Pathum Thani, <br />Thailand</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
            <p className="text-zinc-600">
              {currentYear} Eureka Automation.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Confirmation Modal (Reused from Home) */}
      <ContactModal
        selectedContact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
