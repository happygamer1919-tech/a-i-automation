'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLang } from '@/lib/LangProvider';
import styles from './Hero.module.css';

const HeroScene = dynamic(() => import('@/components/three/HeroScene').then((m) => m.HeroScene), { ssr: false });

export function Hero() {
  const { t } = useLang();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      `.${styles.kicker}`,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
    );
    tl.fromTo(
      titleRef.current.querySelectorAll(`.${styles.word}`),
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', stagger: 0.08 },
      '-=0.6',
    );
    tl.fromTo(
      `.${styles.sub}`,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4',
    );
    tl.fromTo(
      `.${styles.ctaRow} > *`,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
      '-=0.4',
    );
    tl.fromTo(
      `.${styles.scroll}`,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2',
    );
  }, []);

  const goContact = () => {
    const target = document.getElementById('contact');
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: unknown) => void } }).__lenis;
    if (target && lenis) lenis.scrollTo(target, { offset: -72, duration: 1.6 });
  };
  const goProcess = () => {
    const target = document.getElementById('process');
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: unknown) => void } }).__lenis;
    if (target && lenis) lenis.scrollTo(target, { offset: -72, duration: 1.6 });
  };

  const words = t.hero_title.split(' ');

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.bg}>
        <HeroScene />
      </div>

      <span className="kata" style={{ top: '14%', left: '3%', writingMode: 'vertical-rl' }}>
        アンドレイ・アンド・イヴァン
      </span>
      <span className="kata" style={{ top: '22%', right: '3%', writingMode: 'vertical-rl' }}>
        システム　オンライン
      </span>

      <div className={`container ${styles.content}`}>
        <div className={`eyebrow ${styles.kicker}`}>{t.hero_kicker}</div>
        <h1 ref={titleRef} className={styles.title}>
          {words.map((w, i) => (
            <span key={i} className={styles.word}>
              <span className={i >= words.length - 2 ? 'gradient-text' : ''}>{w}</span>{' '}
            </span>
          ))}
        </h1>
        <p className={styles.sub}>{t.hero_sub}</p>

        <div className={styles.ctaRow}>
          <button className="btn btn-primary" onClick={goContact}>
            {t.hero_cta} <span className="arrow">→</span>
          </button>
          <button className="btn btn-ghost hud" onClick={goProcess}>
            {t.hero_cta_secondary} <span className="arrow">↓</span>
          </button>
        </div>

        <div className={styles.badges}>
          <div className={styles.badge}>
            <span className={styles.dot} /> {t.boot_line_5}
          </div>
          <div className={styles.badge}>
            <span className={styles.dot} style={{ background: 'var(--blue-300)' }} /> A.I.CORE v7.2.2
          </div>
          <div className={styles.badge}>
            <span className={styles.dot} style={{ background: '#fff' }} /> CHIȘINĂU · GLOBAL
          </div>
        </div>
      </div>

      <div className={styles.scroll}>
        <span>{t.hero_scroll_hint}</span>
        <span className={styles.scrollBar}><span /></span>
      </div>
    </section>
  );
}
