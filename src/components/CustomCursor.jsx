import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { loadGsap } from '../lib/loadGsap';
import './CustomCursor.css';

const POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], .social-card';
const TEXT_INPUT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';
const CURSOR_ATTRIBUTE = 'data-custom-cursor';

export default function CustomCursor() {
  const hasFinePointer = useMediaQuery(POINTER_QUERY);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isEnabled = hasFinePointer && !prefersReducedMotion;

  const cursorRef = useRef(null);
  const isVisibleRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const cursorElement = cursorRef.current;
    if (!cursorElement) {
      return undefined;
    }

    let isDisposed = false;
    let removeListeners = () => {};

    loadGsap().then((gsap) => {
      if (isDisposed) {
        return;
      }

      const moveX = gsap.quickTo(cursorElement, 'x', { duration: 0.15, ease: 'power3.out' });
      const moveY = gsap.quickTo(cursorElement, 'y', { duration: 0.15, ease: 'power3.out' });

      const handlePointerMove = (event) => {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }

        moveX(event.clientX);
        moveY(event.clientY);
      };

      const handlePointerOver = (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        const isOverInteractive = target.closest(INTERACTIVE_SELECTOR) !== null;
        const isOverTextInput = target.closest(TEXT_INPUT_SELECTOR) !== null;
        setIsHovering(isOverInteractive && !isOverTextInput);
      };

      const handlePointerLeave = () => {
        isVisibleRef.current = false;
        setIsVisible(false);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerover', handlePointerOver);
      document.addEventListener('pointerleave', handlePointerLeave);

      removeListeners = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerover', handlePointerOver);
        document.removeEventListener('pointerleave', handlePointerLeave);
        gsap.killTweensOf(cursorElement);
      };

      // The native cursor is hidden only once the custom one is ready to render.
      document.documentElement.setAttribute(CURSOR_ATTRIBUTE, 'enabled');
    });

    return () => {
      isDisposed = true;
      removeListeners();
      document.documentElement.removeAttribute(CURSOR_ATTRIBUTE);
      isVisibleRef.current = false;
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor-wrapper ${isHovering ? 'hovering' : ''}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="custom-cursor-dot" />
    </div>
  );
}
