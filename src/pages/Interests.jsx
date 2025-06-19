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
      number: "00",
      title: "Formula 1",
      description: "Formula 1 has always fascinated me, i follow every race and enjoy learning about the technology and strategy behind the sport.",
      image: "../../public/ferrari.png",
      skills: ["Race Enthusiast", "Strategic Thinking", "Curiosity for Technology", "Attention to Detail"]
    },
    {
      number: "01",
      title: "IT",
      description: "I'm currently studying IT at university, following a lifelong interest in technology and problem-solving.",
      image: "../../public/tec.png",
      skills: ["Problem Solving", "Critical Thinking", "Tech Curiosity", "Team Collaboration"]
    },
    {
      number: "02",
      title: "Music",
      description: "I’m passionate about music, I listen to all kinds of genres and enjoy playing the drums in my free time.",
      image: "../../public/music.png",
      skills: ["Rhythm & Timing", "Creativity", "Active Listening", "Musical Expression"]
    },
    {
      number: "03",
      title: "Anime",
      description: "Anime is one of my biggest passions. I watch a wide variety of shows and enjoy the creativity and storytelling behind them.",
      image: "../../public/luffy.png",
      skills: ["Anime Enthusiast", "Strong Visual Sense", "Narrative Curiosity", "Consistent Watcher"]
    },
    {
      number: "04",
      title: "Gym",
      description: "Going to the gym has become an important part of my routine. It helps me stay focused, build discipline, and improve both physically and mentally. I enjoy challenging myself and seeing progress over time. I'm currently on a short break due to my studies, but I’ll be getting back to it soon.",
      image: "../../public/gym.png",
      skills: ["Discipline", "Consistency", "Self-Motivation", "Goal-Oriented"]
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