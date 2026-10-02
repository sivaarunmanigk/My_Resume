import { useEffect, useRef, useState } from 'react';
import { useIsDesktop } from '@/hooks/useMediaQuery.js';

const LABELS = {
  project: 'VIEW',
  hover:   'OPEN',
  email:   'SAY HI',
  '3d':    'EXPLORE',
};

export default function CustomCursor() {
  const isDesktop = useIsDesktop();
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const pos       = useRef({ x: -100, y: -100 });
  const ring      = useRef({ x: -100, y: -100 });
  const raf       = useRef(null);
  const [label, setLabel]     = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;

    document.body.classList.add('cursor-active');

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Detect element under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const target = el.closest('[data-cursor]');
      setLabel(target ? LABELS[target.dataset.cursor] || '' : '');
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    // RAF loop — ring lerps to dot
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const hasLabel = !!label;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          zIndex: 'var(--z-cursor)',
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease, transform 0ms',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />

      {/* Lagged ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: hasLabel ? 72 : 40,
          height: hasLabel ? 72 : 40,
          borderRadius: hasLabel ? '4px' : '50%',
          border: `1px solid ${hasLabel ? 'var(--accent)' : 'rgba(242,236,228,0.25)'}`,
          background: hasLabel ? 'rgba(217,98,43,0.08)' : 'transparent',
          zIndex: 'var(--z-cursor)',
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 200ms ease, width 250ms ease, height 250ms ease, border-radius 250ms ease, border-color 200ms ease, background 200ms ease, transform 0ms',
          willChange: 'transform',
          marginLeft: hasLabel ? -4 : 0,
          marginTop: hasLabel ? -4 : 0,
        }}
        aria-hidden="true"
      >
        {hasLabel && (
          <span
            style={{
              fontSize: '0.45rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--accent)',
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
