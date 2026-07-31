import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { HiArrowDown, HiDownload } from 'react-icons/hi';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, delay: 0.2 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const containerRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 65, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 65, damping: 22 });

  const portraitX = useTransform(springX, [-1, 1], [-7, 7]);
  const portraitY = useTransform(springY, [-1, 1], [-5, 5]);
  const rotateY = useTransform(springX, [-1, 1], [-3.5, 3.5]);
  const rotateX = useTransform(springY, [-1, 1], [2.8, -2.8]);
  const orbitX = useTransform(springX, [-1, 1], [-16, 16]);
  const orbitY = useTransform(springY, [-1, 1], [-10, 10]);

  const particles = useMemo(
    () => Array.from({ length: 34 }, (_, i) => ({
      id: i,
      left: `${5 + ((i * 19) % 90)}%`,
      top: `${6 + ((i * 29) % 86)}%`,
      size: i % 8 === 0 ? 3 : 1 + (i % 3),
      delay: (i % 9) * 0.38,
      duration: 6 + (i % 7),
    })),
    [],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const handleMove = (event) => {
      if (window.matchMedia('(hover: none)').matches) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const reset = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', reset, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', reset);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="hero-section relative min-h-screen overflow-hidden bg-page"
      aria-label="Hero section"
    >
      <div className="hero-background absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hero-grid-bg" />
        <motion.div className="hero-orbit hero-orbit-one" style={{ x: orbitX, y: orbitY }} />
        <motion.div className="hero-orbit hero-orbit-two" style={{ x: orbitY, y: orbitX }} />
        <motion.div className="hero-code-panel hero-code-panel-one" style={{ x: orbitY, y: orbitX }} />
        <motion.div className="hero-code-panel hero-code-panel-two" style={{ x: orbitX, y: orbitY }} />
        <div className="hero-blue-core" />
        <div className="hero-vignette" />
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="hero-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-shell relative z-10">
        <motion.div
          className="hero-poster"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero-portrait-stage"
            style={{ x: portraitX, y: portraitY, rotateX, rotateY }}
            animate={{ translateY: [0, -4, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="hero-portrait-glow" />
            <div className="hero-glass-frame">
              <span className="hero-frame-edge hero-frame-edge-top" />
              <span className="hero-frame-edge hero-frame-edge-right" />
              <span className="hero-frame-edge hero-frame-edge-bottom" />
              <span className="hero-frame-edge hero-frame-edge-left" />
              <div className="hero-frame-sheen" />
            </div>
            <div className="hero-portrait-fade" aria-hidden="true" />
            <img
              src="/image.png"
              alt="Vasanthan Vijayan - Full Stack Developer"
              className="hero-portrait-img"
              onLoad={() => setImgLoaded(true)}
              loading="eager"
            />
            {!imgLoaded && (
              <div className="hero-img-placeholder">
                <span className="font-display text-accent">V</span>
              </div>
            )}
          </motion.div>

          <div className="hero-content">
            <motion.h1 custom={0} variants={fadeUp} initial="hidden" animate="visible" className="hero-name font-display">
              <span>VASANTHAN</span>
              <span>VIJAYAN</span>
            </motion.h1>

            <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible" className="hero-role label-text">
              FULL STACK DEVELOPER
            </motion.p>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="hero-divider" />

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero-tagline font-display italic text-secondary"
            >
              Engineering Experiences Beyond Interfaces
            </motion.p>
          </div>

          <motion.div
            className="hero-side-objects"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-side-orbit">
              <span />
              <span />
            </div>

            <div className="hero-object-card hero-object-card-main">
              <div className="hero-object-kicker">Selected Focus</div>
              <div className="hero-object-title">Interface Engineering</div>
              <div className="hero-object-line hero-object-line-wide" />
              <div className="hero-object-line" />
              <div className="hero-object-line hero-object-line-short" />
            </div>

            <div className="hero-object-card hero-object-card-code">
              <div className="hero-code-row"><span />const craft = premium;</div>
              <div className="hero-code-row"><span />build.experience();</div>
              <div className="hero-code-row"><span />ship.withCare();</div>
            </div>

            <div className="hero-object-stats">
              <div><strong>20+</strong><span>Projects</span></div>
              <div><strong>UI</strong><span>Systems</span></div>
              <div><strong>API</strong><span>Backends</span></div>
            </div>

            <a
              className="hero-resume-download"
              href="/Vasanthan%20Resume.pdf"
              download="Vasanthan Resume.pdf"
              aria-label="Download Vasanthan Resume PDF"
            >
              <HiDownload size={18} />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.65, duration: 0.8 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <HiArrowDown size={14} />
        </motion.div>
        <span>Scroll</span>
      </motion.div>

      <style>{`
        .hero-section {
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        .hero-background,
        .hero-vignette {
          overflow: hidden;
        }

        .hero-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.022;
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.65) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.65) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: radial-gradient(circle at 50% 34%, black 0%, transparent 76%);
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 38%, transparent 0%, transparent 45%, rgba(5, 8, 22, 0.66) 76%, rgba(5, 8, 22, 0.95) 100%),
            linear-gradient(90deg, rgba(5, 8, 22, 0.72), transparent 28%, transparent 72%, rgba(5, 8, 22, 0.72));
        }

        .hero-blue-core {
          position: absolute;
          left: 50%;
          top: 39%;
          width: clamp(340px, 58vw, 760px);
          height: clamp(340px, 58vw, 760px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, rgba(59, 130, 246, 0.12) 26%, rgba(59, 130, 246, 0.04) 52%, transparent 72%);
          filter: blur(22px);
        }

        .hero-orbit {
          position: absolute;
          left: 50%;
          top: 39%;
          border-radius: 50%;
          border: 1px solid rgba(96, 165, 250, 0.1);
          transform: translate(-50%, -50%) translateZ(0);
          will-change: transform;
        }

        .hero-orbit-one {
          width: clamp(360px, 54vw, 720px);
          height: clamp(360px, 54vw, 720px);
          animation: heroOrbit 42s linear infinite;
        }

        .hero-orbit-two {
          width: clamp(250px, 40vw, 560px);
          height: clamp(250px, 40vw, 560px);
          opacity: 0.78;
          animation: heroOrbitReverse 34s linear infinite;
        }

        .hero-code-panel {
          position: absolute;
          width: clamp(96px, 14vw, 190px);
          height: clamp(72px, 9vw, 124px);
          border: 1px solid rgba(96, 165, 250, 0.07);
          border-radius: 5px;
          background:
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            rgba(15, 23, 42, 0.16);
          background-size: 100% 18px, 28px 100%, auto;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.06);
          filter: blur(0.2px);
          opacity: 0.33;
          transform: perspective(600px) rotateY(-26deg) rotateZ(-6deg);
          will-change: transform;
        }

        .hero-code-panel-one {
          right: 13%;
          top: 28%;
        }

        .hero-code-panel-two {
          left: 10%;
          bottom: 26%;
          transform: perspective(600px) rotateY(24deg) rotateZ(7deg);
          opacity: 0.2;
        }

        .hero-particle {
          position: absolute;
          border-radius: 999px;
          background: rgba(125, 190, 255, 0.58);
          box-shadow: 0 0 14px rgba(59, 130, 246, 0.45);
          opacity: 0;
          animation: heroParticleFloat 8s ease-in-out infinite;
          transform: translate3d(0, 0, 0);
        }

        .hero-shell {
          width: 100%;
          padding: clamp(7.25rem, 9vw, 9rem) clamp(1rem, 4vw, 4rem) clamp(4.5rem, 6vw, 6rem);
        }

        .hero-poster {
          width: min(100%, 900px);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(0.5rem, 1.2vw, 1rem);
        }

        .hero-side-objects {
          display: none;
        }

        .hero-portrait-stage {
          position: relative;
          width: min(68vw, 520px);
          aspect-ratio: 1 / 0.96;
          transform-style: preserve-3d;
          perspective: 1200px;
          will-change: transform;
        }

        .hero-portrait-glow {
          position: absolute;
          inset: 5% 2% 3%;
          border-radius: 28px;
          background: radial-gradient(ellipse at center, rgba(96, 165, 250, 0.34) 0%, rgba(59, 130, 246, 0.16) 36%, transparent 72%);
          filter: blur(26px);
          transform: translateZ(-32px);
        }

        .hero-glass-frame {
          position: absolute;
          left: 10%;
          right: 10%;
          top: 13%;
          bottom: 10%;
          z-index: 1;
          border-radius: 3px;
          border: 1px solid rgba(147, 197, 253, 0.38);
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.012)),
            rgba(15, 23, 42, 0.1);
          box-shadow:
            0 0 18px rgba(96, 165, 250, 0.44),
            0 0 58px rgba(59, 130, 246, 0.15),
            inset 0 0 20px rgba(147, 197, 253, 0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transform: rotate(-0.4deg) translateZ(0);
        }

        .hero-frame-edge {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(191, 219, 254, 0.95), transparent);
          filter: drop-shadow(0 0 7px rgba(96, 165, 250, 0.8));
          opacity: 0.9;
        }

        .hero-frame-edge-top,
        .hero-frame-edge-bottom {
          left: -1px;
          right: -1px;
          height: 1px;
        }

        .hero-frame-edge-left,
        .hero-frame-edge-right {
          top: -1px;
          bottom: -1px;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(191, 219, 254, 0.95), transparent);
        }

        .hero-frame-edge-top { top: -1px; }
        .hero-frame-edge-right { right: -1px; }
        .hero-frame-edge-bottom { bottom: -1px; }
        .hero-frame-edge-left { left: -1px; }

        .hero-frame-sheen {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.12), transparent 36%, rgba(59,130,246,0.1)),
            radial-gradient(circle at 88% 92%, rgba(191, 219, 254, 0.35), transparent 10%);
          opacity: 0.62;
        }

        .hero-portrait-img {
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: -2%;
          width: 78%;
          height: auto;
          max-width: none;
          transform: translateX(-50%) translateZ(44px);
          filter:
            drop-shadow(0 28px 42px rgba(0, 0, 0, 0.58))
            drop-shadow(0 0 12px rgba(96, 165, 250, 0.3));
          user-select: none;
          pointer-events: none;
        }

        .hero-portrait-fade {
          position: absolute;
          left: 1%;
          right: 1%;
          bottom: -8%;
          z-index: 1;
          height: 34%;
          border-radius: 50% 50% 14px 14px / 45% 45% 14px 14px;
          background:
            radial-gradient(ellipse at 50% 6%, var(--surface) 0%, color-mix(in srgb, var(--surface) 72%, transparent) 36%, transparent 72%),
            linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--bg) 72%, transparent) 50%, var(--bg) 100%);
          box-shadow: 0 -26px 60px color-mix(in srgb, var(--accent) 12%, transparent);
          filter: blur(10px);
          opacity: 0.96;
          pointer-events: none;
        }

        .hero-img-placeholder {
          position: absolute;
          inset: 6% 10% 4%;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          background: linear-gradient(135deg, #0F172A, #1E293B);
        }

        .hero-img-placeholder span {
          font-size: clamp(4rem, 8vw, 7rem);
          opacity: 0.22;
        }

        .hero-content {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.42rem, 0.72vw, 0.62rem);
          width: min(100%, 880px);
          margin-top: clamp(-3.1rem, -3.5vw, -2rem);
          padding: clamp(2.15rem, 2.8vw, 3rem) clamp(1rem, 3vw, 2.5rem) clamp(0.25rem, 0.8vw, 0.55rem);
          text-align: center;
        }

        .hero-content::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: -0.85rem;
          z-index: -1;
          width: min(108vw, 980px);
          transform: translateX(-50%);
          border-radius: 44px 44px 0 0 / 34px 34px 0 0;
          background:
            radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--surface) 88%, transparent) 0%, color-mix(in srgb, var(--surface) 62%, transparent) 34%, transparent 68%),
            linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--bg) 72%, transparent) 25%, color-mix(in srgb, var(--bg) 96%, var(--surface) 4%) 62%, var(--bg) 100%);
          box-shadow:
            0 -36px 72px color-mix(in srgb, var(--accent) 14%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          pointer-events: none;
        }

        .hero-name {
          display: flex;
          justify-content: center;
          gap: 0.28em;
          color: var(--text-primary);
          font-size: clamp(2.55rem, 4.7vw, 4.1rem);
          line-height: 0.9;
          letter-spacing: 0;
          text-shadow: 0 0 24px rgba(96, 165, 250, 0.16), 0 12px 34px rgba(0, 0, 0, 0.52);
        }

        .hero-role {
          color: rgba(241, 245, 249, 0.92);
          font-size: clamp(0.62rem, 0.82vw, 0.74rem);
          letter-spacing: 0.32em;
          line-height: 1.2;
          text-shadow: 0 0 12px rgba(96, 165, 250, 0.18);
        }

        .hero-divider {
          width: clamp(2rem, 4vw, 3.25rem);
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.8), transparent);
          opacity: 0.72;
        }

        .hero-tagline {
          max-width: 40ch;
          color: rgba(226, 232, 240, 0.82);
          font-size: clamp(0.95rem, 1.18vw, 1.08rem);
          line-height: 1.45;
          text-shadow: 0 0 14px rgba(59, 130, 246, 0.12);
        }

        .hero-side-orbit,
        .hero-object-card,
        .hero-object-stats {
          transform: translateZ(0);
          will-change: transform;
        }

        .hero-side-orbit {
          position: absolute;
          inset: 2% 6% auto auto;
          width: min(26vw, 360px);
          aspect-ratio: 1;
          border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent);
          border-radius: 50%;
          opacity: 0.75;
          animation: heroOrbitSoft 28s linear infinite;
        }

        .hero-side-orbit::before,
        .hero-side-orbit::after,
        .hero-side-orbit span {
          content: '';
          position: absolute;
          border-radius: 50%;
        }

        .hero-side-orbit::before {
          inset: 18%;
          border: 1px solid color-mix(in srgb, var(--accent) 10%, transparent);
        }

        .hero-side-orbit::after {
          right: 12%;
          top: 20%;
          width: 8px;
          height: 8px;
          background: var(--accent);
          box-shadow: 0 0 24px var(--accent-glow);
        }

        .hero-side-orbit span:first-child {
          left: 16%;
          bottom: 24%;
          width: 4px;
          height: 4px;
          background: color-mix(in srgb, var(--accent) 80%, white 20%);
          box-shadow: 0 0 16px var(--accent-glow);
        }

        .hero-side-orbit span:last-child {
          right: 28%;
          bottom: 12%;
          width: 44px;
          height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 70%, transparent));
          border-radius: 0;
          transform: rotate(-18deg);
        }

        .hero-object-card {
          position: relative;
          border: 1px solid color-mix(in srgb, var(--text-primary) 8%, transparent);
          border-radius: 8px;
          background:
            linear-gradient(145deg, color-mix(in srgb, var(--surface) 56%, transparent), color-mix(in srgb, var(--bg) 76%, transparent)),
            color-mix(in srgb, var(--surface) 18%, transparent);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.045),
            0 0 42px color-mix(in srgb, var(--accent) 8%, transparent);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .hero-object-card-main {
          width: min(28vw, 350px);
          padding: 1.15rem;
          margin-left: auto;
          margin-top: clamp(2rem, 7vh, 4.4rem);
        }

        .hero-object-kicker {
          color: var(--accent);
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 0.72rem;
        }

        .hero-object-title {
          color: var(--text-primary);
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.35rem, 2vw, 2rem);
          line-height: 0.95;
          margin-bottom: 1rem;
        }

        .hero-object-line {
          height: 1px;
          width: 72%;
          margin-top: 0.6rem;
          background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 46%, transparent), transparent);
        }

        .hero-object-line-wide {
          width: 100%;
        }

        .hero-object-line-short {
          width: 46%;
        }

        .hero-object-card-code {
          width: min(24vw, 310px);
          padding: 1rem;
          margin: 1.2rem 0 0 clamp(1rem, 4vw, 3rem);
          color: color-mix(in srgb, var(--text-secondary) 82%, transparent);
          font-size: 0.72rem;
          letter-spacing: 0.04em;
        }

        .hero-code-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          min-height: 1.7rem;
        }

        .hero-code-row span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 14px var(--accent-glow);
          flex: 0 0 auto;
        }

        .hero-object-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.7rem;
          width: min(32vw, 400px);
          margin: 1.25rem 0 0 auto;
        }

        .hero-object-stats div {
          padding: 0.9rem 0.75rem;
          border: 1px solid color-mix(in srgb, var(--text-primary) 7%, transparent);
          border-radius: 7px;
          background: color-mix(in srgb, var(--surface) 22%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .hero-object-stats strong,
        .hero-object-stats span {
          display: block;
          text-align: center;
        }

        .hero-object-stats strong {
          color: var(--text-primary);
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          line-height: 1;
        }

        .hero-object-stats span {
          margin-top: 0.3rem;
          color: var(--text-muted);
          font-size: 0.56rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .hero-resume-download {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          min-height: 3.25rem;
          width: min(24vw, 310px);
          margin: 1.15rem 0 0 auto;
          border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
          border-radius: 8px;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), transparent 58%),
            color-mix(in srgb, var(--surface) 28%, transparent);
          color: var(--text-primary);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow:
            0 18px 48px rgba(0, 0, 0, 0.22),
            0 0 34px color-mix(in srgb, var(--accent) 12%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease;
        }

        .hero-resume-download:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--accent) 70%, transparent);
          color: var(--accent);
          box-shadow:
            0 22px 56px rgba(0, 0, 0, 0.28),
            0 0 44px color-mix(in srgb, var(--accent) 20%, transparent),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .hero-resume-download svg,
        .hero-resume-download span {
          position: relative;
          z-index: 1;
        }

        .hero-scroll {
          position: absolute;
          left: 50%;
          bottom: clamp(1.35rem, 2.4vw, 2.1rem);
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: rgba(148, 163, 184, 0.86);
          transform: translateX(-50%);
        }

        .hero-scroll span {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        @keyframes heroOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translate3d(0, 0, 0); }
          to { transform: translate(-50%, -50%) rotate(360deg) translate3d(0, 0, 0); }
        }

        @keyframes heroOrbitReverse {
          from { transform: translate(-50%, -50%) rotate(360deg) translate3d(0, 0, 0); }
          to { transform: translate(-50%, -50%) rotate(0deg) translate3d(0, 0, 0); }
        }

        @keyframes heroParticleFloat {
          0%, 100% { opacity: 0; transform: translate3d(0, 10px, 0) scale(0.8); }
          32% { opacity: 0.58; }
          68% { opacity: 0.18; transform: translate3d(16px, -20px, 0) scale(1); }
        }

        @keyframes heroOrbitSoft {
          from { transform: rotate(0deg) translate3d(0, 0, 0); }
          to { transform: rotate(360deg) translate3d(0, 0, 0); }
        }

        @media (min-width: 1024px) {
          .hero-section {
            justify-content: flex-start;
          }

          .hero-shell {
            padding-left: clamp(2.5rem, 5vw, 6rem);
            padding-right: clamp(2.5rem, 5vw, 6rem);
          }

          .hero-poster {
            width: min(100%, 1320px);
            display: grid;
            grid-template-columns: minmax(480px, 0.92fr) minmax(320px, 0.78fr);
            grid-template-rows: auto auto;
            align-items: center;
            column-gap: clamp(2.25rem, 5vw, 6rem);
            row-gap: 0;
          }

          .hero-portrait-stage,
          .hero-content {
            grid-column: 1;
          }

          .hero-portrait-stage {
            justify-self: center;
            width: min(43vw, 520px);
          }

          .hero-content {
            justify-self: center;
            width: min(48vw, 660px);
          }

          .hero-name {
            font-size: clamp(2.7rem, 4.1vw, 4.2rem);
          }

          .hero-side-objects {
            position: relative;
            display: block;
            grid-column: 2;
            grid-row: 1 / span 2;
            align-self: center;
            width: 100%;
            min-height: min(58vh, 560px);
            padding: clamp(1rem, 2vw, 2rem) 0;
          }

          .hero-resume-download {
            position: relative;
            margin: 1.5xrem 0 0 auto;
          }

          .hero-blue-core {
            left: 36%;
          }

          .hero-orbit {
            left: 37%;
          }

          .hero-code-panel-one {
            right: 8%;
            top: 26%;
            opacity: 0.18;
          }
        }

        @media (max-width: 767px) {
          .hero-section {
            min-height: 100svh;
          }

          .hero-shell {
            min-height: 100svh;
            display: flex;
            align-items: center;
            padding: 5.7rem 1rem 4.1rem;
          }

          .hero-poster {
            width: min(100%, 390px);
            gap: 0.1rem;
          }

          .hero-portrait-stage {
            width: min(88vw, 340px);
            aspect-ratio: 0.72 / 1;
          }

          .hero-side-objects {
            display: flex;
            justify-content: center;
            width: 100%;
            padding-top: 0;
          }

          .hero-side-orbit,
          .hero-object-card,
          .hero-object-stats {
            display: none;
          }

          .hero-resume-download {
            width: min(100%, 310px);
            margin: clamp(10rem, 22vw, 14rem) auto 0;
            position: relative;
            left: auto;
            top: auto;
          }

          .hero-blue-core {
            top: 36%;
            width: 360px;
            height: 520px;
          }

          .hero-orbit {
            top: 34%;
          }

          .hero-orbit-one {
            width: 360px;
            height: 360px;
          }

          .hero-orbit-two {
            width: 260px;
            height: 260px;
          }

          .hero-code-panel {
            display: none;
          }

          .hero-grid-bg {
            background-size: 42px 42px;
            opacity: 0.02;
          }

          .hero-glass-frame {
            left: 9%;
            right: 9%;
            top: 5%;
            bottom: 13%;
          }

          .hero-portrait-img {
            width: 106%;
            bottom: -2%;
            transform: translateX(-50%) translateZ(44px);
          }

          .hero-portrait-fade {
            left: -3%;
            right: -3%;
            bottom: -7%;
            height: 31%;
          }

          .hero-content {
            width: min(100%, 390px);
            margin-top: -2.6rem;
            padding: 2.2rem 0.8rem 0.2rem;
            gap: 0.52rem;
          }

          .hero-content::before {
            top: 0;
            bottom: -0.6rem;
            width: min(116vw, 440px);
            border-radius: 30px 30px 0 0 / 24px 24px 0 0;
            background:
              radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--surface) 86%, transparent) 0%, color-mix(in srgb, var(--surface) 58%, transparent) 34%, transparent 70%),
              linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--bg) 68%, transparent) 22%, color-mix(in srgb, var(--bg) 96%, var(--surface) 4%) 60%, var(--bg) 100%);
          }

          .hero-name {
            flex-direction: column;
            gap: 0;
            font-size: clamp(2.15rem, 11.5vw, 3.35rem);
            line-height: 0.82;
          }

          .hero-role {
            font-size: 0.58rem;
            letter-spacing: 0.28em;
          }

          .hero-tagline {
            max-width: 24ch;
            font-size: 0.85rem;
            line-height: 1.42;
          }

          .hero-scroll {
            bottom: 1.25rem;
          }
        }

        @media (max-width: 360px) {
          .hero-shell {
            padding-top: 5.25rem;
          }

          .hero-portrait-stage {
            width: min(88vw, 306px);
          }

          .hero-name {
            font-size: 2rem;
          }
        }

        @media (min-width: 1200px) {
          .hero-shell {
            padding-top: 7.5rem;
          }

          .hero-portrait-stage {
            width: min(60vw, 540px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-orbit,
          .hero-particle {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
