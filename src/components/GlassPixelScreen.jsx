import React, { useEffect, useRef } from 'react';

const CELL_W = 11;
const CELL_H = 15;
const REVEAL_RADIUS = 250;
const EASE = 0.34;
const CHARS = [' ', ' ', '.', '.', '/', '/', 'a', 'a', '-', '+', '*', ',', '`', 'p'];

const fract = (value) => value - Math.floor(value);

const noise = (x, y, seed = 0) => (
  fract(Math.sin((x * 12.9898) + (y * 78.233) + (seed * 31.415)) * 43758.5453)
);

const hexToRgb = (value, fallback) => {
  const hex = value?.trim().replace('#', '');
  const normalized = hex?.length === 3
    ? hex.split('').map((char) => char + char).join('')
    : hex;

  if (!normalized || normalized.length !== 6) return fallback;

  const number = Number.parseInt(normalized, 16);
  if (Number.isNaN(number)) return fallback;

  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
};

const rgba = ({ r, g, b }, alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

const mixRgb = (a, b, amount) => ({
  r: Math.round(a.r + (b.r - a.r) * amount),
  g: Math.round(a.g + (b.g - a.g) * amount),
  b: Math.round(a.b + (b.b - a.b) * amount),
});

const GlassPixelScreen = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let time = 0;
    let mouse = { x: -9999, y: -9999 };
    let focus = { x: -9999, y: -9999 };
    let active = false;
    let glyphs = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      cols = Math.ceil(width / CELL_W) + 4;
      rows = Math.ceil(height / CELL_H) + 4;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = 'top';

      glyphs = [];
      for (let row = -2; row < rows; row += 1) {
        for (let col = -2; col < cols; col += 1) {
          const n = noise(col, row, 2);
          const char = CHARS[Math.floor(n * CHARS.length)] || '.';
          if (char === ' ' && noise(col, row, 7) > 0.28) continue;

          glyphs.push({
            char,
            x: col * CELL_W + Math.sin(row * 0.37) * 1.2,
            y: row * CELL_H - 24 + Math.cos(col * 0.23) * 0.9,
            ambient: 0.055 + noise(col, row, 5) * 0.035,
            accent: noise(col, row, 17) > 0.74,
            jitter: noise(col, row, 11),
            phase: noise(col, row, 13) * Math.PI * 2,
          });
        }
      }
    };

    const getTheme = () => {
      const style = getComputedStyle(document.body);
      const cyan = hexToRgb(style.getPropertyValue('--cyan'), { r: 0, g: 212, b: 255 });
      const accent = hexToRgb(style.getPropertyValue('--accent'), { r: 0, g: 255, b: 179 });
      return {
        cyan,
        accent,
        teal: mixRgb(cyan, accent, 0.42),
        deepBlue: mixRgb(cyan, { r: 30, g: 90, b: 255 }, 0.34),
      };
    };

    const onMove = (event) => {
      mouse = { x: event.clientX, y: event.clientY };
      active = true;
    };

    const onLeave = () => {
      active = false;
      mouse = { x: -9999, y: -9999 };
    };

    const draw = () => {
      time += reducedMotion ? 0.004 : 0.018;

      focus.x += (mouse.x - focus.x) * EASE;
      focus.y += (mouse.y - focus.y) * EASE;

      const { cyan, accent, teal, deepBlue } = getTheme();
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(3, 5, 10, 0.42)';
      ctx.fillRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.72
      );
      vignette.addColorStop(0, 'rgba(3, 5, 10, 0)');
      vignette.addColorStop(0.62, 'rgba(3, 5, 10, 0.18)');
      vignette.addColorStop(1, 'rgba(3, 5, 10, 0.68)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      ctx.font = '13px "JetBrains Mono", "Courier New", monospace';
      ctx.shadowBlur = 0;

      for (const glyph of glyphs) {
        const dx = glyph.x - focus.x;
        const dy = glyph.y - focus.y;
        const angle = Math.atan2(dy, dx);
        const lobe = 1
          + Math.sin(angle * 2.0 + 0.7) * 0.23
          + Math.cos(angle * 3.0 - 1.3) * 0.16
          + Math.sin(angle * 5.0 + glyph.phase) * 0.11;
        const stretchedX = dx / (REVEAL_RADIUS * (0.92 + glyph.jitter * 0.36) * lobe);
        const stretchedY = dy / (REVEAL_RADIUS * (0.68 + (1 - glyph.jitter) * 0.28) * (1.12 - lobe * 0.16));
        const blobDistance = Math.sqrt((stretchedX * stretchedX) + (stretchedY * stretchedY));
        const reveal = active ? Math.max(0, 1 - blobDistance) : 0;
        const shaped = Math.pow(reveal, 1.65);
        const alpha = Math.min(0.82, glyph.ambient + shaped * 0.5);

        if (shaped > 0.025) {
          const glarePick = Math.sin(glyph.phase + time * 0.35) * 0.5 + 0.5;
          ctx.shadowColor = shaped > 0.56
            ? rgba(glarePick > 0.55 ? accent : teal, 0.42)
            : rgba(glarePick > 0.45 ? cyan : deepBlue, 0.26);
          ctx.shadowBlur = 4 + shaped * 15;
          ctx.fillStyle = glyph.accent
            ? rgba(accent, alpha)
            : rgba(glarePick > 0.68 ? teal : cyan, alpha);
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(38, 45, 54, ${glyph.ambient})`;
        }

        ctx.fillText(glyph.char, glyph.x, glyph.y);
      }

      if (active) {
        const cursorGlow = ctx.createRadialGradient(
          focus.x,
          focus.y,
          0,
          focus.x,
          focus.y,
          REVEAL_RADIUS * 1.15
        );
        cursorGlow.addColorStop(0, rgba(cyan, 0.082));
        cursorGlow.addColorStop(0.23, rgba(teal, 0.045));
        cursorGlow.addColorStop(0.43, rgba(deepBlue, 0.028));
        cursorGlow.addColorStop(0.66, rgba(accent, 0.018));
        cursorGlow.addColorStop(0.78, 'rgba(0, 0, 0, 0.035)');
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    if (!coarsePointer) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
      cancelAnimationFrame(raf);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas className="glass-pixel-screen" ref={canvasRef} aria-hidden="true" />;
};

export default GlassPixelScreen;
