'use client';

import { useEffect } from 'react';

export type Locale = 'ru' | 'kk';

interface LanguageSwitcherProps {
  currentLang: Locale;
  onLanguageChange: (lang: Locale) => void;
}

export default function LanguageSwitcher({
  currentLang,
  onLanguageChange,
}: LanguageSwitcherProps) {
  // При первом рендере восстанавливаем язык из localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as Locale;
    if (savedLang && (savedLang === 'ru' || savedLang === 'kk')) {
      onLanguageChange(savedLang);
    }
  }, []);

  const handleSelect = (lang: Locale) => {
    onLanguageChange(lang);
    localStorage.setItem('app_lang', lang);
  };

  return (
    <div className="inline-flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
      <button
        type="button"
        onClick={() => handleSelect('ru')}
        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
          currentLang === 'ru'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-500 hover:text-black'
        }`}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => handleSelect('kk')}
        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
          currentLang === 'kk'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-500 hover:text-black'
        }`}
      >
        KZ
      </button>
    </div>
  );
}