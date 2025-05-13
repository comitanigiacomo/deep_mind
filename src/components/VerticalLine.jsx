// components/VerticalLine.jsx
import React, { useState, useEffect } from 'react';
import './VerticalLine.css';

const VerticalLine = () => {
  const [currentSection, setCurrentSection] = useState('about');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  return (
    <div className="vertical-line">
      <div className="section-name">
        {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
      </div>
    </div>
  );
};

export default VerticalLine;
