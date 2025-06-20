import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';
import Intro from '../components/Intro';
import { useTheme } from '../context/ThemeContext';

export default function About({ showIntro, setShowIntro }) {
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const guess = inputValue.trim().toLowerCase();

      if (!guess) return;

      const hasBlack = guess.includes('black') || guess.includes('nero');
      const hasBlue = guess.includes('blue') || guess.includes('blu');

      if (hasBlack && hasBlue) {
        setOutput('Correct. My favorite colors are black and blue.');
      } else if (hasBlack || hasBlue) {
        setOutput('Almost there. You\'ve got one right, keep going!');
      } else {
        setOutput('Those aren\'t my colors. Try again with a different guess.');
      }
    }
  };

  if (showIntro) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        backgroundColor: isDarkMode ? '#000000' : '#f8f9fa'
      }}>
        <Intro onEnd={() => setShowIntro(false)} />
      </div>
    );
  }

  return (
    <section id="about" style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#000000' : '#f8f9fa'
    }}>
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container className="about-container py-5 fade-in">
          <Row>
            <Col md={6} className="d-flex flex-column justify-content-center text-column">
              <p className="small-text">Hey, I'm</p>
              <h1 className="display-1 fw-bold">Jack</h1>
              <p className="medium-text">an IT student from Milan</p>
              <div className="terminal">
                <span className="terminal-prompt">&gt; console.log("Can you guess my favorite colors?")</span>
                <div className="terminal-line">
                  <span>&gt; </span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value); setOutput(''); }}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoFocus
                  />
                </div>
                {output && (
                  <div className="terminal-output">
                    <span>{output}</span>
                  </div>
                )}
              </div>
            </Col>

            <Col md={6} className="image-column">
              <div className="image-wrapper">
                <img
                  src="/face2.png"
                  alt="Profile"
                  className="about-image"
                />
              </div>

              <div className="image-controls">
                <div className="contact-icons">
                  <a href="https://github.com/comitanigiacomo" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="icon" />
                  </a>
                  <a href="https://www.linkedin.com/in/giacomo-comitani-249384326/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="icon" />
                  </a>
                  <a href="https://www.instagram.com/giacomo.comitani" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="icon" />
                  </a>
                </div>
                <button
                  onClick={() => (window.location.href = '#projects')}
                  className="minimal-btn"
                >
                  See My Projects
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className={`scroll-indicator ${isScrolling ? 'fade-out' : ''}`}>
        <div className="scroll-text">Scroll down</div>
        <div className="scroll-icon">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
}