import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon, HiX } from 'react-icons/hi';
import { RiHome4Line, RiBriefcaseLine, RiUser3Line, RiCodeSSlashLine, RiRoadMapLine, RiMailLine, RiMenuLine } from 'react-icons/ri';
import { navLinks } from '../data';
import { useActiveSection } from '../hooks/useActiveSection';

const mobileNavIcons = {
  Home: RiHome4Line,
  Works: RiBriefcaseLine,
  About: RiUser3Line,
  Skills: RiCodeSSlashLine,
  Journey: RiRoadMapLine,
  Contact: RiMailLine,
};

const sectionIds = navLinks.map(l => l.href.replace('#', ''));

export default function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-2 left-0 right-0 z-[900] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(5, 8, 22, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-fluid flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            className="font-display text-fluid_lg text-primary tracking-wider hover:text-accent transition-colors duration-300"
            aria-label="Go to home"
          >
            V.
          </button>

          {/* Desktop links */}
          <div
            className={`hidden md:flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500 ${
              scrolled ? 'glass' : ''
            }`}
          >
            {navLinks.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = active === id;
              return (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className={`relative px-4 py-2 text-xs tracking-[0.12em] uppercase font-medium transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-secondary hover:text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-subtle text-secondary hover:text-accent hover:border-accent transition-all duration-300"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <HiSun size={16} /> : <HiMoon size={16} />}
            </button>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-subtle text-secondary hover:text-accent hover:border-accent transition-all duration-300"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <HiX size={16} /> : <RiMenuLine size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[800] md:hidden"
            style={{
              background: 'rgba(5,8,22,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            {/* Close row */}
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)', cursor: 'pointer',
                }}
                aria-label="Close menu"
              >
                <HiX size={18} />
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map(({ label, href }, i) => {
                const id = href.replace('#', '');
                const isActive = active === id;
                const Icon = mobileNavIcons[label];
                return (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNav(href)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem 1.25rem', borderRadius: '10px',
                      background: isActive ? 'rgba(59,130,246,0.08)' : 'transparent',
                      border: isActive ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {Icon && <Icon size={18} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }} />}
                    <span
                      className="font-display"
                      style={{
                        fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                        letterSpacing: '0.02em', lineHeight: 1,
                      }}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px rgba(59,130,246,0.8)' }} />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom social row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              style={{
                position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem',
              }}
            >
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Vasanthan · 2025
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { href: 'https://github.com/vasanthan2507', label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/vasanthanvijayan-dev', label: 'LinkedIn' },
                  { href: 'mailto:vassantan2507@gmail.com', label: 'Email' },
                ].map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}
                    aria-label={label}>
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
