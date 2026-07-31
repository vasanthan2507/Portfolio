import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight, HiExternalLink } from 'react-icons/hi';
import { projects } from '../data';
import ImagePlaceholder from '../components/ImagePlaceholder';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function useBreakpoint() {
  const [bp, setBp] = useState('desktop');
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 768)       setBp('mobile');
      else if (w < 992)  setBp('tablet');
      else if (w < 1200) setBp('laptop');
      else               setBp('desktop');
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return bp;
}

/* ─────────────────────────────────────────
   DESKTOP / LAPTOP  — cinematic side-by-side
───────────────────────────────────────── */
function DesktopEntry({ project, index, isLaptop }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isEven = index % 2 === 0;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const goToCase = () => navigate(`/work/${project.slug}`);
  const rgb = hexToRgb(project.color);

  const imgColSize = isLaptop ? 'clamp(220px, 42%, 480px)' : 'clamp(260px, 45%, 580px)';
  const gap        = isLaptop ? 'clamp(1.5rem, 3vw, 3.5rem)' : 'clamp(2rem, 5vw, 6rem)';
  const vPad       = isLaptop ? 'clamp(2rem, 4vw, 4rem) 0'   : 'clamp(3rem, 6vw, 6rem) 0';

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6 }}
      style={{ borderTop: '1px solid var(--border)', padding: vPad }}
      aria-label={`Project: ${project.title}`}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isEven ? `${imgColSize} 1fr` : `1fr ${imgColSize}`,
        gap,
        alignItems: 'center',
      }}>
        {/* Image */}
        <motion.div style={{ y: imgY, order: isEven ? 1 : 2 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={goToCase}
            whileHover={{ scale: 1.015 }}
          >
            <div style={{
              position: 'absolute', inset: '-10%',
              background: `radial-gradient(ellipse at center, rgba(${rgb}, 0.12) 0%, transparent 70%)`,
              filter: 'blur(30px)', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'relative', background: '#0A0F1E',
              border: `1px solid rgba(${rgb}, 0.15)`, borderRadius: '10px', overflow: 'hidden',
              boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(${rgb}, 0.06)`,
            }}>
              <div style={{
                padding: '9px 14px', background: '#070C18',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', gap: '7px',
              }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map((dot, i) => (
                  <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: dot, opacity: 0.65 }} />
                ))}
                <div style={{
                  flex: 1, marginLeft: '8px', height: '18px', borderRadius: '3px',
                  background: 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', paddingLeft: '8px',
                }}>
                  <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em' }}>
                    {project.live ? project.live.replace('https://', '') : project.slug}
                  </span>
                </div>
              </div>
              <ImagePlaceholder label="Desktop Screenshot" aspect="16/9" color={project.color}
                src={project.images?.desktop} alt={`${project.title} desktop preview`} />
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div style={{ order: isEven ? 2 : 1, display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 1.6vw, 1.4rem)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="font-display" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: `rgba(${rgb}, 0.15)`, lineHeight: 1, fontWeight: 300 }}>
              {project.index}
            </span>
            <span className="label-text" style={{ color: `rgba(${rgb}, 0.9)` }}>{project.category}</span>
          </motion.div>

          <motion.h3 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-primary"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', lineHeight: 1.05, letterSpacing: '-0.01em', cursor: 'pointer' }}
            onClick={goToCase}>
            {project.title}
          </motion.h3>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-secondary"
            style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: 1.75, maxWidth: '52ch' }}>
            {project.description}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tech.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                style={{
                  fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0.3rem 0.75rem', borderRadius: '2px',
                  border: `1px solid rgba(${rgb}, 0.2)`,
                  color: `rgba(${rgb}, 0.8)`, background: `rgba(${rgb}, 0.05)`,
                }}>
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {project.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0, background: `rgba(${rgb}, 0.7)` }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{h}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                aria-label={`Visit ${project.title} website`}>
                <HiExternalLink size={13} /> Visit Website
              </a>
            )}
            <button onClick={goToCase} className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              aria-label={`View case study for ${project.title}`}>
              View Case Study <HiArrowRight size={13} />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────
   TABLET  — vertical, image first
───────────────────────────────────────── */
function TabletEntry({ project, index }) {
  const navigate = useNavigate();
  const goToCase = () => navigate(`/work/${project.slug}`);
  const rgb = hexToRgb(project.color);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: '1px solid var(--border)', padding: 'clamp(2rem, 4vw, 3.5rem) 0' }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', cursor: 'pointer', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        onClick={goToCase}
      >
        <div style={{
          position: 'absolute', inset: '-6%',
          background: `radial-gradient(ellipse at center, rgba(${rgb}, 0.1) 0%, transparent 70%)`,
          filter: 'blur(24px)', pointerEvents: 'none',
        }} />
        <div style={{
          background: '#0A0F1E', border: `1px solid rgba(${rgb}, 0.15)`,
          borderRadius: '10px', overflow: 'hidden',
          boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 30px rgba(${rgb}, 0.05)`,
        }}>
          <div style={{
            padding: '8px 12px', background: '#070C18',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            {['#FF5F57', '#FFBD2E', '#28C840'].map((dot, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: dot, opacity: 0.65 }} />
            ))}
            <div style={{
              flex: 1, marginLeft: '8px', height: '16px', borderRadius: '3px',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', paddingLeft: '8px',
            }}>
              <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.18)' }}>
                {project.live ? project.live.replace('https://', '') : project.slug}
              </span>
            </div>
          </div>
          <ImagePlaceholder label="Desktop Screenshot" aspect="16/9" color={project.color}
            src={project.images?.desktop} alt={`${project.title} desktop preview`} />
        </div>
      </motion.div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="font-display" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: `rgba(${rgb}, 0.15)`, lineHeight: 1, fontWeight: 300 }}>
            {project.index}
          </span>
          <span className="label-text" style={{ color: `rgba(${rgb}, 0.9)` }}>{project.category}</span>
        </div>

        <h3 className="font-display text-primary" onClick={goToCase}
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.08, letterSpacing: '-0.01em', cursor: 'pointer' }}>
          {project.title}
        </h3>

        <p className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 1.3vw, 0.95rem)', lineHeight: 1.75 }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.28rem 0.65rem', borderRadius: '2px',
              border: `1px solid rgba(${rgb}, 0.2)`,
              color: `rgba(${rgb}, 0.8)`, background: `rgba(${rgb}, 0.05)`,
            }}>{t}</span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <HiExternalLink size={13} /> Visit Website
            </a>
          )}
          <button onClick={goToCase} className="btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            View Case Study <HiArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────
   MOBILE  — premium vertical card
───────────────────────────────────────── */
function MobileCard({ project, index }) {
  const navigate = useNavigate();
  const goToCase = () => navigate(`/work/${project.slug}`);
  const rgb = hexToRgb(project.color);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderRadius: '14px',
        border: `1px solid rgba(${rgb}, 0.14)`,
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'hidden',
        boxShadow: `0 8px 40px rgba(0,0,0,0.35), 0 0 40px rgba(${rgb}, 0.04)`,
      }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Hero image */}
      <div style={{ position: 'relative', cursor: 'pointer' }} onClick={goToCase}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, transparent 50%, rgba(5,8,22,0.85) 100%)`,
          zIndex: 1, pointerEvents: 'none',
        }} />
        <div style={{
          background: '#070C18',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((dot, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: dot, opacity: 0.65 }} />
          ))}
          <div style={{
            flex: 1, marginLeft: '6px', height: '14px', borderRadius: '2px',
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', paddingLeft: '6px',
          }}>
            <span style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.18)' }}>
              {project.live ? project.live.replace('https://', '') : project.slug}
            </span>
          </div>
        </div>
        <ImagePlaceholder label="Desktop Screenshot" aspect="16/9" color={project.color}
          src={project.images?.desktop} alt={`${project.title} preview`} />
      </div>

      {/* Card body */}
      <div style={{ padding: '1.4rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>

        {/* Number + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="font-display" style={{ fontSize: '1.8rem', color: `rgba(${rgb}, 0.15)`, lineHeight: 1, fontWeight: 300 }}>
            {project.index}
          </span>
          <span className="label-text" style={{ color: `rgba(${rgb}, 0.9)` }}>{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-primary" onClick={goToCase}
          style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', lineHeight: 1.08, letterSpacing: '-0.01em', cursor: 'pointer' }}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.72 }}>
          {project.description}
        </p>

        {/* Tech tags — horizontal scroll */}
        <div style={{
          display: 'flex', gap: '0.4rem',
          overflowX: 'auto', paddingBottom: '4px',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}>
          {project.tech.map(t => (
            <span key={t} style={{
              flexShrink: 0,
              fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.28rem 0.65rem', borderRadius: '2px',
              border: `1px solid rgba(${rgb}, 0.2)`,
              color: `rgba(${rgb}, 0.8)`, background: `rgba(${rgb}, 0.05)`,
            }}>{t}</span>
          ))}
        </div>

        {/* Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {project.highlights.slice(0, 4).map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', flexShrink: 0, background: `rgba(${rgb}, 0.7)` }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Buttons — same row, equal width */}
        <div style={{ display: 'flex', gap: '0.6rem', paddingTop: '0.25rem' }}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                minHeight: '48px', borderRadius: '2px',
                background: 'var(--accent)', color: 'white',
                fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
                textDecoration: 'none', border: '1px solid var(--accent)',
              }}
              aria-label={`Visit ${project.title} website`}>
              <HiExternalLink size={12} /> Live Demo
            </a>
          )}
          <button onClick={goToCase}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              minHeight: '48px', borderRadius: '2px',
              background: 'transparent', color: 'var(--text-primary)',
              fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
              border: '1px solid var(--border)', cursor: 'pointer',
            }}
            aria-label={`View case study for ${project.title}`}>
            Case Study <HiArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
export default function Works() {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';
  const isTablet = bp === 'tablet';

  if (isMobile) {
    return (
      <section id="works" className="bg-page" aria-label="Featured works"
        style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '1.75rem' }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '0.5rem' }}>Projects</span>
          <h2 className="font-display text-primary"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', lineHeight: 1.05 }}>
            Projects That Define the Craft
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {projects.map((project, i) => (
            <MobileCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="works" className="section-padding bg-page" aria-label="Featured works">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 6rem)', maxWidth: '680px' }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '1rem' }}>Projects</span>
          <h2 className="font-display text-primary"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 1.05, marginBottom: '1.25rem' }}>
            Projects That Define the Craft
          </h2>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.8 }}>
            A selection of production-ready applications built to solve real-world problems, combining thoughtful design, scalable architecture, and modern full-stack engineering.
          </p>
        </motion.div>

        {isTablet ? (
          <div>
            {projects.map((project, i) => (
              <TabletEntry key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div>
            {projects.map((project, i) => (
              <DesktopEntry key={project.id} project={project} index={i} isLaptop={bp === 'laptop'} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
