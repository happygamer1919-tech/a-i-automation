'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/LangProvider';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './WhyUs.module.css';

function CountUp({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export function WhyUs() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();

  const reasons = [t.why_1, t.why_2, t.why_3, t.why_4];

  const stats = [
    { value: 12000, suffix: '+', label: t.impact_hours },
    { value: 42, suffix: '%', label: t.impact_saved },
    { value: 18, suffix: '', label: t.impact_agents },
    { value: 99.9, suffix: '%', label: t.impact_uptime, float: true },
  ];

  return (
    <section id="why-us" className={styles.section}>
      <div className="container" ref={ref}>
        <SectionHeader label={t.why_label} title={t.why_title} />
        <div className={styles.layout}>
          <ul className={styles.reasons}>
            {reasons.map((r, i) => (
              <li key={i} className={styles.item} data-reveal data-reveal-index={i}>
                <span className={styles.check}>
                  <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className={styles.itemIdx}>0{i + 1}</span>
                <span className={styles.itemText}>{r}</span>
              </li>
            ))}
          </ul>

          <aside className={`${styles.impact} hud`} data-reveal>
            <div className={styles.impactHeader}>
              <span className="eyebrow">{t.impact_title}</span>
              <span className={styles.live}>◆ LIVE</span>
            </div>
            <div className={styles.statGrid}>
              {stats.map((s, i) => (
                <div key={i} className={styles.stat}>
                  <div className={styles.statValue}>
                    {s.float ? (
                      <>
                        <CountUp to={Math.floor(s.value)} />
                        <span>.9</span>
                        {s.suffix}
                      </>
                    ) : (
                      <>
                        <CountUp to={s.value} />
                        {s.suffix}
                      </>
                    )}
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statBar}>
                    <span style={{ animationDelay: `${i * 0.15}s` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.note}>{t.impact_note}</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
