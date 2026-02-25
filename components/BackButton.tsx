'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  /**
   * Fallback URL used only when there is NO browser history
   * (user landed directly on the detail page via a shared link).
   * e.g. "/" or "/projects"
   */
  fallback?: string;
  /** Extra Tailwind / CSS classes */
  className?: string;
  /** Button content — pass icon + text as children */
  children?: React.ReactNode;
}

/**
 * Smart "Back" button for detail pages.
 *
 * Priority order:
 *  1. sessionStorage has a "returnTo" entry  → window.history.back()
 *     (Portfolio.tsx mount effect will match the URL and restore scroll)
 *  2. browser history depth > 2              → window.history.back()
 *  3. no history (direct landing)            → router.push(fallback)
 */
export default function BackButton({
  fallback = '/',
  className = '',
  children = '← Back',
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    try {
      const raw = sessionStorage.getItem('returnTo');
      if (raw) {
        // Came from internal navigation — pop the browser history stack.
        // Portfolio.tsx mount effect will detect the URL and restore scroll.
        window.history.back();
        return;
      }
    } catch {
      // ignore sessionStorage errors (private browsing, etc.)
    }

    // No saved state: use native browser back if history is deep enough
    if (typeof window !== 'undefined' && window.history.length > 2) {
      window.history.back();
    } else {
      // Direct landing (no history) — hard-navigate to the logical parent
      router.push(fallback);
    }
  }, [router, fallback]);

  return (
    <button onClick={handleBack} className={className}>
      {children}
    </button>
  );
}
