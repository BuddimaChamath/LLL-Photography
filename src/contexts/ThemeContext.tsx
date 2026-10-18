import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './theme';

// The saved theme is applied to <html> by an inline script in index.html before first
// paint. React starts in light mode (matching the prerendered HTML) and reads the real
// value after hydration, so nothing flashes and nothing mismatches.
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    setSynced(true);
  }, []);

  useEffect(() => {
    if (!synced) return;
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, [isDarkMode, synced]);

  const toggleTheme = useCallback(() => setIsDarkMode((d) => !d), []);
  const value = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
