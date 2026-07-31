import { motion } from 'framer-motion';
import { RiGithubLine, RiLinkedinBoxLine, RiMailLine } from 'react-icons/ri';

const links = [
  { icon: RiGithubLine, href: 'https://github.com/vasanthan2507', label: 'GitHub' },
  { icon: RiLinkedinBoxLine, href: 'https://www.linkedin.com/in/vasanthanvijayan-dev', label: 'LinkedIn' },
  { icon: RiMailLine, href: 'mailto:vassantan2507@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      padding: 'clamp(1.25rem, 3vw, 2rem) clamp(1.25rem, 5vw, 6rem)',
    }} role="contentinfo">
      <div style={{
        maxWidth: 'min(1400px, 95vw)', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
      }} className="sm:flex-row sm:justify-between">

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {links.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textAlign: 'center' }}
        >
          Designed &amp; Developed by{' '}
          <span style={{ color: 'var(--accent)' }}>Vasanthan</span>
          {' '}· {new Date().getFullYear()}
        </motion.p>
      </div>
    </footer>
  );
}
