import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profile from '@/data/profile.js';

gsap.registerPlugin(ScrollTrigger);

const NAME_FIRST = 'SIVAARUNMANI';
const NAME_LAST  = 'G K';

export default function NameReveal() {
  const sectionRef = useRef(null);
  const firstRef   = useRef(null);
  const lastRef    = useRef(null);
  const subRef     = useRef(null);

  useEffect(() => {
    const chars1 = firstRef.current?.querySelectorAll('.nr-char') || [];
    const chars2 = lastRef.current?.querySelectorAll('.nr-char')  || [];

    // Phase 1: Outline appears on enter
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo([...chars1, ...chars2],
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.03,
        duration: 0.9,
        ease: 'power3.out',
      },
    );

    // Phase 2: Fill on deeper scroll
    gsap.to([...chars1, ...chars2], {
      WebkitTextStroke: '0px transparent',
      color: 'var(--text)',
      stagger: 0.025,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        toggleActions: 'play none none none',
      },
    });

    // Sub fade in
    gsap.fromTo(subRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: subRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    );
  }, []);

  const makeChars = (word, color = 'var(--text)') =>
    word.split('').map((ch, i) => (
      <span
        key={i}
        className="nr-char"
        style={{
          display: 'inline-block',
          color: 'transparent',
          WebkitTextStroke: `1px rgba(242,236,228,0.2)`,
          transition: 'color 200ms ease, -webkit-text-stroke 200ms ease',
        }}
      >
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="name-reveal"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '10rem 2.5rem',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-label="Name reveal"
    >
      {/* Very subtle grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.015, pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="nr-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F2ECE4" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nr-grid)" />
      </svg>

      {/* Small label */}
      <div className="t-label" style={{ color: 'var(--text-faint)', marginBottom: '3rem' }}>
        Automotive Embedded Systems · {profile.college}
      </div>

      {/* Giant name */}
      <div
        ref={firstRef}
        className="t-name"
        style={{ overflow: 'visible', marginBottom: '0.05em' }}
        aria-label={NAME_FIRST}
      >
        {makeChars(NAME_FIRST)}
      </div>
      <div
        ref={lastRef}
        className="t-name accent"
        style={{ overflow: 'visible', marginBottom: '3rem' }}
        aria-label={NAME_LAST}
      >
        {makeChars(NAME_LAST, 'var(--accent)')}
      </div>

      {/* Sub copy */}
      <div ref={subRef} style={{ opacity: 0 }}>
        <div className="t-label" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          ECE Student · Chennai, India
        </div>
        <div className="t-label" style={{ color: 'var(--text-faint)' }}>
          Embedded C &nbsp;·&nbsp; CAN &nbsp;·&nbsp; S32K144 &nbsp;·&nbsp; Hardware
        </div>
      </div>

      {/* Accent line */}
      <div
        style={{ width: '40px', height: '2px', background: 'var(--accent)', margin: '2.5rem auto 0' }}
        aria-hidden="true"
      />
    </section>
  );
}
