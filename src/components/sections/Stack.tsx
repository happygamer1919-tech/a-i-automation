'use client';

import dynamic from 'next/dynamic';
import { useLang } from '@/lib/LangProvider';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './Stack.module.css';

const StackOrbital = dynamic(() => import('@/components/three/StackOrbital').then((m) => m.StackOrbital), {
  ssr: false,
});

export function Stack() {
  const { t } = useLang();

  const tags = [
    { name: t.stack_tag_ai, dot: 'var(--blue-300)' },
    { name: t.stack_tag_auto, dot: 'var(--purple-300)' },
    { name: t.stack_tag_ops, dot: '#d010ff' },
    { name: t.stack_tag_comms, dot: '#7ab0ff' },
  ];

  return (
    <section id="stack" className={styles.section}>
      <div className="container">
        <SectionHeader label={t.stack_label} title={t.stack_title} sub={t.stack_sub} align="center" />
      </div>
      <div className={styles.viz}>
        <StackOrbital />
        <div className={styles.hudTop}>
          <span>NODE_GRAPH · 12 CONNECTED</span>
          <span>◆ LIVE</span>
        </div>
        <div className={styles.hudBottom}>
          {tags.map((tag, i) => (
            <div key={i} className={styles.tag}>
              <span className={styles.tagDot} style={{ background: tag.dot, boxShadow: `0 0 8px ${tag.dot}` }} />
              {tag.name}
            </div>
          ))}
        </div>
        <span className="kata" style={{ top: '10%', left: '3%' }}>データストリーム</span>
        <span className="kata" style={{ top: '10%', right: '3%' }}>ネットワーク</span>
      </div>
    </section>
  );
}
