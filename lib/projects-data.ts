// Python Projects Data — Accurate metadata derived from actual Jupyter notebooks
// All 6 projects are financial engineering work: derivatives pricing, Monte Carlo
// simulation, binomial tree modeling, and equity analytics using real market data.

export interface Metric {
  label: string;
  value: string;
}

export interface Tag {
  name: string;
}

export interface CaseStudy {
  problem: string;
  approach: string;
  data: string;
  methods: string;
  results: string;
  learnings: string;
}

export interface PythonProject {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  difficulty: "Intermediate" | "Advanced" | "Expert";
  tags: Tag[];
  technologies: string[];
  metrics: Metric[];
  notebookPath: string;
  caseStudy: CaseStudy;
  skillsdemonstrated?: string[];
}

export const pythonProjects: PythonProject[] = [
  // ── PROJECT 1 ──────────────────────────────────────────────────────────────
  {
    id: "black-scholes-options-pricing",
    title: "Black-Scholes Options Pricing Engine",
    summary:
      "Built a complete European options pricing calculator from the Black-Scholes closed-form solution, pricing both calls and puts across 101 stock-price scenarios and incorporating continuous dividend yields.",
    description:
      "Implements the full Black-Scholes pricing framework from scratch using NumPy and SciPy. Derives d\u2081/d\u2082 analytically, prices both call and put options, validates against known benchmarks, and generates payoff-vs-price curves for risk visualization. Extends the core model to handle continuous dividend rates, demonstrating how dividend yields reduce call-option fair value.",
    category: "derivatives-pricing",
    difficulty: "Intermediate",
    tags: [
      { name: "Options Pricing" },
      { name: "Derivatives" },
      { name: "Black-Scholes" },
      { name: "Put-Call Parity" },
      { name: "Financial Math" },
    ],
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
    metrics: [
      { label: "Call Price Validated", value: "$0.3423 (benchmark match)" },
      { label: "Scenarios Priced", value: "101 stock-price points" },
      { label: "Option Types", value: "Call & Put" },
      { label: "Model Extension", value: "Continuous dividend yield" },
    ],
    notebookPath: "/notebooks/project-1.ipynb",
    caseStudy: {
      problem:
        "Derivatives desks need a reliable, parameterized options calculator to price European calls and puts, validate against known benchmarks, and extend seamlessly to dividend-paying underlyings — without relying on external pricing libraries.",
      approach:
        "Implemented the closed-form Black-Scholes formula directly using scipy.stats.norm.cdf for the cumulative normal distribution. Built a modular black_scholes_formula function accepting stock price, strike, time-to-expiration, risk-free rate, volatility, option type, and an optional dividend parameter. Validated output against a known benchmark ($0.3423) before extending to full scenario analysis.",
      data:
        "Theoretical inputs: spot prices from $10 to $60 in $0.50 increments (101 scenarios), strike = $35, T = 6 months, sigma = 20%, r = 1%. Dividend extension tested at 2.5% continuous annual yield.",
      methods:
        "Black-Scholes closed-form: Call = S\u2080N(d\u2081) - Ke^(-rT)N(d\u2082); Put = Ke^(-rT)N(-d\u2082) - S\u2080N(-d\u2081). Dividend-adjusted version: S\u2080 replaced by S\u2080e^(-qT). Payoff curves: max(S\u209c - K, 0) for calls. Matplotlib for overlaid option-price vs. payoff visualization.",
      results:
        "Benchmark validation passed: call price = $0.3423. Put option priced higher than call under same parameters (stock $30 < strike $35), confirming in-the-money dynamics. Adding a 2.5% dividend yield reduced the call price, consistent with theory: higher dividends lower the expected future stock price, reducing call value.",
      learnings:
        "Mastered the mathematical foundations of no-arbitrage derivatives pricing. Gained intuition for how moneyness (S vs K), time value, and dividend yield interact within the Black-Scholes framework — directly applicable to derivatives desks and structured products roles.",
    },
    skillsdemonstrated: [
      "Closed-Form Derivatives Pricing",
      "Mathematical Modeling",
      "Benchmark Validation",
      "Parametric Function Design",
      "Payoff Visualization",
      "Dividend-Adjusted Modeling",
      "Quantitative Finance",
    ],
  },

  // ── PROJECT 2 ──────────────────────────────────────────────────────────────
  {
    id: "black-scholes-greeks-implied-vol",
    title: "Black-Scholes Greeks, Term Structure & Implied Volatility",
    summary:
      "Extended the Black-Scholes model to compute all five option Greeks, modeled the yield curve with a Nelson-Siegel term structure, and calibrated AAPL implied volatility via the bisection method.",
    description:
      "A quantitative deep-dive into the sensitivity and calibration layer of options pricing. Computes delta, gamma, theta, vega, and rho analytically. Replaces the constant risk-free rate assumption with a Nelson-Siegel spot-rate curve fitted to market data. Uses the bisection numerical method to back out AAPL's implied volatility from a June 2020 market option price — a core task in options trading and vol-surface construction.",
    category: "derivatives-pricing",
    difficulty: "Advanced",
    tags: [
      { name: "Greeks" },
      { name: "Implied Volatility" },
      { name: "Term Structure" },
      { name: "Nelson-Siegel" },
      { name: "Bisection Method" },
    ],
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
    metrics: [
      { label: "Greeks Computed", value: "\u0394, \u0393, \u0398, \u03bd, \u03c1 (all five)" },
      { label: "Spot Curve", value: "1 quarter \u2192 30 years" },
      { label: "IV Calibration Target", value: "AAPL Jun 30, 2020" },
      { label: "Bisection Tolerance", value: "< $0.001 convergence" },
    ],
    notebookPath: "/notebooks/project-5.ipynb",
    caseStudy: {
      problem:
        "Options traders require not just option prices but their sensitivities (Greeks) for hedging. In practice, risk-free rates are not constant — they follow a term structure. And implied volatility, not historical vol, drives real option pricing — requiring efficient numerical calibration from market prices.",
      approach:
        "Built a black_scholes_greeks function returning all five Greeks analytically. Extended black_scholes_formula with a boolean greeks flag for optional Greek output. Implemented a Nelson-Siegel spot-rate function (alpha=0.7143, beta_0=2.99, beta_1=-2.70, beta_2=-2.12) replacing the constant risk-free rate. Applied the bisection numerical method to solve for sigma* such that BS(sigma*) = market price, with convergence tolerance < $0.001.",
      data:
        "Theoretical call/put parameters for Greek verification. Nelson-Siegel calibration across terms from 1 quarter to 30 years. AAPL market data: S\u2080=$364.14, K=$380, market call price=$26, expiry Aug 21 2020 (~52 days), dividend yield=0.9%.",
      methods:
        "Analytical Greeks: delta = N(d\u2081) [call], gamma = phi(d\u2081)/(S\u2080*sigma*sqrt(T)), vega = S\u2080*sqrt(T)*phi(d\u2081). Nelson-Siegel spot rate: r(T) = beta_0 + (beta_1+beta_2)*(1-e^(-T/alpha))/(T/alpha) - beta_2*e^(-T/alpha). Bisection: iteratively halves the sigma-interval until |BS(sigma) - market_price| < $0.001.",
      results:
        "All five Greeks verified against benchmark values from the Black-Scholes formula. Spot curve shows upward-sloping term structure — consistent with normal market conditions. Bisection converged to AAPL implied volatility within tolerance, demonstrating a production-grade calibration workflow used in vol-surface construction.",
      learnings:
        "Deep mastery of options sensitivity analysis, term-structure modeling, and numerical root-finding — the exact skills required for derivatives risk management, vol trading, and structured products roles at banks and hedge funds.",
    },
    skillsdemonstrated: [
      "Options Greeks (\u0394, \u0393, \u0398, \u03bd, \u03c1)",
      "Implied Volatility Calibration",
      "Nelson-Siegel Term Structure",
      "Bisection Numerical Method",
      "Derivatives Risk Management",
      "Market Data Calibration",
      "Quantitative Modeling",
    ],
  },

  // ── PROJECT 3 ──────────────────────────────────────────────────────────────
  {
    id: "monte-carlo-gbm-simulation",
    title: "Monte Carlo Stock Price Simulation — Geometric Brownian Motion",
    summary:
      "Progressively built a Geometric Brownian Motion (GBM) stock price simulator across five model iterations, running 1,000 Monte Carlo trials of Ford (F) over 250 trading days and analyzing the resulting return distribution.",
    description:
      "A ground-up construction of the standard GBM model used in quantitative finance. Starting from a naive random walk, each iteration resolves a real-world modeling problem: negative prices, non-scaled volatility, fixed magnitude, and missing drift. The final model is the Cox-Ross-Rubinstein (CRR) up/down factor framework with risk-free drift — the same structure underlying the binomial options pricing model.",
    category: "stochastic-modeling",
    difficulty: "Intermediate",
    tags: [
      { name: "Monte Carlo" },
      { name: "GBM" },
      { name: "Stochastic Processes" },
      { name: "Risk Simulation" },
      { name: "Probability" },
    ],
    technologies: ["Python", "NumPy", "Matplotlib", "random"],
    metrics: [
      { label: "Monte Carlo Trials", value: "1,000 paths" },
      { label: "Time Horizon", value: "250 trading days" },
      { label: "Model Iterations", value: "5 progressive versions" },
      { label: "Simulated Annual RoR", value: "\u22480.64% (rf = 1%)" },
    ],
    notebookPath: "/notebooks/project-2.ipynb",
    caseStudy: {
      problem:
        "A naive random walk model for stock prices produces negative prices and violates key stylized facts of equity returns. A production-grade stochastic model must be theoretically grounded: lognormally distributed, volatility-scaled with time, and drift-adjusted for the risk-free rate.",
      approach:
        "Iteratively improved a random walk simulation across five versions: (1) simple +/-$1 random walk, (2) multiplicative steps to enforce positivity, (3) time-scaled volatility (sigma*sqrt(delta_t)), (4) asset-specific annual volatility (sigma=10% for Ford F), (5) risk-neutral drift incorporating the risk-free rate. Each version validated via terminal price histogram and simulated annual return calculation.",
      data:
        "Ford Motor Company (F): starting price $5.00, annual volatility sigma=10%, risk-free rate r=1%, 250 trading steps, 1,000 independent Monte Carlo trials. Reproducible: random.seed(5615).",
      methods:
        "Simple random walk: X(t+1) = X(t) +/- 1. Multiplicative: X(t+1) = X(t) * (1 +/- step). Volatility-scaled: step = sigma/sqrt(steps). With drift: up = e^((r - sigma^2/2)*dt + sigma*sqrt(dt)), down = 1/up. Average path and 100-path ensemble plots. Annual RoR: (P_final - P_initial) / P_initial.",
      results:
        "Multiplicative model eliminates negative prices. Volatility-scaled steps produce realistic terminal distributions. Final GBM model with drift yields simulated average annual return of ~0.64% (vs. 1% assumed risk-free rate — close but not exact due to discrete-time approximation and Monte Carlo variance at 1,000 trials).",
      learnings:
        "Built deep intuition for stochastic process design: why the log-normal assumption is used, how volatility scales with time (the sqrt(T) rule), and why risk-neutral drift matters for option pricing. These principles underpin Black-Scholes, the CRR binomial model, and all Monte Carlo risk engines.",
    },
    skillsdemonstrated: [
      "Monte Carlo Simulation",
      "Geometric Brownian Motion",
      "Stochastic Process Design",
      "Terminal Distribution Analysis",
      "Iterative Model Refinement",
      "Statistical Validation",
      "Path Ensemble Visualization",
    ],
  },

  // ── PROJECT 4 ──────────────────────────────────────────────────────────────
  {
    id: "crr-binomial-tree-pricing",
    title: "Cox-Ross-Rubinstein Binomial Tree Option Pricing",
    summary:
      "Priced European options using a CRR binomial tree Monte Carlo simulation and demonstrated convergence to Black-Scholes as steps and trials increase — validated on both Ford (F) and Tesla (TSLA) options.",
    description:
      "Implements the Cox-Ross-Rubinstein (CRR) binomial tree as a Monte Carlo simulation engine. By simulating thousands of risk-neutral up/down paths and discounting the average terminal payoff, this model prices options without closed-form solutions. Convergence to the Black-Scholes price is demonstrated by increasing steps to 1,000 and trials to 5,000, with TSLA's high-volatility put option used as a stress test.",
    category: "derivatives-pricing",
    difficulty: "Advanced",
    tags: [
      { name: "CRR Binomial Tree" },
      { name: "Monte Carlo" },
      { name: "Convergence Analysis" },
      { name: "Option Pricing" },
      { name: "Numerical Methods" },
    ],
    technologies: ["Python", "NumPy", "Matplotlib", "random"],
    metrics: [
      { label: "Convergence (Ford)", value: "$0.0586 vs BS $0.0570" },
      { label: "Stress Test (TSLA)", value: "$165.73 vs BS $163.23" },
      { label: "Max Simulation Scale", value: "5,000 trials \u00d7 1,000 steps" },
      { label: "Error Reduction", value: "72% lower with finer grid" },
    ],
    notebookPath: "/notebooks/project-3.ipynb",
    caseStudy: {
      problem:
        "Closed-form pricing formulas like Black-Scholes only exist for vanilla European options. For path-dependent or exotic derivatives, simulation-based methods like the CRR binomial tree are essential — and must demonstrably converge to known analytical prices to be trusted in production.",
      approach:
        "Used the CRR up/down factors (u = e^(sigma*sqrt(delta_t)), d = 1/u) to simulate 1,000 risk-neutral price paths over 250 steps. Computed terminal payoffs for a call option on Ford F (K=$5.50). Averaged payoffs and discounted to present value. Scaled to 5,000 trials and 1,000 steps to demonstrate convergence. Extended to Tesla (TSLA) with sigma=70%, S0=$1,400, K=$1,200 put option to stress-test under extreme volatility.",
      data:
        "Ford (F): S\u2080=$5, sigma=10%, r=1%, K=$5.50, T=1 year. Tesla (TSLA): S\u2080=$1,400, sigma=70%, r=1%, K=$1,200, T=6 months. All simulations reproducible: random.seed(5615).",
      methods:
        "CRR factors: u = e^(sigma*sqrt(dt)), d = e^(-sigma*sqrt(dt)), risk-neutral probability p = (e^(r*dt) - d)/(u - d). Terminal payoffs: max(S_T - K, 0) for calls, max(K - S_T, 0) for puts. Present value: PV = avg_payoff / (1 + r). Black-Scholes formula used as convergence benchmark. Average simulated price path plotted for TSLA vs. Ford comparison.",
      results:
        "Low-resolution (1,000 trials, 250 steps): F call = $0.0501 vs BS $0.0570 (error $0.0069). High-resolution (5,000 trials, 1,000 steps): F call = $0.0586 vs BS $0.0570 (error $0.0016 — 72% reduction). TSLA 6-month put: CRR = $165.73 vs BS $163.23 (error $2.50 under extreme 70% vol). Confirms CRR convergence as expected by theory.",
      learnings:
        "Demonstrated that simulation-based pricing converges to analytical prices as step size decreases and trial count increases — the core principle underlying Monte Carlo derivatives pricing engines used in production trading systems for path-dependent and exotic products.",
    },
    skillsdemonstrated: [
      "CRR Binomial Tree",
      "Monte Carlo Option Pricing",
      "Numerical Convergence Analysis",
      "Risk-Neutral Valuation",
      "High-Volatility Stress Testing",
      "Simulation Engine Design",
      "Model Validation vs. Black-Scholes",
    ],
  },

  // ── PROJECT 5 ──────────────────────────────────────────────────────────────
  {
    id: "sp100-equity-analytics",
    title: "S&P 100 Equity Return Analytics & Correlation Study",
    summary:
      "Processed 5 years of daily price data for 99 S&P 100 component stocks to compute log returns, rank performance, measure volatility, and construct a 99\u00d799 cross-sectional correlation matrix with heatmap.",
    description:
      "Institutional-scale equity analytics pipeline processing the full S&P 100 universe over 2015–2020. Builds a master returns panel from individual CSV files, computes daily log returns, ranks stocks by average return and volatility, and generates a correlation matrix to surface sector clustering effects. Identifies the most and least correlated pairs with fundamental economic justification.",
    category: "portfolio-analytics",
    difficulty: "Advanced",
    tags: [
      { name: "S&P 100" },
      { name: "Correlation Matrix" },
      { name: "Return Analysis" },
      { name: "Portfolio Analytics" },
      { name: "Time Series" },
    ],
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
    metrics: [
      { label: "Universe", value: "99 S&P 100 stocks" },
      { label: "Period", value: "Jul 2015 \u2013 Jun 2020" },
      { label: "Correlation Matrix", value: "99 \u00d7 99" },
      { label: "Highest Corr. Pair", value: "BAC & JPM (banking sector)" },
    ],
    notebookPath: "/notebooks/project-6.ipynb",
    caseStudy: {
      problem:
        "Portfolio managers and risk analysts need to understand cross-sectional return dynamics across a broad equity universe — which stocks move together, which diverge, and what drives performance differences — to build diversified portfolios and manage factor exposures.",
      approach:
        "Built a data pipeline to read 100 individual stock CSV files into a Pandas dictionary, align on a common date range, and construct a unified price panel. Computed daily log returns, derived the average cross-sectional return time series, per-stock mean returns, per-stock return volatility, and the full 99x99 correlation matrix. Visualized with sorted bar charts, a risk-return scatter plot, and a coolwarm-scaled heatmap.",
      data:
        "Individual CSV files per S&P 100 constituent. Filtered to Adjusted Close prices from 2015-07-06 to 2020-06-30 (covering the 2018 correction and COVID-19 sell-off). 99 stocks retained after date alignment.",
      methods:
        "Log returns: r(t) = ln(P(t)/P(t-1)). Average cross-sectional return per day: mean across all tickers. Per-stock statistics: mean and std of daily log return series. Correlation matrix: DataFrame.corr(). Visualization: Matplotlib imshow with coolwarm colormap for heatmap, scatter plot for risk vs. return, sorted bar chart for performance ranking.",
      results:
        "Risk-return scatter reveals expected upward-sloping relationship. BAC and JPM are most positively correlated — shared banking-sector exposure to interest rates and credit cycles. DUK (regulated utility) and NFLX (high-growth tech) are least correlated — structurally different businesses. OXY exhibits highest volatility, consistent with energy-sector oil price sensitivity.",
      learnings:
        "Built expertise in large-scale equity data processing, cross-sectional return analytics, and correlation-based portfolio construction — the quantitative foundation of factor investing, systematic equity strategies, and institutional portfolio risk management.",
    },
    skillsdemonstrated: [
      "Large-Scale Data Processing",
      "Cross-Sectional Return Analysis",
      "Correlation Matrix Construction",
      "Portfolio Risk Analysis",
      "Heatmap Visualization",
      "Sector Clustering Analysis",
      "Pandas & NumPy at Scale",
    ],
  },

  // ── PROJECT 6 ──────────────────────────────────────────────────────────────
  {
    id: "black-scholes-dividend-extension",
    title: "Black-Scholes Pricing: Payoff Curves & Dividend Sensitivity",
    summary:
      "Implemented a full Black-Scholes pricing function with call/put support, generated option price vs. payoff overlay charts across 101 scenarios, and quantified how continuous dividend yields suppress call-option value.",
    description:
      "A comprehensive implementation of the Black-Scholes options pricing model with full extensibility for put-call analysis and dividend modeling. Includes the core call/put pricing calculator with benchmark validation, a 101-point scenario analysis generating option price vs. intrinsic value payoff curves, and a dividend-adjusted extension showing how dividend yields reduce call-option fair value — a critical insight for equity derivatives traders.",
    category: "derivatives-pricing",
    difficulty: "Intermediate",
    tags: [
      { name: "Black-Scholes" },
      { name: "Options Pricing" },
      { name: "Payoff Analysis" },
      { name: "Dividend Modeling" },
      { name: "Scenario Analysis" },
    ],
    technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
    metrics: [
      { label: "Benchmark Validated", value: "Call = $0.3423 confirmed" },
      { label: "Payoff Scenarios", value: "101 stock-price points" },
      { label: "Dividend Extension", value: "2.5% yield impact modeled" },
      { label: "Visualization", value: "Price vs. Payoff overlay chart" },
    ],
    notebookPath: "/notebooks/project-4.ipynb",
    caseStudy: {
      problem:
        "Equity derivatives traders need to understand how option prices relate to underlying payoffs at expiration, and how dividend payments alter fair value — critical for pricing dividend risk in structured products and hedging equity positions around ex-dividend dates.",
      approach:
        "Implemented a modular black_scholes_formula function accepting all standard inputs plus an option type flag ('call'/'put') and optional continuous dividend rate. Ran a 101-point scenario sweep across S0 = $10 to $60 in $0.50 increments, computing both option price and terminal payoff at each level. Overlaid both curves in a single visualization to illustrate time value decay and moneyness. Compared call prices with and without dividend yield to quantify the dividend impact.",
      data:
        "Strike K=$35, T=6 months, sigma=20%, r=1%. Dividend extension at q=2.5% continuous annual yield. Stock price sweep: $10 to $60 in $0.50 increments (101 scenarios).",
      methods:
        "Black-Scholes call/put with dividend: S0 replaced by S0*e^(-q*T) in d1 computation. Call payoff: max(S_T - K, 0). Put payoff: max(K - S_T, 0). Matplotlib overlaid line plot for option price curve vs. intrinsic value. Dividend impact quantified: delta_price = BS(q=0) - BS(q=0.025) evaluated at multiple spot levels.",
      results:
        "Put option is higher-valued than call at same parameters (S=$30 < K=$35) — confirms deep-in-the-money put dynamics consistent with put-call parity. At 2.5% annual dividend, call price decreases: dividends reduce expected future stock price S0*e^(-qT), directly lowering call fair value. Effect amplifies at longer maturities.",
      learnings:
        "Gained practical understanding of option moneyness, time value, and dividend impact on derivatives pricing — directly applicable to equity options trading desks, structured products, and dividend futures strategies.",
    },
    skillsdemonstrated: [
      "Derivatives Pricing Implementation",
      "Scenario Analysis",
      "Dividend-Adjusted Modeling",
      "Put-Call Relationship Analysis",
      "Payoff Overlay Visualization",
      "Options Risk Intuition",
      "Benchmark Validation",
    ],
  },
];
