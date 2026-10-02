import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MBD_STEPS = [
  { id: 'model',     label: 'SIMULINK MODEL',  desc: 'Design control logic as block diagrams',  color: 'var(--color-accent)' },
  { id: 'simulate',  label: 'SIMULATE',         desc: 'Validate behaviour before hardware',       color: 'var(--color-text)' },
  { id: 'generate',  label: 'CODE GENERATION',  desc: 'Embedded Coder → ANSI C output',          color: 'var(--color-text)' },
  { id: 'embed',     label: 'EMBEDDED C',       desc: 'Generated C deployed to S32K144',          color: 'var(--color-text)' },
  { id: 'flash',     label: 'S32K144',          desc: 'Flash via S32DS debug interface',          color: 'var(--color-text)' },
  { id: 'validate',  label: 'VALIDATE',         desc: 'Test on hardware — TSMaster + signals',    color: 'var(--color-accent)' },
];

export default function SectionMBD() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    stepsRef.current.forEach((el, i) => {
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        onEnter: () => {
          setActiveStep(prev => Math.max(prev, i));
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.08 },
          );
        },
        once: true,
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mbd"
      className="section-padding"
      style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
      aria-label="Model-Based Development section"
    >
      <div className="container-wide">
        <div className="tech-line" style={{ marginBottom: '2rem' }}>
          <span className="text-label-accent">05 · MODEL-BASED DEVELOPMENT</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Left — headline */}
          <div>
            <h2 className="text-display" style={{ marginBottom: '0.5rem' }}>MODEL.</h2>
            <h2 className="text-display" style={{ marginBottom: '0.5rem' }}>SIMULATE.</h2>
            <h2 className="text-display" style={{ marginBottom: '0.5rem', color: 'var(--color-accent)' }}>GENERATE.</h2>
            <h2 className="text-display" style={{ marginBottom: '0.5rem' }}>DEPLOY.</h2>
            <h2 className="text-display" style={{ marginBottom: '3rem' }}>VALIDATE.</h2>

            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                maxWidth: '400px',
              }}
            >
              Model-Based Development with MATLAB and Simulink allows control
              logic to be designed, simulated and validated before a single
              line of handwritten C code is written. Embedded Coder generates
              production-ready ANSI C from the model.
            </p>

            <div
              className="hud-frame"
              style={{ marginTop: '2.5rem', display: 'inline-block' }}
            >
              <div className="text-label" style={{ marginBottom: '0.5rem' }}>TOOLS</div>
              {['MATLAB', 'Simulink', 'Embedded Coder', 'NXP S32DS', 'TSMaster'].map(t => (
                <div
                  key={t}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 2,
                    letterSpacing: '0.06em',
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — step pipeline */}
          <div>
            <div className="text-label" style={{ marginBottom: '2rem' }}>
              MBD WORKFLOW PIPELINE
            </div>

            {MBD_STEPS.map((step, i) => (
              <div
                key={step.id}
                ref={el => stepsRef.current[i] = el}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  marginBottom: '0',
                  opacity: 0,
                }}
              >
                {/* Left gutter: number + connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: `1px solid ${i <= activeStep ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      background: i <= activeStep ? 'rgba(217,98,43,0.1)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.55rem',
                      fontFamily: 'var(--font-mono)',
                      color: i <= activeStep ? 'var(--color-accent)' : 'var(--color-text-faint)',
                      transition: 'all 300ms ease',
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < MBD_STEPS.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        height: '3rem',
                        background: i < activeStep ? 'var(--color-accent)' : 'var(--color-border)',
                        transition: 'background 300ms ease',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: i < MBD_STEPS.length - 1 ? '0' : '0', paddingTop: '0.2rem' }}>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: step.color,
                      marginBottom: '0.2rem',
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.5,
                      marginBottom: i < MBD_STEPS.length - 1 ? '2rem' : 0,
                    }}
                  >
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
