import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSearch, HiCode, HiMail, HiDownload, HiExternalLink } from 'react-icons/hi';

const commands = [
  { id: 'works', label: 'View My Works', icon: HiCode, action: () => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'contact', label: 'Contact Me', icon: HiMail, action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'resume', label: 'Download Resume', icon: HiDownload, action: () => window.open('/resume.pdf', '_blank') },
  { id: 'github', label: 'Open GitHub', icon: HiExternalLink, action: () => window.open('https://https://github.com/vasanthan2507', '_blank') },
  { id: 'linkedin', label: 'Open LinkedIn', icon: HiExternalLink, action: () => window.open('https://www.linkedin.com/in/vasanthanvijayan-dev', '_blank') },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  const close = useCallback(() => { setOpen(false); setQuery(''); setSelected(0); }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && filtered[selected]) { filtered[selected].action(); close(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selected, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[20vh] px-4"
          style={{ background: 'rgba(5,8,22,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg glass rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 0 60px rgba(59,130,246,0.1)' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-label="Command palette"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-subtle">
              <HiSearch className="text-muted flex-shrink-0" size={18} />
              <input
                autoFocus
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-primary placeholder-muted text-sm outline-none font-body"
                aria-label="Search commands"
              />
              <kbd className="text-xs text-muted border border-subtle rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            {/* Commands */}
            <div className="py-2 max-h-72 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-muted text-sm py-8">No commands found</p>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => { cmd.action(); close(); }}
                      onMouseEnter={() => setSelected(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-150 ${
                        selected === i ? 'bg-accent-muted text-accent' : 'text-secondary hover:text-primary'
                      }`}
                    >
                      <Icon size={16} className="flex-shrink-0" />
                      {cmd.label}
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2 border-t border-subtle flex items-center gap-4">
              <span className="text-xs text-muted">↑↓ navigate</span>
              <span className="text-xs text-muted">↵ select</span>
              <span className="text-xs text-muted">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
