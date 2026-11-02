const HTML_TAG_PATTERN = /<[^>]*>/g;
const WHITESPACE_PATTERN = /\s+/g;
const DEFAULT_EXCERPT_LENGTH = 160;

/**
 * Converts HTML content into a plain-text excerpt suitable for meta descriptions.
 */
export function toPlainText(html, maxLength = DEFAULT_EXCERPT_LENGTH) {
  if (typeof html !== 'string') {
    return '';
  }

  const plainText = html.replace(HTML_TAG_PATTERN, ' ').replace(WHITESPACE_PATTERN, ' ').trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return `${truncated.slice(0, lastSpaceIndex > 0 ? lastSpaceIndex : maxLength)}…`;
}
