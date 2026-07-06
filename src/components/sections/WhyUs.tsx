'use client';

import { useLang } from '@/lib/LangProvider';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './WhyUs.module.css';

export function WhyUs() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();

  const reasons = [t.why_1, t.why_2, t.why_3, t.why_4];
  const offerPoints = [t.offer_1, t.offer_2, t.offer_3, t.offer_4];

  const goContact = () => {
    const target = document.getElementById('contact');
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: unknown) => void } }).__lenis;
    if (target && lenis) lenis.scrollTo(target, { offset: -72, duration: 1.6 });
    else if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

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

          <aside className={`${styles.offer} hud`} data-reveal>
            <div className={styles.offerHeader}>
              <span className="eyebrow">{t.offer_label}</span>
              <span className={styles.badge}>◆ {t.offer_badge}</span>
            </div>
            <h3 className={styles.offerTitle}>{t.offer_title}</h3>
            <p className={styles.offerLead}>{t.offer_lead}</p>
            <ul className={styles.offerList}>
              {offerPoints.map((p, i) => (
                <li key={i} className={styles.offerItem}>
                  <span className={styles.offerBullet} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <button type="button" className={`btn btn-primary ${styles.offerCta}`} onClick={goContact}>
              {t.offer_cta} <span className="arrow">→</span>
            </button>
            <div className={styles.note}>{t.offer_note}</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
