import { useEffect, useState } from 'react';

/**
 * Observes a single element and reports whether it entered the viewport.
 * The ref is a callback-style setter, so the observer re-attaches whenever the
 * observed node mounts or unmounts (e.g. a breakpoint switch).
 * Falls back to `true` when IntersectionObserver is unavailable, so content
 * is never permanently hidden on unsupported browsers.
 */
export function useInView({ threshold = 0.1, rootMargin = '0px', triggerOnce = true } = {}) {
  const [element, setElement] = useState(null);
  const [isInView, setIsInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    if (!element || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
          return;
        }

        if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold, rootMargin, triggerOnce]);

  return { ref: setElement, isInView };
}
