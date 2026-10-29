'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'malka_theme';

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  } catch { /* Keep the system default when storage is unavailable. */ }
  return 'system';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const preference = useRef<ThemePreference>('system');

  const applyTheme = useCallback((mode: ThemePreference) => {
    const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, []);

  const setTheme = useCallback((mode: ThemePreference) => {
    preference.current = mode;
    setThemeState(mode);
    try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* Theme remains active for this visit. */ }
    applyTheme(mode);
  }, [applyTheme]);

  useEffect(() => {
    const saved = readPreference();
    preference.current = saved;
    setThemeState(saved);
    applyTheme(saved);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = () => {
      if (preference.current === 'system') applyTheme('system');
    };
    media.addEventListener('change', syncSystemTheme);
    return () => media.removeEventListener('change', syncSystemTheme);
  }, [applyTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
