import { setRequestLocale, getTranslations } from "next-intl/server";
import { Newspaper, ChevronRight } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('tag'),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        'en': '/en/blog',
        'th': '/th/blog',
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const tNav = await getTranslations('nav');

  // In a real implementation, this would fetch from a CMS or markdown files
  const posts = [
    {
      slug: "what-is-industrial-automation",
      title: t('posts.industry40.title'),
      excerpt: t('posts.industry40.excerpt'),
      date: "2025-01-15",
      category: t('posts.industry40.category'),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-zinc-950 pt-48 pb-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
            <Newspaper size={14} className="text-zinc-400" /> {tNav('blog')}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {t('tag')}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="bg-zinc-100 aspect-video flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                  <p className="text-zinc-400 font-bold italic tracking-tighter opacity-20 text-4xl select-none">EUREKA</p>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {post.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">{post.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 leading-relaxed mb-8 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="flex items-center gap-2 font-bold text-zinc-900 group-hover:gap-3 transition-all"
                  >
                    {t('read_more')} <ChevronRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
