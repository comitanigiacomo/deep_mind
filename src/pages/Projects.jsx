import { useState, useEffect } from 'react';
import './Projects.css';
import Button from 'react-bootstrap/Button';
import { GoCommit, GoStar, GoRepoForked } from "react-icons/go";
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

  const formatDate = (dateString) => {
    const locale = lang === 'it' ? 'it-IT' : 'en-US';
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  const formatSize = (sizeMB) => {
    return sizeMB > 1024
      ? `${(sizeMB / 1024).toFixed(1)} GB`
      : `${sizeMB.toFixed(1)} MB`;
  };

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

        {/* Projects Grid */}
        {isLoading ? (
          <div className="loading-state">
            <p>{tr.loading}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>{tr.noProjects}</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={`${project.owner}/${project.repo}`} className="project-card">
                <div className="card-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="card-overlay">
                    <div className="card-stats">
                      <span className="stat-item">
                        <GoStar style={{ marginRight: '4px' }} /> {project.stats.stars}
                      </span>
                      <span className="stat-item">
                        <GoRepoForked style={{ marginRight: '4px' }} /> {project.stats.forks}
                      </span>
                      <span className="stat-item">
                        <GoCommit /> {project.stats.commits}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{project.title}</h3>
                    {project.stats.archived && (
                      <span className="badge archived">
                        <i className="pi pi-lock" /> {tr.archived}
                      </span>
                    )}
                  </div>

                  <p className="card-description">{project.stats.description}</p>

                  <div className="card-meta">
                    <span className="meta-item">
                      <i className="pi pi-calendar" /> {tr.updated}: {formatDate(project.stats.updated_at)}
                    </span>
                    <span className="meta-item">
                      <i className="pi pi-database" /> {tr.size}: {formatSize(project.stats.size)}
                    </span>
                  </div>

                  {project.stats.topics.length > 0 && (
                    <div className="card-tags">
                      {project.stats.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="tag-badge">
                          {topic}
                        </span>
                      ))}
                      {project.stats.topics.length > 3 && (
                        <span className="tag-badge more">
                          +{project.stats.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <a
                    href={`https://github.com/${project.owner}/${project.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    <Button className="view-repo-btn">
                      <i className="pi pi-github" /> {tr.viewRepo}
                    </Button>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
