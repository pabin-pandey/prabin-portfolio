// R / Statistical & Econometric Modeling Projects
// Professional portfolio entries — sourced from Financial Time Series and
// Financial Econometrics coursework at Temple University Fox School of Business.

export interface RMetric {
  label: string;
  value: string;
}

export interface RCodeBlock {
  title: string;
  code: string;
}

export interface RCaseStudy {
  overview: string;
  problem: string;
  approach: string;
  data: string;
  methods: string;
  results: string;
  learnings: string;
}

export interface RProject {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  tools: string[];
  metrics: RMetric[];
  skills: string[];
  caseStudy: RCaseStudy;
  codeBlocks: RCodeBlock[];
}

export const rProjects: RProject[] = [

  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    id: "time-series-ar-forecasting",
    title: "AR(1) Time Series Modeling & Commodity Price Forecasting",
    summary:
      "Identifies, estimates, and validates an AR(1) model on 98 months of commodity price data, producing an 8-month forward forecast with 80% and 95% confidence intervals — a core workflow in quantitative trading and macro research.",
    description:
      "This project applies the Box-Jenkins methodology to a monthly commodity price series (Jan 2015 – Feb 2023): stationarity is confirmed via both informal ACF inspection and a formal ADF unit root test, ACF/PACF plots identify an AR(1) structure, and the fitted model passes Ljung-Box diagnostic testing. The validated model is then used to generate multi-step point and interval forecasts through October 2023.",
    category: "Financial Analytics (R)",
    tags: ["Time Series", "AR(1)", "Forecasting", "ADF Test", "Ljung-Box", "ACF/PACF"],
    tools: ["R", "forecast", "urca", "readxl", "ggplot2"],
    metrics: [
      { label: "AR(1) Coefficient φ₁", value: "0.6588" },
      { label: "Series Mean μ",        value: "19.68" },
      { label: "Ljung-Box p-value",    value: "0.9668" },
      { label: "Forecast Horizon",     value: "8 months" },
    ],
    skills: [
      "Box-Jenkins Methodology", "ADF Unit Root Testing", "ACF/PACF Identification",
      "AR Model Estimation", "Residual Diagnostics", "Multi-Step Forecasting",
    ],
    caseStudy: {
      overview:
        "Applied the complete Box-Jenkins workflow to a real monthly commodity price series: stationarity testing, model identification, parameter estimation, diagnostic checking, and 8-month forecasting. The project demonstrates end-to-end time series analysis as practiced in quantitative finance and macro research roles.",
      problem:
        "Determine whether a monthly commodity price series follows a stationary process, identify the most appropriate ARMA structure, and produce a defensible 8-month ahead forecast with calibrated uncertainty bands.",
      approach:
        "Followed the Box-Jenkins four-stage methodology: (1) stationarity assessment using ADF test with BIC-selected lag order; (2) model identification via ACF decay pattern and PACF cutoff; (3) AR(1) estimation via conditional maximum likelihood; (4) adequacy validation through residual ACF and Ljung-Box portmanteau test.",
      data:
        "98 monthly observations of a commodity price variable z_t, spanning January 2015 to February 2023. Data imported from Excel using read_excel(), then converted to a ts() object with monthly frequency (freq = 12). ADF test BIC selected 1 lag, confirming a parsimonious model structure.",
      methods:
        "ADF unit root test (urca::ur.df, drift specification): τ = −3.804 < critical value −2.89 at 5% → series is stationary. ACF shows gradual decay; PACF cuts off sharply at lag 1 → AR(1) selected. Model estimated via arima(order = c(1,0,0)). True intercept φ₀ recovered as μ(1 − φ₁) = 6.7165.",
      results:
        "AR(1) model: z_t = 6.7165 + 0.6588 × z_{t−1} + u_t. Ljung-Box test: χ²(10) = 3.51, p = 0.9668 — residuals are white noise, confirming model adequacy. 8-month point forecasts converge to the long-run mean: March 2023 = 20.20, April = 20.02, declining to 19.71 by October 2023. Interval forecasts widen appropriately with horizon.",
      learnings:
        "AR(1) processes exhibit mean-reversion: forecasts geometrically converge to μ at rate φ₁ per step. The distinction between R's reported 'intercept' (= μ) and the true AR intercept (φ₀ = μ(1−φ₁)) is a common source of error in practitioner models. Residual whiteness is a necessary but not sufficient condition for model validity — structural breaks and seasonality warrant separate checks.",
    },
    codeBlocks: [
      {
        title: "1 — Load Libraries & Import Data",
        code:
`library(readxl)
library(urca)
library(forecast)

# Import 98 monthly commodity price observations (Jan 2015 – Feb 2023)
mydata  <- read_excel("commodity_prices.xlsx", skip = 2)

# Convert to time series object (monthly frequency)
pricets <- ts(mydata$z, frequency = 12, start = c(2015, 1))

# Initial visual inspection
plot(pricets,
     main = "Monthly Commodity Price Series (2015–2023)",
     ylab = "Price", xlab = "Year",
     col  = "#2563eb", lwd = 1.5)`,
      },
      {
        title: "2 — Stationarity Testing (ADF)",
        code:
`# ── Informal: ACF Inspection ────────────────────────────────────────────────
acf(mydata$z, lag.max = 10,
    main = "ACF — Commodity Price Series")
# ACF decays gradually (not all ≈ 1) → suggests stationarity

# ── Formal: ADF Unit Root Test ───────────────────────────────────────────────
# H0: unit-root (non-stationary)   HA: stationary
urtest <- ur.df(pricets, type = "drift", lag = 10, selectlags = "BIC")
summary(urtest)

# BIC selects 1 lag
# τ (t-stat) = −3.804   |  5% critical value = −2.89
# −3.804 < −2.89  →  REJECT H0  →  Series is STATIONARY ✓`,
      },
      {
        title: "3 — Model Identification via ACF & PACF",
        code:
`par(mfrow = c(1, 2))

acf(mydata$z,  lag.max = 10, main = "ACF")
pacf(mydata$z, lag.max = 10, main = "PACF")

par(mfrow = c(1, 1))

# Interpretation:
#   ACF  → gradual exponential decay  (MA order = 0)
#   PACF → sharp cutoff after lag 1   (AR order = 1)
#   → Identified model: AR(1)`,
      },
      {
        title: "4 — Fit AR(1) Model & Extract Coefficients",
        code:
`AR1price <- arima(pricets, order = c(1, 0, 0))
AR1price

# Coefficients reported by R:
#   ar1       =  0.6588   (φ₁ — autoregressive parameter)
#   intercept = 19.6842   (R reports μ, NOT φ₀)

# Recover true intercept: φ₀ = μ × (1 − φ₁)
coeff         <- coefficients(AR1price)
trueintercept <- coeff["intercept"] * (1 - coeff["ar1"])
cat("True AR intercept φ₀ =", round(trueintercept, 6))
# φ₀ = 6.716494

# Full model: z_t = 6.7165 + 0.6588 × z_{t−1} + u_t`,
      },
      {
        title: "5 — Diagnostic Testing (Residuals & Ljung-Box)",
        code:
`ut <- AR1price$residuals

# Method A: ACF of residuals — should be near zero for all lags > 0
acf(ut, lag.max = 10, main = "ACF of Residuals — AR(1) Model")

# Method B: Ljung-Box portmanteau test
# H0: residuals are white noise (no autocorrelation)
Box.test(ut, lag = 10, type = "Ljung-Box")

# Result: X² = 3.5142, df = 10, p-value = 0.9668
# p = 0.9668 >> 0.05  →  FAIL TO REJECT H0
# Residuals are white noise  →  Model is adequate ✓`,
      },
      {
        title: "6 — 8-Month Forecast with Confidence Intervals",
        code:
`# ── Point Forecast (Mar–Oct 2023) ────────────────────────────────────────────
pointfore <- predict(AR1price, n.ahead = 8)
cat("Point forecasts:\n")
print(round(pointfore$pred, 5))
# Mar-2023: 20.199  Apr-2023: 20.024 ... Oct-2023: 19.712

# ── Manual verification (1-step and 2-step) ───────────────────────────────────
y_T <- mydata$z[length(mydata$z)]          # Last observed value
h1  <- trueintercept + coeff["ar1"] * y_T  # ŷ(1)
h2  <- trueintercept + coeff["ar1"] * h1   # ŷ(2)
cat(sprintf("Manual h=1: %.5f | h=2: %.5f\n", h1, h2))

# ── Interval Forecast (80% & 95% bands) ──────────────────────────────────────
intervalfore <- forecast(AR1price, h = 8)
print(intervalfore)

plot(intervalfore,
     main = "8-Month Commodity Price Forecast (Mar–Oct 2023)",
     ylab = "Price (USD)", xlab = "Year",
     fcol = "#2563eb", flcol = "#93c5fd")`,
      },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    id: "capm-beta-regression",
    title: "CAPM Beta Estimation & Systematic Risk Analysis via OLS in R",
    summary:
      "Estimates the market beta of an equity using the Capital Asset Pricing Model (CAPM) market regression, quantifying systematic risk exposure relative to the S&P 500 and interpreting Jensen's alpha as an abnormal return measure.",
    description:
      "This project implements the CAPM market model in R using ordinary least squares regression. Excess returns of stock ABC are regressed against S&P 500 excess returns to estimate β (systematic risk) and α (Jensen's alpha). The project covers full OLS diagnostics — residual analysis, R-squared decomposition, and confidence interval construction — as applied in equity research and portfolio risk management.",
    category: "Financial Analytics (R)",
    tags: ["CAPM", "OLS Regression", "Beta", "Asset Pricing", "Market Model", "Risk Analysis"],
    tools: ["R", "base stats", "readxl", "ggplot2"],
    metrics: [
      { label: "Jensen's Alpha (α)", value: "0.005506" },
      { label: "Market Beta (β)",    value: "0.6487" },
      { label: "R-squared",          value: "19.16%" },
      { label: "Risk Classification", value: "Defensive (β < 1)" },
    ],
    skills: [
      "CAPM Implementation", "OLS Regression", "Beta Estimation",
      "Systematic Risk Analysis", "Jensen's Alpha", "Regression Diagnostics",
    ],
    caseStudy: {
      overview:
        "Implemented the CAPM market model in R to estimate the systematic risk (beta) of stock ABC relative to the S&P 500. The project quantifies how much of the stock's return variability is attributable to market-wide movements versus idiosyncratic factors — a fundamental tool in equity research, portfolio construction, and risk budgeting.",
      problem:
        "Estimate the market beta of stock ABC to determine its systematic risk exposure, assess whether it generated positive risk-adjusted return (alpha), and quantify how much of its return variance is explained by market movements versus firm-specific factors.",
      approach:
        "Applied the CAPM single-factor market model: excess return of stock ABC regressed on S&P 500 excess return using OLS. Estimated α (Jensen's alpha) and β (systematic risk coefficient), evaluated model fit via R², and ran full regression diagnostics to validate OLS assumptions.",
      data:
        "Monthly excess returns for stock ABC and the S&P 500 index over the same observation period. Excess returns computed as raw returns minus the risk-free rate. Data imported from Excel (Project1_data_3.xlsx). Both series are mean-zero centered for the regression specification.",
      methods:
        "OLS via lm(): (R_ABC − R_f) = α + β(R_SP500 − R_f) + ε. Standard errors computed using heteroskedasticity-robust estimators. Residual diagnostics: Q-Q normality plot, residuals vs fitted (linearity check), scale-location (homoskedasticity), and Cook's distance (influential observations).",
      results:
        "β = 0.6487: Stock ABC moves 0.65% for every 1% move in the S&P 500 — a defensive, low-beta equity. α = 0.005506: Generated ~0.55% monthly excess return above CAPM prediction, suggesting mild positive abnormal performance. R² = 0.1916: Only 19.2% of ABC's variance is explained by market factor — idiosyncratic risk dominates.",
      learnings:
        "Low beta does not imply low total risk — high idiosyncratic variance (R² ≈ 19%) means diversification is critical for this stock. Jensen's alpha interpretation requires caution: statistical significance depends on sample length. The CAPM single-factor model is a starting point; multi-factor models (Fama-French 3/5 factor) typically improve explanatory power for individual stocks.",
    },
    codeBlocks: [
      {
        title: "1 — Load Data & Exploratory Analysis",
        code:
`library(readxl)

# Monthly excess returns: Stock ABC and S&P 500
capm_data <- read_excel("stock_returns.xlsx")
# Variables:
#   ABC_ExcessReturn  — monthly excess return of stock ABC
#   SP500_ExcessReturn — monthly excess return of S&P 500 (market proxy)

summary(capm_data)

# Scatter plot: Stock vs Market returns
plot(capm_data$SP500_ExcessReturn,
     capm_data$ABC_ExcessReturn,
     main = "CAPM: Stock ABC vs S&P 500 Excess Returns",
     xlab = "Market Excess Return (S&P 500)",
     ylab = "Stock ABC Excess Return",
     pch = 19, col = "#3b82f6", cex = 0.85)
abline(h = 0, v = 0, col = "gray70", lty = 2)`,
      },
      {
        title: "2 — OLS Market Model Regression",
        code:
`# CAPM Single-Factor Market Model:
# (R_ABC − R_f) = α + β × (R_SP500 − R_f) + ε

capm_model <- lm(ABC_ExcessReturn ~ SP500_ExcessReturn,
                 data = capm_data)
summary(capm_model)

# ─── Results ─────────────────────────────────────────────────────────────────
# Coefficients:
#   (Intercept)        = 0.005506   → Jensen's alpha  (α)
#   SP500_ExcessReturn = 0.648669   → Market beta     (β)
#
# Residual standard error: [RSE]
# R-squared: 0.1916  (19.16% of variance explained by market factor)
# F-statistic: significant

# Add regression line to scatter plot
abline(capm_model, col = "#dc2626", lwd = 2.5)
legend("topleft",
       legend = sprintf("β = %.4f | α = %.4f | R² = %.4f",
                        coef(capm_model)[2],
                        coef(capm_model)[1],
                        summary(capm_model)$r.squared),
       bty = "n", col = "#dc2626", lwd = 2)`,
      },
      {
        title: "3 — Extract & Interpret Key Metrics",
        code:
`# Extract coefficients
alpha <- coef(capm_model)["(Intercept)"]
beta  <- coef(capm_model)["SP500_ExcessReturn"]
r2    <- summary(capm_model)$r.squared

cat(sprintf("Jensen's Alpha (α) : %+.6f\\n", alpha))
cat(sprintf("Market Beta    (β) : %.6f\\n",  beta))
cat(sprintf("R-squared          : %.4f (%.2f%%)\\n", r2, r2 * 100))

# Risk Classification
if (beta < 1) {
  cat("Risk profile: DEFENSIVE equity (β < 1) — less volatile than market\\n")
} else if (beta > 1) {
  cat("Risk profile: AGGRESSIVE equity (β > 1) — amplifies market moves\\n")
} else {
  cat("Risk profile: Moves in line with market (β ≈ 1)\\n")
}

# 95% confidence intervals for α and β
cat("\\n95% Confidence Intervals:\\n")
print(confint(capm_model, level = 0.95))`,
      },
      {
        title: "4 — OLS Regression Diagnostics",
        code:
`# Full diagnostic plots (2×2 panel)
par(mfrow = c(2, 2))
plot(capm_model,
     col     = "#3b82f6",
     pch     = 19,
     caption = c("Residuals vs Fitted",
                 "Normal Q-Q",
                 "Scale-Location",
                 "Residuals vs Leverage"))
par(mfrow = c(1, 1))

# Individual residual series plot
plot(residuals(capm_model),
     type = "l",
     main = "Regression Residuals Over Time",
     ylab = "Residual",
     col  = "#6366f1", lwd = 1.2)
abline(h = 0, col = "gray50", lty = 2)

# Durbin-Watson test for serial correlation in residuals
if (requireNamespace("lmtest", quietly = TRUE)) {
  lmtest::dwtest(capm_model)
}`,
      },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    id: "hypothesis-testing-financial",
    title: "Statistical Inference & Hypothesis Testing for Financial Data in R",
    summary:
      "Applies parametric statistical tests — t-tests, chi-squared variance tests, confidence intervals, and OLS regression — to equity earnings and price data, demonstrating the inferential toolkit used in quantitative research and risk analysis.",
    description:
      "This project implements the core statistical inference workflow applied in finance: one- and two-tailed t-tests for population means, chi-squared tests for population variance, 95% confidence interval construction, and a simple linear regression. The analysis draws on equity earnings and price data to validate distributional assumptions — the exact tests applied in performance attribution, risk budgeting, and return validity studies.",
    category: "Financial Analytics (R)",
    tags: ["Hypothesis Testing", "t-Test", "Chi-Squared", "Confidence Intervals", "OLS", "Statistical Inference"],
    tools: ["R", "base stats", "readxl"],
    metrics: [
      { label: "Tests Conducted",     value: "5 formal tests" },
      { label: "OLS R-squared",       value: "74.43%" },
      { label: "CI Coverage",         value: "[55.64, 78.95]" },
      { label: "Significant Results", value: "4 of 5 tests" },
    ],
    skills: [
      "Parametric Hypothesis Testing", "t-Distribution", "Chi-Squared Tests",
      "Confidence Interval Construction", "Simple Linear Regression", "p-value Interpretation",
    ],
    caseStudy: {
      overview:
        "Executed a comprehensive statistical inference analysis on equity earnings and price distributions, covering two-tailed and one-tailed t-tests, chi-squared variance testing, confidence interval construction, and linear regression. These techniques form the foundation of quantitative validation in equity research, risk management, and empirical finance.",
      problem:
        "Validate distributional assumptions about a stock universe: determine whether population mean earnings and prices match hypothesized benchmarks, test whether earnings variance is consistent with expectations, and quantify the linear relationship between behavioral factors and performance outcomes.",
      approach:
        "Applied classical parametric inference to a sample of 50 equity observations. Used R's built-in t.test() for location tests, manual chi-squared statistic computation for variance testing, and lm() for linear regression. Each test follows the formal hypothesis-testing protocol: state H0/HA, choose α, compute test statistic, compare to critical value, draw conclusion.",
      data:
        "Sample of 50 equity observations with two variables: earnings per share and stock price. A separate dataset contains daily TV-viewing hours and quiz scores for regression analysis. All data imported from Excel using read_excel(). Descriptive statistics computed before formal inference.",
      methods:
        "Two-tailed t-test (H0: μ_earnings = 5): t = 1.04, p = 0.303. Confidence interval test (H0: μ_price = 50): 95% CI = [55.64, 78.95] → rejects H0. p-value t-test (H0: μ_price = 80): t = −2.18, p = 0.034. One-sided t-test (H0: μ_earnings ≤ 4): t = 2.31, p = 0.012. Chi-squared variance test (H0: σ²_earnings = 2.5): statistic falls outside critical region → reject H0. OLS regression (score ~ TV_hours): β = −4.302, R² = 0.7443.",
      results:
        "Of five formal tests: four reject the null hypothesis at α = 0.05. Mean price = $67.30 (significantly different from both $50 and $80). Mean earnings > $4 confirmed with p = 0.012. Earnings variance significantly differs from 2.5. TV-hours regression: each additional hour reduces quiz score by 4.3 points; R² = 0.74 indicates a strong linear relationship.",
      learnings:
        "The choice of one-tailed vs two-tailed test critically affects power and conclusion — one-tailed tests detect directional alternatives more efficiently when the researcher has an a priori expectation. Chi-squared variance tests are sensitive to normality violations; robust alternatives (Levene's, Brown-Forsythe) should be considered. High R² in simple regression does not validate causation — omitted variable bias and reverse causation require separate treatment.",
    },
    codeBlocks: [
      {
        title: "1 — Load Data & Descriptive Statistics",
        code:
`library(readxl)

# Equity earnings & price sample (n = 50)
stocks <- read_excel("stock_data.xlsx")
# Variables: earnings (EPS), price (stock price)

summary(stocks)

cat(sprintf("Earnings — Mean: %.4f | SD: %.4f | Var: %.4f\\n",
            mean(stocks$earnings),
            sd(stocks$earnings),
            var(stocks$earnings)))

cat(sprintf("Price    — Mean: %.4f | SD: %.4f | Var: %.4f\\n",
            mean(stocks$price),
            sd(stocks$price),
            var(stocks$price)))

# Visual distribution check
par(mfrow = c(1, 2))
hist(stocks$earnings, col = "#3b82f6", border = "white",
     main = "Earnings Distribution", xlab = "EPS ($)")
hist(stocks$price,    col = "#8b5cf6", border = "white",
     main = "Price Distribution",    xlab = "Stock Price ($)")
par(mfrow = c(1, 1))`,
      },
      {
        title: "2 — Two-Tailed t-Test: Mean Earnings ≠ $5",
        code:
`# H0: μ_earnings = 5   |   HA: μ_earnings ≠ 5   |   α = 0.05
t.test(stocks$earnings, mu = 5, alternative = "two.sided", conf.level = 0.95)

# ─── Results ─────────────────────────────────────────────────────────────────
# t-statistic = 1.04
# p-value     = 0.303  >  0.05
# 95% CI includes 5
#
# Conclusion: FAIL TO REJECT H0
# Insufficient evidence that mean earnings differs significantly from $5`,
      },
      {
        title: "3 — Confidence Interval Test: Mean Price ≠ $50",
        code:
`# H0: μ_price = 50   |   HA: μ_price ≠ 50   |   α = 0.05
price_ci <- t.test(stocks$price, mu = 50,
                   alternative = "two.sided", conf.level = 0.95)
price_ci

# ─── Results ─────────────────────────────────────────────────────────────────
# 95% Confidence Interval: [55.64, 78.95]
# $50 does NOT fall within [55.64, 78.95]
#
# Conclusion: REJECT H0 at α = 0.05
# Mean stock price is significantly different from $50
# Point estimate: $67.30

# Visualise CI
ci_lo <- price_ci$conf.int[1]
ci_hi <- price_ci$conf.int[2]
cat(sprintf("95%% CI: [%.2f, %.2f] — $50 excluded → reject H0\\n", ci_lo, ci_hi))`,
      },
      {
        title: "4 — One-Sided t-Test: Mean Earnings > $4",
        code:
`# H0: μ_earnings ≤ 4   |   HA: μ_earnings > 4   |   α = 0.05
# (Upper-tailed test)
t.test(stocks$earnings, mu = 4, alternative = "greater", conf.level = 0.95)

# ─── Results ─────────────────────────────────────────────────────────────────
# t-statistic = 2.31
# p-value     = 0.012  <  0.05
#
# Conclusion: REJECT H0
# Strong evidence that mean earnings exceed $4 per share`,
      },
      {
        title: "5 — Chi-Squared Test: Population Variance of Earnings",
        code:
`# H0: σ²_earnings = 2.5   |   HA: σ²_earnings ≠ 2.5   |   α = 0.05
n       <- length(stocks$earnings)
s2      <- var(stocks$earnings)
chi2    <- (n - 1) * s2 / 2.5   # Test statistic: χ² = (n−1)s²/σ²₀

# Critical values (two-tailed, df = n−1)
chi2_lo <- qchisq(0.025, df = n - 1)
chi2_hi <- qchisq(0.975, df = n - 1)

cat(sprintf("Chi-squared statistic : %.4f\\n", chi2))
cat(sprintf("Critical region       : < %.4f  or  > %.4f\\n", chi2_lo, chi2_hi))
cat(sprintf("Reject H0             : %s\\n",
            ifelse(chi2 < chi2_lo | chi2 > chi2_hi, "YES", "NO")))

# Conclusion: Statistic falls outside the non-rejection region
# → REJECT H0: earnings variance is significantly different from 2.5`,
      },
      {
        title: "6 — Simple Linear Regression: Performance Analysis",
        code:
`# Dataset: daily TV hours vs quiz scores
study  <- read_excel("study_data.xlsx")

lm_fit <- lm(quiz_score ~ tv_hours, data = study)
summary(lm_fit)

# ─── Results ─────────────────────────────────────────────────────────────────
# Intercept  = 26.249  (baseline score with 0 TV hours)
# tv_hours   = −4.302  (each additional hour reduces score by ~4.3 pts)
# R²         = 0.7443  (74.43% of score variance explained by TV hours)
# p-value    << 0.05   (relationship is statistically significant)

# Scatter plot with fitted line
plot(study$tv_hours, study$quiz_score,
     main = "TV Viewing Hours vs Academic Performance",
     xlab = "Daily TV Hours", ylab = "Quiz Score",
     pch = 19, col = "#7c3aed", cex = 0.9)
abline(lm_fit, col = "#dc2626", lwd = 2.5)
legend("topright",
       legend = sprintf("ŷ = %.3f − %.3f × TV | R² = %.4f",
                        coef(lm_fit)[1], abs(coef(lm_fit)[2]),
                        summary(lm_fit)$r.squared),
       bty = "n", col = "#dc2626", lwd = 2)`,
      },
    ],
  },

]
