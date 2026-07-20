import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const el = cursorRef.current;
    if (!el) return;

    // Fast, smooth tracking
    const xTo = gsap.quickTo(el, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.15, ease: "power3.out" });

    const moveCursor = (e) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('social-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave); // When mouse leaves window

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // If not a hover device, render nothing
  if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor-wrapper ${isHovering ? 'hovering' : ''}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="custom-cursor-dot"></div>
    </div>
  );
}
