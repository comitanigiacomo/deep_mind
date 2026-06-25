import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function About() {
  const heroRef = useRef(null);
  const [projectCount, setProjectCount] = useState('—');
  const { lang } = useLang();
  const a = translations[lang].about;

  useEffect(() => {
    fetch('/repo_stats.json')
      .then(r => r.json())
      .then(data => setProjectCount(Object.keys(data).length))
      .catch(() => setProjectCount('10+'));
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('about-hero--visible'); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id="about" className="about-hero" ref={heroRef}>
      <div className="about-hero__inner">

        {/* ── Left: text ── */}
        <div className="about-hero__left">

          <span className="about-hero__eyebrow">{a.eyebrow}</span>
          <h1 className="about-hero__name">{a.name}</h1>

          <p className="about-hero__role">{a.role}</p>

          <div className="about-hero__currently">
            <p className="about-currently__label">
              <span className="about-currently__dot" />
              {a.currentlyLabel}
            </p>
            <p className="about-currently__courses">
              {a.currentlyCourses[0]}
              <span className="about-currently__sep">·</span>
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
              <span className="about-stat__value">{projectCount}</span>
              <span className="about-stat__label">{a.statsProjects}</span>
            </div>
          </div>

          <div className="about-hero__footer">
            <div className="about-hero__socials">
              <a
                href="https://github.com/comitanigiacomo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="about-social-link"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/giacomo-comitani-249384326/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="about-social-link"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/giacomo.comitani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="about-social-link"
              >
                <FaInstagram />
              </a>
              <span className="about-handle">@comitanigiacomo</span>
            </div>

            <a href="/#projects" className="about-btn-primary">
              {a.viewProjects}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right: big photo & badges ── */}
        <div className="about-hero__right">
          <div className="about-photo-wrap">
            <img
              src="/prova.jpeg"
              alt="Giacomo Comitani"
              className="about-photo"
              loading="lazy"
            />
            <div className="about-photo-glare"></div>
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