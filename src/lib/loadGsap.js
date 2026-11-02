/**
 * GSAP is only needed by pointer-driven effects, so it is loaded on demand
 * instead of being part of the critical JavaScript bundle. The module-level
 * promise guarantees a single shared download across every consumer.
 */
let gsapPromise = null;

export function loadGsap() {
  if (gsapPromise === null) {
    gsapPromise = import('gsap')
      .then((module) => module.default)
      .catch((error) => {
        gsapPromise = null;
        throw error;
      });
  }

  return gsapPromise;
}
