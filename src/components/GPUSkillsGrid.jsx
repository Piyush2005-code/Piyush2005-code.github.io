import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────
   GPU COMPUTE GRID — Skills Visualization
   Each skill category renders as a CUDA-style shader-core
   grid. Cores light up with a heat-map (cool → cyan → white)
   based on proficiency level. Hovering triggers a particle
   burst from each active core.
───────────────────────────────────────────────────────── */

const SKILLS = [
  {
    label: 'AI Systems & LLMs',
    sublabel: 'GPU Kernel Occupancy',
    proficiency: 0.91,
    detail: 'vLLM · RAG · LangChain · GPU Inference · Agentic AI',
    kernelTime: '0.31ms',
    bandwidth: '97.4%',
  },
  {
    label: 'Machine Learning',
    sublabel: 'FLOP Utilization',
    proficiency: 0.87,
    detail: 'Deep Learning · CNNs · U-Net · YOLO · Seq2Seq',
    kernelTime: '0.44ms',
    bandwidth: '91.2%',
  },
  {
    label: 'Systems & OS',
    sublabel: 'Core Saturation',
    proficiency: 0.88,
    detail: 'Operating Systems · Scheduling · Real-Time · SIMD',
    kernelTime: '0.26ms',
    bandwidth: '88.9%',
  },
  {
    label: 'Programming',
    sublabel: 'Instruction Throughput',
    proficiency: 0.92,
    detail: 'C · C++ · Python · TypeScript · React',
    kernelTime: '0.19ms',
    bandwidth: '99.1%',
  },
  {
    label: 'Robotics & Simulation',
    sublabel: 'Compute Density',
    proficiency: 0.78,
    detail: 'Multi-rotor Dynamics · CFD · CAD · ANSYS Fluent',
    kernelTime: '1.12ms',
    bandwidth: '78.3%',
  },
  {
    label: 'Tools & DevOps',
    sublabel: 'Pipeline Efficiency',
    proficiency: 0.82,
    detail: 'Docker · Kubernetes · Git · CI/CD',
    kernelTime: '0.57ms',
    bandwidth: '82.0%',
  },
];

const COLS = 20;
const ROWS = 6;
const TOTAL = COLS * ROWS;

const getCellColor = (index, proficiency, total, hovered, cyan) => {
  const threshold = Math.floor(proficiency * total);
  if (index >= threshold) return 'rgba(255,255,255,0.04)';
  const ratio = index / threshold;
  if (!hovered) {
    // cool → cyan: interpolate opacity + hue
    const alpha = 0.25 + ratio * 0.65;
    return `rgba(0,212,255,${alpha.toFixed(2)})`;
  }
  // hovered: heat-map blue → cyan → white
  if (ratio < 0.4) return `rgba(0,100,200,${(0.5 + ratio).toFixed(2)})`;
  if (ratio < 0.7) return `rgba(0,212,255,${(0.7 + ratio * 0.4).toFixed(2)})`;
  return `rgba(${Math.round(180 + ratio * 75)},${Math.round(230 + ratio * 25)},255,1)`;
};

const GPUGrid = ({ skill, index }) => {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const lastHovered = useRef(false);

  // Scroll reveal
  useEffect(() => {
    const el = canvasRef.current?.closest('.gpu-grid-card');
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.scale(DPR, DPR);
    };
    resize();

    const getCyan = () =>
      getComputedStyle(document.body).getPropertyValue('--cyan').trim() || '#00d4ff';

    const spawnParticles = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const cellW = W / COLS;
      const cellH = H / ROWS;
      const threshold = Math.floor(skill.proficiency * TOTAL);
      particlesRef.current = [];
      for (let i = 0; i < threshold; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        if (Math.random() > 0.25) continue; // sparse burst
        particlesRef.current.push({
          x: col * cellW + cellW / 2,
          y: row * cellH + cellH / 2,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -(Math.random() * 2 + 0.5),
          alpha: 1,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const cellW = W / COLS;
      const cellH = H / ROWS;
      const gap = 2;
      ctx.clearRect(0, 0, W, H);
      const cyan = getCyan();

      if (hovered && !lastHovered.current) {
        spawnParticles();
      }
      lastHovered.current = hovered;

      const animProgress = visible ? 1 : 0;

      // draw cells
      for (let i = 0; i < TOTAL; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = col * cellW + gap / 2;
        const y = row * cellH + gap / 2;
        const w = cellW - gap;
        const h = cellH - gap;

        // stagger reveal by column
        const staggeredProficiency =
          visible ? Math.min(skill.proficiency, ((col + 1) / COLS) * skill.proficiency * 1.1) : 0;

        const color = getCellColor(i, staggeredProficiency, TOTAL, hovered, cyan);
        ctx.fillStyle = color;

        // subtle glow on hot cells
        const threshold = Math.floor(skill.proficiency * TOTAL);
        if (hovered && i < threshold) {
          const r = i / threshold;
          if (r > 0.7) {
            ctx.shadowColor = cyan;
            ctx.shadowBlur = 6;
          }
        }
        ctx.fillRect(x, y, w, h);
        ctx.shadowBlur = 0;
      }

      // draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.02);
      for (const p of particlesRef.current) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = cyan;
        ctx.shadowColor = cyan;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= 0.025;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered, visible, skill.proficiency]);

  const getCyan = () =>
    getComputedStyle(document.body).getPropertyValue('--cyan').trim() || '#00d4ff';

  return (
    <div
      className={`gpu-grid-card${visible ? ' gpu-grid-card--visible' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="gpu-grid-header">
        <div className="gpu-grid-label">{skill.label}</div>
        <div className="gpu-grid-sublabel">{skill.sublabel}</div>
      </div>

      <canvas ref={canvasRef} className="gpu-grid-canvas" />

      <div className="gpu-grid-meta">
        <span className="gpu-grid-pct">{Math.round(skill.proficiency * 100)}%</span>
        <span className="gpu-grid-stats">
          <span>kernel: {skill.kernelTime}</span>
          <span>bw: {skill.bandwidth}</span>
        </span>
      </div>

      <div className={`gpu-grid-detail${hovered ? ' gpu-grid-detail--show' : ''}`}>
        {skill.detail}
      </div>
    </div>
  );
};

const GPUSkillsGrid = () => {
  return (
    <div className="gpu-skills-section">
      <div className="gpu-skills-header">
        <span className="gpu-header-badge">NVIDIA Compute</span>
        <div className="gpu-header-title">GPU Occupancy — Skill Proficiency</div>
        <div className="gpu-header-sub">
          Each block represents a CUDA thread. Active blocks = expertise utilization.
        </div>
      </div>
      <div className="gpu-skills-grid">
        {SKILLS.map((skill, i) => (
          <GPUGrid key={skill.label} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
};

export default GPUSkillsGrid;
