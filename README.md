# Prabin Pandey — Portfolio Website

Personal portfolio website showcasing quantitative finance, data science, and AI projects. Built with Next.js + TypeScript + Tailwind CSS.

**Live:** [prabin-portfolio-4i4v.vercel.app](https://prabin-portfolio-4i4v.vercel.app)

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

```bash
# Vercel CLI
npm install -g vercel
vercel
```

## Project Structure

```
prabin-portfolio/
├── app/
│   ├── globals.css         # Tailwind + custom styles
│   ├── layout.tsx          # Root layout with SEO + JSON-LD
│   └── page.tsx            # Main page
├── components/
│   └── Portfolio.tsx       # Main portfolio component
├── lib/
│   ├── projects-data.ts    # Python project metadata
│   ├── excel-projects-data.ts
│   └── r-projects-data.ts
├── public/
│   ├── notebooks/          # Jupyter notebooks (rendered on site)
│   ├── excel-models/       # Excel models (downloadable)
│   ├── robots.txt
│   └── sitemap.xml
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Stack

Next.js · TypeScript · Tailwind CSS · Vercel
