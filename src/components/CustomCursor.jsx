import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e) => {
      const t = e.target.closest('a,button,[data-cursor="hover"]');
      setHovered(!!t);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          scale: hovered ? 2.2 : 1,
          opacity: hovered ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0.1) 70%)',
          border: '1px solid rgba(59,130,246,0.5)',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] bg-accent"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
