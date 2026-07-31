import { useScroll, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #1D4ED8, #3B82F6, #60A5FA)',
        boxShadow: '0 0 8px rgba(59,130,246,0.6)',
      }}
    />
  );
}
