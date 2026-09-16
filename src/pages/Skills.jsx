import { useCallback, useState, useEffect, useRef } from 'react';
import KeyboardScene from '../components/keyboardScene';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import './Skills.css';

export default function Skills() {
    const { lang } = useLang();
    const t = translations[lang].skills;

    const [scale, setScale] = useState(1.3);
    const [rotated, setRotated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const resetViewRef = useRef(null);

    useEffect(() => {
        const updateLayout = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            
            if (width <= 480) {
                setScale(1.3);
            } else if (width <= 768) {
                setScale(1.5);
            } else {
                setScale(1.3);
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    const handleKeyHover = useCallback(() => {}, []);
    const handleKeyClick = useCallback(() => {}, []);

    const handleReset = () => {
        if (resetViewRef.current) {
            resetViewRef.current();
            setRotated(false);
        }
    };

    return (
        <section id="skills" className="skills-section">
            <div className="section-title">
                <h2>{t.title}</h2>
                <div className="title-underline"></div>
            </div>

            {isMobile ? (
                /* ── MOBILE LAYOUT (Text/Badges) ── */
                <div className="skills-mobile-container">
                    {t.categories.map((category, idx) => (
                        <div key={idx} className="skills-mobile-category">
                            <h3>{category.name}</h3>
                            <div className="skills-mobile-badges">
                                {category.items.map((item, i) => (
                                    <span key={i} className="skill-badge">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* ── DESKTOP LAYOUT (3D Keyboard) ── */
                <div className="skills-layout">
                    <div className="skills-keyboard-area">
                        <KeyboardScene
                            onKeyHover={handleKeyHover}
                            onKeyClick={handleKeyClick}
                            fixedRotation={[0.5, 0.6, 0]}
                            scale={scale}
                            onResetRef={resetViewRef}
                            onPointerDown={() => setRotated(true)}
                        />
                    </div>

                    <button
                        className={`reset-view-btn${rotated ? ' reset-view-btn--visible' : ''}`}
                        onClick={handleReset}
                        aria-label="Reset view"
                    >
                        <span className="reset-view-btn__prefix">./</span>
                        <span className="reset-view-btn__label">reset_view</span>
                        <svg
                            className="reset-view-btn__icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>
                </div>
            )}
        </section>
    );
}
