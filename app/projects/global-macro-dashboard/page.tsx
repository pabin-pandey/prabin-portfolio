import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Global Macroeconomic Intelligence Dashboard — Tableau | Prabin Pandey",
  description:
    "Executive Tableau dashboard benchmarking China, India, Russia, and the USA across 5 macroeconomic indicators over 34 years of World Bank data. Dynamic parameter controls, LOD expressions, and cross-filter actions.",
  alternates: { canonical: "https://www.prabinpandey.com/projects/global-macro-dashboard" },
  openGraph: {
    title: "Global Macroeconomic Intelligence Dashboard",
    description: "Tableau dashboard: 4 economies, 5 indicators, 34 years of World Bank data. LOD expressions, dynamic parameters.",
    url: "https://www.prabinpandey.com/projects/global-macro-dashboard",
  },
};

const sections = [
  {
    id: "problem",
    label: "Problem",
    body: "Macroeconomic decision-making — whether for asset allocation, country risk assessment, or strategic planning — requires a unified view of how major economies diverge across key financial indicators over time. Static spreadsheet reports cannot capture the dynamic, multi-dimensional nature of cross-country economic comparison.",
  },
  {
    id: "approach",
    label: "Approach",
    body: "Designed a parameter-driven Tableau workbook using World Bank macroeconomic data. Built a layered architecture: four KPI snapshot sheets feeding into a coordinated dashboard, a dynamic indicator selector parameter powering all trend charts, and LOD expressions ensuring accurate country-level calculations independent of view context.",
  },
  {
    id: "validation",
    label: "Validation",
    body: "LOD-calculated volatility indices (STDEV over 34 years) and LOOKUP-based YoY growth rates were cross-checked against manually computed Excel calculations for a subset of country-year combinations. FIXED LOD expressions were tested with and without dashboard filters to confirm they hold correctly under cross-sheet filter actions.",
  },
  {
    id: "output",
    label: "Output",
    body: "A self-contained macroeconomic research platform: 9 interactive worksheets, 1 coordinated dashboard, dynamic indicator selector switching all charts with one parameter click. Any analyst can instantly compare how the 2008 financial crisis, COVID-19 shock, and 2022 geopolitical events impacted each economy across all five indicators.",
  },
  {
    id: "limitations",
    label: "Limitations",
    body: "World Bank data has a 1–2 year publication lag for some indicators, so the most recent data points (2023–2024) may be incomplete. The dashboard covers four economies — selection reflects major global economic forces but excludes EU, Japan, and emerging markets. FDI and interest rate data have more missing values than GDP or CPI.",
  },
  {
    id: "next",
    label: "Next Improvements",
    body: "Expanding the country set to include the EU aggregate, Japan, and Brazil for broader emerging market coverage. Adding a correlation matrix sheet to surface statistical relationships between indicators. Automating the World Bank data refresh via Tableau Prep.",
  },
];

const metrics = [
  { label: "Countries",          value: "4" },
  { label: "Indicators",         value: "5" },
  { label: "Years of data",      value: "34" },
  { label: "Worksheets",         value: "9" },
];

export default function GlobalMacroDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="projects" />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/projects" className="hover:text-gray-300 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-gray-400">Global Macro Dashboard</span>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-1 rounded border text-blue-400 bg-blue-400/10 border-blue-400/20 font-medium">Tableau</span>
            <span className="text-xs text-gray-600">2025</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight mb-2">
            Global Macroeconomic Intelligence Dashboard
          </h1>
          <p className="text-lg text-blue-300/80 font-medium">4 Economies · 5 Indicators · 34 Years of World Bank Data</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {metrics.map((m) => (
            <div key={m.label} className="bg-gray-900 border border-white/[0.06] rounded-xl p-3 text-center">
              <p className="text-lg font-black text-white">{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Live embed link */}
        <div className="mb-8 p-4 bg-blue-950/30 border border-blue-500/20 rounded-xl flex items-center justify-between gap-4">
          <p className="text-sm text-blue-300/80">Live dashboard available on Tableau Public</p>
          <a
            href="https://public.tableau.com/views/TableauFinalProject_17716017323360/GLOBALMACRODASHBOARD?:embed=yes&:showVizHome=no&:toolbar=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            View on Tableau Public →
          </a>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wide">{s.label}</h2>
              <p className="text-[15px] text-gray-300 leading-[1.85]">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-10">
          {["Tableau", "LOD Expressions", "Table Calculations", "Excel", "World Bank Data", "Macroeconomic Analysis", "Country Benchmarking"].map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded bg-gray-900 border border-white/[0.06] text-gray-500">{t}</span>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex justify-between">
          <Link href="/projects/campus-operations-analytics" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← Previous</Link>
          <Link href="/projects" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">All Projects</Link>
          <Link href="/projects/genai-finance-system" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Next →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
