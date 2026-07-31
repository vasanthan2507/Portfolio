import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TextareaField({ label, name, value, onChange, error, required, rows = 5 }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: 'relative' }}>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        aria-label={label}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        style={{ background: 'transparent', resize: 'none' }}
        className={`w-full bg-transparent border-b text-primary text-fluid_base outline-none transition-all duration-300 font-body pt-6 pb-2 ${
          error ? 'border-red-400' : focused ? 'border-accent' : 'border-subtle'
        }`}
      />

      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${
          active
            ? `top-0 text-xs tracking-wider uppercase ${error ? 'text-red-400' : 'text-accent'}`
            : 'top-5 text-secondary text-fluid_base'
        }`}
      >
        {label}{required && <span aria-hidden="true" style={{ marginLeft: '2px', opacity: 0.6 }}>*</span>}
      </label>

      <motion.div
        className="absolute bottom-0 left-0 h-px"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          transformOrigin: 'left',
          background: error ? '#F87171' : 'var(--accent)',
          boxShadow: error ? '0 0 6px rgba(248,113,113,0.5)' : '0 0 6px rgba(59,130,246,0.6)',
          width: '100%',
        }}
      />

      {error && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          role="alert"
          style={{ fontSize: '0.7rem', color: '#F87171', marginTop: '0.35rem', letterSpacing: '0.04em' }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
