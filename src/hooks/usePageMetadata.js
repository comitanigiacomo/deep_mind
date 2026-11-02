import { useEffect } from 'react';
import { applyPageMetadata } from '../lib/metadata';
import { DEFAULT_PAGE_METADATA } from '../lib/site';

/**
 * Keeps the document head in sync with the active route and restores the
 * default metadata when the component unmounts.
 */
export function usePageMetadata({
  title = DEFAULT_PAGE_METADATA.title,
  description = DEFAULT_PAGE_METADATA.description,
  path = DEFAULT_PAGE_METADATA.path,
  image = DEFAULT_PAGE_METADATA.image,
  type = DEFAULT_PAGE_METADATA.type,
  noindex = DEFAULT_PAGE_METADATA.noindex,
} = {}) {
  useEffect(() => {
    applyPageMetadata({ title, description, path, image, type, noindex });
    return () => applyPageMetadata(DEFAULT_PAGE_METADATA);
  }, [title, description, path, image, type, noindex]);
}
