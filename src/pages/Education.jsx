import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useInView } from '../hooks/useInView';
import './Education.css';

function EducationCard({ experience, isLast, thesisLabel }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <div className={`edu-card-wrapper ${isInView ? 'edu-card--visible' : ''}`} ref={ref}>
      <div className="edu-timeline-visual" aria-hidden="true">
        <div className={`edu-timeline-dot ${experience.active ? 'edu-timeline-dot--active' : ''}`}>
          {experience.active && <div className="edu-timeline-dot-pulse" />}
        </div>
        {!isLast && <div className="edu-timeline-line" />}
      </div>

      <div className="edu-card">
        <div className="edu-card__header">
          <span className="edu-card__date">{experience.date}</span>
          <span className={`edu-card__type edu-card__type--${experience.type}`}>
            {experience.type.toUpperCase()}
          </span>
        </div>

        <h3 className="edu-card__title">{experience.title}</h3>

        <div className="edu-card__institution">
          {experience.logo && (
            <img src={experience.logo} alt="" className="edu-card__logo" loading="lazy" decoding="async" />
          )}
          <span>{experience.institution}</span>
        </div>

        <p className="edu-card__description">{experience.description}</p>

        {experience.thesis && (
          <div className="edu-card__thesis">
            <span className="edu-card__thesis-label">{thesisLabel}</span>
            <p>{experience.thesis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  const { lang } = useLang();
  const tr = translations[lang].education;

  return (
    <section className="education-section">
      <div className="education-container">
        <div className="section-header">
          <div className="section-title">
            <h2>{tr.title}</h2>
            <div className="title-underline" />
          </div>
        </div>

        <div className="edu-timeline">
          {tr.items.map((experience, index) => (
            <EducationCard
              key={`${experience.title}-${experience.date}`}
              experience={experience}
              thesisLabel={tr.thesisLabel}
              isLast={index === tr.items.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
