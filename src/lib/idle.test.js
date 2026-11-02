import { afterEach, describe, expect, it, vi } from 'vitest';
import { shouldPreloadHeavyAssets, whenIdle } from './idle';

function setConnection(connection) {
  Object.defineProperty(navigator, 'connection', {
    configurable: true,
    value: connection,
  });
}

afterEach(() => {
  delete navigator.connection;
  delete window.requestIdleCallback;
  delete window.cancelIdleCallback;
  vi.useRealTimers();
});

describe('shouldPreloadHeavyAssets', () => {
  it('allows the warm-up when the connection API is unavailable', () => {
    expect(shouldPreloadHeavyAssets()).toBe(true);
  });

  it('skips the warm-up when data saver is enabled', () => {
    setConnection({ saveData: true, effectiveType: '4g' });
    expect(shouldPreloadHeavyAssets()).toBe(false);
  });

  it.each(['slow-2g', '2g'])('skips the warm-up on %s', (effectiveType) => {
    setConnection({ saveData: false, effectiveType });
    expect(shouldPreloadHeavyAssets()).toBe(false);
  });

  it('allows the warm-up on 3g and faster', () => {
    setConnection({ saveData: false, effectiveType: '4g' });
    expect(shouldPreloadHeavyAssets()).toBe(true);
  });
});

describe('whenIdle', () => {
  it('falls back to a timeout and can be cancelled', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const cancel = whenIdle(callback);
    cancel();
    vi.advanceTimersByTime(500);

    expect(callback).not.toHaveBeenCalled();
  });

  it('runs the callback when the timeout fallback fires', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    whenIdle(callback);
    vi.advanceTimersByTime(250);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('uses requestIdleCallback when available', () => {
    const idleCallback = vi.fn(() => 42);
    const cancelCallback = vi.fn();
    window.requestIdleCallback = idleCallback;
    window.cancelIdleCallback = cancelCallback;

    const cancel = whenIdle(() => {});
    cancel();

    expect(idleCallback).toHaveBeenCalledWith(expect.any(Function), { timeout: 2500 });
    expect(cancelCallback).toHaveBeenCalledWith(42);
  });
});
