import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiGraduationCapLine, RiLightbulbLine, RiBriefcaseLine, RiTrophyLine, RiTimeLine, RiRocketLine } from 'react-icons/ri';
import { timeline } from '../data';

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

const typeColors = {
  education: '#3B82F6',
  learning: '#8B5CF6',
  work: '#10B981',
  milestone: '#F59E0B',
  current: '#60A5FA',
  future: '#94A3B8',
};

const typeLabels = {
  education: 'Education',
  learning: 'Growth',
  work: 'Experience',
  milestone: 'Milestone',
  current: 'Present',
  future: 'Vision',
};

const typeIcons = {
  education: RiGraduationCapLine,
  learning:  RiLightbulbLine,
  work:      RiBriefcaseLine,
  milestone: RiTrophyLine,
  current:   RiTimeLine,
  future:    RiRocketLine,
};

export default function Journey() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (isMobile) {
    return (
      <section id="journey" className="bg-page" aria-label="Career journey"
        style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '1.75rem' }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '0.5rem' }}>Journey</span>
          <h2 className="font-display text-primary" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', lineHeight: 1.05 }}>
            The path that shaped the craft
          </h2>
        </motion.div>

        {/* Vertical milestone cards with connector line */}
        <div style={{ position: 'relative' }}>
          {/* Left connector line */}
          <div style={{
            position: 'absolute', left: '17px', top: '8px', bottom: '8px', width: '1px',
            background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(59,130,246,0.05))',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {timeline.map((item, i) => {
              const Icon = typeIcons[item.type];
              const color = typeColors[item.type];
              const isCurrent = item.type === 'current';
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-4%' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}
                >
                  {/* Icon dot */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    background: isCurrent ? `${color}18` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isCurrent ? `${color}40` : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isCurrent ? `0 0 12px ${color}20` : 'none',
                    position: 'relative', zIndex: 1,
                  }}>
                    <Icon size={15} style={{ color: isCurrent ? color : 'var(--text-muted)' }} />
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1, padding: '0.875rem 1rem',
                    borderRadius: '10px',
                    border: `1px solid ${isCurrent ? `${color}25` : 'rgba(255,255,255,0.05)'}`,
                    background: isCurrent ? `${color}06` : 'rgba(255,255,255,0.02)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '0.12rem 0.45rem', borderRadius: '20px',
                        color, border: `1px solid ${color}30`, background: `${color}10`,
                      }}>
                        {typeLabels[item.type]}
                      </span>
                      <span className="font-display" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.year}</span>
                      {isCurrent && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}` }} />}
                    </div>
                    <h3 className="font-display text-primary" style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)', lineHeight: 1.2, marginBottom: '0.3rem' }}>
                      {item.title}
                    </h3>
                    <p className="text-secondary" style={{ fontSize: '0.78rem', lineHeight: 1.65 }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="journey" className="section-padding bg-page" ref={ref} aria-label="Career journey">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-fluid_xl"
        >
          <span className="label-text block mb-4">Journey</span>
          <h2 className="font-display text-fluid_3xl text-primary max-w-lg leading-tight">
            The path that shaped the craft
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border overflow-hidden">
            <motion.div
              className="w-full bg-accent origin-top"
              style={{
                scaleY: lineScaleY,
                height: '100%',
                boxShadow: '0 0 8px rgba(59,130,246,0.6)',
              }}
            />
          </div>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16 pb-12 group"
              >
                {/* Dot */}
                <div
                  className="absolute left-[18px] top-1 w-3 h-3 rounded-full border-2 transition-all duration-300 group-hover:scale-150"
                  style={{
                    borderColor: typeColors[item.type],
                    background: item.type === 'current' ? typeColors[item.type] : 'var(--bg)',
                    boxShadow: item.type === 'current' ? `0 0 12px ${typeColors[item.type]}` : 'none',
                  }}
                />

                {/* Content */}
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full border font-medium tracking-wider uppercase"
                      style={{
                        color: typeColors[item.type],
                        borderColor: `${typeColors[item.type]}40`,
                        background: `${typeColors[item.type]}10`,
                      }}
                    >
                      {typeLabels[item.type]}
                    </span>
                    <span className="font-display text-muted text-sm">{item.year}</span>
                  </div>

                  <h3 className="font-display text-fluid_xl text-primary mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-secondary text-fluid_sm leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
