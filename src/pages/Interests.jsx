import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import './Interests.css';

export default function Interests() {
  const { lang } = useLang();
  const interests = translations[lang].interests.items;

  return (
    <div className="interests-page-wrapper">
      <div className="interests-page-container">
        <h3 className="interests-page-title">
          <span className="interests-title-dot" aria-hidden="true" />
          {translations[lang].interests.pageTitle}
        </h3>

        <div className="interests-page-list">
          {interests.map((interest, index) => (
            <div key={interest.title} className="interests-page-row">
              <div className="interests-row-left">
                <span className="interests-num">{String(index + 1).padStart(2, '0')}</span>
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
