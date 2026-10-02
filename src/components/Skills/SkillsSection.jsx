import { skills, skillsFlat } from '@/data/skills.js';

const ROTATING_WORDS = [
  'EMBEDDED C', 'CAN', 'S32K144', 'SIMULINK', 'HARDWARE',
  'FIRMWARE', 'IoT', 'PCB DESIGN', 'LoRa', 'BLE',
];

function MarqueeRow({ items, direction = 'left', speed = '32s' }) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className={direction === 'left' ? 'marquee-left' : 'marquee-right'}
        style={{ display: 'flex', gap: '0', width: 'max-content', animationDuration: speed }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              padding: '0 2rem',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              color: 'var(--text-faint)',
              borderRight: '1px solid var(--border)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono)',
              lineHeight: '2.5rem',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-label="Skills — The Toolkit"
    >
      {/* Marquee strip */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          borderTop: '1px solid var(--border)',
          padding: '0',
        }}
      >
        <MarqueeRow items={skillsFlat} direction="left"  speed="38s" />
        <div style={{ height: '1px', background: 'var(--border)' }} />
        <MarqueeRow items={[...skillsFlat].reverse()} direction="right" speed="44s" />
      </div>

      {/* Main section */}
      <div className="section">
        <div className="container">
          <div className="section-label">
            <span className="t-label-accent">Skills</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.6fr',
              gap: '6rem',
              alignItems: 'start',
            }}
          >
            {/* Left — headline */}
            <div style={{ position: 'sticky', top: '7rem' }}>
              <h2 className="t-display" style={{ marginBottom: '2rem' }}>
                THE
                <br />
                <span className="accent">TOOLKIT.</span>
              </h2>
              <p className="t-body" style={{ marginBottom: '2.5rem', maxWidth: '320px' }}>
                Automotive embedded is the primary focus. Hardware prototyping
                and IoT form a secondary engineering layer.
              </p>

              {/* Rotating words */}
              <div
                style={{
                  padding: '1.25rem',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                }}
              >
                <div className="t-label" style={{ marginBottom: '0.75rem' }}>Also working with</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {ROTATING_WORDS.map(w => (
                    <span
                      key={w}
                      className="t-mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {w} ·
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — skill groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              {/* Primary — Automotive Embedded */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span className="t-label-accent">Primary · Automotive Embedded</span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(217,98,43,0.3)' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.automotive.map(s => (
                    <div key={s.label} className="skill-item primary">{s.label}</div>
                  ))}
                </div>
              </div>

              {/* Secondary — Hardware */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span className="t-label">Secondary · Hardware &amp; Embedded</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.hardware.map(s => (
                    <div key={s.label} className="skill-item">{s.label}</div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span className="t-label">Tools &amp; Environments</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.tools.map(s => (
                    <div key={s.label} className="skill-item">{s.label}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
