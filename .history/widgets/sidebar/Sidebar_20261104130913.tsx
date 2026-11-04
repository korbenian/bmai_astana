export const CatalogSidebar = ({ selectedSeason, toggleSeasonFilter }: any) => {
  return (
    <div className="w-full bg-blue-50/50 p-6 rounded-2xl flex flex-col gap-6 text-gray-800 border border-blue-100">
      <div className="flex flex-col gap-3">
        <h3 className="text-blue-600 font-bold tracking-wider text-sm uppercase">
          Сезон
        </h3>
        <div className="flex flex-col gap-2.5 text-sm">
          {['Демисезон', 'Лето'].map((item) => (
            <label key={item} className="flex items-center gap-2.5 cursor-pointer hover:text-blue-600 transition">
              <input
                type="checkbox"
                checked={selectedSeason.includes(item)}
                onChange={() => toggleSeasonFilter(item)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}