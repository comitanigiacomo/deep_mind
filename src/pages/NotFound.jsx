import { Link } from 'react-router-dom';
import LanguageToggle from '../components/ui/LanguageToggle';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { SITE_NAME } from '../lib/site';
import './NotFound.css';

export default function NotFound() {
  const { lang } = useLang();
  const tr = translations[lang].notFound;

  usePageMetadata({
    title: `404 | ${SITE_NAME}`,
    description: tr.text,
    path: '/404',
    noindex: true,
  });

  return (
    <main id="page-content" tabIndex={-1} className="notfound-container">
      <div className="notfound-controls">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">{tr.subtitle}</h2>
        <p className="notfound-text">{tr.text}</p>
        <Link to="/" className="notfound-button">
          {tr.action}
        </Link>
      </div>
    </main>
  );
}
