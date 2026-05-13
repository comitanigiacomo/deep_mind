import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

const categories = {
  leetcode: { label: 'LeetCode', color: '#f59e0b' },
  homelab: { label: 'Homelab', color: '#06b6d4' },
  cs: { label: 'CS Theory', color: '#a855f7' },
  tools: { label: 'Tools', color: '#22c55e' },
  dev: { label: 'Dev', color: '#07589D' },
  security: { label: 'Security', color: '#ef4444' },
};

const posts = Object.values(blogPosts);
const featuredId = 'homelab-debian';

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

  const featured = posts.find(p => p.id === featuredId);
  const list = posts.filter(p => p.id !== featuredId);

  const filteredList = activeCategory
    ? list.filter(p => p.category === activeCategory)
    : list;

  return (
    <section id="blog" className="blog-section" ref={sectionRef}>
      <div className={`blog-inner ${visible ? 'blog--visible' : ''}`}>

        {/* Header */}
        <div className="blog-header">
          <div className="section-title">
            <h2>BLOG</h2>
            <div className="title-underline"></div>
          </div>
        </div>

        <p className="blog-subtitle">
          Writeups on algorithms, homelab setups, and CS theory I find worth explaining properly.
        </p>

        {/* Featured */}
        {featured && (
          <Link
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
              <span className="blog-featured__flag">Featured</span>
            </div>
            <h3 className="blog-featured__title">{featured.title}</h3>

            <p className="blog-featured__excerpt">
              Instead of a complex hypervisor setup or multiple Raspberry Pis, I went with a completely minimal approach: a single Debian machine where everything is containerized...
            </p>

            <div className="blog-featured__meta">
              <span>{featured.date}</span>
              <span className="blog-meta-sep" />
              <span>{featured.readingTime}</span>
              <span className="blog-featured__arrow">
                Read
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        )}

        {/* Divider + category filter */}
        <div className="blog-divider-row">
          <div className="blog-rule" />
          <div className="blog-cats">
            <button
              className={`blog-cat-btn ${activeCategory === null ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              All
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

            // Short excerpts for the preview
            let excerpt = '';
            if (post.id === 'sliding-window') excerpt = 'Instead of recalculating everything from scratch for every possible subarray, you maintain a "window" of elements...';
            if (post.id === 'typst-vs-latex') excerpt = 'Faster compile times, a sane syntax, and native scripting. After one semester all my notes live in Typst...';
            if (post.id === 'double-descent') excerpt = 'An intuitive explanation of the double descent risk curve and why classical bias-variance decomposition breaks down...';
            if (post.id === 'kanso-sync') excerpt = "The design decisions behind Kanso's sync engine: Delta-Sync, Optimistic Locking, and conflict resolution...";
            if (post.id === 'nyt-stream') excerpt = 'Moving from static CSVs to real-time data: building a resilient, decoupled streaming pipeline using the New York Times API...';
            if (post.id === 'firmware-crypto-analysis') excerpt = 'Reverse engineering a mobile modem to uncover how obsolete OpenSSL libraries and AES T-table optimizations open the door to cache-timing attacks...';

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
                    <span className="blog-item__title">{post.title}</span>
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
