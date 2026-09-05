import { useState, useEffect } from 'react';
import './Projects.css';
import { GoCommit, GoStar, GoRepoForked, GoArrowUpRight } from "react-icons/go";
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLang();
  const tr = translations[lang].projects;

  useEffect(() => {
    setIsLoading(true);
    fetch('/repo_stats.json')
      .then(res => res.json())
      .then(repoStats => {
        const parsed = Object.entries(repoStats).map(([key, value]) => ({
          owner: key.split('/')[0],
          repo: key.split('/')[1],
          title: value.title || key.split('/')[1],
          image: value.image || '/fallback-image.png',
          stats: value
        }));
        setProjects(parsed);
      })
      .catch(err => {
        console.error('Error loading projects:', err);
        setProjects([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-wrapper">
        <div className="projects-header">
          <div className="section-title">
            <h2>{tr.title}</h2>
            <div className="title-underline"></div>
          </div>
          <p className="section-subtitle">{tr.subtitle}</p>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <p>{tr.loading}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>{tr.noProjects}</p>
          </div>
        ) : (
          <div className="terminal-projects-list">
            {projects.map((project) => (
              <a
                href={`https://github.com/${project.owner}/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                key={`${project.owner}/${project.repo}`}
                className="terminal-project-row"
              >
                <div className="terminal-project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="image-crosshair top-left"></div>
                  <div className="image-crosshair top-right"></div>
                  <div className="image-crosshair bottom-left"></div>
                  <div className="image-crosshair bottom-right"></div>
                </div>
                
                <div className="terminal-project-content">
                  <div className="terminal-project-header">
                    <h3 className="terminal-project-title">
                      <span className="prompt-symbol">~/</span>{project.title}
                    </h3>
                    <div className="terminal-project-stats">
                      <span><GoStar /> {project.stats.stars}</span>
                      <span><GoRepoForked /> {project.stats.forks}</span>
                      <span><GoCommit /> {project.stats.commits}</span>
                    </div>
                  </div>
                  
                  <p className="terminal-project-desc">{project.stats.description}</p>
                  
                  <div className="terminal-project-footer">
                    <div className="terminal-project-tags">
                      {project.stats.topics.slice(0, 5).map(t => (
                        <span key={t} className="terminal-tag">{t}</span>
                      ))}
                    </div>
                    
                    <div className="terminal-footer-bottom">
                      {project.stats.languages && project.stats.languages.length > 0 && (
                        <div className="terminal-project-lang">
                          <span className="lang-dot"></span>
                          {project.stats.languages[0].name}
                        </div>
                      )}
                      <span className="github-link-btn">
                        {tr.viewRepo || 'View Repository'} <GoArrowUpRight className="arrow-icon" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
