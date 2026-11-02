/**
 * Single source of truth for the public site identity.
 * Every metadata consumer (document head, sitemap, Open Graph) reads from here,
 * so the canonical domain can never drift between files again.
 */

export const SITE_URL = 'https://portfolio.jack-lab.dev';
export const SITE_NAME = 'Giacomo Comitani';
export const SITE_TITLE = 'Giacomo Comitani | Software Engineer Portfolio';
export const SITE_DESCRIPTION =
  'Portfolio of Giacomo Comitani, Software Engineer. Discover my projects, skills, homelab, and research in computer science and technology.';
export const SITE_IMAGE = `${SITE_URL}/profile.webp`;
export const SITE_LANGUAGE = 'en';

export const DEFAULT_PAGE_METADATA = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
  image: SITE_IMAGE,
  type: 'website',
  noindex: false,
};
