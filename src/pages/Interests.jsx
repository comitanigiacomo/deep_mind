import { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Interests.css';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Interests() {
  const { isDarkMode } = useTheme();
  const { lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const animationFrameRef = useRef(null);

  const tr = translations[lang].interests;
  const interests = tr.items.map((item, i) => ({
    ...item,
    image: ['/tec.png', '/ferrari.png', './music.png', '/luffy.png', '/gym.png'][i],
  }));

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
      <div className="interests-title-wrapper">
        <div className="section-title">
          <h2>{tr.title}</h2>
          <div className="title-underline"></div>
        </div>
      </div>
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
                      <div className="interest-title">
                        <p>{interest.title}</p>
                      </div>
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