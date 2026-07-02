import { useRef, useCallback } from 'react';

/**
 * Returns event handler props to apply 3D holographic tilt to a card element.
 * Usage: <div {...tiltProps()} />
 */
const useTilt = (intensity = 12) => {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -intensity;
    const rotY = ((x - cx) / cx) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
    // Move the glare
    const glare = el.querySelector('.tilt-glare');
    if (glare) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.14) 0%, transparent 65%)`;
    }
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    const glare = el.querySelector('.tilt-glare');
    if (glare) glare.style.background = 'none';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};

export default useTilt;
