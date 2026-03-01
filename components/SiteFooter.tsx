import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      className="mt-20"
      style={{
        borderTop:  "1px solid rgba(255,255,255,0.06)",
        background: "rgba(3,7,18,0.95)",
      }}
    >
      {/* Gradient divider line */}
      <div
        className="h-[1px] w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.3) 30%, rgba(167,139,250,0.3) 50%, rgba(99,102,241,0.3) 70%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Col 1 — Brand */}
          <div>
            <p
              className="text-[16px] font-black tracking-tight mb-2"
              style={{
                background: "linear-gradient(90deg, var(--accent-from), var(--accent-mid))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Prabin Pandey
            </p>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--text-subtle)" }}>
              Finance × Data × AI
            </p>
            {/* Social icons — all outline/stroke for visual consistency */}
            <div className="flex items-center gap-2.5">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/prabin-pandey-1482362b7/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.18)", color: "#60a5fa" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/pabin-pandey"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.18)", color: "#a78bfa" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:prabin.pandey@temple.edu"
                aria-label="Send email"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.18)", color: "#818cf8" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-faint)" }}>
              Navigate
            </p>
            <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
              {[
                { label: "About",    href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Blog",     href: "/blog" },
                { label: "Contact",  href: "/contact" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="footer-link w-fit flex items-center gap-1.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                >
                  <span
                    className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-3"
                    style={{ background: "var(--accent-from)", opacity: 0.5 }}
                  />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-faint)" }}>
              Contact
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:prabin.pandey@temple.edu"
                className="footer-link flex items-center gap-2 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                prabin.pandey@temple.edu
              </a>
              <a
                href="https://linkedin.com/in/prabin-pandey-1482362b7/"
                target="_blank" rel="noopener noreferrer"
                className="footer-link flex items-center gap-2 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
              <div className="flex items-center gap-2" style={{ color: "var(--text-subtle)", fontSize: "0.8125rem" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Philadelphia, PA
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[12px]" style={{ color: "var(--text-faint)" }}>
            © 2026 Prabin Pandey · Finance × Data × AI
          </p>

          <a href="#top" className="back-to-top focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m18 15-6-6-6 6"/>
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
