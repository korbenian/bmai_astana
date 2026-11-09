'use client'

import { useSearchParams } from 'next/navigation'

interface CatalogSidebarProps {
  selectedSeason: string[]
  toggleSeasonFilter: (season: string) => void
}

export const CatalogSidebar = ({
  selectedSeason,
  toggleSeasonFilter,
}: CatalogSidebarProps) => {
  const searchParams = useSearchParams()
  const lang = (searchParams.get('lang') as 'ru' | 'kk') || 'ru'
  const isKazakh = lang === 'kk'

  // Список сезонов: value отвечает за фильтрацию в БД, label — за отображение
  const seasons = [
    { value: 'Демисезон', label: isKazakh ? 'Маусымаралық' : 'Демисезон' },
    { value: 'Лето', label: isKazakh ? 'Жаз' : 'Лето' },
  ]

  return (
    <div className="w-full bg-blue-50/50 p-6 rounded-2xl flex flex-col gap-6 text-gray-800 border border-blue-100">
      <div className="flex flex-col gap-3">
        <h3 className="text-blue-600 font-bold tracking-wider text-sm uppercase">
          {isKazakh ? 'Маусым' : 'Сезон'}
        </h3>
        <div className="flex flex-col gap-2.5 text-sm">
          {seasons.map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-2.5 cursor-pointer hover:text-blue-600 transition"
            >
              <input
                type="checkbox"
                checked={selectedSeason.includes(item.value)}
                onChange={() => toggleSeasonFilter(item.value)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}