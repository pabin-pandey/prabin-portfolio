import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { pythonProjects } from "@/lib/projects-data";
import { excelProjects } from "@/lib/excel-projects-data";
import { rProjects } from "@/lib/r-projects-data";

/* ════════════════════════════════════════════════════════════════
   CONTENT JSON — Single source of truth for the entire site.
   Edit via the built-in Admin Panel or replace this object.
   ════════════════════════════════════════════════════════════════ */
const DEFAULT_CONTENT = {
  site: { name: "Prabin Pandey", domain: "www.prabin.com", tagline: "Finance × Data × AI" },
  hero: {
    greeting: "Hi, I'm", name: "Prabin Pandey",
    roles: ["AI-Augmented Financial Analyst", "Quantitative Systems Builder", "Investment Analytics Specialist"],
    desc: "MS Financial Analysis candidate at Temple University (Fox School of Business). I build quantitative financial systems — derivatives pricing engines, portfolio risk analytics, SEC document intelligence pipelines, and AI-integrated decision-support dashboards — with documented human validation at every AI-assisted step.",
    cta1: "View Projects", cta2: "Download Resume",
    stats: [{ v: "3.98", l: "GPA" }, { v: "20+", l: "Projects" }, { v: "10+", l: "Tools" }, { v: "CFA", l: "Level 1 Candidate" }]
  },
  about: {
    bio: "Finance professional specializing in corporate valuation, derivative pricing, and machine learning. With a strong foundation spanning quantitative modeling and data science, I bridge traditional finance with cutting-edge technology — from building complex Excel models for PE transactions to creating interactive Power BI dashboards and Python-based valuation tools.",
    education: [
      { school: "Temple University, Fox School of Business", degree: "MS Financial Analysis", period: "Expected May 2026", gpa: "3.98", courses: "Corporate Value Management, Asset Pricing, ML in Finance, Financial Time Series, Data Science in Finance, Derivative Valuation, AI in Portfolio Management", badge: "CFA Level I Candidate" },
      { school: "Tribhuvan University", degree: "BBA", period: "Dec 2023", gpa: "3.81", courses: "Business Administration — Finance focus", badge: "Valedictorian" }
    ],
    experience: [
      { co: "Sethi Clarity Advisers", role: "Associate Financial Consultant", period: "Sep 2025 – Dec 2025", pts: ["Built and tested financial projection tools (retirement income, net worth, contribution strategies) using Bubble and Outgrow", "Produced personalized recommendations using inflation/tax/income assumptions", "Improved UX of interactive tools and data collection accuracy"] },
      { co: "Temple University, Ambler Campus", role: "IT Consultant", period: "Jan 2025 – Present", pts: ["Designed and maintained Power BI dashboard analyzing visitor traffic trends to inform budget allocation", "Provided technical support and troubleshooting across campus systems"] },
      { co: "Global IME Bank", role: "Customer Relations Intern", period: "Mar – May 2023", pts: ["Client guidance on banking/insurance products and risk profiles", "Transactions & audit documentation with Finacle CRM", "Reporting/financial decision-making support; collateral evaluations for lending"] }
    ],
    skills: [
      { n: "Excel", cat: "Tools", lv: 95 }, { n: "Python", cat: "Code", lv: 85 },
      { n: "Power BI", cat: "Viz", lv: 90 }, { n: "Tableau", cat: "Viz", lv: 85 },
      { n: "MySQL", cat: "Code", lv: 75 }, { n: "R", cat: "Code", lv: 70 },
      { n: "Bloomberg Terminal", cat: "Finance", lv: 80 }, { n: "FactSet", cat: "Finance", lv: 75 },
      { n: "Capital IQ", cat: "Finance", lv: 75 }
    ],
    certs: ["CFA Level I Candidate"],
    now: "Actively seeking Summer 2026 internship and full-time opportunities in investment analytics, financial data engineering, and AI-augmented research at firms such as BlackRock, JPMorgan, Vanguard, or quantitative finance / AI analytics teams. Advancing toward the CFA Level I exam. Available May 2026."
  },
  projects: [
    { id: "pe", title: "Private Equity Transaction & Debt Covenant Model – Pharma Brands Inc.", cat: "Financial Modeling (Excel)", yr: "2024", sum: "Comprehensive 3-statement financial model for Pharma Brands Inc. special dividend recapitalization. Includes projected IS/BS/CF, debt schedule with term loan + revolver, and debt covenant compliance testing (Total Debt/EBITDA ≤ 3.0x, EBIT/Interest ≥ 6.0x). All covenants pass across the 5-year projection.", tags: ["Financial Modeling", "LBO", "Debt Covenants", "Sensitivity Analysis", "3-Statement Model", "Recapitalization"], tools: ["Excel"], metrics: ["6-sheet integrated model", "$3.25B revenue base growing to $4.07B", "All covenants pass (5 years)", "Debt/EBITDA from 2.46x → 0.0x", "EBIT/Interest from 13.1x → 97.0x"], featured: true, cs: { problem: "Pharma Brands Inc. is evaluating a $1B special dividend payment funded by a leveraged recapitalization. The transaction requires a comprehensive financial model to project the company's ability to service new debt (term loan + revolver) while maintaining compliance with restrictive debt covenants over a 5-year horizon.", approach: "Built a fully integrated 6-sheet Excel model: Transaction summary, Projected Income Statement, Balance Sheet, Cash Flow Statement, Debt Schedule (term loan + revolver with automatic sweep), and RE/Fixed Assets Schedule. Revenue assumptions drive through all statements with dynamic debt paydown from excess cash flow.", data: "Pharma Brands Inc. base year (2021) actuals: $3.25B revenue, $345M EBITDA (10.6% margin), $202M net income. $200M term loan at 6% with 20% annual amortization. Revolver facility at 6% interest on average balance. 25% tax rate.", methods: "Revenue growth (5% → 4%), margin expansion (EBITDA 10.6% → 13.0%), COGS/SGA/distribution assumptions as % of revenue, working capital modeling (DSO, DIO, DPO), CapEx at ~2.2% of revenue, automatic cash sweep to repay revolver, dual covenant testing: Total Debt/EBITDA (max 3.0x stepping to 1.5x) and EBIT/Interest Coverage (min 6.0x stepping to 12.0x).", results: "Model projects full revolver paydown by 2026 ($763M → $0). All debt covenants pass across the entire projection period. Net income grows from $200M to $331M. Cash position rebuilds to $133M by 2026. EBITDA margin improves from 11.0% to 13.0% through operational efficiencies.", learnings: "Deepened understanding of leveraged recapitalizations, cash sweep mechanics, covenant step-down structures, and the critical interplay between operating cash flow generation and debt service capacity. The model demonstrates how strong free cash flow can support aggressive leverage while maintaining covenant compliance." }, embed: { type: "excel", url: "", fallback: "Excel Model — Paste your OneDrive/SharePoint embed URL in the admin panel" }, isExcel: true },
    { id: "pbi", title: "Campus Operations Analytics Dashboard – Temple University", cat: "Power BI", yr: "2025", sum: "Enterprise Power BI dashboard built for Temple University Ambler campus operations. Analyzes visitor traffic patterns, seasonal trends, and resource utilization to support data-driven budget allocation decisions — applying the same BI principles used in financial planning & analysis (FP&A) at Fortune 500 companies.", tags: ["Business Intelligence", "FP&A Analytics", "Data Visualization", "Operational KPIs", "Budget Planning"], tools: ["Power BI", "DAX", "Power Query", "Excel", "SQL"], metrics: ["Reduced manual reporting time by 60%", "3 executive-ready dashboard pages", "YoY trend analysis across 4+ semesters", "Automated KPI tracking"], featured: true, cs: { problem: "Campus leadership relied on manual spreadsheet-based reporting to track visitor traffic and allocate budgets — a process that was slow, error-prone, and lacked the real-time insights needed for effective resource planning. This mirrors the challenge FP&A teams face when transitioning from static Excel reports to dynamic BI solutions.", approach: "Applied financial planning & analysis (FP&A) best practices to an operational context: identified key performance indicators (KPIs), designed a star-schema data model in Power Query, built DAX measures for variance analysis, and created interactive dashboards with drill-down capabilities from summary to detail views.", data: "Visitor traffic logs, campus scheduling data, historical utilization records, budget allocation spreadsheets, and seasonal enrollment data from Temple University Ambler campus.", methods: "Power Query ETL for data cleansing and transformation. Star-schema data model optimized for analytical queries. DAX measures including: YoY growth rates, rolling 4-week averages, peak detection algorithms, budget-vs-actual variance calculations, and semester-over-semester comparisons. Interactive slicers for time period, location, and category filtering. Conditional formatting for KPI status indicators.", results: "Delivered a self-service analytics platform that replaced manual reporting workflows. Campus leadership now has real-time visibility into traffic patterns, can identify underutilized time slots for resource reallocation, and makes budget decisions backed by quantitative evidence. The approach directly parallels how financial analysts use BI tools for revenue forecasting and cost center analysis.", learnings: "Reinforced that the core principles of financial analysis — variance analysis, trend identification, KPI tracking, and data-driven decision making — apply universally across business domains. Power BI's DAX language shares conceptual overlap with financial modeling logic: both require building measures from assumptions and linking them through a coherent analytical framework." }, embed: { type: "powerbi", url: "", fallback: "Power BI Dashboard — To embed: publish your .pbix to Power BI Service → File → Embed → Website or portal → paste the iframe URL here" }, links: { pbix: "https://tuprd-my.sharepoint.com/:u:/g/personal/tuu00197_temple_edu/IQDyxjYKZrRwRreUuC10M4kYAW-GZA4FgEJIeyyC6XOWiT4?e=fcPsWd" }, isPBI: true },
    { id: "tab1", title: "Global Macroeconomic Intelligence Dashboard", cat: "Tableau", yr: "2025", sum: "Executive-grade Tableau dashboard benchmarking four major economies — China, India, Russia, and the USA — across five macroeconomic indicators spanning 34 years of World Bank data. Features dynamic parameter controls, LOD-calculated volatility metrics, and interactive cross-filter actions.", tags: ["Macroeconomic Analysis", "Business Intelligence", "Data Visualization", "Country Benchmarking", "World Bank Data", "Interactive Dashboard"], tools: ["Tableau", "Excel", "LOD Expressions", "Table Calculations"], metrics: ["4 countries benchmarked", "5 economic indicators", "34 years of data (1990–2024)", "9 interactive worksheets", "Dynamic parameter controls", "LOD volatility engine"], featured: true, cs: { problem: "Macroeconomic decision-making — whether for asset allocation, country risk assessment, or strategic planning — requires a unified view of how major economies diverge across key financial indicators over time. Static spreadsheet reports cannot capture the dynamic, multi-dimensional nature of cross-country economic comparison.", approach: "Designed a parameter-driven Tableau workbook using World Bank macroeconomic data. Built a layered architecture: four KPI snapshot sheets feeding into a single coordinated dashboard, a dynamic indicator selector parameter powering all trend charts, and LOD expressions ensuring accurate country-level calculations independent of view context.", data: "World Bank Open Data via Excel: GDP (current USD), CPI Inflation (annual %), Unemployment rate (% of labor force), FDI net inflows (% of GDP), and Real Interest Rate (%) for China, India, Russia, and USA — 1990 through 2024. 260 rows × 7 fields.", methods: "CASE-based parameter routing to switch all charts between 5 indicators with one click. FIXED LOD expressions to calculate latest available year per country. Table calculations (LOOKUP) for YoY GDP growth rate. STDEV aggregation for the 34-year volatility index. Cross-sheet filter actions enabling click-to-drill from map → trend → comparison.", results: "A self-contained macroeconomic research platform that replicates the analytical workflow used by sovereign wealth funds and global asset managers. Any analyst can instantly compare how the 2008 financial crisis, COVID-19 shock, and 2022 geopolitical events impacted each economy's trajectory across all five indicators — in under 30 seconds.", learnings: "LOD expressions are the core differentiator in advanced Tableau work — FIXED calculations allow measure values to remain stable regardless of dashboard filter context, enabling accurate KPI cards that aren't distorted by cross-sheet interactions. Parameter routing is more scalable than building separate sheets per indicator." }, embed: { type: "tableau", url: "https://public.tableau.com/views/TableauFinalProject_17716017323360/GLOBALMACRODASHBOARD?:embed=yes&:showVizHome=no&:toolbar=yes", fallback: "Interactive Tableau Dashboard — Live on Tableau Public" }, isTableau: true },
    { id: "tab2", title: "Portfolio Risk & Return Analyzer", cat: "Tableau", yr: "2025", sum: "Interactive risk-return visualization tool with efficient frontier plotting, VaR calculations, and Monte Carlo simulation results.", tags: ["Portfolio Theory", "Risk Management", "Monte Carlo", "Efficient Frontier"], tools: ["Tableau", "Python", "NumPy"], metrics: ["Efficient frontier viz", "VaR at 95%/99%", "10K Monte Carlo sims"], featured: false, cs: { problem: "Portfolio managers need intuitive visualization of risk-return tradeoffs and downside risk metrics.", approach: "Combined Python-based quantitative analysis with Tableau's visualization capabilities for interactive exploration.", data: "Historical returns for 50+ assets, correlation matrices, and simulated portfolio outcomes.", methods: "Mean-Variance Optimization, Monte Carlo simulation, VaR (parametric & historical), CVaR.", results: "Interactive tool allowing portfolio managers to visually explore allocation impacts on risk-return profiles.", learnings: "Integrated quantitative finance theory with practical visualization for decision support." }, embed: { type: "tableau", url: "", fallback: "Tableau Dashboard — Paste Tableau Public embed URL in admin" } },
    { id: "genai-in-finance", title: "GenAI in Finance — AI-Augmented Financial Analytics & Portfolio Intelligence", cat: "GenAI Finance", yr: "2025", sum: "Integrated financial analytics system applying generative AI across quantitative modeling, market risk analytics, SEC document intelligence, and interactive decision-support dashboards — with a documented AI governance framework embedded throughout.", tags: ["Generative AI", "Python", "Streamlit", "WACC", "CAPM", "Factor Models", "SEC Filings", "AI Governance", "Portfolio Analytics", "LLM Calibration"], tools: ["Python", "Streamlit", "yfinance", "Pandas", "NumPy", "Plotly", "BeautifulSoup", "Excel", "Claude"], metrics: ["5 Python analytics systems", "3 Streamlit dashboard versions", "35-year fund analytics", "9 LLMs benchmarked"], featured: true, cs: { problem: "Financial analysts face a dual challenge: AI tools accelerate analytical throughput but introduce model risk — hallucination, overconfidence, and unverified assumptions — that can corrupt financial outputs if not explicitly managed.", approach: "Built five Python analytics systems and three Streamlit dashboard versions, with generative AI integrated at the code scaffolding, modeling, and research synthesis stages. Every AI output subject to a documented human validation checkpoint.", data: "Live market data (yfinance), 35-year mutual fund returns, SEC 10-K HTML filings (GOOGL, META, NFLX), 8-source Excel financial data (Coca-Cola KO), Carhart 4-factor and Fama-French 3-factor monthly datasets.", methods: "Covariance-based beta estimation, CAPM, WACC modeling, SMA signal detection, BeautifulSoup HTML parsing, Streamlit dashboard engineering with rolling factor analytics, ECE analysis across 9 LLMs.", results: "Five production Python systems, three client-grade Streamlit dashboards, a validated WACC model, a live SEC extraction pipeline, and a 25-slide LLM governance research presentation.", learnings: "AI in finance must prioritize accuracy over speed. The governance framework — dual-worksheet validation, source verification, distractor prompting, human sign-off — is the differentiator between AI-assisted analysis and AI-contaminated outputs." }, embed: null, isGenAI: true }
  ],
  blog: [{ id: "b1", title: "Why Financial Analysts Should Learn Python", date: "2025-01-15", excerpt: "The financial industry is rapidly adopting Python for everything from risk modeling to algorithmic trading.", content: "Python has become the lingua franca of quantitative finance...", published: true, tags: ["Python", "Finance", "Career"] }],
  testimonials: [
    { name: "Professor Name", role: "Faculty, Fox School of Business", quote: "Prabin consistently demonstrates exceptional analytical skills and a deep understanding of financial modeling concepts." },
    { name: "Colleague Name", role: "Sethi Clarity Advisers", quote: "Prabin's ability to translate complex financial concepts into intuitive tools is remarkable." }
  ],
  contact: { email: "prabin.pandey@temple.edu", phone: "835-207-9312", location: "Philadelphia, PA", linkedin: "https://linkedin.com/in/prabin-pandey-1482362b7/", github: "https://github.com/pabin-pandey", msg: "I'd love to hear from you. Whether you have a question, opportunity, or just want to connect — drop me a message." },
  resume: { label: "Download Resume", path: "/resume/Prabin_Pandey_Resume.pdf" }
};

// ─── Hooks ───
function useInView(th = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: th });
    o.observe(el); return () => o.disconnect();
  }, [th]);
  return [ref, v];
}

// ─── SVG Icons (inline for zero deps) ───
const icons = {
  sun: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  menu: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  x: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  chevR: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  chevL: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  chevD: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  dl: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  up: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  pin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  linkedin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  github: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  star: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  settings: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  lock: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  save: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  upload: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  trash: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  brain: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 0-4 4c0 .74.2 1.43.56 2.03A4 4 0 0 0 6 12c0 .74.2 1.43.56 2.03A4 4 0 0 0 6 16a4 4 0 0 0 4 4h.17"/><path d="M12 2a4 4 0 0 1 4 4c0 .74-.2 1.43-.56 2.03A4 4 0 0 1 18 12c0 .74-.2 1.43-.56 2.03A4 4 0 0 1 18 16a4 4 0 0 1-4 4h-.17"/><line x1="12" y1="2" x2="12" y2="22"/></svg>,
  shield: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  target: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  zap: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  bar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  code: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  sheet: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
  trend: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  grad: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>,
  brief: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  award: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  book: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  cal: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  play: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  db: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
};

const catIcon = { "Excel": icons.sheet, "Financial Modeling (Excel)": icons.sheet, "Power BI": icons.bar, "Tableau": icons.trend, "Python": icons.code, "GenAI Finance": icons.brain, "Financial Analytics (R)": icons.code };

// ─── Animated Counter ───
function Counter({ target }: { target: number | string }) {
  const [c, setC] = useState(0);
  const [ref, vis] = useInView();
  const str = String(target);
  // Only animate pure integers; display everything else (decimals, suffixes, text) as-is
  const isInt = /^\d+$/.test(str);
  const n = isInt ? parseInt(str) : 0;
  useEffect(() => {
    if (!vis || !n) return;
    let s = 0; const step = Math.max(1, Math.floor(n / 50));
    const t = setInterval(() => { s += step; if (s >= n) { setC(n); clearInterval(t); } else setC(s); }, 20);
    return () => clearInterval(t);
  }, [vis, n]);
  return <span ref={ref}>{isInt ? c : target}</span>;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [mobMenu, setMobMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [admin, setAdmin] = useState(false);

  // Ref keeps the current page accessible inside event-handler closures
  const pageRef = useRef("home");

  // Scroll position + progress tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const h = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(100, (sy / total) * 100) : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Mouse tracker for card-premium cursor spotlight
  useEffect(() => {
    const h = (e: MouseEvent) => {
      document.querySelectorAll('.card-premium').forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  // Keep pageRef in sync with page state
  useEffect(() => { pageRef.current = page; }, [page]);

  // ── On mount: restore section from URL hash + scroll from sessionStorage ──
  useEffect(() => {
    const VALID_PAGES = ['about', 'projects', 'blog', 'contact'];

    // 1. Read URL hash to restore the correct section (e.g. /#projects)
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && VALID_PAGES.includes(hash)) setPage(hash);

    // 2. Restore scroll position that was saved before navigating to a detail page
    try {
      const raw = sessionStorage.getItem('returnTo');
      if (raw) {
        const saved = JSON.parse(raw) as { path: string; hash: string; scrollY: number; ts: number };
        const MAX_AGE = 30 * 60 * 1000; // 30-minute TTL
        if (Date.now() - (saved.ts || 0) > MAX_AGE) {
          sessionStorage.removeItem('returnTo');
        } else {
          // Only restore if the current URL matches what we saved
          const matchPath = saved.path === window.location.pathname;
          const matchHash = (saved.hash || '') === window.location.hash;
          if (matchPath && matchHash) {
            sessionStorage.removeItem('returnTo');
            const sy = saved.scrollY || 0;
            if (sy > 0) {
              requestAnimationFrame(() =>
                setTimeout(() => window.scrollTo({ top: sy, behavior: 'instant' as ScrollBehavior }), 200)
              );
            }
          }
        }
      }
    } catch { /* ignore */ }
  }, []);

  // ── popstate: restore scroll when browser back/forward fires (handles Next.js page cache) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.scrollRestoration = 'manual';
    const VALID_PAGES = ['about', 'projects', 'blog', 'contact'];
    const handlePopstate = () => {
      try {
        const raw = sessionStorage.getItem('returnTo');
        if (raw) {
          const saved = JSON.parse(raw) as { path: string; hash: string; scrollY: number; ts: number };
          if (Date.now() - (saved.ts || 0) <= 30 * 60 * 1000 && saved.path === window.location.pathname) {
            // Restore section from saved hash (may differ from URL hash if pushState wasn't used)
            const savedHash = (saved.hash || '').replace('#', '').toLowerCase();
            if (savedHash && VALID_PAGES.includes(savedHash)) {
              setPage(savedHash);
              window.history.replaceState(null, '', `/${saved.hash}`);
            } else {
              setPage('home');
            }
            sessionStorage.removeItem('returnTo');
            const sy = saved.scrollY || 0;
            if (sy > 0) requestAnimationFrame(() => setTimeout(() => window.scrollTo({ top: sy, behavior: 'instant' as ScrollBehavior }), 200));
            return;
          }
        }
      } catch { /* ignore */ }
      // Fall back to URL hash
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && VALID_PAGES.includes(hash)) setPage(hash);
      else if (!hash) setPage('home');
    };
    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  // ── Save return-to state before any navigation to a sub-page ─────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      // Match /r-projects/…, /excel-projects/…, /genai-projects/…, /projects, /projects/…
      if (/^\/(r-projects|excel-projects|genai-projects|projects)/.test(href)) {
        sessionStorage.setItem('returnTo', JSON.stringify({
          path: '/',
          hash: pageRef.current !== 'home' ? `#${pageRef.current}` : '',
          scrollY: window.scrollY,
          ts: Date.now(),
        }));
      }
    };
    document.addEventListener('click', handler, true); // capture phase
    return () => document.removeEventListener('click', handler, true);
  }, []);

  // ── Navigation helper ─────────────────────────────────────────────────────
  const nav = (p: string) => {
    setPage(p);
    setMobMenu(false);
    window.scrollTo(0, 0);
    // Push a URL hash so browser back/forward tracks section changes
    const hash = p === 'home' ? '' : `#${p}`;
    window.history.pushState({ page: p }, '', `/${hash}`);
  };

  if (admin) return <Admin content={content} setContent={setContent} onClose={() => setAdmin(false)} />;

  const bg = dark ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900";
  const scrolled = scrollY > 40;
  const navBg = scrolled
    ? dark
      ? "bg-gray-950/85 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40"
      : "bg-white/85 backdrop-blur-xl border-b border-black/[0.06] shadow-lg"
    : "";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`} style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      {/* ─── SCROLL PROGRESS BAR ─── */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => nav("home")} className="group flex items-center gap-0 text-[15px] font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{content.site.name.split(" ")[0]}</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {["home", "about", "projects", "blog", "contact"].map(p => (
              <button
                key={p}
                onClick={() => nav(p)}
                className={`relative px-3.5 py-2 text-[13px] font-medium capitalize transition-all duration-200 rounded-lg
                  ${page === p
                    ? dark ? "text-white" : "text-gray-900"
                    : dark ? "text-gray-500 hover:text-gray-200" : "text-gray-500 hover:text-gray-800"}`}
              >
                {p}
                {page === p && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                )}
              </button>
            ))}
            <div className={`w-px h-4 mx-2 ${dark ? "bg-white/10" : "bg-black/10"}`} />
            <button onClick={() => setDark(!dark)} className={`p-2 rounded-lg transition-colors duration-200 ${dark ? "text-gray-500 hover:text-gray-200 hover:bg-white/8" : "text-gray-400 hover:text-gray-700 hover:bg-black/5"}`}>{dark ? icons.sun : icons.moon}</button>
            <button onClick={() => setAdmin(true)} className={`p-2 rounded-lg transition-colors duration-200 ${dark ? "text-gray-700 hover:text-gray-400 hover:bg-white/8" : "text-gray-300 hover:text-gray-500 hover:bg-black/5"}`} title="Admin">{icons.settings}</button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-1">
            <button onClick={() => setDark(!dark)} className="p-2">{dark ? icons.sun : icons.moon}</button>
            <button onClick={() => setMobMenu(!mobMenu)} className="p-2">{mobMenu ? icons.x : icons.menu}</button>
          </div>
        </div>

        {mobMenu && (
          <div className={`md:hidden border-t pb-2 ${dark ? "bg-gray-950/95 backdrop-blur-xl border-gray-800/60" : "bg-white/95 backdrop-blur-xl border-gray-200"}`}>
            {["home", "about", "projects", "blog", "contact"].map(p => (
              <button key={p} onClick={() => nav(p)} className={`block w-full text-left px-6 py-3 text-sm capitalize font-medium transition-colors ${page === p ? "text-indigo-400" : dark ? "text-gray-400" : "text-gray-600"}`}>{p}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── PAGES ─── */}
      <main className="pt-16">
        {page === "home" && <Home c={content} d={dark} nav={nav} />}
        {page === "about" && <About c={content} d={dark} />}
        {page === "projects" && <Projects c={content} d={dark} />}
        {page === "blog" && <Blog c={content} d={dark} />}
        {page === "contact" && <Contact c={content} d={dark} />}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className={`border-t ${dark ? "border-white/[0.06]" : "border-gray-200"}`}>
        {/* Footer CTA strip */}
        <div className={`py-16 ${dark ? "bg-gradient-to-b from-gray-950 to-gray-950" : "bg-gradient-to-b from-gray-50 to-white"}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`aurora-border relative overflow-hidden rounded-2xl p-8 sm:p-12 ${dark ? "bg-gradient-to-br from-indigo-950/70 via-gray-900 to-violet-950/50 border border-indigo-500/18" : "bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100"}`}>
              {/* Glows */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/12 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 dot-pulse" />
                    <span className={`text-xs font-bold tracking-[0.15em] uppercase ${dark ? "text-emerald-400" : "text-emerald-600"}`}>Available for opportunities</span>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 ${dark ? "text-white" : "text-gray-900"}`}>Seeking Summer 2026 Opportunities</h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>Investment analytics, financial data engineering, AI-augmented research, and quantitative finance roles. Available May 2026.</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <a href={`mailto:${content.contact.email}`} className="btn-primary px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-xl text-[13px] font-semibold transition-all duration-200 cta-glow flex items-center gap-2">{icons.mail} Get in touch</a>
                  <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 border flex items-center gap-2 hover:-translate-y-0.5 ${dark ? "border-white/10 text-gray-300 hover:bg-white/6 hover:border-white/15" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{icons.linkedin} LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Footer bottom bar */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t ${dark ? "border-white/[0.06]" : "border-gray-100"}`}>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${dark ? "text-gray-400" : "text-gray-600"}`}>{content.site.name}</span>
                <span className={`text-xs ${dark ? "text-gray-700" : "text-gray-300"}`}>·</span>
                <span className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>Finance × Data × AI</span>
              </div>
              <div className="flex items-center gap-1">
                {["home", "about", "projects", "contact"].map(p => (
                  <button key={p} onClick={() => nav(p)} className={`px-3 py-1.5 text-xs capitalize rounded-lg transition-colors ${dark ? "text-gray-600 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"}`}>{p}</button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {[["linkedin", content.contact.linkedin], ["github", content.contact.github]].map(([k, href]) => (
                  <a key={k} href={href as string} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-all duration-200 ${dark ? "text-gray-600 hover:text-gray-200 hover:bg-white/8" : "text-gray-400 hover:text-gray-800 hover:bg-gray-100"}`}>{icons[k]}</a>
                ))}
                <span className={`text-xs ${dark ? "text-gray-700" : "text-gray-300"}`}>©2026</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      {scrollY > 600 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-2.5 rounded-xl border transition-all duration-300 z-40 backdrop-blur-sm hover:-translate-y-0.5"
          style={{ background: dark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.1)", borderColor: dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)", color: "#818cf8", boxShadow: "0 8px 24px rgba(99,102,241,0.2)" }}
        >
          {icons.up}
        </button>
      )}
    </div>
  );
}

// ─── Section Reveal Observer ───
function useSectionReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.section-reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ═══════════════════════════════════════════════════════════════
// HOME
// ═══════════════════════════════════════════════════════════════
function Home({ c, d, nav }) {
  const { hero, projects } = c;
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  const [carIdx, setCarIdx] = useState(0);
  useSectionReveal();

  useEffect(() => {
    const cur = hero.roles[ri % hero.roles.length];
    const t = setTimeout(() => {
      if (!del) { if (ci < cur.length) setCi(ci + 1); else setTimeout(() => setDel(true), 1500); }
      else { if (ci > 0) setCi(ci - 1); else { setDel(false); setRi((ri + 1) % hero.roles.length); } }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [ci, del, ri, hero.roles]);

  const featured = projects.filter(p => p.featured);
  const cb = d ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200";
  const ch = d ? "hover:border-gray-700 hover:bg-gray-800/50" : "hover:border-gray-300 hover:bg-white";

  const CAT_COLORS = {
    "Financial Modeling (Excel)": "from-emerald-500 to-teal-500",
    "Power BI":                   "from-amber-400 to-orange-400",
    "Tableau":                    "from-blue-400 to-cyan-400",
    "GenAI Finance":              "from-violet-500 to-purple-500",
    "Python":                     "from-indigo-400 to-blue-400",
    "Financial Analytics (R)":   "from-sky-400 to-blue-400",
  };

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Fine line grid + dot texture (Vercel / Linear style) */}
        <div className={`absolute inset-0 line-grid pointer-events-none ${d ? "opacity-100" : "opacity-50"}`} />
        <div className={`absolute inset-0 dot-grid pointer-events-none ${d ? "opacity-35" : "opacity-20"}`} />
        {/* Ambient glows — elevated for more visual presence */}
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] hero-orb pointer-events-none animate-glow"
          style={{ background: d ? "rgba(99,102,241,0.11)" : "rgba(99,102,241,0.06)", "--blur": "160px" } as React.CSSProperties} />
        <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] hero-orb pointer-events-none"
          style={{ background: d ? "rgba(139,92,246,0.09)" : "rgba(139,92,246,0.05)", "--blur": "140px" } as React.CSSProperties} />
        <div className="absolute top-[30%] left-[45%] w-[400px] h-[300px] hero-orb pointer-events-none"
          style={{ background: d ? "rgba(232,121,249,0.04)" : "transparent", "--blur": "120px" } as React.CSSProperties} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 w-full">
          <div className="max-w-4xl">

            {/* Availability badge */}
            <div className="animate-fadeUp-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 text-xs font-semibold tracking-wide"
              style={{ background: d ? "rgba(16,185,129,0.07)" : "rgba(16,185,129,0.08)", borderColor: d ? "rgba(16,185,129,0.25)" : "rgba(16,185,129,0.3)", color: d ? "#34d399" : "#059669" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              Seeking Summer 2026 Finance / AI Analytics Opportunities
            </div>

            {/* Name */}
            <h1 className="animate-fadeUp-2 text-[clamp(3rem,7.5vw,5.8rem)] font-black tracking-[-0.035em] leading-[1.02] mb-3">
              <span className="shimmer-text">{hero.name}</span>
            </h1>

            {/* Subtitle — specific positioning */}
            <p className="animate-fadeUp-2 text-sm sm:text-base font-bold tracking-[0.18em] uppercase mb-5"
              style={{ color: d ? "#818cf8" : "#6366f1" }}>
              AI-Augmented Financial Analytics · Python · Investment Data Systems
            </p>

            {/* Animated role */}
            <div className="animate-fadeUp-3 h-10 mb-5 flex items-center">
              <span className={`text-xl sm:text-2xl font-semibold ${d ? "text-gray-300" : "text-gray-600"}`}>
                {hero.roles[ri % hero.roles.length].substring(0, ci)}
              </span>
              <span className="ml-0.5 text-indigo-400 font-thin text-2xl" style={{ animation: "pulse 1s ease-in-out infinite" }}>|</span>
            </div>

            {/* Description */}
            <p className={`animate-fadeUp-4 text-[1.05rem] leading-[1.8] mb-10 max-w-[600px] ${d ? "text-gray-400" : "text-gray-600"}`}>
              {hero.desc}
            </p>

            {/* CTA Buttons */}
            <div className="animate-fadeUp-5 flex flex-wrap gap-3 mb-14">
              <button
                onClick={() => nav("projects")}
                className="btn-primary px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl text-[13px] font-semibold flex items-center gap-2 cta-glow"
              >
                {hero.cta1} {icons.chevR}
              </button>
              <a
                href="/resume/Prabin Master Resume - Updated.docx"
                download="Prabin Master Resume - Updated.docx"
                className={`px-7 py-3.5 rounded-xl text-[13px] font-semibold flex items-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 ${d ? "border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/18 hover:shadow-lg hover:shadow-black/20" : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"}`}
              >
                {icons.dl} {hero.cta2}
              </a>
              <a href="https://github.com/pabin-pandey" target="_blank" rel="noopener noreferrer"
                className={`px-4 py-3.5 rounded-xl text-[13px] font-semibold flex items-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 ${d ? "border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200 hover:border-white/18" : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"}`}
                title="GitHub">
                {icons.github}
              </a>
              <a href="https://linkedin.com/in/prabin-pandey-1482362b7/" target="_blank" rel="noopener noreferrer"
                className={`px-4 py-3.5 rounded-xl text-[13px] font-semibold flex items-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 ${d ? "border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200 hover:border-white/18" : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"}`}
                title="LinkedIn">
                {icons.linkedin}
              </a>
            </div>

            {/* Stats — premium cards */}
            <div className="animate-fadeUp-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hero.stats.map((s, i) => (
                <div
                  key={i}
                  className={`stat-card relative p-5 rounded-2xl border text-center overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default ${d ? "bg-white/[0.025] border-white/[0.08] hover:border-indigo-500/28 hover:bg-white/[0.04]" : "bg-white border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-md"}`}
                >
                  <div className="number-glow text-[1.8rem] font-black tracking-tight" style={{ background: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    <Counter target={s.v} />
                  </div>
                  <div className={`text-[10px] font-bold tracking-[0.15em] uppercase mt-1 ${d ? "text-gray-600" : "text-gray-400"}`}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Credential chips */}
            <div className="animate-fadeUp-6 flex flex-wrap items-center gap-2 mt-7">
              {[
                { text: "CFA Level I", sub: "Candidate" },
                { text: "Bloomberg · FactSet · Capital IQ", sub: "Proficient" },
                { text: "Python · R · SQL", sub: "Quant Stack" },
                { text: "Fox School of Business", sub: "MS Financial Analysis" },
              ].map((chip, i) => (
                <span key={i} className="cred-chip">
                  <span>{chip.text}</span>
                  <span className="opacity-50">·</span>
                  <span className="opacity-60 font-normal">{chip.sub}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator pointer-events-none">
          <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${d ? "text-gray-700" : "text-gray-300"}`}>Scroll</span>
          <div className={`w-px h-7 ${d ? "bg-gradient-to-b from-gray-600 to-transparent" : "bg-gradient-to-b from-gray-300 to-transparent"}`} />
        </div>
      </section>

      {/* ═══ RECRUITER SNAPSHOT STRIP ═══ */}
      <div className={`py-5 border-y ${d ? "border-white/[0.05] bg-gray-900/40" : "border-gray-100 bg-gray-50"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-4">
            {[
              { label: "GPA", value: "3.98", sub: "Fox School of Business", color: "text-emerald-400" },
              { label: "Projects Built", value: "20+", sub: "Production-grade systems", color: "text-indigo-400" },
              { label: "LLMs Benchmarked", value: "9", sub: "Calibration analysis", color: "text-violet-400" },
              { label: "Designation", value: "CFA Candidate", sub: "Level I — sitting 2025", color: "text-amber-400" },
              { label: "Available", value: "May 2026", sub: "Philadelphia, PA · Open to relocation", color: "text-blue-400" },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-6 py-1 ${i > 0 ? `border-l ${d ? "border-white/[0.07]" : "border-gray-200"}` : ""}`}>
                <div className="text-center sm:text-left">
                  <div className={`text-base sm:text-lg font-black tracking-tight ${item.color}`}>{item.value}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.12em] mt-0.5 ${d ? "text-gray-500" : "text-gray-500"}`}>{item.label}</div>
                  <div className={`text-[10px] ${d ? "text-gray-700" : "text-gray-400"}`}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SKILLS MARQUEE TICKER ═══ */}
      <div className={`py-3 border-b overflow-hidden ${d ? "border-white/[0.04] bg-gray-950/60" : "border-gray-100 bg-white/70"}`}>
        <div className={`ticker-outer ${d ? "ticker-outer-dark" : "ticker-outer-light"}`}>
          <div className="ticker-track">
            {[...Array(2)].flatMap((_, ai) =>
              ["Python", "NumPy", "Pandas", "SciPy", "Streamlit", "Power BI", "Tableau", "DAX",
               "Bloomberg Terminal", "FactSet", "Capital IQ", "Excel VBA", "MySQL", "yfinance",
               "DCF Valuation", "LBO Modeling", "Black-Scholes", "Monte Carlo GBM", "CAPM",
               "Carhart 4-Factor", "Sharpe Ratio", "WACC", "SEC Filing Intelligence", "BeautifulSoup",
               "LLM Calibration", "Claude AI", "AI Governance", "CFA Candidate", "R (Statistical Analysis)"].map((skill, i) => (
                <span key={`${ai}-${i}`} className="ticker-item">
                  <span className={`text-[10px] font-bold tracking-[0.12em] uppercase whitespace-nowrap ${d ? "text-gray-600" : "text-gray-400"}`}>
                    {skill}
                  </span>
                  <span className={`w-1 h-1 rounded-full flex-shrink-0 ${d ? "bg-indigo-500/40" : "bg-indigo-300"}`} />
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══ CORE CAPABILITIES ═══ */}
      <section className={`py-24 border-t section-reveal ${d ? "border-white/[0.05] bg-gradient-to-b from-gray-950 to-gray-900/60" : "border-gray-100 bg-gradient-to-b from-white to-gray-50/80"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${d ? "text-indigo-400" : "text-indigo-600"}`}>What I Build</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Core Capabilities</h2>
            <p className={`text-sm max-w-2xl leading-relaxed ${d ? "text-gray-500" : "text-gray-500"}`}>
              Applied analytical systems built from real financial workflows — not classroom exercises. Each capability reflects production-grade work validated against institutional standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: icons.sheet,
                color: "emerald",
                title: "AI-Augmented Financial Modeling",
                desc: "Parallel WACC worksheets — one analyst-built, one Claude-assisted — enabling direct output comparison and model risk auditing. DCF, LBO, and PE exit models with scenario sensitivity analysis.",
                tools: ["Excel", "Python", "Claude", "DCF", "LBO"],
                accent: d ? "border-emerald-500/20 hover:border-emerald-500/40" : "border-emerald-200 hover:border-emerald-300",
                iconBg: d ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600",
                tagBg: d ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-700",
              },
              {
                icon: icons.bar,
                color: "violet",
                title: "Portfolio Risk & Performance Analytics",
                desc: "35-year fund analytics engine computing Sharpe ratio, max drawdown, alpha, beta, skewness, and Carhart 4-factor attribution. Live market data integration via yfinance API.",
                tools: ["Python", "yfinance", "Pandas", "NumPy", "Factor Models"],
                accent: d ? "border-violet-500/20 hover:border-violet-500/40" : "border-violet-200 hover:border-violet-300",
                iconBg: d ? "bg-violet-500/10 text-violet-400" : "bg-violet-50 text-violet-600",
                tagBg: d ? "bg-violet-500/10 text-violet-400" : "bg-violet-50 text-violet-700",
              },
              {
                icon: icons.trend,
                color: "blue",
                title: "Quantitative Derivatives Pricing",
                desc: "Black-Scholes implementation with full Greeks (Δ, Γ, Θ, ν, ρ), Monte Carlo GBM simulation (1,000 trials), CRR binomial trees (5,000× convergence analysis), and implied volatility calibration via bisection.",
                tools: ["Python", "NumPy", "SciPy", "Black-Scholes", "Monte Carlo"],
                accent: d ? "border-blue-500/20 hover:border-blue-500/40" : "border-blue-200 hover:border-blue-300",
                iconBg: d ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600",
                tagBg: d ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-700",
              },
              {
                icon: icons.db,
                color: "amber",
                title: "Financial Data Engineering",
                desc: "Multi-asset data alignment pipelines for NVDA, MSFT, SPY, and risk-free rate. SEC 10-K MD&A extraction from HTML filings (GOOGL, META, NFLX) using BeautifulSoup with regex parsing.",
                tools: ["Python", "BeautifulSoup", "Pandas", "SEC Filings", "APIs"],
                accent: d ? "border-amber-500/20 hover:border-amber-500/40" : "border-amber-200 hover:border-amber-300",
                iconBg: d ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600",
                tagBg: d ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-700",
              },
              {
                icon: icons.zap,
                color: "indigo",
                title: "Interactive Decision-Support Systems",
                desc: "Three Streamlit dashboard versions (272 → 380 → 621 lines) with rolling factor analytics, returns histograms, multi-security scatter, and CSV export. Power BI FP&A dashboards and Tableau macroeconomic intelligence platforms.",
                tools: ["Streamlit", "Power BI", "Tableau", "DAX", "Plotly"],
                accent: d ? "border-indigo-500/20 hover:border-indigo-500/40" : "border-indigo-200 hover:border-indigo-300",
                iconBg: d ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600",
                tagBg: d ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-700",
              },
              {
                icon: icons.shield,
                color: "rose",
                title: "AI Governance & Model Risk Awareness",
                desc: "Benchmarked 9 LLMs: 84% exhibited systematic overconfidence; nominal 99% CIs covered only 65% of outcomes. Documented dual-validation framework — no AI output enters a financial deliverable without human sign-off.",
                tools: ["Python", "ECE Analysis", "Statistical Testing", "LLM Calibration"],
                accent: d ? "border-rose-500/20 hover:border-rose-500/40" : "border-rose-200 hover:border-rose-300",
                iconBg: d ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600",
                tagBg: d ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-700",
              },
            ].map((cap, i) => (
              <div key={i} className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${d ? `bg-gray-900/60 ${cap.accent}` : `bg-white ${cap.accent} shadow-sm hover:shadow-md`}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${cap.iconBg}`}>
                    {cap.icon}
                  </div>
                  <h3 className={`text-[14px] font-bold leading-snug pt-1 ${d ? "text-gray-100" : "text-gray-900"}`}>{cap.title}</h3>
                </div>
                <p className={`text-[13px] leading-relaxed mb-4 ${d ? "text-gray-500" : "text-gray-600"}`}>{cap.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.tools.map(t => (
                    <span key={t} className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${cap.tagBg}`}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* AI Workflow Strip */}
          <div className={`mt-12 rounded-2xl border p-6 ${d ? "bg-gray-900/40 border-white/[0.06]" : "bg-gray-50 border-gray-200"}`}>
            <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-5 text-center ${d ? "text-gray-600" : "text-gray-400"}`}>
              AI-Augmented Workflow · Human Validation at Every Step
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
              {[
                { step: "01", label: "Market / Filing Data", sub: "yfinance · SEC · Bloomberg", icon: icons.db },
                { step: "02", label: "AI-Assisted Analysis", sub: "Python · Claude · Modeling", icon: icons.brain },
                { step: "03", label: "Human Validation", sub: "Cross-check · Source verify", icon: icons.shield },
                { step: "04", label: "Financial Output", sub: "Reports · Dashboards · Models", icon: icons.bar },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center">
                  <div className={`flex flex-col items-center text-center px-5 py-3 rounded-xl transition-all duration-200 ${d ? "hover:bg-white/[0.03]" : "hover:bg-white"}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                      i === 2 ? (d ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-50 text-emerald-600")
                              : (d ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600")
                    }`}>
                      {step.icon}
                    </div>
                    <span className={`text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5 ${d ? "text-gray-700" : "text-gray-400"}`}>{step.step}</span>
                    <span className={`text-[12px] font-semibold ${d ? "text-gray-300" : "text-gray-700"}`}>{step.label}</span>
                    <span className={`text-[10px] mt-0.5 ${d ? "text-gray-600" : "text-gray-400"}`}>{step.sub}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={`hidden sm:flex items-center text-gray-700 mx-1`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={d ? "text-gray-700" : "text-gray-300"}><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED CAROUSEL ═══ */}
      <section className={`py-28 section-reveal ${d ? "bg-gradient-to-b from-gray-950/0 via-gray-900/40 to-gray-950/0" : "bg-gradient-to-b from-white/0 via-gray-50/90 to-white/0"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${d ? "text-indigo-400" : "text-indigo-600"}`}>Applied Analytical Work</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Featured Systems</h2>
              <p className={`text-sm mt-2 ${d ? "text-gray-500" : "text-gray-500"}`}>Quantitative models, BI platforms, and AI-integrated financial systems.</p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setCarIdx(Math.max(0, carIdx - 1))}
                disabled={carIdx === 0}
                className={`p-2.5 rounded-xl border transition-all duration-200 disabled:opacity-20 hover:-translate-y-0.5 ${d ? "border-white/10 hover:bg-white/6 text-gray-400 hover:text-gray-200" : "border-gray-200 hover:bg-gray-50 text-gray-600"}`}
              >{icons.chevL}</button>
              <span className={`text-xs tabular-nums font-mono px-2 ${d ? "text-gray-600" : "text-gray-400"}`}>{String(carIdx + 1).padStart(2,"0")} / {String(featured.length).padStart(2,"0")}</span>
              <button
                onClick={() => setCarIdx(Math.min(featured.length - 1, carIdx + 1))}
                disabled={carIdx >= featured.length - 1}
                className={`p-2.5 rounded-xl border transition-all duration-200 disabled:opacity-20 hover:-translate-y-0.5 ${d ? "border-white/10 hover:bg-white/6 text-gray-400 hover:text-gray-200" : "border-gray-200 hover:bg-gray-50 text-gray-600"}`}
              >{icons.chevR}</button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateX(-${carIdx * 364}px)` }}>
              {featured.map(p => {
                const grad = CAT_COLORS[p.cat] || "from-indigo-500 to-violet-500";
                return (
                  <div key={p.id} className={`flex-shrink-0 w-[348px] rounded-2xl border overflow-hidden hover-lift card-premium cursor-pointer group transition-all duration-300 ${d ? "bg-gray-900/75 border-white/[0.08] hover:border-indigo-500/35" : "bg-white border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-lg"}`}>
                    {/* Top accent — thicker for premium feel */}
                    <div className={`h-[3px] w-full bg-gradient-to-r ${grad}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="p-2 rounded-xl" style={{ background: "rgba(99,102,241,0.1)" }}>
                          <span className="text-indigo-400">{catIcon[p.cat] || icons.code}</span>
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg tracking-wide ${d ? "bg-white/[0.06] text-gray-400" : "bg-gray-100 text-gray-500"}`}>{p.cat}</span>
                        {p.featured && <span className="ml-auto text-amber-400/80">{icons.star}</span>}
                      </div>
                      <h3 className={`text-[15px] font-semibold leading-snug mb-2.5 ${d ? "text-gray-100 group-hover:text-white" : "text-gray-900"} transition-colors`}>{p.title}</h3>
                      <p className={`text-[13px] leading-relaxed mb-4 line-clamp-3 ${d ? "text-gray-500" : "text-gray-500"}`}>{p.sum}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.slice(0, 3).map(t => (
                          <span key={t} className={`text-[11px] px-2.5 py-0.5 rounded-lg font-medium ${d ? "bg-white/[0.04] text-gray-500 border border-white/[0.07]" : "bg-gray-50 text-gray-400 border border-gray-200"}`}>{t}</span>
                        ))}
                      </div>
                      <div className={`flex items-center gap-1.5 text-[12px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors`}>
                        View project {icons.chevR}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll dots */}
          <div className="flex gap-1.5 justify-center mt-10">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarIdx(i)}
                className={`h-[3px] rounded-full transition-all duration-400 ${i === carIdx ? "w-7 bg-indigo-500" : `w-2 ${d ? "bg-white/15" : "bg-gray-300"}`}`}
              />
            ))}
          </div>

          {/* CTA to full projects */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => nav("projects")}
              className={`inline-flex items-center gap-2 text-[13px] font-semibold border px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${d ? "border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              View all {d ? "projects" : "projects"} {icons.chevR}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════════════════════
function About({ c, d }) {
  const { about } = c;

  const SKILL_CATS = {
    "Finance": { color: "from-emerald-500 to-teal-400", bg: d => d ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    "Tools":   { color: "from-amber-400 to-orange-400",  bg: d => d ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-amber-50 text-amber-700 border border-amber-200" },
    "Viz":     { color: "from-blue-400 to-cyan-400",     bg: d => d ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-700 border border-blue-200" },
    "Code":    { color: "from-indigo-500 to-violet-400", bg: d => d ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "bg-indigo-50 text-indigo-700 border border-indigo-200" },
  };

  const cb = d ? "bg-gray-900/60 border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* ── Hero intro ── */}
      <section className="mb-20">
        <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${d ? "text-indigo-400" : "text-indigo-600"}`}>About Me</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Background &amp; Expertise</h1>
        <p className={`text-[1.05rem] leading-[1.85] max-w-3xl ${d ? "text-gray-400" : "text-gray-600"}`}>{about.bio}</p>
        {/* Credential chips */}
        <div className="flex flex-wrap gap-2 mt-7">
          {[
            { label: "Fox School of Business", sub: "MS Financial Analysis" },
            { label: "CFA Level I", sub: "Candidate" },
            { label: "Bloomberg · FactSet · Capital IQ", sub: "Proficient" },
          ].map(chip => (
            <div key={chip.label} className="cred-chip">
              <span className="font-bold">{chip.label}</span>
              <span className="opacity-40">·</span>
              <span className="opacity-60 font-normal text-[10px]">{chip.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className={`p-2.5 rounded-xl ${d ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>{icons.grad}</span>
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
        </div>
        <div className="space-y-5">
          {about.education.map((ed, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden ${cb}`}>
              {/* Accent top line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 to-violet-500" />
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className={`text-base font-bold ${d ? "text-gray-100" : "text-gray-900"}`}>{ed.school}</h3>
                    <p className={`text-sm font-semibold mt-0.5 ${d ? "text-indigo-400" : "text-indigo-600"}`}>{ed.degree}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-medium px-2.5 py-1 rounded-lg ${d ? "bg-white/[0.05] text-gray-400" : "bg-gray-100 text-gray-500"}`}>{ed.period}</p>
                    <p className={`text-sm font-bold mt-1.5 ${d ? "text-gray-200" : "text-gray-800"}`}>GPA: {ed.gpa}</p>
                  </div>
                </div>
                {ed.badge && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
                    <span className="text-amber-400">{icons.award}</span>{ed.badge}
                  </span>
                )}
                <p className={`text-xs leading-relaxed ${d ? "text-gray-500" : "text-gray-500"}`}>
                  <span className={`font-semibold ${d ? "text-gray-400" : "text-gray-600"}`}>Coursework: </span>{ed.courses}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Experience Timeline ── */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className={`p-2.5 rounded-xl ${d ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}>{icons.brief}</span>
          <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        </div>
        <div className="relative">
          {/* Timeline spine */}
          <div className={`absolute left-[18px] top-3 bottom-3 w-px ${d ? "bg-gradient-to-b from-indigo-500/40 via-white/5 to-transparent" : "bg-gradient-to-b from-indigo-200 via-gray-200 to-transparent"}`} />
          <div className="space-y-6">
            {about.experience.map((exp, i) => (
              <div key={i} className="relative pl-12">
                {/* Timeline dot */}
                <div className={`absolute left-3 top-4 w-3 h-3 rounded-full border-2 ${i === 0 ? "bg-indigo-500 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]" : d ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`} />
                <div className={`rounded-2xl border ${cb} hover-lift`}>
                  <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500/60 to-teal-400/40" />
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className={`font-bold ${d ? "text-gray-100" : "text-gray-900"}`}>{exp.role}</h3>
                        <p className={`text-sm font-semibold mt-0.5 ${d ? "text-emerald-400" : "text-emerald-600"}`}>{exp.co}</p>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg shrink-0 ${d ? "bg-white/[0.05] text-gray-400" : "bg-gray-100 text-gray-500"}`}>{exp.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.pts.map((b, j) => (
                        <li key={j} className={`text-sm flex gap-2.5 leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>
                          <span className={`mt-1 flex-shrink-0 ${d ? "text-emerald-500/70" : "text-emerald-500"}`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills — grouped chips (no progress bars) ── */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className={`p-2 rounded-xl ${d ? "bg-violet-500/10 text-violet-400" : "bg-violet-50 text-violet-600"}`}>{icons.code}</span>
          <h2 className="text-2xl font-bold tracking-tight">Skills &amp; Tools</h2>
        </div>
        {[
          {
            label: "Financial Analysis",
            color: d ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-50 text-emerald-700 border border-emerald-200",
            headerColor: d ? "text-emerald-500" : "text-emerald-700",
            items: ["DCF Valuation", "LBO Modeling", "WACC / CAPM", "Derivatives Pricing", "Portfolio Analytics", "Factor Models", "Debt Covenant Analysis", "M&A / IPO Structuring", "Financial Statement Analysis"],
          },
          {
            label: "Data & Engineering",
            color: d ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "bg-indigo-50 text-indigo-700 border border-indigo-200",
            headerColor: d ? "text-indigo-400" : "text-indigo-700",
            items: ["Python (NumPy, Pandas, SciPy)", "SQL / MySQL", "R (Statistical Analysis)", "BeautifulSoup / Web Scraping", "Data Pipeline Engineering", "Excel (Advanced Modeling)", "Streamlit Development", "API Integration (yfinance)"],
          },
          {
            label: "Visualization & BI",
            color: d ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-700 border border-blue-200",
            headerColor: d ? "text-blue-400" : "text-blue-700",
            items: ["Power BI (DAX, Power Query)", "Tableau (LOD, Parameters)", "Matplotlib / Seaborn", "Plotly (Interactive Charts)", "Executive Dashboard Design"],
          },
          {
            label: "AI & Research Tools",
            color: d ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" : "bg-violet-50 text-violet-700 border border-violet-200",
            headerColor: d ? "text-violet-400" : "text-violet-700",
            items: ["Generative AI (Claude, GPT)", "LLM Calibration Testing", "Prompt-Controlled Development", "AI Model Risk Awareness", "Bloomberg Terminal", "FactSet", "Capital IQ"],
          },
        ].map(group => (
          <div key={group.label} className="mb-7">
            <p className={`text-[10px] font-bold tracking-[0.18em] uppercase mb-3 ${group.headerColor}`}>{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map(item => (
                <span key={item} className={`text-[12px] font-medium px-3 py-1.5 rounded-lg ${group.color}`}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Certifications ── */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className={`p-2.5 rounded-xl ${d ? "bg-amber-500/10 text-amber-400" : "bg-amber-50 text-amber-600"}`}>{icons.award}</span>
          <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {about.certs.map((cert, i) => (
            <div key={i} className={`flex items-center gap-4 px-6 py-4 rounded-2xl border hover-lift transition-all duration-200 ${d ? "bg-amber-500/[0.04] border-amber-500/20 hover:border-amber-500/35" : "bg-amber-50 border-amber-200 hover:border-amber-300"}`}>
              <div className={`p-2.5 rounded-xl ${d ? "bg-amber-500/15 text-amber-400" : "bg-amber-100 text-amber-600"}`}>{icons.award}</div>
              <div>
                <p className={`font-bold text-sm tracking-tight ${d ? "text-amber-300" : "text-amber-800"}`}>{cert}</p>
                <p className={`text-xs mt-0.5 ${d ? "text-amber-500/60" : "text-amber-600/70"}`}>In progress · sitting 2025</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Availability & Now ── */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className={`p-2.5 rounded-xl ${d ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600"}`}>{icons.zap}</span>
          <h2 className="text-2xl font-bold tracking-tight">Availability</h2>
        </div>
        <div className={`relative overflow-hidden rounded-2xl border p-7 ${d ? "bg-emerald-950/20 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"}`}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
          <div className="relative">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${d ? "text-emerald-400" : "text-emerald-600"}`}>Open to opportunities — Available May 2026</span>
            </div>
            <p className={`text-[15px] leading-[1.8] ${d ? "text-gray-300" : "text-gray-700"}`}>{about.now}</p>
            <div className="flex flex-wrap gap-2 mt-5">
              {["Investment Analytics", "Financial Data Engineering", "AI-Augmented Research", "Portfolio Analytics", "Quantitative Finance"].map(role => (
                <span key={role} className={`text-xs font-medium px-3 py-1.5 rounded-lg ${d ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════
function Projects({ c, d }) {
  const { projects } = c;
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState("All");
  const [exp, setExp] = useState(null);

  // Combine original projects with Python projects
  // excelProjects come FIRST so Amazon (index 0) appears before the hardcoded Pharma Brands entry
  const combinedProjects = [
    ...excelProjects.map(p => ({
      id: p.id,
      title: p.title,
      cat: "Financial Modeling (Excel)",
      yr: "2025",
      sum: p.summary,
      featured: false,
      metrics: p.metrics.map(m => m.value),
      tools: p.tools,
      technologies: p.tools,
      tags: p.tags,
      isPython: false,
      isExcel: true,
      embed: { type: "excel", url: p.embedUrl || "", fallback: "Excel Model" },
      excelProject: p,
      cs: p.caseStudy
    })),
    ...projects,
    ...pythonProjects.map(p => ({
      id: p.id,
      title: p.title,
      cat: "Python",
      yr: "2025",
      sum: p.summary,
      featured: false,
      metrics: p.metrics.map(m => m.value),
      tools: p.technologies,
      technologies: p.technologies,
      tags: p.tags.map(t => t.name),
      description: p.description,
      isPython: true,
      summary: p.summary,
      caseStudy: p.caseStudy,
      pythonProject: p,
      cs: p.caseStudy || {
        problem: 'Professional project developed during advanced coursework.',
        approach: p.description,
        data: 'Leveraging real financial datasets and structured approaches.',
        methods: 'Advanced techniques including ' + p.technologies.join(', '),
        results: 'Successfully implemented and validated solution with measurable outcomes.',
        learnings: 'Deep expertise developed in ' + p.category.replace('-', ' ')
      }
    })),
    ...rProjects.map(p => ({
      id: p.id,
      title: p.title,
      cat: "Financial Analytics (R)",
      yr: "2025",
      sum: p.summary,
      featured: false,
      metrics: p.metrics.map(m => m.value),
      tools: p.tools,
      technologies: p.tools,
      tags: p.tags,
      isPython: false,
      isExcelModel: false,
      isRProject: true,
      rProject: p,
      cs: p.caseStudy
    }))
  ];

  // ─── SAFEGUARD: Validate Excel projects have required fields ───
  useEffect(() => {
    const excelProjectsInList = combinedProjects.filter(p => p.isExcel);
    excelProjectsInList.forEach(p => {
      if (!p.cs) console.warn(`⚠️ Excel project "${p.title}" missing case study data`);
      if (!p.embed?.url) console.warn(`⚠️ Excel project "${p.title}" missing embed URL — will use interactive viewer`);
    });
  }, []);

  const CAT_ACCENT: Record<string, string> = {
    "Financial Modeling (Excel)": "from-emerald-500 to-teal-400",
    "Power BI":                   "from-amber-400 to-orange-400",
    "Tableau":                    "from-blue-400 to-cyan-400",
    "GenAI Finance":              "from-violet-500 to-purple-400",
    "Python":                     "from-indigo-500 to-blue-400",
    "Financial Analytics (R)":   "from-sky-400 to-blue-400",
  };
  const CAT_LINK_COLOR: Record<string, string> = {
    "Financial Modeling (Excel)": "text-emerald-400 hover:text-emerald-300",
    "Power BI":                   "text-amber-400 hover:text-amber-300",
    "Tableau":                    "text-blue-400 hover:text-blue-300",
    "GenAI Finance":              "text-violet-400 hover:text-violet-300",
    "Python":                     "text-indigo-400 hover:text-indigo-300",
    "Financial Analytics (R)":   "text-sky-400 hover:text-sky-300",
  };

  const cats = ["All", ...new Set(combinedProjects.map(p => p.cat))];
  const filtered = combinedProjects.filter(p => {
    const ms = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return ms && (catF === "All" || p.cat === catF);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-14">
        <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${d ? "text-indigo-400" : "text-indigo-600"}`}>Portfolio</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">Projects</h1>
        <p className={`text-base ${d ? "text-gray-500" : "text-gray-500"}`}>{combinedProjects.length} projects across finance, data, and AI</p>
      </div>

      {/* Search */}
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border mb-5 transition-all duration-200 ${d ? "bg-white/[0.025] border-white/[0.08] focus-within:border-indigo-500/35 focus-within:bg-white/[0.04] focus-within:shadow-lg focus-within:shadow-indigo-500/5" : "bg-white border-gray-200 focus-within:border-indigo-300 focus-within:shadow-md"}`}>
        <span className={d ? "text-gray-600" : "text-gray-400"}>{icons.search}</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title, technology, or topic..."
          className={`flex-1 bg-transparent text-sm outline-none ${d ? "placeholder-gray-700 text-gray-200" : "placeholder-gray-400 text-gray-800"}`}
        />
        {search && (
          <button onClick={() => setSearch("")} className={`text-xs transition-colors ${d ? "text-gray-600 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>{icons.x}</button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {cats.map(ct => {
          const grad = CAT_ACCENT[ct];
          const active = catF === ct;
          return (
            <button
              key={ct}
              onClick={() => setCatF(ct)}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-semibold transition-all duration-200 border ${
                active
                  ? "text-white border-transparent shadow-lg shadow-indigo-500/20"
                  : d
                    ? "bg-white/[0.03] border-white/8 text-gray-400 hover:text-white hover:border-white/15"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
              style={active ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)" } : {}}
            >{ct}</button>
          );
        })}
        {catF !== "All" && (
          <span className={`self-center ml-1 text-xs ${d ? "text-gray-600" : "text-gray-400"}`}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map(p => {
          const isExp = exp === p.id;
          const grad = CAT_ACCENT[p.cat] || "from-indigo-500 to-violet-500";
          const linkColor = CAT_LINK_COLOR[p.cat] || "text-indigo-400 hover:text-indigo-300";
          return (
            <div key={p.id} className={`card-premium rounded-2xl border overflow-hidden transition-all duration-300 hover-lift group ${isExp ? "lg:col-span-2" : ""} ${d ? "bg-gray-900/65 border-white/[0.07] hover:border-indigo-500/22" : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg"}`}>
              {/* Category accent line */}
              <div className={`h-[3px] w-full bg-gradient-to-r ${grad}`} />
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${d ? "bg-white/[0.05] text-gray-400" : "bg-gray-100 text-gray-500"}`}>{p.cat}</span>
                  <span className={`text-[11px] ${d ? "text-gray-700" : "text-gray-300"}`}>{p.yr}</span>
                  {p.featured && <span className="ml-auto text-amber-400 opacity-80">{icons.star}</span>}
                </div>
                <h3 className={`text-[1.05rem] font-semibold leading-snug mb-2.5 transition-colors ${d ? "text-gray-100 group-hover:text-white" : "text-gray-900"}`}>{p.title}</h3>
                <p className={`text-[13px] leading-relaxed mb-4 ${d ? "text-gray-500" : "text-gray-500"}`}>{p.sum}</p>
                {p.metrics && p.metrics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.metrics.slice(0,4).map((m, i) => (
                      <span key={i} className="metric-badge text-[11px] px-2.5 py-1 rounded-lg font-medium">{m}</span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tools.map(t => (
                    <span key={t} className="tag-tool text-[11px] px-2 py-0.5 rounded-lg font-medium">{t}</span>
                  ))}
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="tag-label text-[11px] px-2 py-0.5 rounded-lg">{t}</span>
                  ))}
                </div>
                {p.isRProject ? (
                  <Link href={`/r-projects/${p.id}`} className={`text-[13px] font-semibold flex items-center gap-1.5 transition-colors ${linkColor}`}>
                    Open Case Study {icons.chevR}
                  </Link>
                ) : p.isExcel ? (
                  <button onClick={() => setExp(isExp ? null : p.id)} className={`text-[13px] font-semibold flex items-center gap-1.5 transition-colors ${linkColor}`}>
                    {isExp ? "Close" : "View Case Study"} <span className={`transition-transform inline-block ${isExp ? "rotate-180" : ""}`}>{icons.chevD}</span>
                  </button>
                ) : p.isPython && p.pythonProject ? (
                  <Link href={`/projects/${p.pythonProject.id}`} className={`text-[13px] font-semibold flex items-center gap-1.5 transition-colors ${linkColor}`}>
                    Open Case Study {icons.chevR}
                  </Link>
                ) : p.isGenAI ? (
                  <Link href={`/genai-projects/${p.id}`} className={`text-[13px] font-semibold flex items-center gap-1.5 transition-colors ${linkColor}`}>
                    Open Case Study {icons.chevR}
                  </Link>
                ) : (
                  <button onClick={() => setExp(isExp ? null : p.id)} className={`text-[13px] font-semibold flex items-center gap-1.5 transition-colors ${linkColor}`}>
                    {isExp ? "Close" : "View Case Study"} <span className={`transition-transform inline-block ${isExp ? "rotate-180" : ""}`}>{icons.chevD}</span>
                  </button>
                )}
              </div>

              {isExp && p.cs && !p.isPython && (
                <div className={`border-t ${d ? "border-gray-800" : "border-gray-200"}`}>
                  {p.isGenAI && <GenAIDemo d={d} />}
                  {p.isExcel && p.id === "pe" && <ExcelModelViewer d={d} />}
                  {p.isPBI && <PBIDashboardViewer d={d} p={p} />}
                  {p.isTableau && <TableauDashboardViewer d={d} vizUrl={p.embed?.url} />}
                  {/* Excel projects (non-Pharma) use tabbed interface */}
                  {p.isExcel && p.id !== "pe" && <ExcelCaseStudyViewer d={d} p={p} />}
                  {/* Non-Excel projects show case study inline */}
                  {!p.isExcel && !p.isGenAI && !p.isPBI && !p.isTableau && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { icon: icons.target, label: "Problem", text: p.cs.problem },
                          { icon: icons.zap, label: "Approach", text: p.cs.approach },
                          { icon: icons.db, label: "Data Sources", text: p.cs.data },
                          { icon: icons.code, label: "Methods", text: p.cs.methods },
                          { icon: icons.trend, label: "Results", text: p.cs.results },
                          { icon: icons.book, label: "Learnings", text: p.cs.learnings },
                        ].map(({ icon, label, text }) => (
                          <div key={label}>
                            <div className="flex items-center gap-2 mb-2"><span className="text-blue-500">{icon}</span><h4 className="font-semibold text-sm">{label}</h4></div>
                            <p className={`text-sm leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ─── Tableau Public Embed ───
function TableauPublicEmbed({ vizUrl, title }) {
  const [containerHeight, setContainerHeight] = useState(1000);

  useEffect(() => {
    const updateHeight = () => {
      const screenHeight = window.innerHeight;
      const optimalHeight = Math.max(screenHeight - 200, 1000);
      setContainerHeight(optimalHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const embedUrl = vizUrl
    ? `${vizUrl}?:embed=yes&:showVizHome=no&:toolbar=yes&:host_url=https%3A%2F%2Fpublic.tableau.com%2F`
    : '';

  if (!embedUrl) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>No dashboard URL provided</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: '#fff' }}>
      <iframe
        src={embedUrl}
        style={{
          width: '100%',
          height: `${containerHeight}px`,
          border: 'none',
          borderRadius: '0.5rem',
          display: 'block',
          minHeight: '1000px'
        }}
        frameBorder="0"
        allowFullScreen
        allow="fullscreen"
        title={title || 'Tableau Dashboard'}
        sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}

// ─── Tableau Dashboard Viewer ───
function TableauDashboardViewer({ d, vizUrl }) {
  const [activeIndicator, setActiveIndicator] = useState("GDP");
  const [activeCountry, setActiveCountry] = useState("All");
  const [activeView, setActiveView] = useState("kpi");

  const COUNTRIES = ["China", "India", "Russia", "USA"];
  const INDICATORS = ["GDP", "Inflation", "Unemployment", "FDI % GDP", "Real Int. Rate"];

  const COUNTRY_COLORS = { China: "#D81B27", India: "#FF6B2B", Russia: "#1565C0", USA: "#1B3A6B" };

  const DATA = {
    GDP: {
      values: { China: 18530, India: 3940, Russia: 2240, USA: 28780 },
      unit: "USD Billions", yoy: { China: 5.0, India: 7.2, Russia: 3.6, USA: 2.7 },
      trend: {
        China:  [7.0, 6.7, 6.9, 6.7, 6.1, -2.0, 8.5, 3.0, 5.2, 5.0],
        India:  [8.0, 8.2, 6.8, 6.5, 5.0, -5.8, 9.1, 6.9, 8.2, 7.2],
        Russia: [0.7, -0.3, 1.8, 2.8, 1.3, -2.7, 5.6, -2.1, 3.6, 3.6],
        USA:    [2.9, 1.6, 2.3, 2.9, 2.3, -2.8, 5.9, 2.1, 2.5, 2.7],
      },
      volatility: { China: 2.8, India: 3.4, Russia: 4.9, USA: 2.1 },
    },
    Inflation: {
      values: { China: 0.2, India: 4.8, Russia: 8.1, USA: 3.4 },
      unit: "% Annual", yoy: { China: -0.3, India: 0.6, Russia: 1.2, USA: -1.1 },
      trend: {
        China:  [1.4, 2.0, 1.6, 2.1, 2.9, 2.5, 0.9, 1.9, 0.2, 0.2],
        India:  [4.9, 4.5, 3.3, 3.9, 3.7, 6.2, 5.5, 6.7, 5.4, 4.8],
        Russia: [12.9, 7.0, 3.7, 2.9, 4.5, 3.4, 6.7, 13.7, 5.9, 8.1],
        USA:    [0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 3.4],
      },
      volatility: { China: 0.7, India: 1.0, Russia: 3.2, USA: 2.1 },
    },
    Unemployment: {
      values: { China: 5.0, India: 8.0, Russia: 2.4, USA: 3.7 },
      unit: "% Labor Force", yoy: { China: 0.1, India: -0.3, Russia: -0.2, USA: -0.1 },
      trend: {
        China:  [4.1, 4.0, 3.9, 3.8, 3.6, 5.4, 5.1, 5.5, 5.2, 5.0],
        India:  [9.0, 8.8, 8.5, 7.4, 7.7, 10.3, 8.0, 7.3, 8.2, 8.0],
        Russia: [5.6, 5.4, 5.2, 4.8, 4.6, 5.8, 4.8, 3.9, 3.2, 2.4],
        USA:    [5.3, 4.9, 4.3, 3.9, 3.5, 8.1, 5.4, 3.6, 3.4, 3.7],
      },
      volatility: { China: 0.5, India: 0.9, Russia: 0.9, USA: 1.4 },
    },
    "FDI % GDP": {
      values: { China: 0.5, India: 0.9, Russia: -0.3, USA: 1.8 },
      unit: "% of GDP", yoy: { China: -0.1, India: 0.2, Russia: -0.5, USA: 0.3 },
      trend: {
        China:  [2.0, 1.8, 1.4, 1.4, 1.2, 1.4, 1.9, 0.9, 0.3, 0.5],
        India:  [1.9, 2.0, 1.7, 2.0, 1.8, 2.1, 1.5, 1.5, 1.5, 0.9],
        Russia: [0.4, 2.3, 1.7, 2.7, 2.2, 0.9, 3.1, -1.4, -1.2, -0.3],
        USA:    [2.7, 2.5, 1.9, 1.4, 1.8, 1.0, 2.2, 1.9, 1.5, 1.8],
      },
      volatility: { China: 0.5, India: 0.2, Russia: 1.6, USA: 0.5 },
    },
    "Real Int. Rate": {
      values: { China: 1.8, India: 1.2, Russia: -4.5, USA: 2.1 },
      unit: "%", yoy: { China: 0.3, India: -0.4, Russia: -2.1, USA: 1.2 },
      trend: {
        China:  [3.2, 2.8, 2.5, 1.9, 2.5, 3.5, 2.8, 1.5, 2.1, 1.8],
        India:  [4.1, 3.5, 2.9, 3.1, 2.8, 1.9, 1.6, -1.7, -0.4, 1.2],
        Russia: [5.2, 0.3, 3.3, 2.1, 2.7, 2.6, -0.3, -9.8, -0.7, -4.5],
        USA:    [-0.1, -0.8, 0.1, 0.5, 0.7, -1.6, -3.7, -6.1, 1.2, 2.1],
      },
      volatility: { China: 0.6, India: 1.6, Russia: 4.2, USA: 2.5 },
    },
  };

  const ind = DATA[activeIndicator] || DATA["GDP"];
  const years = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
  const displayCountries = activeCountry === "All" ? COUNTRIES : [activeCountry];

  const allTrendVals = displayCountries.flatMap(c => ind.trend[c]);
  const trendMin = Math.min(...allTrendVals);
  const trendMax = Math.max(...allTrendVals);
  const trendRange = trendMax - trendMin || 1;

  const maxVol = Math.max(...COUNTRIES.map(c => ind.volatility[c]));
  const cb = d ? "bg-gray-900/60 border-gray-700" : "bg-white border-gray-200";
  const titleC = d ? "text-gray-100" : "text-gray-900";
  const subC = d ? "text-gray-400" : "text-gray-500";
  const DARK_HEADER = d ? "#0D1B2A" : "#F0F4F8";

  return (
    <div className="mb-8">
      <h4 className={`font-semibold mb-4 flex items-center gap-2 ${titleC}`}>
        <span className="text-blue-500">{icons.trend}</span> Dashboard Deep Dive — Global Macro Intelligence
      </h4>

      {/* View Tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {[{ id: "kpi", label: "KPI Snapshots" }, { id: "trend", label: "Trend Analysis" }, { id: "volatility", label: "Volatility Index" }, { id: "embed", label: "Live Dashboard" }].map(v => (
          <button key={v.id} onClick={() => setActiveView(v.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeView === v.id ? "bg-blue-600 text-white" : d ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {v.label}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border overflow-hidden ${d ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}>

        {/* Header Bar */}
        <div className="px-5 py-3 flex items-center justify-between flex-wrap gap-3"
          style={{ background: DARK_HEADER, borderBottom: "2px solid #2563EB" }}>
          <div>
            <p className={`text-sm font-bold ${titleC}`}>Global Macroeconomic Intelligence Dashboard</p>
            <p className={`text-xs ${subC}`}>China · India · Russia · USA | World Bank Data 1990–2024</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <select value={activeIndicator} onChange={e => setActiveIndicator(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium ${d ? "bg-gray-900 border-gray-600 text-gray-300" : "bg-white border-gray-300 text-gray-700"}`}>
              {INDICATORS.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <select value={activeCountry} onChange={e => setActiveCountry(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium ${d ? "bg-gray-900 border-gray-600 text-gray-300" : "bg-white border-gray-300 text-gray-700"}`}>
              <option value="All">All Countries</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="p-5">

          {/* KPI VIEW */}
          {activeView === "kpi" && (
            <div>
              <p className={`text-xs font-semibold mb-4 uppercase tracking-widest ${subC}`}>
                Latest Values — {activeIndicator} ({ind.unit})
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {COUNTRIES.map(c => {
                  const up = ind.yoy[c] >= 0;
                  const color = COUNTRY_COLORS[c];
                  return (
                    <div key={c} onClick={() => setActiveCountry(activeCountry === c ? "All" : c)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${activeCountry === c || activeCountry === "All" ? "" : "opacity-40"} ${cb}`}
                      style={{ borderLeft: `4px solid ${color}` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold" style={{ color }}>{c}</span>
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${up ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                          {up ? "▲" : "▼"} {Math.abs(ind.yoy[c])}%
                        </span>
                      </div>
                      <p className={`text-xl font-bold ${titleC}`}>
                        {activeIndicator === "GDP"
                          ? `$${ind.values[c].toLocaleString()}B`
                          : `${ind.values[c]}%`}
                      </p>
                      <p className={`text-xs mt-1 ${subC}`}>{ind.unit}</p>
                    </div>
                  );
                })}
              </div>
              {/* Mini spark bars */}
              <div className={`rounded-lg border p-4 ${cb}`}>
                <p className={`text-xs font-semibold mb-3 uppercase tracking-widest ${subC}`}>
                  Relative Standing — {activeIndicator}
                </p>
                <div className="space-y-3">
                  {[...COUNTRIES].sort((a, b) => Math.abs(ind.values[b]) - Math.abs(ind.values[a])).map(c => {
                    const maxVal = Math.max(...COUNTRIES.map(x => Math.abs(ind.values[x])));
                    const pct = (Math.abs(ind.values[c]) / maxVal) * 100;
                    return (
                      <div key={c} className="flex items-center gap-3">
                        <span className="text-xs font-bold w-12 text-right" style={{ color: COUNTRY_COLORS[c] }}>{c}</span>
                        <div className={`flex-1 h-5 rounded ${d ? "bg-gray-700" : "bg-gray-200"} overflow-hidden`}>
                          <div className="h-full rounded transition-all duration-700 flex items-center pl-2"
                            style={{ width: `${pct}%`, background: COUNTRY_COLORS[c], opacity: 0.85 }}>
                            <span className="text-white text-xs font-semibold">
                              {activeIndicator === "GDP" ? `$${ind.values[c].toLocaleString()}B` : `${ind.values[c]}%`}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TREND VIEW */}
          {activeView === "trend" && (
            <div>
              <p className={`text-xs font-semibold mb-4 uppercase tracking-widest ${subC}`}>
                {activeIndicator} Trend | 2015–2024 | {activeCountry === "All" ? "All Countries" : activeCountry}
              </p>
              <div className={`rounded-lg border p-4 ${cb}`}>
                <svg viewBox="0 0 600 180" className="w-full h-auto">
                  <defs>
                    {displayCountries.map(c => (
                      <linearGradient key={c} id={`grad-${c}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COUNTRY_COLORS[c]} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={COUNTRY_COLORS[c]} stopOpacity="0" />
                      </linearGradient>
                    ))}
                  </defs>
                  {/* Grid lines */}
                  {[40, 80, 120].map(y => (
                    <line key={y} x1="40" y1={y} x2="580" y2={y} stroke={d ? "#1F2937" : "#E5E7EB"} strokeWidth="0.5" />
                  ))}
                  {/* Zero line if needed */}
                  {trendMin < 0 && (
                    <line x1="40" y1={40 + (trendMax / trendRange) * 120} x2="580"
                      y2={40 + (trendMax / trendRange) * 120}
                      stroke={d ? "#374151" : "#9CA3AF"} strokeWidth="1" strokeDasharray="4 3" />
                  )}
                  {/* COVID annotation */}
                  {(() => {
                    const covidX = 40 + 5 * (540 / 9);
                    return (
                      <g>
                        <line x1={covidX} y1="35" x2={covidX} y2="155" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        <text x={covidX + 3} y="46" fill="#F59E0B" fontSize="7" opacity="0.8">COVID-19</text>
                      </g>
                    );
                  })()}
                  {/* Lines per country */}
                  {displayCountries.map(c => {
                    const pts = ind.trend[c].map((v, i) => ({
                      x: 40 + i * (540 / 9),
                      y: 40 + ((trendMax - v) / trendRange) * 120
                    }));
                    const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
                    const areaD = `${lineD} L${pts[pts.length - 1].x},160 L${pts[0].x},160 Z`;
                    return (
                      <g key={c}>
                        <path d={areaD} fill={`url(#grad-${c})`} />
                        <path d={lineD} fill="none" stroke={COUNTRY_COLORS[c]} strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round"
                          opacity={activeCountry === "All" || activeCountry === c ? 1 : 0.2} />
                        {pts.map((p, i) => (
                          <circle key={i} cx={p.x} cy={p.y} r="3" fill={COUNTRY_COLORS[c]}
                            stroke={d ? "#111827" : "#FFF"} strokeWidth="1.5"
                            opacity={activeCountry === "All" || activeCountry === c ? 1 : 0.2} />
                        ))}
                      </g>
                    );
                  })}
                  {/* X-axis labels */}
                  {years.map((yr, i) => (
                    <text key={yr} x={40 + i * (540 / 9)} y={172} textAnchor="middle"
                      fill={d ? "#6B7280" : "#9CA3AF"} fontSize="8">{yr}</text>
                  ))}
                  {/* Y-axis label */}
                  <text x="12" y="100" textAnchor="middle" fill={d ? "#6B7280" : "#9CA3AF"}
                    fontSize="8" transform="rotate(-90 12 100)">{ind.unit}</text>
                </svg>
                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-2 justify-center">
                  {displayCountries.map(c => (
                    <span key={c} className="flex items-center gap-1.5 text-xs cursor-pointer"
                      onClick={() => setActiveCountry(activeCountry === c ? "All" : c)}>
                      <span className="w-4 h-1.5 rounded-full inline-block" style={{ background: COUNTRY_COLORS[c] }} />
                      <span className={subC}>{c}</span>
                    </span>
                  ))}
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="w-4 h-0.5 inline-block" style={{ background: "#F59E0B", borderTop: "1px dashed #F59E0B" }} />
                    <span className={subC}>COVID-19 (2020)</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* VOLATILITY VIEW */}
          {activeView === "volatility" && (
            <div>
              <p className={`text-xs font-semibold mb-4 uppercase tracking-widest ${subC}`}>
                Economic Volatility Index — {activeIndicator} | STDEV 1990–2024
              </p>
              <div className={`rounded-lg border p-4 ${cb}`}>
                <svg viewBox="0 0 500 180" className="w-full h-auto">
                  {/* Avg reference line */}
                  {(() => {
                    const avg = COUNTRIES.reduce((s, c) => s + ind.volatility[c], 0) / 4;
                    const y = 155 - (avg / maxVol) * 120;
                    return (
                      <g>
                        <line x1="30" y1={y} x2="470" y2={y} stroke={d ? "#374151" : "#9CA3AF"} strokeWidth="1" strokeDasharray="4 3" />
                        <text x="472" y={y + 4} fill={d ? "#6B7280" : "#9CA3AF"} fontSize="8">avg</text>
                      </g>
                    );
                  })()}
                  {COUNTRIES.map((c, i) => {
                    const bw = 72;
                    const x = 40 + i * 110;
                    const h = (ind.volatility[c] / maxVol) * 120;
                    const color = COUNTRY_COLORS[c];
                    return (
                      <g key={c}>
                        <rect x={x} y={155 - h} width={bw} height={h} rx={4} fill={color} opacity={0.85}>
                          <animate attributeName="height" from="0" to={h} dur="0.6s" fill="freeze" />
                          <animate attributeName="y" from="155" to={155 - h} dur="0.6s" fill="freeze" />
                        </rect>
                        <text x={x + bw / 2} y={148 - h} textAnchor="middle"
                          fill={d ? "#D1D5DB" : "#374151"} fontSize="11" fontWeight="700">
                          {ind.volatility[c]}
                        </text>
                        <text x={x + bw / 2} y={170} textAnchor="middle"
                          fill={color} fontSize="10" fontWeight="700">{c}</text>
                      </g>
                    );
                  })}
                  <text x="250" y="180" textAnchor="middle" fill={d ? "#4B5563" : "#9CA3AF"} fontSize="8">
                    Standard Deviation of {activeIndicator} — Higher = More Volatile
                  </text>
                </svg>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {COUNTRIES.map(c => (
                    <div key={c} className={`p-3 rounded-lg border text-center ${cb}`} style={{ borderTop: `3px solid ${COUNTRY_COLORS[c]}` }}>
                      <p className="text-xs font-bold mb-1" style={{ color: COUNTRY_COLORS[c] }}>{c}</p>
                      <p className={`text-lg font-bold ${titleC}`}>{ind.volatility[c]}</p>
                      <p className={`text-xs ${subC}`}>σ {ind.unit}</p>
                      <p className={`text-xs mt-1 ${ind.volatility[c] === maxVol ? "text-red-400" : ind.volatility[c] === Math.min(...COUNTRIES.map(x => ind.volatility[x])) ? "text-green-400" : subC}`}>
                        {ind.volatility[c] === maxVol ? "Most volatile" : ind.volatility[c] === Math.min(...COUNTRIES.map(x => ind.volatility[x])) ? "Most stable" : "Moderate"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EMBED VIEW */}
          {activeView === "embed" && (
            <div>
              {vizUrl ? (
                <TableauPublicEmbed vizUrl={vizUrl} title="Global Macroeconomic Intelligence Dashboard" />
              ) : (
                <div className={`flex flex-col items-center justify-center h-48 text-center rounded-lg border ${cb}`}>
                  <span className={`mb-3 ${subC}`}>{icons.trend}</span>
                  <p className={`text-sm font-medium mb-1 ${titleC}`}>Live Tableau Dashboard</p>
                  <p className={`text-xs ${subC}`}>Dashboard URL not available</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Power BI Dashboard Viewer ───
function PBIDashboardViewer({ d, p }) {
  const [activeView, setActiveView] = useState("dashboard");
  const [quarter, setQuarter] = useState("All");
  const views = [
    { id: "dashboard", label: "Dashboard Preview" },
    { id: "dax", label: "DAX Measures" },
    { id: "finance", label: "Finance Connection" },
    { id: "embed", label: "Live Dashboard" },
  ];

  const TU_RED = "#990000";
  const TU_LOGO = "data:image/png;base64,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";

  // Quarter-filtered data
  const allData = {
    "All":     { total: 48271, mean: 847, spikes: 14, maxSpikes: 23, mostDay: "Monday", mostDayAvg: 892,
                  weekly: [892, 847, 831, 798, 654, 187, 124], wdTotal: 4022, weTotal: 311,
                  monthly: [320, 410, 485, 520, 390, 280, 145, 160, 510, 580, 540, 350],
                  spikeLog: [{ c: 1247, d: "Oct 14" }, { c: 1189, d: "Sep 22" }, { c: 1156, d: "Nov 3" }, { c: 1098, d: "Mar 18" }] },
    "2024-Q1": { total: 9856, mean: 812, spikes: 2, maxSpikes: 23, mostDay: "Monday", mostDayAvg: 901,
                  weekly: [901, 830, 805, 775, 640, 170, 115], wdTotal: 3951, weTotal: 285,
                  monthly: [320, 410, 485, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  spikeLog: [{ c: 1098, d: "Mar 18" }, { c: 1042, d: "Feb 7" }] },
    "2024-Q2": { total: 9340, mean: 778, spikes: 1, maxSpikes: 23, mostDay: "Tuesday", mostDayAvg: 856,
                  weekly: [845, 856, 810, 765, 630, 195, 130], wdTotal: 3906, weTotal: 325,
                  monthly: [0, 0, 0, 520, 390, 280, 0, 0, 0, 0, 0, 0],
                  spikeLog: [{ c: 1067, d: "Apr 22" }] },
    "2024-Q3": { total: 6720, mean: 560, spikes: 0, maxSpikes: 23, mostDay: "Wednesday", mostDayAvg: 625,
                  weekly: [610, 595, 625, 580, 490, 155, 105], wdTotal: 2900, weTotal: 260,
                  monthly: [0, 0, 0, 0, 0, 0, 145, 160, 510, 0, 0, 0],
                  spikeLog: [] },
    "2024-Q4": { total: 12890, mean: 920, spikes: 6, maxSpikes: 23, mostDay: "Monday", mostDayAvg: 1024,
                  weekly: [1024, 965, 940, 905, 748, 210, 140], wdTotal: 4582, weTotal: 350,
                  monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 580, 540, 350],
                  spikeLog: [{ c: 1247, d: "Oct 14" }, { c: 1189, d: "Nov 5" }, { c: 1156, d: "Nov 3" }, { c: 1134, d: "Oct 28" }] },
    "2025-Q1": { total: 9465, mean: 876, spikes: 5, maxSpikes: 23, mostDay: "Monday", mostDayAvg: 978,
                  weekly: [978, 910, 885, 850, 698, 195, 138], wdTotal: 4321, weTotal: 333,
                  monthly: [490, 520, 510, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  spikeLog: [{ c: 1201, d: "Jan 27" }, { c: 1178, d: "Feb 10" }, { c: 1145, d: "Mar 3" }] },
  };

  const qd = allData[quarter] || allData["All"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const maxW = Math.max(...qd.weekly);
  const maxM = Math.max(...qd.monthly.filter(v => v > 0)) || 1;
  const quarters = ["All", "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4", "2025-Q1"];
  const cb = d ? "bg-gray-900/50 border-gray-700" : "bg-white border-gray-200";

  return (
    <div className="mb-8">
      <h4 className="font-semibold mb-4 flex items-center gap-2"><span className="text-blue-500">{icons.bar}</span> Dashboard Deep Dive — Ambler Campus Visitor Traffic</h4>
      <div className="flex gap-1 mb-3 overflow-x-auto">
        {views.map(v => (
          <button key={v.id} onClick={() => setActiveView(v.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeView === v.id ? "text-white" : d ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`} style={activeView === v.id ? { background: TU_RED } : {}}>{v.label}</button>
        ))}
      </div>
      <div className={`rounded-xl border overflow-hidden ${d ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"}`}>

        {activeView === "dashboard" && (
          <div className="p-0">
            <div className="px-5 py-3 flex items-center justify-between" style={{ background: d ? "#1a0000" : "#F5F0F0", borderBottom: `3px solid ${TU_RED}` }}>
              <div className="flex items-center gap-3">
                <img src={TU_LOGO} alt="Temple University" className="h-9 w-auto" />
                <div>
                  <h3 className={`text-sm font-bold ${d ? "text-gray-100" : "text-gray-900"}`}>Visitor Traffic Analysis – Ambler Campus</h3>
                  <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>Temple University</p>
                </div>
              </div>
              <select value={quarter} onChange={e => setQuarter(e.target.value)} className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${d ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-white border-gray-300"}`}>
                {quarters.map(q => <option key={q} value={q}>{q === "All" ? "All Quarters" : q}</option>)}
              </select>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { l: "Total Visits", v: qd.total.toLocaleString(), trend: quarter === "All" ? "+12.3% YoY" : `${quarter}`, up: true },
                  { l: "Visitor Mean", v: qd.mean.toLocaleString(), trend: "daily average", up: null },
                  { l: "Most Visited Day", v: qd.mostDay, trend: `avg ${qd.mostDayAvg} visitors`, up: null },
                  { l: "Visitor Spikes", v: qd.spikes.toString(), trend: `of ${qd.maxSpikes} all-time`, up: qd.spikes > 3 },
                ].map((kpi, i) => (
                  <div key={i} className={`p-3 rounded-lg border transition-all duration-300 ${cb}`} style={{ borderLeft: `3px solid ${i === 0 ? TU_RED : i === 1 ? "#222" : i === 2 ? "#3599B8" : "#FE9666"}` }}>
                    <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>{kpi.l}</p>
                    <p className={`text-xl font-bold transition-all duration-300 ${d ? "text-gray-100" : "text-gray-900"}`}>{kpi.v}</p>
                    <p className={`text-xs font-medium ${kpi.up === true ? "text-green-400" : (d ? "text-gray-500" : "text-gray-400")}`}>{kpi.trend}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className={`p-4 rounded-lg border ${cb}`}>
                  <p className="text-xs font-semibold mb-3" style={{ color: TU_RED }}>Ambler Traffic Analysis</p>
                  <svg viewBox="0 0 500 140" className="w-full h-auto">
                    <defs><linearGradient id="tuGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={TU_RED} stopOpacity="0.25"/><stop offset="100%" stopColor={TU_RED} stopOpacity="0"/></linearGradient></defs>
                    {[30, 60, 90].map(y => <line key={y} x1="30" y1={y} x2="480" y2={y} stroke={d ? "#1F2937" : "#E5E7EB"} strokeWidth="0.5"/>)}
                    {(() => { const pts = qd.monthly.map((v, i) => ({ x: 30 + i * (450/11), y: v > 0 ? 120 - (v/maxM)*95 : 120 })); const activePts = pts.filter((_, i) => qd.monthly[i] > 0); if (activePts.length < 2) return null; const line = activePts.map(p => `${p.x},${p.y}`).join(" "); const area = `M${line.split(" ").join(" L")} L${activePts[activePts.length-1].x},120 L${activePts[0].x},120 Z`; return (<><path d={area} fill="url(#tuGrad)"/><polyline points={line} fill="none" stroke={TU_RED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>{activePts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={TU_RED} stroke={d ? "#111827" : "#FFF"} strokeWidth="1.5"/>)}</>); })()}
                    {months.map((m, i) => <text key={m} x={30 + i * (450/11)} y={135} textAnchor="middle" fill={qd.monthly[i] > 0 ? (d ? "#D1D5DB" : "#374151") : (d ? "#374151" : "#D1D5DB")} fontSize="8" fontWeight={qd.monthly[i] > 0 ? "600" : "400"}>{m}</text>)}
                  </svg>
                </div>
                <div className={`p-4 rounded-lg border ${cb}`}>
                  <p className="text-xs font-semibold mb-3" style={{ color: TU_RED }}>Visitor Distribution Weekly</p>
                  <svg viewBox="0 0 500 140" className="w-full h-auto">
                    {qd.weekly.map((v, i) => { const bw = 48; const x = 30 + i * 66; const h = (v / maxW) * 100; return (<g key={i}><rect x={x} y={120 - h} width={bw} height={h} rx={3} fill={i < 5 ? TU_RED : "#222222"} opacity={0.85}><animate attributeName="height" from="0" to={h} dur="0.5s" fill="freeze"/><animate attributeName="y" from="120" to={120-h} dur="0.5s" fill="freeze"/></rect><text x={x + bw/2} y={112 - h} textAnchor="middle" fill={d ? "#D1D5DB" : "#374151"} fontSize="8" fontWeight="600">{v}</text><text x={x + bw/2} y={133} textAnchor="middle" fill={d ? "#6B7280" : "#9CA3AF"} fontSize="8">{days[i]}</text></g>); })}
                  </svg>
                  <div className="flex gap-4 justify-center mt-2">
                    <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded" style={{ background: TU_RED }}/><span className={d ? "text-gray-400" : "text-gray-500"}>Weekday</span></span>
                    <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded" style={{ background: "#222" }}/><span className={d ? "text-gray-400" : "text-gray-500"}>Weekend</span></span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg border ${cb}`}>
                  <p className="text-xs font-semibold mb-3" style={{ color: TU_RED }}>Weekday vs Weekend</p>
                  <div className="flex items-end justify-center gap-8 h-20">
                    {[{ l: "Weekday", v: qd.wdTotal, pct: Math.round(qd.wdTotal/(qd.wdTotal+qd.weTotal)*100) }, { l: "Weekend", v: qd.weTotal, pct: Math.round(qd.weTotal/(qd.wdTotal+qd.weTotal)*100) }].map((g, i) => (
                      <div key={i} className="text-center">
                        <div className="mx-auto rounded-t transition-all duration-500" style={{ width: 48, height: g.pct * 0.8, background: i === 0 ? TU_RED : "#222" }}/>
                        <p className={`text-xs mt-1 font-semibold ${d ? "text-gray-200" : "text-gray-800"}`}>{g.v.toLocaleString()} ({g.pct}%)</p>
                        <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>{g.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${cb}`}>
                  <p className="text-xs font-semibold mb-3" style={{ color: TU_RED }}>Visitor Spikes</p>
                  <div className="relative flex items-center justify-center h-20">
                    <svg viewBox="0 0 120 70" className="w-32 h-auto">
                      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke={d ? "#1F2937" : "#E5E7EB"} strokeWidth="10" strokeLinecap="round"/>
                      <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke={TU_RED} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(qd.spikes/qd.maxSpikes) * 157} 157`}/>
                      <text x="60" y="52" textAnchor="middle" fill={d ? "#F3F4F6" : "#111827"} fontSize="20" fontWeight="bold">{qd.spikes}</text>
                      <text x="60" y="65" textAnchor="middle" fill={d ? "#6B7280" : "#9CA3AF"} fontSize="8">of {qd.maxSpikes} all-time</text>
                    </svg>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${cb}`}>
                  <p className="text-xs font-semibold mb-2" style={{ color: TU_RED }}>Spike Log</p>
                  {qd.spikeLog.length > 0 ? (
                    <table className="w-full text-xs">
                      <thead><tr className={d ? "text-gray-500" : "text-gray-400"}><th className="text-left py-1">Count</th><th className="text-right py-1">Date</th></tr></thead>
                      <tbody>{qd.spikeLog.slice(0,4).map((r, i) => (<tr key={i} className={i % 2 === 0 ? (d ? "bg-gray-800/30" : "bg-gray-50") : ""}><td className={`py-1 font-mono ${d ? "text-gray-300" : "text-gray-700"}`}>{r.c.toLocaleString()}</td><td className={`py-1 text-right ${d ? "text-gray-400" : "text-gray-500"}`}>{r.d}</td></tr>))}</tbody>
                    </table>
                  ) : (<p className={`text-xs text-center py-4 ${d ? "text-gray-600" : "text-gray-400"}`}>No spikes in this period</p>)}
                </div>
              </div>
              <div className={`mt-4 px-3 py-2 rounded text-xs ${d ? "bg-yellow-500/5 border border-yellow-500/20 text-yellow-300/70" : "bg-yellow-50 border border-yellow-200 text-yellow-700"}`}>⚠️ <strong>Disclaimer</strong>: Visitor counts are based on sensor data and may be subject to error.</div>
            </div>
          </div>
        )}

        {activeView === "dax" && (
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 mb-4"><img src={TU_LOGO} alt="Temple" className="h-8"/><div><h3 className={`text-lg font-bold ${d ? "text-gray-100" : "text-gray-900"}`}>DAX Measures</h3><p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>Custom measures powering the analytics</p></div></div>
            {[
              { name: "Total Visits", code: "Total Visits = SUM(Visitors[Visitor Count])", desc: "Aggregates all visitor sensor readings across the selected time period" },
              { name: "Visitor_Mean", code: "Visitor_Mean = AVERAGE(Visitors[Visitor Count])", desc: "Daily average visitor count for trend baseline and spike detection threshold" },
              { name: "Avg Visitors by Weekday", code: "Avg Visitors by Weekday = AVERAGEX(VALUES(Visitors[Date]), [Total Visits])", desc: "Per-weekday averages using AVERAGEX iterator for day-of-week pattern analysis" },
              { name: "Most_Visited_Day_Info", code: "Most_Visited_Day_Info = VAR MaxDay = TOPN(1, SUMMARIZE(Visitors, Visitors[Day of Week], \"Total\", [Total Visits]), [Total], DESC) RETURN ...", desc: "Uses TOPN + SUMMARIZE to dynamically identify highest-traffic day" },
              { name: "Total_Spikes", code: "Total_Spikes = COUNTROWS(FILTER(Visitors, Visitors[Visitor Count] > [Visitor_Mean] * 1.5))", desc: "Identifies anomalous traffic days exceeding 1.5x mean (statistical outlier detection)" },
              { name: "Total_Spikes_All_Time", code: "Total_Spikes_All_Time = CALCULATE([Total_Spikes], ALL(Visitors))", desc: "Removes all slicer filters with ALL() to provide gauge benchmark maximum" },
            ].map((m, i) => (
              <div key={i} className={`p-4 rounded-lg border ${cb}`}>
                <span className="text-xs font-mono font-bold" style={{ color: TU_RED }}>{m.name}</span>
                <code className={`block text-xs font-mono p-2 rounded my-2 ${d ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-700"}`}>{m.code}</code>
                <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>{m.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeView === "finance" && (
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 mb-4"><img src={TU_LOGO} alt="Temple" className="h-8"/><div><h3 className={`text-lg font-bold ${d ? "text-gray-100" : "text-gray-900"}`}>Finance Connection</h3><p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>Same analytical framework as FP&A</p></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Variance Analysis", finance: "Budget vs. Actual revenue tracking", project: "Visitor_Mean baseline vs actual for spike detection", icon: icons.trend },
                { title: "Trend Forecasting", finance: "Revenue projections, seasonal adjustments", project: "Monthly traffic trends with seasonality (summer dip, fall surge)", icon: icons.bar },
                { title: "KPI Dashboards", finance: "ROE, margins, coverage ratios", project: "Total Visits, Daily Mean, Most Visited Day, Spike Count", icon: icons.target },
                { title: "Resource Allocation", finance: "Capital budgeting, cost center analysis", project: "Weekday vs Weekend staffing via DayType analysis", icon: icons.zap },
                { title: "DAX ≈ Financial Modeling", finance: "SUMIFS, INDEX-MATCH, scenario tables", project: "CALCULATE, ALL, TOPN, SUMMARIZE, AVERAGEX", icon: icons.code },
                { title: "Anomaly Detection", finance: "Fraud detection, audit outlier analysis", project: "Spike detection: FILTER where count > 1.5x mean", icon: icons.shield },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-lg border ${cb}`}>
                  <div className="flex items-center gap-2 mb-2"><span style={{ color: TU_RED }}>{item.icon}</span><h5 className="font-semibold text-sm">{item.title}</h5></div>
                  <div className="space-y-1.5">
                    <div><span className={`text-xs font-medium ${d ? "text-violet-400" : "text-violet-600"}`}>Finance: </span><span className={`text-xs ${d ? "text-gray-400" : "text-gray-600"}`}>{item.finance}</span></div>
                    <div><span className="text-xs font-medium" style={{ color: TU_RED }}>This Project: </span><span className={`text-xs ${d ? "text-gray-400" : "text-gray-600"}`}>{item.project}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === "embed" && (
          <div className="p-5">
            {p.embed && p.embed.url ? (
              <iframe src={p.embed.url} className="w-full h-96 rounded-lg" frameBorder="0" allowFullScreen title="Power BI Dashboard"/>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={TU_LOGO} alt="Temple University" className="h-7 w-auto" />
                  <div>
                    <h3 className={`text-sm font-bold ${d ? "text-gray-100" : "text-gray-900"}`}>Live Dashboard — Ambler Campus Visitor Traffic</h3>
                    <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>Power BI · Temple University · Deployed 2025</p>
                  </div>
                </div>
                <div className={`rounded-lg overflow-hidden border ${d ? "border-gray-700" : "border-gray-200"}`}>
                  <img
                    src="/images/powerbi-ambler-dashboard.png"
                    alt="Power BI Dashboard — Ambler Campus Visitor Traffic Analysis"
                    className="w-full h-auto"
                    style={{ display: "block" }}
                  />
                </div>
                <div className={`mt-3 flex items-start gap-2 px-3 py-2 rounded-lg text-xs ${d ? "bg-amber-500/5 border border-amber-500/20 text-amber-300/80" : "bg-amber-50 border border-amber-200 text-amber-700"}`}>
                  <span className="mt-0.5">ℹ️</span>
                  <span>Live embed unavailable — Temple University's Power BI admin policy restricts public publishing. Screenshot reflects actual dashboard output.</span>
                </div>
                {p.links && p.links.pbix && (
                  <a href={p.links.pbix} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg text-xs font-medium hover:opacity-90" style={{ background: TU_RED }}>
                    {icons.dl} Download .pbix Source File
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {p.links && p.links.pbix && <p className={`text-xs mt-2 ${d ? "text-gray-600" : "text-gray-400"}`}>Source: <a href={p.links.pbix} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: TU_RED }}>Prabin_Ambler_Visitors.pbix — Temple SharePoint</a></p>}
    </div>
  );
}

// ─── Excel Case Study Viewer with Tabs (External Excel Projects) ───
function ExcelCaseStudyViewer({ d, p }) {
  const [activeView, setActiveView] = useState("overview");
  const icons = {
    target: "🎯", zap: "⚡", db: "💾", code: "💻", trend: "📈", book: "📖"
  };

  return (
    <div className={`${d ? "bg-gray-900" : "bg-white"}`}>
      {/* Tabs */}
      <div className={`flex gap-1 border-b px-6 ${d ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-gray-50"}`}>
        {[
          { id: "overview", label: "Overview", icon: "📋" },
          { id: "model", label: "Model", icon: "📊" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeView === tab.id
                ? `border-blue-500 text-blue-500 ${d ? "bg-gray-800/50" : "bg-white"}`
                : `border-transparent ${d ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-900"}`
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeView === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: icons.target, label: "Problem", text: p.cs.problem },
              { icon: icons.zap, label: "Approach", text: p.cs.approach },
              { icon: icons.db, label: "Data Sources", text: p.cs.data },
              { icon: icons.code, label: "Methods", text: p.cs.methods },
              { icon: icons.trend, label: "Results", text: p.cs.results },
              { icon: icons.book, label: "Learnings", text: p.cs.learnings },
            ].map(({ icon, label, text }) => (
              <div key={label}>
                <div className="flex items-center gap-2 mb-2"><span className="text-blue-500">{icon}</span><h4 className="font-semibold text-sm">{label}</h4></div>
                <p className={`text-sm leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>{text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Model Tab */}
        {activeView === "model" && (
          <div className={`rounded-xl border overflow-hidden ${d ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
            {p.embed?.url ? (
              <div className="flex items-center justify-center bg-white rounded-lg">
                <iframe
                  src={p.embed.url}
                  className="w-full rounded-lg"
                  style={{ height: "800px" }}
                  frameBorder="0"
                  allowFullScreen
                  title={p.title}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center p-6">
                <span className={d ? "text-gray-600 mb-4 text-2xl" : "text-gray-300 mb-4 text-2xl"}>📊</span>
                <p className={`text-sm mb-2 ${d ? "text-gray-500" : "text-gray-400"}`}>{p.embed?.fallback || "Model not available"}</p>
                <p className={`text-xs ${d ? "text-gray-600" : "text-gray-400"}`}>Configure embed URL in Admin Panel</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Excel Model Viewer (Pharma Brands Inc.) ───
function ExcelModelViewer({ d }) {
  const [activeSheet, setActiveSheet] = useState("summary");
  const sheets = [
    { id: "summary", label: "Summary" },
    { id: "is", label: "Income Statement" },
    { id: "debt", label: "Debt Schedule" },
    { id: "covenants", label: "Covenants" },
  ];

  const hdr = `text-xs font-semibold ${d ? "text-gray-400" : "text-gray-500"}`;
  const cell = `text-xs ${d ? "text-gray-300" : "text-gray-700"}`;
  const cellNum = `text-xs text-right font-mono ${d ? "text-gray-200" : "text-gray-800"}`;
  const rowBg = (i) => i % 2 === 0 ? (d ? "bg-gray-800/30" : "bg-gray-50") : "";
  const tbl = `w-full text-left border-collapse`;
  const th = `px-3 py-2 border-b ${d ? "border-gray-700" : "border-gray-200"}`;
  const td = `px-3 py-1.5`;
  const fmt = (n, dec = 1) => n === 0 ? "—" : n === null || n === undefined ? "" : typeof n === "string" ? n : n < 0 ? `(${Math.abs(n).toFixed(dec)})` : n.toFixed(dec);
  const fmtP = (n) => n === null ? "" : typeof n === "string" ? n : (n * 100).toFixed(1) + "%";
  const fmtX = (n) => n === null ? "" : n === 0 ? "—" : n.toFixed(1) + "x";

  const years = [2021, 2022, 2023, 2024, 2025, 2026];
  const labels = ["Actual", "Projected", "Projected", "Projected", "Projected", "Projected"];

  const isData = {
    revenue:    [3250, 3412.5, 3583.1, 3762.3, 3912.8, 4069.3],
    growth:     [null, 5.0, 5.0, 5.0, 4.0, 4.0],
    cogs:       [2435, 2559.4, 2669.4, 2802.9, 2895.5, 3011.3],
    gross:      [815, 853.1, 913.7, 959.4, 1017.3, 1058.0],
    dist:       [265, 273.0, 286.7, 301.0, 293.5, 305.2],
    sga:        [205, 204.8, 215.0, 225.7, 215.2, 223.8],
    ebitda:     [345, 375.4, 412.1, 432.7, 508.7, 529.0],
    depn:       [75, 75.1, 78.8, 79.0, 78.3, 81.4],
    ebit:       [270, 300.3, 333.2, 353.7, 430.4, 447.6],
    interest:   [0, 33.7, 49.8, 36.5, 20.2, 5.8],
    ebt:        [270, 266.6, 283.4, 317.1, 410.2, 441.8],
    tax:        [68, 66.7, 70.9, 79.3, 102.6, 110.5],
    ni:         [202, 200.0, 212.6, 237.9, 307.7, 331.4],
    ebitdaM:    [10.6, 11.0, 11.5, 11.5, 13.0, 13.0],
  };

  const debtData = {
    termBeg:     [null, 200, 160, 120, 80, 40],
    termRepay:   [null, 40, 40, 40, 40, 40],
    termEnd:     [200, 160, 120, 80, 40, 0],
    revBeg:      [null, 0, 763.2, 617.8, 399.2, 153.8],
    revBorrow:   [null, 763.2, 0, 0, 0, 0],
    revRepay:    [null, 0, 145.4, 218.6, 245.4, 153.8],
    revEnd:      [0, 763.2, 617.8, 399.2, 153.8, 0],
    totalDebt:   [200, 923.2, 737.8, 479.2, 193.8, 0],
    totalInt:    [null, 33.7, 49.8, 36.5, 20.2, 5.8],
  };

  const covData = {
    debtEBITDA:  [null, 2.46, 1.79, 1.11, 0.38, 0],
    debtMax:     [null, 3.0, 2.5, 1.5, 1.5, 1.5],
    debtPass:    [null, "Pass", "Pass", "Pass", "Pass", "Pass"],
    ebitInt:     [null, 13.1, 8.0, 11.6, 25.9, 97.0],
    ebitMin:     [null, 6.0, 6.0, 8.0, 10.0, 12.0],
    ebitPass:    [null, "Pass", "Pass", "Pass", "Pass", "Pass"],
  };

  const PassBadge = ({ v }) => v === "Pass"
    ? <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-500/15 text-green-400">✓ Pass</span>
    : v === "Fail" ? <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-500/15 text-red-400">✗ Fail</span> : null;

  return (
    <div className="mb-8">
      <h4 className="font-semibold mb-4 flex items-center gap-2"><span className="text-blue-500">{icons.sheet}</span> Interactive Model Viewer — Pharma Brands Inc.</h4>

      {/* Sheet tabs */}
      <div className={`flex gap-1 mb-3 overflow-x-auto pb-1`}>
        {sheets.map(s => (
          <button key={s.id} onClick={() => setActiveSheet(s.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeSheet === s.id ? "bg-blue-500 text-white" : d ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s.label}</button>
        ))}
      </div>

      <div className={`rounded-xl border overflow-hidden ${d ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
        <div className="overflow-x-auto">

          {/* SUMMARY */}
          {activeSheet === "summary" && (
            <div className="p-5 space-y-4">
              <div className="text-center mb-4">
                <h3 className={`text-lg font-bold ${d ? "text-gray-100" : "text-gray-900"}`}>Pharma Brands Inc.</h3>
                <p className={`text-sm ${d ? "text-gray-400" : "text-gray-500"}`}>Special Dividend Recapitalization — $1B Dividend Payment</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { l: "Base Revenue", v: "$3,250M", sub: "FY2021" },
                  { l: "Terminal Revenue", v: "$4,069M", sub: "FY2026E" },
                  { l: "Peak Leverage", v: "2.46x", sub: "Debt/EBITDA" },
                  { l: "Covenant Status", v: "All Pass", sub: "5 years" },
                  { l: "Dividend Funded", v: "$1,000M", sub: "Year 1" },
                  { l: "Revolver Peak", v: "$763M", sub: "FY2022" },
                  { l: "Full Paydown", v: "FY2026", sub: "Revolver → $0" },
                  { l: "Net Income Growth", v: "+64%", sub: "$202M → $331M" },
                ].map((k, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${d ? "bg-gray-900/50 border-gray-700" : "bg-white border-gray-200"}`}>
                    <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>{k.l}</p>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{k.v}</p>
                    <p className={`text-xs ${d ? "text-gray-600" : "text-gray-400"}`}>{k.sub}</p>
                  </div>
                ))}
              </div>
              <p className={`text-xs text-center pt-2 ${d ? "text-gray-600" : "text-gray-400"}`}>6-sheet model: Transaction · IS · BS · CF · Debt Schedule · RE & Fixed Assets</p>
            </div>
          )}

          {/* INCOME STATEMENT */}
          {activeSheet === "is" && (
            <table className={tbl}>
              <thead><tr className={d ? "bg-gray-900" : "bg-gray-200"}>
                <th className={`${th} ${hdr} min-w-40`}>($millions)</th>
                {years.map((y, i) => <th key={y} className={`${th} ${hdr} text-right min-w-20`}><div>{labels[i]}</div><div>{y}</div></th>)}
              </tr></thead>
              <tbody>
                {[
                  { l: "Revenue", d: isData.revenue, bold: true },
                  { l: "  Growth Rate", d: isData.growth, pct: true, dim: true },
                  { l: "Cost of Goods Sold", d: isData.cogs },
                  { l: "Gross Profit", d: isData.gross, bold: true },
                  { l: "Distribution Expenses", d: isData.dist },
                  { l: "SG&A Expenses", d: isData.sga },
                  { l: "EBITDA", d: isData.ebitda, bold: true, accent: true },
                  { l: "Depreciation/Amortization", d: isData.depn },
                  { l: "EBIT", d: isData.ebit, bold: true },
                  { l: "Interest Expense", d: isData.interest },
                  { l: "EBT", d: isData.ebt, bold: true },
                  { l: "Taxes (25%)", d: isData.tax },
                  { l: "Net Income", d: isData.ni, bold: true, accent: true },
                  { l: "EBITDA Margin", d: isData.ebitdaM, pct: true, dim: true },
                ].map((row, ri) => (
                  <tr key={ri} className={`${rowBg(ri)} ${row.accent ? (d ? "bg-blue-500/5" : "bg-blue-50") : ""}`}>
                    <td className={`${td} ${row.bold ? "font-semibold" : ""} ${row.dim ? (d ? "text-xs text-gray-500" : "text-xs text-gray-400") : cell}`}>{row.l}</td>
                    {row.d.map((v, ci) => (
                      <td key={ci} className={`${td} ${cellNum} ${row.bold ? "font-semibold" : ""} ${row.dim ? (d ? "text-gray-500" : "text-gray-400") : ""}`}>
                        {v === null ? "—" : row.pct ? (typeof v === "number" ? v.toFixed(1) + "%" : v) : fmt(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* DEBT SCHEDULE */}
          {activeSheet === "debt" && (
            <table className={tbl}>
              <thead><tr className={d ? "bg-gray-900" : "bg-gray-200"}>
                <th className={`${th} ${hdr} min-w-44`}>($millions)</th>
                {years.map((y, i) => <th key={y} className={`${th} ${hdr} text-right min-w-20`}><div>{labels[i]}</div><div>{y}</div></th>)}
              </tr></thead>
              <tbody>
                <tr className={d ? "bg-blue-500/5" : "bg-blue-50"}><td colSpan={7} className={`${td} font-semibold text-xs text-blue-500 pt-3`}>Term Loan (6.0% interest, 20% annual amortization)</td></tr>
                {[
                  { l: "Beginning Balance", d: debtData.termBeg },
                  { l: "Less: Annual Repayments", d: debtData.termRepay.map(v => v ? -v : v) },
                  { l: "Ending Balance", d: debtData.termEnd, bold: true },
                ].map((row, ri) => (
                  <tr key={ri} className={rowBg(ri)}>
                    <td className={`${td} ${cell} ${row.bold ? "font-semibold" : ""}`}>{row.l}</td>
                    {row.d.map((v, ci) => <td key={ci} className={`${td} ${cellNum} ${row.bold ? "font-semibold" : ""}`}>{v === null ? "—" : fmt(v)}</td>)}
                  </tr>
                ))}
                <tr className={d ? "bg-blue-500/5" : "bg-blue-50"}><td colSpan={7} className={`${td} font-semibold text-xs text-blue-500 pt-3`}>Revolver (6.0% interest on avg balance, cash sweep repayment)</td></tr>
                {[
                  { l: "Beginning Balance", d: debtData.revBeg },
                  { l: "Add: New Borrowings", d: debtData.revBorrow },
                  { l: "Less: Repayments (Cash Sweep)", d: debtData.revRepay.map(v => v ? -v : v) },
                  { l: "Ending Balance", d: debtData.revEnd, bold: true },
                ].map((row, ri) => (
                  <tr key={ri} className={rowBg(ri)}>
                    <td className={`${td} ${cell} ${row.bold ? "font-semibold" : ""}`}>{row.l}</td>
                    {row.d.map((v, ci) => <td key={ci} className={`${td} ${cellNum} ${row.bold ? "font-semibold" : ""}`}>{v === null ? "—" : fmt(v)}</td>)}
                  </tr>
                ))}
                <tr className={d ? "bg-violet-500/5" : "bg-violet-50"}>
                  <td className={`${td} font-bold ${cell}`}>Total Debt Outstanding</td>
                  {debtData.totalDebt.map((v, ci) => <td key={ci} className={`${td} ${cellNum} font-bold`}>{fmt(v)}</td>)}
                </tr>
                <tr>
                  <td className={`${td} ${cell}`}>Total Interest Expense</td>
                  {debtData.totalInt.map((v, ci) => <td key={ci} className={`${td} ${cellNum}`}>{v === null ? "—" : fmt(v)}</td>)}
                </tr>
              </tbody>
            </table>
          )}

          {/* COVENANTS */}
          {activeSheet === "covenants" && (
            <div className="p-5">
              <div className="mb-4">
                <h3 className={`font-semibold mb-1 ${d ? "text-gray-100" : "text-gray-900"}`}>Debt Covenant Compliance</h3>
                <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>All covenants pass across the entire 5-year projection period</p>
              </div>
              {/* Covenant 1: Debt/EBITDA */}
              <div className={`rounded-lg border mb-4 overflow-hidden ${d ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`px-4 py-2 text-xs font-semibold ${d ? "bg-gray-900 text-gray-300" : "bg-gray-200 text-gray-700"}`}>Covenant 1: Total Debt / EBITDA (Maximum Allowed)</div>
                <table className={tbl}>
                  <thead><tr className={d ? "bg-gray-900/50" : "bg-gray-50"}>
                    <th className={`${th} ${hdr} min-w-36`}></th>
                    {years.slice(1).map(y => <th key={y} className={`${th} ${hdr} text-right`}>{y}</th>)}
                  </tr></thead>
                  <tbody>
                    <tr className={rowBg(0)}><td className={`${td} ${cell}`}>Total Debt ($M)</td>{debtData.totalDebt.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum}`}>{fmt(v)}</td>)}</tr>
                    <tr className={rowBg(1)}><td className={`${td} ${cell}`}>EBITDA ($M)</td>{isData.ebitda.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum}`}>{fmt(v)}</td>)}</tr>
                    <tr className={rowBg(0)}><td className={`${td} ${cell} font-semibold`}>Ratio</td>{covData.debtEBITDA.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum} font-semibold`}>{fmtX(v)}</td>)}</tr>
                    <tr className={rowBg(1)}><td className={`${td} ${cell}`}>Maximum Allowed</td>{covData.debtMax.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum} text-yellow-500`}>{fmtX(v)}</td>)}</tr>
                    <tr className={d ? "bg-green-500/5" : "bg-green-50"}><td className={`${td} ${cell} font-semibold`}>Status</td>{covData.debtPass.slice(1).map((v, i) => <td key={i} className={`${td} text-right`}><PassBadge v={v}/></td>)}</tr>
                  </tbody>
                </table>
              </div>
              {/* Covenant 2: EBIT/Interest */}
              <div className={`rounded-lg border overflow-hidden ${d ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`px-4 py-2 text-xs font-semibold ${d ? "bg-gray-900 text-gray-300" : "bg-gray-200 text-gray-700"}`}>Covenant 2: EBIT / Interest Expense (Minimum Required)</div>
                <table className={tbl}>
                  <thead><tr className={d ? "bg-gray-900/50" : "bg-gray-50"}>
                    <th className={`${th} ${hdr} min-w-36`}></th>
                    {years.slice(1).map(y => <th key={y} className={`${th} ${hdr} text-right`}>{y}</th>)}
                  </tr></thead>
                  <tbody>
                    <tr className={rowBg(0)}><td className={`${td} ${cell}`}>EBIT ($M)</td>{isData.ebit.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum}`}>{fmt(v)}</td>)}</tr>
                    <tr className={rowBg(1)}><td className={`${td} ${cell}`}>Interest Expense ($M)</td>{isData.interest.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum}`}>{fmt(v)}</td>)}</tr>
                    <tr className={rowBg(0)}><td className={`${td} ${cell} font-semibold`}>Ratio</td>{covData.ebitInt.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum} font-semibold`}>{fmtX(v)}</td>)}</tr>
                    <tr className={rowBg(1)}><td className={`${td} ${cell}`}>Minimum Required</td>{covData.ebitMin.slice(1).map((v, i) => <td key={i} className={`${td} ${cellNum} text-yellow-500`}>{fmtX(v)}</td>)}</tr>
                    <tr className={d ? "bg-green-500/5" : "bg-green-50"}><td className={`${td} ${cell} font-semibold`}>Status</td>{covData.ebitPass.slice(1).map((v, i) => <td key={i} className={`${td} text-right`}><PassBadge v={v}/></td>)}</tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className={`text-xs mt-2 ${d ? "text-gray-600" : "text-gray-400"}`}>Data extracted from Prabin-Debt_Convenant_Homework.xlsx · 6 sheets · All values in $millions</p>
    </div>
  );
}

// ─── GenAI Demo ───
function GenAIDemo({ d }) {
  const [query, setQuery] = useState("");
  const [msgs, setMsgs] = useState([{ role: "sys", text: "Finance Copilot ready. Ask about earnings, valuations, or risk metrics." }]);
  const [loading, setLoading] = useState(false);

  const responses = {
    earn: "📊 AAPL Q4 2024 Earnings\n• Revenue: $94.9B (+6.1% YoY)\n• EPS: $1.64 (beat by $0.04)\n• Services Revenue: $25.0B (ATH)\n• Gross Margin: 46.2%\n\nConfidence: 94% | Source: SEC 10-Q",
    valu: "📈 DCF Valuation Range\n• Bear: $178 (WACC 10.5%, TGR 2%)\n• Base: $215 (WACC 9.2%, TGR 2.5%)\n• Bull: $258 (WACC 8.5%, TGR 3%)\n\nCurrent: $227 → Slight upside in base case\nConfidence: 78% | Recommend review",
    risk: "⚠️ Risk Assessment\n1. Rate sensitivity (corr: -0.42)\n2. Supply chain (68% APAC)\n3. Regulatory headwinds EU/China\n4. FX exposure (38% intl)\n\nVaR (95%, 1d): -2.3%\nSource: 10-K + Market Data",
    def: "Based on financial data available, I can analyze this further. Specify a company or metric — try 'AAPL earnings' or 'DCF valuation'."
  };

  const send = () => {
    if (!query.trim()) return;
    setMsgs(p => [...p, { role: "user", text: query }]);
    setLoading(true);
    const q = query.toLowerCase();
    setQuery("");
    setTimeout(() => {
      let r = responses.def;
      if (q.includes("earn") || q.includes("revenue")) r = responses.earn;
      else if (q.includes("valu") || q.includes("dcf") || q.includes("price")) r = responses.valu;
      else if (q.includes("risk") || q.includes("var")) r = responses.risk;
      setMsgs(p => [...p, { role: "ai", text: r }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mb-8">
      <h4 className="font-semibold mb-4 flex items-center gap-2"><span className="text-blue-500">{icons.brain}</span> Architecture Overview</h4>
      {/* ARCHITECTURE SVG */}
      <div className={`p-4 rounded-xl border mb-6 overflow-x-auto ${d ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
        <svg viewBox="0 0 800 160" className="w-full h-auto min-w-[600px]">
          <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient></defs>
          {[{ x: 10, l: "User Query", s: "Natural Language" }, { x: 170, l: "RAG Pipeline", s: "Retrieval + Context" }, { x: 330, l: "LLM Engine", s: "Financial Reasoning" }, { x: 490, l: "Guardrails", s: "Validate + Audit" }, { x: 650, l: "Response", s: "Cited + Scored" }].map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={30} width={130} height={65} rx={12} fill={d ? "#1F2937" : "#F3F4F6"} stroke={d ? "#374151" : "#D1D5DB"} strokeWidth={1.5}/>
              <text x={b.x + 65} y={58} textAnchor="middle" fill={d ? "#E5E7EB" : "#1F2937"} fontSize={11} fontWeight="600">{b.l}</text>
              <text x={b.x + 65} y={76} textAnchor="middle" fill={d ? "#6B7280" : "#9CA3AF"} fontSize={9}>{b.s}</text>
              {i < 4 && <line x1={b.x + 135} y1={62} x2={b.x + 165} y2={62} stroke="url(#g1)" strokeWidth={2}/>}
            </g>
          ))}
          <rect x={200} y={115} width={90} height={30} rx={8} fill={d ? "#1E3A5F" : "#DBEAFE"} stroke={d ? "#2563EB" : "#93C5FD"} strokeWidth={1}/>
          <text x={245} y={134} textAnchor="middle" fill="#3B82F6" fontSize={9} fontWeight="500">10-K / 10-Q</text>
          <rect x={310} y={115} width={90} height={30} rx={8} fill={d ? "#1E3A5F" : "#DBEAFE"} stroke={d ? "#2563EB" : "#93C5FD"} strokeWidth={1}/>
          <text x={355} y={134} textAnchor="middle" fill="#3B82F6" fontSize={9} fontWeight="500">Market Data</text>
          <line x1={235} y1={95} x2={240} y2={115} stroke={d ? "#374151" : "#D1D5DB"} strokeWidth={1} strokeDasharray="3 2"/>
          <line x1={365} y1={95} x2={360} y2={115} stroke={d ? "#374151" : "#D1D5DB"} strokeWidth={1} strokeDasharray="3 2"/>
          <rect x={520} y={115} width={80} height={28} rx={14} fill={d ? "#064E3B" : "#D1FAE5"} stroke={d ? "#10B981" : "#6EE7B7"} strokeWidth={1}/>
          <text x={560} y={133} textAnchor="middle" fill="#10B981" fontSize={9} fontWeight="600">🛡️ Safety</text>
        </svg>
      </div>

      {/* GUARDRAILS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[{ i: icons.shield, l: "Hallucination Detection", t: "Cross-references outputs against source documents" }, { i: icons.target, l: "Confidence Scoring", t: "Every response includes a confidence score and citations" }, { i: icons.users, l: "Human-in-the-Loop", t: "Critical decisions require analyst confirmation" }].map(g => (
          <div key={g.l} className={`p-4 rounded-xl border ${d ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
            <span className="text-green-500 block mb-2">{g.i}</span>
            <h5 className="font-medium text-sm mb-1">{g.l}</h5>
            <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>{g.t}</p>
          </div>
        ))}
      </div>

      {/* INTERACTIVE DEMO */}
      <h4 className="font-semibold mb-3 flex items-center gap-2"><span className="text-blue-500">{icons.play}</span> Interactive Demo</h4>
      <div className={`rounded-xl border overflow-hidden ${d ? "bg-gray-800/50 border-gray-700" : "bg-gray-100 border-gray-200"}`}>
        <div className={`px-4 py-2 border-b text-xs font-medium flex items-center gap-2 ${d ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"}`}>
          <span className="text-blue-500">{icons.brain}</span> Finance Copilot Demo (Local Data)
        </div>
        <div className="h-56 overflow-y-auto p-4 space-y-3">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-blue-500 text-white" : d ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800 border border-gray-200"}`}>{m.text}</div>
            </div>
          ))}
          {loading && <div className="flex justify-start"><div className={`px-4 py-3 rounded-2xl flex gap-1.5 ${d ? "bg-gray-700" : "bg-white border border-gray-200"}`}>{[0, 150, 300].map(delay => <div key={delay} className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: `${delay}ms` }}/>)}</div></div>}
        </div>
        <div className={`p-3 border-t ${d ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder='Try "AAPL earnings" or "DCF valuation"...' className={`flex-1 px-4 py-2 rounded-lg text-sm outline-none ${d ? "bg-gray-700 text-gray-200 placeholder-gray-500" : "bg-white border border-gray-200 placeholder-gray-400"}`}/>
            <button onClick={send} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-50">Send</button>
          </div>
          <div className="flex gap-2 mt-2">
            {["AAPL earnings", "DCF valuation", "Risk analysis"].map(s => <button key={s} onClick={() => setQuery(s)} className={`text-xs px-2.5 py-1 rounded-lg ${d ? "bg-gray-700 text-gray-400 hover:text-gray-200" : "bg-gray-200 text-gray-500 hover:text-gray-700"}`}>{s}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BLOG
// ═══════════════════════════════════════════════════════════════
function Blog({ c, d }) {
  const pub = c.blog.filter(b => b.published);
  const cb = d ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200";
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${d ? "text-indigo-400" : "text-indigo-600"}`}>Insights</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-10">Blog</h1>
      {pub.length === 0 ? (
        <div className={`text-center py-24 rounded-2xl border ${d ? "bg-gray-900/50 border-white/[0.07]" : "bg-gray-50 border-gray-200"}`}>
          <div className={`mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center ${d ? "bg-white/[0.04] text-gray-600" : "bg-gray-100 text-gray-300"}`}>{icons.book}</div>
          <p className={`font-semibold mb-1 ${d ? "text-gray-400" : "text-gray-600"}`}>Coming soon.</p>
          <p className={`text-sm ${d ? "text-gray-600" : "text-gray-400"}`}>Thoughts on finance, data, and AI will appear here.</p>
        </div>
      ) : pub.map(post => (
        <article key={post.id} className={`p-6 rounded-2xl border mb-5 hover-lift transition-all duration-200 ${d ? "bg-gray-900/60 border-white/[0.07] hover:border-indigo-500/20" : "bg-white border-gray-200 shadow-sm hover:shadow-md"}`}>
          <div className="h-[2px] -mx-6 -mt-6 mb-6 bg-gradient-to-r from-indigo-500/60 to-transparent rounded-t-2xl" />
          <div className="flex items-center gap-3 mb-3">
            <span className={`${d ? "text-gray-600" : "text-gray-400"}`}>{icons.cal}</span>
            <span className={`text-xs font-medium ${d ? "text-gray-500" : "text-gray-400"}`}>{post.date}</span>
            <span className={`w-px h-3 ${d ? "bg-gray-800" : "bg-gray-200"}`} />
            {post.tags.map(t => <span key={t} className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${d ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "bg-indigo-50 text-indigo-600"}`}>{t}</span>)}
          </div>
          <h2 className={`text-xl font-bold mb-2.5 tracking-tight ${d ? "text-gray-100" : "text-gray-900"}`}>{post.title}</h2>
          <p className={`text-sm leading-relaxed ${d ? "text-gray-400" : "text-gray-600"}`}>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════
function Contact({ c, d }) {
  const { contact, testimonials } = c;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "0f12b7bc-45cb-4a6a-9e06-88bb81affdbc",
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio contact from ${form.name}`,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setErrors({ submit: "Failed to send. Please email me directly at prabin.pandey@temple.edu" });
      }
    } catch {
      setErrors({ submit: "Failed to send. Please email me directly at prabin.pandey@temple.edu" });
    } finally {
      setSubmitting(false);
    }
  };

  const cb = d ? "bg-gray-900/70 border-white/[0.07]" : "bg-white border-gray-200 shadow-sm";
  const inp = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 border ${d ? "bg-gray-900/60 border-white/[0.08] focus:border-indigo-500/50 text-gray-200 placeholder-gray-600" : "bg-white border-gray-200 focus:border-indigo-400 placeholder-gray-400 shadow-sm"}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${d ? "text-indigo-400" : "text-indigo-600"}`}>Get In Touch</p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Contact</h1>
      <p className={`text-[1.05rem] leading-[1.75] mb-12 max-w-xl ${d ? "text-gray-400" : "text-gray-600"}`}>{contact.msg}</p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {[{ i: icons.mail, l: "Email", v: contact.email, h: `mailto:${contact.email}` }, { i: icons.phone, l: "Phone", v: contact.phone, h: `tel:${contact.phone}` }, { i: icons.pin, l: "Location", v: contact.location }, { i: icons.linkedin, l: "LinkedIn", v: "Connect", h: contact.linkedin }, { i: icons.github, l: "GitHub", v: "Follow", h: contact.github }].map(item => (
            <div key={item.l} className={`flex items-center gap-4 p-4 rounded-xl border hover-lift transition-all duration-200 ${cb}`}>
              <div className={`p-2.5 rounded-xl ${d ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>{item.i}</div>
              <div>
                <p className={`text-xs ${d ? "text-gray-500" : "text-gray-400"}`}>{item.l}</p>
                {item.h ? <a href={item.h} target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold ${d ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"} transition-colors`}>{item.v}</a> : <p className={`text-sm font-semibold ${d ? "text-gray-200" : "text-gray-800"}`}>{item.v}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3">
          {sent ? (
            <div className={`p-12 rounded-2xl border text-center ${cb}`}>
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 text-green-500">{icons.mail}</div>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className={`text-sm ${d ? "text-gray-400" : "text-gray-500"}`}>Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={`${inp} ${errors.name ? "border-red-500" : ""}`}/>{errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}</div>
                <div><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className={`${inp} ${errors.email ? "border-red-500" : ""}`}/>{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}</div>
              </div>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject (optional)" className={inp}/>
              <div><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your message..." rows={5} className={`${inp} resize-none ${errors.message ? "border-red-500" : ""}`}/>{errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}</div>
              {errors.submit && <p className="text-red-500 text-xs text-center py-1">{errors.submit}</p>}
              <button type="submit" disabled={submitting} className="btn-primary w-full px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-xl text-[13px] font-semibold transition-all duration-200 cta-glow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {icons.mail} {submitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="mt-20">
        <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${d ? "text-indigo-400" : "text-indigo-600"}`}>Testimonials</p>
        <h2 className="text-2xl font-bold tracking-tight mb-8">What People Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className={`p-6 rounded-2xl border hover-lift transition-all duration-200 ${d ? "bg-gray-900/60 border-white/[0.07] hover:border-indigo-500/18" : "bg-white border-gray-200 shadow-sm hover:shadow-md"}`}>
              <div className={`text-2xl font-serif mb-3 ${d ? "text-indigo-500/40" : "text-indigo-200"}`}>"</div>
              <p className={`text-sm leading-relaxed mb-5 ${d ? "text-gray-300" : "text-gray-600"}`}>{t.quote}</p>
              <div className={`pt-4 border-t ${d ? "border-white/[0.06]" : "border-gray-100"}`}>
                <p className={`font-bold text-sm ${d ? "text-gray-200" : "text-gray-900"}`}>{t.name}</p>
                <p className={`text-xs mt-0.5 ${d ? "text-gray-500" : "text-gray-400"}`}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════════════════════════════
function Admin({ content, setContent, onClose }) {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("home");
  const [draft, setDraft] = useState(JSON.parse(JSON.stringify(content)));
  const [saved, setSaved] = useState(false);

  const save = () => { setContent(JSON.parse(JSON.stringify(draft))); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "content.json"; a.click();
  };
  const importJSON = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => { try { const d = JSON.parse(ev.target.result as string); setDraft(d); setContent(d); } catch { alert("Invalid JSON"); } };
    r.readAsText(f);
  };

  const upd = (path, val) => {
    const d2 = JSON.parse(JSON.stringify(draft));
    const keys = path.split(".");
    let o = d2;
    for (let i = 0; i < keys.length - 1; i++) o = o[isNaN(keys[i]) ? keys[i] : +keys[i]];
    o[isNaN(keys.at(-1)) ? keys.at(-1) : +keys.at(-1)] = val;
    setDraft(d2);
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <div className="text-blue-500 flex justify-center mb-4">{icons.lock}</div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-2">Enter passcode to continue</p>
          </div>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && setAuth(true)} placeholder="Passcode" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-sm outline-none focus:border-blue-500 mb-4"/>
          <button onClick={() => setAuth(true)} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium">Enter</button>
          <button onClick={onClose} className="w-full py-3 mt-2 text-gray-500 text-sm hover:text-gray-300">← Back to Site</button>
        </div>
      </div>
    );
  }

  const I = "w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-sm outline-none focus:border-blue-500 text-gray-200 placeholder-gray-600";
  const L = "block text-xs font-medium text-gray-400 mb-1.5";

  const tabs = [
    { id: "home", l: "Home" }, { id: "about", l: "About" }, { id: "projects", l: "Projects" },
    { id: "blog", l: "Blog" }, { id: "testimonials", l: "Testimonials" },
    { id: "contact", l: "Contact" }, { id: "seo", l: "SEO" }, { id: "resume", l: "Resume" }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-52 border-b md:border-b-0 md:border-r border-gray-800 flex-shrink-0">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="font-bold text-sm">Admin Panel</h2>
          <button onClick={onClose} className="text-xs text-gray-500 hover:text-gray-300">← Site</button>
        </div>
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible py-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${tab === t.id ? "bg-blue-500/10 text-blue-400 md:border-r-2 md:border-blue-500" : "text-gray-500 hover:text-gray-300"}`}>{t.l}</button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-800 space-y-2 hidden md:block">
          <button onClick={save} className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">{icons.save} {saved ? "Saved!" : "Save & Preview"}</button>
          <button onClick={exportJSON} className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center justify-center gap-2">{icons.dl} Export JSON</button>
          <label className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer">{icons.upload} Import JSON<input type="file" accept=".json" onChange={importJSON} className="hidden"/></label>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {/* Mobile save bar */}
        <div className="md:hidden flex gap-2 mb-6">
          <button onClick={save} className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">{saved ? "Saved!" : "Save"}</button>
          <button onClick={exportJSON} className="py-2 px-3 bg-gray-800 rounded-lg text-sm">{icons.dl}</button>
          <label className="py-2 px-3 bg-gray-800 rounded-lg text-sm cursor-pointer">{icons.upload}<input type="file" accept=".json" onChange={importJSON} className="hidden"/></label>
        </div>

        <div className="max-w-2xl">
          {tab === "home" && (
            <>
              <h2 className="text-xl font-bold mb-6">Home Page</h2>
              <div className="space-y-4">
                <div><label className={L}>Greeting</label><input value={draft.hero.greeting} onChange={e => upd("hero.greeting", e.target.value)} className={I}/></div>
                <div><label className={L}>Display Name</label><input value={draft.hero.name} onChange={e => upd("hero.name", e.target.value)} className={I}/></div>
                <div><label className={L}>Roles (comma separated)</label><input value={draft.hero.roles.join(", ")} onChange={e => upd("hero.roles", e.target.value.split(",").map(s => s.trim()))} className={I}/></div>
                <div><label className={L}>Description</label><textarea value={draft.hero.desc} onChange={e => upd("hero.desc", e.target.value)} className={`${I} h-24 resize-none`}/></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={L}>Primary CTA</label><input value={draft.hero.cta1} onChange={e => upd("hero.cta1", e.target.value)} className={I}/></div>
                  <div><label className={L}>Secondary CTA</label><input value={draft.hero.cta2} onChange={e => upd("hero.cta2", e.target.value)} className={I}/></div>
                </div>
                <h3 className="text-sm font-semibold text-gray-300 pt-2">Stats</h3>
                {draft.hero.stats.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <input value={s.v} onChange={e => { const st = [...draft.hero.stats]; st[i] = { ...st[i], v: e.target.value }; upd("hero.stats", st); }} placeholder="Value" className={`${I} w-1/3`}/>
                    <input value={s.l} onChange={e => { const st = [...draft.hero.stats]; st[i] = { ...st[i], l: e.target.value }; upd("hero.stats", st); }} placeholder="Label" className={`${I} flex-1`}/>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "about" && (
            <>
              <h2 className="text-xl font-bold mb-6">About Page</h2>
              <div className="space-y-4">
                <div><label className={L}>Bio</label><textarea value={draft.about.bio} onChange={e => upd("about.bio", e.target.value)} className={`${I} h-32 resize-none`}/></div>
                <div><label className={L}>"Now" Section</label><textarea value={draft.about.now} onChange={e => upd("about.now", e.target.value)} className={`${I} h-20 resize-none`}/></div>
                <div><label className={L}>Certifications (comma separated)</label><input value={draft.about.certs.join(", ")} onChange={e => upd("about.certs", e.target.value.split(",").map(s => s.trim()))} className={I}/></div>
                <p className="text-xs text-gray-500 pt-2">Education, experience, and skills are also editable here. Export → edit JSON → import for bulk changes.</p>
              </div>
            </>
          )}

          {tab === "projects" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Projects ({draft.projects.length})</h2>
                <button onClick={() => upd("projects", [...draft.projects, { id: `p${Date.now()}`, title: "New Project", cat: "Excel", yr: "2025", sum: "", tags: [], tools: [], metrics: [], featured: false, cs: { problem: "", approach: "", data: "", methods: "", results: "", learnings: "" }, embed: null }])} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-1">{icons.plus} Add</button>
              </div>
              {draft.projects.map((p, i) => (
                <ProjEdit key={p.id} p={p} i={i} draft={draft} upd={upd} I={I} L={L}/>
              ))}
            </>
          )}

          {tab === "blog" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Blog</h2>
                <button onClick={() => upd("blog", [...draft.blog, { id: `b${Date.now()}`, title: "New Post", date: new Date().toISOString().split("T")[0], excerpt: "", content: "", published: false, tags: [] }])} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-1">{icons.plus} Add Post</button>
              </div>
              {draft.blog.map((b, i) => (
                <div key={b.id} className="p-4 bg-gray-900 border border-gray-800 rounded-lg mb-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <input value={b.title} onChange={e => { const bl = [...draft.blog]; bl[i] = { ...bl[i], title: e.target.value }; upd("blog", bl); }} className={`${I} flex-1`}/>
                    <button onClick={() => { const bl = [...draft.blog]; bl[i] = { ...bl[i], published: !bl[i].published }; upd("blog", bl); }} className={b.published ? "text-green-400" : "text-gray-600"}>{b.published ? icons.eye : icons.eyeOff}</button>
                    <button onClick={() => upd("blog", draft.blog.filter((_, j) => j !== i))} className="text-red-500">{icons.trash}</button>
                  </div>
                  <textarea value={b.excerpt} onChange={e => { const bl = [...draft.blog]; bl[i] = { ...bl[i], excerpt: e.target.value }; upd("blog", bl); }} placeholder="Excerpt" className={`${I} h-16 resize-none`}/>
                </div>
              ))}
            </>
          )}

          {tab === "testimonials" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Testimonials</h2>
                <button onClick={() => upd("testimonials", [...draft.testimonials, { name: "", role: "", quote: "" }])} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-1">{icons.plus} Add</button>
              </div>
              {draft.testimonials.map((t, i) => (
                <div key={i} className="p-4 bg-gray-900 border border-gray-800 rounded-lg mb-4 space-y-2">
                  <div className="flex gap-2">
                    <input value={t.name} onChange={e => { const ts = [...draft.testimonials]; ts[i] = { ...ts[i], name: e.target.value }; upd("testimonials", ts); }} placeholder="Name" className={`${I} flex-1`}/>
                    <input value={t.role} onChange={e => { const ts = [...draft.testimonials]; ts[i] = { ...ts[i], role: e.target.value }; upd("testimonials", ts); }} placeholder="Role" className={`${I} flex-1`}/>
                    <button onClick={() => upd("testimonials", draft.testimonials.filter((_, j) => j !== i))} className="text-red-500">{icons.trash}</button>
                  </div>
                  <textarea value={t.quote} onChange={e => { const ts = [...draft.testimonials]; ts[i] = { ...ts[i], quote: e.target.value }; upd("testimonials", ts); }} placeholder="Quote" className={`${I} h-16 resize-none`}/>
                </div>
              ))}
            </>
          )}

          {tab === "contact" && (
            <>
              <h2 className="text-xl font-bold mb-6">Contact</h2>
              <div className="space-y-4">
                <div><label className={L}>Email</label><input value={draft.contact.email} onChange={e => upd("contact.email", e.target.value)} className={I}/></div>
                <div><label className={L}>Phone</label><input value={draft.contact.phone} onChange={e => upd("contact.phone", e.target.value)} className={I}/></div>
                <div><label className={L}>Location</label><input value={draft.contact.location} onChange={e => upd("contact.location", e.target.value)} className={I}/></div>
                <div><label className={L}>LinkedIn URL</label><input value={draft.contact.linkedin} onChange={e => upd("contact.linkedin", e.target.value)} className={I}/></div>
                <div><label className={L}>GitHub URL</label><input value={draft.contact.github} onChange={e => upd("contact.github", e.target.value)} className={I}/></div>
                <div><label className={L}>Contact Message</label><textarea value={draft.contact.msg} onChange={e => upd("contact.msg", e.target.value)} className={`${I} h-20 resize-none`}/></div>
              </div>
            </>
          )}

          {tab === "seo" && (
            <>
              <h2 className="text-xl font-bold mb-6">SEO</h2>
              <div className="space-y-4">
                <div><label className={L}>Site Name</label><input value={draft.site.name} onChange={e => upd("site.name", e.target.value)} className={I}/></div>
                <div><label className={L}>Domain</label><input value={draft.site.domain} onChange={e => upd("site.domain", e.target.value)} className={I}/></div>
                <div><label className={L}>Meta Title</label><input value={draft.seo.metaTitle} onChange={e => upd("seo.metaTitle", e.target.value)} className={I}/></div>
                <div><label className={L}>Meta Description</label><textarea value={draft.seo.metaDescription} onChange={e => upd("seo.metaDescription", e.target.value)} className={`${I} h-20 resize-none`}/></div>
                <div><label className={L}>Keywords</label><input value={draft.seo.keywords} onChange={e => upd("seo.keywords", e.target.value)} className={I}/></div>
              </div>
            </>
          )}

          {tab === "resume" && (
            <>
              <h2 className="text-xl font-bold mb-6">Resume</h2>
              <div className="space-y-4">
                <div><label className={L}>Button Label</label><input value={draft.resume.label} onChange={e => upd("resume.label", e.target.value)} className={I}/></div>
                <div><label className={L}>File Path</label><input value={draft.resume.path} onChange={e => upd("resume.path", e.target.value)} className={I}/></div>
                <p className="text-xs text-gray-500">Upload your PDF to <code className="text-blue-400">public/resume/</code> and update the path above.</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Project Editor ───
function ProjEdit({ p, i, draft, upd, I, L }) {
  const [open, setOpen] = useState(false);
  const u = (field, val) => { const ps = [...draft.projects]; ps[i] = { ...ps[i], [field]: val }; upd("projects", ps); };
  const uc = (field, val) => { const ps = [...draft.projects]; ps[i] = { ...ps[i], cs: { ...ps[i].cs, [field]: val } }; upd("projects", ps); };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg mb-3 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 text-left">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${p.featured ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-800 text-gray-500"}`}>{p.cat}</span>
          <span className="font-medium text-sm truncate">{p.title}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); upd("projects", draft.projects.filter((_, j) => j !== i)); }} className="text-red-500 p-1">{icons.trash}</button>
          <span className={`transition-transform ${open ? "rotate-180" : ""} text-gray-500`}>{icons.chevD}</span>
        </div>
      </button>
      {open && (
        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className={L}>Title</label><input value={p.title} onChange={e => u("title", e.target.value)} className={I}/></div>
            <div><label className={L}>Category</label>
              <select value={p.cat} onChange={e => u("cat", e.target.value)} className={I}>
                {["Excel", "Financial Modeling (Excel)", "Power BI", "Tableau", "Python", "GenAI Finance", "Financial Analytics (R)"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={L}>Year</label><input value={p.yr} onChange={e => u("yr", e.target.value)} className={I}/></div>
            <div className="flex items-end"><label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer pb-2"><input type="checkbox" checked={p.featured} onChange={e => u("featured", e.target.checked)}/> Featured</label></div>
          </div>
          <div><label className={L}>Summary</label><textarea value={p.sum} onChange={e => u("sum", e.target.value)} className={`${I} h-16 resize-none`}/></div>
          <div><label className={L}>Tags (comma)</label><input value={p.tags.join(", ")} onChange={e => u("tags", e.target.value.split(",").map(s => s.trim()))} className={I}/></div>
          <div><label className={L}>Tools (comma)</label><input value={p.tools.join(", ")} onChange={e => u("tools", e.target.value.split(",").map(s => s.trim()))} className={I}/></div>
          <div><label className={L}>Metrics (comma)</label><input value={p.metrics.join(", ")} onChange={e => u("metrics", e.target.value.split(",").map(s => s.trim()))} className={I}/></div>

          {/* EMBED */}
          <div className="p-3 bg-gray-800/50 rounded-lg space-y-2">
            <h4 className="text-xs font-semibold text-gray-300">Dashboard Embed</h4>
            <label className="flex items-center gap-2 text-xs text-gray-400"><input type="checkbox" checked={!!p.embed} onChange={e => u("embed", e.target.checked ? { type: "powerbi", url: "", fallback: "Configure embed URL" } : null)}/> Enable embed</label>
            {p.embed && (
              <>
                <select value={p.embed.type} onChange={e => u("embed", { ...p.embed, type: e.target.value })} className={`${I} w-40`}>
                  <option value="powerbi">Power BI</option>
                  <option value="tableau">Tableau</option>
                  <option value="excel">Excel (OneDrive/SharePoint)</option>
                </select>
                <input value={p.embed.url} onChange={e => u("embed", { ...p.embed, url: e.target.value })} placeholder={p.embed.type === "powerbi" ? "Paste Power BI Publish-to-web URL..." : p.embed.type === "tableau" ? "Paste Tableau Public embed URL..." : "Paste OneDrive/SharePoint Excel embed URL..."} className={I}/>
                <div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded text-xs text-blue-300">
                  {p.embed.type === "powerbi"
                    ? "Power BI: File → Embed → Website or portal → Copy iframe src URL"
                    : p.embed.type === "tableau"
                    ? "Tableau: Publish to Tableau Public → Share → Copy embed URL"
                    : "Excel: Open file in OneDrive/SharePoint → File → Share → Embed → Copy iframe src URL (starts with https://onedrive.live.com/embed?...)"}
                </div>
              </>
            )}
          </div>

          {/* CASE STUDY */}
          <div className="p-3 bg-gray-800/50 rounded-lg space-y-2">
            <h4 className="text-xs font-semibold text-gray-300">Case Study</h4>
            {["problem", "approach", "data", "methods", "results", "learnings"].map(f => (
              <div key={f}><label className={L}>{f.charAt(0).toUpperCase() + f.slice(1)}</label><textarea value={p.cs?.[f] || ""} onChange={e => uc(f, e.target.value)} className={`${I} h-14 resize-none`}/></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
