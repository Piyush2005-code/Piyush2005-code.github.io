// ─── BLOG REGISTRY ────────────────────────────────────────────────────────────
// To publish a new post:
//   1. Write your article as  src/blog/posts/<slug>.md
//   2. Add one entry to this array (most-recent first)
//   3. Drop any images in  public/blog-images/
//   4. git add . && git commit && git push dep  → auto-deploys
//
// Medium compatibility: the same .md file can be imported directly into
// Medium via  ... → Import a story
// ──────────────────────────────────────────────────────────────────────────────

export const posts = [
  {
    slug: 'hello-world',
    title: 'Hello, Blog.',
    date: '2026-08-09',
    summary: 'First post — testing the blog pipeline and showing all supported Markdown features.',
    tags: ['meta', 'blog'],
    // Dynamic import: the markdown is only fetched when the post is opened
    file: () => import('./posts/hello-world.md?raw'),
  },
];
