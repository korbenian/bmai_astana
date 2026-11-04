'use client'
import { useState } from 'react'

export const CatalogSidebar = ({ selectedFilters, toggleFilters }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  // Если у тебя в компоненте функции называются иначе, поправь названия пропсов ниже под себя
  const { gender = [], purpose = [], season = [] } = selectedFilters || {}
  const toggleFilter = toggleFilters || (() => {})

  return (
    <>
      {/* Кнопка фильтров для мобильных устройств (видна только на экранах меньше lg) */}
      <div className="lg:hidden w-full mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-between shadow-md shadow-blue-600/20 transition active:scale-[0.98]"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span> Фильтры каталога
          </span>
          <span className="text-sm bg-blue-700 py-1 px-3 rounded-lg">
            {isOpen ? 'Скрыть ▲' : 'Показать ▼'}
          </span>
        </button>
      </div>

      {/* Сам сайдбар: на мобилках скрывается/показывается по клику, на десктопах видит всегда */}
      <aside 
        className={`
          w-full lg:w-64 bg-blue-50/50 p-6 rounded-2xl flex-col gap-8 text-gray-800 shrink-0 border border-blue-100
          ${isOpen ? 'flex mb-6' : 'hidden lg:flex'}
        `}
      >
    

        {/* НАЗНАЧЕНИЕ */}
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
                  checked={purpose.includes(item)}
                  onChange={() => toggleFilter('purpose', item)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* СЕЗОН */}
        <div className="flex flex-col gap-3">
          <h3 className="text-blue-600 font-bold tracking-wider text-sm uppercase">
            Сезон
          </h3>
          <div className="flex flex-col gap-2.5 text-sm">
            {['Демисезон', 'Лето'].map((item) => (
              <label key={item} className="flex items-center gap-2.5 cursor-pointer hover:text-blue-600 transition">
                <input
                  type="checkbox"
                  checked={season.includes(item)}
                  onChange={() => toggleFilter('season', item)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

      </aside>
    </>
  )
}