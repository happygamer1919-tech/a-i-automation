'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/LangProvider';
import styles from './BootScreen.module.css';

export function BootScreen() {
  const { t } = useLang();
  const [phase, setPhase] = useState<'boot' | 'fading' | 'done'>('boot');
  const [lineIndex, setLineIndex] = useState(0);

  const lines = [
    t.boot_line_1,
    t.boot_line_2,
    t.boot_line_3,
    t.boot_line_4,
    t.boot_line_5,
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip entirely: already seen this tab, or the user prefers reduced motion.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sessionStorage.getItem('boot_done') === '1' || reduceMotion) {
      setPhase('done');
      return;
    }

    let fadeTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      setLineIndex(lines.length - 1);
      setPhase('fading');
      sessionStorage.setItem('boot_done', '1');
      doneTimer = setTimeout(() => setPhase('done'), 400);
      window.removeEventListener('keydown', onSkip);
      window.removeEventListener('pointerdown', onSkip);
    };
    // Let the visitor skip the intro with any key or tap.
    const onSkip = () => finish();

    // Total normal run stays under ~1s (5 lines x 90ms + 200ms hold + 400ms fade).
    const interval = setInterval(() => {
      setLineIndex((i) => {
        if (i >= lines.length - 1) {
          clearInterval(interval);
          fadeTimer = setTimeout(finish, 200);
          return i;
        }
        return i + 1;
      });
    }, 90);

    window.addEventListener('keydown', onSkip);
    window.addEventListener('pointerdown', onSkip);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('keydown', onSkip);
      window.removeEventListener('pointerdown', onSkip);
    };
    // Intentionally run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') return null;

  return (
    <div className={`${styles.boot} ${phase === 'fading' ? styles.fading : ''}`} aria-hidden="true">
      <div className={styles.scan} />
      <div className={styles.grid} />
      <div className={styles.kataCol} style={{ left: '6%' }}>アンドレイ　アンド　イヴァン　オートメーション</div>
      <div className={styles.kataCol} style={{ right: '6%' }}>システム　オンライン　データストリーム</div>

      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.dot} /> <span className={styles.dot} /> <span className={styles.dot} />
          <span className={styles.headerLabel}>A&amp;I // CORE v7.2.2</span>
        </div>
        <div className={styles.terminal}>
          {lines.slice(0, lineIndex + 1).map((line, i) => (
            <div key={i} className={styles.line}>
              <span className={styles.prompt}>&gt;</span>
              <span className={styles.text}>{line}</span>
              {i === lineIndex && <span className={styles.cursor}>▊</span>}
            </div>
          ))}
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${((lineIndex + 1) / lines.length) * 100}%` }}
            />
          </div>
          <div className={styles.boot_ready}>{t.boot_ready}</div>
        </div>
      </div>
    </div>
  );
}
