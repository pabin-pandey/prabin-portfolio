'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { excelProjects } from '@/lib/excel-projects-data';

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  back:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  tag:      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  star:     <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  sheet:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>,
  download: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  eye:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  target:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  zap:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  brain:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.69A3.99 3.99 0 0 1 6 12c0-1.06.41-2.02 1.08-2.73A3 3 0 0 1 7 7.5 2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.69A3.99 3.99 0 0 0 18 12c0-1.06-.41-2.02-1.08-2.73A3 3 0 0 0 17 7.5 2.5 2.5 0 0 0 14.5 2z"/></svg>,
  chart:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  link:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
};

const METRIC_ACCENTS = [
  'border-emerald-500 text-emerald-400',
  'border-blue-500   text-blue-400',
  'border-violet-500 text-violet-400',
  'border-amber-500  text-amber-400',
  'border-cyan-500   text-cyan-400',
  'border-pink-500   text-pink-400',
];

const CASE_STYLES: Record<string, { border: string; bg: string; title: string }> = {
  orange:  { border: 'border-orange-500/40',  bg: 'bg-orange-950/20',  title: 'text-orange-400'  },
  blue:    { border: 'border-blue-500/40',    bg: 'bg-blue-950/20',    title: 'text-blue-400'    },
  purple:  { border: 'border-purple-500/40',  bg: 'bg-purple-950/20',  title: 'text-purple-400'  },
  green:   { border: 'border-green-500/40',   bg: 'bg-green-950/20',   title: 'text-green-400'   },
  emerald: { border: 'border-emerald-500/40', bg: 'bg-emerald-950/20', title: 'text-emerald-400' },
  amber:   { border: 'border-amber-500/40',   bg: 'bg-amber-950/20',   title: 'text-amber-400'   },
};

type TabId = 'overview' | 'model';

export default function ExcelProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = excelProjects.find((p) => p.id === slug);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
        <p className="text-gray-400 mb-6">
          The project <code className="text-emerald-400">{slug}</code> does not exist.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
    { id: 'overview', label: 'Case Study',    icon: Icon.zap   },
    { id: 'model',    label: 'Excel Model',   icon: Icon.sheet },
  ];

  const cs = project.caseStudy;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* ── Sticky header ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800"
          >
            {Icon.back} Portfolio
          </Link>
          <span className="text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-400 bg-emerald-950/30">
            {project.category}
          </span>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-b border-gray-800">
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          {/* Category breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-500">{Icon.sheet}</span>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              Financial Modeling (Excel)
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight max-w-3xl">
            {project.title}
          </h1>

          {/* Summary */}
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
              >
                {Icon.tag} {tag}
              </span>
            ))}
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className={`relative rounded-xl bg-gray-800/60 border-l-2 border border-gray-700 p-4 ${METRIC_ACCENTS[i % METRIC_ACCENTS.length].split(' ')[0]} backdrop-blur-sm`}
              >
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">
                  {m.label}
                </p>
                <p className={`text-sm font-bold ${METRIC_ACCENTS[i % METRIC_ACCENTS.length].split(' ')[1]}`}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skills row ──────────────────────────────────────────────────── */}
      {project.skills.length > 0 && (
        <div className="border-b border-gray-800 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider shrink-0">
              Skills
            </span>
            {project.skills.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-emerald-950/50 text-emerald-300 border border-emerald-800/50"
              >
                <span className="text-emerald-400">{Icon.star}</span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-20 border-b border-gray-800 bg-gray-950/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-emerald-400 border-emerald-400'
                    : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ─────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ═══ CASE STUDY ══════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">

            {/* Description card */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-gray-900 p-7">
              <div className="flex items-center gap-2 mb-3">
                {Icon.target}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                  Project Overview
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </div>

            {/* Problem / Approach */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard emoji="📋" title="Problem Statement"       text={cs.problem}  accent="orange"  />
              <CaseCard emoji="🎯" title="Analytical Approach"     text={cs.approach} accent="blue"    />
            </div>

            {/* Data / Methods */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard emoji="💾" title="Data Sources"            text={cs.data}     accent="purple"  />
              <CaseCard emoji="🔧" title="Quantitative Methods"    text={cs.methods}  accent="green"   />
            </div>

            {/* Results / Learnings */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard emoji="✨" title="Key Results"             text={cs.results}  accent="emerald" />
              <CaseCard emoji="🧠" title="Key Learnings"           text={cs.learnings} accent="amber"  />
            </div>

            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {Icon.chart}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Tools & Technologies
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-800 text-gray-200 border border-gray-700 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ EXCEL MODEL ════════════════════════════════════════════════ */}
        {activeTab === 'model' && (
          <div className="animate-fadeIn">
            {project.embedUrl ? (
              /* ── Embedded view-only iframe (OneDrive / SharePoint) ── */
              <div className="rounded-2xl overflow-hidden border border-emerald-700/40 bg-gray-900 shadow-xl">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-900">
                  <div className="flex items-center gap-2 text-sm text-emerald-400">
                    {Icon.eye}
                    <span className="font-medium">View-Only Preview</span>
                  </div>
                  <span className="text-xs text-gray-500 border border-gray-700 px-2 py-1 rounded">
                    Read-only — editing disabled
                  </span>
                </div>
                <iframe
                  src={project.embedUrl}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  scrolling="no"
                  title={`${project.title} — View-Only Excel Model`}
                />
              </div>
            ) : (
              /* ── Clean placeholder for upcoming preview ── */
              <div className="rounded-2xl border border-emerald-700/30 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden flex items-center justify-center" style={{ minHeight: '400px' }}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-900/40 border border-emerald-700/40 flex items-center justify-center mb-5">
                    {Icon.sheet}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Model Preview Coming Soon</h3>
                  <p className="text-sm text-gray-400 max-w-sm">
                    The interactive preview for this Excel model will be available shortly. You can download the file directly to review the complete analysis.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
      `}</style>
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────
function CaseCard({ emoji, title, text, accent }: { emoji: string; title: string; text: string; accent: string }) {
  const s = CASE_STYLES[accent] ?? CASE_STYLES.blue;
  return (
    <div className={`rounded-2xl border p-6 ${s.border} ${s.bg}`}>
      <h3 className={`flex items-center gap-2 font-semibold mb-3 ${s.title}`}>
        <span className="text-lg leading-none">{emoji}</span>
        {title}
      </h3>
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}
