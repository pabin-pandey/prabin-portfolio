"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const FILTER_CHIPS = [
  "All",
  "Financial Modeling",
  "Power BI",
  "Tableau",
  "GenAI Finance",
  "Python",
  "Financial Analytics (R)",
];

const PROJECTS = [
  // ── Excel / Financial Modeling ──────────────────────────────────────────────
  {
    id:      "pe-debt-covenant-model",
    title:   "Private Equity Transaction & Debt Covenant Model",
    sub:     "Pharma Brands Inc. — Special Dividend Recapitalization",
    cat:     "Financial Modeling",
    yr:      "2024",
    summary: "Fully integrated 6-sheet Excel model: 3-statement financials, debt schedule with term loan + revolver, and dual covenant compliance testing over a 5-year horizon.",
    href:    "/projects/pe-debt-covenant-model",
  },
  // ── Power BI ─────────────────────────────────────────────────────────────────
  {
    id:      "campus-operations-analytics",
    title:   "Campus Operations Analytics Dashboard",
    sub:     "Temple University — FP&A BI Implementation",
    cat:     "Power BI",
    yr:      "2025",
    summary: "Enterprise Power BI dashboard analyzing visitor traffic, seasonal trends, and resource utilization to support data-driven budget allocation — applying FP&A principles used at Fortune 500 companies.",
    href:    "/projects/campus-operations-analytics",
  },
  // ── Tableau ──────────────────────────────────────────────────────────────────
  {
    id:      "global-macro-dashboard",
    title:   "Global Macroeconomic Intelligence Dashboard",
    sub:     "4 Economies · 5 Indicators · 34 Years of World Bank Data",
    cat:     "Tableau",
    yr:      "2025",
    summary: "Executive-grade Tableau dashboard benchmarking China, India, Russia, and the USA across five macroeconomic indicators with dynamic parameter controls, LOD-calculated volatility metrics, and interactive cross-filter actions.",
    href:    "/projects/global-macro-dashboard",
  },
  // ── GenAI Finance ────────────────────────────────────────────────────────────
  {
    id:      "genai-finance-system",
    title:   "GenAI in Finance — AI-Augmented Financial Analytics",
    sub:     "Portfolio Intelligence & SEC Document Intelligence System",
    cat:     "GenAI Finance",
    yr:      "2025",
    summary: "Integrated system applying generative AI across quantitative modeling, market risk analytics, SEC document intelligence, and Streamlit dashboards — with a documented AI governance framework throughout.",
    href:    "/projects/genai-finance-system",
  },
  // ── Python ───────────────────────────────────────────────────────────────────
  {
    id:      "black-scholes-options-pricing",
    title:   "Black-Scholes Options Pricing Engine",
    sub:     "European Call & Put Pricing · Dividend Extension",
    cat:     "Python",
    yr:      "2024",
    summary: "Built a complete European options pricing calculator from the Black-Scholes closed-form solution, pricing both calls and puts across 101 stock-price scenarios and incorporating continuous dividend yields.",
    href:    "/projects/black-scholes-options-pricing",
  },
  {
    id:      "black-scholes-greeks-implied-vol",
    title:   "Black-Scholes Greeks, Term Structure & Implied Volatility",
    sub:     "All 5 Greeks · Nelson-Siegel Yield Curve · AAPL IV Calibration",
    cat:     "Python",
    yr:      "2024",
    summary: "Extended Black-Scholes to compute all five option Greeks, modeled the yield curve with a Nelson-Siegel term structure, and calibrated AAPL implied volatility via the bisection method.",
    href:    "/projects/black-scholes-greeks-implied-vol",
  },
  {
    id:      "monte-carlo-gbm-simulation",
    title:   "Monte Carlo Stock Price Simulation — Geometric Brownian Motion",
    sub:     "1,000 Trials · Ford (F) · 250 Trading Days",
    cat:     "Python",
    yr:      "2024",
    summary: "Progressively built a GBM stock price simulator across five model iterations, running 1,000 Monte Carlo trials of Ford (F) over 250 trading days and analyzing the resulting return distribution.",
    href:    "/projects/monte-carlo-gbm-simulation",
  },
  {
    id:      "crr-binomial-tree-pricing",
    title:   "Cox-Ross-Rubinstein Binomial Tree Option Pricing",
    sub:     "Monte Carlo CRR · Ford & Tesla Validation · Black-Scholes Convergence",
    cat:     "Python",
    yr:      "2024",
    summary: "Priced European options using a CRR binomial tree Monte Carlo simulation and demonstrated convergence to Black-Scholes as steps and trials increase — validated on both Ford (F) and Tesla (TSLA) options.",
    href:    "/projects/crr-binomial-tree-pricing",
  },
  {
    id:      "sp100-equity-analytics",
    title:   "S&P 100 Equity Return Analytics & Correlation Study",
    sub:     "99 Stocks · 5 Years · Log Returns · Correlation Matrix",
    cat:     "Python",
    yr:      "2024",
    summary: "Processed 5 years of daily price data for 99 S&P 100 component stocks to compute log returns, rank performance, measure volatility, and construct a 99×99 cross-sectional correlation matrix with heatmap.",
    href:    "/projects/sp100-equity-analytics",
  },
  {
    id:      "black-scholes-dividend-extension",
    title:   "Black-Scholes Pricing: Payoff Curves & Dividend Sensitivity",
    sub:     "101-Scenario Analysis · Dividend Yield Impact",
    cat:     "Python",
    yr:      "2024",
    summary: "Implemented a full Black-Scholes pricing function with call/put support, generated option price vs. payoff overlay charts across 101 scenarios, and quantified how continuous dividend yields suppress call-option value.",
    href:    "/projects/black-scholes-dividend-extension",
  },
  // ── Financial Analytics (R) ──────────────────────────────────────────────────
  {
    id:      "time-series-ar-forecasting",
    title:   "AR(1) Time Series Modeling & Commodity Price Forecasting",
    sub:     "Box-Jenkins Methodology · 8-Month Forecast · ADF Test",
    cat:     "Financial Analytics (R)",
    yr:      "2024",
    summary: "Identifies, estimates, and validates an AR(1) model on 98 months of commodity price data, producing an 8-month forward forecast with 80% and 95% confidence intervals — a core workflow in quantitative trading and macro research.",
    href:    "/r-projects/time-series-ar-forecasting",
  },
  {
    id:      "capm-beta-regression",
    title:   "CAPM Beta Estimation & Systematic Risk Analysis",
    sub:     "OLS in R · Jensen's Alpha · Market Risk Decomposition",
    cat:     "Financial Analytics (R)",
    yr:      "2024",
    summary: "Estimates the market beta of an equity using the CAPM market regression, quantifying systematic risk exposure relative to the S&P 500 and interpreting Jensen's alpha as an abnormal return measure.",
    href:    "/r-projects/capm-beta-regression",
  },
  {
    id:      "hypothesis-testing-financial",
    title:   "Statistical Inference & Hypothesis Testing for Financial Data",
    sub:     "t-Tests · Chi-Squared · OLS Regression · R",
    cat:     "Financial Analytics (R)",
    yr:      "2024",
    summary: "Applies parametric statistical tests — t-tests, chi-squared variance tests, confidence intervals, and OLS regression — to equity earnings and price data, demonstrating the inferential toolkit used in quantitative research.",
    href:    "/r-projects/hypothesis-testing-financial",
  },
];

const CAT_COLOR: Record<string, string> = {
  "Financial Modeling":      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Power BI":                "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Tableau":                 "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "GenAI Finance":           "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "Python":                  "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Financial Analytics (R)": "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

export default function ProjectsClient() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() =>
    PROJECTS.filter((p) => filter === "All" || p.cat === filter),
    [filter]
  );

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setFilter(chip)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border
              ${filter === chip
                ? "bg-indigo-500 border-indigo-500 text-white"
                : "border-white/[0.08] text-gray-400 hover:text-gray-200 hover:border-white/20 bg-gray-900"
              }`}
          >
            {chip}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-600 mb-6">{visible.length} project{visible.length !== 1 ? "s" : ""}</p>

      {/* Project cards */}
      <div className="space-y-4">
        {visible.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className="group block bg-gray-900 border border-white/[0.06] rounded-2xl p-6 hover:border-indigo-500/30 hover:bg-gray-900/80 transition-all"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded border font-medium ${CAT_COLOR[p.cat] ?? "text-gray-400 bg-gray-800 border-gray-700"}`}>
                {p.cat}
              </span>
              <span className="text-xs text-gray-600">{p.yr}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors leading-snug mb-1">
                  {p.title}
                </h2>
                <p className="text-xs text-gray-500 mb-3">{p.sub}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{p.summary}</p>
              </div>
              <span className="shrink-0 mt-1 text-indigo-400 group-hover:text-indigo-300 text-sm font-semibold flex items-center gap-1 transition-all group-hover:gap-2 whitespace-nowrap">
                View →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
