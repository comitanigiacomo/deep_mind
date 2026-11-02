import BootTerminal from '../components/BootTerminal';
import { GithubIcon } from '../components/icons/GithubIcon';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useInView } from '../hooks/useInView';
import './Homelab.css';

const SERVICES_META = [
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

const STACK_ITEMS = [
  { label: 'OS', value: 'Debian 12 (Clean Host)' },
  { label: 'Runtime', value: 'Docker Engine' },
  { label: 'Deployment', value: 'Docker Compose' },
  { label: 'Network', value: 'Tailscale (Zero Trust)' },
  { label: 'Ingress', value: 'Nginx Proxy Manager' },
  { label: 'Databases', value: 'PostgreSQL / Redis' },
];

const ARCHITECTURE_SERVICES = [
  'Kanso',
  'Portfolio',
  'Nextcloud',
  'Immich',
  'Vaultwarden',
  'Vikunja',
  'Portainer',
  'Glance',
];

function resolveServiceMeta(index) {
  return SERVICES_META[index % SERVICES_META.length];
}

function ArchitectureLayer({ label, variant, children, isLast = false }) {
  const nodesClassName = variant ? `arch-nodes ${variant}` : 'arch-nodes';

  return (
    <>
      <div className="arch-layer">
        <span className="arch-label">{label}</span>
        <div className={nodesClassName}>{children}</div>
      </div>
      {!isLast && <div className="arch-arrow" aria-hidden="true">↓</div>}
    </>
  );
}

export default function Homelab() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 });
  const { lang } = useLang();
  const tr = translations[lang].homelab;
  const layers = tr.layers;

  const services = tr.services.map((service, index) => ({
    ...service,
    ...resolveServiceMeta(index),
  }));

  return (
    <section id="homelab" className="homelab-section" ref={sectionRef}>
      <div className={`homelab-inner ${isInView ? 'homelab--visible' : ''}`}>

        <div className="section-title">
          <h2>{tr.title}</h2>
          <div className="title-underline" />
        </div>
        <p className="homelab-subtitle">{tr.subtitle}</p>

        <BootTerminal />

        <div className="homelab-arch">
          <div className="arch-terminal">
            <div className="arch-terminal__bar">
              <span className="arch-dot arch-dot--red" aria-hidden="true" />
              <span className="arch-dot arch-dot--yellow" aria-hidden="true" />
              <span className="arch-dot arch-dot--green" aria-hidden="true" />
              <span className="arch-terminal__title">{tr.archTitle}</span>
            </div>

            <div className="arch-terminal__body">
              <ArchitectureLayer label={layers.baremetal}>
                <span className="arch-node arch-node--host">Clean Debian 12</span>
                <span className="arch-node arch-node--host">Docker Engine</span>
              </ArchitectureLayer>

              <ArchitectureLayer label={layers.storage}>
                <span className="arch-node arch-node--data">Docker Volumes</span>
                <span className="arch-node arch-node--data">Bind Mounts</span>
              </ArchitectureLayer>

              <ArchitectureLayer label={layers.services} variant="arch-nodes--services">
                {ARCHITECTURE_SERVICES.map((serviceName) => (
                  <span key={serviceName} className="arch-node arch-node--service">{serviceName}</span>
                ))}
              </ArchitectureLayer>

              <ArchitectureLayer label={layers.dns}>
                <span className="arch-node arch-node--proxy">Pi-hole (Local DNS)</span>
                <span className="arch-node arch-node--proxy">Nginx Proxy Manager</span>
              </ArchitectureLayer>

              <ArchitectureLayer label={layers.external} isLast>
                <span className="arch-node arch-node--ext">Tailscale (VPN Mesh)</span>
                <span className="arch-node arch-node--ext arch-node--hardened">Zero Open Ports</span>
              </ArchitectureLayer>
            </div>
          </div>

          <div className="homelab-stack">
            <h4 className="homelab-stack__title">{tr.stackTitle}</h4>
            {STACK_ITEMS.map(({ label, value }) => (
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
              <GithubIcon size={16} />
              {tr.viewGithub}
            </a>
          </div>
        </div>

        <h3 className="homelab-services__heading">{tr.runningServices}</h3>
        <div className="homelab-services">
          {services.map((service, index) => (
            <a
              key={service.name}
              href={service.link || '#'}
              target={service.link ? '_blank' : undefined}
              rel={service.link ? 'noopener noreferrer' : undefined}
              className="homelab-card"
              style={{ '--card-color': service.color, '--delay': `${index * 0.06}s`, textDecoration: 'none' }}
            >
              <div className="homelab-card__icon" style={{ color: service.color }} aria-hidden="true">
                {service.icon}
              </div>
              <div className="homelab-card__body">
                <div className="homelab-card__name">
                  {service.name}
                  {service.link && <span className="homelab-card__live" aria-hidden="true">↗</span>}
                </div>
                <p className="homelab-card__desc">{service.description}</p>
                <div className="homelab-card__tags">
                  {service.tags.map((tag) => <span key={tag} className="homelab-tag">{tag}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
