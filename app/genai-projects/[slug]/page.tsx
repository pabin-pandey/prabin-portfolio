'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { genaiProjects } from '@/lib/genai-projects-data';
import BackButton from '@/components/BackButton';

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
  back:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  tag:     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  star:    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  brain:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.69A3.99 3.99 0 0 1 6 12c0-1.06.41-2.02 1.08-2.73A3 3 0 0 1 7 7.5 2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.69A3.99 3.99 0 0 0 18 12c0-1.06-.41-2.02-1.08-2.73A3 3 0 0 0 17 7.5 2.5 2.5 0 0 0 14.5 2z"/></svg>,
  zap:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  code:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  chart:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  shield:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  target:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  layers:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  check:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  db:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  monitor: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  file:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
};

// ─── Metric accent cycling ─────────────────────────────────────────────────────
const METRIC_ACCENTS = [
  'border-violet-500 text-violet-400',
  'border-purple-500 text-purple-400',
  'border-indigo-500 text-indigo-400',
  'border-fuchsia-500 text-fuchsia-400',
  'border-blue-500   text-blue-400',
  'border-pink-500   text-pink-400',
];

type TabId = 'overview' | 'systems' | 'dashboard' | 'governance';

export default function GenAiProjectPage() {
  const params  = useParams();
  const slug    = params.slug as string;
  const project = genaiProjects.find((p) => p.id === slug);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [streamlitLoaded, setStreamlitLoaded] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
        <p className="text-gray-400 mb-6">
          The project <code className="text-violet-400">{slug}</code> does not exist.
        </p>
        <BackButton fallback="/" className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-medium transition-colors">
          ← Back to Portfolio
        </BackButton>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
    { id: 'overview',   label: 'Project Overview',  icon: Icon.brain   },
    { id: 'systems',    label: 'Python Systems',     icon: Icon.code    },
    { id: 'dashboard',  label: 'Analytics Dashboard',icon: Icon.monitor },
    { id: 'governance', label: 'AI Governance',      icon: Icon.shield  },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* ── Sticky header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <BackButton fallback="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800">
            {Icon.back} Portfolio
          </BackButton>
          <span className="text-xs font-semibold px-3 py-1 rounded-full border border-violet-500/40 text-violet-400 bg-violet-950/30">
            {project.category}
          </span>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-violet-950/20 to-gray-950 border-b border-gray-800">
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-violet-400">{Icon.brain}</span>
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest">
              Generative AI · Finance · Python
            </span>
          </div>

          {/* Title block */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 leading-tight max-w-3xl">
            {project.title}
          </h1>
          <p className="text-lg text-violet-300 font-medium mb-4">{project.subtitle}</p>
          <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-8">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:border-violet-500/50 hover:text-violet-300 transition-colors">
                {Icon.tag} {tag}
              </span>
            ))}
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {project.metrics.map((m, i) => (
              <div key={i} className={`relative rounded-xl bg-gray-800/60 border-l-2 border border-gray-700 p-4 backdrop-blur-sm ${METRIC_ACCENTS[i % METRIC_ACCENTS.length].split(' ')[0]}`}>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-sm font-bold ${METRIC_ACCENTS[i % METRIC_ACCENTS.length].split(' ')[1]}`}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skills row ────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 flex-wrap">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider shrink-0">Skills</span>
          {project.skills.map((skill, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-violet-950/50 text-violet-300 border border-violet-800/50">
              <span className="text-violet-400">{Icon.star}</span>{skill}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tab bar ───────────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-20 border-b border-gray-800 bg-gray-950/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-violet-400 border-violet-400'
                    : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-600'
                }`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ───────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 1 — PROJECT OVERVIEW
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fadeIn">

            {/* Description */}
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/30 to-gray-900 p-7">
              <div className="flex items-center gap-2 mb-3">
                {Icon.target}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-violet-400">Project Overview</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </div>

            {/* Core Capabilities */}
            <div>
              <SectionHeader icon={Icon.zap} label="Core Capabilities Demonstrated" color="text-violet-400" />
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {project.capabilities.map((cap, i) => (
                  <CapabilityCard key={i} cap={cap} index={i} />
                ))}
              </div>
            </div>

            {/* AI Workflow */}
            <div>
              <SectionHeader icon={Icon.layers} label="Generative AI Integration Across Workflow" color="text-violet-400" />
              <p className="text-sm text-gray-400 mt-1 mb-5">
                Every AI-assisted step had a defined human checkpoint. No AI output entered final deliverables without explicit analyst approval.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.aiWorkflow.map((step, i) => (
                  <WorkflowCard key={i} step={step} isLast={i === project.aiWorkflow.length - 1} />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <SectionHeader icon={Icon.layers} label="Tools & Technologies" color="text-gray-400" />
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tools.map((t) => (
                  <span key={t} className="px-4 py-2 text-sm font-medium rounded-xl bg-gray-800 text-gray-200 border border-gray-700 hover:border-violet-500/50 hover:text-violet-300 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 2 — PYTHON SYSTEMS
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'systems' && (
          <div className="space-y-10 animate-fadeIn">

            {/* Market Analytics */}
            <SystemGroup
              icon={Icon.chart}
              groupLabel="A. Market Analytics & Risk Systems"
              accent="violet"
              systems={project.systems.filter(s => s.group === 'market')}
            />

            {/* Infrastructure */}
            <SystemGroup
              icon={Icon.db}
              groupLabel="B. Financial Data Infrastructure"
              accent="blue"
              systems={project.systems.filter(s => s.group === 'infrastructure')}
            />

            {/* Document Intelligence */}
            <SystemGroup
              icon={Icon.file}
              groupLabel="C. Document Intelligence & NLP"
              accent="purple"
              systems={project.systems.filter(s => s.group === 'document')}
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 3 — DASHBOARD
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">

            {/* ── Live Streamlit Embed ─────────────────────────────────────── */}
            {project.streamlitUrl ? (
              <div className="rounded-2xl overflow-hidden border border-violet-700/40 bg-gray-900 shadow-2xl">
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-gray-500 text-xs font-mono">|</span>
                    <span className="text-sm font-medium text-gray-200 flex items-center gap-2">
                      {Icon.monitor}
                      Portfolio Analytics Dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {streamlitLoaded ? (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/50 border border-emerald-700/50 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-amber-400 font-medium bg-amber-950/50 border border-amber-700/50 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Waking up…
                      </span>
                    )}
                    <a
                      href={project.streamlitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-violet-400 hover:text-violet-300 border border-violet-700/50 bg-violet-950/30 px-2.5 py-1 rounded-full transition-colors font-medium"
                    >
                      Open Full Screen ↗
                    </a>
                  </div>
                </div>

                {/* Sleep-state notice shown while iframe loads */}
                {!streamlitLoaded && (
                  <div className="px-5 py-4 border-b border-gray-800 bg-amber-950/10 flex items-start gap-3">
                    <span className="text-amber-400 text-lg shrink-0">⏱</span>
                    <div>
                      <p className="text-sm font-medium text-amber-300">App is waking up</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Streamlit Community Cloud apps sleep after inactivity. It will be ready in ~30 seconds.
                        {' '}While you wait, use{' '}
                        <a href={project.streamlitUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">Open Full Screen ↗</a>
                        {' '}for the best experience.
                      </p>
                    </div>
                  </div>
                )}

                {/* Iframe */}
                <iframe
                  src={project.streamlitUrl}
                  width="100%"
                  height="850"
                  frameBorder="0"
                  title="Portfolio Analytics Dashboard — Live Streamlit App"
                  className="block bg-gray-950"
                  allow="fullscreen"
                  onLoad={() => setStreamlitLoaded(true)}
                />
              </div>
            ) : (
              /* Placeholder if no URL set */
              <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/20 to-gray-900 p-7">
                <div className="flex items-center gap-2 mb-3">
                  {Icon.monitor}
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-violet-400">Interactive Portfolio Analytics Platform</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Three iteratively refined Streamlit applications — from a core analytics engine to a 621-line client-grade wealth management platform — designed around professional portfolio reporting and decision-support use cases.
                </p>
              </div>
            )}

            {/* ── Dashboard Version Cards ──────────────────────────────────── */}
            <div>
              <SectionHeader icon={Icon.layers} label="Dashboard Architecture — 3 Versions" color="text-violet-400" />
              <p className="text-xs text-gray-500 mt-1 mb-4">Iteratively refined from core analytics engine to client-grade wealth management platform.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {project.dashboardVersions.map((dv, i) => (
                <DashboardCard key={i} dv={dv} index={i} />
              ))}
            </div>

            {/* Tech stack table */}
            <div>
              <SectionHeader icon={Icon.layers} label="Technology Stack" color="text-violet-400" />
              <div className="mt-4 rounded-2xl border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-900">
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 w-48">Category</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Tools</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.techStack.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-800/60 ${i % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-950'}`}>
                        <td className="px-5 py-3 text-violet-400 font-medium">{row.category}</td>
                        <td className="px-5 py-3 text-gray-300">{row.tools}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key outcomes */}
            <div>
              <SectionHeader icon={Icon.check} label="Key Outcomes" color="text-violet-400" />
              <ul className="mt-4 space-y-3">
                {project.keyOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-violet-900/60 border border-violet-700/50 flex items-center justify-center text-violet-400">{Icon.check}</span>
                    <span className="text-gray-300 text-sm leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB 4 — AI GOVERNANCE
        ═══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'governance' && (
          <div className="space-y-10 animate-fadeIn">

            {/* Key finding banner */}
            <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/20 to-gray-900 p-7">
              <div className="flex items-center gap-2 mb-3">
                {Icon.shield}
                <h2 className="text-sm font-semibold uppercase tracking-wider text-red-400">Research Finding</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{project.governance.keyFinding}</p>
            </div>

            {/* Scenarios + Mitigations side by side */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Financial risk scenarios */}
              <div className="rounded-2xl border border-orange-500/30 bg-orange-950/10 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-400 mb-4">Financial Risk Failure Scenarios Documented</h3>
                <ul className="space-y-3">
                  {project.governance.scenarios.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-orange-900/40 border border-orange-700/50 flex items-center justify-center text-orange-400 text-xs font-bold">{i + 1}</span>
                      <span className="text-gray-300 text-sm">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reflection */}
              <div className="rounded-2xl border border-violet-500/20 bg-violet-950/10 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-400 mb-4">Project Reflection</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{project.reflection}</p>
              </div>
            </div>

            {/* Mitigation strategies */}
            <div>
              <SectionHeader icon={Icon.shield} label="AI Governance Measures Applied" color="text-violet-400" />
              <div className="mt-4 rounded-2xl border border-gray-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-900">
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400 w-56">Strategy</th>
                      <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Application in This Project</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.governance.mitigations.map((m, i) => (
                      <tr key={i} className={`border-b border-gray-800/60 ${i % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-950'}`}>
                        <td className="px-5 py-3 text-violet-300 font-medium">{m.strategy}</td>
                        <td className="px-5 py-3 text-gray-300">{m.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Skills map */}
            <div>
              <SectionHeader icon={Icon.star} label="Skills Demonstrated Through This Project" color="text-violet-400" />

              <div className="grid md:grid-cols-3 gap-5 mt-4">
                <SkillTable title="Financial Skills" accent="emerald" rows={project.skillMap.financial} />
                <SkillTable title="Technical Skills" accent="blue"    rows={project.skillMap.technical} />
                <SkillTable title="AI / GenAI Skills" accent="violet" rows={project.skillMap.ai} />
              </div>
            </div>

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

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, label, color }: { icon: JSX.Element; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={color}>{icon}</span>
      <h2 className={`text-sm font-semibold uppercase tracking-wider ${color}`}>{label}</h2>
    </div>
  );
}

const CAP_ACCENTS = [
  { border: 'border-violet-500/30', bg: 'bg-violet-950/20',  title: 'text-violet-400',  num: 'bg-violet-900/50 text-violet-300 border-violet-700/50' },
  { border: 'border-purple-500/30', bg: 'bg-purple-950/20',  title: 'text-purple-400',  num: 'bg-purple-900/50 text-purple-300 border-purple-700/50' },
  { border: 'border-indigo-500/30', bg: 'bg-indigo-950/20',  title: 'text-indigo-400',  num: 'bg-indigo-900/50 text-indigo-300 border-indigo-700/50' },
  { border: 'border-fuchsia-500/30',bg: 'bg-fuchsia-950/20', title: 'text-fuchsia-400', num: 'bg-fuchsia-900/50 text-fuchsia-300 border-fuchsia-700/50' },
  { border: 'border-blue-500/30',   bg: 'bg-blue-950/20',    title: 'text-blue-400',    num: 'bg-blue-900/50 text-blue-300 border-blue-700/50' },
  { border: 'border-pink-500/30',   bg: 'bg-pink-950/20',    title: 'text-pink-400',    num: 'bg-pink-900/50 text-pink-300 border-pink-700/50' },
];

function CapabilityCard({ cap, index }: { cap: { title: string; built: string; tools: string; relevance: string }; index: number }) {
  const a = CAP_ACCENTS[index % CAP_ACCENTS.length];
  return (
    <div className={`rounded-2xl border p-6 ${a.border} ${a.bg}`}>
      <div className="flex items-start gap-3 mb-3">
        <span className={`shrink-0 w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center ${a.num}`}>
          {index + 1}
        </span>
        <h3 className={`font-semibold text-sm ${a.title}`}>{cap.title}</h3>
      </div>
      <p className="text-gray-300 text-xs leading-relaxed mb-3">{cap.built}</p>
      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          <span className="text-gray-500 text-xs font-medium shrink-0 w-12">Tools</span>
          <span className="text-gray-400 text-xs">{cap.tools}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gray-500 text-xs font-medium shrink-0 w-12">Value</span>
          <span className="text-gray-400 text-xs">{cap.relevance}</span>
        </div>
      </div>
    </div>
  );
}

function WorkflowCard({ step, isLast }: { step: { stage: string; label: string; items: string[] }; isLast: boolean }) {
  return (
    <div className="relative">
      {!isLast && (
        <div className="hidden lg:block absolute top-7 -right-2 z-10 text-gray-600">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>
      )}
      <div className="rounded-2xl border border-gray-700 bg-gray-900/60 p-5 h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold text-violet-400 bg-violet-950/50 border border-violet-800/50 px-2 py-0.5 rounded">{step.stage}</span>
          <span className="text-xs font-semibold text-gray-300">{step.label}</span>
        </div>
        <ul className="space-y-2">
          {step.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
              <span className="shrink-0 mt-0.5 text-violet-500">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const GROUP_ACCENTS: Record<string, { border: string; bg: string; title: string; badge: string }> = {
  violet: { border: 'border-violet-500/30', bg: 'bg-violet-950/10', title: 'text-violet-400', badge: 'bg-violet-900/50 text-violet-300 border-violet-700/50' },
  blue:   { border: 'border-blue-500/30',   bg: 'bg-blue-950/10',   title: 'text-blue-400',   badge: 'bg-blue-900/50 text-blue-300 border-blue-700/50'   },
  purple: { border: 'border-purple-500/30', bg: 'bg-purple-950/10', title: 'text-purple-400', badge: 'bg-purple-900/50 text-purple-300 border-purple-700/50' },
};

function SystemGroup({ icon, groupLabel, accent, systems }: {
  icon: JSX.Element;
  groupLabel: string;
  accent: 'violet' | 'blue' | 'purple';
  systems: Array<{ name: string; objective: string; implementation: string; dataSource: string; output: string; relevance: string; files: string }>;
}) {
  const a = GROUP_ACCENTS[accent];
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className={a.title}>{icon}</span>
        <h2 className={`text-sm font-semibold uppercase tracking-wider ${a.title}`}>{groupLabel}</h2>
      </div>
      <div className="space-y-4">
        {systems.map((sys, i) => (
          <div key={i} className={`rounded-2xl border p-6 ${a.border} ${a.bg}`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className={`font-semibold text-base ${a.title}`}>{sys.name}</h3>
              <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border font-mono ${a.badge}`}>
                {sys.files.split(',')[0].trim()}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              <SystemField label="Objective"       value={sys.objective}       />
              <SystemField label="Implementation"  value={sys.implementation}  />
              <SystemField label="Data Source"     value={sys.dataSource}      />
              <SystemField label="Output"          value={sys.output}          />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800/60">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Financial Relevance — </span>
              <span className="text-xs text-gray-400">{sys.relevance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm text-gray-300 leading-relaxed">{value}</p>
    </div>
  );
}

function DashboardCard({ dv, index }: { dv: { version: string; name: string; lines: number; features: string[] }; index: number }) {
  const colors = [
    { border: 'border-violet-500/30', bg: 'bg-violet-950/20', badge: 'bg-violet-900/50 text-violet-300 border-violet-700/50', dot: 'bg-violet-400' },
    { border: 'border-purple-500/30', bg: 'bg-purple-950/20', badge: 'bg-purple-900/50 text-purple-300 border-purple-700/50', dot: 'bg-purple-400' },
    { border: 'border-indigo-500/30', bg: 'bg-indigo-950/20', badge: 'bg-indigo-900/50 text-indigo-300 border-indigo-700/50', dot: 'bg-indigo-400' },
  ];
  const c = colors[index % colors.length];
  return (
    <div className={`rounded-2xl border p-6 ${c.border} ${c.bg}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${c.badge}`}>{dv.version.toUpperCase()}</span>
        <span className="text-xs text-gray-500">{dv.lines} lines</span>
      </div>
      <h3 className="font-semibold text-white mt-2 mb-4">{dv.name}</h3>
      <ul className="space-y-2">
        {dv.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
            <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${c.dot}`} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillTable({ title, accent, rows }: { title: string; accent: string; rows: { skill: string; application: string }[] }) {
  const colors: Record<string, { border: string; bg: string; header: string; skillColor: string }> = {
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-950/10', header: 'text-emerald-400', skillColor: 'text-emerald-300' },
    blue:    { border: 'border-blue-500/30',    bg: 'bg-blue-950/10',    header: 'text-blue-400',    skillColor: 'text-blue-300'    },
    violet:  { border: 'border-violet-500/30',  bg: 'bg-violet-950/10',  header: 'text-violet-400',  skillColor: 'text-violet-300'  },
  };
  const c = colors[accent] ?? colors.violet;
  return (
    <div className={`rounded-2xl border p-5 ${c.border} ${c.bg}`}>
      <h3 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${c.header}`}>{title}</h3>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="border-b border-gray-800/50 pb-3 last:border-0 last:pb-0">
            <p className={`text-xs font-semibold mb-0.5 ${c.skillColor}`}>{row.skill}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{row.application}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
