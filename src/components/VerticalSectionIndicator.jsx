import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import './VerticalSectionIndicator.css';

const SECTION_IDS = [
  'about',
  'skills',
  'interests',
  'education',
  'projects',
  'homelab',
  'research',
  'blog',
  'contacts',
];

export default function VerticalSectionIndicator() {
  const { lang } = useLang();
  const sectionNames = translations[lang].sections;
  const [currentSectionId, setCurrentSectionId] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSectionId(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );

    SECTION_IDS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const currentSectionLabel = sectionNames[currentSectionId] || currentSectionId;

  return (
    <div className="vertical-line-container" aria-hidden="true">
      <div className="vertical-line top" />
      <div className="section-label">{currentSectionLabel}</div>
      <div className="vertical-line bottom" />
    </div>
  );
}
