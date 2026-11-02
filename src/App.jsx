import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Mynav from './components/Mynav';
import CustomCursor from './components/CustomCursor';
import VerticalSectionIndicator from './components/VerticalSectionIndicator';
import ChatSection from './components/ChatSection';
import About from './pages/About';
import Interests from './pages/Interests';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Homelab from './pages/Homelab';
import Research from './pages/Research';
import Blog from './pages/Blog';
import Contacts from './pages/Contacts';
import BlogPostPage from './pages/BlogPostPage';
import NotFound from './pages/NotFound';
import { useLang } from './context/LanguageContext';
import { translations } from './i18n/translations';
import { scrollToSection } from './lib/scroll';
import './App.css';

export default function App() {
  const location = useLocation();
  const { lang, isTransitioning } = useLang();
  const isHomeRoute = location.pathname === '/';
  const skipLinkTarget = isHomeRoute ? '#main-content' : '#page-content';

  useEffect(() => {
    if (!isHomeRoute || !location.hash) {
      return;
    }

    scrollToSection(location.hash.replace('#', ''));
  }, [isHomeRoute, location.hash, location.key]);

  return (
    <>
      <a className="skip-link" href={skipLinkTarget}>
        {translations[lang].skipToContent}
      </a>

      {/*
       * The portfolio stays mounted behind the article/404 overlay so returning
       * to it keeps the scroll position. While an overlay route is active the
       * shell is `inert`: it is removed from the accessibility tree and its
       * controls can no longer receive focus behind the overlay.
       */}
      <div className="portfolio-shell" inert={isHomeRoute ? undefined : ''}>
        <CustomCursor />
        <Mynav />
        <VerticalSectionIndicator />

        <main
          id="main-content"
          tabIndex={-1}
          className={`background-wrapper ${isTransitioning ? 'lang-transitioning' : 'lang-ready'}`}
        >
          <About />

          <div className="container mt-3">
            <section id="interests">
              <Interests />
            </section>
            <section id="skills">
              <Skills />
            </section>
            <section id="education">
              <Education />
            </section>
            <section id="projects">
              <Projects />
            </section>
          </div>

          <Homelab />
          <Research />

          <div className="container">
            <section id="blog">
              <Blog />
            </section>
            <section id="contacts">
              <Contacts />
            </section>
          </div>

          <ChatSection />
        </main>
      </div>

      <Routes>
        <Route path="/" element={null} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
