import React, { createContext, useState, useContext, useCallback } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'en';
    }
    return 'en';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleLang = useCallback(() => {
    setIsTransitioning(true);

    // After fade-out completes, swap the language
    setTimeout(() => {
      setLang(prev => {
        const next = prev === 'en' ? 'it' : 'en';
        localStorage.setItem('lang', next);
        return next;
      });
      // Brief pause at opacity-0, then fade back in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 60);
    }, 180);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return context;
};
