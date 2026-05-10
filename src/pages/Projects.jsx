import { useState, useEffect, useMemo } from 'react';
import './Projects.css';
import Button from 'react-bootstrap/Button';
import { GoCommit } from "react-icons/go";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Load project data from JSON
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

  // Get unique tags from all projects
  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach(project => {
      project.stats.topics?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.size === 0) return projects;
    return projects.filter(project =>
      Array.from(selectedTags).some(tag => project.stats.topics?.includes(tag))
    );
  }, [projects, selectedTags]);

  const toggleTag = (tag) => {
    const newTags = new Set(selectedTags);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            <h2>PROJECTS</h2>
            <div className="title-underline"></div>
          </div>
          <p className="section-subtitle">A curated collection of my work across different domains</p>
        </div>

        {/* Tag Filter */}
        <div className="tags-filter-container">
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="pi pi-sliders-v" /> Filter by tag
            <i className={`pi pi-chevron-${showFilters ? 'up' : 'down'}`} />
          </button>

          {showFilters && (
            <div className="tags-filter">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-button ${selectedTags.has(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {selectedTags.size > 0 && (
            <button
              className="clear-filters-btn"
              onClick={() => setSelectedTags(new Set())}
            >
              Clear filters ({selectedTags.size})
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="loading-state">
            <p>Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="empty-state">
            <p>No projects match the selected filters.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
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
                        <i className="pi pi-star-fill" /> {project.stats.stars}
                      </span>
                      <span className="stat-item">
                        <i className="pi pi-share-alt" /> {project.stats.forks}
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
                        <i className="pi pi-lock" /> Archived
                      </span>
                    )}
                  </div>

                  <p className="card-description">{project.stats.description}</p>

                  <div className="card-meta">
                    <span className="meta-item">
                      <i className="pi pi-calendar" /> {formatDate(project.stats.updated_at)}
                    </span>
                    <span className="meta-item">
                      <i className="pi pi-database" /> {formatSize(project.stats.size)}
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
                      <i className="pi pi-github" /> View Repository
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
