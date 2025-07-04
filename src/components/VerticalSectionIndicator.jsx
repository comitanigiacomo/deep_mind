
import { useEffect, useState } from 'react';
import './VerticalSectionIndicator.css';
import {useTheme} from '../context/ThemeContext'

const sections = [
  { id: 'about',     name: 'About' },
  { id: 'skills',     name: 'Skills' },
  { id: 'interests',     name: 'Interests' },
  { id: 'education', name: 'Education' },
  { id: 'projects',  name: 'Projects' },
  { id: 'contacts',  name: 'Contacts' },
];

export default function VerticalSectionIndicator() {
  const { isDarkMode } = useTheme();
  const [currentSection, setCurrentSection] = useState(sections[0].name);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sec = sections.find(s => s.id === entry.target.id);
          if (sec) setCurrentSection(sec.name);
        }
      });
    }, options);

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="vertical-line-container">
      <div className="vertical-line top" />
      <div className="section-label">{currentSection}</div>
      <div className="vertical-line bottom" />
    </div>
  );
}

