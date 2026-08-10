import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { posts } from '../../blog/registry.js';
import { parseMarkdown } from '../../blog/parseMarkdown.js';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);

  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
      return;
    }
    setLoading(true);
    post.file()
      .then((mod) => {
        setHtml(parseMarkdown(mod.default));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load post.');
        setLoading(false);
      });
  }, [slug]);

  if (!post) return null;

  return (
    <div className="blog-layout">
      <header className="blog-post-header">
        <Link to="/blog" className="blog-back-home">← All Posts</Link>
        <div className="blog-post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags.map((t) => (
            <span key={t} className="blog-tag">{t}</span>
          ))}
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
        {post.summary && (
          <p className="blog-post-summary">{post.summary}</p>
        )}
      </header>

      <main className="blog-post-body">
        {loading && <p className="blog-loading">Loading…</p>}
        {error && <p className="blog-error">{error}</p>}
        {!loading && !error && (
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </main>

      <footer className="blog-footer">
        <Link to="/blog" className="blog-back-home">← All Posts</Link>
        <Link to="/" className="blog-back-home" style={{ marginLeft: '1.5rem' }}>← Portfolio</Link>
      </footer>
    </div>
  );
};

export default BlogPost;
