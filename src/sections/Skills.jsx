import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';
import { skills } from '../data';

/* ── breakpoint hook ── */
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

/* ── star rating ── */
function Stars({ count, size = '0.7rem' }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ fontSize: size, color: i < count ? '#F59E0B' : 'rgba(255,255,255,0.12)', lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

/* ── DESKTOP / LAPTOP / TABLET — glass grid card ── */
function GridCard({ skill, index, isTouch }) {
  const [hovered, setHovered] = useState(false);
  const active = !isTouch && hovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => !isTouch && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: 'clamp(0.9rem, 1.6vw, 1.3rem)',
        borderRadius: '10px',
        border: `1px solid ${active ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.06)'}`,
        background: active ? 'rgba(59,130,246,0.06)' : 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: active
          ? '0 8px 32px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.08)'
          : '0 2px 10px rgba(0,0,0,0.18)',
        transform: active ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.45rem',
      }}
    >
      {/* corner glow */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '10px', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.09) 0%, transparent 65%)',
        opacity: active ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      <p style={{ fontSize: 'clamp(0.75rem, 1vw, 0.88rem)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
        {skill.name}
      </p>
      <Stars count={skill.stars} />
      <p style={{ fontSize: 'clamp(0.62rem, 0.85vw, 0.7rem)', color: 'var(--text-secondary)', lineHeight: 1.55, opacity: 0.8 }}>
        {skill.desc}
      </p>
    </motion.div>
  );
}

/* ── MOBILE — luxury list card ── */
function ListCard({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '0.75rem', padding: '0.875rem 1rem',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.18rem' }}>
          {skill.name}
        </p>
        <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', lineHeight: 1.5, opacity: 0.8 }}>
          {skill.desc}
        </p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <Stars count={skill.stars} size="0.72rem" />
      </div>
    </motion.div>
  );
}

/* ── MOBILE — accordion category ── */
function MobileAccordion({ group, groupIndex, openIndex, setOpenIndex }) {
  const isOpen = openIndex === groupIndex;
  return (
    <div style={{
      borderRadius: '12px',
      border: `1px solid ${isOpen ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.06)'}`,
      background: isOpen ? 'rgba(59,130,246,0.03)' : 'rgba(255,255,255,0.015)',
      overflow: 'hidden',
      transition: 'border-color 0.3s ease, background 0.3s ease',
    }}>
      <button
        onClick={() => setOpenIndex(isOpen ? null : groupIndex)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.1rem', background: 'transparent', border: 'none', cursor: 'pointer',
          minHeight: '56px',
        }}
        aria-expanded={isOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="label-text" style={{ color: isOpen ? 'var(--accent)' : 'var(--text-secondary)' }}>
            {group.category}
          </span>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            {group.items.length} skills
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <RiArrowDownSLine size={18} style={{ color: isOpen ? 'var(--accent)' : 'var(--text-muted)' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 0.75rem 0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {group.items.map((skill, i) => (
                <ListCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── category group (desktop/tablet) ── */
function CategoryGroup({ group, groupIndex, bp }) {
  const isTablet = bp === 'tablet';
  const isLaptop = bp === 'laptop';
  const cols = isTablet ? 2 : isLaptop ? 3 : 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.65, delay: groupIndex * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.4rem)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <span className="label-text">{group.category}</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(59,130,246,0.4), transparent)' }} />
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: isTablet ? '0.75rem' : 'clamp(0.6rem, 1.1vw, 0.95rem)',
      }}>
        {group.items.map((skill, i) => (
          <GridCard key={skill.name} skill={skill} index={i} isTouch={isTablet} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── section ── */
export default function Skills() {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';
  const [openIndex, setOpenIndex] = useState(0);

  if (isMobile) {
    return (
      <section id="skills" className="bg-page" aria-label="Skills"
        style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}
      >
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '1.75rem' }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '0.5rem' }}>Expertise</span>
          <h2 className="font-display text-primary" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', lineHeight: 1.05, marginBottom: '0.75rem' }}>
            Skills That Power My Work
          </h2>

          {/* Status pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 0.875rem', borderRadius: '20px',
            border: '1px solid rgba(52,211,153,0.25)', background: 'rgba(52,211,153,0.06)',
          }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px #34D399', flexShrink: 0 }} />
            <span style={{ fontSize: '0.7rem', color: '#34D399', letterSpacing: '0.08em' }}>Open to Opportunities</span>
          </div>
        </motion.div>

        {/* Rating legend */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
        >
          {[{ stars: 5, label: 'Expert' }, { stars: 4, label: 'Proficient' }, { stars: 3, label: 'Working' }].map(({ stars, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Stars count={stars} size="0.65rem" />
              <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Accordion categories */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
        >
          {skills.map((group, i) => (
            <MobileAccordion key={group.category} group={group} groupIndex={i} openIndex={openIndex} setOpenIndex={setOpenIndex} />
          ))}
        </motion.div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding bg-page" aria-label="Skills">
      <div className="container-fluid">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-fluid_xl"
        >
          <span className="label-text block mb-4">Expertise</span>
          <h2
            className="font-display text-fluid_3xl text-primary leading-tight"
            style={{ maxWidth: '520px', marginBottom: '1rem' }}
          >
            Skills That Power My Work
          </h2>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: 1.75, maxWidth: '60ch' }}>
            A technology stack built through academic learning, enterprise internship experience, freelance client projects, and continuous self-learning.
          </p>
        </motion.div>

        {/* Status card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-xl p-6 mb-fluid_xl max-w-2xl"
          style={{ border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 0 40px rgba(59,130,246,0.05)' }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-primary font-medium">Current Status</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  Open to Opportunities
                </span>
              </div>
              <p className="text-secondary text-sm leading-relaxed">
                TCS offer letter received · Waiting for joining letter · Available for freelance, contract, and full-time roles
              </p>
            </div>
          </div>
        </motion.div>

        {/* Rating legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: 'flex', flexWrap: 'wrap',
            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {[{ stars: 5, label: 'Expert' }, { stars: 4, label: 'Proficient' }, { stars: 3, label: 'Working Knowledge' }].map(({ stars, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Stars count={stars} />
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Skill categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {skills.map((group, i) => (
            <CategoryGroup key={group.category} group={group} groupIndex={i} bp={bp} />
          ))}
        </div>

      </div>
    </section>
  );
}
