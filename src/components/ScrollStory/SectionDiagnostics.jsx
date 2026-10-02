import { useEffect, useRef, useState } from 'react';

const UDS_SERVICES = [
  {
    hex: '10 03',
    name: 'DiagnosticSessionControl',
    desc: 'Extended Diagnostic Session',
    response: '50 03',
  },
  {
    hex: '22 F1 90',
    name: 'ReadDataByIdentifier',
    desc: 'ECU Part Number (DID 0xF190)',
    response: '62 F1 90 ...',
  },
  {
    hex: '19 02 09',
    name: 'ReadDTCInformation',
    desc: 'Report DTCs by Status Mask',
    response: '59 02 ...',
  },
  {
    hex: '27 01',
    name: 'SecurityAccess',
    desc: 'Request Seed (Level 1)',
    response: '67 01 [SEED]',
  },
];

export default function SectionDiagnostics() {
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % UDS_SERVICES.length);
    }, 2200);
    return () => clearInterval(intervalRef.current);
  }, []);

  const active = UDS_SERVICES[activeIdx];

  return (
    <section
      id="diagnostics"
      className="section-padding"
      style={{
        background: '#070A0D',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="UDS Diagnostics section"
    >
      <div className="container-wide">
        <div className="tech-line" style={{ marginBottom: '2rem' }}>
          <span className="text-label-accent">06 · DIAGNOSTICS</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Left — headline + description */}
          <div>
            <h2 className="text-display" style={{ marginBottom: '1rem' }}>
              UDS
            </h2>
            <h2
              className="text-display"
              style={{ color: 'var(--color-accent)', marginBottom: '2.5rem' }}
            >
              FUNDAMENTALS.
            </h2>

            {/* Honest labelling */}
            <div
              className="hud-frame"
              style={{
                marginBottom: '2rem',
                borderLeft: '3px solid var(--color-accent)',
              }}
            >
              <div className="text-label" style={{ marginBottom: '0.5rem', color: 'var(--color-accent)' }}>
                LEARNING LEVEL
              </div>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                UDS (ISO 14229) is studied at a conceptual and fundamentals
                level. Service IDs, session types, DTC concepts and
                communication structure — not production implementation.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Diagnostic Session Control',
                'ECU Identification (DID reads)',
                'DTC Concepts & Status Masks',
                'Security Access (Seed/Key concept)',
                'Service Communication Structure',
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }} className="text-label">
              ISO 14229 · ISO 15765-2 (Transport Layer)
            </div>
          </div>

          {/* Right — animated diagnostic terminal */}
          <div>
            <div
              style={{
                background: '#050708',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {/* Terminal header */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3A1A0A' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2A2A0A' }} />
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0A2A1A' }} />
                </div>
                <span className="text-label">UDS DIAGNOSTIC MONITOR</span>
                <span className="text-label" style={{ color: 'var(--color-accent)' }}>ISO 14229</span>
              </div>

              {/* Session info */}
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-dim)' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--color-text-faint)', marginBottom: '0.25rem' }}>
                  SESSION
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text)', letterSpacing: '0.06em' }}>
                  Extended Diagnostic · Node: ECU_01
                </div>
              </div>

              {/* Service list */}
              <div style={{ padding: '1rem' }}>
                {UDS_SERVICES.map((svc, i) => (
                  <div
                    key={svc.hex}
                    onClick={() => {
                      clearInterval(intervalRef.current);
                      setActiveIdx(i);
                    }}
                    style={{
                      padding: '0.75rem',
                      marginBottom: '0.5rem',
                      background: i === activeIdx ? 'rgba(217,98,43,0.06)' : 'transparent',
                      border: `1px solid ${i === activeIdx ? 'rgba(217,98,43,0.25)' : 'var(--color-border-dim)'}`,
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 200ms ease',
                    }}
                    data-cursor="hover"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: i === activeIdx ? 'var(--color-accent)' : 'var(--color-text-muted)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {svc.hex}
                      </span>
                      {i === activeIdx && (
                        <span
                          style={{
                            fontSize: '0.5rem',
                            color: 'var(--color-accent)',
                            letterSpacing: '0.14em',
                            animation: 'pulse-orange 1s ease infinite',
                          }}
                        >
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-faint)', letterSpacing: '0.04em' }}>
                      {svc.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Active service detail */}
              <div
                style={{
                  padding: '1rem',
                  borderTop: '1px solid var(--color-border)',
                  background: 'rgba(7,7,7,0.5)',
                }}
              >
                <div style={{ fontSize: '0.55rem', color: 'var(--color-text-faint)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                  SELECTED SERVICE
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>
                  {active.desc}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.5rem', color: 'var(--color-text-faint)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                      REQUEST
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-accent)' }}>{active.hex}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.5rem', color: 'var(--color-text-faint)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                      RESPONSE
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text)' }}>{active.response}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
