import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(animate);
    };

    const onEnterClickable = () => {
      ring.classList.add('cursor-ring--hover');
      dot.classList.add('cursor-dot--hover');
    };
    const onLeaveClickable = () => {
      ring.classList.remove('cursor-ring--hover');
      dot.classList.remove('cursor-dot--hover');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    // Delegate: watch for hover on interactive elements
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll('a, button, [role="button"], input, select, textarea, .proj-card, label, [onclick]')
        .forEach(el => {
          el.removeEventListener('mouseenter', onEnterClickable);
          el.removeEventListener('mouseleave', onLeaveClickable);
          el.addEventListener('mouseenter', onEnterClickable);
          el.addEventListener('mouseleave', onLeaveClickable);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Initial pass
    document
      .querySelectorAll('a, button, [role="button"], input, select, textarea, .proj-card, label, [onclick]')
      .forEach(el => {
        el.addEventListener('mouseenter', onEnterClickable);
        el.addEventListener('mouseleave', onLeaveClickable);
      });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Only render on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default CustomCursor;
