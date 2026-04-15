import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'spsd:recent-searches';
const MAX_ITEMS = 5;

export interface UseRecentSearchesReturn {
  recent: string[];
  add: (query: string) => void;
  clear: () => void;
}

export function useRecentSearches(): UseRecentSearchesReturn {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const valid = parsed.filter((item): item is string => typeof item === 'string').slice(0, MAX_ITEMS);
      setRecent(valid);
    } catch {
      // Ignore corrupt storage
    }
  }, []);

  const add = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecent((prev) => {
      const next = [trimmed, ...prev.filter((q) => q !== trimmed)].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Quota or privacy mode — keep in-memory copy anyway
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setRecent([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { recent, add, clear };
}
