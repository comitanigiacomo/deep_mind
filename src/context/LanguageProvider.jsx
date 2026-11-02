import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LanguageContext } from './LanguageContext';

const LANGUAGE_STORAGE_KEY = 'lang';
const SUPPORTED_LANGUAGES = ['en', 'it'];
const FADE_OUT_DURATION_MS = 180;
const FADE_IN_DELAY_MS = 60;

function readStoredLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLanguage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const langRef = useRef(lang);
  const isTransitioningRef = useRef(false);
  const transitionTimers = useRef([]);

  useEffect(() => {
    langRef.current = lang;
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(
    () => () => {
      transitionTimers.current.forEach((timerId) => window.clearTimeout(timerId));
    },
    [],
  );

  const toggleLang = useCallback(() => {
    if (isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    setIsTransitioning(true);

    const swapTimer = window.setTimeout(() => {
      const nextLanguage = langRef.current === 'en' ? 'it' : 'en';
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      setLang(nextLanguage);

      const releaseTimer = window.setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
      }, FADE_IN_DELAY_MS);

      transitionTimers.current.push(releaseTimer);
    }, FADE_OUT_DURATION_MS);

    transitionTimers.current.push(swapTimer);
  }, []);

  const value = useMemo(
    () => ({ lang, isTransitioning, toggleLang }),
    [lang, isTransitioning, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
