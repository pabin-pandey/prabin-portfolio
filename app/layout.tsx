import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prabin Pandey — Finance, Data & AI Portfolio",
  description:
    "MS Financial Analysis candidate at Temple University. Building at the intersection of finance, data science, and AI. CFA Level I Candidate.",
  keywords: [
    "Prabin Pandey",
    "financial analysis",
    "data science",
    "AI",
    "portfolio management",
    "CFA",
    "Temple University",
    "Power BI",
    "Excel modeling",
    "Python finance",
  ],
  authors: [{ name: "Prabin Pandey" }],
  openGraph: {
    title: "Prabin Pandey — Finance, Data & AI Portfolio",
    description:
      "MS Financial Analysis candidate at Temple University. CFA Level I Candidate. Financial modeling, BI dashboards, and AI-powered analytical tools.",
    url: "https://www.prabin.com",
    siteName: "Prabin Pandey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabin Pandey — Finance, Data & AI Portfolio",
    description:
      "MS Financial Analysis candidate at Temple University. CFA Level I Candidate.",
  },
  robots: {
    index: true,
    follow: true,
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prabin Pandey",
              url: "https://www.prabin.com",
              email: "prabin.pandey@temple.edu",
              telephone: "835-207-9312",
              jobTitle: "Financial Analyst",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Temple University",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Philadelphia",
                addressRegion: "PA",
                addressCountry: "US",
              },
              sameAs: [
                "https://linkedin.com/in/prabinpandey",
                "https://github.com/pabin-pandey",
              ],
            }),
          }}
        />
        {/* Analytics placeholder */}
        {/* <script defer data-domain="prabin.com" src="https://plausible.io/js/script.js"></script> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
