"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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
    icon:     "📊",
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
    icon:     "⚡",
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
    icon:     "🌐",
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
    icon:     "🤖",
  },
];

// Using hex colors for all dynamic styling (avoids Tailwind JIT class issues)
const CAT_CONFIG: Record<string, { color: string; glow: string }> = {
  "Financial Modeling":      { color: "#34d399", glow: "rgba(52,211,153,0.12)"  },
  "Power BI":                { color: "#facc15", glow: "rgba(250,204,21,0.10)"  },
  "Tableau":                 { color: "#60a5fa", glow: "rgba(96,165,250,0.10)"  },
  "GenAI Finance":           { color: "#a78bfa", glow: "rgba(167,139,250,0.12)" },
  "Python":                  { color: "#22d3ee", glow: "rgba(34,211,238,0.10)"  },
  "Financial Analytics (R)": { color: "#fb923c", glow: "rgba(251,146,60,0.10)"  },
};

const DEFAULT_CFG = { color: "#818cf8", glow: "rgba(99,102,241,0.1)" };

// Active chip styles for filter buttons
const CHIP_ACTIVE_STYLE: Record<string, { background: string; border: string; color: string }> = {
  "All":                     { background: "rgba(99,102,241,0.9)",   border: "#818cf8", color: "#fff"     },
  "Financial Modeling":      { background: "rgba(52,211,153,0.18)",  border: "#34d399", color: "#6ee7b7"  },
  "Power BI":                { background: "rgba(250,204,21,0.15)",  border: "#facc15", color: "#fde68a"  },
  "Tableau":                 { background: "rgba(96,165,250,0.15)",  border: "#60a5fa", color: "#93c5fd"  },
  "GenAI Finance":           { background: "rgba(167,139,250,0.18)", border: "#a78bfa", color: "#c4b5fd"  },
  "Python":                  { background: "rgba(34,211,238,0.15)",  border: "#22d3ee", color: "#67e8f9"  },
  "Financial Analytics (R)": { background: "rgba(251,146,60,0.15)",  border: "#fb923c", color: "#fdba74"  },
};

export default function ProjectsClient() {
  const [query, setQuery]   = useState("");
  const [filter, setFilter] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
    <>
      {/* ── Search ── */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-colors duration-200"
          style={{ color: query ? "#818cf8" : undefined }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          type="search"
          placeholder="Search projects, tools, or topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-3.5 rounded-xl text-gray-200 placeholder-gray-600 text-sm focus:outline-none transition-all duration-200"
          style={{
            background: "rgba(17,24,39,0.8)",
            border: query ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.07)",
            boxShadow: query ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1 rounded"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Filter chips ── */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {FILTER_CHIPS.map((chip) => {
          const isActive = filter === chip;
          const activeStyle = CHIP_ACTIVE_STYLE[chip];
          return (
            <button
              key={chip}
              onClick={() => setFilter(chip)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={isActive && activeStyle ? {
                background: activeStyle.background,
                border: `1px solid ${activeStyle.border}`,
                color: activeStyle.color,
                transform: "translateY(-1px)",
                boxShadow: `0 4px 12px ${activeStyle.border}30`,
              } : {
                background: "rgba(17,24,39,0.6)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#6b7280",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "#d1d5db";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.color = "#6b7280";
                }
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* ── Results count ── */}
      <p className="text-xs text-gray-600 mb-6 font-medium">
        {visible.length === PROJECTS.length
          ? `Showing all ${PROJECTS.length} featured projects`
          : `${visible.length} of ${PROJECTS.length} projects match`}
      </p>

      {/* ── Project cards ── */}
      {visible.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4 opacity-60">🔍</div>
          <p className="text-lg font-bold text-gray-400 mb-2">No projects match</p>
          <p className="text-sm text-gray-600 mb-5">Try different keywords or clear your filters</p>
          <button
            onClick={() => { setQuery(""); setFilter("All"); }}
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {visible.map((p, idx) => {
            const cfg = CAT_CONFIG[p.cat] ?? DEFAULT_CFG;
            const isHovered = hoveredCard === p.id;
            return (
              <article
                key={p.id}
                className="relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: "rgba(17,24,39,0.85)",
                  border: isHovered ? `1px solid rgba(255,255,255,0.12)` : "1px solid rgba(255,255,255,0.06)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? `0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${cfg.glow}`
                    : "0 2px 8px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.2s ease",
                }}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Left accent border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{
                    background: `linear-gradient(180deg, ${cfg.color}, ${cfg.color}60)`,
                    opacity: isHovered ? 1 : 0.55,
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Top shimmer line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${cfg.color}50 40%, ${cfg.color}80 50%, ${cfg.color}50 60%, transparent 100%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Background glow orb on hover */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    transform: "translate(30%, -30%)",
                  }}
                />

                <div className="relative pl-7 pr-6 py-6">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Icon */}
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                        style={{
                          background: `${cfg.color}18`,
                          border: `1px solid ${cfg.color}35`,
                        }}
                      >
                        {p.icon}
                      </span>
                      {/* Category badge */}
                      <span
                        className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                        style={{
                          background: `${cfg.color}15`,
                          border: `1px solid ${cfg.color}35`,
                          color: cfg.color,
                        }}
                      >
                        {p.cat}
                      </span>
                      <span className="text-xs text-gray-600 font-medium">{p.yr}</span>
                      {p.yr === "2025" && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-500/25">
                          NEW
                        </span>
                      )}
                    </div>
                    {/* Card number */}
                    <span className="text-[11px] font-mono text-gray-700 select-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title & subtitle */}
                  <h2
                    className="text-lg font-bold leading-snug mb-0.5 transition-colors duration-200"
                    style={{ color: isHovered ? "#e0e7ff" : "#f9fafb" }}
                  >
                    {p.title}
                  </h2>
                  <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">{p.subtitle}</p>

                  {/* Summary */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-5">{p.summary}</p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{
                          background: `${cfg.color}12`,
                          border: `1px solid ${cfg.color}28`,
                          color: cfg.color,
                        }}
                      >
                        <span style={{ opacity: 0.7 }}>✓</span>
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md font-medium"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "#6b7280",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 text-[13px] font-bold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 group/link"
                    style={{ color: cfg.color }}
                  >
                    <span>View case study</span>
                    <span
                      className="inline-block"
                      style={{
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ── More Projects ── */}
      <div className="mt-14 pt-8 border-t border-white/[0.05]">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-gray-600 mb-5">
          More Projects by Category
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Excel Financial Models",
              href:  "/excel-projects",
              count: "8 projects",
              icon:  "📋",
              color: "#34d399",
              desc:  "DCF, LBO, PE & valuation models",
            },
            {
              label: "R / Financial Analytics",
              href:  "/r-projects",
              count: "4 projects",
              icon:  "📉",
              color: "#fb923c",
              desc:  "Time-series, regression & risk models",
            },
          ].map(({ label, href, count, icon, color, desc }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 p-5 rounded-xl transition-all duration-200"
              style={{
                background: "rgba(17,24,39,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.3), 0 0 20px ${color}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}35`,
                }}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold" style={{ color }}>{count}</p>
                <span
                  className="text-gray-600 text-sm inline-block transition-all duration-200 group-hover:text-gray-300"
                  style={{ display: "block", transform: "translateX(0)", transition: "transform 0.2s ease, color 0.2s ease" }}
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
