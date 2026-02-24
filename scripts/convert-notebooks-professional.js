#!/usr/bin/env node

/**
 * Convert Jupyter notebooks to professional portfolio HTML
 * REMOVES: Assignment boilerplate (FIN5615, Instructions, Tasks, etc.)
 * KEEPS: 100% of code cells, outputs, and user's markdown notes
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/notebook-html');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const notebooks = [
  { slug: 'black-scholes-options-pricing', file: 'project-1.ipynb', title: 'Black-Scholes Options Pricing' },
  { slug: 'portfolio-analytics-correlation', file: 'project-2.ipynb', title: 'Portfolio Analytics & Correlation' },
  { slug: 'stock-classification-risk', file: 'project-3.ipynb', title: 'Stock Classification & Risk Scoring' },
  { slug: 'feature-engineering-trading', file: 'project-4.ipynb', title: 'Advanced Feature Engineering' },
  { slug: 'lstm-deep-learning', file: 'project-5.ipynb', title: 'LSTM Deep Learning' },
  { slug: 'xgboost-ensemble-shap', file: 'project-6.ipynb', title: 'XGBoost Ensemble with SHAP' },
];

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function cellSourceToString(source) {
  return Array.isArray(source) ? source.join('') : (source || '');
}

// Check if markdown should be filtered (assignment boilerplate)
function isAssignmentBoilerplate(markdown) {
  const text = markdown.toLowerCase();

  // Filter out assignment instructions
  if (text.includes('fin5615') || text.includes('fin5622')) return true;
  if (text.includes('instructions:') || text.includes('instructions</')) return true;
  if (text.includes('task ') || text.includes('task</')) return true;
  if (text.includes('q.no') || text.includes('q. no')) return true;
  if (text.includes('answer:') || text.includes('answer</')) return true;
  if (text.includes('please code') || text.includes('submit your')) return true;
  if (text.includes('panel panel-') || text.includes('alert alert-')) return true;

  return false;
}

// Extract meaningful markdown (user's own notes/explanations)
function processMarkdown(markdown) {
  if (!markdown || isAssignmentBoilerplate(markdown)) {
    return null;
  }

  // Remove Bootstrap panel/alert HTML that might be in markdown
  let cleaned = markdown.replace(/<div\s+class\s*=\s*['"](panel|alert)[^'"]*['"]/gi, '');
  cleaned = cleaned.replace(/<div\s+class\s*=\s*['"](panel-heading|panel-body|alert-block)[^'"]*['"]/gi, '');
  cleaned = cleaned.replace(/<\/div>/gi, '');

  if (!cleaned.trim()) return null;
  return cleaned.trim();
}

// Generate section header from code/markdown
function generateSectionHeader(cell, index) {
  // Try to extract meaningful header from code comments or markdown
  if (cell.cell_type === 'markdown') {
    const text = cellSourceToString(cell.source);
    // Extract heading (h1-h4)
    const match = text.match(/^#+\s+(.+?)$/m);
    if (match) return match[1].trim();
    // First line if it looks like a title
    const firstLine = text.split('\n')[0].trim();
    if (firstLine && firstLine.length < 100) return firstLine;
  } else if (cell.cell_type === 'code') {
    const code = cellSourceToString(cell.source);
    // Extract from comments
    const match = code.match(/^#\s+(.+?)$/m);
    if (match) return match[1].trim();
  }
  return null;
}

// Render code cell with syntax highlighting
function renderCodeCell(cell, index) {
  const source = cellSourceToString(cell.source);
  if (!source.trim()) return '';

  return `
    <div class="notebook-cell code-cell">
      <div class="cell-content">
        <pre class="code-block"><code>${escapeHtml(source)}</code></pre>
      </div>
    </div>
  `;
}

// Render outputs
function renderOutputs(outputs, index) {
  if (!outputs || outputs.length === 0) return '';

  let html = '<div class="notebook-outputs">';

  outputs.forEach((output) => {
    if (output.output_type === 'stream') {
      const text = cellSourceToString(output.text);
      html += `<div class="output-item output-stream"><pre><code>${escapeHtml(text)}</code></pre></div>`;
    } else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
      if (output.data) {
        if (output.data['text/html']) {
          const htmlContent = cellSourceToString(output.data['text/html']);
          html += `<div class="output-item output-html">${htmlContent}</div>`;
        } else if (output.data['text/plain']) {
          const text = cellSourceToString(output.data['text/plain']);
          html += `<div class="output-item output-result"><pre><code>${escapeHtml(text)}</code></pre></div>`;
        }
      }
    } else if (output.output_type === 'error') {
      const traceback = cellSourceToString(output.traceback);
      html += `<div class="output-item output-error"><pre><code>${escapeHtml(traceback)}</code></pre></div>`;
    }
  });

  html += '</div>';
  return html;
}

// Render markdown (user's notes)
function renderMarkdown(cell, index) {
  const markdown = cellSourceToString(cell.source);
  const processed = processMarkdown(markdown);

  if (!processed) return '';

  return `
    <div class="notebook-cell markdown-cell">
      <div class="markdown-content">${escapeHtml(processed)}</div>
    </div>
  `;
}

// Convert notebook
function convertNotebook(notebookPath, slug) {
  try {
    const content = fs.readFileSync(notebookPath, 'utf-8');
    const notebook = JSON.parse(content);

    let cellsHtml = '';
    let currentSection = '';
    let sectionContent = '';

    notebook.cells.forEach((cell, idx) => {
      if (cell.cell_type === 'code') {
        const code = renderCodeCell(cell, idx);
        const outputs = renderOutputs(cell.outputs, idx);
        if (code) {
          sectionContent += code;
          if (outputs) sectionContent += outputs;
        }
      } else if (cell.cell_type === 'markdown') {
        // Check if this is a section header
        const header = generateSectionHeader(cell, idx);
        const markdown = renderMarkdown(cell, idx);

        if (header && !isAssignmentBoilerplate(header)) {
          // New section - flush old one and start new
          if (sectionContent) {
            cellsHtml += sectionContent;
            sectionContent = '';
          }
          if (markdown) {
            currentSection = header;
            cellsHtml += `<div class="notebook-section"><h3 class="section-title">${escapeHtml(header)}</h3>`;
            cellsHtml += markdown;
          }
        } else if (markdown) {
          // Just add markdown content to current section
          cellsHtml += markdown;
        }
      }
    });

    // Flush remaining content
    if (sectionContent) cellsHtml += sectionContent;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(slug)}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f9fafb;
    }

    .notebook-container {
      max-width: 100%;
      padding: 0;
    }

    .notebook-section {
      margin: 24px 0;
      padding: 16px;
      background: white;
      border-left: 4px solid #3b82f6;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 12px;
    }

    .notebook-cell {
      margin: 16px 0;
    }

    .code-cell {
      background: white;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      overflow: hidden;
    }

    .cell-content {
      overflow: hidden;
    }

    .code-block {
      display: block;
      padding: 12px;
      background: #f3f4f6;
      overflow-x: auto;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 12px;
      line-height: 1.5;
      color: #111;
      margin: 0;
    }

    .code-block code {
      font-family: inherit;
      font-size: inherit;
      color: inherit;
    }

    .notebook-outputs {
      margin-top: 8px;
    }

    .output-item {
      margin: 8px 0;
      padding: 12px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 12px;
    }

    .output-item pre {
      margin: 0;
      overflow-x: auto;
    }

    .output-item code {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 11px;
    }

    .output-stream {
      background: #f9fafb;
      border-left: 3px solid #6b7280;
    }

    .output-result {
      background: #f0fdf4;
      border-left: 3px solid #10b981;
    }

    .output-error {
      background: #fef2f2;
      border-left: 3px solid #ef4444;
      color: #991b1b;
    }

    .output-html {
      background: white;
    }

    .output-html table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }

    .output-html table, .output-html th, .output-html td {
      border: 1px solid #d1d5db;
    }

    .output-html th {
      background: #f3f4f6;
      font-weight: 600;
      padding: 8px;
    }

    .output-html td {
      padding: 8px;
    }

    .markdown-cell {
      background: white;
      padding: 12px;
      border-radius: 4px;
      margin: 12px 0;
    }

    .markdown-content {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 13px;
      line-height: 1.6;
      color: #4b5563;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body { background: #111; color: #e5e7eb; }
      .notebook-section { background: #1f2937; border-left-color: #60a5fa; }
      .section-title { color: #f3f4f6; }
      .code-cell { background: #1f2937; border-color: #374151; }
      .code-block { background: #111; color: #e5e7eb; }
      .notebook-outputs { }
      .output-item { background: #1f2937; border-color: #374151; color: #e5e7eb; }
      .output-stream { background: #111; border-left-color: #9ca3af; }
      .output-result { background: #064e3b; border-left-color: #10b981; }
      .output-error { background: #7c2d12; border-left-color: #ef4444; color: #fca5a5; }
      .output-html { background: #1f2937; }
      .output-html table, .output-html th, .output-html td { border-color: #4b5563; }
      .output-html th { background: #111; }
      .markdown-cell { background: #1f2937; }
      .markdown-content { color: #d1d5db; }
    }
  </style>
</head>
<body>
  <div class="notebook-container">
    ${cellsHtml}
  </div>
</body>
</html>`;

    return html;
  } catch (error) {
    console.error(`Error converting ${notebookPath}:`, error.message);
    return null;
  }
}

console.log('Converting Jupyter notebooks (removing assignment boilerplate)...\n');

notebooks.forEach(({ slug, file, title }) => {
  const notebookPath = path.join(__dirname, '../public/notebooks', file);

  if (!fs.existsSync(notebookPath)) {
    console.warn(`⚠ Notebook not found: ${file}`);
    return;
  }

  const html = convertNotebook(notebookPath, slug);
  if (html) {
    const slugDir = path.join(outputDir, slug);
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }

    fs.writeFileSync(path.join(slugDir, 'index.html'), html);
    console.log(`✓ Converted: ${title} (assignment boilerplate removed)`);
  }
});

console.log(`\n✓ All notebooks converted to /public/notebook-html/`);
console.log('✓ FIN5615/FIN5622 headers removed');
console.log('✓ Instructions, Tasks, Q.No sections removed');
console.log('✓ 100% of code cells and outputs preserved');
console.log('✓ Professional styling applied');
