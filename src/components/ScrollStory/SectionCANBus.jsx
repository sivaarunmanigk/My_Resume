import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated CAN packet — travels from left to right
function CANPacket({ msgId, dlc, data, delay, label }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el, { x: '-100%', opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay,
        });
      },
      once: true,
    });
    return () => st.kill();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        borderLeft: '2px solid var(--color-accent)',
        paddingLeft: '1rem',
        marginBottom: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-accent)',
            letterSpacing: '0.08em',
          }}
        >
          ID {msgId}
        </span>
        <span className="text-label">DLC {dlc}</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-text)',
          }}
        >
          DATA {data}
        </span>
        {label && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-text-muted)',
              background: 'var(--color-bg-card)',
              padding: '0.2rem 0.5rem',
              border: '1px solid var(--color-border)',
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

// Animated bus between two ECUs
function CANBusDiagram() {
  const wireRef = useRef(null);
  const [packetPos, setPacketPos] = useState(0);

  useEffect(() => {
    let raf;
    let start;
    const animate = (t) => {
      if (!start) start = t;
      const elapsed = (t - start) % 2000;
      setPacketPos(elapsed / 2000);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
        padding: '2rem 0',
      }}
    >
      {/* ECU A */}
      <div className="hud-frame" style={{ width: '180px', textAlign: 'center', marginBottom: '0' }}>
        <div className="text-label-accent" style={{ marginBottom: '0.25rem' }}>ECU — TRANSMITTER</div>
        <div
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text)' }}
        >
          NXP S32K144 #1
        </div>
        <div style={{ marginTop: '0.3rem' }}>
          <span className="text-label" style={{ color: 'var(--color-accent)' }}>
            GPIO → CAN TX
          </span>
        </div>
      </div>

      {/* Bus wire */}
      <div
        style={{
          position: 'relative',
          width: '2px',
          height: '100px',
          background: 'var(--color-border)',
          overflow: 'visible',
        }}
      >
        {/* Animated packet */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: `${packetPos * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--color-accent)',
            boxShadow: '0 0 12px var(--color-accent)',
          }}
          aria-hidden="true"
        />
        {/* Labels */}
        <div
          style={{
            position: 'absolute',
            left: '16px',
            top: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--color-text-faint)',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}
        >
          CAN BUS · 500 kbps
        </div>
        <div
          style={{
            position: 'absolute',
            left: '16px',
            top: '45px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--color-text-faint)',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}
        >
          ID: 0x100
        </div>
      </div>

      {/* ECU B */}
      <div className="hud-frame" style={{ width: '180px', textAlign: 'center', marginTop: '0' }}>
        <div className="text-label-accent" style={{ marginBottom: '0.25rem' }}>ECU — RECEIVER</div>
        <div
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text)' }}
        >
          NXP S32K144 #2
        </div>
        <div style={{ marginTop: '0.3rem' }}>
          <span className="text-label" style={{ color: 'var(--color-accent)' }}>
            CAN RX → PWM OUT
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SectionCANBus() {
  return (
    <section
      id="can"
      className="section-padding"
      style={{
        background: '#07090A',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="CAN bus communication section"
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
          {/* Left — visual */}
          <div>
            <div className="tech-line" style={{ marginBottom: '2rem' }}>
              <span className="text-label-accent">03 · CAN BUS</span>
            </div>

            <h2 className="text-display" style={{ marginBottom: '0.5rem' }}>
              TWO ECUs.
            </h2>
            <h2
              className="text-display"
              style={{ color: 'var(--color-accent)', marginBottom: '2rem' }}
            >
              ONE SYSTEM.
            </h2>

            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '440px',
              }}
            >
              The Automotive Door Status & Interior Light ECU project uses two
              NXP S32K144 MCUs communicating over CAN at 500 kbps. Door state
              is encoded into a DBC-defined CAN message and decoded by the
              second ECU to drive PWM-controlled lighting.
            </p>

            {/* Data flow */}
            <div>
              <div className="text-label" style={{ marginBottom: '1.5rem' }}>
                DATA FLOW
              </div>
              {[
                'DOOR SWITCH → GPIO INPUT',
                'GPIO → CAN TX (ID 0x100)',
                'CAN BUS → 500 kbps',
                'CAN RX → MESSAGE DECODE',
                'DECODE → PWM DUTY CYCLE',
                'PWM → INTERIOR LIGHT',
              ].map((step, i) => (
                <div
                  key={step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      width: '2px',
                      height: '1.5rem',
                      background: i === 2 ? 'var(--color-accent)' : 'var(--color-text-faint)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: i === 2 ? 'var(--color-text)' : 'var(--color-text-muted)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CAN diagram + packets */}
          <div>
            <CANBusDiagram />

            {/* CAN packet examples */}
            <div style={{ marginTop: '2.5rem' }}>
              <div className="text-label" style={{ marginBottom: '1.25rem' }}>
                EXAMPLE CAN MESSAGES — ID 0x100
              </div>
              <CANPacket msgId="0x100" dlc="01" data="0x01" delay={0} label="FL=OPEN" />
              <CANPacket msgId="0x100" dlc="01" data="0x09" delay={0.1} label="FL+RR=OPEN" />
              <CANPacket msgId="0x100" dlc="01" data="0x0F" delay={0.2} label="ALL DOORS OPEN" />
              <CANPacket msgId="0x100" dlc="01" data="0x00" delay={0.3} label="ALL CLOSED" />
            </div>

            {/* Decode legend */}
            <div
              className="hud-frame"
              style={{ marginTop: '1.5rem' }}
            >
              <div className="text-label" style={{ marginBottom: '0.75rem' }}>
                SIGNAL DECODE (DBC)
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.8,
                  letterSpacing: '0.04em',
                }}
              >
                <div>BIT[0] = FL (Front Left)</div>
                <div>BIT[1] = FR (Front Right)</div>
                <div>BIT[2] = RL (Rear Left)</div>
                <div>BIT[3] = RR (Rear Right)</div>
                <div style={{ marginTop: '0.5rem', color: 'var(--color-accent)' }}>
                  1 = OPEN · 0 = CLOSED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
