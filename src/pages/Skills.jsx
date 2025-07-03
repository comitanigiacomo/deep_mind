import { useState, useCallback } from 'react'
import KeyboardScene from '../components/keyboardScene'
import './Skills.css'
import { useTheme } from '../context/ThemeContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const keyCardMap = {
    'key-01': {
        title: 'Go',
        description: 'Go è un linguaggio open-source progettato per l efficienza e la semplicità.'
    },
    'key-02': {
        title: 'JavaScript',
        description: 'JavaScript è il linguaggio dominante per il web moderno.'
    },
    'key-03': {
        title: 'Python',
        description: 'Python è popolare per l AI, la scienza e la chiarezza della sintassi.'
    },
    'key-04': {
        title: 'React',
        description: 'React è una libreria front-end per creare interfacce utente dinamiche.'
    },
}

export default function Skills() {
    const { isDarkMode } = useTheme();
    const [hoveredKey, setHoveredKey] = useState(null);

    const handleKeyHover = useCallback((keyName) => {
        setHoveredKey(keyName);
    }, []);

    const card = hoveredKey ? keyCardMap[hoveredKey] : null;

    return (
        <section id="skills" className="skills-section">
            <div className="section-title">
                <h2>SKILLS</h2>
                <div className="title-underline"></div>
            </div>
            <Container fluid className="skills-container">
                <Row className="align-items-stretch h-100">
                    <Col lg={8} className="skills-scene-col px-0"> {/* 75% (9/12) */}
                        <div className="skills-scene-wrapper">
                            <KeyboardScene
                                onKeyHover={handleKeyHover}
                                fixedRotation={[0.7, 0.5, 0]}
                                scale={1.5}
                            />
                        </div>
                    </Col>
                    <Col lg={4} className="skills-title-col"> {/* 25% (3/12) */}
                        <div className="skill-card-container">
                            {card && (
                                <div className="skill-card">
                                    <div className="skill-card-header">
                                        <div className="skill-card-icon">
                                            {/* Qui puoi inserire un'icona SVG o un carattere icona */}
                                            <span>⌨️</span>
                                        </div>
                                        <h3>{card.title}</h3>
                                    </div>
                                    <p>{card.description}</p>

                                    <div className="skill-level">
                                        <div className="skill-level-bar" style={{ width: '80%' }}></div>
                                    </div>

                                    <div className="skill-card-footer">
                                        <div className="skill-tags">
                                            <span className="skill-tag">Expert</span>
                                            <span className="skill-tag">5+ years</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}