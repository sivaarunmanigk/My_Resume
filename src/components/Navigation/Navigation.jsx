import { useEffect, useRef, useState } from 'react';
import profile from '@/data/profile.js';

const NAV_LINKS = [
  { label: 'Work',       href: '#projects'   },
  { label: 'About',      href: '#about'       },
  { label: 'Experience', href: '#experience'  },
  { label: 'Skills',     href: '#skills'      },
  { label: 'Contact',    href: '#contact'     },
];

export default function Navigation({ scrollProgress = 0 }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Nav bar ──────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)',
          padding: '1.25rem 2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(7,6,5,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 400ms ease, border-color 400ms ease, backdrop-filter 400ms ease',
        }}
        aria-label="Main navigation"
      >
        {/* Name — left */}
        <a
          href="#hero"
          data-cursor="hover"
          style={{
            textDecoration: 'none',
            color: 'var(--text)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}
        >
          {profile.nameFirst} <span style={{ color: 'var(--text-muted)' }}>{profile.nameLast}</span>
        </a>

        {/* Desktop links — right */}
        <div
          style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              data-cursor="hover"
              style={{
                textDecoration: 'none',
                fontSize: '0.65rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {label}
            </a>
          ))}

          {/* CTA */}
          <a
            href={`mailto:${profile.email}`}
            data-cursor="email"
            style={{
              padding: '0.5rem 1.1rem',
              border: '1px solid var(--border)',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'var(--text)',
              transition: 'border-color 200ms ease, background 200ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'rgba(217,98,43,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
          }}
          className="flex md:hidden"
        >
          <span style={{
            display: 'block', width: 22, height: 1,
            background: 'var(--text)',
            transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            transition: 'transform 300ms ease',
          }}/>
          <span style={{
            display: 'block', width: 22, height: 1,
            background: 'var(--text)',
            opacity: menuOpen ? 0 : 1,
            transition: 'opacity 200ms ease',
          }}/>
          <span style={{
            display: 'block', width: 22, height: 1,
            background: 'var(--text)',
            transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            transition: 'transform 300ms ease',
          }}/>
        </button>
      </nav>

      {/* ── Scroll progress bar ───────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          zIndex: 'var(--z-nav)',
          background: 'transparent',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: 'var(--accent)',
            transition: 'width 0.08s linear',
          }}
        />
      </div>

      {/* ── Mobile full-screen menu ───────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 45,
          background: 'var(--bg-dark)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem 2.5rem',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 500ms var(--ease-expo)',
        }}
        aria-hidden={!menuOpen}
      >
        <div style={{ marginBottom: '4rem' }}>
          <span className="t-label" style={{ color: 'var(--text-faint)' }}>
            {profile.nameFirst} {profile.nameLast}
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={close}
              style={{
                textDecoration: 'none',
                fontSize: 'clamp(2rem, 10vw, 4rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
                display: 'block',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              <span style={{ fontSize: '0.55rem', color: 'var(--text-faint)', marginRight: '1rem', letterSpacing: '0.1em' }}>
                0{i+1}
              </span>
              {label}
            </a>
          ))}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <a
            href={`mailto:${profile.email}`}
            style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em' }}
          >
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
}
