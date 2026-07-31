import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];
    const map = new Map();

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          map.set(id, entry.intersectionRatio);
          let best = sectionIds[0];
          let max = 0;
          map.forEach((ratio, key) => { if (ratio > max) { max = ratio; best = key; } });
          if (max > 0) setActive(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [sectionIds]);

  return active;
}
