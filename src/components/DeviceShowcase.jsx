import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ImagePlaceholder from './ImagePlaceholder';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const calc = () => setMobile(window.innerWidth < 992);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return mobile;
}

/* ── Swipeable scroll-snap showcase (mobile + tablet) ── */
function SwipeShowcase({ project }) {
  const c = project.color;
  const rgb = hexToRgb(c);

  const devices = [
    {
      label: 'Desktop',
      src: project.images?.desktop,
      aspect: '16/9',
      chrome: true,
      wrapStyle: { borderRadius: '10px', overflow: 'hidden', background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)', boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 30px rgba(${rgb},0.06)` },
    },
    {
      label: 'Tablet',
      src: project.images?.tablet,
      aspect: '4/3',
      chrome: false,
      wrapStyle: { borderRadius: '12px', overflow: 'hidden', padding: '8px', background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)', boxShadow: `0 10px 36px rgba(0,0,0,0.4), 0 0 24px rgba(${rgb},0.05)` },
    },
    {
      label: 'Mobile',
      src: project.images?.mobile,
      aspect: '9/19',
      chrome: false,
      notch: true,
      wrapStyle: { borderRadius: '20px', overflow: 'hidden', padding: '8px', background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)', boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(${rgb},0.07)`, maxWidth: '220px', margin: '0 auto' },
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '1.25rem' }}
      >
        <span className="label-text" style={{ display: 'block', marginBottom: '0.4rem' }}>Responsive Showcase</span>
        <h3 className="font-display text-primary" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', lineHeight: 1.1 }}>
          Built for every screen
        </h3>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem', letterSpacing: '0.05em' }}>
          Swipe to explore →
        </p>
      </motion.div>

      {/* Scroll-snap container */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '1rem',
        paddingBottom: '0.75rem',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {devices.map((device, i) => (
          <motion.div
            key={device.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
              width: device.label === 'Mobile' ? 'min(72vw, 260px)' : 'min(88vw, 480px)',
            }}
          >
            <div style={device.wrapStyle}>
              {device.chrome && (
                <div style={{
                  padding: '8px 12px', background: '#0A0F1E',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  {['#FF5F57', '#FFBD2E', '#28C840'].map((dot, j) => (
                    <div key={j} style={{ width: 8, height: 8, borderRadius: '50%', background: dot, opacity: 0.65 }} />
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
              )}
              {device.notch && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
                  <div style={{ width: '50px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }} />
                </div>
              )}
              <div style={{ borderRadius: device.chrome ? 0 : device.label === 'Mobile' ? '14px' : '6px', overflow: 'hidden' }}>
                <ImagePlaceholder label={`${device.label} Screenshot`} aspect={device.aspect}
                  color={c} src={device.src} alt={`${project.title} ${device.label.toLowerCase()} view`} />
              </div>
            </div>
            <p style={{
              fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginTop: '0.6rem', textAlign: 'center',
            }}>
              {device.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Desktop stacked showcase ── */
function DesktopShowcase({ project }) {
  const c = project.color;
  const rgb = hexToRgb(c);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}
      >
        <span className="label-text" style={{ display: 'block', marginBottom: '0.75rem' }}>Responsive Showcase</span>
        <h3 className="font-display text-primary" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', lineHeight: 1.1 }}>
          Built for every screen
        </h3>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>

        {/* Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px', overflow: 'hidden',
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(${rgb}, 0.06)`,
          }}>
            <div style={{
              padding: '10px 14px', background: '#0A0F1E',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              {['#FF5F57', '#FFBD2E', '#28C840'].map((dot, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: dot, opacity: 0.7 }} />
              ))}
              <div style={{
                flex: 1, marginLeft: '8px', height: '20px', borderRadius: '4px',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', paddingLeft: '10px',
              }}>
                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
                  {project.live || `${project.slug}.app`}
                </span>
              </div>
            </div>
            <ImagePlaceholder label="Desktop Screenshot" aspect="16/9" color={c}
              src={project.images?.desktop} alt={`${project.title} desktop view`} />
          </div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
            Desktop
          </p>
        </motion.div>

        {/* Tablet + Mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(1rem, 2vw, 1.5rem)', alignItems: 'end' }}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', overflow: 'hidden', padding: '8px',
              boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 30px rgba(${rgb}, 0.05)`,
            }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <ImagePlaceholder label="Tablet Screenshot" aspect="4/3" color={c}
                  src={project.images?.tablet} alt={`${project.title} tablet view`} />
              </div>
            </div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
              Tablet
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              background: '#0F172A', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '20px', overflow: 'hidden', padding: '8px',
              boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(${rgb}, 0.08)`,
              maxWidth: '200px', margin: '0 auto',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '6px' }}>
                <div style={{ width: '60px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }} />
              </div>
              <div style={{ borderRadius: '14px', overflow: 'hidden' }}>
                <ImagePlaceholder label="Mobile Screenshot" aspect="9/19" color={c}
                  src={project.images?.mobile} alt={`${project.title} mobile view`} />
              </div>
            </div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
              Mobile
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function DeviceShowcase({ project }) {
  const isMobile = useIsMobile();
  return isMobile ? <SwipeShowcase project={project} /> : <DesktopShowcase project={project} />;
}
