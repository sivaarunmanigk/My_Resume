import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneCanvas from '@/components/Scene/SceneCanvas.jsx';
import { useWebGL } from '@/hooks/useWebGL.js';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery.js';
import profile from '@/data/profile.js';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { supported: webglOk } = useWebGL();
  const reduced = usePrefersReducedMotion();
  const mouseRef   = useRef({ x: 0, y: 0 });
  const headingRef = useRef(null);
  const metaRef    = useRef(null);
  const scrollRef  = useRef(null);

  useEffect(() => {
    // Mouse parallax for 3D
    const onMouse = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    if (!reduced) window.addEventListener('mousemove', onMouse);

    // Entrance animation
    if (!reduced) {
      const els = headingRef.current?.querySelectorAll('.hero-reveal') || [];
      gsap.fromTo(els,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: 'power3.out', delay: 0.2 },
      );
      if (metaRef.current) {
        gsap.fromTo(metaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.8 },
        );
      }
    }

    // Fade scroll indicator on first scroll
    if (scrollRef.current) {
      gsap.to(scrollRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=120', scrub: true },
      });
    }

    return () => window.removeEventListener('mousemove', onMouse);
  }, [reduced]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100svh',
        minHeight: '600px',
        overflow: 'hidden',
        background: 'var(--bg-dark)',
      }}
      aria-label="Hero — Sivaarunmani G K"
    >
      {/* ── 3D Scene — BACKGROUND ──────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 'var(--z-scene)',
          // Right half only on desktop — leaves name space
          left: '40%',
          opacity: 0.7,
        }}
        className="hidden md:block"
      >
        <SceneCanvas webglSupported={webglOk} scrollProgress={0} mouseRef={mouseRef} />
      </div>

      {/* Mobile: subtle background scene full width, very dim */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 'var(--z-scene)', opacity: 0.25 }}
        className="block md:hidden"
      >
        {webglOk && (
          <SceneCanvas webglSupported={webglOk} scrollProgress={0} mouseRef={mouseRef} />
        )}
      </div>

      {/* ── Left gradient to make name readable ─────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--bg-dark) 50%, rgba(7,6,5,0.6) 75%, rgba(7,6,5,0) 100%)',
        }}
        aria-hidden="true"
        className="hidden md:block"
      />
      {/* Mobile full overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          pointerEvents: 'none',
          background: 'rgba(7,6,5,0.7)',
        }}
        aria-hidden="true"
        className="block md:hidden"
      />
      {/* Bottom fade for scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '30%',
          zIndex: 15,
          pointerEvents: 'none',
          background: 'linear-gradient(to top, var(--bg-dark), transparent)',
        }}
        aria-hidden="true"
      />

      {/* ── Typography — PRIMARY FOCUS ───────────────────────────── */}
      <div
        ref={headingRef}
        style={{
          position: 'absolute',
          left: '2.5rem',
          bottom: '8rem',
          zIndex: 20,
          maxWidth: '680px',
        }}
      >
        {/* Eyebrow */}
        <div
          className="hero-reveal t-label"
          style={{ marginBottom: '1.5rem', opacity: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          ECE Student · {profile.college}
        </div>

        {/* Main name */}
        <h1
          className="t-name hero-reveal"
          style={{ color: 'var(--text)', opacity: 0, marginBottom: '0.1rem' }}
        >
          {profile.nameFirst}
        </h1>
        <h1
          className="t-name hero-reveal"
          style={{ color: 'var(--text-muted)', opacity: 0, marginBottom: '1.5rem' }}
        >
          {profile.nameLast}
        </h1>

        {/* Specialization */}
        <div
          className="hero-reveal"
          style={{ opacity: 0, marginBottom: '2rem' }}
        >
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
              fontWeight: 500,
              letterSpacing: '-0.015em',
              lineHeight: 1.2,
              color: 'var(--accent)',
            }}
          >
            Automotive Embedded
            <br />
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Systems.</span>
          </p>
        </div>

        {/* Micro copy */}
        <div ref={metaRef} style={{ opacity: 0 }}>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              maxWidth: '420px',
              marginBottom: '1rem',
            }}
          >
            {profile.tagline}
          </p>
          <div className="t-label" style={{ color: 'var(--text-faint)' }}>
            Embedded C &nbsp;·&nbsp; S32K144 &nbsp;·&nbsp; CAN &nbsp;·&nbsp; UDS
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        aria-hidden="true"
      >
        <span className="t-label" style={{ color: 'var(--text-faint)' }}>Scroll to explore</span>
        <div
          style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* ── Top-right location ───────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '5.5rem',
          right: '2.5rem',
          zIndex: 20,
        }}
        className="hidden lg:block"
        aria-hidden="true"
      >
        <span className="t-label" style={{ color: 'var(--text-faint)' }}>
          Chennai, India &nbsp;·&nbsp; 2026
        </span>
      </div>
    </section>
  );
}
