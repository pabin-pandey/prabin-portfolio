"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type PlatformType =
  | "excel_model"
  | "python_model"
  | "powerbi_dashboard"
  | "tableau_dashboard"
  | "r_analysis"
  | "genai_system";

interface KeyMetric { label: string; value: string }

interface Project {
  id:             string;
  title:          string;
  sub:            string;
  cat:            string;
  yr:             string;
  summary:        string;
  href:           string;           // case-study detail page
  platformType:   PlatformType;
  modelUrl:       string;           // open-in-new-tab / router.push target
  embedUrl?:      string | null;    // iframe src
  previewImages?: string[] | null;  // screenshots (Power BI)
  techStack:      string[];
  deliverables:   string[];
  keyMetrics?:    KeyMetric[];
  codePreview?:   string;
}

type ModalState = {
  project: Project;
  tab: "overview" | "code" | "outputs";
} | null;

// ─────────────────────────────────────────────────────────────────────────────
// Platform Configuration
// ─────────────────────────────────────────────────────────────────────────────
interface PlatformCfg {
  label:          string;
  btnText:        string;
  accentRgb:      string;
  badgeCls:       string;
  stripeGradient: string;
  footerNote:     string;
  modalType:      "iframe" | "screenshot" | "preview_panel";
  timeoutMs:      number;
}

const PC: Record<PlatformType, PlatformCfg> = {
  excel_model: {
    label:          "Live Excel",
    btnText:        "View Model",
    accentRgb:      "52,211,153",
    badgeCls:       "text-emerald-400 bg-emerald-400/[0.07] border-emerald-400/20",
    stripeGradient: "linear-gradient(to bottom,#34d399,#10b981,rgba(16,185,129,0))",
    footerNote:     "Hosted on OneDrive · Interactive spreadsheet",
    modalType:      "iframe",
    timeoutMs:      15000,
  },
  tableau_dashboard: {
    label:          "Live Dashboard",
    btnText:        "View Dashboard",
    accentRgb:      "96,165,250",
    badgeCls:       "text-blue-400 bg-blue-400/[0.07] border-blue-400/20",
    stripeGradient: "linear-gradient(to bottom,#60a5fa,#3b82f6,rgba(59,130,246,0))",
    footerNote:     "Hosted on Tableau Public · Interactive dashboard",
    modalType:      "iframe",
    timeoutMs:      15000,
  },
  powerbi_dashboard: {
    label:          "Dashboard",
    btnText:        "View Dashboard",
    accentRgb:      "250,204,21",
    badgeCls:       "text-yellow-400 bg-yellow-400/[0.07] border-yellow-400/20",
    stripeGradient: "linear-gradient(to bottom,#fcd34d,#f59e0b,rgba(245,158,11,0))",
    footerNote:     "Built with Microsoft Power BI",
    modalType:      "screenshot",
    timeoutMs:      0,
  },
  python_model: {
    label:          "Notebook",
    btnText:        "View Notebook",
    accentRgb:      "34,211,238",
    badgeCls:       "text-cyan-400 bg-cyan-400/[0.07] border-cyan-400/20",
    stripeGradient: "linear-gradient(to bottom,#22d3ee,#06b6d4,rgba(6,182,212,0))",
    footerNote:     "Python · NumPy · SciPy · Matplotlib",
    modalType:      "preview_panel",
    timeoutMs:      0,
  },
  r_analysis: {
    label:          "R Analysis",
    btnText:        "View Analysis",
    accentRgb:      "251,146,60",
    badgeCls:       "text-orange-400 bg-orange-400/[0.07] border-orange-400/20",
    stripeGradient: "linear-gradient(to bottom,#fb923c,#f97316,rgba(249,115,22,0))",
    footerNote:     "R Statistical Computing · ggplot2 · forecast",
    modalType:      "preview_panel",
    timeoutMs:      0,
  },
  genai_system: {
    label:          "AI System",
    btnText:        "View System",
    accentRgb:      "167,139,250",
    badgeCls:       "text-violet-400 bg-violet-400/[0.07] border-violet-400/20",
    stripeGradient: "linear-gradient(to bottom,#a78bfa,#8b5cf6,rgba(139,92,246,0))",
    footerNote:     "Hosted on Streamlit Community Cloud",
    modalType:      "iframe",
    timeoutMs:      30000,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Filter Chips & Category Colors
// ─────────────────────────────────────────────────────────────────────────────
const FILTER_CHIPS = [
  "Financial Modeling",
  "Power BI",
  "Tableau",
  "Python",
  "Financial Analytics (R)",
  "GenAI Finance",
  "All",
] as const;

const CAT_COLOR: Record<string, string> = {
  "Financial Modeling":      "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  "Power BI":                "text-yellow-400  bg-yellow-400/10  border-yellow-400/25",
  "Tableau":                 "text-blue-400    bg-blue-400/10    border-blue-400/25",
  "GenAI Finance":           "text-violet-400  bg-violet-400/10  border-violet-400/25",
  "Python":                  "text-cyan-400    bg-cyan-400/10    border-cyan-400/25",
  "Financial Analytics (R)": "text-orange-400  bg-orange-400/10  border-orange-400/25",
};

// ─────────────────────────────────────────────────────────────────────────────
// Deliverables Config
// ─────────────────────────────────────────────────────────────────────────────
const DELIVERABLE_DESC: Record<string, string> = {
  Model:     "Excel financial model",
  Code:      "Documented source code",
  Outputs:   "Computed results & tables",
  Charts:    "Data visualizations",
  Dashboard: "Interactive BI dashboard",
  Report:    "Structured analysis report",
  Analysis:  "Statistical analysis output",
  System:    "End-to-end AI pipeline",
};

// ─────────────────────────────────────────────────────────────────────────────
// All 21 Projects
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [

  // ══ FINANCIAL MODELING — Excel (OneDrive live embeds) ══════════════════════
  {
    id:           "amazon-valuation-model",
    title:        "Amazon.com — DCF Valuation & Segment Revenue Analysis",
    sub:          "AWS · Advertising · Retail · WACC · Intrinsic Value Per Share",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Built a full discounted cash flow model for Amazon.com, projecting free cash flows across its three business segments (AWS, Advertising, Retail), calibrating WACC from first principles, and computing an implied intrinsic value per share.",
    href:         "/excel-projects/amazon-valuation-model",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRFGMQwX84nSKp_hYrSx0_PAQkx65u_FGrqyi5SSbltLJw?em=2&wdHideGridlines=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRFGMQwX84nSKp_hYrSx0_PAQkx65u_FGrqyi5SSbltLJw?em=2&wdHideGridlines=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "DCF Analysis", "Equity Valuation", "Financial Modeling"],
    deliverables: ["Model", "Analysis", "Report"],
  },
  {
    id:           "lbo-sources-uses",
    title:        "LBO Transaction Structuring — Sources & Uses Analysis",
    sub:          "Leveraged Finance · Capital Structure · Deal Structuring",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Models the full debt/equity capitalization for a leveraged buyout, breaking down every financing source (senior secured, mezzanine, sponsor equity) and every use of capital (purchase price, deal fees, refinancing).",
    href:         "/excel-projects/lbo-sources-uses",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQT8b7d-fNJQQZyqWyICY_9XAVfDN3NMloIlsDkhye0Zi4s?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQT8b7d-fNJQQZyqWyICY_9XAVfDN3NMloIlsDkhye0Zi4s?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "LBO Analysis", "Leveraged Finance", "Financial Modeling"],
    deliverables: ["Model", "Analysis", "Report"],
  },
  {
    id:           "ipo-valuation-analysis",
    title:        "IPO Valuation & Equity Offering Analysis",
    sub:          "Comparable Comps · DCF · Dilution Analysis · Cap Table",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Applies comparable company trading multiples and discounted cash flow analysis to establish an IPO offer price range, with dilution analysis, use-of-proceeds schedule, and post-money capitalization table.",
    href:         "/excel-projects/ipo-valuation-analysis",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQOuU8f0G_vTJENLSJXhDxlAZZao7Zmdh2DoYcx1_M2_aM?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQOuU8f0G_vTJENLSJXhDxlAZZao7Zmdh2DoYcx1_M2_aM?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "Valuation Modeling", "Capital Markets", "ECM"],
    deliverables: ["Model", "Analysis", "Report"],
  },
  {
    id:           "pe-exit-analysis",
    title:        "Private Equity Exit Strategy & Return Analysis",
    sub:          "Strategic / SBO / IPO Scenarios · IRR & MOIC · Return Heatmap",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Models three exit scenarios — strategic sale, secondary buyout, and IPO — computing sponsor IRR, MOIC, and cash-on-cash returns at multiple exit years and exit multiples to optimize the hold-period decision.",
    href:         "/excel-projects/pe-exit-analysis",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQot9O8yHhGQ6mKy6mXwraOAYlmDDKdJYRg9VssTe9HnLo?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQot9O8yHhGQ6mKy6mXwraOAYlmDDKdJYRg9VssTe9HnLo?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "PE Modeling", "Return Analysis"],
    deliverables: ["Model", "Analysis", "Report"],
  },
  {
    id:           "equity-portfolio-z-scores",
    title:        "Quantitative Equity Screening — Z-Score & Factor Analysis",
    sub:          "Altman Z-Score · Multi-Factor · Systematic Buy/Sell Signals",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Applies Altman Z-Score and multi-factor standardization to rank S&P constituents by financial health and momentum, generating systematic buy/sell signals for quantitative portfolio construction.",
    href:         "/excel-projects/equity-portfolio-z-scores",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQXz6OYwQ_ES66sEkDWvcKSAUkwWrrOr7A6tGnEBl4eHn0?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQXz6OYwQ_ES66sEkDWvcKSAUkwWrrOr7A6tGnEBl4eHn0?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "Quantitative Analysis", "Statistical Modeling"],
    deliverables: ["Model", "Analysis", "Report"],
  },
  {
    id:           "volatility-smile-analysis",
    title:        "Implied Volatility Surface & Volatility Smile Analysis",
    sub:          "IV Smile · Term Structure · 3D Volatility Surface · 2021 Data",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Constructs the implied volatility smile and term structure surface from 2021 equity options market data, visualizing how IV varies across strikes and maturities — a core tool for options traders and derivatives desks.",
    href:         "/excel-projects/volatility-smile-analysis",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRkRQteZi7cTaVZtg8RUn2_ARLoybyDhIN-S1pIiQ6KsxI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRkRQteZi7cTaVZtg8RUn2_ARLoybyDhIN-S1pIiQ6KsxI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "Options Analytics", "Derivatives Pricing"],
    deliverables: ["Model", "Analysis", "Charts"],
  },
  {
    id:           "bmc-financial-analysis",
    title:        "BMC Software — Financial Statement Analysis & Valuation",
    sub:          "3-Statement Analysis · Ratio Analysis · Trading Comps Valuation",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Analyzes BMC Software's historical three-statement financials, computes key profitability, leverage, and efficiency ratios across multiple years, and applies comparable company multiples to derive an intrinsic valuation range.",
    href:         "/excel-projects/bmc-financial-analysis",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQeHhGo1HBjQrzkfpqevpTPAXGVf4P3HyvYP6OCt3qfUB8?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQeHhGo1HBjQrzkfpqevpTPAXGVf4P3HyvYP6OCt3qfUB8?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "Equity Research", "Financial Modeling"],
    deliverables: ["Model", "Analysis", "Report"],
  },
  {
    id:           "intangible-asset-valuation",
    title:        "Intangible Asset Valuation — Purchase Price Allocation (ASC 805)",
    sub:          "MPEEM · Relief-from-Royalty · M&A Accounting · Goodwill",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Applies ASC 805 purchase price allocation methodology to value intangible assets (customer relationships, IP, brand) in an M&A context using MPEEM and Relief-from-Royalty, reconciling to goodwill.",
    href:         "/excel-projects/intangible-asset-valuation",
    platformType: "excel_model",
    modelUrl:     "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQf1bBjP-0CQ4RCqwkJPmW2AR9pfrJBxmQZVV_FLzs1WCI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    embedUrl:     "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQf1bBjP-0CQ4RCqwkJPmW2AR9pfrJBxmQZVV_FLzs1WCI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
    techStack:    ["Excel", "Valuation Modeling", "M&A Analysis"],
    deliverables: ["Model", "Analysis", "Report"],
  },
  {
    id:           "pe-debt-covenant-model",
    title:        "Private Equity Transaction & Debt Covenant Model",
    sub:          "Pharma Brands Inc. — Special Dividend Recapitalization",
    cat:          "Financial Modeling",
    yr:           "2024",
    summary:      "Full LBO transaction model with a special dividend recap scenario for a pharmaceutical brands company. Models debt covenant compliance across leverage, coverage, and cash flow tests through the hold period.",
    href:         "/projects/pe-debt-covenant-model",
    platformType: "excel_model",
    modelUrl:     "/projects/pe-debt-covenant-model",
    embedUrl:     null,
    techStack:    ["Excel", "PE Modeling", "Debt Structuring", "LBO Analysis"],
    deliverables: ["Model", "Analysis", "Report"],
  },

  // ══ POWER BI ════════════════════════════════════════════════════════════════
  {
    id:            "campus-operations-analytics",
    title:         "Campus Operations Analytics Dashboard",
    sub:           "Temple University — FP&A BI Implementation",
    cat:           "Power BI",
    yr:            "2025",
    summary:       "Enterprise Power BI dashboard analyzing visitor traffic, seasonal trends, and resource utilization to support data-driven budget allocation. Delivered a self-service analytics platform that reduced manual reporting time by 60%.",
    href:          "/projects/campus-operations-analytics",
    platformType:  "powerbi_dashboard",
    modelUrl:      "/projects/campus-operations-analytics",
    embedUrl:      null,
    previewImages: ["/images/powerbi-ambler-dashboard.png", "/images/powerbi-dashboard.png"],
    techStack:     ["Power BI", "DAX", "Power Query", "SQL", "Excel"],
    deliverables:  ["Dashboard", "Report"],
    keyMetrics: [
      { label: "Reporting Time Saved", value: "60%" },
      { label: "Dashboard Pages",      value: "3" },
      { label: "Semesters Analyzed",   value: "4+" },
    ],
  },

  // ══ TABLEAU ═════════════════════════════════════════════════════════════════
  {
    id:           "global-macro-dashboard",
    title:        "Global Macroeconomic Intelligence Dashboard",
    sub:          "4 Economies · 5 Indicators · 34 Years of World Bank Data",
    cat:          "Tableau",
    yr:           "2025",
    summary:      "Executive-grade Tableau dashboard benchmarking China, India, Russia, and the USA across five macroeconomic indicators with dynamic parameter controls, LOD-calculated volatility metrics, and interactive cross-filter actions.",
    href:         "/projects/global-macro-dashboard",
    platformType: "tableau_dashboard",
    modelUrl:     "https://public.tableau.com/views/TableauFinalProject_17716017323360/GLOBALMACRODASHBOARD",
    embedUrl:     "https://public.tableau.com/views/TableauFinalProject_17716017323360/GLOBALMACRODASHBOARD?:embed=yes&:showVizHome=no&:toolbar=yes",
    techStack:    ["Tableau", "LOD Expressions", "Table Calculations", "World Bank Data", "Excel"],
    deliverables: ["Dashboard", "Charts", "Report"],
    keyMetrics: [
      { label: "Countries",       value: "4" },
      { label: "Indicators",      value: "5" },
      { label: "Years of Data",   value: "34" },
      { label: "Worksheets",      value: "9" },
    ],
  },

  // ══ PYTHON ══════════════════════════════════════════════════════════════════
  {
    id:           "black-scholes-options-pricing",
    title:        "Black-Scholes Options Pricing Engine",
    sub:          "European Call & Put Pricing · Dividend Extension",
    cat:          "Python",
    yr:           "2024",
    summary:      "Implements the Black-Scholes closed-form model for European call and put options, extended to handle continuous dividend yields. Validates output against a $0.3423 benchmark and prices 101 spot-price scenarios.",
    href:         "/projects/black-scholes-options-pricing",
    platformType: "python_model",
    modelUrl:     "/projects/black-scholes-options-pricing",
    techStack:    ["Python", "NumPy", "SciPy", "Matplotlib"],
    deliverables: ["Code", "Outputs", "Charts"],
    keyMetrics: [
      { label: "Call Price Validated", value: "$0.3423" },
      { label: "Scenarios Priced",     value: "101" },
      { label: "Model Extension",      value: "Dividend Yield" },
    ],
    codePreview: `from scipy.stats import norm
import numpy as np

def black_scholes(S, K, T, r, sigma, q=0.0, flag='call'):
    """Black-Scholes with continuous dividend yield q."""
    d1 = (np.log(S/K) + (r - q + 0.5*sigma**2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    if flag == 'call':
        return S*np.exp(-q*T)*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*np.exp(-q*T)*norm.cdf(-d1)

# Validated: Call = $0.3423 (exact benchmark match)
price = black_scholes(S=42, K=40, T=0.5, r=0.1, sigma=0.2)`,
  },
  {
    id:           "black-scholes-greeks-implied-vol",
    title:        "Black-Scholes Greeks, Term Structure & Implied Volatility",
    sub:          "All 5 Greeks · Nelson-Siegel Yield Curve · AAPL IV Calibration",
    cat:          "Python",
    yr:           "2024",
    summary:      "Computes all five option Greeks (Δ, Γ, Θ, ν, ρ), builds a Nelson-Siegel term structure from 1 quarter to 30 years, and calibrates implied volatility from AAPL June 2020 market data using a bisection solver.",
    href:         "/projects/black-scholes-greeks-implied-vol",
    platformType: "python_model",
    modelUrl:     "/projects/black-scholes-greeks-implied-vol",
    techStack:    ["Python", "NumPy", "SciPy", "Matplotlib"],
    deliverables: ["Code", "Outputs", "Charts"],
    keyMetrics: [
      { label: "Greeks Computed",    value: "5 (Δ, Γ, Θ, ν, ρ)" },
      { label: "IV Calibration",     value: "AAPL Jun 2020" },
      { label: "Bisection Tol.",     value: "< $0.001" },
    ],
    codePreview: `def delta(S, K, T, r, sigma, flag='call'):
    d1 = (np.log(S/K) + (r + 0.5*sigma**2)*T) / (sigma*np.sqrt(T))
    return norm.cdf(d1) if flag == 'call' else norm.cdf(d1) - 1

def implied_vol(mkt_price, S, K, T, r, flag='call', tol=1e-3):
    """Bisection method — convergence < $0.001."""
    lo, hi = 1e-6, 5.0
    while hi - lo > tol:
        mid = (lo + hi) / 2
        if black_scholes(S, K, T, r, mid, flag) < mkt_price:
            lo = mid
        else:
            hi = mid
    return mid   # calibrated IV`,
  },
  {
    id:           "monte-carlo-gbm-simulation",
    title:        "Monte Carlo Stock Price Simulation — Geometric Brownian Motion",
    sub:          "1,000 Trials · Ford (F) · 250 Trading Days",
    cat:          "Python",
    yr:           "2024",
    summary:      "Simulates 1,000 GBM stock price paths over 250 trading days for Ford (F), iteratively refining from a single path to an ensemble. Validates terminal distribution against log-normal theory and benchmarks implied annual return.",
    href:         "/projects/monte-carlo-gbm-simulation",
    platformType: "python_model",
    modelUrl:     "/projects/monte-carlo-gbm-simulation",
    techStack:    ["Python", "NumPy", "Matplotlib"],
    deliverables: ["Code", "Outputs", "Charts"],
    keyMetrics: [
      { label: "MC Paths",        value: "1,000" },
      { label: "Trading Days",    value: "250" },
      { label: "Model Versions",  value: "5 progressive" },
    ],
    codePreview: `import numpy as np

def simulate_gbm(S0, mu, sigma, T=1, N=250, n_trials=1000):
    """Geometric Brownian Motion — 1,000 paths × 250 trading days."""
    dt = T / N
    paths = np.zeros((n_trials, N + 1))
    paths[:, 0] = S0
    for t in range(1, N + 1):
        Z = np.random.standard_normal(n_trials)
        paths[:, t] = paths[:, t-1] * np.exp(
            (mu - 0.5*sigma**2)*dt + sigma*np.sqrt(dt)*Z
        )
    return paths

# Ford (F): 1,000 paths, 250 trading days
paths = simulate_gbm(S0=15.72, mu=0.0064, sigma=0.35)`,
  },
  {
    id:           "crr-binomial-tree-pricing",
    title:        "Cox-Ross-Rubinstein Binomial Tree Option Pricing",
    sub:          "Monte Carlo CRR · Ford & Tesla Validation · Black-Scholes Convergence",
    cat:          "Python",
    yr:           "2024",
    summary:      "Implements the CRR binomial tree model and a Monte Carlo CRR variant, validating convergence to Black-Scholes for Ford (error: $0.0016) and stress-testing against high-volatility Tesla (TSLA). Demonstrates 72% error reduction with finer grids.",
    href:         "/projects/crr-binomial-tree-pricing",
    platformType: "python_model",
    modelUrl:     "/projects/crr-binomial-tree-pricing",
    techStack:    ["Python", "NumPy", "Matplotlib"],
    deliverables: ["Code", "Outputs", "Charts"],
    keyMetrics: [
      { label: "Ford Convergence",  value: "$0.0586 vs BS $0.0570" },
      { label: "Max Simulation",    value: "5,000 × 1,000 steps" },
      { label: "Error Reduction",   value: "72% lower" },
    ],
    codePreview: `def crr_price(S, K, T, r, sigma, N=100, flag='call'):
    """Cox-Ross-Rubinstein binomial tree option pricing."""
    dt = T / N
    u  = np.exp(sigma * np.sqrt(dt))
    d  = 1 / u
    p  = (np.exp(r * dt) - d) / (u - d)  # risk-neutral prob.

    ST = S * (u**np.arange(N,-1,-1)) * (d**np.arange(0,N+1))
    V  = np.maximum(ST - K, 0) if flag=='call' else np.maximum(K - ST, 0)
    for _ in range(N):
        V = np.exp(-r*dt) * (p*V[:-1] + (1-p)*V[1:])
    return V[0]   # Ford: $0.0586  |  BS: $0.0570`,
  },
  {
    id:           "sp100-equity-analytics",
    title:        "S&P 100 Equity Return Analytics & Correlation Study",
    sub:          "99 Stocks · 5 Years · Log Returns · Correlation Matrix",
    cat:          "Python",
    yr:           "2024",
    summary:      "Processes 5 years of adjusted daily prices for 99 S&P 100 constituents, computes log returns, constructs a full 99×99 correlation matrix, and surfaces sector clustering — revealing BAC/JPM as the highest correlated pair.",
    href:         "/projects/sp100-equity-analytics",
    platformType: "python_model",
    modelUrl:     "/projects/sp100-equity-analytics",
    techStack:    ["Python", "Pandas", "NumPy", "Matplotlib"],
    deliverables: ["Code", "Outputs", "Charts"],
    keyMetrics: [
      { label: "Stock Universe",      value: "99 stocks" },
      { label: "Time Period",         value: "2015 – 2020" },
      { label: "Correlation Matrix",  value: "99 × 99" },
    ],
    codePreview: `import pandas as pd, numpy as np

# 5-year adjusted prices — 99 S&P 100 stocks
prices = pd.read_csv('sp100_prices.csv',
                     index_col='Date', parse_dates=True)
# Daily log returns
log_returns = np.log(prices / prices.shift(1)).dropna()

# 99×99 correlation matrix
corr_matrix = log_returns.corr()

# Highest correlated pair: BAC & JPM (banking sector)
top_pairs = corr_matrix.unstack().sort_values(ascending=False)
print(top_pairs[top_pairs < 1.0].head(5))`,
  },
  {
    id:           "black-scholes-dividend-extension",
    title:        "Black-Scholes Pricing: Payoff Curves & Dividend Sensitivity",
    sub:          "101-Scenario Analysis · Dividend Yield Impact",
    cat:          "Python",
    yr:           "2024",
    summary:      "Extends Black-Scholes to model continuous dividend yield sensitivity, generates 101-scenario payoff curves for calls and puts, and overlays payoff diagrams against option price — illustrating the dividend impact on option value.",
    href:         "/projects/black-scholes-dividend-extension",
    platformType: "python_model",
    modelUrl:     "/projects/black-scholes-dividend-extension",
    techStack:    ["Python", "NumPy", "SciPy", "Matplotlib"],
    deliverables: ["Code", "Outputs", "Charts"],
    keyMetrics: [
      { label: "Benchmark Validated",  value: "$0.3423 confirmed" },
      { label: "Payoff Scenarios",     value: "101 points" },
      { label: "Dividend Extension",   value: "q = 2.5%" },
    ],
    codePreview: `def payoff_analysis(K, T, r, sigma, q=0.025):
    """101-scenario payoff vs price with 2.5% dividend yield."""
    S_range     = np.linspace(20, 70, 101)
    call_prices = [black_scholes(S, K, T, r, sigma, q, 'call')
                   for S in S_range]
    put_prices  = [black_scholes(S, K, T, r, sigma, q, 'put')
                   for S in S_range]
    return S_range, call_prices, put_prices

# Benchmark: Call = $0.3423 (zero dividend, confirmed)
# With q=2.5%: dividend-yield impact quantified across 101 scenarios`,
  },

  // ══ FINANCIAL ANALYTICS (R) ══════════════════════════════════════════════════
  {
    id:           "time-series-ar-forecasting",
    title:        "AR(1) Time Series Modeling & Commodity Price Forecasting",
    sub:          "Box-Jenkins Methodology · 8-Month Forecast · ADF Test",
    cat:          "Financial Analytics (R)",
    yr:           "2024",
    summary:      "Applies Box-Jenkins methodology to fit an AR(1) model to commodity price data — conducting ADF stationarity testing, ACF/PACF identification, model estimation (φ₁ = 0.6588), Ljung-Box diagnostics, and an 8-month forecast with confidence bands.",
    href:         "/r-projects/time-series-ar-forecasting",
    platformType: "r_analysis",
    modelUrl:     "/r-projects/time-series-ar-forecasting",
    techStack:    ["R", "forecast", "urca", "readxl", "ggplot2"],
    deliverables: ["Code", "Analysis", "Charts"],
    keyMetrics: [
      { label: "AR(1) Coefficient φ₁",  value: "0.6588" },
      { label: "Ljung-Box p-value",      value: "0.9668" },
      { label: "Forecast Horizon",       value: "8 months" },
    ],
    codePreview: `library(forecast); library(urca)

# ADF unit root test — BIC lag selection
adf  <- ur.df(prices, type="drift", selectlags="BIC")

# Fit AR(1): phi1 = 0.6588, mu = 19.68
ar1  <- arima(prices, order=c(1,0,0))
phi1 <- coef(ar1)["ar1"]      # 0.6588

# Ljung-Box residuals — p = 0.9668 (white noise confirmed)
Box.test(ar1$residuals, lag=10, type="Ljung-Box")

# 8-month forecast with 80% & 95% confidence bands
fc   <- forecast(ar1, h=8, level=c(80, 95))
plot(fc)`,
  },
  {
    id:           "capm-beta-regression",
    title:        "CAPM Beta Estimation & Systematic Risk Analysis",
    sub:          "OLS in R · Jensen's Alpha · Market Risk Decomposition",
    cat:          "Financial Analytics (R)",
    yr:           "2024",
    summary:      "Estimates market beta and Jensen's alpha via OLS regression of excess stock returns on excess market returns. Classifies the asset as defensive (β = 0.6487 < 1), decomposes systematic vs. idiosyncratic risk, and validates with regression diagnostics.",
    href:         "/r-projects/capm-beta-regression",
    platformType: "r_analysis",
    modelUrl:     "/r-projects/capm-beta-regression",
    techStack:    ["R", "base stats", "readxl", "ggplot2"],
    deliverables: ["Code", "Analysis", "Charts"],
    keyMetrics: [
      { label: "Market Beta (β)",     value: "0.6487" },
      { label: "Jensen's Alpha (α)",  value: "0.005506" },
      { label: "R-squared",           value: "19.16%" },
    ],
    codePreview: `# OLS market model: Excess Return ~ Beta x Market
capm  <- lm(ABC_ExcessReturn ~ SP500_ExcessReturn, data=returns)

alpha <- coef(capm)[1]   # Jensen's Alpha  = 0.005506
beta  <- coef(capm)[2]   # Market Beta     = 0.6487
r_sq  <- summary(capm)$r.squared   # R-squared = 19.16%

# Beta < 1: Defensive stock (lower systematic risk)
cat("Risk class:", ifelse(beta < 1, "Defensive", "Aggressive"))

# Regression diagnostics
par(mfrow=c(2,2)); plot(capm)`,
  },
  {
    id:           "hypothesis-testing-financial",
    title:        "Statistical Inference & Hypothesis Testing for Financial Data",
    sub:          "t-Tests · Chi-Squared · OLS Regression · R",
    cat:          "Financial Analytics (R)",
    yr:           "2024",
    summary:      "Conducts five formal hypothesis tests on financial datasets — two-tailed t-tests, confidence interval tests, one-sided t-tests, chi-squared variance tests, and a simple OLS regression — achieving 4 of 5 statistically significant results.",
    href:         "/r-projects/hypothesis-testing-financial",
    platformType: "r_analysis",
    modelUrl:     "/r-projects/hypothesis-testing-financial",
    techStack:    ["R", "base stats", "readxl"],
    deliverables: ["Code", "Analysis", "Report"],
    keyMetrics: [
      { label: "Tests Conducted",     value: "5 formal" },
      { label: "OLS R-squared",       value: "74.43%" },
      { label: "Significant Results", value: "4 of 5" },
    ],
    codePreview: `# Two-tailed t-Test: H0: mu_earnings = $5
t_earn <- t.test(earnings, mu=5, alternative="two.sided")

# Confidence interval test: mean price
ci_price <- t.test(prices, conf.level=0.95)$conf.int
# CI = [55.64, 78.95] -> rejects mu = $50

# Chi-squared: population variance
chi_sq <- (n-1) * var(earnings) / sigma0^2

# OLS regression: quiz_score ~ tv_hours
reg    <- lm(quiz_score ~ tv_hours, data=study)
r_sq   <- summary(reg)$r.squared  # 74.43%`,
  },

  // ══ GENAI FINANCE ════════════════════════════════════════════════════════════
  {
    id:           "genai-finance-system",
    title:        "GenAI in Finance — AI-Augmented Financial Analytics",
    sub:          "Portfolio Intelligence & SEC Document Intelligence System",
    cat:          "GenAI Finance",
    yr:           "2025",
    summary:      "Integrated system applying generative AI across quantitative modeling, market risk analytics, SEC document intelligence, and Streamlit dashboards — with a documented AI governance framework throughout.",
    href:         "/projects/genai-finance-system",
    platformType: "genai_system",
    modelUrl:     "https://prabin-portfolio-analytics.streamlit.app",
    embedUrl:     "https://prabin-portfolio-analytics.streamlit.app?embed=true",
    techStack:    ["Python", "OpenAI", "Streamlit", "LangChain", "Pandas", "NumPy"],
    deliverables: ["Code", "Outputs", "System"],
    keyMetrics: [
      { label: "Analytics Engines",  value: "5 Python" },
      { label: "LLM Models Tested",  value: "9" },
      { label: "SEC Filings Parsed", value: "3 companies" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter (Python + R)
// ─────────────────────────────────────────────────────────────────────────────
function hiCode(raw: string, lang: "python" | "r"): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return raw
    .trim()
    .split("\n")
    .map((line) => {
      let l = esc(line);
      // Comment lines
      const trimmed = line.trimStart();
      if (trimmed.startsWith("#")) {
        return `<span style="color:#6b7280">${l}</span>`;
      }
      // Strings
      l = l.replace(/('[^']*'|"[^"]*")/g, '<span style="color:#34d399">$1</span>');
      // Keywords
      const pyKw =
        /\b(def|return|if|else|elif|for|while|import|from|class|True|False|None|and|or|not|in|is|lambda|with|as|try|except|raise|pass|print)\b/g;
      const rKw =
        /\b(library|require|function|if|else|for|while|return|TRUE|FALSE|NULL|NA|in|plot|print|cat|summary|coef|lm|arima|forecast|par)\b/g;
      l = l.replace(lang === "python" ? pyKw : rKw, '<span style="color:#c084fc">$&</span>');
      // Numbers
      l = l.replace(/\b(\d[\d.eE+\-]*)\b/g, '<span style="color:#fb923c">$1</span>');
      // Function calls
      l = l.replace(
        /\b([a-zA-Z_]\w*)\s*(?=\()/g,
        '<span style="color:#60a5fa">$1</span>'
      );
      return l;
    })
    .join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG Icons
// ─────────────────────────────────────────────────────────────────────────────
function PlatformIcon({ t, sz = 11 }: { t: PlatformType; sz?: number }) {
  const s = { width: sz, height: sz };
  const base = { fill: "none" as const, stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const };
  if (t === "excel_model")
    return (
      <svg {...s} viewBox="0 0 24 24" {...base}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    );
  if (t === "tableau_dashboard" || t === "powerbi_dashboard")
    return (
      <svg {...s} viewBox="0 0 24 24" {...base}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  if (t === "python_model")
    return (
      <svg {...s} viewBox="0 0 24 24" {...base}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  if (t === "r_analysis")
    return (
      <svg {...s} viewBox="0 0 24 24" {...base}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    );
  // genai_system
  return (
    <svg {...s} viewBox="0 0 24 24" {...base}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
      <line x1="20" y1="15" x2="23" y2="15" />
    </svg>
  );
}

function DeliverableIcon({ name, sz = 10 }: { name: string; sz?: number }) {
  const s = { width: sz, height: sz };
  const base = { fill: "none" as const, stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const };
  if (name === "Code")
    return <svg {...s} viewBox="0 0 24 24" {...base}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
  if (name === "Charts")
    return <svg {...s} viewBox="0 0 24 24" {...base}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
  if (name === "Dashboard")
    return <svg {...s} viewBox="0 0 24 24" {...base}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>;
  if (name === "Report" || name === "Model")
    return <svg {...s} viewBox="0 0 24 24" {...base}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
  if (name === "Analysis")
    return <svg {...s} viewBox="0 0 24 24" {...base}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
  if (name === "System")
    return <svg {...s} viewBox="0 0 24 24" {...base}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /></svg>;
  // Outputs
  return <svg {...s} viewBox="0 0 24 24" {...base}><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" /></svg>;
}

// ─────────────────────────────────────────────────────────────────────────────
// EmbedFrame — iframe with loading shimmer + timeout fallback
// ─────────────────────────────────────────────────────────────────────────────
function EmbedFrame({
  url,
  title,
  timeoutMs,
  modelUrl,
  accentRgb,
}: {
  url: string;
  title: string;
  timeoutMs: number;
  modelUrl: string;
  accentRgb: string;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutMs > 0) {
      timerRef.current = setTimeout(() => {
        setStatus((s) => (s === "loading" ? "error" : s));
      }, timeoutMs);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeoutMs]);

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.2)` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={`rgb(${accentRgb})`} strokeWidth="2" strokeLinecap="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-300 mb-1">Embedded view unavailable</p>
          <p className="text-[12px] text-gray-600">The dashboard may require authentication or blocks embedding.</p>
        </div>
        <a
          href={modelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
          style={{
            background:  `rgba(${accentRgb},0.1)`,
            border:      `1px solid rgba(${accentRgb},0.25)`,
            color:       `rgb(${accentRgb})`,
          }}
        >
          Open in New Tab ↗
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {status === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900 z-10">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `rgba(${accentRgb},0.3)`, borderTopColor: `rgb(${accentRgb})` }}
          />
          <p className="text-[12px] text-gray-600">Loading model…</p>
        </div>
      )}
      <iframe
        src={url}
        title={title}
        className="w-full h-full border-0"
        onLoad={() => {
          if (timerRef.current) clearTimeout(timerRef.current);
          setStatus("loaded");
        }}
        allowFullScreen
        allow="fullscreen"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Preview Panel Tabs (Python / R)
// ─────────────────────────────────────────────────────────────────────────────
function PreviewOverview({ p, cfg }: { p: Project; cfg: PlatformCfg }) {
  return (
    <div className="space-y-5 p-5 overflow-y-auto">
      {p.keyMetrics && p.keyMetrics.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {p.keyMetrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-3 text-center border border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-base font-black leading-tight" style={{ color: `rgb(${cfg.accentRgb})` }}>
                {m.value}
              </p>
              <p className="text-[10px] text-gray-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Technology Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {p.techStack.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-1 rounded-lg font-medium text-gray-400"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Deliverables</p>
        <div className="grid grid-cols-3 gap-2">
          {p.deliverables.map((d) => (
            <div
              key={d}
              className="flex flex-col items-center gap-2 py-3 rounded-xl border border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `rgba(${cfg.accentRgb},0.1)` }}
              >
                <DeliverableIcon name={d} sz={16} />
              </div>
              <p className="text-[11px] font-semibold text-gray-300">{d}</p>
              <p className="text-[10px] text-gray-600 text-center px-1">{DELIVERABLE_DESC[d] ?? d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-1">
        <p className="text-[13px] text-gray-400 leading-relaxed">{p.summary}</p>
      </div>
    </div>
  );
}

function PreviewCode({ p, cfg }: { p: Project; cfg: PlatformCfg }) {
  const lang: "python" | "r" = p.platformType === "r_analysis" ? "r" : "python";
  const langLabel = p.platformType === "r_analysis" ? "R Script" : "Python";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="rounded-xl overflow-hidden border border-white/[0.06]">
            {/* Fake title bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(239,68,68,0.6)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(234,179,8,0.6)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(34,197,94,0.6)" }} />
              </div>
              <span className="text-[10px] text-gray-600">{langLabel} · Key Implementation</span>
            </div>
            <pre
              className="p-4 text-[12px] leading-relaxed overflow-x-auto"
              style={{
                background:   "#0d1117",
                fontFamily:   "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
                maxHeight:    "280px",
                overflowY:    "auto",
              }}
            >
              <code
                dangerouslySetInnerHTML={{
                  __html: p.codePreview ? hiCode(p.codePreview, lang) : `# Code available in full ${langLabel} viewer →`,
                }}
              />
            </pre>
          </div>
        </div>
      </div>
      <div className="p-4 shrink-0 border-t border-white/[0.05]">
        <a
          href={p.modelUrl}
          target={p.modelUrl.startsWith("http") ? "_blank" : undefined}
          rel={p.modelUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.08] text-sm font-semibold text-gray-400 hover:text-white hover:border-white/[0.16] transition-all"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          Open Full {lang === "r" ? "Analysis" : "Notebook"} ↗
        </a>
      </div>
    </div>
  );
}

function PreviewOutputs({ p, cfg }: { p: Project; cfg: PlatformCfg }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {p.deliverables.map((d) => (
            <div
              key={d}
              className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-white/[0.06]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `rgba(${cfg.accentRgb},0.1)`, border: `1px solid rgba(${cfg.accentRgb},0.15)` }}
              >
                <DeliverableIcon name={d} sz={18} />
              </div>
              <p className="text-[12px] font-bold text-gray-200">{d}</p>
              <p className="text-[10px] text-gray-600 text-center">{DELIVERABLE_DESC[d] ?? d}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-4 text-center border border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <p className="text-[13px] text-gray-400 mb-1">
            Full outputs, visualizations, and results are available in the complete view.
          </p>
          <p className="text-[11px] text-gray-600">Includes all charts, computed tables, and methodology walkthrough.</p>
        </div>
      </div>
      <div className="p-4 shrink-0 border-t border-white/[0.05]">
        <a
          href={p.modelUrl}
          target={p.modelUrl.startsWith("http") ? "_blank" : undefined}
          rel={p.modelUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: `rgba(${cfg.accentRgb},0.08)`,
            border:     `1px solid rgba(${cfg.accentRgb},0.2)`,
            color:      `rgb(${cfg.accentRgb})`,
          }}
        >
          View Full {p.platformType === "r_analysis" ? "Analysis" : "Notebook"} ↗
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ModelViewerModal — Unified
// ─────────────────────────────────────────────────────────────────────────────
function ModelViewerModal({
  modal,
  onClose,
}: {
  modal: ModalState;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modal) return;
    document.body.style.overflow = "hidden";
    const el = dialogRef.current;
    if (el) {
      const focusables = el.querySelectorAll<HTMLElement>(
        'button,[href],input,[tabindex]:not([tabindex="-1"])'
      );
      focusables[0]?.focus();
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modal, onClose]);

  if (!modal) return null;
  const { project: p, tab } = modal;
  const cfg = PC[p.platformType];
  const isPreview = cfg.modalType === "preview_panel";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        className="relative flex flex-col w-full sm:max-w-4xl rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{
          background:  "rgb(15,20,30)",
          border:      "1px solid rgba(255,255,255,0.08)",
          boxShadow:   `0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(${cfg.accentRgb},0.08)`,
          maxHeight:   "min(90vh, 740px)",
          height:      "min(90vh, 740px)",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `rgba(${cfg.accentRgb},0.12)`, border: `1px solid rgba(${cfg.accentRgb},0.2)` }}
          >
            <PlatformIcon t={p.platformType} sz={15} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              id="modal-title"
              className="text-[11px] font-bold uppercase tracking-widest mb-0.5"
              style={{ color: `rgb(${cfg.accentRgb})` }}
            >
              {cfg.label}
            </p>
            <p className="text-[13px] font-bold text-white leading-tight truncate">{p.title}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={p.href}
              className="hidden sm:flex items-center gap-1 text-[12px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
            >
              Full Case Study →
            </Link>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 text-gray-500 hover:text-gray-300"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Tab bar (preview_panel only) ── */}
        {isPreview && (
          <div
            className="flex items-center gap-0.5 px-5 py-2 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            {(["overview", "code", "outputs"] as const).map((t) => {
              const labels: Record<string, string> = {
                overview: "Overview",
                code:     p.platformType === "r_analysis" ? "R Code" : "Python Code",
                outputs:  "Outputs",
              };
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    // This sets tab — handled in parent
                  }}
                  data-tab={t}
                  className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  style={
                    active
                      ? { background: `rgba(${cfg.accentRgb},0.12)`, color: `rgb(${cfg.accentRgb})` }
                      : { color: "#6b7280" }
                  }
                >
                  {labels[t]}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Body ── */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {/* IFRAME (Excel, Tableau, GenAI) */}
          {cfg.modalType === "iframe" && p.embedUrl && (
            <EmbedFrame
              url={p.embedUrl}
              title={p.title}
              timeoutMs={cfg.timeoutMs}
              modelUrl={p.modelUrl}
              accentRgb={cfg.accentRgb}
            />
          )}
          {cfg.modalType === "iframe" && !p.embedUrl && (
            <div className="flex items-center justify-center h-full">
              <a
                href={p.modelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-400 hover:text-indigo-300 underline"
              >
                Open in new tab →
              </a>
            </div>
          )}

          {/* SCREENSHOT (Power BI) */}
          {cfg.modalType === "screenshot" && (
            <div className="flex flex-col h-full overflow-auto">
              {p.previewImages && p.previewImages.length > 0 && (
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.previewImages[0]}
                    alt={`${p.title} preview`}
                    className="w-full object-cover object-top"
                    style={{ maxHeight: "360px" }}
                  />
                  <div
                    className="absolute bottom-0 inset-x-0"
                    style={{ height: "80px", background: "linear-gradient(to top, rgb(15,20,30), transparent)" }}
                  />
                </div>
              )}
              <div className="p-5 space-y-4">
                <div
                  className="rounded-xl p-4 border border-yellow-500/15 flex items-start gap-3"
                  style={{ background: "rgba(245,158,11,0.05)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <div>
                    <p className="text-[12px] font-semibold text-yellow-300 mb-0.5">Organizational access required</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      This dashboard is deployed within Temple University's Power BI workspace. Live embedding requires organizational authentication. The full case study covers the methodology, DAX measures, and results.
                    </p>
                  </div>
                </div>
                {p.keyMetrics && (
                  <div className="grid grid-cols-3 gap-3">
                    {p.keyMetrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl p-3 text-center border border-white/[0.06]"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                      >
                        <p className="text-base font-black text-yellow-400">{m.value}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Link
                    href={p.href}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all text-yellow-400"
                    style={{
                      background: "rgba(250,204,21,0.08)",
                      border:     "1px solid rgba(250,204,21,0.2)",
                    }}
                  >
                    View Full Case Study →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW PANEL (Python, R) */}
          {isPreview && (
            <>
              {tab === "overview" && <PreviewOverview p={p} cfg={cfg} />}
              {tab === "code"     && <PreviewCode    p={p} cfg={cfg} />}
              {tab === "outputs"  && <PreviewOutputs p={p} cfg={cfg} />}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="flex items-center justify-between px-5 py-2.5 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}
        >
          <p className="text-[11px] text-gray-600">{cfg.footerNote}</p>
          <Link
            href={p.href}
            className="sm:hidden text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectsClient() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("Financial Modeling");
  const [modal, setModal]   = useState<ModalState>(null);

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter)),
    [filter]
  );

  const handlePrimary = useCallback(
    (p: Project) => {
      if (p.embedUrl) {
        setModal({ project: p, tab: "overview" });
        return;
      }
      const cfg = PC[p.platformType];
      if (cfg.modalType === "screenshot") {
        setModal({ project: p, tab: "overview" });
        return;
      }
      if (cfg.modalType === "preview_panel") {
        setModal({ project: p, tab: "overview" });
        return;
      }
      // No embed + not screenshot/preview → navigate
      if (p.modelUrl.startsWith("http")) {
        window.open(p.modelUrl, "_blank", "noopener,noreferrer");
      } else {
        router.push(p.modelUrl);
      }
    },
    [router]
  );

  const setTab = useCallback((tab: "overview" | "code" | "outputs") => {
    setModal((m) => m ? { ...m, tab } : null);
  }, []);

  // Patch tab button clicks inside the modal (event delegation approach)
  useEffect(() => {
    if (!modal) return;
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-tab]");
      if (!btn) return;
      const tab = (btn as HTMLElement).dataset.tab as "overview" | "code" | "outputs";
      if (tab) setTab(tab);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [modal, setTab]);

  return (
    <>
      {/* ── Category filter chips ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by category">
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
                      background:  "linear-gradient(135deg,#6366f1,#8b5cf6)",
                      borderColor: "#6366f1",
                      color:       "#fff",
                      boxShadow:   "0 0 16px rgba(99,102,241,0.35)",
                    }
                  : {
                      background:  "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.08)",
                      color:       "#9ca3af",
                    }
              }
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* ── Count label ───────────────────────────────────────────────────── */}
      <p className="text-[11px] text-gray-600 mb-5 font-medium tracking-wide">
        {visible.length} project{visible.length !== 1 ? "s" : ""}
        {filter !== "All" && <span className="ml-1.5 text-gray-700">· {filter}</span>}
      </p>

      {/* ── Project cards ─────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {visible.map((p) => {
          const cfg = PC[p.platformType];
          const hasLiveEmbed = !!p.embedUrl;
          const isExcelNoEmbed = p.platformType === "excel_model" && !p.embedUrl;
          const badgeLabel = isExcelNoEmbed ? "Excel Model" : cfg.label;

          return (
            <article
              key={p.id}
              className="group relative rounded-2xl border overflow-hidden transition-all duration-200"
              style={{ background: "rgba(17,24,39,0.7)", borderColor: "rgba(255,255,255,0.06)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = `rgba(${cfg.accentRgb},0.22)`;
                el.style.background  = "rgba(17,24,39,0.92)";
                el.style.boxShadow   = `0 0 28px rgba(${cfg.accentRgb},0.10)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.background  = "rgba(17,24,39,0.7)";
                el.style.boxShadow   = "none";
              }}
            >
              {/* Left accent stripe — ALL projects */}
              <div
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                style={{ background: cfg.stripeGradient }}
              />

              <div className="pl-5 pr-4 py-4">
                {/* Row 1: Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded border font-semibold ${
                      CAT_COLOR[p.cat] ?? "text-gray-400 bg-gray-800 border-gray-700"
                    }`}
                  >
                    {p.cat}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-semibold flex items-center gap-1 ${cfg.badgeCls}`}
                  >
                    <PlatformIcon t={p.platformType} sz={9} />
                    {badgeLabel}
                  </span>
                  <span className="text-[11px] text-gray-600">{p.yr}</span>
                </div>

                {/* Row 2: Title + actions */}
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
                    <button
                      onClick={() => handlePrimary(p)}
                      aria-label={`${cfg.btnText} for ${p.title}`}
                      className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all focus:outline-none focus-visible:ring-2 whitespace-nowrap"
                      style={{
                        color:       `rgb(${cfg.accentRgb})`,
                        background:  `rgba(${cfg.accentRgb},0.08)`,
                        border:      `1px solid rgba(${cfg.accentRgb},0.2)`,
                        focusRingColor: `rgb(${cfg.accentRgb})`,
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background  = `rgba(${cfg.accentRgb},0.15)`;
                        el.style.borderColor = `rgba(${cfg.accentRgb},0.38)`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background  = `rgba(${cfg.accentRgb},0.08)`;
                        el.style.borderColor = `rgba(${cfg.accentRgb},0.2)`;
                      }}
                    >
                      <PlatformIcon t={p.platformType} sz={11} />
                      {cfg.btnText}
                    </button>
                    <Link
                      href={p.href}
                      aria-label={`View case study for ${p.title}`}
                      className="flex items-center gap-1 text-[12px] font-semibold text-indigo-400 hover:text-indigo-300 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
                    >
                      Case Study →
                    </Link>
                  </div>
                </div>

                {/* Row 3: Tech stack + deliverables */}
                <div
                  className="mt-3 pt-3 space-y-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-md font-medium text-gray-500"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Deliverables strip */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {p.deliverables.map((d) => (
                      <span
                        key={d}
                        className="flex items-center gap-1 text-[10px] text-gray-600 font-medium"
                      >
                        <DeliverableIcon name={d} sz={9} />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <ModelViewerModal modal={modal} onClose={() => setModal(null)} />
    </>
  );
}
