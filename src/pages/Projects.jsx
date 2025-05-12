
import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Projects.css'; // contiene stili extra

const projects = [
  {
    title: 'Rubamazzetto',
    description: 'Gioco strategico di carte sviluppato in Java con un motore di regole e IA base.',
    image: 'https://via.placeholder.com/600x300?text=Rubamazzetto',
    link: 'https://github.com/tuo-utente/rubamazzetto'
  },
  {
    title: 'Saltapicchio',
    description: 'Platformer 2D creato in JavaFX con elementi di interazione ambientale e animazioni.',
    image: 'https://via.placeholder.com/600x300?text=Saltapicchio',
    link: 'https://github.com/tuo-utente/saltapicchio'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="text-4xl font-bold text-center mb-12 text-indigo-700 fade-in">I miei progetti</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="project-card animate-card"
            header={<img alt={project.title} src={project.image} className="card-img" />}
            title={<span className="text-xl font-semibold">{project.title}</span>}
            subTitle={<span className="text-gray-500">{project.description}</span>}
            footer={
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Button label="Guarda su GitHub" icon="pi pi-github" className="p-button-outlined p-button-sm p-button-secondary mt-3 hover-button" />
              </a>
            }
          />
        ))}
      </div>
    </section>
  );
}

