'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/LangProvider';
import { LANGS } from '@/lib/i18n';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'services', key: 'nav_services' as const },
  { id: 'process', key: 'nav_process' as const },
  { id: 'stack', key: 'nav_stack' as const },
  { id: 'why-us', key: 'nav_why' as const },
  { id: 'contact', key: 'nav_contact' as const },
];

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: unknown) => void } }).__lenis;
    if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    else target.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => goTo('hero')} aria-label="A&I Automation">
          <span className={styles.logoFrame}>
            <Image src="/logo.png" alt="" width={40} height={40} priority />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoA}>A</span>
            <span className={styles.logoAmp}>&amp;</span>
            <span className={styles.logoI}>I</span>
            <span className={styles.logoAuto}> AUTOMATION</span>
          </span>
        </button>

        <div className={`${styles.right} ${open ? styles.open : ''}`}>
          <ul className={styles.links}>
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => goTo(l.id)}>
                  <span className={styles.linkBracket}>[</span>
                  {t[l.key]}
                  <span className={styles.linkBracket}>]</span>
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.langs}>
            {LANGS.map((l) => (
              <button
                key={l}
                className={`${styles.langBtn} ${lang === l ? styles.langActive : ''}`}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button className={styles.cta} onClick={() => goTo('contact')}>
            {t.hero_cta} <span className={styles.arrow}>→</span>
          </button>
        </div>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={styles.underline} />
    </nav>
  );
}
