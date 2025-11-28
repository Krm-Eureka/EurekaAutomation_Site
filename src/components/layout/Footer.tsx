import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

type FooterProps = {
  lang: string;
  dict: {
    footer: {
      rights: string;
    };
  };
};

export function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="relative h-12 w-48 mb-4">
              <Image
                src="/eureka-logo.png"
                alt="Eureka Automation"
                fill
                className="object-contain object-left"
                unoptimized
              />
            </div>
            <p className="text-sm text-slate-400">
              {lang === "en"
                ? "AI-Powered Industrial Automation Solutions"
                : "โซลูชันระบบอัตโนมัติอุตสาหกรรมด้วย AI"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {lang === "en" ? "Quick Links" : "ลิงก์ด่วน"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-emerald-400">
                  {lang === "en" ? "About Us" : "เกี่ยวกับเรา"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="hover:text-emerald-400">
                  {lang === "en" ? "Services" : "บริการ"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products`} className="hover:text-emerald-400">
                  {lang === "en" ? "Products" : "สินค้า"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-emerald-400">
                  {lang === "en" ? "Contact" : "ติดต่อเรา"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">
              {lang === "en" ? "Services" : "บริการ"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{lang === "en" ? "CNC Machining" : "งาน CNC"}</li>
              <li>{lang === "en" ? "PLC Programming" : "โปรแกรม PLC"}</li>
              <li>{lang === "en" ? "Custom Machines" : "เครื่องจักรตามสั่ง"}</li>
              <li>{lang === "en" ? "AMR/AGV Systems" : "ระบบ AMR/AGV"}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">
              {lang === "en" ? "Contact" : "ติดต่อ"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+66 XX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@eureka-automation.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>
            © {currentYear} Eureka Automation. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
