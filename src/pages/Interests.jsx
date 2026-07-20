import { useState, useEffect, useRef } from 'react';
import './Interests.css';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Interests() {
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
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollProgress = Math.max(0, Math.min(1, (-top) / (height - windowHeight)));
      const newIndex = Math.min(interests.length - 1, Math.floor(scrollProgress * interests.length));
      
      setActiveIndex(newIndex);
      animationFrameRef.current = requestAnimationFrame(updateActiveIndex);
    };

    animationFrameRef.current = requestAnimationFrame(updateActiveIndex);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [interests.length]);

  return (
    <section id="interests" className="interests-section">
      <div
        className="interests-container"
        ref={sectionRef}
        style={{ height: `${interests.length * 120}vh` }}
      >
        <div className="sticky-content">
          
          <div className="interests-header-sticky">
            <div className="section-title">
              <h2>{tr.title}</h2>
              <div className="title-underline"></div>
            </div>
          </div>
          
          {/* Giant Number Watermark (Background) */}
          <div className="interests-watermark" aria-hidden="true">
             {interests.map((interest, index) => (
                <span 
                  key={`watermark-${index}`} 
                  className={`watermark-num ${index === activeIndex ? 'active' : ''}`}
                >
                  {interest.number}
                </span>
             ))}
          </div>

          {/* Central Glassmorphism Card */}
          <div className="interests-cardbox">
            {interests.map((interest, index) => (
              <div
                key={`card-${index}`}
                className={`interest-card ${index === activeIndex ? 'active' : ''}`}
              >
                {/* Left: Image Pane */}
                <div className="interest-card__image-pane">
                  <img src={interest.image} alt={interest.title} />
                  <div className="image-overlay" />
                </div>

                {/* Right: Info Pane */}
                <div className="interest-card__info-pane">
                  <div className="info-header">
                    <span className="info-counter">
                      {String(index).padStart(2, '0')} <span className="counter-sep">/</span> {String(interests.length - 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="info-title">{interest.title}</h3>
                  <p className="info-desc">{interest.description}</p>
                  
                  <div className="info-skills">
                    {interest.skills.map((skill, i) => (
                      <span key={i} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical Progress Indicators */}
          <div className="interests-progress" aria-hidden="true">
            {interests.map((_, i) => (
              <div
                key={`dot-${i}`}
                className={`progress-dot ${i === activeIndex ? 'active' : ''}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}