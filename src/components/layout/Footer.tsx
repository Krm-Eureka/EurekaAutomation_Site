import { Link } from '@/i18n/routing';
import Image from "next/image";
import { withBasePath } from '@/lib/utils';
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <div className={`relative h-12 w-48 brightness-0 invert opacity-90 hover:opacity-100 transition-opacity cursor-pointer`}>
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
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:text-white transition-colors">
                <Facebook size={18} />
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
                <Link href="custom-machines" className="hover:text-white transition-colors">
                  {tHome('services.custom_machines.title')}
                </Link>
              </li>
              <li>
                <Link href="ai-solutions" className="hover:text-white transition-colors">
                  {tHome('services.ai_ml.title')}
                </Link>
              </li>
              <li>
                <Link href="robotics" className="hover:text-white transition-colors">
                  {tHome('services.automation.title')}
                </Link>
              </li>
              <li>
                <Link href="logistics" className="hover:text-white transition-colors">
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
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-zinc-300" />
                </div>
                <span>+66 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-zinc-300" />
                </div>
                <span>info@eureka-automation.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  <MapPin size={14} className="text-zinc-300" />
                </div>
                <span>Bangkok, <br />Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>
            © {currentYear} Eureka Automation.
          </p>
          <p className="text-zinc-500">
            {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
