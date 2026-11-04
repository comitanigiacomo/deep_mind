import { FaDownload, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Magnetic from '../components/Magnetic';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useInView } from '../hooks/useInView';
import { useRepoStats } from '../hooks/useRepoStats';
import { cvFilename, cvHref } from '../lib/cv';
import './About.css';

const SOCIAL_LINKS = [
  { href: 'https://github.com/comitanigiacomo', label: 'GitHub', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/giacomo-comitani-249384326/', label: 'LinkedIn', Icon: FaLinkedin },
  { href: 'https://www.instagram.com/giacomo.comitani', label: 'Instagram', Icon: FaInstagram },
];

function formatProjectCount(status, projectCount) {
  return status === 'success' ? String(projectCount) : '—';
}

export default function About() {
  const { lang } = useLang();
  const a = translations[lang].about;
  const { ref: heroRef, isInView } = useInView({ threshold: 0.05 });
  const { status, projects } = useRepoStats();

  return (
    <div id="about" className={`about-hero ${isInView ? 'about-hero--visible' : ''}`} ref={heroRef}>
      <div className="about-hero__inner">

        <div className="about-hero__left">

          <span className="about-hero__eyebrow">{a.eyebrow}</span>
          <h1 className="about-hero__name">{a.name}</h1>

          <p className="about-hero__role">{a.role}</p>

          <div className="about-hero__currently">
            <p className="about-currently__label">
              <span className="about-currently__dot" aria-hidden="true" />
              {a.currentlyLabel}
            </p>
            <p className="about-currently__courses">
              {a.currentlyCourses[0]}
              <span className="about-currently__sep" aria-hidden="true">·</span>
              {a.currentlyCourses[1]}
            </p>
          </div>

          <p className="about-hero__bio">{a.bio1}</p>
          <p className="about-hero__bio">{a.bio2}</p>

          <p className="about-hero__bio about-hero__bio--goal">{a.bio3}</p>

          <div className="about-hero__stats">
            <div className="about-stat">
              <span className="about-stat__value">4+</span>
              <span className="about-stat__label">{a.statsYears}</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__value">{formatProjectCount(status, projects.length)}</span>
              <span className="about-stat__label">{a.statsProjects}</span>
            </div>
          </div>

          <div className="about-hero__footer">
            <div className="about-hero__socials">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <Magnetic key={label} strength={20}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="about-social-link"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </Magnetic>
              ))}
              <span className="about-handle">@comitanigiacomo</span>
            </div>

            <div className="about-hero__cta">
              <a href="/#projects" className="about-btn-primary">
                {a.viewProjects}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  width="13"
                  height="13"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href={cvHref()}
                download={cvFilename()}
                className="about-btn-secondary"
              >
                <FaDownload aria-hidden="true" />
                {a.downloadCv}
              </a>
            </div>
          </div>
        </div>

        <div className="about-hero__right">
          <div className="about-photo-wrap">
            <img
              src="/prova.webp"
              alt="Giacomo Comitani"
              className="about-photo"
              width="420"
              height="560"
              fetchpriority="high"
              decoding="async"
            />
            <div className="about-photo-glare" aria-hidden="true" />
          </div>

          <div className="about-photo__badges">
            <span className="about-lang-badge">{a.langBadgeIt}</span>
            <span className="about-lang-badge">{a.langBadgeEn}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
