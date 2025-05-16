/* Projects.js */
import React, { useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import './Projects.css';
import Button from 'react-bootstrap/Button';
import { GoCommit } from "react-icons/go";
import repoStats from '../../public/repo_stats.json';  // Importa il JSON completo

// Converti l'oggetto JSON in un array di progetti
const projects = Object.entries(repoStats).map(([key, value]) => ({
  // Estrai owner e repo dalla chiave
  owner: key.split('/')[0],
  repo: key.split('/')[1],
  // Estrai gli altri campi dal valore
  title: value.title || key.split('/')[1],
  image: value.image || '/fallback-image.png',
  // Mantieni tutte le statistiche
  stats: value
}));

export default function Projects() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('card-visible');
      }),
      { threshold: 0.1 }
    );
    
    cardsRef.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-title">
        <h2>PROJECTS</h2>
        <div className="title-underline"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-item" ref={el => cardsRef.current[index] = el}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="stats-overlay">
                <span><i className="pi pi-star" /> {project.stats.stars || 0}</span>
                <span><i className="pi pi-share-alt" /> {project.stats.forks || 0}</span>
                <span><GoCommit /> {project.stats.commits || 0}</span>
              </div>
            </div>

            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.stats.description || 'Nessuna descrizione disponibile'}</p>
              
              <div className="language-stats">
                {(project.stats.languages || []).map((lang, i) => (
                  <span key={i} className="lang-tag">
                    {lang.name} {lang.percent}%
                  </span>
                ))}
              </div>

              <a
                href={`https://github.com/${project.owner}/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="github-button">
                  <i className="pi pi-github" /> Vedi Repository
                </Button>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
