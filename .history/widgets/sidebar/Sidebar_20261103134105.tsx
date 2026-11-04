'use client'

import { useState } from 'react'

interface FilterState {
  gender: string[]
  purpose: string[]
  season: string[]
}

export const CatalogSidebar = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    gender: [],
    purpose: [],
    season: [],
  })

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category]
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return { ...prev, [category]: updated }
    })
  }

  return (
    <aside className="w-64 bg-blue-50/50 p-6 rounded-2xl flex flex-col gap-8 text-gray-800 shrink-0 border border-blue-100">
      <div className="flex flex-col gap-3">
        <h3 className="text-blue-600 font-bold tracking-wider text-sm uppercase">
          Пол
        </h3>
        <div className="flex flex-col gap-2.5 text-sm">
          {['Для женщин', 'Для мужчин', 'Унисекс'].map((item) => (
            <label key={item} className="flex items-center gap-2.5 cursor-pointer hover:text-blue-600 transition">
              <input
                type="checkbox"
                checked={selectedFilters.gender.includes(item)}
                onChange={() => toggleFilter('gender', item)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-blue-600 font-bold tracking-wider text-sm uppercase">
          Назначение
        </h3>
        <div className="flex flex-col gap-2.5 text-sm">
          {[
            'Бег',
            'Повседневный',
            'Походный',
            'Соревнования',
            'Трейлраннинг',
            'Тренировки',
            'Активный отдых',
          ].map((item) => (
            <label key={item} className="flex items-center gap-2.5 cursor-pointer hover:text-blue-600 transition">
              <input
                type="checkbox"
                checked={selectedFilters.purpose.includes(item)}
                onChange={() => toggleFilter('purpose', item)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

    
      <div className="flex flex-col gap-3">
        <h3 className="text-blue-600 font-bold tracking-wider text-sm uppercase">
          Сезон
        </h3>
        <div className="flex flex-col gap-2.5 text-sm">
          {['Демисезон', 'Лето'].map((item) => (
            <label key={item} className="flex items-center gap-2.5 cursor-pointer hover:text-blue-600 transition">
              <input
                type="checkbox"
                checked={selectedFilters.season.includes(item)}
                onChange={() => toggleFilter('season', item)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  )
}