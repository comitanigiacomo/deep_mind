import '@testing-library/jest-dom/vitest';

/**
 * jsdom does not implement matchMedia, which the theme and responsive hooks
 * depend on. A static, non-matching implementation is enough for unit tests.
 */
if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

if (typeof window.scrollTo !== 'function') {
  window.scrollTo = () => {};
}

if (typeof Element.prototype.scrollIntoView !== 'function') {
  Element.prototype.scrollIntoView = () => {};
}
