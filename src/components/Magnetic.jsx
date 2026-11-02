import { cloneElement, isValidElement, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { loadGsap } from '../lib/loadGsap';

export default function Magnetic({ children, strength = 15 }) {
  const magneticRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const element = magneticRef.current;
    if (!element || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    if (window.matchMedia('(hover: none)').matches) {
      return undefined;
    }

    let isDisposed = false;
    let removeListeners = () => {};

    loadGsap().then((gsap) => {
      if (isDisposed) {
        return;
      }

      const moveX = gsap.quickTo(element, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      const moveY = gsap.quickTo(element, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });

      const handleMouseMove = (event) => {
        const { height, width, left, top } = element.getBoundingClientRect();
        const offsetX = event.clientX - (left + width / 2);
        const offsetY = event.clientY - (top + height / 2);

        moveX(offsetX * (strength / 100));
        moveY(offsetY * (strength / 100));
      };

      const handleMouseLeave = () => {
        moveX(0);
        moveY(0);
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      removeListeners = () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
        gsap.killTweensOf(element);
      };
    });

    return () => {
      isDisposed = true;
      removeListeners();
    };
  }, [strength, prefersReducedMotion]);

  if (!isValidElement(children)) {
    return children;
  }

  return cloneElement(children, { ref: magneticRef });
}
