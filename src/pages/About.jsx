
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './About.css';
import Intro from '../components/Intro';

export default function About() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div style={{ minHeight: '100vh' }} id="about">
      {showIntro ? (
        <Intro onEnd={() => setShowIntro(false)} />
      ) : (
        <Container className="about-container py-5 fade-in">
          <Row className="align-items-center">
            <Col md={6} className="text-start">
              <h1 className="display-4 fw-bold">Giacomo Comitani</h1>
            </Col>
            <Col md={6} className="text-center">
              <p className="lead fst-italic">"Always coding, always dreaming."</p>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

