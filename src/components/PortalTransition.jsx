import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PortalTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [20, 0, 0, 20]);
  const ringScale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1.6]);
  const ringOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-page"
      aria-hidden="true"
    >
      {/* Portal rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-accent"
          style={{
            width: `${i * 180}px`,
            height: `${i * 180}px`,
            scale: ringScale,
            opacity: ringOpacity,
            boxShadow: `0 0 ${i * 20}px rgba(59,130,246,${0.3 / i})`,
          }}
        />
      ))}

      {/* Central portal glow */}
      <motion.div
        style={{ scale, opacity }}
        className="relative flex items-center justify-center"
      >
        <motion.div
          style={{ filter: blur.get ? `blur(${blur.get()}px)` : undefined }}
          className="w-32 h-32 rounded-full"
          animate={{ filter: undefined }}
        >
          <motion.div
            style={{ filter: `blur(${blur}px)` }}
            className="w-full h-full rounded-full"
            animate={{}}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(29,78,216,0.4) 40%, transparent 70%)',
                boxShadow: '0 0 60px rgba(59,130,246,0.5), 0 0 120px rgba(59,130,246,0.2)',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Horizontal lines */}
      <motion.div
        style={{ opacity: ringOpacity }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col gap-px pointer-events-none"
      >
        {[-40, -20, 0, 20, 40].map((offset, i) => (
          <div
            key={i}
            className="w-full h-px"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(59,130,246,${0.1 - Math.abs(offset) * 0.001}), transparent)`,
              transform: `translateY(${offset}px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
