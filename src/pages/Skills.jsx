import { useState, useCallback } from 'react'
import KeyboardScene from '../components/keyboardScene'
import './Skills.css'
import { useTheme } from '../context/ThemeContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const keyDescriptions = {
    'key-01': {
        title: 'Go Development',
        highlights: [
            'Sviluppo backend performante',
            'Microservizi scalabili',
            'Concorrenza efficiente con goroutines',
            'Tooling CLI avanzato'
        ]
    },
    'key-02': {
        title: 'JavaScript/TypeScript',
        highlights: [
            'React/Next.js applications',
            'Node.js backend systems',
            'Clean architecture',
            'Performance optimization'
        ]
    },
    'key-03': {
        title: 'Python Engineering',
        highlights: [
            'Data analysis & visualization',
            'Automation scripts',
            'Rapid prototyping',
            'Web scraping solutions'
        ]
    },
    'key-04': {
        title: 'React Expertise',
        highlights: [
            'Component design systems',
            'State management',
            'Interactive UIs',
            'Accessibility focus'
        ]
    },
    'default': {
        title: 'My Tech Stack',
        subtitle: 'Hover over keyboard keys to explore my skills',
        highlights: [
            '5+ years professional experience',
            'Full-stack capabilities',
            'Clean & maintainable code',
            'Problem-solving focus'
        ]
    },
    'unknown': {
        title: 'More Skills',
        subtitle: 'This key represents additional capabilities',
        highlights: [
            'Continuous learning approach',
            'Adaptability to new technologies',
            'Focus on best practices',
            'Custom solutions development'
        ]
    }
}

export default function Skills() {
    const [hoveredKey, setHoveredKey] = useState(null)
    const { isDarkMode } = useTheme()

    const handleKeyHover = useCallback((keyName) => {
        setHoveredKey(keyName)
    }, [])

    const getCurrentContent = () => {
        if (!hoveredKey) return keyDescriptions['default']
        return keyDescriptions[hoveredKey] || keyDescriptions['unknown']
    }

    const { title, subtitle, highlights } = getCurrentContent()

    return (
        <section id="skills" className="skills-section">
            <div className="section-title">
                <h2>SKILLS</h2>
                <div className="title-underline"></div>
            </div>
            
            <Container fluid className="skills-container">
                <Row className="h-100">
                    <Col lg={8} className="skills-scene-col px-0">
                        <KeyboardScene
                            onKeyHover={handleKeyHover}
                            fixedRotation={[0.7, 0.5, 0]}
                            scale={1.5}
                        />
                    </Col>
                    
                    <Col lg={4} className="skills-text-col">
                        <div className="skills-text-content">
                            <h3 className="skill-main-title">{title}</h3>
                            
                            {subtitle && (
                                <p className="skill-subtitle">{subtitle}</p>
                            )}
                            
                            <ul className="skill-highlights">
                                {highlights.map((item, index) => (
                                    <li key={index} className="highlight-item">
                                        <span className="highlight-icon">▸</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}