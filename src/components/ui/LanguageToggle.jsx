import { useLang } from '../../context/LanguageContext';
import './Controls.css';

/**
 * Language switch. The accessible name is built from the visible `EN | IT`
 * labels plus a hidden action hint, so screen-reader output and visible text
 * stay consistent (WCAG 2.5.3 "Label in Name").
 */
export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();
  const actionLabel = lang === 'en' ? "Passa all'italiano" : 'Switch to English';

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="language-toggle-btn"
      title={actionLabel}
    >
      <span className="sr-only">{actionLabel}: </span>
      <span lang="en" className={`lang-opt ${lang === 'en' ? 'lang-active' : 'lang-inactive'}`}>
        EN
      </span>
      <span className="lang-sep" aria-hidden="true">|</span>
      <span lang="it" className={`lang-opt ${lang === 'it' ? 'lang-active' : 'lang-inactive'}`}>
        IT
      </span>
    </button>
  );
}
