import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    if (!output) {
      setDisplayedOutput('');
      return;
    }

    setDisplayedOutput('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < output.length) {
        setDisplayedOutput(output.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [output]);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (timeoutId) clearTimeout(timeoutId);

        if (window.scrollY > 50) {
          setShowScrollIndicator(false);
        } else {
          timeoutId = setTimeout(() => {
            setShowScrollIndicator(window.scrollY === 0);
          }, 300);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
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
            <Col md={6} className="d-flex flex-column justify-content-center text-column order-2 order-md-1">
              <p className="small-text">Hey, I'm</p>
              <h1 className="display-1 fw-bold">Jack</h1>
              <p className="medium-text">Computer Science student from Milan</p>
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
                    <span>{displayedOutput}</span>
                    <span className="cursor">|</span>
                  </div>
                )}
              </div>
            </Col>

            <Col md={6} className="image-column order-1 order-md-2">
              <div className="image-wrapper">
                <img
                  src="/prova.jpeg"
                  alt="Profile"
                  className="about-image"
                />
              </div>

              <div className="image-controls d-none d-md-block">
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

            <Col xs={12} className="image-controls-mobile order-3 d-md-none">
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
            </Col>
          </Row>
        </Container>
      </div>

      {showScrollIndicator && (
        <div className="scroll-indicator">
          <div className="scroll-text">Scroll down</div>
          <div className="scroll-icon">
            <div className="scroll-dot"></div>
          </div>
        </div>
      )}
    </section>
  );
}