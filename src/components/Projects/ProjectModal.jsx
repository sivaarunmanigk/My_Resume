import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const panelRef    = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(panelRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', delay: 0.08 });

    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, []);

  const handleClose = () => {
    gsap.to(panelRef.current,    { y: 20, opacity: 0, duration: 0.28, ease: 'power2.in' });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.08, onComplete: onClose });
  };

  return (
    <div
      ref={backdropRef}
      className="modal-bg"
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(820px, 94vw)',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(217,98,43,0.3) transparent',
        }}
      >
        {/* Sticky header */}
        <div
          style={{
            position: 'sticky', top: 0,
            padding: '1.75rem 2.25rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            zIndex: 1,
          }}
        >
          <div>
            <div className="t-label-accent" style={{ marginBottom: '0.4rem' }}>
              {project.category} · {project.year}
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: 'var(--text)',
                lineHeight: 1.2,
                whiteSpace: 'pre-line',
              }}
            >
              {project.title}
            </h2>
            {project.award && (
              <div
                style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontSize: '0.5rem',
                  letterSpacing: '0.12em',
                  padding: '0.25rem 0.65rem',
                  fontWeight: 700,
                }}
              >
                {project.award}
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            data-cursor="hover"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'border-color 200ms, color 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '2.25rem' }}>
          {/* Stack */}
          <div style={{ marginBottom: '2.25rem' }}>
            <div className="t-label" style={{ marginBottom: '0.75rem' }}>Technology Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {project.technologies.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <Section title="Overview">
            <p className="t-body" style={{ fontSize: '0.88rem' }}>{project.description}</p>
          </Section>

          <Section title="Problem">
            <p className="t-body" style={{ fontSize: '0.85rem' }}>{project.problem}</p>
          </Section>

          <Section title="Architecture">
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                padding: '1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                whiteSpace: 'pre-wrap',
                letterSpacing: '0.03em',
              }}
            >
              {project.architecture}
            </div>
          </Section>

          <Section title="Implementation">
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {project.implementation.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.25rem' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Testing">
            <p className="t-body" style={{ fontSize: '0.85rem' }}>{project.testing}</p>
          </Section>

          {/* Result */}
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent)',
              background: 'rgba(217,98,43,0.03)',
              marginTop: '1rem',
            }}
          >
            <div className="t-label-accent" style={{ marginBottom: '0.5rem' }}>Result</div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.7 }}>
              {project.result}
            </p>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '1.5rem',
                  padding: '0.65rem 1.25rem',
                  background: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--text)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; }}
              >
                VIEW SOURCE ON GITHUB ↗
              </a>
            )}
          </div>

          {/* Metrics */}
          {project.metrics && (
            <div style={{ marginTop: '2rem' }}>
              <div className="t-label" style={{ marginBottom: '1rem' }}>Measured Metrics</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {Object.entries(project.metrics).map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      border: '1px solid var(--border)',
                      padding: '1rem 1.5rem',
                      background: 'var(--bg)',
                      minWidth: '110px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--text)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {v}
                    </div>
                    <div className="t-label">{k.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div className="t-label" style={{ marginBottom: '0.75rem' }}>{title}</div>
      {children}
    </div>
  );
}
