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

const stats = [
  { val: "3.98", label: "GPA",         sub: "Top of MS Program",  color: "#a78bfa" },
  { val: "3+",   label: "Companies",   sub: "Real-world impact",   color: "#34d399" },
  { val: "20+",  label: "Projects",    sub: "Built & deployed",    color: "#60a5fa" },
  { val: "CFA",  label: "L1 Candidate", sub: "Charter in progress", color: "#facc15" },
];

const skillGroups = [
  {
    label: "Finance & Research",
    color: "#a78bfa",
    icon:  "💹",
    items: [
      { name: "Excel / Financial Modeling", lv: 95 },
      { name: "Bloomberg Terminal",          lv: 80 },
      { name: "FactSet",                     lv: 75 },
      { name: "Capital IQ",                  lv: 75 },
    ],
  },
  {
    label: "Data & Code",
    color: "#60a5fa",
    icon:  "💻",
    items: [
      { name: "Python",  lv: 85 },
      { name: "MySQL",   lv: 75 },
      { name: "R",       lv: 70 },
    ],
  },
  {
    label: "Visualization & BI",
    color: "#34d399",
    icon:  "📊",
    items: [
      { name: "Power BI", lv: 90 },
      { name: "Tableau",  lv: 85 },
    ],
  },
];

const education = [
  {
    school:  "Temple University, Fox School of Business",
    degree:  "MS Financial Analysis",
    period:  "Expected May 2026",
    gpa:     "3.98",
    badge:   "CFA Level I Candidate",
    badgeColor: "#facc15",
    courses: "Corporate Value Management · Asset Pricing · ML in Finance · Financial Time Series · Derivative Valuation · AI in Portfolio Management",
    accent:  "#a78bfa",
    top:     true,
  },
  {
    school:  "Tribhuvan University",
    degree:  "BBA — Finance",
    period:  "Dec 2023",
    gpa:     "3.81",
    badge:   "Valedictorian",
    badgeColor: "#34d399",
    courses: "Business Administration — Finance focus",
    accent:  "#60a5fa",
    top:     false,
  },
];

const experience = [
  {
    co:     "Sethi Clarity Advisers",
    role:   "Associate Financial Consultant",
    period: "Sep 2025 – Dec 2025",
    color:  "#a78bfa",
    pts: [
      "Engineered AI-driven financial planning models simulating retirement income trajectories and multi-scenario contribution strategies.",
      "Developed AI-based analytical tools to evaluate investment allocations and optimize portfolio construction.",
      "Designed and built an internal financial planning website integrating AI-driven models.",
    ],
  },
  {
    co:     "Temple University, Ambler Campus",
    role:   "IT Consultant",
    period: "Jan 2025 – Present",
    color:  "#60a5fa",
    pts: [
      "Developed a Power BI dashboard analyzing visitor traffic patterns and resource utilization across campus facilities, supporting operational decision-making and financial reporting.",
    ],
  },
  {
    co:     "Global IME Bank",
    role:   "Customer Relations Intern",
    period: "Mar – May 2023",
    color:  "#34d399",
    pts: [
      "Prepared financial reports and cost summaries to inform management decisions on lending terms, product pricing, and operational planning.",
      "Counseled clients on banking products, insurance, and wealth management strategies.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="about" />

      <main id="main-content" className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero Header ── */}
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: "#818cf8" }}>About</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            Prabin Pandey
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-8">
            Finance professional specializing in corporate valuation, derivative pricing, and machine learning.
            I bridge traditional finance with technology — from complex Excel models for PE transactions to
            Python-based valuation tools and AI-integrated decision-support dashboards.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white px-5 py-2.5 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.4)" }}
            >
              View Projects →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-300 px-5 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Get in Touch
            </Link>
            <a
              href="/resume/Prabin_Pandey_Resume_2026.pdf"
              download="Prabin_Pandey_Resume_2026.pdf"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-300 px-5 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              ↓ Resume (PDF)
            </a>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-1"
              style={{
                background: "rgba(17,24,39,0.9)",
                border: `1px solid ${s.color}25`,
                boxShadow: `inset 0 1px 0 ${s.color}15`,
              }}
            >
              <p
                className="text-2xl sm:text-3xl font-black mb-1"
                style={{
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}90)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.val}
              </p>
              <p className="text-sm font-bold text-white">{s.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Education ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-lg">🎓</span>
            <h2 className="text-xl font-black text-white">Education</h2>
          </div>
          <div className="space-y-4">
            {education.map((e) => (
              <div
                key={e.school}
                className="relative rounded-2xl p-6 overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(17,24,39,0.9)",
                  border: `1px solid ${e.accent}20`,
                  boxShadow: e.top ? `0 0 40px ${e.accent}08` : "none",
                }}
              >
                {/* Left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                  style={{ background: `linear-gradient(180deg, ${e.accent}, ${e.accent}40)` }}
                />
                <div className="pl-2">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{e.school}</h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: e.accent }}>{e.degree}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-medium text-gray-500">{e.period}</span>
                      <p className="text-sm font-black text-white mt-0.5">GPA {e.gpa}</p>
                    </div>
                  </div>
                  <span
                    className="inline-block text-xs px-2.5 py-1 rounded-full font-semibold mb-3"
                    style={{
                      background: `${e.badgeColor}15`,
                      border: `1px solid ${e.badgeColor}30`,
                      color: e.badgeColor,
                    }}
                  >
                    ★ {e.badge}
                  </span>
                  <p className="text-xs text-gray-500 leading-relaxed">{e.courses}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience — Timeline ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-8 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-lg">💼</span>
            <h2 className="text-xl font-black text-white">Experience</h2>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-[6px] top-2 bottom-2 w-[2px]"
              style={{
                background: "linear-gradient(180deg, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0.15) 60%, transparent 100%)",
              }}
            />

            <div className="space-y-6 pl-8">
              {experience.map((ex, i) => (
                <div key={ex.co} className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[-28px] top-[22px] w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
                    style={{
                      background: ex.color,
                      borderColor: "#030712",
                      boxShadow: `0 0 10px ${ex.color}60`,
                    }}
                  />

                  <div
                    className="relative rounded-2xl p-6 overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(17,24,39,0.9)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{
                        background: `linear-gradient(90deg, ${ex.color}60, ${ex.color}20, transparent)`,
                      }}
                    />
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-base font-bold text-white">{ex.co}</h3>
                        <p className="text-sm font-medium" style={{ color: ex.color }}>{ex.role}</p>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0"
                        style={{
                          background: `${ex.color}12`,
                          border: `1px solid ${ex.color}25`,
                          color: ex.color,
                        }}
                      >
                        {ex.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {ex.pts.map((pt, j) => (
                        <li key={j} className="flex gap-2.5 text-sm text-gray-400 leading-relaxed">
                          <span
                            className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: ex.color, opacity: 0.7 }}
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills & Tools ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-lg">🛠️</span>
            <h2 className="text-xl font-black text-white">Skills & Tools</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "rgba(17,24,39,0.9)",
                  border: `1px solid ${group.color}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-base">{group.icon}</span>
                  <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: group.color }}>
                    {group.label}
                  </span>
                </div>
                <div className="space-y-3.5">
                  {group.items.map((s) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-gray-200">{s.name}</span>
                        <span className="text-xs font-bold" style={{ color: group.color }}>{s.lv}%</span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s.lv}%`,
                            background: `linear-gradient(90deg, ${group.color}80, ${group.color})`,
                            animation: "skill-fill-about 1.4s cubic-bezier(0.4,0,0.2,1) forwards",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Availability CTA ── */}
        <section
          className="relative rounded-2xl p-7 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(17,24,39,0.9) 50%, rgba(139,92,246,0.08) 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
          }}
        >
          {/* Glow orb */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
              transform: "translate(20%, -20%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-emerald-400">
                Available for opportunities
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-5 max-w-xl">
              Bringing expertise in quantitative modeling, data analytics, and AI-integrated finance to roles at the
              intersection of financial analysis and technology. Available May 2026.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white px-5 py-2.5 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
              }}
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
