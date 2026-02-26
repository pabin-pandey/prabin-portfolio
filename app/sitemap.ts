import type { MetadataRoute } from "next";

const BASE = "https://www.prabinpandey.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return [
    { url: BASE,                                             lastModified: now, changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE}/about`,                                  lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/projects`,                               lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/blog`,                                   lastModified: now, changeFrequency: "weekly",   priority: 0.8 },
    { url: `${BASE}/contact`,                                lastModified: now, changeFrequency: "yearly",   priority: 0.7 },
    // Individual project pages
    { url: `${BASE}/projects/pe-debt-covenant-model`,        lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE}/projects/campus-operations-analytics`,   lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE}/projects/global-macro-dashboard`,        lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE}/projects/genai-finance-system`,          lastModified: now, changeFrequency: "monthly",  priority: 0.8 },
    // Project category hubs
    { url: `${BASE}/excel-projects`,                         lastModified: now, changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE}/r-projects`,                             lastModified: now, changeFrequency: "monthly",  priority: 0.7 },
    // Blog posts
    { url: `${BASE}/blog/when-the-output-looks-right-but-isnt`, lastModified: "2026-02-25", changeFrequency: "yearly", priority: 0.7 },
  ];
}
