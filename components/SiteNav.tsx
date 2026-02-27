"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
];

export default function SiteNav({ active }: { active?: string }) {
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY;
      setScrolled(pos > 8);
      const docH  = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((pos / docH) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route-equivalent navigation
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          height:     "2px",
          width:      `${scrollProgress}%`,
          zIndex:     9998,
          background: "linear-gradient(90deg, var(--accent-from), var(--accent-mid), var(--accent-to))",
          boxShadow:  "0 0 10px rgba(99,102,241,0.55)",
          transition: "width 0.1s linear",
          pointerEvents: "none",
        }}
      />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:   scrolled ? "rgba(3,7,18,0.92)" : "rgba(3,7,18,0.72)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.04)",
          boxShadow:    scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg p-1 -m-1"
            aria-label="Prabin Pandey — home"
          >
            <span
              className="text-[15px] font-black tracking-tight transition-opacity duration-200 group-hover:opacity-90"
              style={{
                background: "linear-gradient(90deg, var(--accent-from), var(--accent-mid), var(--accent-to))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Prabin
            </span>
            <span
              className="hidden sm:block text-[10px] font-semibold tracking-[0.12em] uppercase px-1.5 py-0.5 rounded transition-all duration-200"
              style={{
                background: "rgba(99,102,241,0.1)",
                border:     "1px solid rgba(99,102,241,0.2)",
                color:      "rgba(165,180,252,0.8)",
              }}
            >
              Finance · AI
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === label.toLowerCase();
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                    ${isActive ? "text-white" : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]"}`}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, var(--accent-from), var(--accent-to))",
                        boxShadow:  "0 0 6px rgba(129,140,248,0.5)",
                      }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Desktop CTA */}
            <a
              href="/resume/Prabin_Pandey_Resume_2026.pdf"
              download
              className="ml-3 text-[12px] font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{
                background: "rgba(99,102,241,0.12)",
                border:     "1px solid rgba(99,102,241,0.25)",
                color:      "#a5b4fc",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.2)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.25)";
              }}
            >
              ↓ Resume
            </a>
          </nav>

          {/* ── Mobile hamburger button ── */}
          <button
            className={`md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${menuOpen ? "hamburger-open text-white" : "text-gray-400 hover:text-gray-200"}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>

        {/* ── Mobile drawer ── */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mobile-drawer"
            style={{
              background:   "rgba(3,7,18,0.97)",
              backdropFilter: "blur(20px)",
              borderTop:    "1px solid rgba(255,255,255,0.06)",
              paddingBottom: "16px",
            }}
            role="dialog"
            aria-label="Navigation menu"
          >
            <nav className="max-w-6xl mx-auto px-4 pt-2 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = active === label.toLowerCase();
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                      ${isActive
                        ? "text-white bg-white/[0.05]"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.03]"
                      }`}
                  >
                    {label}
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--accent-from)" }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <a
                  href="/resume/Prabin_Pandey_Resume_2026.pdf"
                  download
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    border:     "1px solid rgba(99,102,241,0.25)",
                    color:      "#a5b4fc",
                  }}
                >
                  ↓ Download Resume (PDF)
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
