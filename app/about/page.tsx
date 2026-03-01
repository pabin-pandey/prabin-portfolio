import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "About Prabin Pandey — MS Financial Analysis, Temple University",
  description:
    "Prabin Pandey is an MS Financial Analysis candidate (GPA 3.98) at Temple University Fox School of Business. CFA Level I Candidate specializing in quantitative modeling, derivatives pricing, portfolio analytics, and AI-integrated finance.",
  alternates: { canonical: "https://www.prabinpandey.com/about" },
  openGraph: {
    title: "About Prabin Pandey",
    description: "MS Financial Analysis candidate at Temple University (GPA 3.98). CFA Level I Candidate. Quantitative modeling, derivatives pricing, AI-integrated finance.",
    url: "https://www.prabinpandey.com/about",
  },
};

const skills = [
  { name: "Excel",              cat: "Tools",   lv: 95 },
  { name: "Python",             cat: "Code",    lv: 85 },
  { name: "Power BI",           cat: "Viz",     lv: 90 },
  { name: "Tableau",            cat: "Viz",     lv: 85 },
  { name: "MySQL",              cat: "Code",    lv: 75 },
  { name: "R",                  cat: "Code",    lv: 70 },
  { name: "Bloomberg Terminal", cat: "Finance", lv: 80 },
  { name: "FactSet",            cat: "Finance", lv: 75 },
  { name: "Capital IQ",         cat: "Finance", lv: 75 },
];

const education = [
  {
    school:  "Temple University, Fox School of Business",
    degree:  "MS Financial Analysis",
    period:  "Expected May 2026",
    gpa:     "3.98",
    badge:   "CFA Level I Candidate",
    courses: [
      "Corporate Value Management",
      "Asset Pricing",
      "Machine Learning in Finance",
      "Financial Time Series",
      "Data Science in Finance",
      "Derivative Valuation",
      "AI in Portfolio Management",
      "Gen AI in Finance",
      "Financial Econometrics",
      "M&A Modeling",
      "Private Equity and Credit",
      "Investment Management",
    ],
  },
  {
    school:  "Tribhuvan University",
    degree:  "BBA — Finance",
    period:  "Dec 2023",
    gpa:     "3.81",
    badge:   "Valedictorian",
    courses: ["Business Administration — Finance focus"],
  },
];

const experience = [
  {
    co:     "Sethi Clarity Advisers",
    role:   "Associate Financial Consultant",
    period: "Sep 2025 – Dec 2025",
    pts: [
      "Engineered AI-driven financial planning models simulating retirement income trajectories, net worth accumulation, and multi-scenario contribution strategies for client portfolios.",
      "Developed AI-based analytical tools to evaluate investment allocations, optimize portfolio construction, and monitor client performance against benchmarks.",
      "Maintained client investment data in portfolio management software, ensuring accurate performance reporting and audit-ready financial records.",
      "Designed and developed an internal financial planning website, integrating AI-driven models into a user-friendly interface to streamline data input and advisory analysis.",
    ],
  },
  {
    co:     "Temple University, Ambler Campus",
    role:   "IT Consultant",
    period: "Jan 2025 – Present",
    pts: [
      "Developed Power BI dashboard analyzing visitor traffic patterns and resource utilization across campus facilities, supporting operational decision-making and financial reporting.",
    ],
  },
  {
    co:     "Global IME Bank",
    role:   "Customer Relations Intern",
    period: "Mar – May 2023",
    pts: [
      "Organized and maintained client documentation, tax records, and collateral files, supporting audit readiness.",
      "Prepared financial reports and cost summaries to inform management decisions on lending terms, product pricing, and operational planning.",
      "Counseled clients on banking products, insurance, and wealth management strategies.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="about" />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400 mb-3">About</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Prabin Pandey</h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Finance professional specializing in corporate valuation, derivative pricing, and machine learning.
            I bridge traditional finance with technology — from complex Excel models for PE transactions to
            Python-based valuation tools and AI-integrated decision-support dashboards.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-[13px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-5 py-2.5 rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              View Projects →
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-[13px] font-semibold border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              Get in Touch
            </Link>
            <a href="/resume/Prabin_Pandey_Resume_2026.pdf" download="Prabin_Pandey_Resume_2026.pdf" className="inline-flex items-center gap-1.5 text-[13px] font-semibold border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              ↓ Resume (PDF)
            </a>
          </div>
        </div>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/[0.06]">Education</h2>
          <div className="space-y-6">
            {education.map((e) => (
              <div key={e.school} className="bg-gray-900 border border-white/[0.06] rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{e.school}</h3>
                    <p className="text-sm text-indigo-400 font-medium mt-0.5">{e.degree}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-medium text-gray-500">{e.period}</span>
                    <p className="text-sm font-bold text-white mt-0.5">GPA {e.gpa}</p>
                  </div>
                </div>
                <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium mb-3">{e.badge}</span>
                {/* Course chips */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {e.courses.map((course) => (
                    <span
                      key={course}
                      className="inline-block text-[11px] px-2.5 py-1 rounded-lg font-medium"
                      style={{
                        background:   "rgba(255,255,255,0.04)",
                        border:       "1px solid rgba(255,255,255,0.08)",
                        color:        "#9ca3af",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/[0.06]">Experience</h2>
          <div className="space-y-6">
            {experience.map((ex) => (
              <div key={ex.co} className="bg-gray-900 border border-white/[0.06] rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{ex.co}</h3>
                    <p className="text-sm text-indigo-400 font-medium">{ex.role}</p>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{ex.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {ex.pts.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                      <span className="text-indigo-500 mt-1 shrink-0">·</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/[0.06]">Skills & Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.map((s) => (
              <div key={s.name} className="bg-gray-900 border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-200">{s.name}</span>
                  <span className="text-xs text-gray-600 font-medium">{s.lv}%</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width: `${s.lv}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-1.5 block">{s.cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Availability */}
        <section className="bg-gradient-to-br from-indigo-950/60 via-gray-900 to-violet-950/40 border border-indigo-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-emerald-400">Available for opportunities</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Bringing expertise in quantitative modeling, data analytics, and AI-integrated finance to roles at the
            intersection of financial analysis and technology. Available May 2026.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-5 py-2.5 rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all">
            Get in Touch →
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
