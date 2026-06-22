import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Mynav.css';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

function Mynav() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [showToggle, setShowToggle] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const nav = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowToggle(false);
      } else {
        setShowToggle(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Navbar fixed="top" expand="lg">
      <Container fluid className="p-0">

        {/* Language toggle — always left, desktop & mobile */}
        <div className="navbar-lang-slot">
          <button
            onClick={toggleLang}
            className="language-toggle-btn"
            title={lang === 'en' ? 'Passa all\'italiano' : 'Switch to English'}
            aria-label="Toggle language"
          >
            <span className={`lang-opt ${lang === 'en' ? 'lang-active' : 'lang-inactive'}`}>EN</span>
            <span className="lang-sep">|</span>
            <span className={`lang-opt ${lang === 'it' ? 'lang-active' : 'lang-inactive'}`}>IT</span>
          </button>
        </div>

        {/* Mobile toggles (theme) */}
        <div className={`navbar-toggles mobile-toggles d-lg-none ${showToggle ? 'visible' : 'hidden'}`}>
          <Nav.Link
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </Nav.Link>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#about"><span>{nav.about}</span></Nav.Link>
            <Nav.Link href="/#interests"><span>{nav.interests}</span></Nav.Link>
            <Nav.Link href="/#skills"><span>{nav.skills}</span></Nav.Link>
            <Nav.Link href="/#education"><span>{nav.education}</span></Nav.Link>
            <Nav.Link href="/#projects"><span>{nav.projects}</span></Nav.Link>
            <Nav.Link href="/#homelab"><span>{nav.homelab}</span></Nav.Link>
            <Nav.Link href="/#research"><span>{nav.research}</span></Nav.Link>
            <Nav.Link href="/#blog"><span>{nav.blog}</span></Nav.Link>
            <Nav.Link href="/#contacts"><span>{nav.contacts}</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Nav className="ms-auto d-none d-lg-flex align-items-center gap-2">
          <Nav.Link
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
}

export default Mynav;