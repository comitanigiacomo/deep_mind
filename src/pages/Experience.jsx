import React, { useEffect } from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Tooltip } from 'primereact/tooltip';
import { ScrollPanel } from 'primereact/scrollpanel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Experience.css';

const ExperiencePage = () => {
  const experiences = [
    {
      date: '2012 - 2015',
      title: 'Diploma Scientifico',
      institution: 'Liceo Scientifico A. Einstein',
      description: 'Indirizzo Scienze Applicate con votazione 100/100',
      type: 'school',
      icon: 'pi pi-book'
    },
    {
      date: '2015 - 2019',
      title: 'Laurea Triennale in Informatica',
      institution: 'Università degli Studi di Milano',
      description: 'Votazione 110L/110 - Tesi in Sistemi Distribuiti',
      type: 'bachelor',
      icon: 'pi pi-graduation-cap'
    },
    {
      date: '2019 - 2021',
      title: 'Laurea Magistrale in Computer Science',
      institution: 'Politecnico di Milano',
      description: 'Votazione 110/110 - Specializzazione in AI',
      type: 'master',
      icon: 'pi pi-microchip'
    },
    {
      date: '2021 - Presente',
      title: 'Full Stack Developer',
      institution: 'Tech Innovators Srl',
      description: 'Sviluppo applicazioni web con React e Node.js',
      type: 'work',
      icon: 'pi pi-briefcase'
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
                <h5>{item.institution}</h5>
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
