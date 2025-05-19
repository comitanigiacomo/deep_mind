
import React, { useEffect } from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Education.css';

const ExperiencePage = () => {
  const experiences = [
    {
      date: '2021 – 2025',
      title: 'Bachelor of Science in Computer Science',
      institution: 'University of Milan',
      description: 'Undergraduate degree program (in progress)',
      type: 'bachelor',
      icon: 'pi pi-microchip',
      logo: '/Unimi-logo.png'
    },
    {
      date: '2016 – 2021',
      title: 'High School Diploma',
      institution: 'Leonardo Da Vinci State High School (Cologno Monzese)',
      description: 'Scientific curriculum',
      type: 'highschool',
      icon: 'pi pi-graduation-cap',
      logo: '/leonardoDaVinci.png'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-item-visible');
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
      <div className="timeline-container">
        <h1 className="section-title">Education</h1>
        <Timeline
          value={experiences}
          align="alternate"
          className="customized-timeline"
          marker={(item) => (
            <div className="timeline-marker">
              <i className={item.icon}></i>
            </div>
          )}
          content={(item) => (
            <Card className="timeline-card">
              <div className="timeline-card-content">
                <div className="experience-header">
                  <span className="experience-type">{item.type.toUpperCase()}</span>
                  <span className="experience-date">{item.date}</span>
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

export default ExperiencePage;
