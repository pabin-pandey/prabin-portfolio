import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Prabin Pandey — Finance & AI Analytics",
  description:
    "Contact Prabin Pandey — MS Financial Analysis candidate at Temple University (Fox School of Business). Open to full-time opportunities in quantitative finance, data analytics, and AI-integrated financial research. Available May 2026.",
  alternates: { canonical: "https://www.prabinpandey.com/contact" },
  openGraph: {
    title: "Contact Prabin Pandey",
    description: "Open to full-time opportunities in quantitative finance, data analytics, and AI-integrated financial research. Available May 2026.",
    url: "https://www.prabinpandey.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SiteNav active="contact" />

      <main className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: "#818cf8" }}>Contact</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
            Open to full-time opportunities in quantitative finance, data analytics, and AI-integrated
            financial research. Let&apos;s connect.
          </p>
        </div>

        {/* ── Response info strip ── */}
        <div
          className="flex flex-wrap mb-10 rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(17,24,39,0.8)" }}
        >
          {[
            { icon: "⚡", label: "Response Time", value: "Within 24 hours" },
            { icon: "🌐", label: "Timezone",       value: "EST (UTC-5)"     },
            { icon: "📅", label: "Availability",   value: "Full-time, May 2026" },
          ].map((r, i) => (
            <div
              key={r.label}
              className="flex items-center gap-3 px-5 py-3 flex-1 min-w-[140px]"
              style={{
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <span className="text-lg">{r.icon}</span>
              <div>
                <p className="text-xs text-gray-600 font-medium">{r.label}</p>
                <p className="text-sm font-bold text-gray-200">{r.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ── Direct contact ── */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white mb-4 tracking-wide">Direct Contact</h2>

            {/* Email */}
            <a
              href="mailto:prabin.pandey@temple.edu"
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
              style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.22)", color: "#818cf8" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 font-medium mb-0.5">Email</p>
                <p className="text-sm font-semibold text-gray-200 group-hover:text-indigo-300 transition-colors truncate">prabin.pandey@temple.edu</p>
              </div>
              <span className="text-gray-600 text-sm group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200">→</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/prabin-pandey-1482362b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
              style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.22)", color: "#60a5fa" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 font-medium mb-0.5">LinkedIn</p>
                <p className="text-sm font-semibold text-gray-200 group-hover:text-blue-300 transition-colors truncate">prabin-pandey-1482362b7</p>
              </div>
              <span className="text-gray-600 text-sm group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200">→</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/pabin-pandey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
              style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.22)", color: "#a78bfa" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 font-medium mb-0.5">GitHub</p>
                <p className="text-sm font-semibold text-gray-200 group-hover:text-violet-300 transition-colors truncate">pabin-pandey</p>
              </div>
              <span className="text-gray-600 text-sm group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200">→</span>
            </a>

            {/* Location */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.22)", color: "#34d399" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <div>
                <p className="text-xs text-gray-600 font-medium mb-0.5">Location</p>
                <p className="text-sm font-semibold text-gray-200">Philadelphia, PA</p>
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="relative rounded-xl p-4 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(17,24,39,0.9) 60%, rgba(99,102,241,0.05) 100%)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-[0.18em] uppercase text-emerald-400">
                  Actively Available
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Seeking Summer 2026 full-time roles in quantitative finance, financial analytics, or
                AI-integrated research. Open to relocate.
              </p>
            </div>
          </div>

          {/* ── Contact form ── */}
          <div>
            <h2 className="text-sm font-bold text-white mb-4 tracking-wide">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
