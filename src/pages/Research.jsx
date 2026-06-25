import { useRef, useEffect, useState } from 'react';
import NeuralNetworkCanvas from '../components/NeuralNetworkCanvas';
import './Research.css';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Research() {
  const [sectionRef, visible] = useInView();
  const { lang } = useLang();
  const tr = translations[lang].research;
  const papers = tr.papers;

  return (
    <section id="research" className="research-section" ref={sectionRef}>
      <NeuralNetworkCanvas />
      
      <div className={`research-inner ${visible ? 'research--visible' : ''}`} style={{ position: 'relative', zIndex: 1 }}>

        <div className="section-title">
          <h2>{tr.title}</h2>
          <div className="title-underline"></div>
        </div>
        <p className="research-subtitle">{tr.subtitle}</p>

        <div className="research-grid">
          {papers.map((paper, i) => (
            <article
              key={paper.id}
              className="research-card"
              style={{ '--paper-color': paper.color, '--delay': `${i * 0.15}s` }}
            >
              {/* Image strip */}
              <div className="research-card__img-wrap">
                <img src={paper.image} alt={paper.title} className="research-card__img" loading="lazy" />
                <div className="research-card__img-overlay" />
                <div className="research-card__badge">
                  <span className="research-card__year">{paper.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className="research-card__body">
                <div className="research-card__meta">
                  <span className="research-card__course">{paper.course}</span>
                  <span className="research-card__subject">{paper.subtitle}</span>
                </div>

                <h3 className="research-card__title">{paper.title}</h3>
                <p className="research-card__abstract">{paper.abstract}</p>

                {/* Methods pills */}
                <div className="research-card__methods">
                  {paper.methods.map(m => (
                    <span key={m} className="research-method">{m}</span>
                  ))}
                </div>

                {/* Tags */}
                <div className="research-card__tags">
                  {paper.tags.map(t => (
                    <span key={t} className="research-tag">{t}</span>
                  ))}
                </div>

                <div className="research-card__footer">
                  <a
                    href={paper.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-github-btn"
                    style={{ '--paper-color': paper.color }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {tr.viewRepo}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
