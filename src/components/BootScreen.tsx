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
    // Session-scoped: only show once per tab
    if (typeof window !== 'undefined' && sessionStorage.getItem('boot_done') === '1') {
      setPhase('done');
      return;
    }
    const interval = setInterval(() => {
      setLineIndex((i) => {
        if (i >= lines.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('fading');
            sessionStorage.setItem('boot_done', '1');
            setTimeout(() => setPhase('done'), 900);
          }, 650);
          return i;
        }
        return i + 1;
      });
    }, 520);
    return () => clearInterval(interval);
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
