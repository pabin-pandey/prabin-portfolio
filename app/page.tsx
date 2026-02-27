import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Prabin Pandey — Finance & AI Analytics | MS Financial Analysis, Temple University",
  description:
    "MS Financial Analysis candidate at Temple University (Fox School of Business). Quantitative financial systems, derivatives pricing, portfolio risk analytics, and AI-integrated decision-support dashboards. Available May 2026.",
  alternates: { canonical: "https://www.prabinpandey.com" },
  openGraph: {
    title: "Prabin Pandey — Finance & AI Analytics",
    description:
      "MS Financial Analysis candidate at Temple University. Quantitative financial systems, derivatives pricing, portfolio risk analytics, and AI-integrated decision-support dashboards.",
    url: "https://www.prabinpandey.com",
  },
};

const FEATURED_PROJECTS = [
  {
    cat: "Financial Modeling",
    title: "Private Equity Transaction & Debt Covenant Model",
    desc: "Fully integrated 6-sheet Excel model for a $1B leveraged recapitalization — 3-statement financials, debt schedule, and dual covenant compliance testing over 5 years.",
    tags: ["Excel", "LBO", "Debt Covenants", "Sensitivity Analysis"],
  },
  {
    cat: "GenAI Finance",
    title: "GenAI in Finance — AI-Augmented Financial Analytics",
    desc: "5 Python analytics systems applying generative AI across WACC modeling, portfolio risk analytics, SEC document intelligence, and Streamlit dashboards — with a documented AI governance framework.",
    tags: ["Python", "Streamlit", "CAPM", "SEC Filings", "AI Governance"],
  },
  {
    cat: "Tableau",
    title: "Global Macroeconomic Intelligence Dashboard",
    desc: "Executive-grade Tableau dashboard benchmarking 4 economies across 5 macroeconomic indicators spanning 34 years of World Bank data, with dynamic parameter controls and LOD volatility engine.",
    tags: ["Tableau", "Macroeconomic Analysis", "LOD Expressions"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="home" />

      <main className="pt-32 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <section className="mb-24">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-4">
            MS Financial Analysis · Temple University
          </p>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 leading-none">
            Prabin<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Pandey
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            MS Financial Analysis candidate at Temple University (Fox School of Business). I build quantitative financial systems — derivatives pricing engines, portfolio risk analytics, SEC document intelligence pipelines, and AI-integrated decision-support dashboards — with documented human validation at every AI-assisted step.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              View Projects →
            </Link>
            <a
              href="/resume/Prabin_Pandey_Resume_2026.pdf"
              download="Prabin_Pandey_Resume_2026.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/10 text-gray-200 text-sm font-semibold rounded-xl border border-white/[0.08] transition-colors"
            >
              ↓ Resume (PDF)
            </a>
            <a
              href="https://github.com/pabin-pandey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-white/[0.06] hover:bg-white/10 text-gray-300 rounded-xl border border-white/[0.08] transition-colors"
              aria-label="GitHub"
            >
              ⌥
            </a>
            <a
              href="https://linkedin.com/in/prabin-pandey-1482362b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 bg-white/[0.06] hover:bg-white/10 text-gray-300 rounded-xl border border-white/[0.08] transition-colors"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="mb-24 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "3.98", label: "GPA" },
            { value: "20+",  label: "Projects" },
            { value: "10+",  label: "Tools" },
            { value: "CFA",  label: "Level I Candidate" },
          ].map(({ value, label }) => (
            <div key={label} className="p-5 bg-gray-900 border border-white/[0.06] rounded-xl text-center">
              <p className="text-2xl font-black text-white mb-1">{value}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </section>

        {/* ── Featured Work ── */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-2">Portfolio</p>
              <h2 className="text-3xl font-black text-white">Featured Work</h2>
            </div>
            <Link href="/projects" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              All projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_PROJECTS.map(({ cat, title, desc, tags }) => (
              <Link
                key={title}
                href="/projects"
                className="group p-6 bg-gray-900 border border-white/[0.06] rounded-2xl hover:border-indigo-500/30 transition-all"
              >
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">{cat}</p>
                <h3 className="text-base font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] rounded-full text-xs text-gray-500">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Latest Blog Post ── */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-2">Writing</p>
              <h2 className="text-3xl font-black text-white">Latest Post</h2>
            </div>
            <Link href="/blog" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              All posts →
            </Link>
          </div>
          <Link
            href="/blog/when-the-output-looks-right-but-isnt"
            className="group block p-6 bg-gray-900 border border-white/[0.06] rounded-2xl hover:border-indigo-500/30 transition-all"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs text-gray-600">Feb 25, 2026</span>
              <span className="text-gray-700">·</span>
              {["AI", "Finance", "Governance"].map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-indigo-950/60 border border-indigo-500/20 rounded-full text-xs text-indigo-400">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
              When the Output Looks Right but Isn&apos;t
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
              AI tools produce outputs that are fluent, structured, and internally consistent. In financial analysis, that introduces a specific kind of risk — convincing is not the same as correct.
            </p>
          </Link>
        </section>

        {/* ── Availability CTA ── */}
        <section>
          <div className="p-8 bg-gradient-to-br from-indigo-950/60 to-violet-950/40 border border-indigo-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-400">Available May 2026</span>
              </div>
              <p className="text-white font-semibold text-lg mb-1">Open to full-time opportunities</p>
              <p className="text-sm text-gray-400">Quantitative finance · Data analytics · AI-integrated financial research</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Get in Touch →
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
