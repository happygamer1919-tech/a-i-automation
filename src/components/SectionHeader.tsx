import styles from './SectionHeader.module.css';

export function SectionHeader({
  label,
  title,
  sub,
  align = 'left',
}: {
  label: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
}) {
  return (
    <header className={`${styles.wrap} ${align === 'center' ? styles.center : ''}`}>
      <span className="eyebrow">{label}</span>
      <h2 className={styles.title}>{title}</h2>
      {sub && <p className={styles.sub}>{sub}</p>}
      <div className={styles.rule}>
        <span />
      </div>
    </header>
  );
}
