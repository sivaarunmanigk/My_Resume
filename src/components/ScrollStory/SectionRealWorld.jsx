import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PERIPHERALS = [
  { id: 'GPIO',  desc: 'General Purpose I/O — Door sensor inputs' },
  { id: 'PWM',   desc: 'Pulse Width Modulation — Light intensity control' },
  { id: 'ADC',   desc: 'Analog to Digital Converter — Sensor readings' },
  { id: 'UART',  desc: 'Serial communication — Debug / logging' },
  { id: 'SPI',   desc: 'Serial Peripheral Interface — External memory' },
  { id: 'I²C',   desc: 'Two-wire bus — Sensor communication' },
  { id: 'CAN',   desc: 'Controller Area Network — ECU-to-ECU messaging' },
  { id: 'NVM',   desc: 'Non-volatile memory — Config persistence' },
];

export default function SectionBuiltForRealWorld() {
  const sectionRef = useRef(null);
  const peripheralRefs = useRef([]);

  useEffect(() => {
    const items = peripheralRefs.current.filter(Boolean);

    items.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.06,
        },
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="real-world"
      className="section-padding"
      style={{ background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)' }}
      aria-label="Built for the real world"
    >
      <div className="container-wide">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* Left — headline */}
          <div>
            <div className="tech-line" style={{ marginBottom: '2rem' }}>
              <span className="text-label-accent">01</span>
            </div>

            <h2
              className="text-display"
              style={{ color: 'var(--color-text)', marginBottom: '1rem' }}
            >
              NOT JUST
            </h2>
            <h2
              className="text-display"
              style={{ color: 'var(--color-text)', marginBottom: '1rem' }}
            >
              CODE.
            </h2>
            <h2
              className="text-display"
              style={{ color: 'var(--color-accent)', marginBottom: '2.5rem' }}
            >
              REAL
            </h2>
            <h2
              className="text-display"
              style={{ color: 'var(--color-accent)', marginBottom: '3rem' }}
            >
              SYSTEMS.
            </h2>

            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                maxWidth: '400px',
              }}
            >
              From GPIO inputs to CAN frames to PWM outputs — every peripheral
              in an embedded system has a purpose. I work at the level where
              firmware meets real hardware behaviour.
            </p>
          </div>

          {/* Right — peripherals list */}
          <div>
            <div className="text-label" style={{ marginBottom: '2rem' }}>
              NXP S32K144 PERIPHERALS USED IN PROJECT
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {PERIPHERALS.map((p, i) => (
                <div
                  key={p.id}
                  ref={el => peripheralRefs.current[i] = el}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--color-border)',
                    opacity: 0,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Indicator */}
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--color-accent)',
                        flexShrink: 0,
                        boxShadow: '0 0 8px var(--color-accent)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-mono)',
                        minWidth: '3rem',
                      }}
                    >
                      {p.id}
                    </span>
                  </div>
                  <span className="text-label" style={{ textAlign: 'right', maxWidth: '60%' }}>
                    {p.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
