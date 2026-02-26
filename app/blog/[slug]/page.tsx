import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ── Post data (single source of truth) ──────────────────────── */
const POSTS: Record<string, {
  title: string; date: string; tags: string[];
  sections: { heading?: string; body: string }[];
}> = {
  "when-the-output-looks-right-but-isnt": {
    title: "When the Output Looks Right but Isn't",
    date:  "Feb 25, 2026",
    tags:  ["AI", "Finance", "Governance"],
    sections: [
      {
        heading: "Brief Context",
        body: "Working through a series of applied AI assignments in a graduate finance program, the same tension kept surfacing. AI tools produce outputs that are fluent, structured, and internally consistent. In most fields, that's useful. In financial analysis, it introduces a specific kind of risk. Convincing is not the same as correct.",
      },
      {
        heading: "Central Question",
        body: "The question isn't whether AI is useful in finance. It clearly is. The harder question is: at what point does a well-formed AI output become a liability rather than an asset?",
      },
      {
        heading: "Reasoning",
        body: "The first observation came from understanding what AI models actually do. They predict the next word based on patterns in training data. They don't verify claims. So when a model states that a fund \"is expected to underperform the benchmark,\" that sentence reads like an analytical conclusion. But it may have no supporting evidence. The model generated it because it fits the pattern — not because it's true.\n\nThis matters more in finance than in most fields. A DCF model built with AI-generated discount rates or growth assumptions can produce a complete, internally consistent output — and still be wrong. The numbers will hang together. The error won't be visible until something depends on it.\n\nThe second observation was about trust. Newer AI models don't just produce coherent responses — they mask incorrect information more convincingly than older models did. The output doesn't just sound right. It sounds authoritative. That's the actual problem.\n\nThinking through DCF workflows made this concrete. Some stages — discounting, formula links, equity value calculations — can be tested mechanically. A formula either references the right cell or it doesn't. The error is structural and identifiable.\n\nBut other stages — defining scope, designing scenarios, selecting benchmarks — involve judgment. No formula determines whether a growth assumption is appropriate for a specific business in a specific market. Only understanding the business does.\n\nThe implication is that AI works better as a structural tool than as an analytical one. It can build the scaffolding. It can write the code that computes the output. Humans still need to decide what goes inside the model and whether the output means what it appears to mean.",
      },
      {
        heading: "Key Observations",
        body: "Narrative validation matters more than tonal analysis. In MD&A work, the most important check wasn't whether management sounded confident or cautious. It was whether the narrative was consistent with the audited financial statements. Management writes the MD&A. Auditors verify the numbers. Those are different processes with different incentives. When they diverge, the audited numbers take priority — always.\n\nOverconfidence in simulation outputs is easy to miss. One annotated AI output claimed that tracking error \"exhibits notable consistency across simulated paths.\" That sentence sounds like an observation. It isn't. Consistency across simulated paths says nothing about what happens in actual markets.\n\nTemperature settings shape how reliable AI outputs are. At low temperature, the model produces focused, repeatable responses suited to tasks that require accuracy. At high temperature, the model explores more but varies more. For financial analysis where outputs will be used as inputs, low temperature is generally the safer default.",
      },
      {
        heading: "Practical Meaning",
        body: "The governance frameworks that major financial institutions have built around AI aren't excessive caution. They're a practical response to a clear problem: AI cannot be accountable. Humans are. Requiring model registration, independent validation, and human sign-off before AI outputs are used in client-facing decisions puts accountability exactly where it needs to be.\n\nFor an individual analyst, the practical implication is simpler. Treat AI outputs as a first draft requiring review — not a conclusion requiring formatting. The review isn't about distrust. It's about recognizing where the model's confidence comes from and whether that confidence is earned.",
      },
      {
        heading: "Limits or Uncertainty",
        body: "These observations came from academic assignments, not live production environments. Real financial workflows involve data quality issues, time pressure, team dynamics, and institutional constraints that change how AI tools are used in practice. What looks like a clear validation step in a structured exercise may be harder to apply consistently when a deadline is close and the output looks correct.\n\nThere's also an open question about where exactly AI-assisted analysis ends and AI-generated analysis begins. Whether that balance holds as AI tools become more capable and more embedded in standard workflows is genuinely unclear.",
      },
      {
        heading: "Closing Reflection",
        body: "The most durable insight from working through these materials wasn't about what AI can do. It was about what makes AI specifically risky: not that it produces wrong outputs, but that it produces wrong outputs that look right. That's a different problem than accuracy. It's a credibility problem. Better models won't solve it. Better practices might.",
      },
    ],
  },
};

/* ── Static params for Next.js build ─────────────────────────── */
export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

/* ── Metadata ─────────────────────────────────────────────────── */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS[params.slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Prabin Pandey`,
    description: post.sections[0]?.body.slice(0, 160),
    alternates: { canonical: `https://www.prabinpandey.com/blog/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.sections[0]?.body.slice(0, 160),
      url: `https://www.prabinpandey.com/blog/${params.slug}`,
      type: "article",
    },
  };
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="blog" />

      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate">{post.title}</span>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time className="text-sm text-gray-500 font-medium">{post.date}</time>
            <span className="text-gray-700">·</span>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">{tag}</span>
              ))}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">{post.title}</h1>
          <p className="text-sm text-gray-500 mt-3">Prabin Pandey · Fox School of Business, Temple University</p>
        </header>

        {/* Body */}
        <article className="space-y-8">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-lg font-bold text-white mb-3">{section.heading}</h2>
              )}
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className="text-[15px] text-gray-300 leading-[1.85] mb-4 last:mb-0">{para}</p>
              ))}
            </section>
          ))}
        </article>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/blog" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← Back to Blog</Link>
          <Link href="/contact" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Get in touch →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
