'use client';

import { useLang } from '@/lib/LangProvider';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './Services.module.css';

export function Services() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();

  const tiers = [
    {
      label: t.tier1_label,
      title: t.tier1_title,
      subtitle: t.tier1_subtitle,
      desc: t.tier1_desc,
      deliverable: t.tier1_deliverable,
      best: t.tier1_best,
      tag: t.tier1_tag,
      tone: 'blue' as const,
    },
    {
      label: t.tier2_label,
      title: t.tier2_title,
      subtitle: t.tier2_subtitle,
      desc: t.tier2_desc,
      deliverable: t.tier2_deliverable,
      best: t.tier2_best,
      popular: true,
      tone: 'gradient' as const,
    },
    {
      label: t.tier3_label,
      title: t.tier3_title,
      subtitle: t.tier3_subtitle,
      desc: t.tier3_desc,
      deliverable: t.tier3_deliverable,
      best: t.tier3_best,
      addon: t.tier3_addon,
      tone: 'purple' as const,
    },
  ];

  return (
    <section id="services" className={styles.section}>
      <div className="container" ref={ref}>
        <SectionHeader label={t.services_label} title={t.services_title} />
        <div className={styles.grid}>
          {tiers.map((tier, i) => (
            <article
              key={i}
              className={`${styles.card} ${styles[`tone_${tier.tone}`]} ${tier.popular ? styles.popular : ''} hud`}
              data-reveal
              data-reveal-index={i}
            >
              {tier.popular && <div className={styles.badge}>{t.popular}</div>}
              <div className={styles.label}>{tier.label}</div>
              <h3 className={styles.title}>{tier.title}</h3>
              <p className={styles.subtitle}>{tier.subtitle}</p>
              <div className={styles.divider} />
              <p className={styles.desc}>{tier.desc}</p>
              <ul className={styles.details}>
                <li>
                  <span className={styles.key}>{t.deliverable}</span>
                  <span>{tier.deliverable}</span>
                </li>
                <li>
                  <span className={styles.key}>{t.best_for}</span>
                  <span>{tier.best}</span>
                </li>
                {tier.addon && (
                  <li>
                    <span className={styles.key}>{t.addon}</span>
                    <span>{tier.addon}</span>
                  </li>
                )}
              </ul>
              {tier.tag && <div className={styles.tag}>{tier.tag}</div>}
              <div className={styles.cornerA} />
              <div className={styles.cornerB} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
