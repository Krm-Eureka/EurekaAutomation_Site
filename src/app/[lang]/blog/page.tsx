export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: "en" | "th" }>;
}) {
  const { lang } = await params;

  // In a real implementation, this would fetch from a CMS or markdown files
  const posts = [
    {
      slug: "what-is-industry-4-0",
      title: lang === "en" ? "What is Industry 4.0?" : "Industry 4.0 คืออะไร?",
      excerpt:
        lang === "en"
          ? "Understanding the fourth industrial revolution and its impact on manufacturing"
          : "ทำความเข้าใจการปฏิวัติอุตสาหกรรมครั้งที่สี่และผลกระทบต่อการผลิต",
      date: "2025-01-15",
      category: "Technology",
    },
    {
      slug: "benefits-custom-vs-standard-machines",
      title:
        lang === "en"
          ? "Benefits of Custom vs Standard Machines"
          : "ข้อดีของเครื่องจักรแบบกำหนดเองเทียบกับมาตรฐาน",
      excerpt:
        lang === "en"
          ? "When to choose custom machines over standard solutions"
          : "เมื่อไหร่ควรเลือกเครื่องจักรแบบกำหนดเองแทนโซลูชันมาตรฐาน",
      date: "2025-01-10",
      category: "Insights",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">
            {lang === "en" ? "Blog & Insights" : "บทความและข้อมูลเชิงลึก"}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {lang === "en"
              ? "Latest news and insights from the world of industrial automation"
              : "ข่าวสารและข้อมูลเชิงลึกจากโลกของระบบอัตโนมัติอุตสาหกรรม"}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="bg-slate-100 h-48 flex items-center justify-center">
                  <p className="text-slate-400">
                    {lang === "en" ? "[Post Image]" : "[รูปบทความ]"}
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-emerald-600 font-semibold">
                      {post.category}
                    </span>
                    <span className="text-sm text-slate-400">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-4">{post.excerpt}</p>
                  <a
                    href={`/${lang}/blog/${post.slug}`}
                    className="text-emerald-600 font-semibold hover:underline"
                  >
                    {lang === "en" ? "Read more →" : "อ่านเพิ่มเติม →"}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
