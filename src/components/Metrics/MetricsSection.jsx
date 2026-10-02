import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import metrics from '@/data/metrics.js';

gsap.registerPlugin(ScrollTrigger);

function MetricCard({ metric }) {
  const valueRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const target = metric.animateTo;
        const decimals = metric.decimals || 0;
        const duration = 1.8;

        gsap.to({ val: 0 }, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: function () {
            if (el) {
              const v = this.targets()[0].val;
              el.textContent = (metric.prefix || '') + v.toFixed(decimals) + metric.suffix;
            }
          },
        });
      },
    });

    return () => st.kill();
  }, [metric]);

  return (
    <div
      style={{
        padding: '2rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        ref={valueRef}
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-mono)',
          marginBottom: '0.5rem',
          lineHeight: 1,
        }}
      >
        {(metric.prefix || '') + '0' + metric.suffix}
      </div>
      <div
        style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: 'var(--color-accent)',
          marginBottom: '0.25rem',
        }}
      >
        {metric.label}
      </div>
      <div className="text-label">{metric.sublabel}</div>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <section
      id="metrics"
      className="section-padding"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Project metrics and statistics"
    >
      <div className="container-wide">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div className="tech-line" style={{ marginBottom: '1rem' }}>
              <span className="text-label-accent">BY THE NUMBERS</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
              }}
            >
              PROTOTYPE
            </h2>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: 'var(--color-accent)',
              }}
            >
              METRICS.
            </h2>
          </div>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              maxWidth: '280px',
              lineHeight: 1.7,
            }}
          >
            Documented measurements from actual prototype testing.
            No fabricated production metrics.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '0 3rem',
          }}
        >
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
