import { GoArrowUpRight, GoCommit, GoRepoForked, GoStar } from 'react-icons/go';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useRepoStats } from '../hooks/useRepoStats';
import './Projects.css';

const MAX_VISIBLE_TOPICS = 5;

function ProjectStats({ stars, forks, commits }) {
  return (
    <div className="terminal-project-stats">
      <span><GoStar aria-hidden="true" /> {stars}</span>
      <span><GoRepoForked aria-hidden="true" /> {forks}</span>
      <span><GoCommit aria-hidden="true" /> {commits}</span>
    </div>
  );
}

function ProjectRow({ project, viewRepoLabel }) {
  const primaryLanguage = project.languages[0];

  return (
    <a
      href={`https://github.com/${project.owner}/${project.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="terminal-project-row"
    >
      <div className="terminal-project-image">
        <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
        <div className="image-crosshair top-left" aria-hidden="true" />
        <div className="image-crosshair top-right" aria-hidden="true" />
        <div className="image-crosshair bottom-left" aria-hidden="true" />
        <div className="image-crosshair bottom-right" aria-hidden="true" />
      </div>

      <div className="terminal-project-content">
        <div className="terminal-project-header">
          <h3 className="terminal-project-title">
            <span className="prompt-symbol">~/</span>{project.title}
          </h3>
          <ProjectStats stars={project.stars} forks={project.forks} commits={project.commits} />
        </div>

        <p className="terminal-project-desc">{project.description}</p>

        <div className="terminal-project-footer">
          <div className="terminal-project-tags">
            {project.topics.slice(0, MAX_VISIBLE_TOPICS).map((topic) => (
              <span key={topic} className="terminal-tag">{topic}</span>
            ))}
          </div>

          <div className="terminal-footer-bottom">
            {primaryLanguage && (
              <div className="terminal-project-lang">
                <span className="lang-dot" aria-hidden="true" />
                {primaryLanguage.name}
              </div>
            )}
            <span className="github-link-btn">
              {viewRepoLabel} <GoArrowUpRight className="arrow-icon" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const tr = translations[lang].projects;
  const { status, projects } = useRepoStats();

  return (
    <section className="projects-section">
      <div className="projects-wrapper">
        <div className="projects-header">
          <div className="section-title">
            <h2>{tr.title}</h2>
            <div className="title-underline" />
          </div>
          <p className="section-subtitle">{tr.subtitle}</p>
        </div>

        {status === 'loading' && (
          <div className="loading-state">
            <p>{tr.loading}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="empty-state" role="alert">
            <p>{tr.error}</p>
          </div>
        )}

        {status === 'success' && projects.length === 0 && (
          <div className="empty-state">
            <p>{tr.noProjects}</p>
          </div>
        )}

        {status === 'success' && projects.length > 0 && (
          <div className="terminal-projects-list">
            {projects.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                viewRepoLabel={tr.viewRepo}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
