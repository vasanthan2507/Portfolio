import { motion } from 'framer-motion';
import { HiExclamation } from 'react-icons/hi';

export default function ErrorMessage({ onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-xl"
      style={{
        padding: 'clamp(1.25rem, 2vw, 1.75rem) clamp(1.25rem, 2vw, 1.75rem)',
        border: '1px solid rgba(248,113,113,0.2)',
        boxShadow: '0 0 30px rgba(248,113,113,0.04)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
      role="alert"
      aria-live="assertive"
    >
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: 'rgba(248,113,113,0.1)',
        border: '1px solid rgba(248,113,113,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <HiExclamation size={16} style={{ color: '#F87171' }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem' }}>
          Unable to send your message.
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Please try again in a few moments.
        </p>
      </div>
      <button
        onClick={onRetry}
        style={{
          fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#F87171', background: 'none', border: 'none', cursor: 'pointer',
          padding: '0.25rem 0', flexShrink: 0, transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        aria-label="Retry sending message"
      >
        Retry
      </button>
    </motion.div>
  );
}
