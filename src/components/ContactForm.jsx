import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import InputField from './InputField';
import TextareaField from './TextareaField';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

// ── Replace with your Formspree endpoint ──────────────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/manlpzoq';
// ─────────────────────────────────────────────────────────────────────────────

const EMPTY = { name: '', email: '', subject: '', company: '', message: '', _honey: '' };

function validate(fields) {
  const errs = {};
  if (!fields.name.trim()) errs.name = 'Full name is required.';
  else if (fields.name.trim().length < 3) errs.name = 'Name must be at least 3 characters.';

  if (!fields.email.trim()) errs.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Please enter a valid email address.';

  if (!fields.subject.trim()) errs.subject = 'Subject is required.';
  else if (fields.subject.trim().length < 5) errs.subject = 'Subject must be at least 5 characters.';

  if (!fields.message.trim()) errs.message = 'Message is required.';
  else if (fields.message.trim().length < 20) errs.message = 'Message must be at least 20 characters.';

  return errs;
}

export default function ContactForm() {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    // Clear error on change after first submit attempt
    if (submitted) setErrors(prev => ({ ...prev, [name]: undefined }));
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Honeypot check — bots fill _honey
    if (fields._honey) return;

    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Subtle shake on the form
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const payload = {
        name: fields.name.trim(),
        email: fields.email.trim(),
        subject: fields.subject.trim(),
        message: fields.message.trim(),
        ...(fields.company.trim() && { company: fields.company.trim() }),
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
        setFields(EMPTY);
        setSubmitted(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleReset = useCallback(() => {
    setStatus('idle');
    setFields(EMPTY);
    setErrors({});
    setSubmitted(false);
  }, []);

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <SuccessMessage key="success" onReset={handleReset} />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
          initial={{ opacity: 0 }}
          animate={hasErrors ? { opacity: 1, x: [0, -6, 6, -4, 4, 0] } : { opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: hasErrors ? 0.4 : 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 2.5vw, 2rem)' }}
        >
          {/* Honeypot — hidden from real users, visible to bots */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="_honey"
              value={fields._honey}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name + Email row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(1.5rem, 2.5vw, 2rem)',
          }}>
            <InputField
              label="Full Name"
              name="name"
              value={fields.name}
              onChange={handleChange}
              error={errors.name}
              required
              autoComplete="name"
            />
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
            />
          </div>

          {/* Subject + Company row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(1.5rem, 2.5vw, 2rem)',
          }}>
            <InputField
              label="Subject"
              name="subject"
              value={fields.subject}
              onChange={handleChange}
              error={errors.subject}
              required
              autoComplete="off"
            />
            <InputField
              label="Company / Organization"
              name="company"
              value={fields.company}
              onChange={handleChange}
              error={errors.company}
              autoComplete="organization"
            />
          </div>

          {/* Message */}
          <TextareaField
            label="Message"
            name="message"
            value={fields.message}
            onChange={handleChange}
            error={errors.message}
            required
            rows={5}
          />

          {/* Error banner */}
          <AnimatePresence>
            {status === 'error' && (
              <ErrorMessage key="error" onRetry={() => setStatus('idle')} />
            )}
          </AnimatePresence>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                width: '100%',
                justifyContent: 'center',
              }}
              aria-label="Send message"
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <motion.div
                    style={{
                      width: '14px', height: '14px', flexShrink: 0,
                      border: '2px solid rgba(255,255,255,0.25)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <HiArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
