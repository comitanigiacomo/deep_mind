import { useRef, useEffect, useState } from 'react';
import './Blog.css';

const BLOG_URL = 'https://blog.jack-lab.dev';

const categories = {
  leetcode: { label: 'LeetCode',  color: '#f59e0b' },
  homelab:  { label: 'Homelab',   color: '#06b6d4' },
  cs:       { label: 'CS Theory', color: '#a855f7' },
  tools:    { label: 'Tools',     color: '#22c55e' },
  dev:      { label: 'Dev',       color: '#07589D' },
};

const posts = [
  {
    id: 1,
    featured: true,
    category: 'homelab',
    title: 'How I self-host everything on a single Debian box',
    excerpt:
      'From Pi-hole to Vaultwarden: a walkthrough of my homelab stack — why I chose each service, how they are wired together with Nginx Proxy Manager, and the shell scripts that make the whole thing reproducible.',
    date: 'May 2025',
    readingTime: '8 min',
  },
  {
    id: 2,
    category: 'leetcode',
    title: 'Sliding Window: the pattern that unlocked 40+ problems for me',
    excerpt:
      'Once I understood the invariant behind sliding window, subarray problems became formulaic. Here is the mental model I use, with three progressively harder examples.',
    date: 'Apr 2025',
    readingTime: '6 min',
  },
  {
    id: 3,
    category: 'tools',
    title: 'Why I switched from LaTeX to Typst for my university notes',
    excerpt:
      'Faster compile times, a sane syntax, and native scripting. After one semester all my notes live in Typst — here is what I gained and what I had to give up.',
    date: 'Mar 2025',
    readingTime: '5 min',
  },
  {
    id: 4,
    category: 'cs',
    title: 'Double Descent: when more data makes your model worse (then better)',
    excerpt:
      'An intuitive explanation of the double descent risk curve and why classical bias-variance decomposition breaks down in overparameterised models.',
    date: 'Feb 2025',
    readingTime: '10 min',
  },
  {
    id: 5,
    category: 'dev',
    title: 'Building an offline-first sync engine in Go',
    excerpt:
      'The design decisions behind Kanso\'s sync engine: CRDTs vs timestamps, Redis as a message broker, and conflict resolution without a central clock.',
    date: 'Jan 2025',
    readingTime: '12 min',
  },
];

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

  const featured = posts.find(p => p.featured);
  const list = posts.filter(p => !p.featured);

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
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-visit-link"
          >
            blog.jack-lab.dev
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <p className="blog-subtitle">
          Writeups on algorithms, homelab setups, and CS theory I find worth explaining properly.
        </p>

        {/* Featured */}
        {featured && (
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
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
            <p className="blog-featured__excerpt">{featured.excerpt}</p>
            <div className="blog-featured__meta">
              <span>{featured.date}</span>
              <span className="blog-meta-sep" />
              <span>{featured.readingTime} read</span>
              <span className="blog-featured__arrow">
                Read
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </a>
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
            return (
              <li
                key={post.id}
                className="blog-item"
                style={{ '--delay': `${i * 0.07}s` }}
              >
                <a
                  href={BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-item__link"
                >
                  <div className="blog-item__left">
                    <span className="blog-item__cat" style={{ color: cat.color }}>
                      {cat.label}
                    </span>
                    <span className="blog-item__title">{post.title}</span>
                    <span className="blog-item__excerpt">{post.excerpt}</span>
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
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="blog-footer">
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-all-link"
          >
            Read all posts on the blog
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
