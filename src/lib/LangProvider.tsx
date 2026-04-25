'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dictionaries, LANGS, type Lang, type Dict } from './i18n';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ro');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem('lang') as Lang | null) : null;
    if (saved && LANGS.includes(saved)) {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', l);
      document.documentElement.lang = l;
    }
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
