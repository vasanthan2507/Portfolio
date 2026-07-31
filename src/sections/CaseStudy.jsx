import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft, HiArrowRight, HiExternalLink } from 'react-icons/hi';
import { projects } from '../data';
import DeviceShowcase from '../components/DeviceShowcase';
import ImagePlaceholder from '../components/ImagePlaceholder';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

function SectionLabel({ children }) {
  return (
    <span className="label-text" style={{ display: 'block', marginBottom: '0.75rem' }}>
      {children}
    </span>
  );
}

function ContentBlock({ label, children, delay = 0 }) {
  return (
    <motion.div {...fadeUp(delay)}>
      <SectionLabel>{label}</SectionLabel>
      {children}
    </motion.div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <p className="label-text mb-4">404</p>
          <h1 className="font-display text-fluid_2xl text-primary mb-6">Project not found</h1>
          <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  const c = project.color;
  const rgb = hexToRgb(c);

  return (
    <div className="bg-page min-h-screen" style={{ cursor: 'default' }}>

      {/* ── Back nav ── */}
      <div style={{ padding: 'clamp(5rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem) 0' }}>
        <div style={{ maxWidth: 'min(1360px, 96vw)', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/#works"
              className="text-secondary hover:text-accent"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'color 0.3s',
              }}
            >
              <HiArrowLeft size={14} /> Back to Works
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div style={{ padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 6vw, 5rem)' }}>
        <div style={{ maxWidth: 'min(1360px, 96vw)', margin: '0 auto' }}>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
          >
            <span className="label-text" style={{ color: `rgba(${rgb}, 0.9)` }}>{project.category}</span>
            <span style={{ width: '1px', height: '14px', background: 'var(--border)' }} />
            <span className="label-text">{project.year}</span>
            <span style={{ width: '1px', height: '14px', background: 'var(--border)' }} />
            <span className="label-text">{project.index} / 04</span>
          </motion.div>

          {/* Title */}
          <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-primary"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', marginBottom: 'clamp(3rem, 6vw, 6rem)' }}
          >
            <div style={{
              position: 'absolute', inset: '-5%',
              background: `radial-gradient(ellipse at center, rgba(${rgb}, 0.1) 0%, transparent 70%)`,
              filter: 'blur(40px)', pointerEvents: 'none',
            }} />
            <div style={{
              background: '#0A0F1E',
              border: `1px solid rgba(${rgb}, 0.15)`,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(${rgb}, 0.06)`,
            }}>
              {/* Browser bar */}
              <div style={{
                padding: '10px 16px', background: '#070C18',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map((dot, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: dot, opacity: 0.65 }} />
                ))}
                <div style={{
                  flex: 1, marginLeft: '10px', height: '20px', borderRadius: '4px',
                  background: 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', paddingLeft: '10px',
                }}>
                  <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}>
                    {project.live ? project.live.replace('https://', '') : project.slug}
                  </span>
                </div>
              </div>
              <ImagePlaceholder
                label="Desktop Screenshot"
                aspect="16/8"
                color={c}
                src={project.images?.desktop}
                alt={`${project.title} full preview`}
              />
            </div>
          </motion.div>

          {/* ── Overview + Tech grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
          }}>
            <ContentBlock label="Overview">
              <p className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: 1.8 }}>
                {project.overview}
              </p>
            </ContentBlock>

            <ContentBlock label="Technology Stack" delay={0.05}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    style={{
                      fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '0.35rem 0.85rem', borderRadius: '2px',
                      border: `1px solid rgba(${rgb}, 0.25)`,
                      color: `rgba(${rgb}, 0.85)`,
                      background: `rgba(${rgb}, 0.06)`,
                    }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </ContentBlock>
          </div>

          {/* ── Problem / Solution ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
          }}>
            {[
              { label: 'Problem Statement', content: project.problem },
              { label: 'Solution', content: project.solution },
            ].map(({ label, content }, i) => (
              <motion.div
                key={label}
                {...fadeUp(i * 0.08)}
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                  borderRadius: '8px',
                  border: `1px solid rgba(${rgb}, 0.12)`,
                  background: `rgba(${rgb}, 0.03)`,
                }}
              >
                <SectionLabel>{label}</SectionLabel>
                <p className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 0.95rem)', lineHeight: 1.8 }}>
                  {content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Features ── */}
          <motion.div {...fadeUp()} style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
            <SectionLabel>Features</SectionLabel>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            }}>
              {project.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    padding: 'clamp(0.875rem, 1.5vw, 1.25rem)',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.01)',
                  }}
                >
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '0.35rem',
                    background: c, boxShadow: `0 0 8px rgba(${rgb}, 0.6)`,
                  }} />
                  <span className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Responsive Showcase ── */}
          <div style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
            <DeviceShowcase project={project} />
          </div>

          {/* ── Challenges + Outcome ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
          }}>
            {[
              { label: 'Challenges', content: project.challenges },
              { label: 'Outcome', content: project.outcome },
            ].map(({ label, content }, i) => (
              <motion.div
                key={label}
                {...fadeUp(i * 0.08)}
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                }}
              >
                <SectionLabel>{label}</SectionLabel>
                <p className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 1.1vw, 0.95rem)', lineHeight: 1.8 }}>
                  {content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Development Journey ── */}
          <motion.div {...fadeUp()} style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)' }}>
            <SectionLabel>Development Journey</SectionLabel>
            <p className="text-secondary" style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              lineHeight: 1.85, maxWidth: '72ch',
            }}>
              {project.journey}
            </p>
          </motion.div>

          {/* ── Final Outcome + CTA ── */}
          <motion.div
            {...fadeUp()}
            style={{
              padding: 'clamp(2rem, 4vw, 4rem)',
              borderRadius: '12px',
              border: `1px solid rgba(${rgb}, 0.15)`,
              background: `rgba(${rgb}, 0.03)`,
              marginBottom: 'clamp(3rem, 6vw, 6rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            <div>
              <SectionLabel>Final Outcome</SectionLabel>
              <p className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: 1.8, maxWidth: '60ch' }}>
                {project.outcome}
              </p>
            </div>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
              >
                <HiExternalLink size={14} /> Visit Live Site
              </a>
            )}
          </motion.div>

          {/* ── Next project ── */}
          <motion.div
            {...fadeUp()}
            style={{ borderTop: '1px solid var(--border)', paddingTop: 'clamp(2rem, 4vw, 4rem)' }}
          >
            <span className="label-text" style={{ display: 'block', marginBottom: '1.5rem' }}>Next Project</span>
            <button
              onClick={() => navigate(`/work/${nextProject.slug}`)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, textAlign: 'left',
              }}
              className="group"
              aria-label={`Go to next project: ${nextProject.title}`}
            >
              <div>
                <span className="label-text" style={{ color: `rgba(${hexToRgb(nextProject.color)}, 0.8)` }}>
                  {nextProject.category}
                </span>
                <h3
                  className="font-display text-primary"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                    lineHeight: 1.05, marginTop: '0.4rem',
                    transition: 'color 0.3s',
                  }}
                >
                  {nextProject.title}
                </h3>
              </div>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 'clamp(40px, 5vw, 60px)', height: 'clamp(40px, 5vw, 60px)',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)', flexShrink: 0,
                }}
              >
                <HiArrowRight size={18} />
              </motion.div>
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
