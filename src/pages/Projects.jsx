import { useState, useRef, useEffect } from 'react';
import './Projects.css';
import Button from 'react-bootstrap/Button';
import { GoCommit } from "react-icons/go";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);

  // Carica i dati dal JSON
  useEffect(() => {
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
      .catch(err => console.error('Errore caricamento JSON:', err));
  }, []);

  // Inizializza l'altezza del container
  useEffect(() => {
    if (projects.length > 0) {
      document.documentElement.style.setProperty('--num-projects', projects.length);
    }
  }, [projects.length]);

  // Gestione dello scroll controllato
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = (e) => {
      if (isScrollingRef.current) return;
      
      const windowHeight = window.innerHeight;
      const scrollPosition = section.scrollTop;
      const newIndex = Math.round(scrollPosition / windowHeight);
      
      if (newIndex !== activeIndex) {
        isScrollingRef.current = true;
        setPrevIndex(activeIndex);
        setActiveIndex(newIndex);
        setIsTransitioning(true);
        
        section.scrollTo({
          top: newIndex * windowHeight,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          isScrollingRef.current = false;
          setIsTransitioning(false);
        }, 1000);
      }
    };

    const handleWheel = (e) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = Math.sign(e.deltaY);
      const newIndex = Math.min(
        projects.length - 1, 
        Math.max(0, activeIndex + delta)
      );
      
      if (newIndex !== activeIndex) {
        e.preventDefault();
        isScrollingRef.current = true;
        setPrevIndex(activeIndex);
        setActiveIndex(newIndex);
        setIsTransitioning(true);
        
        section.scrollTo({
          top: newIndex * window.innerHeight,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          isScrollingRef.current = false;
          setIsTransitioning(false);
        }, 1000);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }
      
      const y = e.touches[0].clientY;
      const delta = touchStartY.current - y;
      
      if (Math.abs(delta) > 50) {
        e.preventDefault();
        isScrollingRef.current = true;
        const direction = delta > 0 ? 1 : -1;
        const newIndex = Math.min(
          projects.length - 1, 
          Math.max(0, activeIndex + direction)
        );
        
        if (newIndex !== activeIndex) {
          setPrevIndex(activeIndex);
          setActiveIndex(newIndex);
          setIsTransitioning(true);
          
          section.scrollTo({
            top: newIndex * window.innerHeight,
            behavior: 'smooth'
          });
          
          setTimeout(() => {
            isScrollingRef.current = false;
            setIsTransitioning(false);
          }, 1000);
        }
      }
    };

    section.addEventListener('scroll', handleScroll);
    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: false });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      section.removeEventListener('scroll', handleScroll);
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
    };
  }, [projects.length, activeIndex]);

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
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-container">
        <div className="sticky-content">
          <div className="section-title">
            <h2>PROJECTS</h2>
            <div className="title-underline"></div>
          </div>

          <div className="projects-display">
            {projects.map((project, index) => {
              const repoSize = formatSize(project.stats.size);
              const lastUpdated = formatDate(project.stats.updated_at);
              
              let className = 'project-content';
              if (index === activeIndex) {
                className += ' active';
              } else if (index === prevIndex && isTransitioning) {
                className += ' exiting';
              }

              const swapDirection = index % 2 === 0 ? 'swap-left' : 'swap-right';

              return (
                <div 
                  key={index}
                  className={`${className} ${swapDirection}`}
                  style={{
                    transitionDelay: `${index === activeIndex ? 0.1 : 0}s`
                  }}
                >
                  <article className="project-item">
                    <div className="project-image-container">
                      <div className="project-image">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          loading="lazy"
                        />
                        <div className="stats-overlay">
                          <span><i className="pi pi-star" /> {project.stats.stars}</span>
                          <span><i className="pi pi-share-alt" /> {project.stats.forks}</span>
                          <span><GoCommit /> {project.stats.commits}</span>
                        </div>
                      </div>
                    </div>

                    <div className="project-info-container">
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
                            className="github-link"
                          >
                            <Button className="github-button">
                              <i className="pi pi-github"></i> Repository
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}