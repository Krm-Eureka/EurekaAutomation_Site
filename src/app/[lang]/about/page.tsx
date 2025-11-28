import { getDictionary } from "@/lib/dictionaries";
import { Target, Award, Users } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: "en" | "th" }>;
}) {
  const { lang } = await params;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            {lang === "en" ? "About Eureka Automation" : "เกี่ยวกับ Eureka Automation"}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {lang === "en"
              ? "Leading provider of custom industrial automation solutions in Thailand"
              : "ผู้นำด้านโซลูชันระบบอัตโนมัติอุตสาหกรรมในประเทศไทย"}
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                {lang === "en" ? "Who We Are" : "เราคือใคร"}
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                {lang === "en"
                  ? "Eureka Automation specializes in designing and building custom industrial machines for Automotive, Electronics, and other manufacturing industries."
                  : "Eureka Automation เชี่ยวชาญในการออกแบบและสร้างเครื่องจักรอุตสาหกรรมตามสั่งสำหรับอุตสาหกรรมยานยนต์ อิเล็กทรอนิกส์ และอื่นๆ"}
              </p>
              <p className="text-lg text-slate-600">
                {lang === "en"
                  ? "Our comprehensive services include requirement analysis, mechanical/electrical design, CNC machining, PLC programming, traceability systems, and complete machine assembly and maintenance."
                  : "บริการครบวงจรของเรารวมถึงการวิเคราะห์ความต้องการ การออกแบบเครื่องกลและไฟฟ้า งาน CNC โปรแกรม PLC ระบบ Traceability และการประกอบและบำรุงรักษาเครื่องจักร"}
              </p>
            </div>
            <div className="bg-slate-100 h-96 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">
                {lang === "en" ? "[Factory Image]" : "[รูปโรงงาน]"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            {lang === "en" ? "Our Core Values" : "คุณค่าหลักของเรา"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                <Target className="text-emerald-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {lang === "en" ? "Innovation" : "นวัตกรรม"}
              </h3>
              <p className="text-slate-600">
                {lang === "en"
                  ? "Advanced solutions for Industry 4.0"
                  : "โซลูชันขั้นสูงสำหรับอุตสาหกรรม 4.0"}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                <Award className="text-emerald-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {lang === "en" ? "Quality" : "คุณภาพ"}
              </h3>
              <p className="text-slate-600">
                {lang === "en"
                  ? "Excellence in every project"
                  : "ความเป็นเลิศในทุกโครงการ"}
              </p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
                <Users className="text-emerald-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {lang === "en" ? "Partnership" : "ความร่วมมือ"}
              </h3>
              <p className="text-slate-600">
                {lang === "en"
                  ? "Long-term relationships with clients"
                  : "ความสัมพันธ์ระยะยาวกับลูกค้า"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
