import { useRef, useState } from 'react';
import projects from '@/data/projects.js';
import ProjectModal from './ProjectModal.jsx';

// Visual colors per project
const ACCENTS = {
  'ecu-can':          '#D9622B',
  'radio-mesh':       '#3B82F6',
  'emergency-beacon': '#EF4444',
  'wearable':         '#10B981',
  'agriculture':      '#84CC16',
};

const BG_COLORS = {
  'ecu-can':          '#160C06',
  'radio-mesh':       '#060B18',
  'emergency-beacon': '#160606',
  'wearable':         '#041209',
  'agriculture':      '#080F02',
};

function ProjectVisual({ project, hovered }) {
  const accent = ACCENTS[project.heroVisual] || '#D9622B';
  const bg = BG_COLORS[project.heroVisual] || '#100A06';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: bg,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id={`vg-${project.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#F2ECE4" strokeWidth="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#vg-${project.id})`} />
      </svg>

      {/* Animated concentric rings */}
      <div style={{ position: 'relative', width: '140px', height: '140px' }}>
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: `${i * 17}px`,
              borderRadius: '50%',
              border: `1px solid ${accent}`,
              opacity: hovered ? (0.7 - i * 0.14) : (0.2 - i * 0.04),
              transform: hovered ? `scale(${1 + i * 0.06})` : 'scale(1)',
              transition: `all ${400 + i * 120}ms ease`,
            }}
          />
        ))}
        {/* Center dot */}
        <div
          style={{
            position: 'absolute',
            inset: '58px',
            borderRadius: '50%',
            background: accent,
            opacity: hovered ? 1 : 0.5,
            boxShadow: hovered ? `0 0 20px ${accent}` : 'none',
            transition: 'all 400ms ease',
          }}
        />
      </div>

      {/* Award badge */}
      {project.award && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: accent,
            color: '#fff',
            fontSize: '0.5rem',
            letterSpacing: '0.1em',
            fontWeight: 700,
            padding: '0.3rem 0.65rem',
          }}
        >
          {project.award}
        </div>
      )}

      {/* Gradient overlay from bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: `linear-gradient(to top, ${bg}, transparent)`,
          transition: 'opacity 300ms ease',
          opacity: hovered ? 0.6 : 1,
        }}
      />
    </div>
  );
}

// Large format card (first project)
function ProjectCardLarge({ project, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="project"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '520px',
        border: `1px solid ${hovered ? 'rgba(217,98,43,0.35)' : 'var(--border)'}`,
        cursor: 'pointer',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        transition: 'border-color 300ms ease',
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Visual */}
      <div style={{ overflow: 'hidden' }}>
        <div
          className="card-image"
          style={{ width: '100%', height: '100%' }}
        >
          <ProjectVisual project={project} hovered={hovered} />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '1px solid var(--border)',
        }}
      >
        <div>
          {/* Meta */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >
            <span className="t-label-accent">{project.category}</span>
            <span className="t-label">{project.year}</span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              color: 'var(--text)',
              marginBottom: '1.25rem',
              whiteSpace: 'pre-line',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="t-body" style={{ marginBottom: '2rem', maxWidth: '380px' }}>
            {project.tagline}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.technologies.slice(0, 5).map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            color: hovered ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'color 200ms ease',
          }}
        >
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}>
            VIEW CASE STUDY
          </span>
          <span style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 200ms ease' }}>
            →
          </span>
        </div>
      </div>
    </article>
  );
}

// Standard card (remaining projects)
function ProjectCardStd({ project, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="project"
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${hovered ? 'rgba(217,98,43,0.3)' : 'var(--border)'}`,
        cursor: 'pointer',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        transition: 'border-color 300ms ease',
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Visual */}
      <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 700ms var(--ease-expo)',
          }}
        >
          <ProjectVisual project={project} hovered={hovered} />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span className="t-label-accent">{project.category}</span>
          <span className="t-label">{project.year}</span>
        </div>

        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'var(--text)',
            marginBottom: '0.75rem',
            whiteSpace: 'pre-line',
          }}
        >
          {project.title}
        </h3>

        <p
          className="t-body"
          style={{ fontSize: '0.78rem', marginBottom: '1.25rem', flex: 1 }}
        >
          {project.tagline}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {project.technologies.slice(0, 3).map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: hovered ? 'var(--accent)' : 'var(--text-faint)',
            transition: 'color 200ms ease',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
          }}
        >
          VIEW CASE STUDY →
        </div>
      </div>
    </article>
  );
}

export default function SelectedProjects() {
  const [activeProject, setActiveProject] = useState(null);
  const [firstProject, ...restProjects] = projects;

  return (
    <section
      id="projects"
      className="section"
      style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border)' }}
      aria-label="Selected projects"
    >
      <div className="container">
        {/* Header */}
        <div className="section-label">
          <span className="t-label-accent">Work</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <h2 className="t-display">
            SELECTED
            <br />
            <span className="accent">PROJECTS.</span>
          </h2>
          <p className="t-body" style={{ maxWidth: '320px', paddingBottom: '0.5rem' }}>
            Things I've designed, built and tested.
          </p>
        </div>

        {/* Featured project — large format */}
        <div style={{ marginBottom: '1.5rem' }}>
          <ProjectCardLarge project={firstProject} onClick={setActiveProject} />
        </div>

        {/* Remaining projects — grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {restProjects.map((p) => (
            <ProjectCardStd key={p.id} project={p} onClick={setActiveProject} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
