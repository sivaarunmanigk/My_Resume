import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATUS_ITEMS = [
  { id: 'cpu',  label: 'CPU',  status: 'ONLINE', active: true },
  { id: 'can',  label: 'CAN',  status: 'ONLINE', active: true },
  { id: 'pwm',  label: 'PWM',  status: 'ONLINE', active: true },
  { id: 'adc',  label: 'ADC',  status: 'ONLINE', active: true },
  { id: 'uart', label: 'UART', status: 'ONLINE', active: true },
  { id: 'i2c',  label: 'I²C',  status: 'ONLINE', active: true },
  { id: 'spi',  label: 'SPI',  status: 'ONLINE', active: true },
  { id: 'nvm',  label: 'NVM',  status: 'ONLINE', active: true },
];

export default function ECUHealthMonitor() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [healthPct, setHealthPct] = useState(0);
  const [shownItems, setShownItems] = useState([]);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        setVisible(true);

        // Reveal status items sequentially
        STATUS_ITEMS.forEach((_, i) => {
          setTimeout(() => {
            setShownItems(prev => [...prev, i]);
          }, i * 120);
        });

        // Animate health bar
        setTimeout(() => {
          gsap.to({ v: 0 }, {
            v: 100,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setHealthPct(Math.round(this.targets()[0].v));
            },
          });
        }, STATUS_ITEMS.length * 120);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ecu-monitor"
      className="section-padding"
      style={{
        background: '#05080A',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="ECU health monitor — portfolio interaction"
    >
      <div className="container-wide">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <div>
            <div className="tech-line" style={{ marginBottom: '2rem' }}>
              <span className="text-label-accent">ECU HEALTH MONITOR</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                marginBottom: '2rem',
              }}
            >
              SYSTEM
              <br />
              <span style={{ color: 'var(--color-accent)' }}>STATUS.</span>
            </h2>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                maxWidth: '360px',
                fontStyle: 'italic',
              }}
            >
              * Portfolio interaction — not live hardware measurements.
              Represents the peripheral stack used in the S32K144 ECU project.
            </p>
          </div>

          {/* Right — dashboard */}
          <div>
            <div
              style={{
                background: '#040608',
                border: '1px solid var(--color-border)',
                padding: '2rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {/* Terminal header */}
              <div
                style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.16em',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  ECU_01 · NXP S32K144
                </span>
                <span
                  style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    color: 'var(--color-accent)',
                    animation: 'pulse-orange 2s ease infinite',
                  }}
                >
                  SYSTEM READY
                </span>
              </div>

              {/* Status lines */}
              {STATUS_ITEMS.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--color-border-dim)',
                    opacity: shownItems.includes(i) ? 1 : 0,
                    transform: shownItems.includes(i) ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'opacity 300ms ease, transform 300ms ease',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--color-text)',
                      letterSpacing: '0.06em',
                      minWidth: '3rem',
                    }}
                  >
                    {item.label}
                  </span>
                  <div style={{ flex: 1, margin: '0 1rem' }}>
                    <div
                      style={{
                        height: '1px',
                        background: 'var(--color-border)',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '-1px',
                          left: 0,
                          width: shownItems.includes(i) ? '100%' : '0%',
                          height: '3px',
                          background: 'var(--color-accent)',
                          transition: `width 600ms ease ${i * 80}ms`,
                          opacity: 0.4,
                        }}
                      />
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      letterSpacing: '0.12em',
                      color: item.active ? 'var(--color-accent)' : 'var(--color-text-faint)',
                    }}
                  >
                    {shownItems.includes(i) ? item.status : '...'}
                  </span>
                </div>
              ))}

              {/* Health bar */}
              <div style={{ marginTop: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', letterSpacing: '0.12em' }}>
                    ECU HEALTH
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {healthPct}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${healthPct}%`, transition: 'width 0.1s linear' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
