import { beforeEach, describe, expect, it } from 'vitest';
import { applyPageMetadata, buildCanonicalUrl } from './metadata';
import { SITE_URL } from './site';

describe('buildCanonicalUrl', () => {
  it('normalises the root path', () => {
    expect(buildCanonicalUrl('/')).toBe(`${SITE_URL}/`);
  });

  it('strips trailing slashes', () => {
    expect(buildCanonicalUrl('/blog/post/')).toBe(`${SITE_URL}/blog/post`);
  });
});

describe('applyPageMetadata', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('creates every tag on first use', () => {
    applyPageMetadata({ title: 'Custom title', description: 'Custom description', path: '/blog/post' });

    expect(document.title).toBe('Custom title');
    expect(document.querySelector('meta[name="description"]').content).toBe('Custom description');
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      `${SITE_URL}/blog/post`,
    );
    expect(document.querySelector('meta[property="og:title"]').content).toBe('Custom title');
    expect(document.querySelector('meta[name="robots"]').content).toBe('index, follow');
  });

  it('updates existing tags instead of duplicating them', () => {
    applyPageMetadata({ title: 'First' });
    applyPageMetadata({ title: 'Second' });

    expect(document.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);
    expect(document.querySelector('meta[property="og:title"]').content).toBe('Second');
  });

  it('emits a noindex directive when requested', () => {
    applyPageMetadata({ noindex: true });

    expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, nofollow');
  });
});
