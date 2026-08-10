# Hello, Blog.

*Published: August 9, 2026 · 2 min read*

---

Welcome to my personal blog, living at [piyush2005-code.github.io/blog](/blog).

This is the first post — it exists mainly to test the pipeline and to document how to write future posts.

## How this blog works

Articles are written as plain Markdown (`.md`) files stored in `src/blog/posts/`. To publish a new one:

1. Create `src/blog/posts/my-article.md`
2. Add a single entry to `src/blog/registry.js`
3. Push to the `dep` branch — GitHub Actions handles the rest

That's it. No CMS, no database, no headless anything.

## Markdown features

Everything you'd use on Medium is supported:

### Headings

Use `#`, `##`, `###` for section headings.

### Emphasis

**Bold text** and *italic text* both work, as does `inline code`.

### Links

[Visit my portfolio](/) or link to any external resource like [arXiv](https://arxiv.org).

### Images

Drop images in `public/blog-images/` and reference them like this:

![Sample image — replace with your own](/blog-images/sample.png)

### Code blocks

```python
import torch

model = torch.load('model.pt')
out = model(torch.randn(1, 3, 224, 224))
print(out.shape)
```

### Lists

Unordered:
- State Space Models
- Transformer variants
- Edge inference

Ordered:
1. Benchmark the baseline
2. Profile the bottleneck
3. Optimise — repeat

### Blockquotes

> "Premature optimisation is the root of all evil." — Knuth

---

## Medium compatibility

This `.md` file can be imported directly into Medium:

1. On Medium, click `Write a story`
2. Click the three-dot menu `···`
3. Select **Import a story**
4. Paste this file

The headings, lists, code, and links all map cleanly.

---

That's the whole setup. Future posts will be actual technical writing on systems, ML inference, and autonomous systems.
