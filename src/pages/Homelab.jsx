import { useRef, useEffect, useState } from 'react';
import './Homelab.css';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const servicesMeta = [
  { icon: '⬡', color: '#06b6d4' },
  { icon: '⇄', color: '#07589D' },
  { icon: '⦻', color: '#f43f5e' },
  { icon: '▣', color: '#3b82f6' },
  { icon: '☁', color: '#0ea5e9' },
  { icon: '◎', color: '#a855f7' },
  { icon: '⊛', color: '#22c55e' },
  { icon: '✓', color: '#f59e0b' },
  { icon: '◈', color: '#07589D' },
  { icon: '◆', color: '#06b6d4' },
];

const stackItems = [
  { label: 'OS',         value: 'Debian 12 (Clean Host)' },
  { label: 'Runtime',    value: 'Docker Engine' },
  { label: 'Deployment', value: 'Docker Compose' },
  { label: 'Network',    value: 'Tailscale (Zero Trust)' },
  { label: 'Ingress',    value: 'Nginx Proxy Manager' },
  { label: 'Databases',  value: 'PostgreSQL / Redis' },
];

function useInView(threshold = 0.15) {
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

export default function Homelab() {
  const [sectionRef, sectionVisible] = useInView();
  const { lang } = useLang();
  const tr = translations[lang].homelab;
  const layers = tr.layers;

  const services = tr.services.map((svc, i) => ({
    ...svc,
    icon: servicesMeta[i].icon,
    color: servicesMeta[i].color,
  }));

  return (
    <section id="homelab" className="homelab-section" ref={sectionRef}>
      <div className={`homelab-inner ${sectionVisible ? 'homelab--visible' : ''}`}>

        {/* Header */}
        <div className="section-title">
          <h2>{tr.title}</h2>
          <div className="title-underline"></div>
        </div>
        <p className="homelab-subtitle">{tr.subtitle}</p>

        {/* Architecture banner */}
        <div className="homelab-arch">
          <div className="arch-terminal">
            <div className="arch-terminal__bar">
              <span className="arch-dot arch-dot--red" />
              <span className="arch-dot arch-dot--yellow" />
              <span className="arch-dot arch-dot--green" />
              <span className="arch-terminal__title">{tr.archTitle}</span>
            </div>
            
            <div className="arch-terminal__body">
              {/* Level 5: Host (base) */}
              <div className="arch-layer">
                <span className="arch-label">{layers.baremetal}</span>
                <div className="arch-nodes">
                  <span className="arch-node arch-node--host">Clean Debian 12</span>
                  <span className="arch-node arch-node--host">Docker Engine</span>
                </div>
              </div>
              <div className="arch-arrow">↓</div>

              {/* Level 4: Storage */}
              <div className="arch-layer">
                <span className="arch-label">{layers.storage}</span>
                <div className="arch-nodes">
                  <span className="arch-node arch-node--data">Docker Volumes</span>
                  <span className="arch-node arch-node--data">Bind Mounts</span>
                </div>
              </div>
              <div className="arch-arrow">↓</div>

              {/* Level 3: Services */}
              <div className="arch-layer">
                <span className="arch-label">{layers.services}</span>
                <div className="arch-nodes arch-nodes--services">
                  {['Kanso', 'Portfolio', 'Nextcloud', 'Immich', 'Vaultwarden', 'Vikunja', 'Portainer', 'Glance'].map(s => (
                    <span key={s} className="arch-node arch-node--service">{s}</span>
                  ))}
                </div>
              </div>
              <div className="arch-arrow">↓</div>

              {/* Level 2: DNS & Routing */}
              <div className="arch-layer">
                <span className="arch-label">{layers.dns}</span>
                <div className="arch-nodes">
                  <span className="arch-node arch-node--proxy">Pi-hole (Local DNS)</span>
                  <span className="arch-node arch-node--proxy">Nginx Proxy Manager</span>
                </div>
              </div>
              <div className="arch-arrow">↓</div>

              {/* Level 1: Network Entry (Zero Trust) */}
              <div className="arch-layer">
                <span className="arch-label">{layers.external}</span>
                <div className="arch-nodes">
                  <span className="arch-node arch-node--ext">Tailscale (VPN Mesh)</span>
                  <span className="arch-node arch-node--ext" style={{color: '#22c55e', borderColor: '#22c55e'}}>Zero Open Ports</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stack pills */}
          <div className="homelab-stack">
            <h4 className="homelab-stack__title">{tr.stackTitle}</h4>
            {stackItems.map(({ label, value }) => (
              <div key={label} className="homelab-stack__item">
                <span className="homelab-stack__label">{label}</span>
                <span className="homelab-stack__value">{value}</span>
              </div>
            ))}
            <a
              href="https://github.com/comitanigiacomo/homelab"
              target="_blank"
              rel="noopener noreferrer"
              className="homelab-github-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              {tr.viewGithub}
            </a>
          </div>
        </div>

        {/* Service cards */}
        <h3 className="homelab-services__heading">{tr.runningServices}</h3>
        <div className="homelab-services">
          {services.map((svc, i) => (
            <a
              key={svc.name}
              href={svc.link || '#'}
              target={svc.link ? '_blank' : undefined}
              rel={svc.link ? 'noopener noreferrer' : undefined}
              className="homelab-card"
              style={{ '--card-color': svc.color, '--delay': `${i * 0.06}s`, textDecoration: 'none' }}
            >
              <div className="homelab-card__icon" style={{ color: svc.color }}>{svc.icon}</div>
              <div className="homelab-card__body">
                <div className="homelab-card__name">
                  {svc.name}
                  {svc.link && (
                    <span className="homelab-card__live">↗</span>
                  )}
                </div>
                <p className="homelab-card__desc">{svc.description}</p>
                <div className="homelab-card__tags">
                  {svc.tags.map(t => <span key={t} className="homelab-tag">{t}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}