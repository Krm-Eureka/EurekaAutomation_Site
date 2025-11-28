import Link from "next/link";
import { Factory, Sparkles } from "lucide-react";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: "en" | "th" }>;
}) {
  const { lang } = await params;

  const categories = [
    {
      slug: "custom-machines",
      icon: Sparkles,
      title: lang === "en" ? "Custom Machines" : "เครื่องจักรตามสั่ง",
      description:
        lang === "en"
          ? "Fully customized machines designed for your specific production needs"
          : "เครื่องจักรที่ออกแบบเฉพาะสำหรับความต้องการการผลิตของคุณ",
      count: "20+",
    },
    {
      slug: "standard-machines",
      icon: Factory,
      title: lang === "en" ? "Standard Machines" : "เครื่องจักรมาตรฐาน",
      description:
        lang === "en"
          ? "Proven standard solutions ready for deployment"
          : "โซลูชันมาตรฐานที่พิสูจน์แล้วพร้อมใช้งาน",
      count: "15+",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            {lang === "en" ? "Our Products" : "ผลิตภัณฑ์ของเรา"}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {lang === "en"
              ? "High-quality industrial machines for automotive, electronics, and manufacturing"
              : "เครื่องจักรอุตสาหกรรมคุณภาพสูงสำหรับยานยนต์ อิเล็กทรอนิกส์ และการผลิต"}
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/${lang}/products/${category.slug}`}
                  className="group p-8 bg-white rounded-lg border-2 border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <Icon className="text-emerald-600" size={48} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-slate-900">
                          {category.title}
                        </h2>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                          {category.count}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-4">{category.description}</p>
                      <span className="text-emerald-600 font-semibold group-hover:underline">
                        {lang === "en" ? "View Products →" : "ดูผลิตภัณฑ์ →"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            {lang === "en" ? "Why Choose Our Machines" : "ทำไมต้องเลือกเครื่องจักรของเรา"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                {lang === "en" ? "Quality Assurance" : "การรับประกันคุณภาพ"}
              </h3>
              <p className="text-slate-600">
                {lang === "en"
                  ? "ISO-certified manufacturing processes"
                  : "กระบวนการผลิตที่ได้รับการรับรอง ISO"}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                {lang === "en" ? "Custom Solutions" : "โซลูชันแบบกำหนดเอง"}
              </h3>
              <p className="text-slate-600">
                {lang === "en"
                  ? "Tailored to your specific requirements"
                  : "ปรับแต่งตามความต้องการเฉพาะของคุณ"}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">
                {lang === "en" ? "After-Sales Support" : "การสนับสนุนหลังการขาย"}
              </h3>
              <p className="text-slate-600">
                {lang === "en"
                  ? "Comprehensive maintenance and training"
                  : "การบำรุงรักษาและการฝึกอบรมที่ครบวงจร"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
