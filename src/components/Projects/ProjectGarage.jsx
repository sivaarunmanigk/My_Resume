import { useRef, useState } from 'react';
import projects from '@/data/projects.js';
import ProjectModal from './ProjectModal.jsx';

const PROJECT_VISUALS = {
  'ecu-can': { icon: '⬡', bg: 'from-orange-950/60 to-zinc-950' },
  'radio-mesh': { icon: '◉', bg: 'from-blue-950/60 to-zinc-950' },
  'emergency-beacon': { icon: '◎', bg: 'from-red-950/60 to-zinc-950' },
  'wearable': { icon: '◈', bg: 'from-emerald-950/60 to-zinc-950' },
  'agriculture': { icon: '⬡', bg: 'from-green-950/60 to-zinc-950' },
};

function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const visual = PROJECT_VISUALS[project.heroVisual] || PROJECT_VISUALS['ecu-can'];

  return (
    <article
      ref={cardRef}
      className="project-card"
      data-cursor="project"
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-bg-card)',
        border: `1px solid ${hovered ? 'rgba(217,98,43,0.3)' : 'var(--color-border)'}`,
        padding: '0',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 300ms ease',
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Visual header */}
      <div
        style={{
          height: '160px',
          background: `linear-gradient(135deg, ${
            project.heroVisual === 'ecu-can' ? '#1A0A04' :
            project.heroVisual === 'radio-mesh' ? '#04081A' :
            project.heroVisual === 'emergency-beacon' ? '#1A0404' :
            project.heroVisual === 'wearable' ? '#041A10' :
            '#041A04'
          }, #0A0806)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {/* Grid pattern */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }} aria-hidden="true">
          <defs>
            <pattern id={`g-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F2ECE4" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#g-${project.id})`} />
        </svg>

        {/* Award badge */}
        {project.award && (
          <div
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              background: 'var(--color-accent)',
              color: '#fff',
              fontSize: '0.5rem',
              letterSpacing: '0.1em',
              padding: '0.3rem 0.6rem',
              fontWeight: 700,
            }}
          >
            {project.award}
          </div>
        )}

        {/* Center visual */}
        <div style={{ textAlign: 'center' }}>
          {/* Animated rings */}
          <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `1px solid ${project.accent || 'var(--color-accent)'}`,
                opacity: hovered ? 0.6 : 0.2,
                transition: 'opacity 300ms ease, transform 300ms ease',
                transform: hovered ? 'scale(1.15)' : 'scale(1)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '8px',
                borderRadius: '50%',
                border: `1px solid ${project.accent || 'var(--color-accent)'}`,
                opacity: hovered ? 0.8 : 0.3,
                transition: 'opacity 300ms ease, transform 500ms ease',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '20px',
                borderRadius: '50%',
                background: `${project.accent || 'var(--color-accent)'}20`,
                border: `1px solid ${project.accent || 'var(--color-accent)'}`,
                opacity: hovered ? 1 : 0.5,
                transition: 'all 300ms ease',
              }}
            />
          </div>
        </div>

        {/* Index */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--color-text-faint)',
            letterSpacing: '0.1em',
          }}
        >
          {project.index} / 05
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        {/* Category */}
        <div
          className="text-label"
          style={{ color: project.accent || 'var(--color-accent)', marginBottom: '0.5rem' }}
        >
          {project.category}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'var(--color-text)',
            lineHeight: 1.2,
            marginBottom: '0.75rem',
            whiteSpace: 'pre-line',
          }}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            marginBottom: '1rem',
          }}
        >
          {project.tagline}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                padding: '0.2rem 0.5rem',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                padding: '0.2rem 0.5rem',
                color: 'var(--color-text-faint)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Year + CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span className="text-label">{project.year}</span>
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              color: hovered ? 'var(--color-accent)' : 'var(--color-text-faint)',
              transition: 'color 200ms ease',
            }}
          >
            VIEW CASE →
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ProjectGarage() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: 'var(--color-bg-dark)', borderTop: '1px solid var(--color-border)' }}
      aria-label="Project Garage"
    >
      <div className="container-wide">
        {/* Header */}
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
              <span className="text-label-accent">PROJECT GARAGE</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: 'var(--color-text)',
              }}
            >
              WORK &
            </h2>
            <h2
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: 'var(--color-accent)',
              }}
            >
              BUILDS.
            </h2>
          </div>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              maxWidth: '300px',
              lineHeight: 1.7,
            }}
          >
            Five hardware and firmware projects spanning automotive ECUs,
            emergency communication systems, wearable health monitoring
            and IoT.
          </p>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={setActiveProject}
            />
          ))}
        </div>
      </div>

      {/* Project modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
