"use client";

import { useState, useEffect, useRef } from "react";

const TABLEAU_URL =
  "https://public.tableau.com/views/TableauFinalProject_17716017323360/GLOBALMACRODASHBOARD?:embed=yes&:showVizHome=no&:toolbar=yes";

export default function TableauEmbed() {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
    }, 15000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="mb-8">
      {/* ── Header bar ── */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-blue-950/30 border border-blue-500/20 rounded-t-xl"
        style={{ borderBottomWidth: 0 }}
      >
        <div className="flex items-center gap-2">
          {/* Tableau-style cross icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-blue-400"
            aria-hidden="true"
          >
            <rect x="8.5"  y="0"    width="3" height="7" />
            <rect x="8.5"  y="13"   width="3" height="7" />
            <rect x="0"    y="8.5"  width="7" height="3" />
            <rect x="13"   y="8.5"  width="7" height="3" />
            <rect x="14"   y="2"    width="2.5" height="6" />
            <rect x="3.5"  y="12"   width="2.5" height="6" />
            <rect x="2"    y="14"   width="6" height="2.5" />
            <rect x="12"   y="3.5"  width="6" height="2.5" />
            <rect x="3.5"  y="2"    width="2.5" height="6" />
            <rect x="14"   y="12"   width="2.5" height="6" />
            <rect x="12"   y="14"   width="6" height="2.5" />
            <rect x="2"    y="3.5"  width="6" height="2.5" />
          </svg>
          <span className="text-sm font-semibold text-blue-300">Live Dashboard · Tableau Public</span>
          <span className="text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
            Interactive
          </span>
        </div>

        <a
          href={TABLEAU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          Open Full Screen
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* ── Embed body ── */}
      <div
        className="relative rounded-b-xl overflow-hidden border border-blue-500/20 bg-gray-900"
        style={{ minHeight: 380, borderTopWidth: 0 }}
      >
        {/* Loading shimmer */}
        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900 z-10">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-400 rounded-full animate-spin" />
            <p className="text-xs text-gray-500">Loading dashboard…</p>
          </div>
        )}

        {/* Error fallback */}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900 z-10 px-6 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-blue-400"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3"  y1="9"  x2="21" y2="9" />
                <line x1="9"  y1="21" x2="9"  y2="9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-1">
                Embed unavailable in this environment
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Tableau Public restricts iframe embedding in some browsers.
              </p>
              <a
                href={TABLEAU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                Open in Tableau Public ↗
              </a>
            </div>
          </div>
        )}

        {/* iframe — hidden while error, always mounted so onLoad fires */}
        <iframe
          src={TABLEAU_URL}
          title="Global Macro Dashboard — Tableau Public"
          className="w-full border-0"
          style={{
            height: "clamp(340px, 50vw, 520px)",
            display: status === "error" ? "none" : "block",
          }}
          onLoad={() => {
            setStatus("loaded");
            if (timerRef.current) clearTimeout(timerRef.current);
          }}
          allowFullScreen
        />
      </div>

      <p className="text-[11px] text-gray-600 mt-1.5 text-right">
        Interactive · Powered by Tableau Public
      </p>
    </section>
  );
}
