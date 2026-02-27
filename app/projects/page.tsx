import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects — Quantitative Finance & AI Analytics | Prabin Pandey",
  description:
    "Portfolio of quantitative finance projects by Prabin Pandey: PE debt covenant models, Power BI FP&A dashboards, Tableau macro intelligence, and GenAI-augmented financial analytics systems.",
  alternates: { canonical: "https://www.prabinpandey.com/projects" },
  openGraph: {
    title: "Projects — Prabin Pandey",
    description:
      "Quantitative financial systems, BI dashboards, and AI-integrated analytics tools built by Prabin Pandey.",
    url: "https://www.prabinpandey.com/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="projects" />

      <main className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="relative mb-12 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {/* Subtle background orb */}
          <div
            className="absolute top-0 right-0 w-72 h-40 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
              transform: "translateX(10%)",
            }}
          />

          <p
            className="text-xs font-bold tracking-[0.22em] uppercase mb-3"
            style={{ color: "#818cf8" }}
          >
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Projects</h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mb-6">
            Quantitative financial systems, BI dashboards, and AI-integrated analytics tools — built for
            real-world impact.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4">
            {[
              { val: "4",   label: "Featured Projects", color: "#818cf8" },
              { val: "12+", label: "Excel & R Models",  color: "#34d399" },
              { val: "9",   label: "LLMs Benchmarked",  color: "#a78bfa" },
              { val: "34y", label: "of World Bank Data", color: "#60a5fa" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg"
                style={{
                  background: `${s.color}0e`,
                  border: `1px solid ${s.color}20`,
                }}
              >
                <span className="text-base font-black" style={{ color: s.color }}>{s.val}</span>
                <span className="text-xs text-gray-500 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive search + filter + cards */}
        <ProjectsClient />
      </main>

      <SiteFooter />
    </div>
  );
}
