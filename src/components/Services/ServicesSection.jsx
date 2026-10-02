import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'AUTOMOTIVE EMBEDDED',
    stack: [
      'Embedded C firmware',
      'NXP S32K144 MCU',
      'GPIO · Timers (FTM) · PWM',
      'ADC · UART · SPI · I²C',
      'CAN communication',
      'ECU prototyping',
      'NVM / EEPROM',
    ],
    desc: 'End-to-end embedded firmware development on the NXP S32K144 — from peripheral configuration to CAN-based ECU communication.',
  },
  {
    num: '02',
    title: 'AUTOMOTIVE COMMUNICATION',
    stack: [
      'CAN protocol (500 kbps)',
      'DBC file authoring',
      'UDS fundamentals (ISO 14229)',
      'ECU-to-ECU messaging',
      'TSMaster CAN analysis',
      'AUTOSAR concepts (learning)',
    ],
    desc: 'Designing and validating CAN-based automotive communication pipelines, from DBC message definition to TSMaster trace analysis.',
  },
  {
    num: '03',
    title: 'HARDWARE & EMBEDDED PROTOTYPING',
    stack: [
      'ESP32 firmware',
      'LoRa mesh networking',
      'BLE (GATT) communication',
      'GPS integration',
      'PCB design (KiCad)',
      'Sensor integration',
      'IoT systems',
    ],
    desc: 'Building hardware prototypes from PCB layout to firmware — ESP32, LoRa, BLE and multi-sensor IoT systems.',
  },
];

export default function ServicesSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <section
      id="services"
      className="section-padding"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="What I build — services"
    >
      <div className="container-wide">
        <div className="tech-line" style={{ marginBottom: '1.5rem' }}>
          <span className="text-label-accent">WHAT I BUILD</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            marginBottom: '4rem',
          }}
        >
          CAPABILITIES.
        </h2>

        <div style={{ borderTop: '1px solid var(--color-border)' }}>
          {SERVICES.map((svc, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={svc.num}
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <button
                  onClick={() => toggle(i)}
                  data-cursor="hover"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '2rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`service-content-${i}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: 'var(--color-text-faint)',
                        letterSpacing: '0.1em',
                        flexShrink: 0,
                      }}
                    >
                      {svc.num}
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: isOpen ? 'var(--color-accent)' : 'var(--color-text)',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {svc.title}
                    </span>
                  </div>

                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 300ms ease',
                      color: 'var(--color-text-muted)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {/* Expandable content */}
                <div
                  id={`service-content-${i}`}
                  style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '600px' : '0',
                    transition: 'max-height 500ms var(--ease-out-expo)',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '3rem',
                      paddingBottom: '2.5rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.875rem',
                        lineHeight: 1.75,
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {svc.desc}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, columns: 2, gap: '0.5rem' }}>
                      {svc.stack.map((item) => (
                        <li
                          key={item}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            marginBottom: '0.5rem',
                            breakInside: 'avoid',
                          }}
                        >
                          <div
                            style={{
                              width: '4px',
                              height: '4px',
                              background: 'var(--color-accent)',
                              borderRadius: '50%',
                              flexShrink: 0,
                            }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
