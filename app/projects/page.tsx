"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const FILTER_CHIPS = [
  "All",
  "Financial Modeling",
  "Power BI",
  "Tableau",
  "GenAI Finance",
  "Python",
  "Financial Analytics (R)",
];

const PROJECTS = [
  {
    id:       "pe-debt-covenant-model",
    title:    "Private Equity Transaction & Debt Covenant Model",
    subtitle: "Pharma Brands Inc. — Special Dividend Recapitalization",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Fully integrated 6-sheet Excel model: 3-statement financials, debt schedule with term loan + revolver, and dual covenant compliance testing over a 5-year horizon.",
    tags:     ["Financial Modeling", "LBO", "Debt Covenants", "Excel", "Sensitivity Analysis"],
    metrics:  ["6-sheet integrated model", "All covenants pass (5 years)", "Debt/EBITDA 2.46x → 0.0x"],
    href:     "/projects/pe-debt-covenant-model",
  },
  {
    id:       "campus-operations-analytics",
    title:    "Campus Operations Analytics Dashboard",
    subtitle: "Temple University — FP&A BI Implementation",
    cat:      "Power BI",
    yr:       "2025",
    summary:  "Enterprise Power BI dashboard analyzing visitor traffic, seasonal trends, and resource utilization to support data-driven budget allocation — applying FP&A principles used at Fortune 500 companies.",
    tags:     ["Power BI", "DAX", "Business Intelligence", "FP&A Analytics", "Operational KPIs"],
    metrics:  ["60% reduction in manual reporting", "3 executive-ready dashboard pages", "YoY trend analysis"],
    href:     "/projects/campus-operations-analytics",
  },
  {
    id:       "global-macro-dashboard",
    title:    "Global Macroeconomic Intelligence Dashboard",
    subtitle: "4 Economies · 5 Indicators · 34 Years of World Bank Data",
    cat:      "Tableau",
    yr:       "2025",
    summary:  "Executive-grade Tableau dashboard benchmarking China, India, Russia, and the USA across five macroeconomic indicators. Features dynamic parameter controls, LOD-calculated volatility metrics, and interactive cross-filter actions.",
    tags:     ["Tableau", "Macroeconomic Analysis", "LOD Expressions", "Data Visualization"],
    metrics:  ["4 countries benchmarked", "34 years of data", "9 interactive worksheets"],
    href:     "/projects/global-macro-dashboard",
  },
  {
    id:       "genai-finance-system",
    title:    "GenAI in Finance — AI-Augmented Financial Analytics",
    subtitle: "Portfolio Intelligence & SEC Document System",
    cat:      "GenAI Finance",
    yr:       "2025",
    summary:  "Integrated system applying generative AI across quantitative modeling, market risk analytics, SEC document intelligence, and Streamlit dashboards — with a documented AI governance framework throughout.",
    tags:     ["Generative AI", "Python", "Streamlit", "WACC", "CAPM", "SEC Filings", "AI Governance"],
    metrics:  ["5 Python analytics systems", "3 Streamlit dashboard versions", "9 LLMs benchmarked"],
    href:     "/projects/genai-finance-system",
  },
];

const CAT_COLOR: Record<string, string> = {
  "Financial Modeling": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Power BI":           "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Tableau":            "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "GenAI Finance":      "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "Python":             "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Financial Analytics (R)": "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

export default function ProjectsPage() {
  const [query, setQuery]   = useState("");
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchFilter =
        filter === "All" ||
        p.cat === filter ||
        p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()));
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.summary.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [query, filter]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="projects" />

      <main className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Projects</h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            Quantitative financial systems, BI dashboards, and AI-integrated analytics tools.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            type="search"
            placeholder="Search projects, tools, or topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 border border-white/[0.08] text-gray-200 placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by category">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setFilter(chip)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 border
                ${filter === chip
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "border-white/[0.08] text-gray-400 hover:text-gray-200 hover:border-white/20 bg-gray-900"
                }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-600 mb-6">
          {visible.length === PROJECTS.length
            ? `${PROJECTS.length} projects`
            : `${visible.length} of ${PROJECTS.length} projects`}
        </p>

        {/* Project cards */}
        {visible.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <p className="text-lg font-semibold mb-2">No projects match</p>
            <button onClick={() => { setQuery(""); setFilter("All"); }} className="text-sm text-indigo-400 hover:text-indigo-300 underline">Clear filters</button>
          </div>
        ) : (
          <div className="space-y-6">
            {visible.map((p) => (
              <article key={p.id} className="group bg-gray-900 border border-white/[0.06] rounded-2xl p-6 hover:border-indigo-500/25 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded border font-medium ${CAT_COLOR[p.cat] ?? "text-gray-400 bg-gray-800 border-gray-700"}`}>{p.cat}</span>
                      <span className="text-xs text-gray-600">{p.yr}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">{p.title}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{p.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">{p.summary}</p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.metrics.map((m) => (
                    <span key={m} className="text-xs px-2.5 py-1 rounded-lg bg-gray-800 border border-white/[0.06] text-gray-400">{m}</span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded text-gray-600 bg-gray-800">{t}</span>
                  ))}
                </div>

                <Link
                  href={p.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                >
                  View case study →
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* More projects */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <h2 className="text-base font-bold text-white mb-4">More Projects by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Python / Quant Finance", href: "/projects/python", count: "6 projects" },
              { label: "Excel Financial Models",  href: "/excel-projects",  count: "8 projects" },
              { label: "R / Financial Analytics", href: "/r-projects",      count: "4 projects" },
            ].map(({ label, href, count }) => (
              <Link
                key={href}
                href={href}
                className="p-4 bg-gray-900 border border-white/[0.06] rounded-xl hover:border-indigo-500/25 transition-colors group"
              >
                <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{label}</p>
                <p className="text-xs text-gray-600 mt-1">{count}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
