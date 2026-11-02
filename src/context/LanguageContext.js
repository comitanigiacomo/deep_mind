import { createContext, useContext } from 'react';

export const LanguageContext = createContext(null);

export function useLang() {
  const context = useContext(LanguageContext);

  if (context === null) {
    throw new Error('useLang must be used within a LanguageProvider');
  }

  return context;
}
