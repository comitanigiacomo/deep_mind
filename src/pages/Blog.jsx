import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

const categories = {
  leetcode: { label: 'LeetCode', color: '#f59e0b' },
  homelab: { label: 'Homelab', color: '#06b6d4' },
  cs: { label: 'CS Theory', color: '#a855f7' },
  tools: { label: 'Tools', color: '#22c55e' },
  dev: { label: 'Dev', color: '#07589D' },
  security: { label: 'Security', color: '#ef4444' },
};

const posts = Object.values(blogPosts);
const featuredIds = ['minimal-aesthetic', 'homelab-debian'];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Blog() {
  const [sectionRef, visible] = useInView();
  const [activeCategory, setActiveCategory] = useState(null);
  const { lang } = useLang();
  const tr = translations[lang].blog;

  const featuredList = posts.filter(p => featuredIds.includes(p.id));
  const list = posts.filter(p => !featuredIds.includes(p.id));

  const filteredList = activeCategory
    ? list.filter(p => p.category === activeCategory)
    : list;

  return (
    <section id="blog" className="blog-section" ref={sectionRef}>
      <div className={`blog-inner ${visible ? 'blog--visible' : ''}`}>

        {/* Header */}
        <div className="blog-header">
          <div className="section-title">
            <h2>{tr.title}</h2>
            <div className="title-underline"></div>
          </div>
        </div>

        <p className="blog-subtitle">{tr.subtitle}</p>

        {/* Featured */}
        {featuredList.map(featured => (
          <Link
            key={featured.id}
            to={`/blog/${featured.id}`}
            className="blog-featured"
          >
            <div className="blog-featured__top">
              <span
                className="blog-cat-label"
                style={{ color: categories[featured.category].color }}
              >
                {categories[featured.category].label}
              </span>
              <span className="blog-featured__flag">{tr.featured}</span>
            </div>
            <h3 className="blog-featured__title">{tr.titles?.[featured.id] || featured.title}</h3>

            <p className="blog-featured__excerpt">{tr.excerpts?.[featured.id]}</p>

            <div className="blog-featured__meta">
              <span>{featured.date}</span>
              <span className="blog-meta-sep" />
              <span>{featured.readingTime}</span>
              <span className="blog-featured__arrow">
                {tr.read}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}

        {/* Divider + category filter */}
        <div className="blog-divider-row">
          <div className="blog-rule" />
          <div className="blog-cats">
            <button
              className={`blog-cat-btn ${activeCategory === null ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              {tr.all}
            </button>
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                className={`blog-cat-btn ${activeCategory === key ? 'active' : ''}`}
                style={activeCategory === key ? { color: cat.color, borderColor: cat.color } : {}}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Post list */}
        <ul className="blog-list" role="list">
          {filteredList.map((post, i) => {
            const cat = categories[post.category];
            const excerpt = tr.excerpts[post.id] || '';

            return (
              <li
                key={post.id}
                className="blog-item"
                style={{ '--delay': `${i * 0.07}s` }}
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="blog-item__link"
                >
                  <div className="blog-item__left">
                    <span className="blog-item__cat" style={{ color: cat.color }}>
                      {cat.label}
                    </span>
                    <span className="blog-item__title">{tr.titles?.[post.id] || post.title}</span>
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
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
