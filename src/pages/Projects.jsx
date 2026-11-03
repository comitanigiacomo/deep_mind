import { GoArrowUpRight, GoCommit, GoRepoForked, GoStar } from 'react-icons/go';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useRepoStats } from '../hooks/useRepoStats';
import './Projects.css';

const MAX_VISIBLE_TOPICS = 5;

/**
 * Zeroes are hidden on purpose: a card that reads "0 stars, 0 forks" is
 * negative social proof for a portfolio, so only real numbers are rendered.
 */
const PROJECT_STATS = [
  { key: 'stars', Icon: GoStar },
  { key: 'forks', Icon: GoRepoForked },
  { key: 'commits', Icon: GoCommit },
];

function ProjectStats({ project, labels }) {
  const visibleStats = PROJECT_STATS.filter(({ key }) => project[key] > 0);

  if (visibleStats.length === 0) {
    return null;
  }

  return (
    <div className="terminal-project-stats">
      {visibleStats.map(({ key, Icon }) => (
        <span key={key}>
          <Icon aria-hidden="true" />
          <span className="sr-only">{`${labels[key]}: `}</span>
          {project[key]}
        </span>
      ))}
    </div>
  );
}

function ProjectRow({ project, labels }) {
  const primaryLanguage = project.languages[0];
  const repoUrl = `https://github.com/${project.owner}/${project.repo}`;

  return (
    <article className="terminal-project-row">
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
            <a
              className="terminal-project-title-link"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="prompt-symbol" aria-hidden="true">~/</span>
              {project.title}
            </a>
          </h3>
          <ProjectStats project={project} labels={labels.stats} />
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

            <div className="terminal-project-actions">
              {project.demo && (
                <a
                  className="github-link-btn github-link-btn--demo"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.demoLabels[project.demoType] ?? labels.demoLabels.live}{' '}
                  <GoArrowUpRight className="arrow-icon" aria-hidden="true" />
                </a>
              )}
              <a
                className="github-link-btn"
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.viewRepo} <GoArrowUpRight className="arrow-icon" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
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
                labels={tr}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
