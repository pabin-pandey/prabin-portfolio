import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "PE Debt Covenant Model — Pharma Brands Inc. | Prabin Pandey",
  description:
    "Fully integrated 6-sheet Excel model for a PE special dividend recapitalization. 3-statement financials, debt schedule with term loan + revolver, dual covenant compliance testing over 5 years.",
  alternates: { canonical: "https://www.prabinpandey.com/projects/pe-debt-covenant-model" },
  openGraph: {
    title: "Private Equity Debt Covenant Model — Pharma Brands Inc.",
    description: "Fully integrated 6-sheet Excel model: IS/BS/CF, debt schedule, and dual covenant testing across a 5-year projection.",
    url: "https://www.prabinpandey.com/projects/pe-debt-covenant-model",
  },
};

const sections = [
  {
    id: "problem",
    label: "Problem",
    body: "Pharma Brands Inc. is evaluating a $1B special dividend payment funded by a leveraged recapitalization. The transaction requires a comprehensive financial model to project the company's ability to service new debt (term loan + revolver) while maintaining compliance with restrictive debt covenants over a 5-year horizon.",
  },
  {
    id: "approach",
    label: "Approach",
    body: "Built a fully integrated 6-sheet Excel model: Transaction Summary, Projected Income Statement, Balance Sheet, Cash Flow Statement, Debt Schedule (term loan + revolver with automatic cash sweep), and RE/Fixed Assets Schedule. Revenue assumptions drive through all statements with dynamic debt paydown from excess cash flow.",
  },
  {
    id: "validation",
    label: "Validation",
    body: "Dual covenant testing: Total Debt/EBITDA (max 3.0x stepping to 1.5x) and EBIT/Interest Coverage (min 6.0x stepping to 12.0x). Both covenants tested across all 5 projected years. Sensitivity tables tested revenue growth and margin assumptions against covenant thresholds.",
  },
  {
    id: "output",
    label: "Output",
    body: "Model projects full revolver paydown by 2026 ($763M → $0). All debt covenants pass across the entire projection period. Net income grows from $200M to $331M. Cash position rebuilds to $133M by 2026. EBITDA margin improves from 11.0% to 13.0%.",
  },
  {
    id: "limitations",
    label: "Limitations",
    body: "Revenue growth assumptions (5% → 4%) and margin improvement targets represent scenario-based inputs, not audited projections. The model does not account for macro shocks, management execution risk, or refinancing risk at debt maturity. Working capital assumptions use simplified DSO/DIO/DPO ratios.",
  },
  {
    id: "next",
    label: "Next Improvements",
    body: "Monte Carlo simulation on revenue and margin inputs to stress-test covenant compliance across probability distributions. Integration of a dynamic refinancing module to model takeout options at year 3 maturity. Expanding sensitivity analysis to a multi-variable tornado chart.",
  },
];

const metrics = [
  { label: "Model sheets",      value: "6" },
  { label: "Revenue base",      value: "$3.25B" },
  { label: "Covenant years",    value: "5 / 5 ✓" },
  { label: "Debt/EBITDA exit",  value: "0.0x" },
  { label: "EBIT/Interest peak","value": "97.0x" },
];

export default function PEDebtCovenantPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="projects" />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/projects" className="hover:text-gray-300 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-gray-400">PE Debt Covenant Model</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-1 rounded border text-emerald-400 bg-emerald-400/10 border-emerald-400/20 font-medium">Financial Modeling (Excel)</span>
            <span className="text-xs text-gray-600">2024</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight mb-2">
            Private Equity Transaction & Debt Covenant Model
          </h1>
          <p className="text-lg text-indigo-300 font-medium">Pharma Brands Inc. — Special Dividend Recapitalization</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {metrics.map((m) => (
            <div key={m.label} className="bg-gray-900 border border-white/[0.06] rounded-xl p-3 text-center">
              <p className="text-lg font-black text-white">{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-base font-bold text-indigo-400 mb-2 uppercase tracking-wide text-xs">{s.label}</h2>
              <p className="text-[15px] text-gray-300 leading-[1.85]">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10">
          {["Excel", "Financial Modeling", "LBO", "Debt Covenants", "3-Statement Model", "Sensitivity Analysis", "Recapitalization"].map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded bg-gray-900 border border-white/[0.06] text-gray-500">{t}</span>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex justify-between">
          <Link href="/projects" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← All Projects</Link>
          <Link href="/projects/campus-operations-analytics" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Next Project →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
