import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../../blog/registry.js';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

const BlogIndex = () => {
  return (
    <div className="blog-layout">
      <header className="blog-site-header">
        <Link to="/" className="blog-back-home">← Back to Portfolio</Link>
        <h1 className="blog-site-title">Writing</h1>
        <p className="blog-site-subtitle">
          Notes on systems, machine learning, and autonomous hardware.
        </p>
      </header>

      <main className="blog-index-list">
        {posts.length === 0 && (
          <p className="blog-empty">No posts yet. Check back soon.</p>
        )}
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <Link to={`/blog/${post.slug}`} className="blog-card-link">
              <div className="blog-card-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.tags.map((t) => (
                  <span key={t} className="blog-tag">{t}</span>
                ))}
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-summary">{post.summary}</p>
              <span className="blog-card-read">Read →</span>
            </Link>
          </article>
        ))}
      </main>

      <footer className="blog-footer">
        <Link to="/" className="blog-back-home">← Back to Portfolio</Link>
      </footer>
    </div>
  );
};

export default BlogIndex;
