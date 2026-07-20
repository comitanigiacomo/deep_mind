import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, strength = 15 }) {
  const magnetic = useRef(null);

  useEffect(() => {
    // Skip effect on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const el = magnetic.current;
    if (!el) return;

    // GSAP quickTo provides high-performance tracking
    // We use a very soft elastic ease for a "buttery" minimal feel
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      
      // Calculate distance from center of element
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Move slightly towards the mouse based on strength
      xTo(x * (strength / 100));
      yTo(y * (strength / 100));
    };

    const mouseLeave = () => {
      // Snap back to center
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);

    return () => {
      el.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, [strength]);

  // Clone the child element to inject the ref seamlessly
  return React.cloneElement(children, { ref: magnetic });
}
