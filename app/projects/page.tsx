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

      <main className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Projects</h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            Quantitative financial systems, BI dashboards, and AI-integrated analytics tools.
          </p>
        </div>

        {/* Interactive search + filter + cards (client component) */}
        <ProjectsClient />
      </main>

      <SiteFooter />
    </div>
  );
}
