
// About.jsx
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';
import Intro from '../components/Intro';

export default function About() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <section id="about">
      <div
        id="about"
        style={{ minHeight: '100vh' }}
        className="d-flex align-items-center"
      >
        {showIntro ? (
          <Intro onEnd={() => setShowIntro(false)} />
        ) : (
          <Container className="about-container py-5 fade-in">
            <Row>
              <Col
                md={6}
                className="d-flex flex-column justify-content-center"
              >
                <p className="small-text">Hey, I'm</p>
                <h1 className="display-1 fw-bold">Jack</h1>
                <p className="medium-text">an IT student from Milan</p>

                <div className="code-snippet">
                  <p>console.log("Can you guess what my favorite colors are?")</p>
                </div>
              </Col>

              <Col
                md={6}
                className="image-column d-flex flex-column align-items-center justify-content-start"
              >
                <div className="image-wrapper">
                  <img
                    src="/finaleVero.png"
                    alt="Profile"
                    className="about-image img-fluid"
                  />
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

                <Button
                  variant="outline-light"
                  onClick={() => window.location.href = '#projects'}
                  className="minimal-btn"
                >
                  See My Projects
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </section>
  );
}

