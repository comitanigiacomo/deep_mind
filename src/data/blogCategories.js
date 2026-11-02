export const BLOG_CATEGORIES = {
  leetcode: { label: 'LeetCode', color: '#f59e0b' },
  homelab: { label: 'Homelab', color: '#06b6d4' },
  cs: { label: 'CS Theory', color: '#a855f7' },
  tools: { label: 'Tools', color: '#22c55e' },
  dev: { label: 'Dev', color: '#07589D' },
  security: { label: 'Security', color: '#ef4444' },
};

const FALLBACK_CATEGORY = { label: 'Article', color: '#8b8b8b' };

export function resolveBlogCategory(categoryKey) {
  return BLOG_CATEGORIES[categoryKey] || FALLBACK_CATEGORY;
}
