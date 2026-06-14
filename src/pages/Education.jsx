import React, { useEffect, useRef } from 'react';
import './Education.css';

const EducationPage = () => {
  const sectionRef = useRef(null);

  const experiences = [
    {
      date: '2025 – 2026',
      title: 'Master of Science in Computer Science',
      institution: 'University of Milan',
      description: 'Currently pursuing my graduate degree with a focus on advanced computing concepts.',
      type: 'master',
      logo: '/Unimi-logo.png',
      active: true,
    },
    {
      date: '2021 – 2025',
      title: 'Bachelor of Science in Computer Science',
      institution: 'University of Milan',
      description: 'Undergraduate degree program focused on systems programming and software engineering.',
      thesis: 'Study and analysis of cryptographic functions used by mobile devices to protect sensitive data',
      type: 'bachelor',
      logo: '/Unimi-logo.png',
      active: false,
    },
    {
      date: '2016 – 2021',
      title: 'High School Diploma',
      institution: 'Leonardo Da Vinci State High School',
      description: 'Scientific curriculum',
      type: 'highschool',
      logo: '/leonardoDaVinci.png',
      active: false,
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('edu-card--visible');
        }
      });
    }, { threshold: 0.15 });

    const cards = document.querySelectorAll('.edu-card-wrapper');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="education-section" ref={sectionRef}>
      <div className="education-container">
        <div className="section-header">
          <div className="section-title">
            <h2>EDUCATION</h2>
            <div className="title-underline"></div>
          </div>
        </div>

        <div className="edu-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="edu-card-wrapper">
              
              {/* Timeline Line & Dot */}
              <div className="edu-timeline-visual">
                <div className={`edu-timeline-dot ${exp.active ? 'edu-timeline-dot--active' : ''}`}>
                  {exp.active && <div className="edu-timeline-dot-pulse" />}
                </div>
                {index !== experiences.length - 1 && <div className="edu-timeline-line"></div>}
              </div>

              {/* Card Content */}
              <div className="edu-card">
                <div className="edu-card__header">
                  <span className="edu-card__date">{exp.date}</span>
                  <span className={`edu-card__type edu-card__type--${exp.type}`}>
                    {exp.type.toUpperCase()}
                  </span>
                </div>

                <h3 className="edu-card__title">{exp.title}</h3>
                
                <div className="edu-card__institution">
                  {exp.logo && (
                    <img src={exp.logo} alt={exp.institution} className="edu-card__logo" />
                  )}
                  <span>{exp.institution}</span>
                </div>

                <p className="edu-card__description">{exp.description}</p>

                {exp.thesis && (
                  <div className="edu-card__thesis">
                    <span className="edu-card__thesis-label">Thesis</span>
                    <p>{exp.thesis}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationPage;