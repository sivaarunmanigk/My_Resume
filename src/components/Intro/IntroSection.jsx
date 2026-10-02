import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profile from '@/data/profile.js';
import portraitImg from '../../assets/images/portrait.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const headlineRef = useRef(null);
  const textRef     = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    const words = headlineRef.current?.querySelectorAll('.intro-word') || [];
    gsap.fromTo(words,
      { y: '110%' },
      {
        y: '0%',
        stagger: 0.07,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    );

    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }

    if (portraitRef.current) {
      gsap.fromTo(portraitRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1,
          duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  }, []);

  const HEADLINE = ['I', 'BUILD', 'SYSTEMS', 'THAT', 'CONNECT.'];

  return (
    <section
      id="intro"
      className="section"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      aria-label="Personal introduction"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Left — portrait */}
          <div
            ref={portraitRef}
            style={{
              aspectRatio: '3/4',
              maxWidth: '480px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
              clipPath: 'inset(0 100% 0 0)',
            }}
          >
            {/* Portrait actual image */}
            <img
              src={portraitImg}
              alt={`${profile.nameFirst} ${profile.nameLast}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Name overlay at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '1.5rem',
                background: 'linear-gradient(to top, rgba(10,8,6,0.9), transparent)',
              }}
            >
              <div className="t-label" style={{ color: 'var(--text-muted)' }}>
                {profile.nameFirst} {profile.nameLast}
              </div>
              <div className="t-label" style={{ color: 'var(--text-faint)' }}>
                Automotive Embedded Engineer
              </div>
            </div>
          </div>

          {/* Right — headline + bio */}
          <div>
            {/* Staggered headline */}
            <div
              ref={headlineRef}
              style={{ marginBottom: '3rem' }}
              aria-label="I build systems that connect."
            >
              {HEADLINE.map((word, i) => (
                <div
                  key={i}
                  style={{ overflow: 'hidden', lineHeight: 1 }}
                >
                  <span
                    className="intro-word t-display"
                    style={{
                      display: 'block',
                      color: i < 3 ? 'var(--text)' : 'var(--accent)',
                      transform: 'translateY(110%)',
                    }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {/* Body */}
            <div ref={textRef} style={{ opacity: 0 }}>
              <p className="t-body" style={{ marginBottom: '1.25rem' }}>
                I'm <span style={{ color: 'var(--text)' }}>Sivaarunmani G K</span>, an Electronics &amp; Communication
                Engineering student at {profile.college}, Chennai, focused on Automotive Embedded Systems.
              </p>
              <p className="t-body" style={{ marginBottom: '2.5rem' }}>
                My work sits between embedded firmware, automotive communication, hardware and
                real-world prototyping — from NXP S32K144 ECUs and CAN buses to ESP32, LoRa mesh
                networks and PCB design.
              </p>

              {/* Quick facts */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.25rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                {[
                  { label: 'Degree',     value: 'B.E. ECE' },
                  { label: 'College',    value: profile.college },
                  { label: 'Graduation', value: profile.graduation },
                  { label: 'Location',   value: profile.locationShort },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="t-label" style={{ marginBottom: '0.3rem' }}>{label}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
