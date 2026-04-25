'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/LangProvider';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './Process.module.css';

export function Process() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const steps = [
    { n: '01', title: t.step1_title, desc: t.step1_desc },
    { n: '02', title: t.step2_title, desc: t.step2_desc },
    { n: '03', title: t.step3_title, desc: t.step3_desc },
    { n: '04', title: t.step4_title, desc: t.step4_desc },
    { n: '05', title: t.step5_title, desc: t.step5_desc },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const rail = railRef.current;
      const progress = progressRef.current;
      if (!section || !track || !rail || !progress) return;

      const distance = () => rail.scrollWidth - window.innerWidth + 80;

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => {
            progress.style.setProperty('--p', `${st.progress * 100}%`);
          },
        },
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <div className="container">
          <SectionHeader label={t.process_label} title={t.process_title} />
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        <div className={styles.rail} ref={railRef}>
          {steps.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.num}>{s.n}</span>
                <span className={styles.line} />
                <span className={styles.tag}>STEP · {s.n}/05</span>
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.nodes}>
                {Array.from({ length: 12 }).map((_, j) => (
                  <span key={j} style={{ animationDelay: `${j * 0.08}s` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`container ${styles.progressWrap}`} ref={progressRef}>
        <div className={styles.progressLabel}>
          <span>{t.process_label}</span>
          <span className="mono">01 / 05 → 05 / 05</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </section>
  );
}
