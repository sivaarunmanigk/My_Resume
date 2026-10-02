import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import profile from '@/data/profile.js';

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

function LiveTime() {
  const fmt = () =>
    new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
    });
  const [time, setTime] = useState(fmt);
  useState(() => {
    const id = setInterval(() => setTime(fmt()), 60000);
    return () => clearInterval(id);
  });
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
      {time} IST
    </span>
  );
}

export default function ContactSection() {
  const [emailHov, setEmailHov] = useState(false);

  return (
    <section
      id="contact"
      className="section"
      style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border)' }}
      aria-label="Contact"
    >
      <div className="container">
        <div className="section-label">
          <span className="t-label-accent">Contact</span>
        </div>

        {/* Headline */}
        <h2 className="t-display" style={{ marginBottom: '1.5rem' }}>
          LET'S
          <br />
          BUILD
          <br />
          <span className="accent">SOMETHING.</span>
        </h2>

        {/* Open-to statement */}
        <p
          className="t-body"
          style={{ maxWidth: '520px', marginBottom: '5rem', fontSize: '1rem' }}
        >
          {profile.openTo}
        </p>

        {/* Email — big interactive row */}
        <a
          href={`mailto:${profile.email}`}
          data-cursor="email"
          onMouseEnter={() => setEmailHov(true)}
          onMouseLeave={() => setEmailHov(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            textDecoration: 'none',
            padding: '2rem 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            marginBottom: '4rem',
            transition: 'border-color 200ms ease',
            borderColor: emailHov ? 'rgba(217,98,43,0.4)' : 'var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Mail
              size={20}
              style={{
                color: emailHov ? 'var(--accent)' : 'var(--text-muted)',
                flexShrink: 0,
                transition: 'color 200ms ease, transform 200ms ease',
                transform: emailHov ? 'translateX(4px)' : 'translateX(0)',
              }}
            />
            <span
              style={{
                fontSize: 'clamp(1rem, 3vw, 2.2rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: emailHov ? 'var(--accent)' : 'var(--text)',
                transition: 'color 200ms ease',
              }}
            >
              {profile.email}
            </span>
          </div>
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.16em',
              color: emailHov ? 'var(--accent)' : 'var(--text-faint)',
              transition: 'color 200ms ease',
              flexShrink: 0,
            }}
          >
            Say Hello →
          </span>
        </a>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {/* Social links */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a
              href={profile.linkedin !== '[YOUR_LINKEDIN_URL]' ? profile.linkedin : '#'}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={14} />
              LinkedIn
              {profile.linkedin === '[YOUR_LINKEDIN_URL]' && (
                <span style={{ fontSize: '0.5rem', color: 'var(--text-faint)' }}>[add URL]</span>
              )}
            </a>
            <a
              href={profile.github !== '[YOUR_GITHUB_URL]' ? profile.github : '#'}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              aria-label="GitHub"
            >
              <GithubIcon size={14} />
              GitHub
              {profile.github === '[YOUR_GITHUB_URL]' && (
                <span style={{ fontSize: '0.5rem', color: 'var(--text-faint)' }}>[add URL]</span>
              )}
            </a>
          </div>

          {/* Location + time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={12} style={{ color: 'var(--text-faint)' }} />
              <span className="t-label">{profile.locationShort}</span>
            </div>
            <LiveTime />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span className="t-label">{profile.nameFirst} {profile.nameLast}</span>
          <span className="t-label" style={{ color: 'var(--text-faint)' }}>
            {profile.role} · {profile.college}
          </span>
          <span className="t-label" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
