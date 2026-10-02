import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profile from '@/data/profile.js';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.about-block') || [];
    gsap.fromTo(cards,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      },
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section"
      style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border)' }}
      aria-label="About me"
    >
      <div className="container">
        {/* Header */}
        <div className="section-label" style={{ marginBottom: '4rem' }}>
          <span className="t-label-accent">About</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Left — big headline */}
          <div>
            <h2
              className="about-block t-heading"
              style={{ marginBottom: '2rem', opacity: 0 }}
            >
              A LITTLE
              <br />
              ABOUT
              <br />
              <span className="accent">ME.</span>
            </h2>

            {/* Decorative stack of info */}
            <div
              className="about-block"
              style={{
                padding: '1.5rem',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                opacity: 0,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { k: 'FOCUSED ON', v: 'Automotive Embedded Systems' },
                  { k: 'MCU',        v: 'NXP S32K144' },
                  { k: 'LANGUAGES',  v: 'Embedded C' },
                  { k: 'PROTOCOLS',  v: 'CAN · UDS · UART · SPI · I²C' },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: '0.75rem',
                      borderBottom: '1px solid var(--border-soft)',
                      gap: '1rem',
                    }}
                  >
                    <span className="t-label">{k}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text)', textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — bio paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="about-block t-body" style={{ opacity: 0, fontSize: '1rem', color: 'var(--text)', fontWeight: 500 }}>
              I'm an ECE student at Saveetha Engineering College, Chennai, focused on
              Automotive Embedded Systems.
            </p>
            <p className="about-block t-body" style={{ opacity: 0 }}>
              I have hands-on experience with the NXP S32K144, Embedded C, CAN communication,
              DBC-based ECU design, PWM, ADC, UART, SPI, I²C and NVM/EEPROM — the full
              peripheral stack that makes up a real automotive ECU.
            </p>
            <p className="about-block t-body" style={{ opacity: 0 }}>
              I also work across ESP32, LoRa mesh networking, BLE, GPS integration, KiCad
              PCB design and IoT systems — which keeps the hardware thinking
              broad even when the primary focus is automotive.
            </p>
            <p className="about-block t-body" style={{ opacity: 0 }}>
              What drives me is the moment where a line of firmware makes something physical
              happen — a light turns on, a sensor reading changes a system state, a CAN
              message travels between two ECUs. That's the engineering I want to keep
              building toward.
            </p>

            {/* Open to */}
            <div
              className="about-block"
              style={{
                marginTop: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                opacity: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--accent)',
                    animation: 'pulse-accent 2s ease infinite',
                  }}
                />
                <span className="t-label-accent">Currently Open To</span>
              </div>
              <p className="t-body">{profile.openTo}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
