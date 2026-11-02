import { DEFAULT_PAGE_METADATA, SITE_NAME, SITE_URL } from './site';

const ROBOTS_INDEX = 'index, follow';
const ROBOTS_NOINDEX = 'noindex, nofollow';

function findOrCreateMeta(attributeName, attributeValue) {
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  const existing = document.head.querySelector(selector);

  if (existing) {
    return existing;
  }

  const element = document.createElement('meta');
  element.setAttribute(attributeName, attributeValue);
  document.head.append(element);
  return element;
}

function findOrCreateCanonicalLink() {
  const existing = document.head.querySelector('link[rel="canonical"]');

  if (existing) {
    return existing;
  }

  const element = document.createElement('link');
  element.setAttribute('rel', 'canonical');
  document.head.append(element);
  return element;
}

/**
 * Normalises any application path into an absolute, canonical URL.
 * Trailing slashes are stripped to avoid duplicate-content variants.
 */
export function buildCanonicalUrl(path = '/') {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  return `${SITE_URL}${normalizedPath}`;
}

/**
 * Applies the document metadata for a single page.
 * Pure DOM side effect, therefore kept outside React and unit-testable.
 */
export function applyPageMetadata(overrides = {}) {
  const { title, description, path, image, type, noindex } = {
    ...DEFAULT_PAGE_METADATA,
    ...overrides,
  };
  const canonicalUrl = buildCanonicalUrl(path);

  document.title = title;

  findOrCreateMeta('name', 'description').content = description;
  findOrCreateMeta('name', 'robots').content = noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX;

  findOrCreateMeta('property', 'og:site_name').content = SITE_NAME;
  findOrCreateMeta('property', 'og:type').content = type;
  findOrCreateMeta('property', 'og:title').content = title;
  findOrCreateMeta('property', 'og:description').content = description;
  findOrCreateMeta('property', 'og:url').content = canonicalUrl;
  findOrCreateMeta('property', 'og:image').content = image;

  findOrCreateMeta('name', 'twitter:card').content = 'summary_large_image';
  findOrCreateMeta('name', 'twitter:title').content = title;
  findOrCreateMeta('name', 'twitter:description').content = description;
  findOrCreateMeta('name', 'twitter:image').content = image;

  findOrCreateCanonicalLink().href = canonicalUrl;
}
