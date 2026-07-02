import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   QUADCOPTER FLIGHT HUD
   Canvas-drawn transparent overlay on the hero.
   • Artificial horizon (gyroscope ball)
   • Animated gauge arcs (throttle, battery, altitude)
   • Targeting reticle crosshairs
   • Scroll-reactive telemetry
───────────────────────────────────────────── */

const FlightHUD = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef({
    pitch: 2.3,       // degrees
    roll: -0.5,
    throttle: 0,
    battery: 81,
    altitude: 0,
    gps: 4,
    scrollT: 0,       // 0-1 target
    scrollV: 0,       // 0-1 current (lerped)
    time: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onScroll = () => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const t = Math.max(0, Math.min(1, -rect.top / rect.height));
      stateRef.current.scrollT = t;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── helpers ──────────────────────────────
    const getCyan = () =>
      getComputedStyle(document.body).getPropertyValue('--cyan').trim() || '#00d4ff';

    const lerp = (a, b, t) => a + (b - a) * t;

    const drawRoundedRect = (ctx, x, y, w, h, r, fill, stroke, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
      ctx.restore();
    };

    // ── artificial horizon ────────────────────
    const drawHorizon = (cx, cy, radius, pitch, roll, cyan) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((roll * Math.PI) / 180);

      // clip to circle
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.clip();

      const pitchPx = (pitch / 30) * radius;

      // sky
      const skyGrad = ctx.createLinearGradient(0, -radius + pitchPx, 0, pitchPx);
      skyGrad.addColorStop(0, 'rgba(0,80,160,0.55)');
      skyGrad.addColorStop(1, 'rgba(0,30,80,0.3)');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(-radius, -radius, radius * 2, radius + pitchPx);

      // ground
      const gndGrad = ctx.createLinearGradient(0, pitchPx, 0, radius);
      gndGrad.addColorStop(0, 'rgba(60,30,0,0.4)');
      gndGrad.addColorStop(1, 'rgba(20,10,0,0.25)');
      ctx.fillStyle = gndGrad;
      ctx.fillRect(-radius, pitchPx, radius * 2, radius);

      // horizon line
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(-radius, pitchPx);
      ctx.lineTo(radius, pitchPx);
      ctx.stroke();

      // pitch ladder marks
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 0.8;
      for (let deg = -20; deg <= 20; deg += 5) {
        if (deg === 0) continue;
        const py = pitchPx - (deg / 30) * radius;
        const len = deg % 10 === 0 ? 24 : 12;
        ctx.beginPath();
        ctx.moveTo(-len, py);
        ctx.lineTo(len, py);
        ctx.stroke();
      }

      ctx.restore();

      // outer ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.7;
      ctx.stroke();

      // roll indicator triangle
      ctx.rotate((-roll * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(0, -radius - 6);
      ctx.lineTo(-5, -radius + 2);
      ctx.lineTo(5, -radius + 2);
      ctx.closePath();
      ctx.fillStyle = cyan;
      ctx.globalAlpha = 0.9;
      ctx.fill();

      // center crosshair
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 1.5;
      const ch = 10;
      ctx.beginPath();
      ctx.moveTo(-ch * 2, 0); ctx.lineTo(-4, 0);
      ctx.moveTo(4, 0); ctx.lineTo(ch * 2, 0);
      ctx.moveTo(0, -4); ctx.lineTo(0, -ch);
      ctx.stroke();

      ctx.restore();
    };

    // ── arc gauge ────────────────────────────
    const drawArcGauge = (cx, cy, r, value, max, label, unit, cyan) => {
      const startA = Math.PI * 0.75;
      const endA = Math.PI * 2.25;
      const fillA = startA + (value / max) * (endA - startA);

      ctx.save();
      ctx.translate(cx, cy);

      // track
      ctx.beginPath();
      ctx.arc(0, 0, r, startA, endA);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.stroke();

      // fill gradient
      const grad = ctx.createLinearGradient(-r, 0, r, 0);
      grad.addColorStop(0, cyan + 'aa');
      grad.addColorStop(1, cyan);
      ctx.beginPath();
      ctx.arc(0, 0, r, startA, fillA);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 6;
      ctx.stroke();

      // value text
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${r * 0.52}px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = 0.95;
      ctx.fillText(Math.round(value) + unit, 0, -4);

      // label
      ctx.font = `${r * 0.28}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = cyan;
      ctx.globalAlpha = 0.65;
      ctx.fillText(label, 0, r * 0.55);

      ctx.restore();
    };

    // ── targeting reticle ────────────────────
    const drawReticle = (cx, cy, size, cyan, pulse) => {
      ctx.save();
      ctx.translate(cx, cy);
      const s = size * (1 + pulse * 0.04);
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.55 + pulse * 0.1;

      const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      const armLen = s * 0.3;
      corners.forEach(([sx, sy]) => {
        const bx = sx * s, by = sy * s;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx - sx * armLen, by);
        ctx.moveTo(bx, by);
        ctx.lineTo(bx, by - sy * armLen);
        ctx.stroke();
      });

      // center dot
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = cyan;
      ctx.globalAlpha = 0.8 + pulse * 0.2;
      ctx.fill();

      // tick marks on edges
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 0.8;
      for (let i = 1; i <= 4; i++) {
        const x = -s + (i / 5) * s * 2;
        ctx.beginPath();
        ctx.moveTo(x, -s - 4); ctx.lineTo(x, -s + 4);
        ctx.moveTo(x, s - 4); ctx.lineTo(x, s + 4);
        ctx.stroke();
      }
      ctx.restore();
    };

    // ── GPS dots ─────────────────────────────
    const drawGPS = (x, y, count, cyan) => {
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(x + i * 10, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = i < count ? cyan : 'rgba(255,255,255,0.12)';
        ctx.globalAlpha = i < count ? 0.9 : 1;
        ctx.fill();
      }
    };

    // ── status text line ─────────────────────
    const drawStatusLine = (x, y, label, value, cyan) => {
      ctx.save();
      ctx.font = `10px 'JetBrains Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText(label, x, y);
      ctx.fillStyle = cyan;
      ctx.globalAlpha = 0.9;
      ctx.fillText(value, x + 72, y);
      ctx.restore();
    };

    // ── MAIN DRAW ─────────────────────────────
    const draw = () => {
      const S = stateRef.current;
      S.time += 0.016;
      S.scrollV = lerp(S.scrollV, S.scrollT, 0.04);

      const t = S.scrollV;
      // as scroll increases: throttle ramps up briefly then settles, altitude climbs
      S.throttle = lerp(60, 84, Math.sin(S.time * 0.3) * 0.1 + 0.5 + t * 0.3);
      S.altitude = lerp(0, 240, t) + Math.sin(S.time * 0.4) * 2;
      S.pitch = lerp(8, 2, t) + Math.sin(S.time * 0.25) * 0.6;
      S.roll = lerp(-3, -0.3, t) + Math.cos(S.time * 0.18) * 0.4;
      S.battery = 81 - t * 4 - Math.sin(S.time * 0.12) * 0.3;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cyan = getCyan();
      const pulse = (Math.sin(S.time * 2) + 1) / 2;

      // ── panel background (bottom-right corner) ──
      const panelW = Math.min(380, W * 0.42);
      const panelH = Math.min(220, H * 0.35);
      const px = W - panelW - 24, py = H - panelH - 24;

      drawRoundedRect(
        ctx, px, py, panelW, panelH, 6,
        'rgba(4,8,15,0.55)',
        cyan + '33',
        1
      );

      // corner accents on panel
      const accent = (ax, ay, sx, sy) => {
        ctx.save();
        ctx.strokeStyle = cyan;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(ax + sx * 10, ay);
        ctx.moveTo(ax, ay); ctx.lineTo(ax, ay + sy * 10);
        ctx.stroke();
        ctx.restore();
      };
      accent(px + 4, py + 4, 1, 1);
      accent(px + panelW - 4, py + 4, -1, 1);
      accent(px + 4, py + panelH - 4, 1, -1);
      accent(px + panelW - 4, py + panelH - 4, -1, -1);

      // ── horizon (left side of panel) ──
      const horizR = Math.min(52, panelH * 0.36);
      drawHorizon(
        px + horizR + 18,
        py + panelH / 2,
        horizR,
        S.pitch,
        S.roll,
        cyan
      );

      // ── gauges (right side of panel) ──
      const gaugeR = 28;
      const g1x = px + panelW * 0.52, g1y = py + panelH * 0.4;
      const g2x = px + panelW * 0.76, g2y = py + panelH * 0.4;
      drawArcGauge(g1x, g1y, gaugeR, S.throttle, 100, 'THR', '%', cyan);
      drawArcGauge(g2x, g2y, gaugeR, S.battery, 100, 'BAT', '%', cyan);

      // ── status lines below gauges ──
      const sl = px + panelW * 0.48, sy = py + panelH * 0.74;
      drawStatusLine(sl, sy,       'ALT:  ', `${Math.round(S.altitude).toString().padStart(3, ' ')}m`, cyan);
      drawStatusLine(sl, sy + 16,  'PITCH:', `${S.pitch.toFixed(1)}°`, cyan);
      drawStatusLine(sl, sy + 32,  'ROLL: ', `${S.roll.toFixed(1)}°`, cyan);

      // GPS dots
      drawGPS(px + panelW * 0.52, py + panelH - 14, S.gps, cyan);
      ctx.save();
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.textAlign = 'left';
      ctx.fillText('GPS', px + panelW * 0.52 + 56, py + panelH - 11);
      ctx.restore();

      // ── status badge (top-right) ──
      const badgeX = W - 160, badgeY = 90;
      drawRoundedRect(ctx, badgeX, badgeY, 138, 22, 3,
        'rgba(4,8,15,0.6)', cyan + '44', 1);
      ctx.save();
      ctx.font = '9.5px JetBrains Mono, monospace';
      ctx.fillStyle = cyan;
      ctx.globalAlpha = 0.7 + pulse * 0.2;
      ctx.textAlign = 'left';
      ctx.fillText('● AUTONOMOUS HOVER', badgeX + 8, badgeY + 14);
      ctx.restore();

      // ── targeting reticle (upper-left of HUD area) ──
      const retX = W * 0.22, retY = H * 0.35;
      drawReticle(retX, retY, 38, cyan, pulse);

      // scan-line across reticle
      ctx.save();
      const scanY = retY - 38 + ((S.time * 40) % 80);
      ctx.beginPath();
      ctx.moveTo(retX - 38, scanY);
      ctx.lineTo(retX + 38, scanY);
      ctx.strokeStyle = cyan;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.25;
      ctx.stroke();
      ctx.restore();

      // label under reticle
      ctx.save();
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = cyan;
      ctx.globalAlpha = 0.45;
      ctx.textAlign = 'center';
      ctx.fillText('LOCK', retX, retY + 52);
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="flight-hud-canvas"
      aria-hidden="true"
    />
  );
};

export default FlightHUD;
