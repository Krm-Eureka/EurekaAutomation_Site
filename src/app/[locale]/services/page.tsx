import Link from "next/link";
import { Wrench, Zap, Settings, Code, Radio, Package } from "lucide-react";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: "en" | "th" }>;
}) {
  const { locale: lang } = await params;

  const services = [
    {
      icon: Wrench,
      slug: "mechanical-design",
      title: lang === "en" ? "Mechanical Design" : "ออกแบบเครื่องกล",
      description:
        lang === "en"
          ? "Custom machine design tailored to your production requirements"
          : "ออกแบบเครื่องจักรตามความต้องการการผลิตของคุณ",
    },
    {
      icon: Zap,
      slug: "electrical-design",
      title: lang === "en" ? "Electrical Design" : "ออกแบบระบบไฟฟ้า",
      description:
        lang === "en"
          ? "Complete electrical system design and integration"
          : "ออกแบบและบูรณาการระบบไฟฟ้าครบวงจร",
    },
    {
      icon: Settings,
      slug: "cnc-machining",
      title: lang === "en" ? "CNC Machining" : "งาน CNC",
      description:
        lang === "en"
          ? "Precision CNC machining for custom parts"
          : "งาน CNC ความเที่ยงตรงสูงสำหรับชิ้นส่วนพิเศษ",
    },
    {
      icon: Code,
      slug: "plc-programming",
      title: lang === "en" ? "PLC Programming" : "โปรแกรม PLC",
      description:
        lang === "en"
          ? "Advanced automation control programming"
          : "การเขียนโปรแกรมควบคุมอัตโนมัติขั้นสูง",
    },
    {
      icon: Radio,
      slug: "traceability-systems",
      title: lang === "en" ? "Traceability Systems" : "ระบบ Traceability",
      description:
        lang === "en"
          ? "Complete product tracking and quality control systems"
          : "ระบบติดตามสินค้าและควบคุมคุณภาพครบวงจร",
    },
    {
      icon: Package,
      slug: "machine-assembly",
      title: lang === "en" ? "Machine Assembly & Installation" : "ประกอบและติดตั้งเครื่องจักร",
      description:
        lang === "en"
          ? "Professional assembly, installation, and maintenance"
          : "การประกอบ ติดตั้ง และบำรุงรักษาแบบมืออาชีพ",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            {lang === "en" ? "Our Services" : "บริการของเรา"}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {lang === "en"
              ? "Comprehensive industrial automation services from design to maintenance"
              : "บริการระบบอัตโนมัติอุตสาหกรรมครบวงจรตั้งแต่ออกแบบจนถึงบำรุงรักษา"}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/${lang}/services/${service.slug}`}
                  className="group p-8 bg-white rounded-lg border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all"
                >
                  <div className="mb-4 p-4 bg-emerald-100 rounded-lg inline-block group-hover:bg-emerald-200 transition-colors">
                    <Icon className="text-emerald-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <span className="text-emerald-600 font-semibold group-hover:underline">
                    {lang === "en" ? "Learn more →" : "เรียนรู้เพิ่มเติม →"}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {lang === "en"
              ? "Need a Custom Solution?"
              : "ต้องการโซลูชันที่ออกแบบเฉพาะ?"}
          </h2>
          <p className="text-xl mb-6 text-emerald-100">
            {lang === "en"
              ? "Contact us to discuss your requirements"
              : "ติดต่อเราเพื่อปรึกษาความต้องการของคุณ"}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            {lang === "en" ? "Contact Us" : "ติดต่อเรา"}
          </Link>
        </div>
      </section>
    </>
  );
}
