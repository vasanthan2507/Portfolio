import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';

export default function SuccessMessage({ onReset }) {
  useEffect(() => {
    const t = setTimeout(onReset, 5000);
    return () => clearTimeout(t);
  }, [onReset]);

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-xl text-center"
      style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 3vw, 3rem)',
        border: '1px solid rgba(16,185,129,0.25)',
        boxShadow: '0 0 40px rgba(16,185,129,0.06)',
      }}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
      >
        <div style={{
          width: 'clamp(48px, 6vw, 64px)', height: 'clamp(48px, 6vw, 64px)',
          borderRadius: '50%',
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <HiCheckCircle size={28} style={{ color: '#34D399' }} />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <p className="label-text" style={{ color: '#34D399', marginBottom: '0.75rem' }}>
          Message Sent Successfully
        </p>
        <h3 className="font-display text-primary" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', marginBottom: '0.75rem' }}>
          Thank you for reaching out.
        </h3>
        <p className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '36ch', margin: '0 auto' }}>
          I've received your message and will get back to you as soon as possible.
        </p>
      </motion.div>

      {/* Progress bar — shows 5s countdown */}
      <div style={{
        marginTop: '2rem',
        height: '1px',
        background: 'var(--border)',
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 5, ease: 'linear' }}
          style={{
            height: '100%',
            background: '#34D399',
            transformOrigin: 'left',
            boxShadow: '0 0 6px rgba(52,211,153,0.6)',
          }}
        />
      </div>
      <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.5rem', letterSpacing: '0.1em' }}>
        Form resets in 5 seconds
      </p>
    </motion.div>
  );
}
