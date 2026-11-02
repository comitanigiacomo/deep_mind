import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LanguageToggle from './ui/LanguageToggle';
import ThemeToggle from './ui/ThemeToggle';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { scrollToSection } from '../lib/scroll';
import './Mynav.css';

const NAV_SECTIONS = [
  'about',
  'interests',
  'skills',
  'education',
  'projects',
  'homelab',
  'research',
  'blog',
  'contacts',
];

const NAVIGATION_ID = 'primary-navigation';

export default function Mynav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { lang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const nav = translations[lang].nav;

  const closeNavigation = useCallback(() => setIsExpanded(false), []);
  const toggleNavigation = useCallback(() => setIsExpanded((previous) => !previous), []);

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNavigation();
      }
    };

    const handlePointerDown = (event) => {
      if (event.target instanceof Element && !event.target.closest('.app-navbar')) {
        closeNavigation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isExpanded, closeNavigation]);

  const handleSectionNavigation = useCallback(
    (event, sectionId) => {
      event.preventDefault();
      closeNavigation();

      if (location.pathname === '/' && scrollToSection(sectionId)) {
        return;
      }

      navigate(`/#${sectionId}`);
    },
    [closeNavigation, location.pathname, navigate],
  );

  return (
    <nav
      className={`app-navbar ${isExpanded ? 'is-open' : ''}`}
      aria-label={lang === 'it' ? 'Navigazione principale' : 'Main navigation'}
    >
      <div className="app-navbar__inner">
        <LanguageToggle />

        <div id={NAVIGATION_ID} className="app-navbar__menu">
          <ul className="app-navbar__links">
            {NAV_SECTIONS.map((sectionId) => (
              <li key={sectionId}>
                <a
                  href={`/#${sectionId}`}
                  className="app-navbar__link"
                  data-section={sectionId}
                  onClick={(event) => handleSectionNavigation(event, sectionId)}
                >
                  <span>{nav[sectionId]}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="app-navbar__actions">
          <ThemeToggle />
          <button
            type="button"
            className="app-navbar__toggler"
            aria-controls={NAVIGATION_ID}
            aria-expanded={isExpanded}
            aria-label={lang === 'it' ? 'Apri il menu di navigazione' : 'Toggle navigation menu'}
            onClick={toggleNavigation}
          >
            <span className="app-navbar__toggler-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  );
}
