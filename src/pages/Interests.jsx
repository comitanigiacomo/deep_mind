import React from 'react';
import './Interests.css';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export default function Interests() {
  const { lang } = useLang();
  const interests = translations[lang].interests.items;
  const title = lang === 'it' ? 'Oltre lo schermo' : 'Beyond the screen';

  return (
    <div className="interests-page-wrapper">
      <div className="interests-page-container">
        <h3 className="interests-page-title">
          <span className="interests-title-dot"></span>
          {title}
        </h3>
        
        <div className="interests-page-list">
          {interests.map((interest, idx) => (
            <div key={idx} className="interests-page-row">
              <div className="interests-row-left">
                <span className="interests-num">0{idx + 1}</span>
                <h4 className="interests-name">{interest.title}</h4>
              </div>
              <div className="interests-row-right">
                <p className="interests-desc">{interest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}