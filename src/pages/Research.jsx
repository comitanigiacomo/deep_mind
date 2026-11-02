import { GithubIcon } from '../components/icons/GithubIcon';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useInView } from '../hooks/useInView';
import './Research.css';

export default function Research() {
  const { ref: sectionRef, isInView } = useInView();
  const { lang } = useLang();
  const tr = translations[lang].research;

  return (
    <section id="research" className="research-section" ref={sectionRef}>
      <div className={`research-inner ${isInView ? 'research--visible' : ''}`}>

        <div className="section-title">
          <h2>{tr.title}</h2>
          <div className="title-underline" />
        </div>
        <p className="research-subtitle">{tr.subtitle}</p>

        <div className="research-grid">
          {tr.papers.map((paper, index) => (
            <article
              key={paper.id}
              className="research-card"
              style={{ '--paper-color': paper.color, '--delay': `${index * 0.15}s` }}
            >
              <div className="research-card__img-wrap">
                <img src={paper.image} alt={paper.title} className="research-card__img" loading="lazy" decoding="async" />
                <div className="research-card__img-overlay" aria-hidden="true" />
                <div className="research-card__badge">
                  <span className="research-card__year">{paper.year}</span>
                </div>
              </div>

              <div className="research-card__body">
                <div className="research-card__meta">
                  <span className="research-card__course">{paper.course}</span>
                  <span className="research-card__subject">{paper.subtitle}</span>
                </div>

                <h3 className="research-card__title">{paper.title}</h3>
                <p className="research-card__abstract">{paper.abstract}</p>

                <div className="research-card__methods">
                  {paper.methods.map((method) => (
                    <span key={method} className="research-method">{method}</span>
                  ))}
                </div>

                <div className="research-card__tags">
                  {paper.tags.map((tag) => (
                    <span key={tag} className="research-tag">{tag}</span>
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
                    <GithubIcon size={15} />
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
