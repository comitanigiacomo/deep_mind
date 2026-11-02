import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { BLOG_CATEGORIES, resolveBlogCategory } from '../data/blogCategories';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useInView } from '../hooks/useInView';
import CategoryLabel from '../components/ui/CategoryLabel';
import './Blog.css';

const FEATURED_POST_IDS = ['minimal-aesthetic', 'homelab-debian'];
const POSTS = Object.values(blogPosts);
const FEATURED_POSTS = POSTS.filter((post) => FEATURED_POST_IDS.includes(post.id));
const REGULAR_POSTS = POSTS.filter((post) => !FEATURED_POST_IDS.includes(post.id));

function CategoryFilter({ activeCategory, onSelect, allLabel }) {
  return (
    <div className="blog-cats">
      <button
        type="button"
        className={`blog-cat-btn ${activeCategory === null ? 'active' : ''}`}
        onClick={() => onSelect(null)}
      >
        {allLabel}
      </button>
      {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
        <button
          key={key}
          type="button"
          className={`blog-cat-btn ${activeCategory === key ? 'active' : ''}`}
          style={activeCategory === key ? { color: category.color, borderColor: category.color } : undefined}
          onClick={() => onSelect(activeCategory === key ? null : key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

function FeaturedPost({ post, titles, excerpts, readLabel, featuredLabel }) {
  const category = resolveBlogCategory(post.category);

  return (
    <Link to={`/blog/${post.id}`} className="blog-featured">
      <div className="blog-featured__top">
        <CategoryLabel category={category} className="blog-cat-label" />
        <span className="blog-featured__flag">{featuredLabel}</span>
      </div>
      <h3 className="blog-featured__title">{titles?.[post.id] || post.title}</h3>

      <p className="blog-featured__excerpt">{excerpts?.[post.id]}</p>

      <div className="blog-featured__meta">
        <span>{post.date}</span>
        <span className="blog-meta-sep" />
        <span>{post.readingTime}</span>
        <span className="blog-featured__arrow">
          {readLabel}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function PostListItem({ post, excerpt, title, delay }) {
  const category = resolveBlogCategory(post.category);

  return (
    <li className="blog-item" style={{ '--delay': `${delay}s` }}>
      <Link to={`/blog/${post.id}`} className="blog-item__link">
        <div className="blog-item__left">
          <CategoryLabel category={category} className="blog-item__cat" />
          <span className="blog-item__title">{title}</span>
          <span className="blog-item__excerpt">{excerpt}</span>
        </div>
        <div className="blog-item__right">
          <span className="blog-item__date">{post.date}</span>
          <span className="blog-item__time">{post.readingTime}</span>
          <svg
            className="blog-item__arrow"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </li>
  );
}

export default function Blog() {
  const { ref: sectionRef, isInView } = useInView();
  const [activeCategory, setActiveCategory] = useState(null);
  const { lang } = useLang();
  const tr = translations[lang].blog;

  const visiblePosts = activeCategory
    ? REGULAR_POSTS.filter((post) => post.category === activeCategory)
    : REGULAR_POSTS;

  return (
    <section className="blog-section" ref={sectionRef}>
      <div className={`blog-inner ${isInView ? 'blog--visible' : ''}`}>

        <div className="blog-header">
          <div className="section-title">
            <h2>{tr.title}</h2>
            <div className="title-underline" />
          </div>
        </div>

        <p className="blog-subtitle">{tr.subtitle}</p>

        {FEATURED_POSTS.map((post) => (
          <FeaturedPost
            key={post.id}
            post={post}
            titles={tr.titles}
            excerpts={tr.excerpts}
            readLabel={tr.read}
            featuredLabel={tr.featured}
          />
        ))}

        <div className="blog-divider-row">
          <div className="blog-rule" />
          <CategoryFilter
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            allLabel={tr.all}
          />
        </div>

        <ul className="blog-list" role="list">
          {visiblePosts.map((post, index) => (
            <PostListItem
              key={post.id}
              post={post}
              title={tr.titles?.[post.id] || post.title}
              excerpt={tr.excerpts?.[post.id] || ''}
              delay={index * 0.07}
            />
          ))}
        </ul>

      </div>
    </section>
  );
}
