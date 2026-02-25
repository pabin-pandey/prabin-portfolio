'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { rProjects } from '@/lib/r-projects-data';

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  back:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  tag:    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  star:   <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  code:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  chart:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  target: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  zap:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  r:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h5a2 2 0 1 1 0 4H8"/><path d="M8 12l4 4"/></svg>,
  copy:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  check:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
};

const METRIC_ACCENTS = [
  'border-blue-500   text-blue-400',
  'border-violet-500 text-violet-400',
  'border-cyan-500   text-cyan-400',
  'border-indigo-500 text-indigo-400',
];

const CASE_STYLES: Record<string, { border: string; bg: string; title: string }> = {
  blue:    { border: 'border-blue-500/40',    bg: 'bg-blue-950/20',    title: 'text-blue-400'    },
  violet:  { border: 'border-violet-500/40',  bg: 'bg-violet-950/20',  title: 'text-violet-400'  },
  cyan:    { border: 'border-cyan-500/40',    bg: 'bg-cyan-950/20',    title: 'text-cyan-400'    },
  indigo:  { border: 'border-indigo-500/40',  bg: 'bg-indigo-950/20',  title: 'text-indigo-400'  },
  orange:  { border: 'border-orange-500/40',  bg: 'bg-orange-950/20',  title: 'text-orange-400'  },
  green:   { border: 'border-green-500/40',   bg: 'bg-green-950/20',   title: 'text-green-400'   },
};

type TabId = 'overview' | 'code';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-all"
    >
      {copied ? Icon.check : Icon.copy}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function RProjectPage() {
  const params  = useParams();
  const slug    = params.slug as string;
  const project = rProjects.find(p => p.id === slug);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
        <p className="text-gray-400 mb-6">
          The project <code className="text-blue-400">{slug}</code> does not exist.
        </p>
        <BackButton fallback="/" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors">
          ← Back to Portfolio
        </BackButton>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
    { id: 'overview', label: 'Case Study', icon: Icon.zap  },
    { id: 'code',     label: 'R Code',     icon: Icon.code },
  ];

  const cs = project.caseStudy;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <BackButton fallback="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800">
            {Icon.back} Portfolio
          </BackButton>
          <span className="text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/40 text-blue-400 bg-blue-950/30">
            Financial Analytics (R)
          </span>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-b border-gray-800">
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">{Icon.r}</span>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
              Financial Analytics (R)
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight max-w-3xl">
            {project.title}
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500/50 hover:text-blue-300 transition-colors">
                {Icon.tag} {tag}
              </span>
            ))}
          </div>

          {/* KPI metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, i) => (
              <div key={i} className={`rounded-xl bg-gray-800/60 border-l-2 border border-gray-700 p-4 ${METRIC_ACCENTS[i % METRIC_ACCENTS.length].split(' ')[0]} backdrop-blur-sm`}>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-sm font-bold ${METRIC_ACCENTS[i % METRIC_ACCENTS.length].split(' ')[1]}`}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skills row ────────────────────────────────────────────────────── */}
      {project.skills.length > 0 && (
        <div className="border-b border-gray-800 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider shrink-0">Skills</span>
            {project.skills.map((skill, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-blue-950/50 text-blue-300 border border-blue-800/50">
                <span className="text-blue-400">{Icon.star}</span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab bar ───────────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-20 border-b border-gray-800 bg-gray-950/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-blue-400'
                    : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ───────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ═══ CASE STUDY ══════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">

            {/* Overview card */}
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-gray-900 p-7">
              <div className="flex items-center gap-2 mb-3">
                {Icon.target}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400">Project Overview</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{cs.overview}</p>
            </div>

            {/* Problem / Approach */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard emoji="📋" title="Problem Statement"    text={cs.problem}  accent="orange" />
              <CaseCard emoji="🎯" title="Analytical Approach"  text={cs.approach} accent="blue"   />
            </div>

            {/* Data / Methods */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard emoji="💾" title="Data & Variables"     text={cs.data}     accent="violet" />
              <CaseCard emoji="🔧" title="Methods & Tests"      text={cs.methods}  accent="cyan"   />
            </div>

            {/* Results / Learnings */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard emoji="✨" title="Key Results"          text={cs.results}  accent="indigo" />
              <CaseCard emoji="🧠" title="Key Learnings"        text={cs.learnings} accent="green" />
            </div>

            {/* Tools */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {Icon.chart}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Tools & Technologies</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(t => (
                  <span key={t} className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-800 text-gray-200 border border-gray-700 hover:border-blue-500/50 hover:text-blue-300 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ R CODE ══════════════════════════════════════════════════════ */}
        {activeTab === 'code' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              {Icon.code}
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">R Implementation</h2>
            </div>

            {project.codeBlocks.map((block, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden shadow-lg">
                {/* Block header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-800/60">
                  <span className="text-sm font-semibold text-blue-300 flex items-center gap-2">
                    {Icon.r}
                    {block.title}
                  </span>
                  <CopyButton code={block.code} />
                </div>
                {/* Code block */}
                <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
                  <code className="language-r text-gray-300">
                    {block.code.split('\n').map((line, li) => {
                      // Single-pass syntax highlighting — avoids cascading regex interference
                      const COMBINED = /(#[^\n]*)|(["'][^"'\n]*["'])|(?<!\w)(library|require|install\.packages)(?!\w)|(?<!\w)(function|if|else|for|while|return|TRUE|FALSE|NULL|NA|Inf|NaN)(?!\w)|(?<!\w)(read_excel|ts|plot|acf|pacf|arima|predict|forecast|ur\.df|Box\.test|lm|t\.test|summary|print|cat|sprintf|confint|par|abline|hist|legend|coef|var|sd|mean|qchisq|length|residuals|coefficients)(?!\w)|(?<!\w)(\d+\.?\d*)(?!\w)/g;
                      const hlLine = line.replace(COMBINED, (m, comment, str, libFn, kw, fn, num) => {
                        if (comment) return `<span style="color:#6b7280">${comment}</span>`;
                        if (str)     return `<span style="color:#34d399">${str}</span>`;
                        if (libFn)   return `<span style="color:#a78bfa">${libFn}</span>`;
                        if (kw)      return `<span style="color:#f472b6">${kw}</span>`;
                        if (fn)      return `<span style="color:#60a5fa">${fn}</span>`;
                        if (num)     return `<span style="color:#fb923c">${num}</span>`;
                        return m;
                      });
                      return (
                        <span key={li}>
                          <span dangerouslySetInnerHTML={{ __html: hlLine }} />
                          {'\n'}
                        </span>
                      );
                    })}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Styles for this page are in app/globals.css (.animate-fadeIn, pre font-family) */}
    </div>
  );
}

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
