'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { pythonProjects, PythonProject } from '@/lib/projects-data';
import { useParams } from 'next/navigation';
import ProfessionalNotebookParser from '@/components/ProfessionalNotebookParser';

// ─── Icon set ─────────────────────────────────────────────────────────────────
const Icon = {
  code:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  book:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  zap:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  back:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  tag:    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  target: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  cpu:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  chart:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  brain:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.69A3.99 3.99 0 0 1 6 12c0-1.06.41-2.02 1.08-2.73A3 3 0 0 1 7 7.5 2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.69A3.99 3.99 0 0 0 18 12c0-1.06-.41-2.02-1.08-2.73A3 3 0 0 0 17 7.5 2.5 2.5 0 0 0 14.5 2z"/></svg>,
  star:   <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

const DIFFICULTY_STYLE: Record<string, string> = {
  Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Advanced:     'text-orange-400 bg-orange-400/10 border-orange-400/30',
  Expert:       'text-red-400 bg-red-400/10 border-red-400/30',
};

const METRIC_ACCENTS = [
  'border-blue-500 text-blue-400',
  'border-violet-500 text-violet-400',
  'border-cyan-500 text-cyan-400',
  'border-emerald-500 text-emerald-400',
  'border-amber-500 text-amber-400',
  'border-pink-500 text-pink-400',
];

type TabId = 'overview' | 'code' | 'insights';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = pythonProjects.find((p) => p.id === slug);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
        <p className="text-gray-400 mb-6">The project <code className="text-blue-400">{slug}</code> does not exist.</p>
        <Link href="/projects" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
    { id: 'overview', label: 'Overview',         icon: Icon.zap  },
    { id: 'code',     label: 'Code & Outputs',   icon: Icon.code },
    { id: 'insights', label: 'Insights',          icon: Icon.brain },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* ── Sticky top nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800"
          >
            {Icon.back} All Projects
          </Link>

          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${DIFFICULTY_STYLE[project.difficulty]}`}>
            {project.difficulty}
          </span>
        </div>
      </header>

      {/* ── Hero / Header ───────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border-b border-gray-800">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow accents */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-12">

          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
              {project.category.replace(/-/g, ' ')}
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

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500/50 hover:text-blue-300 transition-colors"
              >
                {Icon.tag} {tag.name}
              </span>
            ))}
          </div>

          {/* KPI Cards */}
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
      {project.skillsdemonstrated && project.skillsdemonstrated.length > 0 && (
        <div className="border-b border-gray-800 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider shrink-0">
              Skills
            </span>
            {project.skillsdemonstrated.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-800/50"
              >
                <span className="text-indigo-400">{Icon.star}</span>
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
                    ? 'text-blue-400 border-blue-400'
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

      {/* ── Tab Content ─────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ═══ OVERVIEW ════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">

            {/* Executive summary card */}
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-gray-900 p-7">
              <div className="flex items-center gap-2 mb-3">
                {Icon.target}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                  Executive Summary
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </div>

            {/* Problem / Approach */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard
                emoji="📋"
                title="Problem Statement"
                text={project.caseStudy.problem}
                accent="orange"
              />
              <CaseCard
                emoji="🎯"
                title="Analytical Approach"
                text={project.caseStudy.approach}
                accent="blue"
              />
            </div>

            {/* Data / Methods */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard
                emoji="💾"
                title="Data Sources"
                text={project.caseStudy.data}
                accent="purple"
              />
              <CaseCard
                emoji="🔧"
                title="Quantitative Methods"
                text={project.caseStudy.methods}
                accent="green"
              />
            </div>

            {/* Results / Learnings */}
            <div className="grid md:grid-cols-2 gap-4">
              <CaseCard
                emoji="✨"
                title="Key Results"
                text={project.caseStudy.results}
                accent="emerald"
              />
              <CaseCard
                emoji="🧠"
                title="Key Learnings"
                text={project.caseStudy.learnings}
                accent="amber"
              />
            </div>

            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {Icon.cpu}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Technology Stack
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-800 text-gray-200 border border-gray-700 hover:border-blue-500/50 hover:text-blue-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ CODE & OUTPUTS ══════════════════════════════════════════════ */}
        {activeTab === 'code' && (
          <div className="animate-fadeIn">
            <ProfessionalNotebookParser notebookPath={project.notebookPath} />
          </div>
        )}

        {/* ═══ INSIGHTS ════════════════════════════════════════════════════ */}
        {activeTab === 'insights' && (
          <div className="space-y-5 animate-fadeIn">
            <InsightCard
              icon="🎯"
              title="Objective & Motivation"
              text={project.caseStudy.problem}
              accent="indigo"
            />
            <InsightCard
              icon="🔬"
              title="Methodology Deep-Dive"
              text={project.caseStudy.methods}
              accent="blue"
            />
            <InsightCard
              icon="📊"
              title="Quantitative Results"
              text={project.caseStudy.results}
              accent="green"
            />
            <InsightCard
              icon="🧠"
              title="Professional Takeaways"
              text={project.caseStudy.learnings}
              accent="amber"
            />

            {/* Skills matrix */}
            {project.skillsdemonstrated && project.skillsdemonstrated.length > 0 && (
              <div className="rounded-2xl border border-gray-700 bg-gray-900 p-6 mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Skills Demonstrated
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.skillsdemonstrated.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40"
                    >
                      <span className="text-indigo-400 text-sm">{Icon.star}</span>
                      <span className="text-sm text-indigo-200 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Global styles injected inline for dynamic classes ───────────── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }

        /* DataFrame table styles */
        .df-output table {
          border-collapse: collapse;
          font-size: 0.75rem;
          font-family: ui-monospace, monospace;
          width: 100%;
        }
        .df-output th {
          background: #1e293b;
          color: #94a3b8;
          padding: 6px 12px;
          text-align: left;
          border-bottom: 1px solid #334155;
        }
        .df-output td {
          padding: 5px 12px;
          border-bottom: 1px solid #1e293b;
          color: #e2e8f0;
        }
        .df-output tr:hover td { background: #1e293b; }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const CASE_ACCENTS: Record<string, string> = {
  orange:  'border-orange-500/40 bg-orange-950/20',
  blue:    'border-blue-500/40   bg-blue-950/20',
  purple:  'border-purple-500/40 bg-purple-950/20',
  green:   'border-green-500/40  bg-green-950/20',
  emerald: 'border-emerald-500/40 bg-emerald-950/20',
  amber:   'border-amber-500/40  bg-amber-950/20',
};

const CASE_TITLE_COLOR: Record<string, string> = {
  orange:  'text-orange-400',
  blue:    'text-blue-400',
  purple:  'text-purple-400',
  green:   'text-green-400',
  emerald: 'text-emerald-400',
  amber:   'text-amber-400',
};

function CaseCard({
  emoji, title, text, accent,
}: {
  emoji: string; title: string; text: string; accent: string;
}) {
  return (
    <div className={`rounded-2xl border p-6 ${CASE_ACCENTS[accent] ?? 'border-gray-700 bg-gray-900'}`}>
      <h3 className={`flex items-center gap-2 font-semibold mb-3 ${CASE_TITLE_COLOR[accent] ?? 'text-gray-300'}`}>
        <span className="text-lg leading-none">{emoji}</span>
        {title}
      </h3>
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}

const INSIGHT_ACCENTS: Record<string, string> = {
  indigo:  'border-indigo-500/40 bg-indigo-950/20',
  blue:    'border-blue-500/40   bg-blue-950/20',
  green:   'border-green-500/40  bg-green-950/20',
  amber:   'border-amber-500/40  bg-amber-950/20',
};

const INSIGHT_TITLE: Record<string, string> = {
  indigo: 'text-indigo-300',
  blue:   'text-blue-300',
  green:  'text-green-300',
  amber:  'text-amber-300',
};

function InsightCard({
  icon, title, text, accent,
}: {
  icon: string; title: string; text: string; accent: string;
}) {
  return (
    <div className={`rounded-2xl border p-6 transition-all hover:shadow-lg ${INSIGHT_ACCENTS[accent] ?? 'border-gray-700 bg-gray-900'}`}>
      <h3 className={`flex items-center gap-2 text-base font-semibold mb-3 ${INSIGHT_TITLE[accent] ?? 'text-gray-300'}`}>
        <span className="text-xl leading-none">{icon}</span>
        {title}
      </h3>
      <p className="text-sm text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}
