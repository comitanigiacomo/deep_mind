import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';
import Intro from '../components/Intro';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { isDarkMode } = useTheme();
  const [showIntro, setShowIntro] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');

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
        setOutput('Almost there. You’ve got one right, keep going!');
      } else {
        setOutput('Those aren’t my colors. Try again with a different guess.');
      }
    }
  };

  return (
    <section id="about">
      <div style={{ minHeight: '100vh' }} className="d-flex align-items-center">
        {showIntro ? (
          <Intro onEnd={() => setShowIntro(false)} />
        ) : (
          <Container className="about-container py-5 fade-in">
            <Row>
              <Col md={6} className="d-flex flex-column justify-content-center">
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

              <Col md={6} className="image-column d-flex flex-column align-items-center justify-content-start">
                <div className="image-wrapper">
                  <img src={isDarkMode ? "/finaleVero.png" : "/chiaro.png"}  alt="Profile" className="about-image img-fluid" />
                </div>

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
                  variant="outline-light"
                  onClick={() => (window.location.href = '#projects')}
                  className="minimal-btn mt-3 btn btn-outline-light"
                >
                  See My Projects
                </button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </section>
  );
}
