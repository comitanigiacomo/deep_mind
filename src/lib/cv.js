const CV_FILENAME = 'giacomo-comitani-cv-en.pdf';

/**
 * Returns the public CV filename. There is a single English CV: it is served
 * for both site languages instead of keeping two translations in sync.
 */
export function cvFilename() {
  return CV_FILENAME;
}

/**
 * Returns the public URL of the CV.
 */
export function cvHref() {
  return `/cv/${CV_FILENAME}`;
}
