import { useEffect, useState } from 'react';
import './VerticalSectionIndicator.css';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const sectionIds = ['about', 'skills', 'interests', 'education', 'projects', 'homelab', 'research', 'blog', 'contacts'];

export default function VerticalSectionIndicator() {
  const { isDarkMode } = useTheme();
  const { lang } = useLang();
  const sectionNames = translations[lang].sections;
  const [currentSection, setCurrentSection] = useState(sectionNames['about']);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(sectionNames[entry.target.id] || entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lang, sectionNames]);

  return (
    <div className="vertical-line-container">
      <div className="vertical-line top" />
      <div className="section-label">{currentSection}</div>
      <div className="vertical-line bottom" />
    </div>
  );
}
