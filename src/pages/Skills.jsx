import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useInView } from '../hooks/useInView';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { shouldPreloadHeavyAssets, whenIdle } from '../lib/idle';
import './Skills.css';

// Three.js is the heaviest dependency of the project: keep it in a dedicated
// chunk. It is warmed once the browser is idle (see the effect below) and
// mounted only when the keyboard area approaches the viewport.
const KeyboardScene = lazy(loadKeyboardScene);

const KEYBOARD_SCALE = 1.3;
// Start fetching well before the section is visible so the WebGL scene is
// usually ready by the time it reaches the viewport.
const KEYBOARD_PRELOAD_MARGIN = '900px';
const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

function loadKeyboardScene() {
  return import('../components/keyboardScene');
}

export default function Skills() {
  const { lang } = useLang();
  const t = translations[lang].skills;
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
  const { ref: keyboardAreaRef, isInView: isKeyboardAreaVisible } = useInView({
    rootMargin: KEYBOARD_PRELOAD_MARGIN,
    threshold: 0,
  });

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSceneReady, setIsSceneReady] = useState(false);
  const resetViewRef = useRef(null);

  // Warm both the three.js chunk and the GLB (preloaded by the scene module)
  // while the browser is idle. This keeps them out of the initial payload but
  // removes the long black gap on the first visit to this section.
  useEffect(() => {
    if (isMobile || !shouldPreloadHeavyAssets()) {
      return undefined;
    }

    return whenIdle(() => {
      // A failed warm-up must stay silent: the lazy import will surface any real
      // error to the section's error boundary when the scene is actually needed.
      loadKeyboardScene().catch(() => {});
    });
  }, [isMobile]);

  const handleReset = useCallback(() => {
    if (resetViewRef.current) {
      resetViewRef.current();
      setHasInteracted(false);
    }
  }, []);

  const handleSceneReady = useCallback(() => setIsSceneReady(true), []);

  return (
    <section className="skills-section">
      <div className="section-title">
        <h2>{t.title}</h2>
        <div className="title-underline" />
      </div>

      {isMobile ? (
        <div className="skills-mobile-container">
          {t.categories.map((category) => (
            <div key={category.name} className="skills-mobile-category">
              <h3>{category.name}</h3>
              <div className="skills-mobile-badges">
                {category.items.map((item) => (
                  <span key={item} className="skill-badge">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="skills-layout">
          <div className="skills-keyboard-area" ref={keyboardAreaRef}>
            {isKeyboardAreaVisible && (
              <Suspense fallback={null}>
                <KeyboardScene
                  fixedRotation={[0.5, 0.6, 0]}
                  scale={KEYBOARD_SCALE}
                  onResetRef={resetViewRef}
                  onLoaded={handleSceneReady}
                  onPointerDown={() => setHasInteracted(true)}
                />
              </Suspense>
            )}

            {isKeyboardAreaVisible && (
              <div
                className={`keyboard-loader${isSceneReady ? ' keyboard-loader--ready' : ''}`}
                role="status"
                aria-live="polite"
                aria-hidden={isSceneReady || undefined}
              >
                <span className="keyboard-loader__track" aria-hidden="true">
                  <span className="keyboard-loader__bar" />
                </span>
                <span className="keyboard-loader__label">{t.loading}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className={`reset-view-btn${hasInteracted ? ' reset-view-btn--visible' : ''}`}
            onClick={handleReset}
            aria-label={t.resetView || 'Reset view'}
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
              aria-hidden="true"
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
