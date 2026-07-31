import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiMailLine, RiGithubLine, RiLinkedinBoxLine } from 'react-icons/ri';
import ContactForm from '../components/ContactForm';

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

const contactLinks = [
  { label: 'Email',    value: 'vassantan2507@gmail.com',        href: 'mailto:vassantan2507@gmail.com',                       Icon: RiMailLine },
  { label: 'GitHub',  value: 'github.com/vasanthan2507',        href: 'https://github.com/vasanthan2507',                     Icon: RiGithubLine },
  { label: 'LinkedIn',value: 'vasanthanvijayan-dev',            href: 'https://www.linkedin.com/in/vasanthanvijayan-dev',     Icon: RiLinkedinBoxLine },
];

export default function Contact() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section id="contact" className="bg-page" aria-label="Contact"
        style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '0.5rem' }}>Contact</span>
          <h2 className="font-display text-primary" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', lineHeight: 1.05, marginBottom: '0.75rem' }}>
            Let’s build something remarkable
          </h2>
          <p className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
            Open to projects, roles, and meaningful conversations.
          </p>
        </motion.div>

        {/* Quick contact links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}
        >
          {contactLinks.map(({ label, value, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.875rem',
                padding: '0.875rem 1rem', borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                textDecoration: 'none', transition: 'border-color 0.2s',
              }}
            >
              <div style={{
                width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
                background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={15} style={{ color: 'var(--accent)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>{label}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
        >
          <ContactForm />
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-page" aria-label="Contact">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-2 gap-fluid_xl items-start">

          {/* ── Left — info ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-text block mb-6">Contact</span>
            <h2 className="font-display text-fluid_3xl text-primary leading-tight mb-6">
              Let's build something remarkable
            </h2>
            <p className="text-secondary text-fluid_base leading-relaxed mb-10 max-w-md">
              Whether you have a project in mind, a role to discuss, or just want to connect — I'm always open to meaningful conversations.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Email',    value: 'vassantan2507@gmail.com',          href: 'mailto:vassantan2507@gmail.com' },
                { label: 'GitHub',   value: 'github.com/vasanthan2507',         href: 'https://github.com/vasanthan2507' },
                { label: 'LinkedIn', value: 'vasanthanvijayan-dev',             href: 'https://www.linkedin.com/in/vasanthanvijayan-dev' },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="label-text w-16">{label}</span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
