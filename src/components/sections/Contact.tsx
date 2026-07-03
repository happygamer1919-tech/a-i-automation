'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangProvider';
import { useReveal } from '@/hooks/useReveal';
import { SectionHeader } from '@/components/SectionHeader';
import styles from './Contact.module.css';

// TODO: replace with real Formspree ID when provided by user
const FORMSPREE_ID = 'your-form-id';
// TODO: replace with real Calendly URL when provided by user (Q2).
// Until a real booking link exists, the "book a call" button falls back to a
// phone call instead of a dead calendly.com landing page.
const CALENDLY_URL = '';
const PHONE_TEL = 'tel:+37368872444';

export function Contact() {
  const { t } = useLang();
  const ref = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const phone = String(data.get('phone') || '');
    const company = String(data.get('company') || '');
    const description = String(data.get('description') || '');

    if (FORMSPREE_ID === 'your-form-id') {
      const subject = encodeURIComponent(`Audit Request from ${name} - ${company}`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nCompany: ${company}\n\nDescription:\n${description}`,
      );
      window.location.href = `mailto:info@a-and-i-automation.com?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  const submitLabel =
    status === 'sending' ? t.form_sending : status === 'sent' ? t.form_sent : t.form_submit;

  return (
    <section id="contact" className={styles.section}>
      <div className="container" ref={ref}>
        <SectionHeader label={t.contact_label} title={t.contact_title} sub={t.contact_sub} align="center" />

        <div className={styles.wrap}>
          <form className={`${styles.form} hud`} onSubmit={onSubmit} data-reveal>
            <div className={styles.formHead}>
              <span className={styles.hudDot} /> NEW_TRANSMISSION.exe
            </div>
            <div className={styles.grid}>
              <label className={styles.field}>
                <span>{t.form_name}</span>
                <input name="name" type="text" required autoComplete="name" />
              </label>
              <label className={styles.field}>
                <span>{t.form_phone}</span>
                <input name="phone" type="tel" required autoComplete="tel" />
              </label>
              <label className={styles.field}>
                <span>{t.form_company}</span>
                <input name="company" type="text" required autoComplete="organization" />
              </label>
              <label className={styles.fieldFull}>
                <span>{t.form_desc}</span>
                <textarea name="description" rows={4} required />
              </label>
            </div>
            <div className={styles.actions}>
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                {submitLabel} <span className="arrow">→</span>
              </button>
              <a
                className="btn btn-ghost hud"
                href={CALENDLY_URL || PHONE_TEL}
                {...(CALENDLY_URL ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {t.book_call} <span className="arrow">{CALENDLY_URL ? '↗' : '☎'}</span>
              </a>
            </div>
          </form>

          <aside className={styles.info} data-reveal data-reveal-index={1}>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C11.5 21.04 3 12.5 3 5C3 4.44 3.44 4 4 4H7C7.55 4 8 4.45 8 5V8C8 8.55 7.55 9 7 9H5C5 14 10 19 15 19V17C15 16.45 15.45 16 16 16H19C19.55 16 20 16.45 20 17V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <a href="tel:+37368872444">068 872 444</a>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M2 7L12 13L22 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <a href="mailto:info@a-and-i-automation.com">info@a-and-i-automation.com</a>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </span>
              <span>{t.address}</span>
            </div>
            <div className={styles.infoMeta}>
              <div className={styles.infoMetaRow}><span>GEO</span><span>47.01°N 28.86°E</span></div>
              <div className={styles.infoMetaRow}><span>TZ</span><span>UTC+2 · EET</span></div>
              <div className={styles.infoMetaRow}><span>RESPONSE</span><span>&lt; 24H</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
