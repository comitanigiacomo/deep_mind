const IDLE_TIMEOUT_MS = 2500;
const FALLBACK_DELAY_MS = 200;
const SLOW_CONNECTION_TYPES = new Set(['slow-2g', '2g']);

const getConnection = () =>
  typeof navigator === 'undefined' ? undefined : navigator.connection;

/**
 * Heavy optional assets (three.js, the 3D model) should not be fetched up front
 * on metered or slow connections: in that case the lazy import triggered by the
 * viewport is enough.
 */
export function shouldPreloadHeavyAssets() {
  const connection = getConnection();

  if (!connection) {
    return true;
  }

  if (connection.saveData) {
    return false;
  }

  return !SLOW_CONNECTION_TYPES.has(connection.effectiveType);
}

/**
 * Runs `callback` when the main thread is idle, with a hard timeout so the work
 * still happens on browsers that stay busy. Returns a cancel function.
 *
 * `requestIdleCallback` is not available in Safari, hence the timeout fallback.
 */
export function whenIdle(callback, { timeout = IDLE_TIMEOUT_MS } = {}) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(handle);
  }

  const handle = window.setTimeout(callback, FALLBACK_DELAY_MS);
  return () => window.clearTimeout(handle);
}
