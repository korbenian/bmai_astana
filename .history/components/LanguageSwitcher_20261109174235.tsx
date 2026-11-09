'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type Locale = 'ru' | 'kk';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Берем язык из URL, по умолчанию 'ru'
  const currentLang = (searchParams.get('lang') as Locale) || 'ru';

  const handleLanguageChange = (newLang: Locale) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);

    // Обновляем URL без перезагрузки всей страницы
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="inline-flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
      <button
        type="button"
        onClick={() => handleLanguageChange('ru')}
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
        onClick={() => handleLanguageChange('kk')}
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