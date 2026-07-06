'use client';

import { useLang } from '@/lib/LangProvider';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './Problems.module.css';

const ICONS = [
  <svg key="1" viewBox="0 0 40 40" fill="none"><rect x="4" y="6" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><rect x="22" y="6" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 11H14M8 15H14M26 11H32M26 15H32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M20 28L16 24M20 28L24 24M20 28V34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="2" viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M28 12V28C28 29.1 28.9 30 30 30H34C35.1 30 36 29.1 36 28V16" stroke="currentColor" strokeWidth="1.5"/><circle cx="32" cy="26" r="1.5" fill="currentColor"/><path d="M10 26L14 22L18 26L24 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="3" viewBox="0 0 40 40" fill="none"><path d="M8 10C8 8.9 8.9 8 10 8H30C31.1 8 32 8.9 32 10V24C32 25.1 31.1 26 30 26H14L8 32V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="15" cy="17" r="1.3" fill="currentColor"/><circle cx="20" cy="17" r="1.3" fill="currentColor"/><circle cx="25" cy="17" r="1.3" fill="currentColor"/></svg>,
  <svg key="4" viewBox="0 0 40 40" fill="none"><rect x="6" y="6" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 14H34M14 14V34" stroke="currentColor" strokeWidth="1.5"/><path d="M18 19H24M18 24H28M18 29H22" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
];

export function Problems() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();

  const items = [t.problem_1, t.problem_2, t.problem_3, t.problem_4];

  return (
    <section id="problems" className={styles.section}>
      <div className="container" ref={ref}>
        <SectionHeader label={t.problems_label} title={t.problems_title} />
        <div className={styles.grid}>
          {items.map((text, i) => (
            <div key={i} className={`${styles.card} hud`} data-reveal data-reveal-index={i}>
              <div className={styles.meta}>
                <span className={styles.idx}>0{i + 1}</span>
              </div>
              <div className={styles.icon}>{ICONS[i]}</div>
              <p className={styles.text}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
