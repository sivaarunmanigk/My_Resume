import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AREAS = [
  {
    num: '01',
    title: 'AUTOMOTIVE EMBEDDED',
    short: 'Firmware for the real world',
    desc: 'Embedded C, NXP S32K144, GPIO, interrupts, timers (FTM), PWM, ADC, UART, SPI, I²C and NVM/EEPROM. Building ECUs that respond to real hardware signals.',
  },
  {
    num: '02',
    title: 'ECU COMMUNICATION',
    short: 'Speaking the language of vehicles',
    desc: 'CAN protocol, DBC file authoring, ECU-to-ECU messaging, TSMaster trace analysis and UDS diagnostics at a fundamentals level (ISO 14229).',
  },
  {
    num: '03',
    title: 'MODEL-BASED DEVELOPMENT',
    short: 'Simulate before deploying',
    desc: 'MATLAB, Simulink and Embedded Coder for designing, simulating and generating embedded C from control logic models. Design verification before hardware.',
  },
  {
    num: '04',
    title: 'EMBEDDED HARDWARE',
    short: 'From idea to physical board',
    desc: 'ESP32, LoRa (SX1278), BLE, GPS, sensor integration, and KiCad PCB design. End-to-end hardware prototyping across multiple domains.',
  },
];

export default function SpecializationSection() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          delay: i * 0.08,
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
      id="specialization"
      className="section"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-label="Where I'm focused — specialization areas"
    >
      <div className="container">
        <div className="section-label">
          <span className="t-label-accent">Specialization</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '5rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <h2 className="t-display" style={{ lineHeight: 1 }}>
            WHERE
            <br />
            <span className="accent">I'M FOCUSED.</span>
          </h2>
          <p
            className="t-body"
            style={{ maxWidth: '340px', paddingBottom: '0.5rem' }}
          >
            Four areas where my engineering work sits — each building toward
            automotive embedded systems expertise.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {AREAS.map((area, i) => (
            <div
              key={area.num}
              ref={el => cardsRef.current[i] = el}
              className="spec-card"
              style={{ opacity: 0 }}
              aria-label={area.title}
            >
              {/* Number + line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {area.num}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: 'var(--text)',
                  marginBottom: '0.4rem',
                }}
              >
                {area.title}
              </h3>

              {/* Short */}
              <div className="t-label" style={{ color: 'var(--accent)', marginBottom: '1.25rem' }}>
                {area.short}
              </div>

              {/* Desc */}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
