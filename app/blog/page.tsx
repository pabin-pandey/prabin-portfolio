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

const TAG_COLOR: Record<string, string> = {
  AI:         "#a78bfa",
  Finance:    "#34d399",
  Governance: "#60a5fa",
};

const posts = [
  {
    slug:    "when-the-output-looks-right-but-isnt",
    title:   "When the Output Looks Right but Isn't",
    date:    "Feb 25, 2026",
    readMin: "5 min read",
    excerpt: "AI tools produce outputs that are fluent, structured, and internally consistent. In financial analysis, that introduces a specific kind of risk — convincing is not the same as correct.",
    tags:    ["AI", "Finance", "Governance"],
    accent:  "#a78bfa",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="blog" />

      <main id="main-content" className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: "#818cf8" }}>Blog</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Writing</h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Notes on AI governance in finance, quantitative modeling, and the practical limits of AI-assisted analysis.
          </p>
        </div>

        {/* ── Post cards ── */}
        <div className="space-y-5">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="blog-card-accent group relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(17,24,39,0.85)",
                border:     "1px solid rgba(255,255,255,0.06)",
                boxShadow:  "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {/* Top shimmer on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${post.accent}70, transparent)` }}
              />

              <Link
                href={`/blog/${post.slug}`}
                className="block pl-7 pr-6 py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-2xl"
                aria-label={`Read: ${post.title}`}
              >
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <time className="text-xs font-medium text-gray-500">{post.date}</time>
                  <span className="text-gray-700 select-none">·</span>
                  <span className="text-xs font-medium text-gray-600">{post.readMin}</span>
                  <span className="text-gray-700 select-none">·</span>
                  <div className="flex gap-1.5">
                    {post.tags.map((tag) => {
                      const color = TAG_COLOR[tag] ?? "#818cf8";
                      return (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background:  `${color}15`,
                            border:      `1px solid ${color}30`,
                            color:       color,
                          }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-lg font-bold leading-snug mb-2 transition-colors duration-200 group-hover:text-indigo-200"
                  style={{ color: "#f9fafb" }}
                >
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-400 leading-relaxed mb-5">{post.excerpt}</p>

                {/* CTA */}
                <span
                  className="inline-flex items-center gap-2 text-[13px] font-bold"
                  style={{ color: post.accent }}
                >
                  Read more
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
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
