// GenAI Finance Project Data
// Verified content based on actual project files analyzed from desktop directory.

export interface GenAiMetric {
  label: string;
  value: string;
}

export interface GenAiCapability {
  title: string;
  built: string;
  tools: string;
  relevance: string;
}

export interface GenAiWorkflowStep {
  stage: string;
  label: string;
  items: string[];
}

export interface GenAiSystem {
  name: string;
  group: "market" | "infrastructure" | "document";
  objective: string;
  implementation: string;
  dataSource: string;
  output: string;
  relevance: string;
  files: string;
}

export interface GenAiDashboardVersion {
  version: string;
  name: string;
  lines: number;
  features: string[];
}

export interface GenAiMitigation {
  strategy: string;
  application: string;
}

export interface GenAiSkillEntry {
  skill: string;
  application: string;
}

export interface GenAiTechEntry {
  category: string;
  tools: string;
}

export interface GenAiProject {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  tools: string[];
  metrics: GenAiMetric[];
  skills: string[];
  streamlitUrl?: string;   // Live Streamlit embed URL (localhost or deployed)
  capabilities: GenAiCapability[];
  aiWorkflow: GenAiWorkflowStep[];
  systems: GenAiSystem[];
  dashboardVersions: GenAiDashboardVersion[];
  governance: {
    keyFinding: string;
    scenarios: string[];
    mitigations: GenAiMitigation[];
  };
  techStack: GenAiTechEntry[];
  skillMap: {
    financial: GenAiSkillEntry[];
    technical: GenAiSkillEntry[];
    ai: GenAiSkillEntry[];
  };
  keyOutcomes: string[];
  reflection: string;
  caseStudy: {
    problem: string;
    approach: string;
    data: string;
    methods: string;
    results: string;
    learnings: string;
  };
}

export const genaiProjects: GenAiProject[] = [
  {
    id: "genai-in-finance",
    title: "GenAI in Finance",
    subtitle: "AI-Augmented Financial Analytics & Portfolio Intelligence",
    streamlitUrl: "https://prabin-portfolio-analytics.streamlit.app",
    summary:
      "Designed and deployed an integrated financial analytics system applying generative AI across quantitative modeling, market risk analytics, SEC document intelligence, and interactive decision-support dashboards — with an applied AI governance framework embedded throughout.",
    description:
      "This project integrates generative AI into real financial analysis workflows: a live beta and alpha estimation engine, a SEC MD&A extraction pipeline, a 35-year long-horizon fund analytics engine, a moving-average technical signal detector, and a three-version client-facing Streamlit dashboard. Each system was built with Python using live market data, institutional-grade factor models, and a dual-validation governance framework ensuring no AI output entered final deliverables without human approval.",
    category: "GenAI Finance",
    tags: [
      "Generative AI", "Python", "Streamlit", "yfinance", "SEC Filings",
      "WACC", "CAPM", "Factor Models", "Portfolio Analytics", "AI Governance",
      "LLM Calibration", "BeautifulSoup", "Plotly", "Risk Analytics",
    ],
    tools: [
      "Python", "Streamlit", "yfinance API", "Pandas", "NumPy", "SciPy",
      "Plotly", "Matplotlib", "BeautifulSoup", "python-pptx",
      "Excel", "Claude (AI Assistance)", "Carhart 4-Factor", "Fama-French 3-Factor",
    ],
    metrics: [
      { label: "Python Systems", value: "5 analytics engines" },
      { label: "Dashboard App", value: "1 Streamlit app" },
      { label: "WACC Data Sources", value: "8 integrated files" },
      { label: "Fund History", value: "35 years analyzed" },
      { label: "SEC Filings Parsed", value: "GOOGL · META · NFLX" },
      { label: "LLMs Evaluated", value: "9 models benchmarked" },
    ],
    skills: [
      "WACC Modeling", "CAPM", "Beta Estimation", "Sharpe Ratio",
      "Maximum Drawdown", "Factor Models", "SEC Document Parsing",
      "Streamlit Development", "Rolling Analytics", "AI Governance",
      "LLM Calibration", "Data Pipeline Engineering", "SMA Signal Detection",
    ],

    // ── Core Capabilities ──────────────────────────────────────────────────────
    capabilities: [
      {
        title: "AI-Augmented Financial Modeling",
        built:
          "Parallel WACC worksheets — one human-constructed, one Claude-assisted — enabling direct output comparison and auditability. Scenario generation workbook using AI-suggested assumptions within analyst-controlled review.",
        tools: "Excel, Claude",
        relevance:
          "Mirrors institutional model risk management practice: AI as first-draft accelerator with mandatory human validation before any figure enters a final deliverable.",
      },
      {
        title: "Quantitative Portfolio Analytics",
        built:
          "35-year fund performance diagnostics (FCNTX vs. VFINX) covering Sharpe ratio, maximum drawdown, skewness, kurtosis, and decade-level return decomposition. Live beta, alpha, and annualized volatility for AMZN and NVDA vs. SPY.",
        tools: "Python (Pandas, NumPy, SciPy), yfinance, Excel",
        relevance:
          "Institutional-grade performance attribution and risk-adjusted return analysis applicable to fund due diligence, manager selection, and portfolio reporting.",
      },
      {
        title: "Financial Data Engineering",
        built:
          "Multi-asset alignment pipeline joining independently-dated NVDA, MSFT, SPY, and USGG1M series. Daily return computation with T-bill yield conversion to daily risk-free rate (RF = USGG1M / 100 / 252). Output: 3,000+ row clean dataset.",
        tools: "Python (Pandas, openpyxl), Excel",
        relevance:
          "Replicates the data engineering layer required in any buy-side or fintech analytics stack — clean, aligned, risk-free-rate-adjusted data powering all downstream analytics.",
      },
      {
        title: "SEC Document Intelligence Automation",
        built:
          "HTML parser for 10-K filings extracting Item 7 MD&A sections from Alphabet, Meta, and Netflix (Q1 2026 filings). Dual extraction strategy: anchor-tag navigation for structured filings; regex-based fallback for unstructured formats.",
        tools: "Python (BeautifulSoup, regex)",
        relevance:
          "Automates the most time-intensive step in fundamental analysis — enables NLP, AI summarization, and earnings review at scale across large company universes.",
      },
      {
        title: "Interactive Decision-Support Dashboard",
        built:
          "Production Streamlit platform with rolling factor analytics (beta, alpha, volatility, correlation), Sharpe tracking, benchmark comparison, returns distribution analysis, and CSV export.",
        tools: "Python (Streamlit, Plotly, Matplotlib), custom CSS",
        relevance:
          "Replicates internal analytics tools used at wealth management firms and fintech platforms — demonstrates full-stack financial product thinking.",
      },
      {
        title: "AI Governance & Calibration Research",
        built:
          "25-slide research presentation quantifying overconfidence in 9 LLMs using Expected Calibration Error (ECE). Modeled four financial risk failure scenarios. Documented mitigation strategies applied in practice.",
        tools: "Python (python-pptx), academic literature synthesis",
        relevance:
          "Addresses the emerging risk discipline of AI model governance in finance — a priority area for regulators, risk managers, and institutional AI deployment teams.",
      },
    ],

    // ── AI Workflow Steps ──────────────────────────────────────────────────────
    aiWorkflow: [
      {
        stage: "01",
        label: "Raw Data & Problem Framing",
        items: [
          "Live market data via yfinance API (AMZN, NVDA, MSFT, SPY)",
          "35-year mutual fund return dataset (FCNTX / VFINX)",
          "SEC 10-K HTML filings — Alphabet, Meta, Netflix (Q1 2026)",
          "8-source Excel dataset for KO WACC model",
          "Carhart 4-factor & Fama-French 3-factor monthly data",
        ],
      },
      {
        stage: "02",
        label: "AI Assistance Layer",
        items: [
          "Claude: WACC formula structuring and formula-to-cell mapping",
          "Claude: Research synthesis from academic papers on LLM calibration",
          "Claude: First-draft scenario assumptions for forecasting workbook",
          "Claude Code: Python scaffolding for data transformations & dashboard components",
        ],
      },
      {
        stage: "03",
        label: "Human Validation Checkpoint",
        items: [
          "All AI-generated figures compared against human-built reference model",
          "All cited statistics verified against primary source material",
          "All scenario assumptions reviewed against historical precedent",
          "All code outputs validated against manual benchmark calculations",
        ],
      },
      {
        stage: "04",
        label: "Financial Output",
        items: [
          "WACC calculation (KO) — audit-ready with dual-worksheet documentation",
          "Risk-adjusted metrics — validated beta, alpha, Sharpe, drawdown",
          "Python systems — all outputs verified against known benchmarks",
          "Research presentation — all 25 slides independently fact-checked",
        ],
      },
    ],

    // ── Python Systems ─────────────────────────────────────────────────────────
    systems: [
      {
        name: "Live Market Risk & Beta Estimation System",
        group: "market",
        objective:
          "Compute real-time risk metrics — beta, alpha, and annualized volatility — for individual equities relative to the S&P 500.",
        implementation:
          "yfinance API integration for 3-year daily price history (AMZN, NVDA, SPY). Covariance-based beta: β = Cov(Stock, SPY) / Var(SPY). Alpha derivation. Annualized volatility: σ_daily × √252.",
        dataSource: "yfinance live data — AMZN, NVDA, SPY (3-year daily)",
        output: "Formatted analyst-ready risk summary: beta, alpha, annualized return, annualized volatility",
        relevance:
          "Core inputs to CAPM cost of equity, portfolio risk attribution, and factor exposure estimation.",
        files: "live_data_fundamentals.py, live_data_fundamentals_final.py",
      },
      {
        name: "Technical Signal Detection Engine",
        group: "market",
        objective:
          "Identify Golden Cross and Death Cross events in daily equity prices to support systematic trend-following signals.",
        implementation:
          "2-year daily WBD price download via yfinance. SMA-50 and SMA-200 via rolling windows. Boolean cross-detection logic. Annotation-enriched Matplotlib chart generation.",
        dataSource: "yfinance live historical data — WBD (2-year daily)",
        output:
          "moving_averages.png — 14\"×7\" annotated chart with price, SMA-50, SMA-200, and labeled Golden/Death Cross events",
        relevance:
          "Core building block of systematic trend-following strategies; demonstrates quantitative signal generation.",
        files: "moving_averages.py, moving_averages_final.py",
      },
      {
        name: "Long-Horizon Fund Performance Analytics Engine",
        group: "market",
        objective:
          "Benchmark 35 years of active vs. passive fund performance across full market cycles.",
        implementation:
          "Pandas-based Excel loader. Per-fund computation of 12 statistical metrics including max drawdown, Sharpe, skewness, and kurtosis. Decade-level annualized return breakdown. Correlation analysis.",
        dataSource: "Data_FCNTX_VFINX_35_Years.xlsx — monthly total returns, 1989–2024",
        output:
          "Comparative statistical table, decade breakdown matrix (1990s, 2000s, crisis, recovery, COVID), full-period correlation coefficient",
        relevance:
          "Supports active vs. passive investment decision-making and manager due diligence across market cycles.",
        files: "analysis.py",
      },
      {
        name: "Multi-Asset Data Alignment Pipeline",
        group: "infrastructure",
        objective:
          "Prepare a clean, aligned, risk-free-rate-adjusted multi-asset dataset for quantitative dashboard consumption.",
        implementation:
          "Joins four independently-dated series (NVDA, MSFT, SPY, USGG1M) via inner merge on overlapping trading dates. Daily returns via pct_change(). T-bill to daily RF: RF_daily = (USGG1M / 100) / 252. NaN removal and sort validation.",
        dataSource: "streamlit__app_data.xlsx — daily prices and Treasury yield",
        output:
          "streamlit__app_data_cleaned.xlsx and .csv — 3,000+ aligned trading days, ready for Sharpe, beta, and rolling factor analytics",
        relevance:
          "Foundational data engineering ensuring all downstream analytics operate on clean, aligned, risk-adjusted data.",
        files: "clean_data.py",
      },
      {
        name: "SEC Filing MD&A Extraction Pipeline",
        group: "document",
        objective:
          "Programmatically extract Management's Discussion & Analysis sections from 10-K annual filings for large-cap technology companies.",
        implementation:
          "HTML-based 10-K parser using BeautifulSoup. Dual extraction: anchor-tag navigation for structured filings (META, NFLX); regex-based Item 7 search for unstructured (GOOGL). Whitespace normalization and text cleaning.",
        dataSource:
          "10-K HTML filings — Alphabet (filed 2026-02-05), Meta (filed 2026-01-29), Netflix (filed 2026-01-23)",
        output:
          "GOOGL.txt, META.txt, NFLX.txt — cleaned MD&A sections ready for NLP, AI summarization, or analyst review",
        relevance:
          "Automates fundamental analysis document review; enables downstream AI summarization and earnings intelligence workflows at scale.",
        files: "extract_mda.py",
      },
    ],

    // ── Dashboard Versions ─────────────────────────────────────────────────────
    dashboardVersions: [
      {
        version: "v1",
        name: "Core Analytics Engine",
        lines: 272,
        features: [
          "Date range selector with 30-day minimum validation",
          "Security selection: NVDA or MSFT",
          "Core metrics: annualized return, volatility, beta, alpha",
          "Cumulative return chart vs. SPY benchmark",
          "Scatter plot with regression line for beta estimation",
        ],
      },
      {
        version: "v2",
        name: "Refined Analytics View",
        lines: 380,
        features: [
          "Four-column executive header metrics",
          "Risk classification tiers: volatility (Low/Moderate/High), beta (Defensive/In-Line/Aggressive)",
          "Benchmark comparison table: Security vs. S&P 500",
          "Key insights summary section",
          "Professional disclaimer footer",
        ],
      },
      {
        version: "v3",
        name: "Client-Grade Platform",
        lines: 621,
        features: [
          "Rolling analytics: beta, volatility, alpha, correlation — 60/90/180-day configurable windows",
          "Returns distribution histogram with normal overlay for tail risk analysis",
          "Excess return series: filled area chart tracking alpha over time",
          "Risk-return scatter with multi-security linear regression",
          "CSV export of full statistical detail",
          "Custom CSS: Deep Blue (#0052CC), institutional color palette, dark/light mode",
        ],
      },
    ],

    // ── AI Governance ──────────────────────────────────────────────────────────
    governance: {
      keyFinding:
        "Across 9 LLMs analyzed, 84% of scenarios exhibited systematic overconfidence. Nominal 99% confidence intervals covered only 65% of actual outcomes — a critical risk for any financial application relying on LLM-generated probability estimates.",
      scenarios: [
        "DCF valuation errors from AI-generated growth assumptions",
        "Credit risk misclassification from overconfident probability outputs",
        "Trading signal generation with miscalibrated confidence levels",
        "Macroeconomic stress test inaccuracies from distribution mismatch",
      ],
      mitigations: [
        {
          strategy: "Dual-Worksheet Validation",
          application:
            "Human-built and AI-assisted WACC models maintained in parallel (Cost of Capital Worksheet - Key.xlsx vs. Claude.xlsx) for direct line-by-line comparison",
        },
        {
          strategy: "Distractor Prompting",
          application:
            "Reduces ECE by up to 92% in tested models — applied when using LLMs for financial research synthesis tasks",
        },
        {
          strategy: "Source Verification",
          application:
            "All AI-cited statistics verified against primary academic sources (Chhikara 2025, Geng et al. 2024, Epstein et al. 2025) before inclusion in any deliverable",
        },
        {
          strategy: "Selective Prediction",
          application:
            "Human escalation protocol when model confidence falls below defined threshold — no AI output enters final deliverables without explicit human sign-off",
        },
        {
          strategy: "Conformal Prediction",
          application:
            "Statistical coverage guarantees applied to quantify and bound model uncertainty in probabilistic financial outputs",
        },
      ],
    },

    // ── Tech Stack ─────────────────────────────────────────────────────────────
    techStack: [
      { category: "Language",            tools: "Python 3.x" },
      { category: "Data Engineering",    tools: "Pandas, NumPy, openpyxl" },
      { category: "Statistical Analysis",tools: "SciPy (regression, distribution fitting, covariance)" },
      { category: "Visualization",       tools: "Matplotlib, Seaborn, Plotly" },
      { category: "Dashboard Framework", tools: "Streamlit" },
      { category: "Market Data",         tools: "yfinance API (live equity, ETF, index data)" },
      { category: "Document Parsing",    tools: "BeautifulSoup, regex" },
      { category: "Presentation",        tools: "python-pptx (25-slide programmatic deck)" },
      { category: "Excel Modeling",      tools: "Microsoft Excel (WACC, LBO, PE exit, factor models)" },
      { category: "Factor Data",         tools: "Carhart 4-factor, Fama-French 3-factor (monthly CSV)" },
      { category: "Market Benchmarks",   tools: "SPY (S&P 500 proxy), USGG1M (1-month T-bill)" },
      { category: "Generative AI",       tools: "Claude (code assistance, modeling validation, synthesis)" },
    ],

    // ── Skill Map ──────────────────────────────────────────────────────────────
    skillMap: {
      financial: [
        { skill: "WACC / Cost of Capital",    application: "KO 8-source WACC model with CAPM, CDS spreads, Treasury yields" },
        { skill: "CAPM",                       application: "Cost of equity derivation; beta regression vs. SPY benchmark" },
        { skill: "Risk-Adjusted Returns",      application: "Sharpe ratio, alpha, beta across NVDA, MSFT, AMZN, FCNTX, VFINX" },
        { skill: "Factor Models",              application: "Carhart 4-factor, Fama-French 3-factor data integration" },
        { skill: "Portfolio Analytics",        application: "35-year drawdown, volatility, skewness, decade decomposition" },
        { skill: "Capital Structure",          application: "LBO sources & uses, IPO pricing, PE exit IRR/MOIC modeling" },
        { skill: "Fundamental Analysis",       application: "MD&A extraction from GOOGL, META, NFLX 10-K filings" },
      ],
      technical: [
        { skill: "Python Analytics Engineering", application: "5 financial systems, 2,000+ lines, live data integration" },
        { skill: "Data Pipeline Construction",   application: "Multi-series alignment, return transformation, RF rate conversion" },
        { skill: "Streamlit Development",         application: "Production analytics dashboard, rolling factor analytics, client-grade UI (621 lines)" },
        { skill: "API Integration",               application: "yfinance live equity and ETF data" },
        { skill: "Data Visualization",            application: "Matplotlib, Plotly — annotated charts, interactive dashboards" },
        { skill: "Document Parsing",              application: "BeautifulSoup + regex — SEC 10-K HTML extraction at scale" },
        { skill: "Presentation Engineering",      application: "python-pptx — 25-slide programmatic deck generation" },
      ],
      ai: [
        { skill: "LLM Calibration Analysis",     application: "ECE measurement across 9 models; finance failure scenario mapping" },
        { skill: "AI Governance Frameworks",      application: "Dual-worksheet validation; human checkpoint protocol throughout" },
        { skill: "Prompt-Controlled Development", application: "Claude-assisted code scaffolding with human review at every output" },
        { skill: "Model Risk Awareness",           application: "Overconfidence quantification; conformal prediction implementation" },
        { skill: "AI-Augmented Modeling",          application: "Claude-assisted WACC structuring; parallel human reference maintained" },
        { skill: "Research Synthesis with AI",     application: "Academic source verification; citation accuracy validation" },
      ],
    },

    // ── Key Outcomes ───────────────────────────────────────────────────────────
    keyOutcomes: [
      "Deployed a production Streamlit dashboard with live market data, rolling factor analytics, and client-grade UI design",
      "Built and validated a WACC model for Coca-Cola integrating 8 data sources including CDS spreads and Treasury yield curves",
      "Engineered an SEC document intelligence pipeline capable of extracting MD&A at scale from large-cap 10-K filings",
      "Computed risk-adjusted return metrics (beta, alpha, Sharpe, max drawdown) across a 35-year dataset and live equity universe",
      "Quantified AI model risk across 9 LLMs — documented calibration failures with applied mitigation strategies",
      "Designed a full AI governance workflow with dual-model validation, human checkpoints, and source verification embedded throughout",
      "Demonstrated end-to-end analytical product thinking: raw data → Python pipeline → validated output → interactive dashboard",
    ],

    // ── Reflection ─────────────────────────────────────────────────────────────
    reflection:
      "Generative AI changes the speed of financial analysis — not the accountability for it. Every system built here was designed with that distinction in mind. AI shortened the distance from problem framing to first-draft output. Human verification closed the gap between first draft and final deliverable. The LLM calibration research surfaced a finding with direct practical implications: language models overstate confidence in ways that are measurable and — with the right prompting and validation protocols — manageable. Embedding that awareness into the workflow architecture, rather than treating it as a theoretical concern, is what distinguishes applied AI governance from commentary about it. The combination of quantitative finance domain knowledge, production Python development, SEC document automation, and documented model risk management positions this work at the intersection of where finance and AI are converging.",

    // ── Case Study (for backward compat / featured card) ──────────────────────
    caseStudy: {
      problem:
        "Financial analysts face a dual challenge: AI tools accelerate analytical throughput but introduce model risk — hallucination, overconfidence, and unverified assumptions — that can corrupt financial outputs if not explicitly managed.",
      approach:
        "Built five Python analytics systems and three Streamlit dashboard versions, with generative AI integrated at the code scaffolding, modeling, and research synthesis stages. Every AI output was subject to a documented human validation checkpoint before entering any deliverable.",
      data:
        "Live market data (yfinance), 35-year mutual fund returns, SEC 10-K HTML filings (GOOGL, META, NFLX), 8-source Excel financial data (Coca-Cola KO), Carhart 4-factor and Fama-French 3-factor monthly datasets.",
      methods:
        "Covariance-based beta estimation, CAPM cost of equity, WACC modeling, SMA technical signal detection, BeautifulSoup HTML parsing, Streamlit dashboard engineering with rolling factor analytics, Expected Calibration Error (ECE) analysis across 9 LLMs.",
      results:
        "Five production Python systems, a client-grade Streamlit analytics dashboard, a validated WACC model, a live SEC extraction pipeline, and a 25-slide LLM governance research presentation — all with documented AI governance applied throughout.",
      learnings:
        "AI in finance must prioritize accuracy over speed. The governance framework — dual-worksheet validation, source verification, distractor prompting, human sign-off — is not overhead. It is the differentiator between AI-assisted analysis and AI-contaminated outputs.",
    },
  },
];
