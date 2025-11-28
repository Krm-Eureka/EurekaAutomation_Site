import { getDictionary } from "@/lib/dictionaries";
import { HeroSection } from "@/components/sections/HeroSection";
import { Settings, Cpu, Cog, Package, Brain, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'th' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const services = [
    {
      icon: Brain,
      title: lang === "en" ? "AI & Machine Learning" : "AI และ Machine Learning",
      description: lang === "en" 
        ? "Intelligent systems for predictive maintenance and quality control" 
        : "ระบบอัจฉริยะสำหรับการบำรุงรักษาเชิงป้องกันและควบคุมคุณภาพ",
      href: `/${lang}/services/ai-ml`,
    },
    {
      icon: Zap,
      title: lang === "en" ? "Automation Systems" : "ระบบอัตโนมัติ",
      description: lang === "en" 
        ? "Complete automation solutions from concept to installation" 
        : "โซลูชันระบบอัตโนมัติครบวงจรตั้งแต่แนวคิดถึงการติดตั้ง",
      href: `/${lang}/services/automation`,
    },
    {
      icon: Settings,
      title: lang === "en" ? "Custom Machines" : "เครื่องจักรสั่งทำ",
      description: lang === "en" 
        ? "Tailored machines for your specific production needs" 
        : "เครื่องจักรที่ออกแบบเฉพาะสำหรับการผลิตของคุณ",
      href: `/${lang}/products/custom-machines`,
    },
    {
      icon: Cpu,
      title: lang === "en" ? "PLC Programming" : "โปรแกรม PLC",
      description: lang === "en" 
        ? "Advanced control systems programming" 
        : "โปรแกรมระบบควบคุมขั้นสูง",
      href: `/${lang}/services/plc-programming`,
    },
    {
      icon: Cog,
      title: lang === "en" ? "CNC Machining" : "งาน CNC",
      description: lang === "en" 
        ? "Precision manufacturing and machining" 
        : "การผลิตชิ้นงานความเที่ยงตรงสูง",
      href: `/${lang}/services/cnc-machining`,
    },
    {
      icon: Package,
      title: lang === "en" ? "Smart Logistics" : "โลจิสติกส์อัจฉริยะ",
      description: lang === "en" 
        ? "AMR/AGV and WMS for efficient material flow" 
        : "ระบบ AMR/AGV และ WMS เพื่อการจัดการวัสดุที่มีประสิทธิภาพ",
      href: `/${lang}/solutions/amr-agv`,
    },
  ];

  return (
    <>
      <HeroSection
        lang={lang}
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        cta={dict.hero.cta}
      />

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {lang === "en" ? "Our Solutions" : "โซลูชันของเรา"}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {lang === "en"
                ? "AI-powered automation, custom machines, and smart logistics"
                : "ระบบอัตโนมัติด้วย AI เครื่องจักรสั่งทำ และโลจิสติกส์อัจฉริยะ"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group p-6 bg-slate-50 rounded-lg hover:bg-emerald-50 transition-all hover:shadow-xl border border-slate-200 hover:border-emerald-300"
                >
                  <div className="mb-4 p-3 bg-emerald-100 rounded-lg inline-block group-hover:bg-emerald-200 transition-colors">
                    <Icon className="text-emerald-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {lang === "en" ? "Industries We Serve" : "อุตสาหกรรมที่เราให้บริการ"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Automotive", "Electronics", "Food & Beverage", "Pharmaceuticals"].map(
              (industry) => (
                <div
                  key={industry}
                  className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-slate-900">{industry}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {lang === "en"
              ? "Ready to Transform Your Production?"
              : "พร้อมที่จะเปลี่ยนแปลงการผลิตของคุณ?"}
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            {lang === "en"
              ? "Let's discuss how we can help optimize your operations"
              : "มาพูดคุยว่าเราจะช่วยพัฒนาการดำเนินงานของคุณได้อย่างไร"}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            {dict.hero.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
