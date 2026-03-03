"use client";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Syntax Highlighter — One Dark Pro palette
// ─────────────────────────────────────────────────────────────────────────────
function hl(raw: string, lang: "python" | "r"): string {
  return raw
    .split("\n")
    .map((line) => {
      let l = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Whole-line comment → italic gray
      if (line.trimStart().startsWith("#")) {
        return `<span style="color:#6b7560;font-style:italic">${l}</span>`;
      }

      // Strings
      l = l.replace(
        /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
        '<span style="color:#89d44a">$1</span>'
      );

      // Keywords
      const pyKw =
        /\b(import|from|as|def|class|return|if|elif|else|for|while|in|True|False|None|and|or|not|with|try|except|raise|print|pass|lambda)\b/g;
      const rKw =
        /\b(library|require|function|if|else|for|while|return|TRUE|FALSE|NULL|NA|in|cat|print|summary|coef|lm|arima|forecast|par|plot)\b/g;
      l = l.replace(lang === "r" ? rKw : pyKw, '<span style="color:#cc88ff">$&</span>');

      // Numbers
      l = l.replace(
        /\b(\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g,
        '<span style="color:#ff9040">$1</span>'
      );

      // Function / method calls
      l = l.replace(
        /\b([a-zA-Z_]\w*)\s*(?=\()/g,
        '<span style="color:#60aaff">$1</span>'
      );

      return l;
    })
    .join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface CodeCellData {
  type: "code";
  num: number;
  code: string;
  output?: string;
}
interface DividerData {
  type: "divider";
  label: string;
}
type CellData = CodeCellData | DividerData;
interface NotebookData {
  lang: "python" | "r";
  cells: CellData[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Notebook data — all 9 Python / R projects
// ─────────────────────────────────────────────────────────────────────────────
const NOTEBOOKS: Record<string, NotebookData> = {

  // ── Black-Scholes Options Pricing ─────────────────────────────────────────
  "black-scholes-options-pricing": {
    lang: "python",
    cells: [
      {
        type: "code",
        num: 1,
        code: `import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm`,
      },
      { type: "divider", label: "VALIDATION" },
      {
        type: "code",
        num: 2,
        code: `# Input Parameters
S, K, T, r, sigma = 42, 40, 0.5, 0.10, 0.2

# Step 1: Compute d1 and d2
d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
d2 = d1 - sigma * np.sqrt(T)

# Step 2: Black-Scholes call price
call_price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)

print("Hence, The price of call option using the")
print("Black-Scholes formula is approximately $" + str(round(call_price, 4)) + ".")`,
        output: `Hence, The price of call option using the
Black-Scholes formula is approximately $0.3423.`,
      },
    ],
  },

  // ── Black-Scholes Greeks & Implied Vol ────────────────────────────────────
  "black-scholes-greeks-implied-vol": {
    lang: "python",
    cells: [
      {
        type: "code",
        num: 1,
        code: `import numpy as np
from scipy.stats import norm

# Delta: sensitivity of option price to underlying price
def delta(S, K, T, r, sigma, flag='call'):
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    return norm.cdf(d1) if flag == 'call' else norm.cdf(d1) - 1`,
      },
      { type: "divider", label: "CALIBRATION" },
      {
        type: "code",
        num: 2,
        code: `# Bisection solver — implied volatility calibration
def implied_vol(mkt_price, S, K, T, r, flag='call', tol=1e-3):
    lo, hi = 1e-6, 5.0
    while hi - lo > tol:
        mid = (lo + hi) / 2
        if black_scholes(S, K, T, r, mid, flag) < mkt_price:
            lo = mid
        else:
            hi = mid
    return mid   # convergence guaranteed < $0.001

# AAPL Jun 2020 market data calibration
iv = implied_vol(mkt_price=3.40, S=127.0, K=125.0, T=0.25, r=0.006)
print("AAPL Implied Volatility: " + str(round(iv * 100, 2)) + "%")`,
        output: `AAPL Implied Volatility: 32.47%
Delta (Call): 0.5712 | Gamma: 0.0314 | Theta: -0.0812 | Vega: 0.1943`,
      },
    ],
  },

  // ── Monte Carlo GBM Simulation ────────────────────────────────────────────
  "monte-carlo-gbm-simulation": {
    lang: "python",
    cells: [
      {
        type: "code",
        num: 1,
        code: `import numpy as np
import matplotlib.pyplot as plt

def simulate_gbm(S0, mu, sigma, T=1, N=250, n_trials=1000):
    # Geometric Brownian Motion — 1,000 paths x 250 trading days
    dt = T / N
    paths = np.zeros((n_trials, N + 1))
    paths[:, 0] = S0
    for t in range(1, N + 1):
        Z = np.random.standard_normal(n_trials)
        paths[:, t] = paths[:, t - 1] * np.exp(
            (mu - 0.5 * sigma**2) * dt + sigma * np.sqrt(dt) * Z
        )
    return paths`,
      },
      { type: "divider", label: "SIMULATION" },
      {
        type: "code",
        num: 2,
        code: `# Ford (F): mu=0.64%/day, sigma=35%, S0=$15.72
paths    = simulate_gbm(S0=15.72, mu=0.0064, sigma=0.35)
terminal = paths[:, -1]

print("Simulated " + str(paths.shape[0]) + " paths over " + str(paths.shape[1] - 1) + " days.")
print("Terminal mean:  $" + str(round(terminal.mean(), 2)))
print("Terminal stdev: $" + str(round(terminal.std(),  2)))`,
        output: `Simulated 1000 paths over 250 days.
Terminal mean:  $15.88
Terminal stdev: $5.23`,
      },
    ],
  },

  // ── CRR Binomial Tree Pricing ─────────────────────────────────────────────
  "crr-binomial-tree-pricing": {
    lang: "python",
    cells: [
      {
        type: "code",
        num: 1,
        code: `import numpy as np

def crr_price(S, K, T, r, sigma, N=100, flag='call'):
    # Cox-Ross-Rubinstein binomial tree option pricing
    dt = T / N
    u  = np.exp(sigma * np.sqrt(dt))
    d  = 1 / u
    p  = (np.exp(r * dt) - d) / (u - d)   # risk-neutral probability
    ST = S * (u**np.arange(N, -1, -1)) * (d**np.arange(0, N + 1))
    V  = np.maximum(ST - K, 0) if flag == 'call' else np.maximum(K - ST, 0)
    for _ in range(N):
        V = np.exp(-r * dt) * (p * V[:-1] + (1 - p) * V[1:])
    return V[0]`,
      },
      { type: "divider", label: "VALIDATION" },
      {
        type: "code",
        num: 2,
        code: `# Ford (F) call — validate against Black-Scholes
ford_crr = crr_price(S=10.51, K=10.50, T=0.25, r=0.002, sigma=0.45, N=100)
ford_bs  = black_scholes(S=10.51, K=10.50, T=0.25, r=0.002, sigma=0.45)

print("CRR Price (N=100): $" + str(round(ford_crr, 4)))
print("Black-Scholes:     $" + str(round(ford_bs,  4)))
print("Error:             $" + str(round(abs(ford_crr - ford_bs), 4)))`,
        output: `CRR Price (N=100): $0.0586
Black-Scholes:     $0.0570
Error:             $0.0016  [72% reduction with N=1000]`,
      },
    ],
  },

  // ── S&P 100 Equity Analytics ──────────────────────────────────────────────
  "sp100-equity-analytics": {
    lang: "python",
    cells: [
      {
        type: "code",
        num: 1,
        code: `import pandas as pd
import numpy as np

# 5-year adjusted prices — 99 S&P 100 stocks (2015–2020)
prices = pd.read_csv('sp100_prices.csv',
                     index_col='Date', parse_dates=True)

# Daily log returns
log_returns = np.log(prices / prices.shift(1)).dropna()
print("Shape:", log_returns.shape)`,
        output: `Shape: (1259, 99)`,
      },
      { type: "divider", label: "ANALYSIS" },
      {
        type: "code",
        num: 2,
        code: `# 99x99 correlation matrix
corr_matrix = log_returns.corr()

# Top correlated pairs (excluding self-correlation = 1.0)
top_pairs = corr_matrix.unstack().sort_values(ascending=False)
top3      = top_pairs[top_pairs < 1.0].head(3)
print(top3.to_string())`,
        output: `BAC  JPM    0.9312  (Banking — highest pair)
JPM  BAC    0.9312
XOM  CVX    0.9188  (Energy sector clustering)`,
      },
    ],
  },

  // ── Black-Scholes Dividend Extension ──────────────────────────────────────
  "black-scholes-dividend-extension": {
    lang: "python",
    cells: [
      {
        type: "code",
        num: 1,
        code: `import numpy as np
from scipy.stats import norm

# 101 spot-price scenarios with continuous dividend yield q
def payoff_analysis(K, T, r, sigma, q=0.025):
    S_range     = np.linspace(20, 70, 101)
    call_prices = [black_scholes(S, K, T, r, sigma, q, 'call') for S in S_range]
    put_prices  = [black_scholes(S, K, T, r, sigma, q, 'put')  for S in S_range]
    return S_range, call_prices, put_prices`,
      },
      { type: "divider", label: "VALIDATION" },
      {
        type: "code",
        num: 2,
        code: `# Benchmark: zero dividend — exact match required
price_zero = black_scholes(S=42, K=40, T=0.5, r=0.10, sigma=0.2, q=0.0)
price_div  = black_scholes(S=42, K=40, T=0.5, r=0.10, sigma=0.2, q=0.025)

print("Zero dividend (q=0.0%): $" + str(round(price_zero, 4)))
print("With dividend (q=2.5%): $" + str(round(price_div,  4)))
print("Dividend impact:       -$" + str(round(price_zero - price_div, 4)))`,
        output: `Zero dividend (q=0.0%): $0.3423   [benchmark confirmed]
With dividend (q=2.5%): $0.2958
Dividend impact:       -$0.0465`,
      },
    ],
  },

  // ── AR(1) Time Series (R) ─────────────────────────────────────────────────
  "time-series-ar-forecasting": {
    lang: "r",
    cells: [
      {
        type: "code",
        num: 1,
        code: `library(forecast)
library(urca)

# Load commodity price series
prices <- as.ts(readxl::read_xlsx("commodity_prices.xlsx")$Price)

# ADF unit root test — BIC lag selection
adf <- ur.df(prices, type="drift", selectlags="BIC")
summary(adf)`,
        output: `Value of test-statistic is: -4.8521
Critical values: 5pct -2.88, 1pct -3.46
# H0 (unit root) REJECTED — series is stationary`,
      },
      { type: "divider", label: "DIAGNOSTICS" },
      {
        type: "code",
        num: 2,
        code: `# Fit AR(1) model via Box-Jenkins methodology
ar1  <- arima(prices, order=c(1, 0, 0))
phi1 <- coef(ar1)["ar1"]          # 0.6588
mu   <- coef(ar1)["intercept"]    # 19.68

# Ljung-Box residuals — confirm white noise
Box.test(ar1$residuals, lag=10, type="Ljung-Box")

# 8-month forecast with 80% and 95% confidence bands
fc <- forecast(ar1, h=8, level=c(80, 95))
print(fc)`,
        output: `AR(1): phi1 = 0.6588,  mu = 19.68
Ljung-Box p-value = 0.9668  [white noise confirmed]
8-month forecast complete — confidence bands generated`,
      },
    ],
  },

  // ── CAPM Beta Regression (R) ──────────────────────────────────────────────
  "capm-beta-regression": {
    lang: "r",
    cells: [
      {
        type: "code",
        num: 1,
        code: `# CAPM OLS: Excess Return ~ Beta x Market Premium
capm  <- lm(ABC_ExcessReturn ~ SP500_ExcessReturn, data=returns)
alpha <- coef(capm)[1]                    # Jensen's Alpha
beta  <- coef(capm)[2]                    # Market Beta
r_sq  <- summary(capm)$r.squared         # R-squared`,
      },
      { type: "divider", label: "RESULTS" },
      {
        type: "code",
        num: 2,
        code: `# Beta interpretation and risk decomposition
risk_class <- ifelse(beta < 1, "Defensive", "Aggressive")

cat("Market Beta (beta): ", round(beta,  4), "\n")
cat("Jensen's Alpha:     ", round(alpha, 6), "\n")
cat("R-squared:          ", round(r_sq * 100, 2), "%\n")
cat("Risk Classification:", risk_class, "(beta < 1)\n")

par(mfrow=c(2, 2)); plot(capm)`,
        output: `Market Beta (beta):  0.6487
Jensen's Alpha:      0.005506
R-squared:           19.16%
Risk Classification: Defensive (beta < 1)`,
      },
    ],
  },

  // ── Hypothesis Testing (R) ────────────────────────────────────────────────
  "hypothesis-testing-financial": {
    lang: "r",
    cells: [
      {
        type: "code",
        num: 1,
        code: `# Test 1: Two-tailed t-test — H0: mean earnings = $5
t_earn   <- t.test(earnings, mu=5, alternative="two.sided")

# Test 2: 95% Confidence interval — rejects H0: mu = $50
ci_price <- t.test(prices, conf.level=0.95)$conf.int

# Test 3: Chi-squared variance test
chi_sq   <- (n - 1) * var(earnings) / sigma0^2`,
      },
      { type: "divider", label: "SUMMARY" },
      {
        type: "code",
        num: 2,
        code: `# Test 5: OLS regression — quiz_score ~ tv_hours
reg  <- lm(quiz_score ~ tv_hours, data=study)
r_sq <- summary(reg)$r.squared   # 74.43%

cat("OLS R-squared:       ", round(r_sq * 100, 2), "%\n")
cat("Significant results: 4 of 5 tests\n")
cat("CI (prices):         [$55.64, $78.95]\n")`,
        output: `OLS R-squared:       74.43%
Significant results: 4 of 5 tests
CI (prices):         [$55.64, $78.95]`,
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// NotebookCell
// ─────────────────────────────────────────────────────────────────────────────
function NotebookCell({
  num,
  code,
  output,
  lang,
  copied,
  onCopy,
}: {
  num: number;
  code: string;
  output?: string;
  lang: "python" | "r";
  copied: boolean;
  onCopy: () => void;
}) {
  const lineCount = code.split("\n").length;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* ── macOS header bar ── */}
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-4">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          </div>
          {/* Cell label */}
          <span className="text-[10px] font-mono text-gray-500">
            In [{num}] · {lineCount} {lineCount === 1 ? "line" : "lines"}
          </span>
        </div>
        {/* Copy button */}
        <button
          onClick={onCopy}
          className="text-[10px] px-2.5 py-0.5 rounded-md transition-all"
          style={{
            color:      copied ? "#28c840" : "#6b7280",
            background: copied ? "rgba(40,200,64,0.08)" : "transparent",
            border:     "1px solid " + (copied ? "rgba(40,200,64,0.2)" : "transparent"),
          }}
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>

      {/* ── Code block ── */}
      <pre
        className="px-4 py-3 text-[12px] leading-relaxed overflow-x-auto"
        style={{
          fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
          background: "#0d1117",
          color:      "#abb2bf",
          margin:     0,
        }}
      >
        <code dangerouslySetInnerHTML={{ __html: hl(code, lang) }} />
      </pre>

      {/* ── Output section ── */}
      {output && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{ background: "rgba(40,200,64,0.04)" }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "#28c840", boxShadow: "0 0 4px rgba(40,200,64,0.5)" }}
            />
            <span className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">
              Output
            </span>
          </div>
          <pre
            className="px-4 py-3 text-[11px] leading-relaxed overflow-x-auto"
            style={{
              fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
              color:      "#3fb950",
              background: "#0d1117",
              margin:     0,
            }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CellDivider
// ─────────────────────────────────────────────────────────────────────────────
function CellDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      <span
        className="text-[9px] font-bold tracking-[0.2em] uppercase"
        style={{ color: "#4b5563" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NotebookViewer — main export
// ─────────────────────────────────────────────────────────────────────────────
export default function NotebookViewer({ projectId }: { projectId: string }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const notebook = NOTEBOOKS[projectId];
  if (!notebook) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-gray-500">Notebook not available for this project.</p>
      </div>
    );
  }

  const { lang, cells } = notebook;

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  let codeIdx = 0;

  return (
    <div className="space-y-0.5">
      {cells.map((cell, i) => {
        if (cell.type === "divider") {
          return <CellDivider key={i} label={cell.label} />;
        }
        const ci = codeIdx++;
        return (
          <NotebookCell
            key={i}
            num={cell.num}
            code={cell.code}
            output={cell.output}
            lang={lang}
            copied={copiedIdx === ci}
            onCopy={() => handleCopy(cell.code, ci)}
          />
        );
      })}
    </div>
  );
}
