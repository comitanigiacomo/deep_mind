import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Mynav.css';
import { useTheme } from '../context/ThemeContext';

function Mynav() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showToggle, setShowToggle] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        <Nav.Link
          onClick={toggleTheme}
          className={`theme-toggle-btn mobile-toggle d-lg-none ${showToggle ? 'visible' : 'hidden'}`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </Nav.Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#about"><span>About</span></Nav.Link>
            <Nav.Link href="/#interests"><span>Interests</span></Nav.Link>
            <Nav.Link href="/#skills"><span>Skills</span></Nav.Link>
            <Nav.Link href="/#education"><span>Education</span></Nav.Link>
            <Nav.Link href="/#projects"><span>Projects</span></Nav.Link>
            <Nav.Link href="/#homelab"><span>Homelab</span></Nav.Link>
            <Nav.Link href="/#research"><span>Research</span></Nav.Link>
            <Nav.Link href="/#blog"><span>Blog</span></Nav.Link>
            <Nav.Link href="/#contacts"><span>Contacts</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="ms-auto d-none d-lg-block">
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