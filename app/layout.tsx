import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prabin Pandey — AI-Augmented Financial Analytics | Portfolio",
  description:
    "MS Financial Analysis candidate (Fox School of Business, Temple University, GPA 3.98). Builds quantitative financial systems: derivatives pricing engines, portfolio risk analytics, SEC document intelligence, and AI-integrated decision-support dashboards. CFA Level I Candidate. Seeking Summer 2026 finance / AI analytics opportunities.",
  keywords: [
    "Prabin Pandey",
    "financial analyst",
    "AI-augmented financial analytics",
    "quantitative finance",
    "portfolio analytics",
    "derivatives pricing",
    "Black-Scholes",
    "Monte Carlo simulation",
    "WACC modeling",
    "DCF valuation",
    "LBO modeling",
    "factor models",
    "Sharpe ratio",
    "financial data engineering",
    "SEC filing intelligence",
    "Streamlit dashboard",
    "Power BI",
    "Tableau",
    "Python finance",
    "CFA candidate",
    "Temple University",
    "Fox School of Business",
    "BlackRock analyst",
    "JPMorgan analytics",
    "investment management",
    "AI governance",
    "LLM calibration",
    "financial modeling",
    "Excel modeling",
    "Bloomberg Terminal",
    "FactSet",
    "Capital IQ",
  ],
  authors: [{ name: "Prabin Pandey" }],
  openGraph: {
    title: "Prabin Pandey — AI-Augmented Financial Analytics | Portfolio",
    description:
      "MS Financial Analysis candidate at Temple University (GPA 3.98). Quantitative financial systems: derivatives pricing, portfolio risk analytics, SEC document intelligence, Streamlit dashboards. CFA Level I Candidate. Seeking Summer 2026 opportunities.",
    url: "https://www.prabinpandey.com",
    siteName: "Prabin Pandey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabin Pandey — AI-Augmented Financial Analytics",
    description:
      "MS Financial Analysis | Temple University | CFA Candidate | Quantitative systems, derivatives pricing, portfolio analytics, AI governance.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.prabinpandey.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* JSON-LD Structured Data — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prabin Pandey",
              url: "https://www.prabinpandey.com",
              email: "prabin.pandey@temple.edu",
              jobTitle: "Financial Analyst | AI-Augmented Finance | Portfolio Analytics",
              description:
                "MS Financial Analysis candidate (GPA 3.98) at Temple University Fox School of Business. Specializes in quantitative financial modeling, derivatives pricing, portfolio risk analytics, and AI-integrated financial systems. CFA Level I Candidate.",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Temple University, Fox School of Business",
                sameAs: "https://www.fox.temple.edu/",
              },
              knowsAbout: [
                "Financial Modeling",
                "Derivatives Pricing",
                "Portfolio Analytics",
                "DCF Valuation",
                "LBO Modeling",
                "Factor Models",
                "Python Finance",
                "Streamlit",
                "Power BI",
                "Tableau",
                "AI Governance",
                "LLM Calibration",
                "SEC Document Intelligence",
                "Bloomberg Terminal",
                "FactSet",
                "Capital IQ",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Philadelphia",
                addressRegion: "PA",
                addressCountry: "US",
              },
              sameAs: [
                "https://linkedin.com/in/prabin-pandey-1482362b7/",
                "https://github.com/pabin-pandey",
              ],
            }),
          }}
        />
        {/* JSON-LD — Portfolio Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Prabin Pandey Portfolio",
              url: "https://www.prabinpandey.com",
              description:
                "Professional portfolio of Prabin Pandey — AI-augmented financial analytics, quantitative systems, and investment data engineering.",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
