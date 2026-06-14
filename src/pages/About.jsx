import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';

const baseStats = [
  { key: 'years',    value: '4+', label: 'Years of CS' },
  { key: 'projects', value: '—',  label: 'Projects' },
];

export default function About() {
  const heroRef = useRef(null);
  const [projectCount, setProjectCount] = useState('—');

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

          <span className="about-hero__eyebrow">Hello, I'm</span>
          <h1 className="about-hero__name">Jack</h1>

          <p className="about-hero__role">
            MSc Computer Science · University of Milan
          </p>

          <div className="about-hero__currently">
            <p className="about-currently__label">
              <span className="about-currently__dot" />
              Currently studying:
            </p>
            <p className="about-currently__courses">
              Numerical Calculus
              <span className="about-currently__sep">·</span>
              Statistical Methods for Machine Learning
            </p>
          </div>

          <p className="about-hero__bio">
            CS graduate from Milan, focused on systems programming.
            Currently in my MSc, actively exploring the field — still figuring out
            which corner of computer science I want to make my own.
          </p>

          <p className="about-hero__bio">
            My thesis analyzed how obsolete cryptographic libraries in mobile modems
            expose devices to a range of attacks — mapping the vulnerability surface
            and visualizing update trends to understand why these libraries stay outdated.
            Outside uni I run a self-hosted homelab, grind LeetCode, and write notes
            to organize my thoughts.
          </p>

          <p className="about-hero__bio about-hero__bio--goal">
            My goal is to find what truly excites me in this field
            and turn it into my work — so I never get bored.
          </p>

          <div className="about-hero__stats">
            {baseStats.map((s) => (
              <div key={s.key} className="about-stat">
                <span className="about-stat__value">
                  {s.key === 'projects' ? projectCount : s.value}
                </span>
                <span className="about-stat__label">{s.label}</span>
              </div>
            ))}
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
              View Projects
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right: big photo ── */}
        <div className="about-hero__right">
          <div className="about-photo-wrap">
            <img
              src="/prova.jpeg"
              alt="Jack Comitani"
              className="about-photo"
            />
            <div className="about-photo-glare" />
          </div>
        </div>

      </div>
    </div>
  );
}