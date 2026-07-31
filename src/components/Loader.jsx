import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUSES = [
  'Initializing...',
  'Loading Assets...',
  'Preparing Experience...',
  'Rendering Portfolio...',
  'Experience Ready',
];

// Timings (ms): how long each status is visible before fading out
const HOLD = [600, 600, 600, 600, 500];
// Fade duration per status
const FADE = 220;
// Gap between fade-out and next fade-in
const GAP = 80;

// Total ≈ 5 * (FADE + HOLD + FADE + GAP) ≈ 3.4s + 500ms exit = ~3.9s

export default function Loader({ onComplete }) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);   // controls current status opacity
  const [exiting, setExiting] = useState(false);  // controls full-screen exit

  const advance = useCallback((idx) => {
    const hold = HOLD[idx] ?? 600;

    const holdTimer = setTimeout(() => {
      if (idx === STATUSES.length - 1) {
        // Last status — hold then exit the whole screen
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 500);
        return;
      }
      // Fade out current
      setVisible(false);
      setTimeout(() => {
        const next = idx + 1;
        setStatusIndex(next);
        setVisible(true);
        advance(next);
      }, FADE + GAP);
    }, hold);

    return () => clearTimeout(holdTimer);
  }, [onComplete]);

  useEffect(() => {
    const cleanup = advance(0);
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLast = statusIndex === STATUSES.length - 1;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: '#050816',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* ── Ambient glow ── */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 55% 45% at 50% 52%, rgba(59,130,246,0.11) 0%, transparent 68%)',
          }} />

          {/* ── Subtle grid ── */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.7) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(59,130,246,0.7) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }} />

          {/* ── Corner accents ── */}
          {[
            { top: 24, left: 24, borderTop: '1px solid', borderLeft: '1px solid' },
            { top: 24, right: 24, borderTop: '1px solid', borderRight: '1px solid' },
            { bottom: 24, left: 24, borderBottom: '1px solid', borderLeft: '1px solid' },
            { bottom: 24, right: 24, borderBottom: '1px solid', borderRight: '1px solid' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
              style={{
                position: 'absolute', width: 20, height: 20,
                borderColor: 'rgba(59,130,246,0.55)', pointerEvents: 'none', ...s,
              }}
            />
          ))}

          {/* ── Logo mark ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 'clamp(2.5rem, 6vw, 4rem)', textAlign: 'center' }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(3.5rem, 12vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                color: '#F1F5F9',
                display: 'block',
              }}
            >
              V<span style={{
                background: 'linear-gradient(135deg, #F1F5F9 0%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>.</span>
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '1px', width: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)',
                transformOrigin: 'center', marginTop: '0.5rem',
              }}
            />
          </motion.div>

          {/* ── Status text ── */}
          <div style={{
            height: 'clamp(1.4rem, 4vw, 1.8rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 'clamp(1.75rem, 4vw, 2.5rem)',
            width: '100%', padding: '0 1.5rem',
          }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0, scale: 0.96, x: 0 }}
                animate={{
                  opacity: visible ? 1 : 0,
                  scale: visible ? 1 : 0.96,
                  x: visible ? [0, -2, 2, -1, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  opacity: { duration: FADE / 1000, ease: 'easeInOut' },
                  scale: { duration: FADE / 1000, ease: 'easeInOut' },
                  x: { duration: 0.35, delay: 0.05, ease: 'easeInOut' },
                }}
                style={{
                  fontFamily: "'Satoshi', 'Inter', sans-serif",
                  fontSize: 'clamp(0.65rem, 2.2vw, 0.78rem)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: isLast ? '#3B82F6' : 'rgba(148,163,184,0.9)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                }}
              >
                {STATUSES[statusIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── Loading indicator ── */}
          <LoadingBar />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingBar() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
      width: 'clamp(140px, 36vw, 220px)',
    }}>
      {/* Track */}
      <div style={{
        width: '100%', height: '1px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '1px', overflow: 'hidden', position: 'relative',
      }}>
        {/* Shimmer sweep */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.1 }}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '50%', height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.9), rgba(96,165,250,0.6), transparent)',
            boxShadow: '0 0 8px rgba(59,130,246,0.8)',
          }}
        />
      </div>

      {/* Dot pulse row */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.15, 1, 0.15], scaleY: [0.6, 1, 0.6] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.12,
              ease: 'easeInOut',
            }}
            style={{
              width: i === 2 ? '3px' : '2px',
              height: i === 2 ? '14px' : '10px',
              borderRadius: '2px',
              background: i === 2 ? '#3B82F6' : 'rgba(59,130,246,0.55)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
