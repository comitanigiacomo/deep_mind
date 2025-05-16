import React, { useRef, useEffect } from 'react';
import './Projects.css';
import Button from 'react-bootstrap/Button';
import { GoCommit } from "react-icons/go";
import repoStats from '../../public/repo_stats.json';

const projects = Object.entries(repoStats).map(([key, value]) => ({
  owner: key.split('/')[0],
  repo: key.split('/')[1],
  title: value.title || key.split('/')[1],
  image: value.image || '/fallback-image.png',
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSize = (sizeMB) => {
    return sizeMB > 1024 
      ? `${(sizeMB / 1024).toFixed(1)} GB` 
      : `${sizeMB.toFixed(1)} MB`;
  };

  return (
    <section id="projects" className="projects-section">
      <div className="section-title">
        <h2>PROJECTS</h2>
        <div className="title-underline"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => {
          const repoSize = formatSize(project.stats.size);
          const lastUpdated = formatDate(project.stats.updated_at);

          return (
            <article key={index} className="project-item" ref={el => cardsRef.current[index] = el}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="stats-overlay">
                  <span><i className="pi pi-star" /> {project.stats.stars}</span>
                  <span><i className="pi pi-share-alt" /> {project.stats.forks}</span>
                  <span><GoCommit /> {project.stats.commits}</span>
                </div>
              </div>

              <div className="project-info">
                <div className="repo-header">
                  <h3>{project.title}</h3>
                  <div className="repo-status-badges">
                    {project.stats.archived && (
                      <span className="badge archived-badge">
                        <i className="pi pi-lock"></i> Archived
                      </span>
                    )}
                    <span className="badge branch-badge">
                      <i className="pi pi-code"></i> {project.stats.default_branch}
                    </span>
                  </div>
                </div>

                <p className="repo-description">{project.stats.description}</p>

                <div className="repo-metadata">
                  <div className="metadata-item">
                    <i className="pi pi-calendar"></i>
                    <span>Updated: {lastUpdated}</span>
                  </div>
                  <div className="metadata-item">
                    <i className="pi pi-database"></i>
                    <span>Size: {repoSize}</span>
                  </div>
                </div>

                {project.stats.topics.length > 0 && (
                  <div className="topics-container">
                    {project.stats.topics.map((topic, i) => (
                      <span key={i} className="topic-badge">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}


                <div className="project-links">
                  <div className="license-badge-wrapper">
                    {project.stats.license !== "No license" && (
                      <div className="license-badge">
                        <i className="pi pi-file"></i>
                        {project.stats.license}
                      </div>
                    )}
                  </div>
  
                  <a
                  href={`https://github.com/${project.owner}/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  <Button className="github-button">
                    <i className="pi pi-github"></i> Repository
                  </Button>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
