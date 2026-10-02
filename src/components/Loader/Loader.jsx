import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import profile from '@/data/profile.js';

const BOOT_SEQUENCE = [
  { text: 'SYSTEM INITIALIZING...', delay: 300 },
  { text: `ECU NODE: ${profile.name.replace(' ', '_')}`, delay: 600 },
  { text: 'ARCHITECTURE: EMBEDDED', delay: 900 },
  { text: 'PROTOCOL: CAN / UART / SPI / I2C', delay: 1200 },
  { text: 'CORE: NXP S32K144', delay: 1500 },
  { text: 'CAN BUS: ONLINE', delay: 2000 },
  { text: 'ECU: ONLINE', delay: 2300 },
  { text: 'S32K144: ONLINE', delay: 2600 },
  { text: 'STATUS: READY', delay: 3000 },
];

const TOTAL_DURATION = 3800; // ms before exit begins

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const barFillRef = useRef(null);
  const counterRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reveal boot lines sequentially
    BOOT_SEQUENCE.forEach(({ text, delay }) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, text]);
      }, delay);
    });

    // Animate progress counter 0 → 100
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / TOTAL_DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    // Exit sequence
    const exitTimer = setTimeout(() => {
      setDone(true);
      // Animate loader out
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          onComplete?.();
        },
      });
    }, TOTAL_DURATION + 400);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: 'var(--color-bg-dark)',
        zIndex: 'var(--z-loader)',
        fontFamily: 'var(--font-mono)',
      }}
      aria-label="Loading automotive embedded systems portfolio"
    >
      {/* Scan line effect */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--color-accent)',
            animation: 'scan-line 3s linear infinite',
          }}
        />
      </div>

      {/* Center content */}
      <div style={{ width: 'min(480px, 90vw)' }}>
        {/* Logo / Name */}
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'var(--color-text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            AUTOMOTIVE EMBEDDED SYSTEMS
          </div>
          <div
            style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-main)',
            }}
          >
            {profile.nameShort}
          </div>
        </div>

        {/* Boot lines */}
        <div
          style={{
            marginBottom: '2.5rem',
            minHeight: '11rem',
          }}
        >
          {BOOT_SEQUENCE.map(({ text }, i) => (
            <div
              key={text}
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.06em',
                lineHeight: 2,
                color: visibleLines.includes(text)
                  ? i === BOOT_SEQUENCE.length - 1
                    ? 'var(--color-accent)'
                    : 'var(--color-text-muted)'
                  : 'transparent',
                transition: 'color 0.3s ease',
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              color: 'var(--color-text-muted)',
            }}
          >
            <span>SYSTEM BOOT</span>
            <span ref={counterRef} style={{ color: progress === 100 ? 'var(--color-accent)' : 'inherit' }}>
              {String(progress).padStart(3, '0')}%
            </span>
          </div>
        </div>

        {/* Status footer */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.55rem',
            letterSpacing: '0.14em',
            color: 'var(--color-text-faint)',
          }}
        >
          <span>NXP S32K144</span>
          <span>CAN 500 kbps</span>
          <span>ECU_01</span>
        </div>
      </div>
    </div>
  );
}
