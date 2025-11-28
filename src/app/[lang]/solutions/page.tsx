import Link from "next/link";
import { Truck, Database, Network } from "lucide-react";

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "th" }>;
}) {
  const { lang } = await params;

  const solutions = [
    {
      icon: Truck,
      slug: "amr-agv",
      title: lang === "en" ? "AMR/AGV Systems" : "ระบบ AMR/AGV",
      description:
        lang === "en"
          ? "Automated material transport with Geek+ and custom solutions for point-to-point delivery"
          : "ระบบขนส่งวัสดุอัตโนมัติด้วย Geek+ และโซลูชันแบบกำหนดเองสำหรับการส่งมอบแบบจุดต่อจุด",
      features: [
        lang === "en" ? "Geek+ Integration" : "บูรณาการ Geek+",
        lang === "en" ? "Custom AGV Solutions" : "โซลูชัน AGV แบบกำหนดเอง",
        lang === "en" ? "Fleet Management" : "การจัดการ Fleet",
      ],
    },
    {
      icon: Database,
      slug: "wms",
      title: lang === "en" ? "Warehouse Management System (WMS)" : "ระบบจัดการคลังสินค้า (WMS)",
      description:
        lang === "en"
          ? "Customizable WMS integrated with your production processes"
          : "ระบบ WMS ที่ปรับแต่งได้บูรณาการกับกระบวนการผลิตของคุณ",
      features: [
        lang === "en" ? "Inventory Tracking" : "ติดตามสต็อก",
        lang === "en" ? "Order Management" : "จัดการคำสั่งซื้อ",
        lang === "en" ? "Real-time Analytics" : "การวิเคราะห์แบบเรียลไทม์",
      ],
    },
    {
      icon: Network,
      slug: "production-integration",
      title: lang === "en" ? "Production Integration" : "บูรณาการการผลิต",
      description:
        lang === "en"
          ? "Seamless integration with MES/ERP systems and production lines"
          : "บูรณาการที่ราบรื่นกับระบบ MES/ERP และสายการผลิต",
      features: [
        lang === "en" ? "MES/ERP Integration" : "บูรณาการ MES/ERP",
        lang === "en" ? "Production Line Sync" : "ซิงค์สายการผลิต",
        lang === "en" ? "Data Exchange" : "แลกเปลี่ยนข้อมูล",
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            {lang === "en" ? "Logistics Automation Solutions" : "โซลูชันระบบอัตโนมัติด้านโลจิสติกส์"}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {lang === "en"
              ? "Smart warehouse and material handling solutions for modern manufacturing"
              : "โซลูชันคลังสินค้าอัจฉริยะและจัดการวัสดุสำหรับการผลิตสมัยใหม่"}
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={solution.slug}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    !isEven ? "md:grid-flow-dense" : ""
                  }`}
                >
                  <div className={!isEven ? "md:col-start-2" : ""}>
                    <div className="inline-block p-4 bg-emerald-100 rounded-lg mb-4">
                      <Icon className="text-emerald-600" size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      {solution.title}
                    </h2>
                    <p className="text-lg text-slate-600 mb-6">
                      {solution.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${lang}/solutions/${solution.slug}`}
                      className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      {lang === "en" ? "Learn More" : "เรียนรู้เพิ่มเติม"}
                    </Link>
                  </div>
                  <div className="bg-slate-100 h-96 rounded-lg flex items-center justify-center">
                    <p className="text-slate-400">
                      {lang === "en" ? "[Solution Image]" : "[รูปโซลูชัน]"}
                    </p>
                  </div>
                </div>
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
              ? "Transform Your Logistics Operations"
              : "เปลี่ยนแปลงการดำเนินงานโลจิสติกส์ของคุณ"}
          </h2>
          <p className="text-xl mb-6 text-emerald-100">
            {lang === "en"
              ? "Get a free consultation on automation solutions"
              : "รับคำปรึกษาฟรีเกี่ยวกับโซลูชันระบบอัตโนมัติ"}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            {lang === "en" ? "Get Started" : "เริ่มต้น"}
          </Link>
        </div>
      </section>
    </>
  );
}
