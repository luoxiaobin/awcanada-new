import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'zh' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'zh',
  setLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'en' || stored === 'zh' ? stored : 'zh';
  });

  const setLang = (next: Lang) => {
    localStorage.setItem('lang', next);
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
