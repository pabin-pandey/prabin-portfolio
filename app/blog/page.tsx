import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Blog — Prabin Pandey",
  description:
    "Writing on AI governance in finance, quantitative modeling, and the practical limits of AI-assisted financial analysis.",
  alternates: { canonical: "https://www.prabinpandey.com/blog" },
  openGraph: {
    title: "Blog — Prabin Pandey",
    description: "Writing on AI governance in finance, quantitative modeling, and the practical limits of AI-assisted analysis.",
    url: "https://www.prabinpandey.com/blog",
  },
};

const posts = [
  {
    slug:    "when-the-output-looks-right-but-isnt",
    title:   "When the Output Looks Right but Isn't",
    date:    "Feb 25, 2026",
    excerpt: "AI tools produce outputs that are fluent, structured, and internally consistent. In financial analysis, that introduces a specific kind of risk — convincing is not the same as correct.",
    tags:    ["AI", "Finance", "Governance"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="blog" />

      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">Blog</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Writing</h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Notes on AI governance in finance, quantitative modeling, and the practical limits of AI-assisted analysis.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="group bg-gray-900 border border-white/[0.06] rounded-2xl p-6 hover:border-indigo-500/30 transition-colors">
              <Link href={`/blog/${post.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-xs text-gray-500 font-medium">{post.date}</time>
                  <span className="text-gray-700">·</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">{tag}</span>
                    ))}
                  </div>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-[13px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
