import KeyboardScene from '../components/keyboardScene'
import './Skills.css'
import { useTheme } from '../context/ThemeContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Skills() {
  const { isDarkMode } = useTheme();

  return (
    <section id="skills" className="skills-section">
      <div className="section-title">
        <h2>SKILLS</h2>
        <div className="title-underline"></div>
      </div>
      <Container fluid className="skills-container">
        <Row className="align-items-center h-100">
          <Col lg={6} className="skills-scene-col px-0">
            <div className="skills-scene-wrapper">
              <KeyboardScene 
                fixedSize={true}
                fixedRotation={[0.7, 0.5, 0]}
                scale={1.5}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}