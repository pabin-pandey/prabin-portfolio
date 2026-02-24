// NotebookViewer — Display converted Jupyter notebooks as HTML
import { useState } from 'react';

interface NotebookViewerProps {
  slug: string;
  title: string;
  dark?: boolean;
}

export default function NotebookViewer({ slug, title, dark = false }: NotebookViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const notebookUrl = `/notebook-html/${slug}/index.html`;

  return (
    <div className={`rounded-lg border overflow-hidden ${dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className={`p-4 border-b ${dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="text-sm font-semibold">Code & Outputs</h3>
        <p className={`text-xs mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          All code cells and outputs from {title}
        </p>
      </div>

      <div className="relative h-96 sm:h-full sm:min-h-[600px]">
        {loading && (
          <div className={`absolute inset-0 flex items-center justify-center ${dark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="text-center">
              <div className={`inline-block h-8 w-8 border-4 border-transparent border-t-blue-500 rounded-full animate-spin ${dark ? 'text-gray-600' : 'text-gray-300'}`}></div>
              <p className={`mt-2 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Loading notebook...</p>
            </div>
          </div>
        )}

        {error && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <svg className={`h-12 w-12 ${dark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9 9 0 1017 16.92" />
            </svg>
            <h4 className={`mt-3 font-semibold ${dark ? 'text-gray-300' : 'text-gray-900'}`}>
              Notebook Failed to Load
            </h4>
            <p className={`mt-1 text-sm text-center ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              The notebook couldn't be displayed. Try refreshing the page or downloading the original .ipynb file.
            </p>
            <a
              href={`/notebooks/${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-')}.ipynb`}
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Download Notebook
            </a>
          </div>
        )}

        <iframe
          src={notebookUrl}
          className={`w-full h-full border-0 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          title={`${title} - Code and Outputs`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>

      <div className={`p-4 border-t text-xs ${dark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
        <p>💡 Showing 100% of code cells and output cells as originally generated in Jupyter.</p>
      </div>
    </div>
  );
}
