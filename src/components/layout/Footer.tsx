"use client";
import { useState } from "react";
import { Link } from '@/i18n/routing';
import Image from "next/image";
import { withBasePath } from '@/lib/utils';
import { Mail, Facebook, Linkedin, MessageSquare, Youtube } from "lucide-react";
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
      <footer className="bg-ink text-white/70 border-t border-white/10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-5 space-y-4 pr-2 lg:pr-4">
              <Link href="/" className="block">
                <div className="relative h-12 w-48 transition-all cursor-pointer">
                  <Image
                    src={withBasePath("/eureka-logo.png")}
                    alt="Eureka Automation"
                    fill
                    className="object-contain object-left brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </div>
              </Link>
              <p className="text-[15px] leading-relaxed max-w-[280px] font-light text-white/60">
                {t('description')}
              </p>

              <div className="flex flex-col gap-1.5 pt-1">
                <a href="mailto:Marketing@eurekaautomation.co.th" className="flex items-center gap-2 group w-max">
                  <Mail size={18} className="text-green-primary group-hover:text-white transition-colors" />
                  <span className="text-[15px] group-hover:text-white transition-colors font-light text-white/70">Marketing@eurekaautomation.co.th</span>
                </a>
                <a href="https://line.me/ti/p/@636ekooa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group w-max">
                  <MessageSquare size={18} className="text-green-primary group-hover:text-white transition-colors" />
                  <span className="text-[15px] group-hover:text-white transition-colors font-light text-white/70">@636ekooa</span>
                </a>
              </div>

              <div className="flex gap-1.5 pt-1">
                <a href="https://th.linkedin.com/company/eureka-automation-co.-ltd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-green-primary hover:text-white transition-all text-white/80 shrink-0">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100057184970709" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-green-primary hover:text-white transition-all text-white/80 shrink-0">
                  <Facebook size={18} />
                </a>
                <a href="https://www.youtube.com/channel/UCk8yICYGWD3uvI7QPjA08kQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-green-primary hover:text-white transition-all text-white/80 shrink-0">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 mt-2 lg:mt-0">
              <h4 className="font-bold text-white mb-4 uppercase tracking-[2px] text-[13px]">
                {t('quick_links')}
              </h4>
              <ul className="space-y-2 text-[15px] font-light mb-4 lg:mb-0">
                <li>
                  <Link href="#about" className="hover:text-green-primary transition-colors flex items-center gap-2 group w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {tNav('about')}
                  </Link>
                </li>
                <li>
                  <Link href="#productsandservices" className="hover:text-green-primary transition-colors flex items-center gap-2 group w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {tNav('products & Services')}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-green-primary transition-colors flex items-center gap-2 group w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {tNav('careers')}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-green-primary transition-colors flex items-center gap-2 group w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {tNav('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-4">
              <h4 className="font-bold text-white mb-4 uppercase tracking-[2px] text-[13px]">
                {t('services')}
              </h4>
              <ul className="space-y-3 text-[15px] font-light">
                <li>
                  <Link href="/custom-machines" className="hover:text-green-primary transition-colors flex items-start gap-2.5 group">
                    <span className="w-1.5 h-1.5 mt-[6px] rounded-full bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></span>
                    <span className="leading-relaxed">{tHome('services.custom_machines.title')}</span>
                  </Link>
                </li>

                <li>
                  <Link href="/robotics" className="hover:text-green-primary transition-colors flex items-start gap-2.5 group">
                    <span className="w-1.5 h-1.5 mt-[6px] rounded-full bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></span>
                    <span className="leading-relaxed">{tHome('services.automation.title')}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/logistics" className="hover:text-green-primary transition-colors flex items-start gap-2.5 group">
                    <span className="w-1.5 h-1.5 mt-[6px] rounded-full bg-green-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></span>
                    <span className="leading-relaxed">{tHome('services.smart_logistics.title')}</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Offices Location Boxes */}
          <div className="border-t border-white/10 pt-8 mt-4">
            <h4 className="font-bold text-white mb-6 uppercase tracking-[2px] text-[13px]">
              {t('offices.title')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TH Headquarters */}
              <div className="bg-white/5 hover:bg-white/10 transition-colors border-l-[3px] border-green-primary p-4 lg:p-5 rounded-r-xl border-y border-r border-white/5">
                <p className="text-green-primary font-bold text-[15px] mb-2 flex items-center gap-2">
                  <span className="text-white/50 text-[11px] tracking-wider uppercase font-black">{t('offices.th.tag')}</span> {t('offices.th.name')}
                </p>
                <p className="text-white font-medium text-[15px] mb-1.5">{t('offices.th.company')}</p>
                <p className="text-white/60 text-[14px] leading-relaxed mb-3">{t('offices.th.address1')}<br />{t('offices.th.address2')}</p>
                <p className="text-white/80 text-[14px]">Tel: <a href="tel:020963556" className="font-medium hover:text-green-primary transition-colors">{t('offices.th.tel')}</a></p>
              </div>
              {/* IN Office */}
              <div className="bg-white/5 hover:bg-white/10 transition-colors border-l-[3px] border-green-primary p-4 lg:p-5 rounded-r-xl border-y border-r border-white/5">
                <p className="text-green-primary font-bold text-[15px] mb-2 flex items-center gap-2">
                  <span className="text-white/50 text-[11px] tracking-wider uppercase font-black">{t('offices.in.tag')}</span> {t('offices.in.name')}
                </p>
                <p className="text-white font-medium text-[15px] mb-1.5">{t('offices.in.company')}</p>
                <p className="text-white/60 text-[14px] leading-relaxed mb-3">{t('offices.in.address1')}<br />{t('offices.in.address2')}</p>
                <p className="text-white/80 text-[14px]">Tel: <a href="tel:+911244009973" className="font-medium hover:text-green-primary transition-colors">{t('offices.in.tel')}</a></p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium uppercase tracking-[2px]">
            <p className="text-white/40">
              &copy; {currentYear} Eureka Automation.
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
