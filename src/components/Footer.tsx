'use client';

import { useLang } from '@/lib/LangProvider';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useLang();

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: unknown) => void } }).__lenis;
    if (target && lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.circuits} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#4f7cff" stopOpacity="0" />
              <stop offset="0.3" stopColor="#4f7cff" stopOpacity="0.7" />
              <stop offset="0.7" stopColor="#a855f7" stopOpacity="0.7" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 40 L200 40 L240 20 L420 20 L460 40 L720 40 L760 60 L980 60 L1020 40 L1440 40"
                stroke="url(#cg1)" strokeWidth="1" fill="none" />
          <path d="M0 30 L120 30 L160 10 L300 10 L340 30 L600 30 L640 50 L1440 50"
                stroke="url(#cg1)" strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="240" cy="20" r="2" fill="#7ab0ff" />
          <circle cx="460" cy="40" r="2" fill="#7ab0ff" />
          <circle cx="760" cy="60" r="2" fill="#d88bff" />
          <circle cx="1020" cy="40" r="2" fill="#d88bff" />
        </svg>
      </div>

      <span className="kata" style={{ top: '14px', left: '2%', writingMode: 'horizontal-tb', letterSpacing: '0.4em' }}>
        システム · オートメーション · エージェント
      </span>

      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.logoA}>A</span>
            <span className={styles.logoAmp}>&amp;</span>
            <span className={styles.logoI}>I</span>
          </span>
          <span className={styles.tag}>{t.footer_tag}</span>
        </div>

        <ul className={styles.links}>
          <li><button onClick={() => goTo('services')}>{t.nav_services}</button></li>
          <li><button onClick={() => goTo('process')}>{t.nav_process}</button></li>
          <li><button onClick={() => goTo('stack')}>{t.nav_stack}</button></li>
          <li><button onClick={() => goTo('why-us')}>{t.nav_why}</button></li>
          <li><button onClick={() => goTo('contact')}>{t.nav_contact}</button></li>
        </ul>

        <div className={styles.meta}>
          <span>© 2026 A&amp;I Automation</span>
          <span className={styles.dim}>{t.footer_rights}</span>
        </div>
      </div>

      <div className={styles.baseline}>
        <span>LAT 47.01°N · LON 28.86°E</span>
        <span>BUILD 2026.04</span>
      </div>
    </footer>
  );
}
