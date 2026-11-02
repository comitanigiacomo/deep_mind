import './CategoryLabel.css';

/**
 * Category chip used by the blog list and the article header.
 * The category colour is carried by a decorative dot only: colouring the text
 * itself would fail the WCAG AA contrast requirement for several categories.
 */
export default function CategoryLabel({ category, className = '' }) {
  return (
    <span className={`category-label ${className}`.trim()}>
      <span
        className="category-label__dot"
        style={{ backgroundColor: category.color }}
        aria-hidden="true"
      />
      {category.label}
    </span>
  );
}
