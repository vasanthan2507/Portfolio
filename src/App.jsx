import { useEffect, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import Loader from './components/Loader';
import Nav from './components/Nav';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';
import PortalTransition from './components/PortalTransition';
import WaveTransition from './components/WaveTransition';
import Footer from './components/Footer';
import Hero from './sections/Hero';

const Works = lazy(() => import('./sections/Works'));
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Journey = lazy(() => import('./sections/Journey'));
const Contact = lazy(() => import('./sections/Contact'));
const NotFound = lazy(() => import('./sections/NotFound'));
const CaseStudy = lazy(() => import('./sections/CaseStudy'));

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

function HomePage({ revealed }) {
  return (
    <motion.main
      id="main-content"
      initial={{ filter: 'blur(12px)', opacity: 0 }}
      animate={revealed ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <Hero />
      <PortalTransition />
      <Suspense fallback={null}>
        <Works />
        <About />
        <Skills />
        <Journey />
        <WaveTransition />
        <Contact />
      </Suspense>
    </motion.main>
  );
}

function CaseStudyPage() {
  useLenis();
  return (
    <main id="main-content">
      <Suspense fallback={null}>
        <CaseStudy />
      </Suspense>
    </main>
  );
}

function Shell({ children }) {
  const { theme, toggle } = useTheme();
  useLenis();

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] btn-primary">
        Skip to content
      </a>
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
      <Nav theme={theme} toggleTheme={toggle} />
      {children}
      <Footer />
    </>
  );
}

function AppShell() {
  const { theme, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const isCaseStudy = location.pathname.startsWith('/work/');

  // Case study pages skip loader
  useEffect(() => {
    if (isCaseStudy) setLoaded(true);
  }, [isCaseStudy]);

  if (!loaded) {
    return <Loader onComplete={() => setLoaded(true)} />;
  }

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage revealed={loaded} />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={
          <Suspense fallback={null}><NotFound /></Suspense>
        } />
      </Routes>
    </Shell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
