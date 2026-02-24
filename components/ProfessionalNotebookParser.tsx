'use client';

import React, { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NotebookCell {
  cell_type: 'code' | 'markdown' | 'raw';
  source: string[] | string;
  outputs?: NotebookOutput[];
  execution_count?: number;
}

interface NotebookOutput {
  output_type: string;
  text?: string[] | string;
  data?: {
    'image/png'?: string;
    'text/html'?: string[] | string;
    'text/plain'?: string[] | string;
  };
  traceback?: string[];
}

interface NotebookStructure {
  cells: NotebookCell[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const extractText = (source: string[] | string): string =>
  Array.isArray(source) ? source.join('') : source;

const escHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Strip all HTML tags and decode common entities
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

// Detect if a string is primarily HTML markup
function isHtmlContent(text: string): boolean {
  const stripped = stripHtml(text).trim();
  const htmlTagCount = (text.match(/<[a-z][^>]*>/gi) || []).length;
  return htmlTagCount >= 2 && stripped.length < text.length * 0.6;
}

// ─── Python Syntax Highlighter ────────────────────────────────────────────────

const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try',
  'while', 'with', 'yield',
]);

const BUILTINS = new Set([
  'print', 'len', 'range', 'list', 'dict', 'set', 'tuple', 'str', 'int',
  'float', 'bool', 'type', 'isinstance', 'max', 'min', 'sum', 'abs',
  'round', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'reversed',
  'open', 'np', 'pd', 'plt', 'norm', 'sns', 'tf', 'torch', 'random',
  'math', 'json', 'os', 'sys',
]);

function syntaxHighlight(code: string): string {
  const out: string[] = [];
  let i = 0;
  const n = code.length;

  while (i < n) {
    if (code[i] === '#') {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      out.push(`<span style="color:#6b7280;font-style:italic">${escHtml(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (
      (code[i] === '"' || code[i] === "'") &&
      code[i + 1] === code[i] && code[i + 2] === code[i]
    ) {
      const q = code[i].repeat(3);
      let j = i + 3;
      while (j < n && code.slice(j, j + 3) !== q) j++;
      j += 3;
      out.push(`<span style="color:#86efac">${escHtml(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < n && code[j] !== q && code[j] !== '\n') {
        if (code[j] === '\\') j++;
        j++;
      }
      if (j < n && code[j] === q) j++;
      out.push(`<span style="color:#86efac">${escHtml(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i - 1]))) {
      let j = i;
      while (j < n && /[\d._eEjJ]/.test(code[j])) j++;
      out.push(`<span style="color:#fcd34d">${escHtml(code.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < n && /\w/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (KEYWORDS.has(word)) {
        out.push(`<span style="color:#c084fc;font-weight:600">${escHtml(word)}</span>`);
      } else if (BUILTINS.has(word)) {
        out.push(`<span style="color:#60a5fa">${escHtml(word)}</span>`);
      } else if (/^[A-Z]/.test(word) && word.length > 1) {
        out.push(`<span style="color:#fb923c">${escHtml(word)}</span>`);
      } else {
        out.push(escHtml(word));
      }
      i = j;
      continue;
    }

    out.push(escHtml(code[i]));
    i++;
  }

  return out.join('');
}

// ─── Boilerplate Detection ────────────────────────────────────────────────────

// Patterns that trigger FULL cell removal
const HARD_DROP_PATTERNS: RegExp[] = [
  /FIN\d{4}/i,
  /panel\s+panel-/i,
  /panel-heading/i,
  /panel-body/i,
  /alert\s+alert-/i,
  /alert-warning/i,
  /alert-info/i,
  /alert-block/i,
  /Kernel\s*[>→]\s*Restart/i,
  /File\s*[>→]\s*Download/i,
  /\.ipynb\b/i,
  /tuu?\d{5,}/i,
  /submit(ting)?\s+your\s+assignment/i,
  /to\s+receive\s+credit/i,
  /Please\s+code\s+you/i,
  /intended\s+to\s+be\s+done\s+in\s+order/i,
  /Restart\s*&\s*Run\s*All/i,
  /Project\s+Introduction/i,
  /Project\s+#\s*\d/i,
  /panel-primary/i,
  /panel-success/i,
  /panel-info/i,
  /panel-danger/i,
  /panel-warning/i,
  // Bootstrap HTML wrappers
  /<div\s+class\s*=\s*["']?\s*panel/i,
  // Course numbering patterns
  /Project\s+#\d/i,
  // Submission instruction text
  /name\s+your\s+files\s+in\s+the\s+following\s+format/i,
  /run\s+in\s+sequence\s+from\s+start\s+to\s+finish/i,
];

// Line-level patterns to strip from otherwise useful markdown
const STRIP_LINE_PATTERNS: RegExp[] = [
  // Q.No. / QNo. style question headings  ── e.g. "#### Q.No.1" / "##### Q.No. 5.2"
  /^#+\s*Q\.?\s*No\.?\s*[\d.]*/i,
  /^#+\s*QNo\.?\s*[\d.]*/i,
  // Numbered sub-question headings  ── e.g. "#### 5.3 How does..." / "### 1.2 What is..."
  /^#+\s*\d+\.\d+\s+/i,
  // Task headers
  /^#+\s*Task\s+\d+/i,
  // Bare "Answer" headers
  /^#+\s*Answer\s*[:.>]?\s*$/i,
  /^Answer\s*[:.]\s*$/i,
  // Instructions / hint / note labels
  /^#+\s*Instructions\s*$/i,
  /^Hint\s*:/i,
  /^Note\s*:/i,
  // Divider lines
  /^---+\s*$/,
  // Question-prompt headings (instructor language, not student analysis)
  /^#+\s*Write\s+(a|an|the)\s+/i,
  /^#+\s*Using\s+(the|your|this)/i,
  /^#+\s*Recall\s+that/i,
  /^#+\s*Calculate\s+the/i,
  /^#+\s*Plot\s+(the|a|this)/i,
  /^#+\s*Modify\s+the/i,
  /^#+\s*Explain\s+(why|how|what)/i,
  /^#+\s*Make\s+sure\s+you/i,
  /^#+\s*Reprice\s+the/i,
  /^#+\s*Simulate\s+the/i,
  /^#+\s*Check\s+that\s+/i,
  /^#+\s*Read\s+in\s+(each|the)\s+/i,
  /^#+\s*Reorganize\s+the/i,
  /^#+\s*Create\s+a\s+/i,
  // Comparison-type question prompts
  /^#+\s*Compare\s+this/i,
  /^#+\s*How\s+does\s+the/i,
  /^#+\s*Which\s+stock/i,
  /^#+\s*What\s+is\s+the\s+present\s+value/i,
  // "#### Comaprison between..." typo pattern from project 3
  /^#+\s*Com[ap]+rison\s+between/i,
];

function isHardBoilerplate(text: string): boolean {
  return HARD_DROP_PATTERNS.some((p) => p.test(text));
}

function cleanMarkdownText(raw: string): string {
  // If it looks primarily like HTML, strip the HTML tags first
  let text = raw;
  if (isHtmlContent(raw)) {
    text = stripHtml(raw);
  }

  const lines = text.split('\n');
  const kept = lines.filter(
    (line) => !STRIP_LINE_PATTERNS.some((p) => p.test(line.trim()))
  );
  return kept.join('\n').trim();
}

// ─── LaTeX Inline Rendering ───────────────────────────────────────────────────

function processLatex(text: string): string {
  // Block LaTeX: $$...$$
  text = text.replace(/\$\$([^$]+)\$\$/g, (_m, expr) => {
    return `<div class="latex-block">\\(${escHtml(expr.trim())}\\)</div>`;
  });
  // Inline LaTeX: $...$
  text = text.replace(/\$([^$\n]+)\$/g, (_m, expr) => {
    return `<span class="latex-inline">\\(${escHtml(expr.trim())}\\)</span>`;
  });
  return text;
}

// ─── Markdown → HTML ──────────────────────────────────────────────────────────

function renderMarkdownToHtml(md: string): string {
  const lines = md.split('\n');
  const result: string[] = [];
  let inList = false;
  let inNumbered = false;

  for (const rawLine of lines) {
    const line = rawLine;

    // Close list on blank line
    if (line.trim() === '') {
      if (inList)    { result.push('</ul>'); inList = false; }
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      result.push('<div class="my-2"></div>');
      continue;
    }

    // Headings (up to h3)
    const h1 = line.match(/^#\s+(.*)/);
    if (h1) {
      if (inList)    { result.push('</ul>'); inList = false; }
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      result.push(`<h2 class="text-xl font-bold text-white mt-5 mb-2">${inlineFormat(escHtml(h1[1]))}</h2>`);
      continue;
    }
    const h2 = line.match(/^##\s+(.*)/);
    if (h2) {
      if (inList)    { result.push('</ul>'); inList = false; }
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      result.push(`<h3 class="text-lg font-semibold text-blue-200 mt-4 mb-2">${inlineFormat(escHtml(h2[1]))}</h3>`);
      continue;
    }
    const h3 = line.match(/^###\s+(.*)/);
    if (h3) {
      if (inList)    { result.push('</ul>'); inList = false; }
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      result.push(`<h4 class="text-base font-semibold text-blue-300 mt-3 mb-1">${inlineFormat(escHtml(h3[1]))}</h4>`);
      continue;
    }
    const h4 = line.match(/^####\s+(.*)/);
    if (h4) {
      if (inList)    { result.push('</ul>'); inList = false; }
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      result.push(`<h5 class="text-sm font-semibold text-blue-400 mt-2 mb-1">${inlineFormat(escHtml(h4[1]))}</h5>`);
      continue;
    }

    // Bullet list
    const bullet = line.match(/^[-*•+]\s+(.*)/);
    if (bullet) {
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      if (!inList)   { result.push('<ul class="list-disc list-inside space-y-1 my-2 ml-3">'); inList = true; }
      result.push(`<li class="text-gray-300 text-sm leading-relaxed">${inlineFormat(escHtml(bullet[1]))}</li>`);
      continue;
    }

    // Numbered list
    const numbered = line.match(/^\d+\.\s+(.*)/);
    if (numbered) {
      if (inList)      { result.push('</ul>'); inList = false; }
      if (!inNumbered) { result.push('<ol class="list-decimal list-inside space-y-1 my-2 ml-3">'); inNumbered = true; }
      result.push(`<li class="text-gray-300 text-sm leading-relaxed">${inlineFormat(escHtml(numbered[1]))}</li>`);
      continue;
    }

    // Block LaTeX: lines starting/ending with $$
    if (line.trim().startsWith('$$') && line.trim().endsWith('$$') && line.trim().length > 4) {
      if (inList)    { result.push('</ul>'); inList = false; }
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      const expr = line.trim().slice(2, -2).trim();
      result.push(`<div class="my-3 px-4 py-3 bg-gray-800/60 rounded-lg border border-gray-700 font-mono text-sm text-amber-200 overflow-x-auto">${escHtml(expr)}</div>`);
      continue;
    }
    // Multi-line LaTeX formula marker $$
    if (line.trim() === '$$') {
      result.push(`<div class="my-1 text-xs text-amber-300/50 font-mono">[formula]</div>`);
      continue;
    }
    // Inline LaTeX formula line (contains $$)
    if (line.includes('$$')) {
      if (inList)    { result.push('</ul>'); inList = false; }
      if (inNumbered){ result.push('</ol>'); inNumbered = false; }
      result.push(`<div class="my-2 px-3 py-2 bg-gray-800/40 rounded font-mono text-sm text-amber-200 overflow-x-auto">${escHtml(line.trim())}</div>`);
      continue;
    }

    // Regular paragraph
    if (!inList && !inNumbered) {
      result.push(`<p class="text-gray-300 text-sm leading-relaxed my-1.5">${inlineFormat(escHtml(line))}</p>`);
    }
  }

  if (inList)    result.push('</ul>');
  if (inNumbered) result.push('</ol>');
  return result.join('\n');
}

function inlineFormat(s: string): string {
  return s
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em class="text-gray-200 italic">$1</em>')
    .replace(/`([^`\n]+)`/g, '<code class="bg-gray-700/80 px-1.5 py-0.5 rounded text-green-300 text-xs font-mono">$1</code>');
}

// ─── Output Renderer ──────────────────────────────────────────────────────────

function renderOutput(output: NotebookOutput, idx: number) {
  if (!output) return null;

  if (output.output_type === 'stream') {
    const text = extractText(output.text || '');
    if (!text.trim()) return null;
    return (
      <div key={idx} className="rounded-lg overflow-hidden border border-gray-600/70 my-3">
        <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 text-xs font-mono text-gray-400 border-b border-gray-600/70">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block flex-shrink-0"></span>
          Output
        </div>
        <pre className="p-4 text-sm font-mono text-green-300 bg-gray-900/80 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {text}
        </pre>
      </div>
    );
  }

  if (output.output_type === 'display_data' || output.output_type === 'execute_result') {
    // Image (chart / figure)
    if (output.data?.['image/png']) {
      return (
        <div key={idx} className="my-5 flex flex-col items-center gap-2">
          <div className="rounded-xl overflow-hidden border border-gray-600/50 shadow-xl shadow-black/30 bg-white">
            <img
              src={`data:image/png;base64,${output.data['image/png']}`}
              alt="Generated visualization"
              className="max-w-full block"
              style={{ maxHeight: '520px' }}
            />
          </div>
          <p className="text-xs text-gray-500 italic mt-1">↑ Generated output</p>
        </div>
      );
    }

    // HTML output (DataFrames, tables)
    if (output.data?.['text/html']) {
      const html = extractText(output.data['text/html']);
      return (
        <div key={idx} className="my-3 rounded-lg overflow-hidden border border-gray-600/70">
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 text-xs text-gray-400 border-b border-gray-600/70">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block flex-shrink-0"></span>
            DataFrame / Table
          </div>
          <div
            className="p-3 text-sm text-gray-200 df-output overflow-x-auto bg-gray-900/60"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      );
    }

    // Text / plain
    if (output.data?.['text/plain']) {
      const text = extractText(output.data['text/plain']);
      if (!text.trim()) return null;
      return (
        <div key={idx} className="rounded-lg overflow-hidden border border-gray-600/70 my-3">
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 text-xs font-mono text-gray-400 border-b border-gray-600/70">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block flex-shrink-0"></span>
            Result
          </div>
          <pre className="p-4 text-sm font-mono text-gray-200 bg-gray-900/80 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {text}
          </pre>
        </div>
      );
    }
  }

  if (output.output_type === 'error') {
    const trace = (output.traceback || []).join('\n').replace(/\x1b\[[0-9;]*m/g, '');
    return (
      <div key={idx} className="rounded-lg overflow-hidden border border-red-700/60 my-3">
        <div className="bg-red-900/40 px-3 py-1.5 text-xs text-red-300 border-b border-red-700/60">
          Error
        </div>
        <pre className="p-4 text-sm font-mono text-red-300 overflow-x-auto whitespace-pre-wrap">
          {trace}
        </pre>
      </div>
    );
  }

  return null;
}

// ─── Cell Components ──────────────────────────────────────────────────────────

function CodeCell({ cell, cellNumber }: { cell: NotebookCell; cellNumber: number }) {
  const [copied, setCopied] = useState(false);
  const code = extractText(cell.source);
  if (!code.trim()) return null;

  const lines = code.split('\n');
  // Filter trailing blank lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();

  const hasOutputs = cell.outputs && cell.outputs.filter(o => {
    if (o.output_type === 'stream') return !!(extractText(o.text || '').trim());
    if (o.output_type === 'display_data' || o.output_type === 'execute_result') {
      return !!(o.data?.['image/png'] || o.data?.['text/html'] || (o.data?.['text/plain'] && extractText(o.data['text/plain']).trim()));
    }
    return false;
  }).length > 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-700/80 shadow-lg shadow-black/20 mb-6">
      {/* Code header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/90 border-b border-gray-700/60">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          </div>
          <span className="text-xs font-mono text-gray-500">
            In [{cellNumber}]  ·  {lines.length} {lines.length === 1 ? 'line' : 'lines'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-white transition-colors px-2.5 py-1 rounded-md hover:bg-gray-700/80 font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>

      {/* Code body with line numbers */}
      <div className="bg-gray-950 overflow-x-auto">
        <table className="w-full border-collapse min-w-0">
          <tbody>
            {lines.map((line, li) => (
              <tr key={li} className="group hover:bg-gray-800/30 transition-colors">
                <td className="select-none text-right pr-3 pl-4 text-xs text-gray-700 font-mono align-top py-0.5 border-r border-gray-800/60 w-9 min-w-[2.25rem]">
                  {li + 1}
                </td>
                <td className="pl-4 pr-4 py-0.5">
                  <code
                    className="font-mono text-sm block"
                    dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) || '&nbsp;' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Outputs */}
      {hasOutputs && (
        <div className="border-t border-gray-700/50 bg-gray-900/50 px-4 pt-3 pb-4 space-y-1">
          {cell.outputs!.map((output, oi) => renderOutput(output, oi))}
        </div>
      )}
    </div>
  );
}

function MarkdownCell({ text }: { text: string }) {
  if (!text.trim()) return null;
  return (
    <div
      className="px-2 py-2 mb-3 text-sm border-l-2 border-gray-700/40 pl-4"
      dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(text) }}
    />
  );
}

// ─── Section Divider ─────────────────────────────────────────────────────────

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-gray-700"></div>
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-4 py-1.5 rounded-full border border-gray-700/60 bg-gray-800/60 whitespace-nowrap">
        {title}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-700 to-gray-700"></div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProfessionalNotebookParserProps {
  notebookPath: string;
}

export const ProfessionalNotebookParser: React.FC<ProfessionalNotebookParserProps> = ({
  notebookPath,
}) => {
  const [notebook, setNotebook] = useState<NotebookStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(notebookPath)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} — could not load ${notebookPath}`);
        return r.json();
      })
      .then((data) => setNotebook(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [notebookPath]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 animate-spin"></div>
        </div>
        <p className="text-gray-500 text-sm">Loading notebook…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-700/60 bg-red-900/10 p-6">
        <p className="font-semibold text-red-300 mb-1">Could not load notebook</p>
        <p className="text-sm text-red-400 font-mono mt-1">{error}</p>
        <p className="text-xs text-gray-600 mt-3">Path: {notebookPath}</p>
      </div>
    );
  }

  if (!notebook?.cells?.length) {
    return <div className="text-gray-500 text-center py-10">No notebook content found.</div>;
  }

  // ── Process & filter cells ────────────────────────────────────────────────

  type ProcessedCell = {
    type: 'code' | 'markdown';
    cell: NotebookCell;
    cleanText?: string;
    codeIndex: number; // sequential code cell number for [In N] display
  };

  const processedCells: ProcessedCell[] = [];
  let codeCounter = 0;

  for (const cell of notebook.cells) {
    const rawText = extractText(cell.source);

    if (cell.cell_type === 'code') {
      // Skip completely empty code cells (no source AND no outputs)
      const hasContent = rawText.trim().length > 0;
      const hasOutputs = (cell.outputs || []).some(o => {
        if (o.output_type === 'stream') return !!(extractText(o.text || '').trim());
        if (o.output_type === 'display_data' || o.output_type === 'execute_result') {
          return !!(o.data?.['image/png'] || o.data?.['text/html'] || (o.data?.['text/plain'] && extractText(o.data?.['text/plain'] || '').trim()));
        }
        return false;
      });
      if (hasContent || hasOutputs) {
        codeCounter++;
        processedCells.push({ type: 'code', cell, codeIndex: codeCounter });
      }
    } else if (cell.cell_type === 'markdown') {
      // Hard boilerplate? Drop entirely.
      if (isHardBoilerplate(rawText)) continue;

      // Clean the text
      const cleaned = cleanMarkdownText(rawText);

      // Only keep if there's meaningful content left (> 10 non-whitespace chars)
      if (cleaned.replace(/\s/g, '').length > 10) {
        processedCells.push({ type: 'markdown', cell, cleanText: cleaned, codeIndex: -1 });
      }
    }
    // raw cells: skip
  }

  if (processedCells.length === 0) {
    return <div className="text-gray-500 text-center py-10">No displayable content found.</div>;
  }

  // ── Detect sections from code cell content ────────────────────────────────

  const SECTION_MAP: Array<{ pattern: RegExp; label: string }> = [
    { pattern: /^\s*import\s|^\s*from\s+\w+\s+import/m,           label: 'Setup & Imports' },
    { pattern: /def\s+\w+|class\s+\w+/m,                           label: 'Implementation' },
    { pattern: /random\.seed|seed\s*\(/m,                          label: 'Simulation Setup' },
    { pattern: /plt\.(figure|plot|hist|scatter|imshow|bar)|\.plot\(/m, label: 'Results & Visualization' },
    { pattern: /\.corr\(\)|corr_matrix|correlation/m,              label: 'Correlation Analysis' },
    { pattern: /bisect|implied_vol|market_price/m,                 label: 'Calibration' },
    { pattern: /print\s*\(.*price|print\s*\(.*payoff|print\s*\(.*greek/im, label: 'Validation' },
  ];

  // Build sections
  type Section = { title: string; cells: ProcessedCell[] };
  const sections: Section[] = [];
  let currentSectionTitle = '';
  let currentSection: ProcessedCell[] = [];
  let lastSectionTitle = '';

  const ORDERED_SECTIONS = [
    'Setup & Imports',
    'Implementation',
    'Simulation Setup',
    'Validation',
    'Results & Visualization',
    'Correlation Analysis',
    'Calibration',
  ];

  // Assign each code cell to a section based on content
  const cellSectionMap = new Map<ProcessedCell, string>();
  let sectionIdx = 0;

  for (const item of processedCells) {
    if (item.type === 'code') {
      const src = extractText(item.cell.source);
      let matched = false;
      for (const { pattern, label } of SECTION_MAP) {
        if (pattern.test(src)) {
          const rank = ORDERED_SECTIONS.indexOf(label);
          const currRank = ORDERED_SECTIONS.indexOf(cellSectionMap.get(item) || '');
          if (!cellSectionMap.has(item) || rank > currRank) {
            cellSectionMap.set(item, label);
          }
          matched = true;
        }
      }
      if (!matched) {
        // Assign to the section after the last used section
        const sections2Use = ORDERED_SECTIONS.slice(1);
        const fallback = sections2Use[Math.min(sectionIdx, sections2Use.length - 1)];
        cellSectionMap.set(item, fallback);
      }
    }
  }

  // Group cells by section with natural ordering
  const groupedSections: Section[] = [];
  let groupCurrent: ProcessedCell[] = [];
  let groupTitle = '';
  let codeSeenInGroup = false;

  for (const item of processedCells) {
    const assignedTitle = item.type === 'code'
      ? (cellSectionMap.get(item) || 'Analysis')
      : groupTitle; // markdown follows current code section

    if (item.type === 'code' && assignedTitle !== groupTitle) {
      // New section - flush current
      if (groupCurrent.length > 0) {
        groupedSections.push({ title: groupTitle, cells: groupCurrent });
      }
      groupTitle = assignedTitle;
      groupCurrent = [];
      codeSeenInGroup = false;
    }

    groupCurrent.push(item);
    if (item.type === 'code') codeSeenInGroup = true;
  }

  // Flush last group
  if (groupCurrent.length > 0) {
    groupedSections.push({ title: groupTitle, cells: groupCurrent });
  }

  // Count stats
  const totalCode = processedCells.filter(c => c.type === 'code').length;
  const totalMd = processedCells.filter(c => c.type === 'markdown').length;
  const totalOutputs = processedCells.reduce((acc, c) =>
    acc + (c.cell.outputs?.length ?? 0), 0);

  return (
    <div className="space-y-1">

      {/* Stats banner */}
      <div className="flex flex-wrap items-center gap-5 mb-8 px-1 py-3 rounded-xl bg-gray-800/30 border border-gray-700/40">
        <StatPill color="blue"   label={`${totalCode} code cells`} />
        <StatPill color="purple" label={`${totalMd} explanations`} />
        <StatPill color="green"  label={`${totalOutputs} outputs`} />
      </div>

      {/* Sections */}
      {groupedSections.map((section, si) => (
        <div key={si}>
          {section.title && <SectionDivider title={section.title} />}
          {section.cells.map((item, ci) =>
            item.type === 'code' ? (
              <CodeCell key={`code-${si}-${ci}`} cell={item.cell} cellNumber={item.codeIndex} />
            ) : (
              <MarkdownCell key={`md-${si}-${ci}`} text={item.cleanText!} />
            )
          )}
        </div>
      ))}
    </div>
  );
};

function StatPill({
  color,
  label,
}: {
  color: 'blue' | 'purple' | 'green';
  label: string;
}) {
  const dotColors = {
    blue:   'bg-blue-500/70',
    purple: 'bg-purple-500/70',
    green:  'bg-green-500/70',
  };
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400 px-3">
      <span className={`w-2.5 h-2.5 rounded-sm inline-block ${dotColors[color]}`}></span>
      {label}
    </div>
  );
}

export default ProfessionalNotebookParser;
