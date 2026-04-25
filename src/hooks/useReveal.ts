'use client';

import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    targets.forEach((t) => {
      t.classList.add('reveal');
      const i = Number(t.dataset.revealIndex ?? 0);
      t.style.transitionDelay = `${i * 80}ms`;
      io.observe(t);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}
