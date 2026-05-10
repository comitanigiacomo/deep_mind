import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { blogPosts } from '../data/blogPosts';
import { useTheme } from '../context/ThemeContext';
import './BlogPostPage.css';

const categories = {
  leetcode: { label: 'LeetCode',  color: '#f59e0b' },
  homelab:  { label: 'Homelab',   color: '#06b6d4' },
  cs:       { label: 'CS Theory', color: '#a855f7' },
  tools:    { label: 'Tools',     color: '#22c55e' },
  dev:      { label: 'Dev',       color: '#07589D' },
};

export default function BlogPostPage() {
  const { id } = useParams();
  const { isDarkMode, toggleTheme } = useTheme();
  const post = blogPosts[id];

  useEffect(() => {
    // Scroll the overlay to top
    const page = document.querySelector('.blog-post-page');
    if (page) page.scrollTop = 0;
    
    // Prevent background from scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!post) {
    return (
      <div className="blog-post-page not-found">
        <div className="container">
          <h2>Post not found</h2>
          <Link to="/#blog" className="back-link">← Back to portfolio</Link>
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
          Back
        </Link>
        
        <div className="blog-post-nav-right">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn-blog"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
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
          <h1 className="blog-post-title">{post.title}</h1>
        </header>

        <div 
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <footer className="blog-post-footer">
        <div className="blog-post-footer-inner">
          <p>Thanks for reading.</p>
          <Link to="/#blog" className="back-link-bottom">
            ← Back to all posts
          </Link>
        </div>
      </footer>
    </div>
  );
}
