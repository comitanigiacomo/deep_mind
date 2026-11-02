import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import './Contact.css';

const SOCIAL_LINKS = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:comitanigiacomo@gmail.com',
    Icon: FaEnvelope,
    className: 'email',
    isExternal: false,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/comitanigiacomo',
    Icon: FaGithub,
    className: 'github',
    isExternal: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/giacomo-comitani-249384326/',
    Icon: FaLinkedin,
    className: 'linkedin',
    isExternal: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/giacomo.comitani',
    Icon: FaInstagram,
    className: 'instagram',
    isExternal: true,
  },
];

export default function Contacts() {
  const { lang } = useLang();
  const tr = translations[lang].contacts;

  return (
    <section className="contact-section">
      <div className="contact-wrapper">

        <div className="profile-container">
          <img
            src="/profile.webp"
            alt=""
            className="profile-photo"
            width="120"
            height="120"
            loading="lazy"
            decoding="async"
          />
          <h2 className="profile-name">Giacomo Comitani</h2>
          <p className="profile-location">{tr.location}</p>
        </div>

        <div className="social-section">
          <div className="social-grid">
            {SOCIAL_LINKS.map(({ id, label, href, Icon, className, isExternal }) => (
              <a
                key={id}
                href={href}
                className="social-card"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                <Icon className={`social-icon ${className}`} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
