import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4" role="main">
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
      />

      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-text mb-6">404</p>
          <h1 className="font-display text-fluid_3xl text-primary mb-4 leading-tight">
            Lost?
          </h1>
          <p className="font-display text-fluid_xl text-secondary italic mb-10">
            Let's get you back.
          </p>

          <motion.div
            className="w-24 h-px bg-accent mx-auto mb-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ boxShadow: '0 0 8px rgba(59,130,246,0.6)' }}
          />

          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            aria-label="Return to home"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
