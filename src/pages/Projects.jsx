/* Projects.js */
import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import './Projects.css';
import Button from 'react-bootstrap/Button';

const projects = [
  {
    title: 'QuickLaunch',
    owner: 'comitanigiacomo',
    repo: 'quicklaunch',
    image: '/Screenshot from 2024-08-31 19-44-25.png',
  },
  {
    title: 'Universal',
    owner: 'comitanigiacomo',
    repo: 'Universal',
    image: '/Screenshot from 2024-08-31 19-44-25.png',
  },
  {
    title: 'Leetcode',
    owner: 'comitanigiacomo',
    repo: 'leetcode',
    image: '/Screenshot from 2024-08-31 19-44-25.png',
  },
  {
    title: 'CyberSecurity',
    owner: 'comitanigiacomo',
    repo:  'cyberSecurity',
    image: '/Screenshot from 2024-08-31 19-44-25.png',
  }
];

export default function Projects() {
  const cardsRef = useRef([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchStats(owner, repo) {
      try {
        const base = `https://api.github.com/repos/${owner}/${repo}`;
        const res = await fetch(base);
        if (!res.ok) throw new Error('GitHub API error');
        const repoData = await res.json();

        // commit count via Link header
        const commitsRes = await fetch(`${base}/commits?per_page=1`);
        const link = commitsRes.headers.get('Link') || '';
        let commits = 0;
        const match = /&page=(\d+)>; rel="last"/.exec(link);
        if (match) commits = parseInt(match[1], 10);
        else {
          const commitsArr = await commitsRes.json();
          commits = Array.isArray(commitsArr) ? commitsArr.length : 0;
        }

        // languages breakdown
        const langRes = await fetch(`${base}/languages`);
        const langData = await langRes.json();
        const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0) || 1;
        const languages = Object.entries(langData).map(([lang, bytes]) => ({
          name: lang,
          percent: ((bytes / totalBytes) * 100).toFixed(1)
        }));

        return {
          description: repoData.description || 'N/A',
          stars: repoData.stargazers_count ?? 0,
          forks: repoData.forks_count ?? 0,
          issues: repoData.open_issues_count ?? 0,
          watchers: repoData.watchers_count ?? 0,
          size: repoData.size ? (repoData.size / 1024).toFixed(2) : '0.00', // MB
          license: repoData.license?.name || 'No license',
          default_branch: repoData.default_branch || 'main',
          topics: Array.isArray(repoData.topics) ? repoData.topics : [],
          updated: repoData.updated_at ? new Date(repoData.updated_at).toLocaleDateString() : 'N/A',
          commits,
          languages
        };
      } catch (err) {
        console.error('fetchStats error', err);
        return {
          description: 'N/A',
          stars: 0,
          forks: 0,
          issues: 0,
          watchers: 0,
          size: '0.00',
          license: 'N/A',
          default_branch: 'N/A',
          topics: [],
          updated: 'N/A',
          commits: 0,
          languages: []
        };
      }
    }

    projects.forEach(({ owner, repo }) => {
      fetchStats(owner, repo).then(data => {
        setStats(prev => ({ ...prev, [`${owner}/${repo}`]: data }));
      });
    });
  }, []);

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
      <div className="section-header">
        <h2 className="section-title">Progetti</h2>
        <div className="title-underline"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project, idx) => {
          const key = `${project.owner}/${project.repo}`;
          const info = stats[key] || { commits: 0, languages: [], topics: [] };

          return (
            <Card
              key={idx}
              ref={el => (cardsRef.current[idx] = el)}
              className="project-card"
              header={
                <div className="card-header">
                  <img src={project.image} className="card-image" alt={project.title} />
                  <div className="stats-overlay">
                    <div className="stat-item"><i className="pi pi-star" />{info.stars}</div>
                    <div className="stat-item"><i className="pi pi-share-alt" />{info.forks}</div>
                    <div className="stat-item"><i className="pi pi-exclamation-circle" />{info.issues}</div>
                    <div className="stat-item"><i className="pi pi-eye" />{info.watchers}</div>
                    <div className="stat-item"><i className="pi pi-git-branch" />{info.commits}</div>
                  </div>
                </div>
              }
            >
              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="repo-description">{info.description}</p>

                <div className="language-stats">
                  {(info.languages || []).map((lang, i) => (
                    <span key={i} className="lang-tag">{lang.name} {lang.percent}%</span>
                  ))}
                </div>



              </div>

              <div className="card-footer">
                <a
                  href={`https://github.com/${project.owner}/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <Button variant="outline-light" className="minimal-btn">
                    <i className="pi pi-github" style={{ marginRight: '0.5rem' }}></i> GitHub
                  </Button>
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

