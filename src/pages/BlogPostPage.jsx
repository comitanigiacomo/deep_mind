import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { blogPostsIT } from '../data/blogPostsIT';
import { resolveBlogCategory } from '../data/blogCategories';
import CategoryLabel from '../components/ui/CategoryLabel';
import LanguageToggle from '../components/ui/LanguageToggle';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useLang } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { SITE_NAME } from '../lib/site';
import { toPlainText } from '../lib/text';
import './BlogPostPage.css';

const META_DESCRIPTION_LENGTH = 160;

export default function BlogPostPage() {
  const { id } = useParams();
  const { lang } = useLang();
  const tr = translations[lang].blogPost;
  const post = blogPosts[id];
  const localizedPost = blogPostsIT[id];
  const content = lang === 'it' && localizedPost ? localizedPost.content : post?.content;
  const title = (lang === 'it' && translations.it.blog.titles?.[id]) || post?.title;
  const description = toPlainText(content, META_DESCRIPTION_LENGTH);

  usePageMetadata({
    title: title ? `${title} | ${SITE_NAME}` : `${tr.notFound} | ${SITE_NAME}`,
    description: description || tr.notFound,
    path: `/blog/${id}`,
    type: 'article',
    noindex: !post,
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const page = document.getElementById('page-content');
    if (page) {
      page.scrollTop = 0;
      // Move focus off the now-inert portfolio shell for keyboard users.
      page.focus({ preventScroll: true });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [id]);

  if (!post) {
    return (
      <main id="page-content" tabIndex={-1} className="blog-post-page not-found">
        <div className="container">
          <h2>{tr.notFound}</h2>
          <Link to="/#blog" className="back-link">{tr.backPortfolio}</Link>
        </div>
      </main>
    );
  }

  const category = resolveBlogCategory(post.category);

  return (
    <main id="page-content" tabIndex={-1} className="blog-post-page">
      <nav className="blog-post-nav">
        <Link to="/#blog" className="blog-post-nav-back">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {tr.back}
        </Link>

        <div className="blog-post-nav-right">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>

      <article className="blog-post-content">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <CategoryLabel category={category} className="blog-post-cat" />
            <span className="blog-post-date">{post.date}</span>
            <span className="blog-post-time">{post.readingTime} {tr.readingTime}</span>
          </div>
          <h1 className="blog-post-title">{title}</h1>
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
    </main>
  );
}
