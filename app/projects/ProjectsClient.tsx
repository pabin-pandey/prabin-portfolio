"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string;
  title: string;
  sub: string;
  cat: string;
  yr: string;
  summary: string;
  href: string;
  embedUrl?: string | null;
}

type EmbedModal = {
  title: string;
  embedUrl: string;
  detailHref: string;
} | null;

// ─── Filter chips — exact order requested ─────────────────────────────────────
const FILTER_CHIPS = [
  "Financial Modeling",
  "Power BI",
  "Tableau",
  "Python",
  "Financial Analytics (R)",
  "GenAI Finance",
  "All",
] as const;

// ─── Category badge colours ───────────────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  "Financial Modeling":      "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  "Power BI":                "text-yellow-400 bg-yellow-400/10 border-yellow-400/25",
  "Tableau":                 "text-blue-400 bg-blue-400/10 border-blue-400/25",
  "GenAI Finance":           "text-violet-400 bg-violet-400/10 border-violet-400/25",
  "Python":                  "text-cyan-400 bg-cyan-400/10 border-cyan-400/25",
  "Financial Analytics (R)": "text-orange-400 bg-orange-400/10 border-orange-400/25",
};

// ─── All projects ─────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [

  // ══ FINANCIAL MODELING — Excel (OneDrive live embeds) ══════════════════════
  {
    id:       "amazon-valuation-model",
    title:    "Amazon.com — DCF Valuation & Segment Revenue Analysis",
    sub:      "AWS · Advertising · Retail · WACC · Intrinsic Value Per Share",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Built a full discounted cash flow model for Amazon.com, projecting free cash flows across its three business segments (AWS, Advertising, Retail), calibrating WACC from first principles, and computing an implied intrinsic value per share.",
    href:     "/excel-projects/amazon-valuation-model",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRFGMQwX84nSKp_hYrSx0_PAQkx65u_FGrqyi5SSbltLJw?em=2&wdHideGridlines=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "lbo-sources-uses",
    title:    "LBO Transaction Structuring — Sources & Uses Analysis",
    sub:      "Leveraged Finance · Capital Structure · Deal Structuring",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Models the full debt/equity capitalization for a leveraged buyout, breaking down every financing source (senior secured, mezzanine, sponsor equity) and every use of capital (purchase price, deal fees, refinancing).",
    href:     "/excel-projects/lbo-sources-uses",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQT8b7d-fNJQQZyqWyICY_9XAVfDN3NMloIlsDkhye0Zi4s?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "ipo-valuation-analysis",
    title:    "IPO Valuation & Equity Offering Analysis",
    sub:      "Comparable Comps · DCF · Dilution Analysis · Cap Table",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Applies comparable company trading multiples and discounted cash flow analysis to establish an IPO offer price range, with dilution analysis, use-of-proceeds schedule, and post-money capitalization table.",
    href:     "/excel-projects/ipo-valuation-analysis",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQOuU8f0G_vTJENLSJXhDxlAZZao7Zmdh2DoYcx1_M2_aM?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "pe-exit-analysis",
    title:    "Private Equity Exit Strategy & Return Analysis",
    sub:      "Strategic / SBO / IPO Scenarios · IRR & MOIC · Return Heatmap",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Models three exit scenarios — strategic sale, secondary buyout, and IPO — computing sponsor IRR, MOIC, and cash-on-cash returns at multiple exit years and exit multiples to optimize the hold-period decision.",
    href:     "/excel-projects/pe-exit-analysis",
    embedUrl: "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQot9O8yHhGQ6mKy6mXwraOAYlmDDKdJYRg9VssTe9HnLo?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "equity-portfolio-z-scores",
    title:    "Quantitative Equity Screening — Z-Score & Factor Analysis",
    sub:      "Altman Z-Score · Multi-Factor · Systematic Buy/Sell Signals",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Applies Altman Z-Score and multi-factor standardization to rank S&P constituents by financial health and momentum, generating systematic buy/sell signals for quantitative portfolio construction.",
    href:     "/excel-projects/equity-portfolio-z-scores",
    embedUrl: "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQXz6OYwQ_ES66sEkDWvcKSAUkwWrrOr7A6tGnEBl4eHn0?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "volatility-smile-analysis",
    title:    "Implied Volatility Surface & Volatility Smile Analysis",
    sub:      "IV Smile · Term Structure · 3D Volatility Surface · 2021 Data",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Constructs the implied volatility smile and term structure surface from 2021 equity options market data, visualizing how IV varies across strikes and maturities — a core tool for options traders and derivatives desks.",
    href:     "/excel-projects/volatility-smile-analysis",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRkRQteZi7cTaVZtg8RUn2_ARLoybyDhIN-S1pIiQ6KsxI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "bmc-financial-analysis",
    title:    "BMC Software — Financial Statement Analysis & Valuation",
    sub:      "3-Statement Analysis · Ratio Analysis · Trading Comps Valuation",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Analyzes BMC Software's historical three-statement financials, computes key profitability, leverage, and efficiency ratios across multiple years, and applies comparable company multiples to derive an intrinsic valuation range.",
    href:     "/excel-projects/bmc-financial-analysis",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQeHhGo1HBjQrzkfpqevpTPAXGVf4P3HyvYP6OCt3qfUB8?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "intangible-asset-valuation",
    title:    "Intangible Asset Valuation — Purchase Price Allocation (ASC 805)",
    sub:      "MPEEM · Relief-from-Royalty · M&A Accounting · Goodwill",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Values acquired intangible assets — customer relationships, developed technology, and trade names — using excess earnings and relief-from-royalty methods under the ASC 805 purchase price allocation framework.",
    href:     "/excel-projects/intangible-asset-valuation",
    embedUrl: "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQf1bBjP-0CQ4RCqwkJPmW2AR9pfrJBxmQZVV_FLzs1WCI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
  {
    id:       "pe-debt-covenant-model",
    title:    "Private Equity Transaction & Debt Covenant Model",
    sub:      "Pharma Brands Inc. — Special Dividend Recapitalization",
    cat:      "Financial Modeling",
    yr:       "2024",
    summary:  "Fully integrated 6-sheet Excel model: 3-statement financials, debt schedule with term loan + revolver, and dual covenant compliance testing over a 5-year horizon.",
    href:     "/projects/pe-debt-covenant-model",
    embedUrl: null,
  },

  // ══ POWER BI ══════════════════════════════════════════════════════════════
  {
    id:       "campus-operations-analytics",
    title:    "Campus Operations Analytics Dashboard",
    sub:      "Temple University — FP&A BI Implementation",
    cat:      "Power BI",
    yr:       "2025",
    summary:  "Enterprise Power BI dashboard analyzing visitor traffic, seasonal trends, and resource utilization to support data-driven budget allocation — applying FP&A principles used at Fortune 500 companies.",
    href:     "/projects/campus-operations-analytics",
    embedUrl: null,
  },

  // ══ TABLEAU ═══════════════════════════════════════════════════════════════
  {
    id:       "global-macro-dashboard",
    title:    "Global Macroeconomic Intelligence Dashboard",
    sub:      "4 Economies · 5 Indicators · 34 Years of World Bank Data",
    cat:      "Tableau",
    yr:       "2025",
    summary:  "Executive-grade Tableau dashboard benchmarking China, India, Russia, and the USA across five macroeconomic indicators with dynamic parameter controls, LOD-calculated volatility metrics, and interactive cross-filter actions.",
    href:     "/projects/global-macro-dashboard",
    embedUrl: null,
  },

  // ══ PYTHON ════════════════════════════════════════════════════════════════
  {
    id:       "black-scholes-options-pricing",
    title:    "Black-Scholes Options Pricing Engine",
    sub:      "European Call & Put Pricing · Dividend Extension",
    cat:      "Python",
    yr:       "2024",
    summary:  "Built a complete European options pricing calculator from the Black-Scholes closed-form solution, pricing both calls and puts across 101 stock-price scenarios and incorporating continuous dividend yields.",
    href:     "/projects/black-scholes-options-pricing",
    embedUrl: null,
  },
  {
    id:       "black-scholes-greeks-implied-vol",
    title:    "Black-Scholes Greeks, Term Structure & Implied Volatility",
    sub:      "All 5 Greeks · Nelson-Siegel Yield Curve · AAPL IV Calibration",
    cat:      "Python",
    yr:       "2024",
    summary:  "Extended Black-Scholes to compute all five option Greeks, modeled the yield curve with a Nelson-Siegel term structure, and calibrated AAPL implied volatility via the bisection method.",
    href:     "/projects/black-scholes-greeks-implied-vol",
    embedUrl: null,
  },
  {
    id:       "monte-carlo-gbm-simulation",
    title:    "Monte Carlo Stock Price Simulation — Geometric Brownian Motion",
    sub:      "1,000 Trials · Ford (F) · 250 Trading Days",
    cat:      "Python",
    yr:       "2024",
    summary:  "Progressively built a GBM stock price simulator across five model iterations, running 1,000 Monte Carlo trials of Ford (F) over 250 trading days and analyzing the resulting return distribution.",
    href:     "/projects/monte-carlo-gbm-simulation",
    embedUrl: null,
  },
  {
    id:       "crr-binomial-tree-pricing",
    title:    "Cox-Ross-Rubinstein Binomial Tree Option Pricing",
    sub:      "Monte Carlo CRR · Ford & Tesla Validation · Black-Scholes Convergence",
    cat:      "Python",
    yr:       "2024",
    summary:  "Priced European options using a CRR binomial tree Monte Carlo simulation and demonstrated convergence to Black-Scholes as steps and trials increase — validated on both Ford (F) and Tesla (TSLA) options.",
    href:     "/projects/crr-binomial-tree-pricing",
    embedUrl: null,
  },
  {
    id:       "sp100-equity-analytics",
    title:    "S&P 100 Equity Return Analytics & Correlation Study",
    sub:      "99 Stocks · 5 Years · Log Returns · Correlation Matrix",
    cat:      "Python",
    yr:       "2024",
    summary:  "Processed 5 years of daily price data for 99 S&P 100 component stocks to compute log returns, rank performance, measure volatility, and construct a 99×99 cross-sectional correlation matrix with heatmap.",
    href:     "/projects/sp100-equity-analytics",
    embedUrl: null,
  },
  {
    id:       "black-scholes-dividend-extension",
    title:    "Black-Scholes Pricing: Payoff Curves & Dividend Sensitivity",
    sub:      "101-Scenario Analysis · Dividend Yield Impact",
    cat:      "Python",
    yr:       "2024",
    summary:  "Implemented a full Black-Scholes pricing function with call/put support, generated option price vs. payoff overlay charts across 101 scenarios, and quantified how continuous dividend yields suppress call-option value.",
    href:     "/projects/black-scholes-dividend-extension",
    embedUrl: null,
  },

  // ══ FINANCIAL ANALYTICS (R) ═══════════════════════════════════════════════
  {
    id:       "time-series-ar-forecasting",
    title:    "AR(1) Time Series Modeling & Commodity Price Forecasting",
    sub:      "Box-Jenkins Methodology · 8-Month Forecast · ADF Test",
    cat:      "Financial Analytics (R)",
    yr:       "2024",
    summary:  "Identifies, estimates, and validates an AR(1) model on 98 months of commodity price data, producing an 8-month forward forecast with 80% and 95% confidence intervals — a core workflow in quantitative trading and macro research.",
    href:     "/r-projects/time-series-ar-forecasting",
    embedUrl: null,
  },
  {
    id:       "capm-beta-regression",
    title:    "CAPM Beta Estimation & Systematic Risk Analysis",
    sub:      "OLS in R · Jensen's Alpha · Market Risk Decomposition",
    cat:      "Financial Analytics (R)",
    yr:       "2024",
    summary:  "Estimates the market beta of an equity using the CAPM market regression, quantifying systematic risk exposure relative to the S&P 500 and interpreting Jensen's alpha as an abnormal return measure.",
    href:     "/r-projects/capm-beta-regression",
    embedUrl: null,
  },
  {
    id:       "hypothesis-testing-financial",
    title:    "Statistical Inference & Hypothesis Testing for Financial Data",
    sub:      "t-Tests · Chi-Squared · OLS Regression · R",
    cat:      "Financial Analytics (R)",
    yr:       "2024",
    summary:  "Applies parametric statistical tests — t-tests, chi-squared variance tests, confidence intervals, and OLS regression — to equity earnings and price data, demonstrating the inferential toolkit used in quantitative research.",
    href:     "/r-projects/hypothesis-testing-financial",
    embedUrl: null,
  },

  // ══ GENAI FINANCE ═════════════════════════════════════════════════════════
  {
    id:       "genai-finance-system",
    title:    "GenAI in Finance — AI-Augmented Financial Analytics",
    sub:      "Portfolio Intelligence & SEC Document Intelligence System",
    cat:      "GenAI Finance",
    yr:       "2025",
    summary:  "Integrated system applying generative AI across quantitative modeling, market risk analytics, SEC document intelligence, and Streamlit dashboards — with a documented AI governance framework throughout.",
    href:     "/projects/genai-finance-system",
    embedUrl: null,
  },
];

// ─── Excel Model Preview Modal ────────────────────────────────────────────────
function ExcelModal({ modal, onClose }: { modal: EmbedModal; onClose: () => void }) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!modal) return;
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modal, handleKey]);

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Excel model preview: ${modal.title}`}
    >
      <div
        className="w-full flex flex-col rounded-2xl overflow-hidden border border-white/[0.09] shadow-2xl"
        style={{ maxWidth: "1100px", maxHeight: "92vh", background: "#0a0f1e" }}
      >
        {/* ── Modal header ── */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-3.5 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Spreadsheet icon */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                <line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-emerald-400/70 mb-0.5">Excel Model Preview</p>
              <p className="text-sm font-semibold text-gray-100 truncate leading-tight">{modal.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={modal.detailHref}
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              style={{
                color: "#818cf8",
                border: "1px solid rgba(129,140,248,0.3)",
                background: "rgba(129,140,248,0.08)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(129,140,248,0.14)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(129,140,248,0.08)";
              }}
            >
              View Full Case Study →
            </Link>
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Iframe ── */}
        <div className="relative flex-1 min-h-0" style={{ minHeight: "60vh" }}>
          {/* Loading shimmer behind iframe */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.015)" }}
          >
            <div className="flex flex-col items-center gap-3 text-gray-600">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              <span className="text-xs font-medium">Loading model…</span>
            </div>
          </div>
          <iframe
            src={modal.embedUrl}
            className="relative z-10 w-full h-full"
            style={{ minHeight: "60vh" }}
            title={`Excel model: ${modal.title}`}
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* ── Footer bar ── */}
        <div
          className="flex items-center justify-between px-5 py-2.5 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="text-[11px] text-gray-600">
            Hosted on OneDrive · Interactive spreadsheet
          </p>
          <Link
            href={modal.detailHref}
            className="sm:hidden text-[12px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Full Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProjectsClient() {
  const [filter, setFilter] = useState<string>("Financial Modeling");
  const [modal, setModal]   = useState<EmbedModal>(null);

  const visible = useMemo(
    () => filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter),
    [filter]
  );

  const openModal = useCallback((p: Project) => {
    if (p.embedUrl) setModal({ title: p.title, embedUrl: p.embedUrl, detailHref: p.href });
  }, []);

  return (
    <>
      {/* ── Category filter chips ────────────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter projects by category"
      >
        {FILTER_CHIPS.map((chip) => {
          const active = filter === chip;
          return (
            <button
              key={chip}
              onClick={() => setFilter(chip)}
              aria-pressed={active}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              style={
                active
                  ? {
                      background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                      borderColor: "#6366f1",
                      color: "#fff",
                      boxShadow: "0 0 16px rgba(99,102,241,0.35)",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "#9ca3af",
                    }
              }
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* ── Count label ─────────────────────────────────────────────────── */}
      <p className="text-[11px] text-gray-600 mb-5 font-medium tracking-wide">
        {visible.length} project{visible.length !== 1 ? "s" : ""}
        {filter !== "All" && (
          <span className="ml-1.5 text-gray-700">· {filter}</span>
        )}
      </p>

      {/* ── Project list ─────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {visible.map((p) => {
          const hasEmbed = !!p.embedUrl;

          return (
            <article
              key={p.id}
              className="group relative rounded-2xl border transition-all duration-200"
              style={{
                background:   "rgba(17,24,39,0.7)",
                borderColor:  "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.22)";
                (e.currentTarget as HTMLElement).style.background  = "rgba(17,24,39,0.9)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.background  = "rgba(17,24,39,0.7)";
              }}
            >
              {/* Left accent bar for Excel models */}
              {hasEmbed && (
                <div
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                  style={{ background: "linear-gradient(to bottom, #34d399, #10b981)" }}
                />
              )}

              <div className="px-5 py-4" style={{ paddingLeft: hasEmbed ? "20px" : "20px" }}>
                {/* Top row: category + year + Excel badge */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded border font-semibold ${
                      CAT_COLOR[p.cat] ?? "text-gray-400 bg-gray-800 border-gray-700"
                    }`}
                  >
                    {p.cat}
                  </span>
                  {hasEmbed && (
                    <span className="text-[10px] px-2 py-0.5 rounded border font-semibold text-emerald-400/80 bg-emerald-400/[0.07] border-emerald-400/20 flex items-center gap-1">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
                      Live Excel
                    </span>
                  )}
                  <span className="text-[11px] text-gray-600">{p.yr}</span>
                </div>

                {/* Title + sub + summary + actions */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[14px] font-bold text-white leading-snug mb-1 group-hover:text-indigo-100 transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-[11px] text-gray-500 mb-2">{p.sub}</p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{p.summary}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
                    {hasEmbed && (
                      <button
                        onClick={() => openModal(p)}
                        aria-label={`Open Excel model for ${p.title}`}
                        className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 whitespace-nowrap"
                        style={{
                          color:       "#34d399",
                          background:  "rgba(52,211,153,0.08)",
                          border:      "1px solid rgba(52,211,153,0.2)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(52,211,153,0.14)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(52,211,153,0.35)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(52,211,153,0.08)";
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(52,211,153,0.2)";
                        }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <line x1="3" y1="9" x2="21" y2="9"/>
                          <line x1="3" y1="15" x2="21" y2="15"/>
                          <line x1="9" y1="3" x2="9" y2="21"/>
                        </svg>
                        View Model
                      </button>
                    )}
                    <Link
                      href={p.href}
                      aria-label={`View case study for ${p.title}`}
                      className="flex items-center gap-1 text-[12px] font-semibold text-indigo-400 hover:text-indigo-300 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                    >
                      {hasEmbed ? "Case Study" : "View"}&nbsp;→
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Excel model modal ────────────────────────────────────────────── */}
      <ExcelModal modal={modal} onClose={() => setModal(null)} />
    </>
  );
}
