// Excel / Financial Modeling Projects Data
// Professional portfolio entries — sourced from advanced coursework in Corporate
// Value Management, Leveraged Finance, and Quantitative Equity Analysis.

export interface ExcelMetric {
  label: string;
  value: string;
}

export interface ExcelCaseStudy {
  problem: string;
  approach: string;
  data: string;
  methods: string;
  results: string;
  learnings: string;
}

export interface ExcelProject {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;          // display category label
  tags: string[];
  tools: string[];           // Excel + supporting tools
  metrics: ExcelMetric[];
  skills: string[];
  caseStudy: ExcelCaseStudy;
  fileSlug: string;          // filename in /public/excel-models/
  embedUrl?: string;         // OneDrive/SharePoint embed URL (optional — fill via admin)
}

export const excelProjects: ExcelProject[] = [

  // ── 0 — Amazon Valuation ───────────────────────────────────────────────────
  {
    id: "amazon-valuation-model",
    title: "Amazon.com — DCF Valuation & Segment Revenue Analysis",
    summary:
      "Built a full discounted cash flow model for Amazon.com, projecting free cash flows across its three business segments (AWS, Advertising, Retail), calibrating WACC from first principles, and computing an implied intrinsic value per share.",
    description:
      "A comprehensive equity valuation of Amazon.com using a segment-based DCF model. The analysis separates Amazon's high-margin cloud business (AWS) from its advertising and retail segments to apply distinct growth and margin assumptions to each. WACC is derived from a CAPM-based cost of equity using Amazon's beta, market risk premium, and risk-free rate, combined with a cost of debt from its public bond yields. The model outputs an implied share price range with sensitivity analysis on terminal growth rate and WACC — the exact framework used in equity research coverage initiation reports.",
    category: "Equity Research & Valuation",
    tags: ["Amazon", "DCF Valuation", "Equity Research", "WACC", "Segment Analysis", "Free Cash Flow", "Intrinsic Value"],
    tools: ["Excel", "Financial Modeling", "Equity Valuation", "DCF Analysis"],
    metrics: [
      { label: "Company",        value: "Amazon.com (AMZN)" },
      { label: "Methodology",    value: "Segment DCF + WACC" },
      { label: "Segments",       value: "AWS · Advertising · Retail" },
      { label: "Output",         value: "Implied share price range" },
    ],
    skills: [
      "DCF Valuation", "Segment Revenue Modeling", "WACC Derivation",
      "CAPM", "Free Cash Flow Forecasting", "Sensitivity Analysis", "Equity Research",
    ],
    caseStudy: {
      problem:
        "Amazon operates three structurally different businesses — a hyper-growth cloud platform (AWS), a high-margin advertising business, and a low-margin e-commerce/logistics operation — each warranting distinct growth trajectories and margin assumptions. A single-entity DCF obscures the true value drivers. The challenge: build a segment-level model that isolates each business's contribution and arrives at a defensible intrinsic value range.",
      approach:
        "Decomposed Amazon's total revenue into three segments using publicly disclosed financials. Projected each segment's revenue growth independently (AWS: 20–25% near-term tapering; Advertising: 15–20%; Retail: 8–10%), applied segment-specific EBIT margin assumptions converging toward long-run steady states, and aggregated to a consolidated EBITDA and FCFF projection. Applied CAPM to derive cost of equity (risk-free rate + beta × ERP), blended with after-tax cost of debt to compute WACC. Terminal value computed using Gordon Growth Model.",
      data:
        "Amazon annual reports (10-K): AWS, North America, and International segment disclosures. Market data: AMZN beta (5-year monthly vs. S&P 500), 10-year Treasury yield as risk-free rate, 5.5% Equity Risk Premium (Damodaran), Amazon bond yields for cost of debt, effective tax rate from historical filings.",
      methods:
        "Revenue projection: segment-level growth rate assumptions phased over 5-year explicit forecast period. EBIT margin ramp: AWS expanding to 30%+, retail improving gradually. FCFF = EBIT(1-t) + D&A − ΔWorking Capital − Capex. WACC: w_e × k_e + w_d × k_d × (1-t). Terminal Value: TV = FCFFₙ × (1+g) / (WACC−g). Enterprise Value = PV(explicit FCFFs) + PV(TV). Equity Value = EV − Net Debt. Sensitivity table: implied price across WACC (8%–12%) × terminal growth (2%–4%).",
      results:
        "Implied intrinsic value per share range derived from the sensitivity table, with mid-case assumptions yielding a defensible price target. AWS, despite representing ~17% of total revenue, accounts for 55–65% of total enterprise value — illustrating how segment-level analysis reveals hidden value embedded in Amazon's cloud business that a consolidated model would understate.",
      learnings:
        "Conglomerate valuation requires segment decomposition — treating Amazon as a single entity distorts its value by blending AWS's 30%+ margins with retail's sub-5% margins. WACC sensitivity matters enormously for long-duration growth companies: a 1% change in discount rate moves Amazon's implied value by 15–20%. This project develops the analytical judgment required for equity research coverage of large-cap tech.",
    },
    fileSlug: "amazon-valuation-model.xlsx",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRFGMQwX84nSKp_hYrSx0_PAQkx65u_FGrqyi5SSbltLJw?em=2&wdHideGridlines=True&wdInConfigurator=True&wdInConfigurator=True",
  },

  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    id: "lbo-sources-uses",
    title: "LBO Transaction Structuring — Sources & Uses Analysis",
    summary:
      "Models the full debt/equity capitalization for a leveraged buyout, breaking down every financing source (senior secured, mezzanine, sponsor equity) and every use of capital (purchase price, deal fees, refinancing) — the first page any investment banker or credit analyst builds on a new deal.",
    description:
      "A Sources & Uses waterfall is the foundation of every leveraged buyout model. This workbook constructs the complete capitalization table for an LBO transaction: debt tranches by seniority, sponsor equity commitment, acquisition premium, advisory fees, and OID. The model verifies that sources equal uses to the penny, computes key leverage ratios (Debt/EBITDA, Equity/TEV), and sets up the pro-forma balance sheet for year-one debt scheduling.",
    category: "Leveraged Finance",
    tags: ["LBO", "Leveraged Finance", "Capital Structure", "Sources & Uses", "Private Equity", "Deal Structuring"],
    tools: ["Excel", "Financial Modeling", "LBO Analysis"],
    metrics: [
      { label: "Structure", value: "Sources = Uses (balanced)" },
      { label: "Debt Tranches", value: "Senior Secured + Mezz" },
      { label: "Key Ratio", value: "Debt / EBITDA at close" },
      { label: "Equity Check", value: "Sponsor equity % of TEV" },
    ],
    skills: [
      "LBO Modeling", "Capital Structure Analysis", "Deal Structuring",
      "Leveraged Finance", "Debt Waterfall", "Pro-forma Balance Sheet",
    ],
    caseStudy: {
      problem:
        "Structure a leveraged acquisition by determining the optimal mix of debt and equity that maximizes sponsor returns while keeping leverage within lender covenant thresholds — a core task in any PE deal process.",
      approach:
        "Built a Sources & Uses schedule from the ground up: defined the target enterprise value, modeled three debt tranches with their respective coupon rates and sizing constraints, calculated deal fees as a percentage of TEV, and sized sponsor equity as the residual funding need.",
      data:
        "Target company EBITDA, purchase multiple, prevailing credit spreads for each debt tranche, advisory and financing fee schedules, and OID assumptions drawn from leveraged loan market conventions.",
      methods:
        "Circular-reference-free debt sizing using EBITDA-based leverage constraints (e.g., max 4.5× senior, 5.5× total). Sources = Uses verification formula. Pro-forma LTV and interest coverage ratios. Sensitivity table showing sponsor equity % vs. purchase multiple.",
      results:
        "Fully balanced capitalization table with total sources equaling total uses. Model outputs include closing leverage ratios, equity contribution as a percentage of total enterprise value, and annual interest expense for Year 1 — ready to feed directly into a full LBO waterfall model.",
      learnings:
        "Precision in deal structuring matters: a one-turn increase in leverage meaningfully shifts sponsor IRR but raises credit risk. Understanding fee conventions, OID mechanics, and tranche seniority is essential for anyone working in leveraged finance or private equity.",
    },
    fileSlug: "lbo-sources-uses.xlsx",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQT8b7d-fNJQQZyqWyICY_9XAVfDN3NMloIlsDkhye0Zi4s?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    id: "ipo-valuation-analysis",
    title: "IPO Valuation & Equity Offering Analysis",
    summary:
      "Applies comparable company trading multiples and discounted cash flow analysis to establish an IPO offer price range for a growth company, with dilution analysis, use-of-proceeds schedule, and post-money capitalization table.",
    description:
      "Going public requires pricing a company's equity against the market reality of comparable traded peers. This model builds the full IPO pricing workflow: peer-group multiple selection, blended valuation range, primary/secondary share allocation, dilution calculation for existing shareholders, and use-of-proceeds waterfall. The output is an offer price range with supporting sensitivity analysis — the core deliverable in any equity capital markets (ECM) transaction.",
    category: "Equity Capital Markets",
    tags: ["IPO", "Equity Valuation", "Capital Markets", "Trading Comps", "Dilution Analysis", "ECM"],
    tools: ["Excel", "Valuation Modeling", "Capital Markets Analysis"],
    metrics: [
      { label: "Valuation Methods", value: "Comps + DCF" },
      { label: "Output", value: "IPO price range ($/share)" },
      { label: "Analysis", value: "Dilution & cap table" },
      { label: "Schedule", value: "Use-of-proceeds waterfall" },
    ],
    skills: [
      "IPO Pricing", "Comparable Company Analysis", "Dilution Analysis",
      "Capitalization Table", "Equity Capital Markets", "Valuation Modeling",
    ],
    caseStudy: {
      problem:
        "Determine a defensible IPO offer price range that balances leaving sufficient upside for public investors with maximizing proceeds for the issuer and selling shareholders — the central tension in every equity offering.",
      approach:
        "Selected a peer group of publicly traded comparable companies, computed EV/Revenue and EV/EBITDA multiples for each peer, applied a discount for IPO uncertainty, and triangulated with a DCF to establish a 25th–75th percentile offer price range.",
      data:
        "LTM and NTM financial estimates for the issuer, peer-group trading multiples pulled from public filings, projected shares outstanding (including option pool and secondary offering shares), and WACC assumptions from comparable company beta analysis.",
      methods:
        "Trading comps: median and mean EV/EBITDA, EV/Revenue applied to issuer financials. DCF: FCFF projection with terminal growth; WACC from CAPM. Dilution: fully-diluted share count including RSUs and options. Use-of-proceeds: debt repayment, growth capex, working capital, and banker fees.",
      results:
        "A price range supported by three independent valuation methods. Model shows implied market cap at offer, equity value to selling shareholders, primary proceeds available for growth, and dilution percentage for pre-IPO investors.",
      learnings:
        "IPO pricing is as much art as science — anchor investors and bookbuilding dynamics often shift the final price outside the model range. But the analytical framework ensures the price is grounded in fundamentals, giving bankers and investors a shared reference point.",
    },
    fileSlug: "ipo-valuation-analysis.xlsx",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQOuU8f0G_vTJENLSJXhDxlAZZao7Zmdh2DoYcx1_M2_aM?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    id: "pe-exit-analysis",
    title: "Private Equity Exit Strategy & Return Analysis",
    summary:
      "Models three exit scenarios — strategic sale, secondary buyout, and IPO — computing sponsor IRR, MOIC, and cash-on-cash returns at multiple exit years and exit multiples to optimize the hold-period decision.",
    description:
      "Exit strategy is where PE returns are realized. This model builds a full exit analysis module: for each of three exit routes (strategic M&A, sponsor-to-sponsor, and public market listing), it applies a range of exit EV/EBITDA multiples at Years 3, 4, and 5, computes equity proceeds after debt repayment, and calculates IRR and MOIC from initial sponsor investment. The result is a return heatmap that guides the hold-vs.-exit decision.",
    category: "Private Equity",
    tags: ["Private Equity", "Exit Analysis", "IRR", "MOIC", "Return Analysis", "LBO", "M&A"],
    tools: ["Excel", "PE Modeling", "Return Analysis"],
    metrics: [
      { label: "Exit Routes", value: "Strategic / SBO / IPO" },
      { label: "Return Metrics", value: "IRR & MOIC" },
      { label: "Hold Periods", value: "Year 3, 4, 5" },
      { label: "Output", value: "Return heatmap" },
    ],
    skills: [
      "Private Equity Modeling", "IRR Calculation", "MOIC Analysis",
      "Exit Multiple Analysis", "Return Optimization", "Equity Waterfall",
    ],
    caseStudy: {
      problem:
        "After acquiring a company in an LBO, determine the optimal exit route and timing to maximize sponsor returns — balancing company earnings growth against entry/exit multiple expansion or contraction.",
      approach:
        "Built an exit analysis overlay on top of the LBO debt model: projected EBITDA forward by year, applied a matrix of exit EV/EBITDA multiples (ranging from 6× to 10×), computed equity proceeds after repaying remaining debt, and back-solved for IRR and MOIC given the initial equity investment.",
      data:
        "Projected EBITDA by year (driven by the base LBO model), outstanding debt schedule, entry equity investment, and exit multiple ranges benchmarked against comparable M&A transaction precedents.",
      methods:
        "Equity proceeds = Exit EV − Net Debt at exit year. MOIC = Equity Proceeds / Equity Invested. IRR: XIRR function applied to entry equity outflow and exit equity inflow. Sensitivity tables: IRR and MOIC as a matrix of exit multiple (rows) × hold year (columns). Scenario columns: strategic buyer premium, SBO pricing, IPO float discount.",
      results:
        "A return heatmap showing that the highest IRR is achieved at Year 4 via a strategic sale at 9×–10× EBITDA, generating a 3.2× MOIC and ~35% IRR. The model demonstrates the compounding effect of EBITDA growth and debt paydown on sponsor returns over the hold period.",
      learnings:
        "The exit multiple is as important as operational value creation. A one-turn improvement in exit multiple (8× vs. 7×) can add 400–600 bps of IRR — highlighting why sponsor exit timing and buyer identification are critical to fund performance.",
    },
    fileSlug: "pe-exit-analysis.xlsx",
    embedUrl: "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQot9O8yHhGQ6mKy6mXwraOAYlmDDKdJYRg9VssTe9HnLo?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    id: "equity-portfolio-z-scores",
    title: "Quantitative Equity Screening — Z-Score & Factor Analysis",
    summary:
      "Applies Altman Z-Score and multi-factor standardization to rank S&P constituents by financial health and momentum, generating systematic buy/sell signals for quantitative portfolio construction.",
    description:
      "Quantitative equity strategies rely on factor models to systematically rank securities. This workbook implements a Z-Score screening framework: it computes Altman Z-Scores for a universe of equities to flag financial distress risk, then layers on additional factor z-scores (valuation, profitability, momentum) to generate a composite ranking. The output is a portfolio inclusion/exclusion list with supporting factor attribution — the foundation of any systematic long/short equity strategy.",
    category: "Quantitative Finance",
    tags: ["Quantitative Finance", "Z-Score", "Factor Analysis", "Altman Z-Score", "Equity Screening", "Portfolio Construction"],
    tools: ["Excel", "Quantitative Analysis", "Statistical Modeling"],
    metrics: [
      { label: "Methodology", value: "Altman Z-Score + multi-factor" },
      { label: "Output", value: "Composite ranking & signals" },
      { label: "Factors", value: "Value, quality, momentum" },
      { label: "Application", value: "Systematic equity selection" },
    ],
    skills: [
      "Altman Z-Score", "Factor Modeling", "Quantitative Equity Analysis",
      "Statistical Standardization", "Portfolio Construction", "Risk Screening",
    ],
    caseStudy: {
      problem:
        "Build a systematic, data-driven framework to screen a large equity universe for financial health and rank stocks by their attractiveness — removing the subjectivity inherent in discretionary stock picking.",
      approach:
        "Implemented the Altman Z-Score formula on each company's balance sheet and income statement data to identify financially stressed firms. Extended the analysis with cross-sectional z-score normalization of key financial ratios (ROE, EV/EBITDA, revenue growth) to create a composite multi-factor score.",
      data:
        "Financial ratios for S&P constituents: working capital, retained earnings, EBIT, market cap, book value of debt, and revenue — sourced from public company filings.",
      methods:
        "Altman Z-Score: Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 1.0X₅. Cross-sectional z-score normalization: (value − mean) / std dev for each factor. Composite score: equal-weighted average of factor z-scores. Classification: Z > 2.99 (safe zone), 1.81–2.99 (grey zone), < 1.81 (distress zone).",
      results:
        "Ranked portfolio of equities by composite score, with Altman Z-Score distress flags filtering out financially weak names. Top-decile companies show strong combined financial health and attractive valuation/momentum characteristics — providing a disciplined, repeatable selection process.",
      learnings:
        "Factor z-score normalization is essential for combining metrics on different scales — without it, high-magnitude factors (like revenue in billions) dominate the composite score. Understanding factor construction is the first step toward building institutional-grade quant strategies.",
    },
    fileSlug: "equity-portfolio-z-scores.xlsx",
    embedUrl: "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQXz6OYwQ_ES66sEkDWvcKSAUkwWrrOr7A6tGnEBl4eHn0?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    id: "volatility-smile-analysis",
    title: "Implied Volatility Surface & Volatility Smile Analysis",
    summary:
      "Constructs the implied volatility smile and term structure surface from 2021 equity options market data, visualizing how IV varies across strikes and maturities — a core tool for options traders and derivatives desks.",
    description:
      "The Black-Scholes model assumes constant volatility, but markets price options with a volatility 'smile' — implied volatility varies systematically by strike and expiry. This workbook back-solves implied volatility from market option prices for a range of strikes (ITM/ATM/OTM) and multiple expiration dates, constructs the 3D volatility surface, and analyzes the skew pattern. The analysis has direct applications in derivatives pricing, risk management, and structured product design.",
    category: "Derivatives & Options",
    tags: ["Derivatives", "Implied Volatility", "Volatility Smile", "Options Markets", "Volatility Surface", "Skew Analysis"],
    tools: ["Excel", "Options Analytics", "Derivatives Pricing"],
    metrics: [
      { label: "Data Year", value: "2021 market options data" },
      { label: "Analysis", value: "IV smile + term structure" },
      { label: "Coverage", value: "ITM, ATM, OTM strikes" },
      { label: "Output", value: "3D volatility surface" },
    ],
    skills: [
      "Implied Volatility", "Volatility Smile / Skew", "Options Pricing",
      "Derivatives Markets", "Volatility Surface Construction", "Risk Management",
    ],
    caseStudy: {
      problem:
        "Real options markets violate Black-Scholes's constant-volatility assumption — implied volatility varies by strike and expiry, creating the 'volatility smile.' Quantify and visualize this pattern using actual 2021 market data.",
      approach:
        "Collected market prices for call and put options across multiple strikes and expiration dates. Used the Black-Scholes pricing formula in reverse — iteratively solving for the volatility input that produces the observed market price (Newton-Raphson bisection in Excel) — to extract implied volatility for each option.",
      data:
        "2021 equity options market prices (calls and puts) across 5+ expiration dates and 7+ strikes ranging from 80% to 120% of spot price. Underlying spot price, risk-free rate, and dividend yield as of the observation date.",
      methods:
        "IV extraction: Excel Goal Seek / iterative formula to back-solve Black-Scholes for σ. Smile visualization: XY scatter plot of IV vs. moneyness (K/S) for each expiry. Term structure: IV by expiry at ATM strike. 3D surface: combined strike × maturity × IV chart showing the full surface.",
      results:
        "A clearly visualized volatility smile showing pronounced left skew (higher IV for OTM puts) consistent with equity crash risk premium. Term structure shows elevated short-term IV relative to longer-dated options, reflecting near-term uncertainty. Directly applicable to options desk pricing and hedging work.",
      learnings:
        "The volatility smile is one of the most important empirical findings in modern finance — it shows that market participants price tail risk beyond what Black-Scholes assumes. Understanding skew is essential for anyone working in derivatives trading, structuring, or risk management.",
    },
    fileSlug: "volatility-smile-analysis.xlsx",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQRkRQteZi7cTaVZtg8RUn2_ARLoybyDhIN-S1pIiQ6KsxI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    id: "bmc-financial-analysis",
    title: "BMC Software — Financial Statement Analysis & Valuation",
    summary:
      "Analyzes BMC Software's historical three-statement financials, computes key profitability, leverage, and efficiency ratios across multiple years, and applies comparable company multiples to derive an intrinsic valuation range.",
    description:
      "Company-specific financial statement analysis is the core work of equity research and investment banking. This workbook takes BMC Software's IS/BS/CF across multiple reporting periods, normalizes for non-recurring items, builds a comprehensive ratio analysis (profitability, liquidity, leverage, efficiency), and applies a comparable company analysis to determine an implied enterprise value range — exactly the type of analysis conducted in an equity research initiation or M&A target screening.",
    category: "Equity Research & Valuation",
    tags: ["Financial Statement Analysis", "Valuation", "Comparable Company Analysis", "Ratio Analysis", "Equity Research", "Technology Sector"],
    tools: ["Excel", "Financial Modeling", "Equity Research"],
    metrics: [
      { label: "Company", value: "BMC Software (public tech)" },
      { label: "Analysis", value: "3-statement + ratio analysis" },
      { label: "Valuation", value: "Trading comps implied range" },
      { label: "Ratios", value: "Profitability, leverage, efficiency" },
    ],
    skills: [
      "Financial Statement Analysis", "Ratio Analysis", "Comparable Company Analysis",
      "Profitability Metrics", "Capital Structure Analysis", "Equity Valuation",
    ],
    caseStudy: {
      problem:
        "Understand BMC Software's financial health and growth trajectory from its public financial statements, and determine whether the company is fairly valued relative to software-sector peers.",
      approach:
        "Pulled multi-year IS/BS/CF data for BMC Software, normalized for one-time items, computed a comprehensive ratio suite (gross margin, EBITDA margin, ROE, ROIC, net debt/EBITDA, current ratio, DSO), and benchmarked key ratios against software sector peers to identify where BMC over- or under-performs.",
      data:
        "BMC Software annual financial statements (income statement, balance sheet, cash flow statement) from public SEC filings across 3–4 fiscal years. Software sector peer multiples and financial benchmarks.",
      methods:
        "Common-size income statement (% of revenue). Year-over-year revenue and margin trend analysis. DuPont ROE decomposition (margin × asset turnover × leverage). Net debt calculation. EBITDA and free cash flow derivation. EV/EBITDA and EV/Revenue implied valuation applying peer median multiples to LTM financials.",
      results:
        "Multi-year trend analysis showing consistent revenue growth and margin expansion at BMC. Ratio benchmarking identifies areas of strength (strong FCF conversion) and risk (elevated leverage ratios). Implied valuation range using peer comps provides a basis for assessing whether the stock price reflects fair value.",
      learnings:
        "Reading financial statements critically — adjusting for non-recurring items, understanding working capital dynamics, and triangulating across IS/BS/CF — is what separates surface-level analysis from genuine investment insight. BMC's later take-private by Silver Lake validated the undervaluation implied by the comps analysis.",
    },
    fileSlug: "bmc-financial-analysis.xlsx",
    embedUrl: "https://1drv.ms/x/c/c0e2a8c7fee10a46/IQQeHhGo1HBjQrzkfpqevpTPAXGVf4P3HyvYP6OCt3qfUB8?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    id: "intangible-asset-valuation",
    title: "Intangible Asset Valuation — Purchase Price Allocation (ASC 805)",
    summary:
      "Values acquired intangible assets — customer relationships, developed technology, and trade names — using excess earnings and relief-from-royalty methods under the ASC 805 purchase price allocation framework required in every M&A transaction.",
    description:
      "When a company acquires another, GAAP requires a Purchase Price Allocation (PPA) under ASC 805: every identifiable intangible asset must be measured at fair value on the acquisition date. This model implements two standard appraisal methods — the Multi-Period Excess Earnings Method (MPEEM) for customer relationships and the Relief-from-Royalty (RfR) method for technology and trade names — computing amortizable fair values for each intangible asset and reconciling to total goodwill.",
    category: "M&A & Valuation",
    tags: ["M&A", "Purchase Price Allocation", "ASC 805", "Intangible Assets", "Valuation", "Goodwill", "MPEEM"],
    tools: ["Excel", "Valuation Modeling", "M&A Analysis"],
    metrics: [
      { label: "Framework", value: "ASC 805 (GAAP)" },
      { label: "Methods", value: "MPEEM + Relief-from-Royalty" },
      { label: "Assets Valued", value: "Customer relationships, IP, brand" },
      { label: "Output", value: "Fair value + goodwill reconciliation" },
    ],
    skills: [
      "Purchase Price Allocation", "ASC 805", "Intangible Asset Valuation",
      "MPEEM", "Relief-from-Royalty", "M&A Accounting", "Goodwill Analysis",
    ],
    caseStudy: {
      problem:
        "After an acquisition closes, the acquirer must allocate the purchase price across all identifiable assets and liabilities at fair value — and separately value each intangible asset. Failure to do this correctly results in audit findings and restatements.",
      approach:
        "Applied two GAAP-required appraisal methods: (1) MPEEM for customer relationships — projects the future cash flows attributable specifically to the acquired customer base, net of contributory asset charges, discounted to PV; (2) RfR for technology and trade name — estimates the royalty payments the company would owe if it had to license the IP from a third party, capitalized to a fair value.",
      data:
        "Acquired company historical and projected revenues, customer attrition rates, operating margins, contributory asset charges (on working capital, fixed assets, workforce), appropriate discount rates, and market royalty rates for comparable technologies and brand names.",
      methods:
        "MPEEM: [Revenue × gross margin − contributory charges] discounted at WACC + risk premium. RfR: [Revenue × royalty rate × (1 − tax)] discounted at discount rate. Both methods compute fair value as present value of post-tax cash flows. Goodwill = purchase price − sum of all identified net assets at fair value.",
      results:
        "Fair value allocations for each intangible asset with supporting amortization periods, total identifiable intangibles value, and residual goodwill calculation. The model produces an output table directly usable in the acquisition journal entry and the financial statement footnote disclosure.",
      learnings:
        "ASC 805 analysis sits at the intersection of accounting, valuation, and deal economics. Understanding how intangibles are valued (and how goodwill is measured as the residual) gives analysts critical insight into deal quality — high goodwill relative to identifiable intangibles often signals an acquirer overpaying for synergies that may never materialize.",
    },
    fileSlug: "intangible-asset-valuation.xlsx",
    embedUrl: "https://1drv.ms/x/c/67DAFBAC3E47D822/IQQf1bBjP-0CQ4RCqwkJPmW2AR9pfrJBxmQZVV_FLzs1WCI?em=2&wdHideGridlines=True&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
  },
];
