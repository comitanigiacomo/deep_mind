import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { blogPosts } from '../data/blogPosts';
import { blogPostsIT } from '../data/blogPostsIT';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './BlogPostPage.css';

const categories = {
  leetcode: { label: 'LeetCode',  color: '#f59e0b' },
  homelab:  { label: 'Homelab',   color: '#06b6d4' },
  cs:       { label: 'CS Theory', color: '#a855f7' },
  tools:    { label: 'Tools',     color: '#22c55e' },
  dev:      { label: 'Dev',       color: '#07589D' },
  security: { label: 'Security',  color: '#ef4444' },
};

import { translations } from '../i18n/translations';

export default function BlogPostPage() {
  const { id } = useParams();
  const { isDarkMode, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const post = blogPosts[id];
  const tr = translations[lang].blogPost;
  const itPost = blogPostsIT[id];
  const content = lang === 'it' && itPost ? itPost.content : post?.content;

  useEffect(() => {
    const page = document.querySelector('.blog-post-page');
    if (page) page.scrollTop = 0;
    
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!post) {
    return (
      <div className="blog-post-page not-found">
        <div className="container">
          <h2>{tr.notFound}</h2>
          <Link to="/#blog" className="back-link">{tr.backPortfolio}</Link>
        </div>
      </div>
    );
  }

  const cat = categories[post.category];

  return (
    <div className="blog-post-page">
      {/* Minimal navbar just for the blog */}
      <nav className="blog-post-nav">
        <Link to="/#blog" className="blog-post-nav-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {tr.back}
        </Link>
        
        <div className="blog-post-nav-right">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="theme-toggle-btn-blog lang-toggle-blog"
            title={lang === 'en' ? "Passa all'italiano" : 'Switch to English'}
            aria-label="Toggle language"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 600, minWidth: 52 }}
          >
            <span style={{ opacity: lang === 'en' ? 1 : 0.3 }}>EN</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span style={{ opacity: lang === 'it' ? 1 : 0.3 }}>IT</span>
          </button>

          <button
            onClick={toggleTheme}
            className="theme-toggle-pill"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            <span className={`theme-toggle-track ${isDarkMode ? 'is-dark' : 'is-light'}`}>
              <span className="theme-toggle-thumb">
                {isDarkMode ? <FaMoon size={10} /> : <FaSun size={10} />}
              </span>
            </span>
          </button>
        </div>
      </nav>

      <article className="blog-post-content">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-post-cat" style={{ color: cat.color }}>{cat.label}</span>
            <span className="blog-post-date">{post.date}</span>
            <span className="blog-post-time">{post.readingTime} read</span>
          </div>
          <h1 className="blog-post-title">
            {lang === 'it' ? (translations.it.blog.titles?.[id] || post.title) : post.title}
          </h1>
        </header>

        <div 
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      <footer className="blog-post-footer">
        <div className="blog-post-footer-inner">
          <p>{tr.thanks}</p>
          <Link to="/#blog" className="back-link-bottom">
            {tr.backAll}
          </Link>
        </div>
      </footer>
    </div>
  );
}
