import { Target, Award, Users, Factory, Sparkles } from "lucide-react";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const valueKeys = ["innovation", "quality", "partnership"] as const;
  const valueIcons = [Target, Award, Users];
  const valueColors = ["bg-emerald-100", "bg-emerald-100", "bg-emerald-100"];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm text-white/80 mb-6">
            <Sparkles size={16} className="text-emerald-400" /> {t("tag")}
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                {locale === "en" ? "Who We Are" : "เราคือใคร"}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t("description")}
              </p>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-600 italic">
                  {locale === "en"
                    ? "Our comprehensive services include requirement analysis, mechanical/electrical design, CNC machining, PLC programming, and complete machine assembly."
                    : "บริการครบวงจรของเรารวมถึงการวิเคราะห์ความต้องการ การออกแบบเครื่องกลและไฟฟ้า งาน CNC โปรแกรม PLC และการประกอบเครื่องจักร"}
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-zinc-900 opacity-90"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                <Factory size={80} strokeWidth={1} className="mb-4" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold">{t("placeholder")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16 tracking-tight">
            {t("values.innovation.title")} & {t("values.quality.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <div key={key} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center hover:shadow-xl transition-shadow">
                  <div className={`inline-flex p-4 ${valueColors[i]} rounded-2xl mb-6 text-emerald-600`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {t(`values.${key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
