'use client';

import { useState } from 'react';
import Link from 'next/link';
import { pythonProjects } from '@/lib/projects-data';

const Icon = {
  search: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  chevR:  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
};

const DIFFICULTY_STYLE: Record<string, string> = {
  Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Advanced:     'text-orange-400 bg-orange-400/10 border-orange-400/30',
  Expert:       'text-red-400 bg-red-400/10 border-red-400/30',
};

export default function ProjectsPage() {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? pythonProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.name.toLowerCase().includes(query.toLowerCase())) ||
          p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : pythonProjects;

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">

      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Portfolio
              </Link>
              <span className="text-gray-700 text-sm">/</span>
              <span className="text-sm text-gray-300">Python Projects</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Python Projects</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Quantitative finance &amp; derivatives engineering — {pythonProjects.length} projects
            </p>
          </div>

          {/* Tech legend */}
          <div className="hidden md:flex items-center gap-3">
            {['NumPy', 'SciPy', 'Pandas', 'Matplotlib', 'Monte Carlo'].map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-400 border border-gray-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main layout ───────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 93px)' }}>

        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0 border-r border-gray-800 bg-gray-900 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {Icon.search}
              </span>
              <input
                type="text"
                placeholder="Search projects, tools…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-800 text-sm text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Project list — each item is a direct link to the full case study */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-8">No projects match your search.</p>
            )}
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="w-full text-left rounded-xl p-3.5 transition-all group block hover:bg-gray-800 border border-transparent hover:border-gray-700/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium leading-tight text-gray-200 group-hover:text-white">
                    {project.title}
                  </div>
                  <span className="text-gray-600 group-hover:text-blue-400 transition-colors shrink-0">
                    {Icon.chevR}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded border ${DIFFICULTY_STYLE[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {project.technologies.slice(0, 3).join(' · ')}
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <p className="text-xs text-gray-600 text-center">
              {filtered.length} of {pythonProjects.length} projects
            </p>
          </div>
        </aside>

        {/* Right panel — open prompt */}
        <main className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center max-w-sm px-6">
            <div className="text-5xl mb-5 opacity-20">⟨/⟩</div>
            <p className="text-gray-300 font-semibold mb-2">Select a project</p>
            <p className="text-sm text-gray-600">
              Click any project in the sidebar to open its full case study — including code, outputs, and analysis.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
