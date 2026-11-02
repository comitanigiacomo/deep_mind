import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const THEME_STORAGE_KEY = 'theme';
const DARK_THEME_COLOR = '#000000';
const LIGHT_THEME_COLOR = '#f5f5f5';

function readInitialTheme() {
  if (typeof window === 'undefined') {
    return true;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(readInitialTheme);

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    const root = document.documentElement;

    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    themeColorMeta?.setAttribute('content', isDarkMode ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);

    // `background-attachment: fixed` layers are not repainted by Chromium when
    // only a CSS variable changes; forcing a layout pass keeps the hero in sync.
    const wrapper = document.querySelector('.background-wrapper');
    if (wrapper) {
      wrapper.style.display = 'none';
      void wrapper.offsetHeight;
      wrapper.style.display = 'block';
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((previousIsDark) => {
      const nextIsDark = !previousIsDark;
      window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
      return nextIsDark;
    });
  }, []);

  const value = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
