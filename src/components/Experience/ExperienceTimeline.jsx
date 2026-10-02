import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experience from '@/data/experience.js';

gsap.registerPlugin(ScrollTrigger);

const TYPE_STYLE = {
  award:      { bg: 'var(--accent)',      color: '#fff',              border: 'var(--accent)' },
  project:    { bg: 'transparent',        color: 'var(--text-muted)', border: 'var(--border)' },
  training:   { bg: 'transparent',        color: 'var(--text-muted)', border: 'var(--border)' },
  education:  { bg: 'transparent',        color: 'var(--text-muted)', border: 'var(--border)' },
  internship: { bg: 'transparent',        color: 'var(--text-muted)', border: 'var(--border)' },
};

export default function ExperienceTimeline() {
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
  }, []);

  return (
    <section
      id="experience"
      className="section"
      style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border)' }}
      aria-label="Experience and journey"
    >
      <div className="container">
        <div className="section-label">
          <span className="t-label-accent">Experience</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <div style={{ position: 'sticky', top: '7rem' }}>
            <h2 className="t-display" style={{ marginBottom: '2rem' }}>
              MY
              <br />
              <span className="accent">JOURNEY.</span>
            </h2>
            <p className="t-body" style={{ maxWidth: '300px' }}>
              From hardware fundamentals to automotive ECU development —
              a student's path through embedded engineering.
            </p>
          </div>

          {/* Right — timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '0.55rem',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'var(--border)',
              }}
              aria-hidden="true"
            />

            {experience.map((entry, i) => {
              const ts = TYPE_STYLE[entry.type] || TYPE_STYLE.project;
              return (
                <div
                  key={entry.id}
                  ref={el => itemRefs.current[i] = el}
                  style={{
                    display: 'flex',
                    gap: '2rem',
                    paddingLeft: '2.5rem',
                    marginBottom: '3rem',
                    position: 'relative',
                    opacity: 0,
                  }}
                >
                  {/* Node */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.2rem',
                      width: '1.2rem',
                      height: '1.2rem',
                      borderRadius: '50%',
                      border: `1px solid ${entry.highlight ? 'var(--accent)' : 'var(--border)'}`,
                      background: entry.highlight ? 'var(--accent)' : 'var(--bg)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    {/* Year + badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--text-faint)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {entry.year}
                      </span>
                      <span
                        style={{
                          fontSize: '0.5rem',
                          letterSpacing: '0.14em',
                          fontWeight: entry.type === 'award' ? 700 : 400,
                          padding: '0.2rem 0.55rem',
                          border: `1px solid ${ts.border}`,
                          background: ts.bg,
                          color: ts.color,
                        }}
                      >
                        {entry.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text)',
                        letterSpacing: '-0.01em',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {entry.title}
                    </h3>

                    {/* Subtitle */}
                    <div
                      className="t-label"
                      style={{ color: 'var(--text-muted)', marginBottom: '0.6rem' }}
                    >
                      {entry.subtitle}
                    </div>

                    {/* Desc */}
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                      {entry.description}
                    </p>

                    {/* Tags */}
                    {entry.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem' }}>
                        {entry.tags.map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
