import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WaveTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const pathD = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 L1200,200 L0,200 Z',
      'M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,200 L0,200 Z',
      'M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,200 L0,200 Z',
    ]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);

  return (
    <div ref={ref} className="relative h-32 overflow-hidden bg-page" aria-hidden="true">
      <motion.svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(29,78,216,0.3)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.5)" />
            <stop offset="100%" stopColor="rgba(96,165,250,0.3)" />
          </linearGradient>
        </defs>
        <motion.path d={pathD} fill="url(#waveGrad)" />
      </motion.svg>
    </div>
  );
}
