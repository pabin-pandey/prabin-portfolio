#!/usr/bin/env node

/**
 * Convert Jupyter notebooks to HTML for display in the portfolio
 * Usage: node scripts/convert-notebooks.js
 */

const fs = require('fs');
const path = require('path');

// Create output directory
const outputDir = path.join(__dirname, '../public/notebook-html');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Notebook mappings
const notebooks = [
  { slug: 'black-scholes-options-pricing', file: 'project-1.ipynb', title: 'Black-Scholes Options Pricing' },
  { slug: 'portfolio-analytics-correlation', file: 'project-2.ipynb', title: 'Portfolio Analytics & Correlation' },
  { slug: 'stock-classification-risk', file: 'project-3.ipynb', title: 'Stock Classification & Risk Scoring' },
  { slug: 'feature-engineering-trading', file: 'project-4.ipynb', title: 'Advanced Feature Engineering' },
  { slug: 'lstm-deep-learning', file: 'project-5.ipynb', title: 'LSTM Deep Learning' },
  { slug: 'xgboost-ensemble-shap', file: 'project-6.ipynb', title: 'XGBoost Ensemble with SHAP' },
];

// Escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Convert cell source array to string
function cellSourceToString(source) {
  if (Array.isArray(source)) {
    return source.join('');
  }
  return source || '';
}

// Render code cell
function renderCodeCell(cell, index) {
  const source = cellSourceToString(cell.source);
  return `
    <div class="cell code-cell" id="cell-${index}">
      <div class="cell-header">
        <span class="cell-type">Code</span>
      </div>
      <pre class="code-content"><code>${escapeHtml(source)}</code></pre>
    </div>
  `;
}

// Render output cell
function renderOutputs(outputs, index) {
  if (!outputs || outputs.length === 0) return '';

  let html = '<div class="cell outputs-container">';

  outputs.forEach((output, idx) => {
    if (output.output_type === 'stream') {
      const text = cellSourceToString(output.text);
      html += `
        <div class="output stream">
          <pre><code>${escapeHtml(text)}</code></pre>
        </div>
      `;
    } else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
      if (output.data && output.data['text/plain']) {
        const text = cellSourceToString(output.data['text/plain']);
        html += `
          <div class="output execute-result">
            <pre><code>${escapeHtml(text)}</code></pre>
          </div>
        `;
      }
      if (output.data && output.data['text/html']) {
        const htmlContent = cellSourceToString(output.data['text/html']);
        html += `
          <div class="output html-output">
            ${htmlContent}
          </div>
        `;
      }
    } else if (output.output_type === 'error') {
      const traceback = cellSourceToString(output.traceback);
      html += `
        <div class="output error">
          <pre><code>${escapeHtml(traceback)}</code></pre>
        </div>
      `;
    }
  });

  html += '</div>';
  return html;
}

// Convert notebook to HTML
function convertNotebook(notebookPath, slug) {
  try {
    const content = fs.readFileSync(notebookPath, 'utf-8');
    const notebook = JSON.parse(content);

    let cellsHtml = '';
    notebook.cells.forEach((cell, idx) => {
      if (cell.cell_type === 'code') {
        cellsHtml += renderCodeCell(cell, idx);
        cellsHtml += renderOutputs(cell.outputs, idx);
      } else if (cell.cell_type === 'markdown') {
        const source = cellSourceToString(cell.source);
        cellsHtml += `
          <div class="cell markdown-cell" id="cell-${idx}">
            <div class="markdown-content">
              ${escapeHtml(source)}
            </div>
          </div>
        `;
      }
    });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notebook Viewer</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    .notebook-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: white;
    }
    .cell {
      margin: 20px 0;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
    .cell-header {
      background: #f8f9fa;
      padding: 8px 12px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 12px;
      font-weight: 600;
      color: #666;
    }
    .cell-type {
      display: inline-block;
      padding: 2px 8px;
      background: #e8f0ff;
      color: #0066cc;
      border-radius: 4px;
      font-size: 11px;
    }
    .code-cell {
      background: #f6f8fa;
    }
    .code-content {
      padding: 12px;
      overflow-x: auto;
      background: #f6f8fa;
    }
    .code-content code {
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.5;
    }
    .outputs-container {
      border-top: 1px solid #e0e0e0;
    }
    .output {
      padding: 12px;
      border-top: 1px solid #e0e0e0;
    }
    .output:first-child {
      border-top: none;
    }
    .output.stream pre,
    .output.execute-result pre,
    .output.error pre {
      background: #f6f8fa;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 12px;
    }
    .output.error {
      background: #fff5f5;
      color: #c5192d;
    }
    .output.error pre {
      background: #fff5f5;
      color: #c5192d;
    }
    .output.html-output {
      padding: 12px;
    }
    .output.html-output table {
      border-collapse: collapse;
      width: 100%;
    }
    .output.html-output table, .output.html-output th, .output.html-output td {
      border: 1px solid #ddd;
    }
    .output.html-output th, .output.html-output td {
      padding: 8px 12px;
      text-align: left;
    }
    .output.html-output th {
      background: #f5f5f5;
      font-weight: 600;
    }
    .markdown-cell {
      background: white;
    }
    .markdown-content {
      padding: 12px;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 14px;
      line-height: 1.6;
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

// Convert all notebooks
console.log('Converting Jupyter notebooks to HTML...\n');

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
    console.log(`✓ Converted: ${title}`);
  }
});

console.log(`\n✓ All notebooks converted to /public/notebook-html/`);
console.log('Use <iframe src="/notebook-html/{slug}/index.html" /> to display');
