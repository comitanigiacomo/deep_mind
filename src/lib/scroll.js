const SECTION_SCROLL_BLOCK = 'start';

/**
 * Scrolls the document to a section by id.
 * Returns false when the target does not exist, so callers can fall back to routing.
 */
export function scrollToSection(sectionId, { behavior = 'smooth' } = {}) {
  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior, block: SECTION_SCROLL_BLOCK });
  return true;
}
