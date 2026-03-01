import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Campus Operations Analytics Dashboard — Temple University | Prabin Pandey",
  description:
    "Enterprise Power BI dashboard for Temple University Ambler campus operations. Analyzes visitor traffic, seasonal trends, and resource utilization to support FP&A-style data-driven budget decisions.",
  alternates: { canonical: "https://www.prabinpandey.com/projects/campus-operations-analytics" },
  openGraph: {
    title: "Campus Operations Analytics Dashboard — Temple University",
    description: "Enterprise Power BI FP&A dashboard: visitor traffic, resource utilization, budget allocation. Reduced manual reporting time by 60%.",
    url: "https://www.prabinpandey.com/projects/campus-operations-analytics",
  },
};

const sections = [
  {
    id: "problem",
    label: "Problem",
    body: "Campus leadership relied on manual spreadsheet-based reporting to track visitor traffic and allocate budgets — a process that was slow, error-prone, and lacked the real-time insights needed for effective resource planning. This mirrors the challenge FP&A teams face when transitioning from static Excel reports to dynamic BI solutions.",
  },
  {
    id: "approach",
    label: "Approach",
    body: "Applied FP&A best practices to an operational context: identified key performance indicators (KPIs), designed a star-schema data model in Power Query, built DAX measures for variance analysis, and created interactive dashboards with drill-down capabilities from summary to detail views.",
  },
  {
    id: "validation",
    label: "Validation",
    body: "Dashboard results were cross-checked against the source spreadsheets before go-live. DAX measures for YoY growth rates and rolling averages were validated against manually computed values. Campus operations staff reviewed the final output for accuracy before handoff.",
  },
  {
    id: "output",
    label: "Output",
    body: "Delivered a self-service analytics platform that replaced manual reporting workflows. Campus leadership now has real-time visibility into traffic patterns, can identify underutilized time slots for resource reallocation, and makes budget decisions backed by quantitative evidence. Reduced manual reporting time by 60%.",
  },
  {
    id: "limitations",
    label: "Limitations",
    body: "The dashboard draws from historical operational data; predictive modeling is not included in the current version. Data quality depends on accurate input from campus scheduling systems. Cross-campus benchmarking is not available in this implementation.",
  },
  {
    id: "next",
    label: "Next Improvements",
    body: "Adding a forecasting layer using Power BI's built-in time series analysis for proactive capacity planning. Integrating budget actuals vs. plan tracking to extend the tool into a full FP&A reporting platform. Building a mobile-optimized executive summary page.",
  },
];

const metrics = [
  { label: "Reporting time saved", value: "60%" },
  { label: "Dashboard pages",      value: "3" },
  { label: "Semesters analyzed",   value: "4+" },
  { label: "Primary tool",         value: "Power BI" },
];

export default function CampusAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="projects" />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/projects" className="hover:text-gray-300 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-gray-400">Campus Operations Analytics</span>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-1 rounded border text-yellow-400 bg-yellow-400/10 border-yellow-400/20 font-medium">Power BI</span>
            <span className="text-xs text-gray-600">2025</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight mb-2">
            Campus Operations Analytics Dashboard
          </h1>
          <p className="text-lg text-yellow-300/80 font-medium">Temple University — FP&A BI Implementation</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {metrics.map((m) => (
            <div key={m.label} className="bg-gray-900 border border-white/[0.06] rounded-xl p-3 text-center">
              <p className="text-lg font-black text-white">{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* ── Power BI Dashboard Preview ── */}
        <div className="mb-10 rounded-xl overflow-hidden border border-yellow-500/20">
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-yellow-950/30 border-b border-yellow-500/20">
            <div className="flex items-center gap-2">
              {/* Power BI bar-chart icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-400"
                aria-hidden="true"
              >
                <rect x="2"  y="10" width="4" height="12" rx="1" />
                <rect x="9"  y="5"  width="4" height="17" rx="1" />
                <rect x="16" y="1"  width="4" height="21" rx="1" />
              </svg>
              <span className="text-sm font-semibold text-yellow-300">Dashboard Preview · Power BI</span>
            </div>
            <span className="text-[11px] text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
              Org Access Required
            </span>
          </div>

          {/* Screenshot + gradient overlay */}
          <div className="relative bg-gray-900" style={{ maxHeight: 420, overflow: "hidden" }}>
            <img
              src="/images/powerbi-ambler-dashboard.png"
              alt="Campus Operations Analytics — Power BI dashboard screenshot"
              className="w-full object-cover object-top"
              style={{ maxHeight: 420, display: "block" }}
            />

            {/* Bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: "45%",
                background: "linear-gradient(to top, rgba(3,7,18,0.97) 0%, rgba(3,7,18,0.5) 60%, transparent 100%)",
              }}
            />

            {/* CTA row over fade */}
            <div className="absolute bottom-5 left-0 right-0 flex flex-col items-center gap-2">
              <a
                href="mailto:prabin.pandey@temple.edu?subject=Power%20BI%20Dashboard%20Access%20Request"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-5 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
              >
                Request Dashboard Access ↗
              </a>
              <p className="text-[11px] text-gray-500">
                Live embed requires organisational Power BI licence
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-xs font-bold text-yellow-400 mb-2 uppercase tracking-wide">{s.label}</h2>
              <p className="text-[15px] text-gray-300 leading-[1.85]">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-10">
          {["Power BI", "DAX", "Power Query", "Excel", "SQL", "Business Intelligence", "FP&A Analytics", "Budget Planning"].map((t) => (
            <span key={t} className="text-xs px-2.5 py-1 rounded bg-gray-900 border border-white/[0.06] text-gray-500">{t}</span>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex justify-between">
          <Link href="/projects/pe-debt-covenant-model" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">← Previous</Link>
          <Link href="/projects" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">All Projects</Link>
          <Link href="/projects/global-macro-dashboard" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">Next →</Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
