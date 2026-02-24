# Prabin Pandey — Portfolio Website

Premium personal portfolio for finance, data & AI. Built with Next.js + TypeScript + Tailwind CSS.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# → http://localhost:3000
```

## Deploy to Vercel

```bash
# Option A: Vercel CLI
npm install -g vercel
vercel

# Option B: Connect GitHub repo
# Push to GitHub → vercel.com → Import → Deploy
```

### Connect www.prabin.com
1. Vercel Dashboard → Settings → Domains → Add `www.prabin.com`
2. At your domain registrar, add:
   - `CNAME` record: `www` → `cname.vercel-dns.com`
   - OR `A` record: `@` → `76.76.21.21`

## Admin Panel

Click the **⚙️ gear icon** in the top-right nav → enter passcode.

### Editing Content
| Tab | What You Can Edit |
|-----|------------------|
| Home | Hero text, roles, description, CTA buttons, stats |
| About | Bio, "Now" section, certifications |
| Projects | Add/edit/delete projects, embeds, case studies |
| Blog | Add/edit/delete posts, publish toggle |
| Testimonials | Add/edit/delete quotes |
| Contact | Email, phone, location, social links |
| SEO | Meta title, description, keywords |
| Resume | Button label, file path |

### Export/Import Content
- **Export**: Admin → "Export JSON" → saves `content.json`
- **Import**: Admin → "Import JSON" → upload a saved file

## Embedding Dashboards

### Power BI
1. Open `.pbix` in Power BI Desktop
2. Publish → select workspace
3. In Power BI Service: File → Embed → Website or portal
4. Copy iframe `src` URL
5. Admin → Projects → edit project → paste URL

### Tableau
1. Publish viz to Tableau Public
2. Share → Copy embed URL
3. Admin → Projects → edit project → paste URL

### Excel (OneDrive)
1. Upload `.xlsx` to OneDrive/SharePoint
2. File → Share → Embed → Generate
3. Copy iframe `src` URL
4. Admin → Projects → edit project → paste URL

## Project Structure

```
prabin-portfolio/
├── app/
│   ├── globals.css         # Tailwind + custom styles
│   ├── layout.tsx          # Root layout with SEO + JSON-LD
│   └── page.tsx            # Main page
├── components/
│   └── Portfolio.tsx       # Complete portfolio (all-in-one)
├── content/
│   └── content-reference.txt  # Content structure reference
├── public/
│   ├── resume/             # Put your resume PDF here
│   ├── images/             # Put project screenshots here
│   ├── robots.txt
│   └── sitemap.xml
├── .env.local              # Admin passcode
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Resume
Place your resume at `public/resume/Prabin_Pandey_Resume.pdf`

## Environment Variables
```env
NEXT_PUBLIC_ADMIN_PASSCODE=prabin2025    # Change this
```
