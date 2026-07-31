import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

const paragraphs = [
  {
    label: '01 — Origin',
    text: "My journey into software development began during my Bachelor of Computer Applications, where I wrote my first programs in C. As each semester introduced new technologies — including C++, Java, Relational Database Management Systems (RDBMS), and Python — my understanding of software development gradually expanded.",
  },
  {
    label: '02 — Beyond the Classroom',
    text: "Beyond the classroom, I was constantly exploring technology on my own. I learned to assemble desktop computers, experimented with various Linux distributions such as Ubuntu, Fedora, Arch Linux, and Manjaro, explored open-source repositories, and gained practical exposure to ethical hacking concepts in controlled learning environments. These experiences helped me understand how software, operating systems, and hardware work together.",
  },
  {
    label: '03 — Real Work',
    text: "My transition into modern web development accelerated during my internship at HEPL, where I worked extensively with React, Node.js, SQL, Material UI, Ant Design, React Icons, and enterprise development workflows. Contributing to real-world business applications taught me how to build scalable, maintainable, and production-ready software while collaborating in a professional environment.",
  },
  {
    label: '04 — Now',
    text: "Today, those experiences enable me to develop full-stack web applications for freelance clients while continuously expanding my knowledge. Every project I build reflects a commitment to clean architecture, responsive design, performance, and creating digital solutions that solve real business problems.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  if (isMobile) {
    return (
      <section id="about" ref={ref} className="bg-page" aria-label="About Vasanthan"
        style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}
      >
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <span className="label-text" style={{ display: 'block', marginBottom: '0.5rem' }}>About</span>
          <h2 className="font-display text-primary" style={{ fontSize: 'clamp(1.8rem, 7vw, 2.4rem)', lineHeight: 1.05 }}>
            The story behind the code
          </h2>
        </motion.div>

        {/* Story blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {paragraphs.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '1.25rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span className="label-text" style={{ display: 'block', marginBottom: '0.6rem' }}>{p.label}</span>
              <p className="text-secondary" style={{ fontSize: '0.875rem', lineHeight: 1.75 }}>{p.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem', marginTop: '2rem',
            padding: '1.25rem', borderRadius: '10px',
            border: '1px solid rgba(59,130,246,0.12)',
            background: 'rgba(59,130,246,0.03)',
          }}
        >
          {[{ num: '3+', label: 'Years' }, { num: '10+', label: 'Projects' }, { num: '1', label: 'TCS Offer' }].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p className="font-display text-accent" style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', lineHeight: 1, marginBottom: '0.25rem' }}>{num}</p>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </section>
    );
  }

  return (
    <section id="about" className="section-padding bg-page" ref={ref} aria-label="About Vasanthan">
      <div className="container-fluid">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-fluid_xl">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-text block mb-6">About</span>
              <h2 className="font-display text-fluid_2xl text-primary leading-tight mb-8">
                The story behind the code
              </h2>

              {/* Animated line */}
              <div className="relative w-px h-48 bg-border overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-accent"
                  style={{ height: lineHeight, boxShadow: '0 0 8px rgba(59,130,246,0.8)' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Right — paragraphs */}
          <div className="space-y-fluid_xl">
            {paragraphs.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="label-text block mb-4">{p.label}</span>
                <p className="text-secondary text-fluid_lg leading-relaxed font-body">{p.text}</p>
              </motion.div>
            ))}

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-subtle"
            >
              {[
                { num: '3+', label: 'Years Learning' },
                { num: '10+', label: 'Projects Built' },
                { num: '1', label: 'TCS Offer' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-fluid_2xl text-accent mb-1">{num}</p>
                  <p className="text-muted text-xs tracking-wider uppercase">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
