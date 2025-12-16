import React, { useEffect } from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Education.css';

const EducationPage = () => {
  const experiences = [
    {
      date: '2021 – 2025',
      title: 'Bachelor of Science in Computer Science',
      institution: 'University of Milan',
      description: 'Undergraduate degree program',
      type: 'bachelor',
      icon: 'pi pi-microchip',
      logo: '/Unimi-logo.png',
      color: '#3b82f6',
      progress: 100
    },
    {
      date: '2016 – 2021',
      title: 'High School Diploma',
      institution: 'Leonardo Da Vinci State High School (Cologno Monzese)',
      description: 'Scientific curriculum',
      type: 'highschool',
      icon: 'pi pi-graduation-cap',
      logo: '/leonardoDaVinci.png',
      color: '#3b82f6',
      progress: 100
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-item-visible');
          
          const progressFill = entry.target.querySelector('.progress-fill');
          if (progressFill) {
            const progress = progressFill.dataset.progress;
            progressFill.style.width = `${progress}%`;
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.p-timeline-event').forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="experience-section">
      <div className="stars-bg">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }} />
        ))}
      </div>
      
      <div className="timeline-container">
        <div className="section-header">
          <h1 className="section-title" style={{ marginTop: '1px' }}>
            <span className="title-line">Education</span>
          </h1>
          <p className="section-subtitle">
            Building knowledge through structured learning and continuous growth
          </p>
        </div>
        
        <Timeline
          value={experiences}
          align="alternate"
          className="customized-timeline"
          marker={(item) => (
            <div className="timeline-marker">
              <div className="marker-ring" style={{ borderColor: item.color }} />
              <div className="marker-dot" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
              </div>
              <div className="marker-pulse" style={{ borderColor: item.color }} />
            </div>
          )}
          content={(item) => (
            <Card className="timeline-card">
              <div className="card-glow" style={{ backgroundColor: `${item.color}20` }} />
              <div className="timeline-card-content">
                <div className="experience-header">
                  <span 
                    className="experience-type"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span className="experience-date">{item.date}</span>
                </div>
                
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      data-progress={item.progress}
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <span className="progress-text">{item.progress}% Complete</span>
                </div>
                
                <h3>{item.title}</h3>
                <h5>
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="institution-logo"
                    />
                  )}
                  <p>{item.institution}</p>
                </h5>
                <p>{item.description}</p>
                <div className="experience-divider"></div>
                <div className="experience-footer">
                  <i className={item.icon}></i>
                </div>
              </div>
            </Card>
          )}
        />
      </div>
    </section>
  );
};

export default EducationPage;