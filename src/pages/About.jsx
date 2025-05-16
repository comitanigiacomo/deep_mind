
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'; // Importa il componente Button
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';
import Intro from '../components/Intro';

export default function About() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <section id="about">
    <div style={{ minHeight: '100vh' }} id="about">
      {showIntro ? (
        <Intro onEnd={() => setShowIntro(false)} />
      ) : (
        <Container className="about-container py-5 fade-in">
          <Row className="align-items-start">
            {/* Colonna per il testo sulla sinistra */}
            <Col md={6}>
              <p className="small-text">Hey, I'm</p>
              <h1 className="display-1 fw-bold">Jack</h1>
              <p className="medium-text">an IT student from Milan</p>

              {/* Sezione di codice o simboli */}
              <div className="code-snippet">
                <p>console.log("Turning ideas into code, one step at a time")</p>

                <p>Can you guess what my favorite colors are?</p>              </div>
            </Col>

            {/* Colonna per il bottone e le icone sulla destra */}
            <Col md={6} className="text-center">
              <div className="contact-icons">
                <a href="https://github.com/tuonome" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="icon" />
                </a>
                <a href="https://www.linkedin.com/in/tuonome/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="icon" />
                </a>
                <a href="https://www.instagram.com/tuonome/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="icon" />
                </a>
              </div>

              {/* Bottone "See My Projects" sotto le icone, allineato a destra */}
              <Button variant="outline-light" onClick={() => window.location.href = '#projects'} className="minimal-btn">
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

