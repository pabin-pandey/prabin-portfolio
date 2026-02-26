import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "GenAI in Finance — AI-Augmented Financial Analytics System | Prabin Pandey",
  description:
    "Integrated system applying generative AI across quantitative modeling, market risk analytics, SEC document intelligence, and Streamlit dashboards — with a documented AI governance framework at every step.",
  alternates: { canonical: "https://www.prabinpandey.com/projects/genai-finance-system" },
  openGraph: {
    title: "GenAI in Finance — AI-Augmented Financial Analytics",
    description: "5 Python analytics systems, 3 Streamlit dashboards, SEC document intelligence, WACC modeling, 9 LLMs benchmarked.",
    url: "https://www.prabinpandey.com/projects/genai-finance-system",
  },
};

const sections = [
  {
    id: "problem",
    label: "Problem",
    body: "Financial analysts face a dual challenge: AI tools accelerate analytical throughput but introduce model risk — hallucination, overconfidence, and unverified assumptions — that can corrupt financial outputs if not explicitly managed. The challenge is not whether to use AI, but how to use it without compromising output integrity.",
  },
  {
    id: "approach",
    label: "Approach",
    body: "Built five Python analytics systems and three Streamlit dashboard versions, with generative AI integrated at the code scaffolding, modeling, and research synthesis stages. Every AI output was subject to a documented human validation checkpoint — dual-worksheet verification, source citation testing, and distractor prompting to probe model reliability.",
  },
  {
    id: "validation",
    label: "Validation",
    body: "WACC model outputs were cross-checked against Bloomberg-sourced cost of equity and debt benchmarks. SEC parsing outputs were verified against source HTML filings. Beta estimates were compared across yfinance, CAPM regression, and Fama-French 3-factor regression. ECE (expected calibration error) was computed for 9 LLMs to quantify overconfidence systematically.",
  },
  {
    id: "output",
    label: "Output",
    body: "Five production Python systems: WACC modeling, CAPM/factor model analytics, SMA signal detection, SEC 10-K extraction pipeline, and a 35-year mutual fund analytics engine. Three client-grade Streamlit dashboards with rolling factor analytics and live yfinance data. A 25-slide AI governance research presentation benchmarking 9 LLMs.",
  },
  {
    id: "limitations",
    label: "Limitations",
    body: "Live market data from yfinance introduces look-back bias if not handled carefully — all backtests use point-in-time data. LLM benchmarking results reflect model versions available at the time of testing; model behavior changes with version updates. The SEC parsing pipeline is optimized for 10-K HTML structure and may require updates for format changes.",
  },
  {
    id: "next",
    label: "Next Improvements",
    body: "Extending the SEC pipeline to handle 10-Q and 8-K filings for continuous monitoring. Building a structured AI output audit log that records model version, prompt, and validation status for every AI-assisted analysis step. Adding a retrieval-augmented generation (RAG) layer to ground LLM outputs in verified financial data sources.",
  },
];

const metrics = [
  { label: "Python systems",     value: "5" },
  { label: "Streamlit versions", value: "3" },
  { label: "Fund history",       value: "35 yrs" },
  { label: "LLMs benchmarked",   value: "9" },
];

export default function GenAIFinanceSystemPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="projects" />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/projects" className="hover:text-gray-300 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-gray-400">GenAI Finance System</span>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-1 rounded border text-violet-400 bg-violet-400/10 border-violet-400/20 font-medium">GenAI Finance</span>
            <span className="text-xs text-gray-600">2025</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight mb-2">
            GenAI in Finance — AI-Augmented Financial Analytics
          </h1>
          <p className="text-lg text-violet-300/80 font-medium">Portfolio Intelligence & SEC Document Intelligence System</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {metrics.map((m) => (
            <div key={m.label} className="bg-gray-900 border border-white/[0.06] rounded-xl p-3 text-center">
              <p className="text-lg font-black text-white">{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* AI governance callout */}
        <div className="mb-8 p-4 bg-violet-950/30 border border-violet-500/20 rounded-xl">
          <p className="text-xs font-bold text-violet-400 uppercase tracking-wide mb-1">AI Governance Framework</p>
          <p className="text-sm text-gray-400 leading-relaxed">Every AI-assisted step includes a documented human validation checkpoint: dual-worksheet verification, source citation testing, distractor prompting, and ECE-based calibration analysis.</p>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-xs font-bold text-violet-400 mb-2 uppercase tracking-wide">{s.label}</h2>
              <p className="text-[15px] text-gray-300 leading-[1.85]">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-10">
          {["Python", "Streamlit", "yfinance", "Pandas", "NumPy", "Plotly", "BeautifulSoup", "WACC", "CAPM", "Factor Models", "SEC Filings", "AI Governance", "LLM Calibration"].map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded bg-gray-900 border border-white/[0.06] text-gray-500">{t}</span>
          ))}
        </div>

        {/* Related blog post */}
        <div className="mt-10 p-5 bg-gray-900 border border-white/[0.06] rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Related reading</p>
          <Link href="/blog/when-the-output-looks-right-but-isnt" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            When the Output Looks Right but Isn't →
          </Link>
          <p className="text-xs text-gray-600 mt-1">On AI governance risk in financial analysis</p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex justify-between">
          <Link href="/projects/global-macro-dashboard" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← Previous</Link>
          <Link href="/projects" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">All Projects</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
