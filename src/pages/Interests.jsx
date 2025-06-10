import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Interests.css';
import { useTheme } from '../context/ThemeContext';

export default function Interests() {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);

  const interests = [
    {
      number: "01",
      title: "Formula 1",
      description: "Sono un appassionato di Formula 1 da sempre. Seguo ogni Gran Premio e mi affascina l'aspetto tecnico delle monoposto, oltre all'aspetto sportivo.",
      image: "../../public/ferrari.jpg",
      skills: ["Analisi Tecnica", "Strategia", "Aerodinamica", "Telemetria"]
    },
    {
      number: "02",
      title: "Tecnologia",
      description: "La mia passione per l'informatica e la tecnologia mi ha portato a studiare IT. Mi piace sperimentare con nuove tecnologie e framework.",
      image: "../../public/it.jpeg",
      skills: ["React", "JavaScript", "Node.js", "Python", "Machine Learning"]
    },
    {
      number: "03",
      title: "Musica",
      description: "Suono diversi strumenti e ascolto molta musica, soprattutto rock e generi alternativi. La musica è una parte importante della mia vita quotidiana.",
      image: "../../public/music.jpeg",
      skills: ["Chitarra", "Pianoforte", "Produzione", "Mixing", "Composizione"]
    },
  ];

  useEffect(() => {
    const updateActiveIndex = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const { top, height } = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, 
        (-top) / (height - windowHeight)
      ));

      const newIndex = Math.min(
        interests.length - 1,
        Math.floor(scrollProgress * interests.length)
      );

      setActiveIndex(newIndex);
      animationFrameRef.current = requestAnimationFrame(updateActiveIndex);
    };

    animationFrameRef.current = requestAnimationFrame(updateActiveIndex);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [interests.length]);

  return (
    <section id="interests" ref={sectionRef} className="interests-section">
      <div className="interests-container" style={{ height: `${interests.length * 200}vh` }}>
        <div className="sticky-content">
          <Container>
            <Row className="align-items-center h-100">
              <Col lg={6} className="interests-left">
                <div className="number-title-wrapper">
                  <div className="number-display">
                    {interests.map((interest, index) => (
                      <div 
                        key={`num-${index}`}
                        className={`number-item ${index === activeIndex ? 'active' : ''}`}
                      >
                        {interest.number}
                      </div>
                    ))}
                  </div>
                  <div className="titles-display">
                    {interests.map((interest, index) => (
                      <h2 
                        key={`title-${index}`}
                        className={`title-item ${index === activeIndex ? 'active' : ''}`}
                      >
                        {interest.title}
                      </h2>
                    ))}
                  </div>
                </div>
              </Col>
              <Col lg={6} className="interests-right">
                {interests.map((interest, index) => (
                  <div 
                    key={`interest-${index}`}
                    className={`interest-content ${index === activeIndex ? 'active' : ''}`}
                  >
                    <div className="interest-image">
                      <img src={interest.image} alt={interest.title} />
                    </div>
                    <div className="interest-info">
                      <div className="interest-description">
                        <p>{interest.description}</p>
                      </div>
                      <div className="interest-skills">
                        {interest.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-badge">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
}