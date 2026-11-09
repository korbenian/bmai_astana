'use client'
import Link from "next/link";
import { supabase } from "@/shared/supabase";
import { useState, useEffect } from "react";
import { CatalogSidebar } from "@/widgets/sidebar/Sidebar";

export const Card = () => {
  const [shoes, setShoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedSeason, setSelectedSeason] = useState<string[]>([])

  const toggleSeasonFilter = (seasonName: string) => {
    setSelectedSeason(prev => 
      prev.includes(seasonName)
        ? prev.filter(s => s !== seasonName) 
        : [...prev, seasonName]              
    )
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let query = supabase.from('products').select('*')

        if (selectedSeason.length > 0) {

          const dbValues = selectedSeason.map(s => [s]).filter(Boolean)
          
          if (dbValues.length > 0) {
            query = query.in('season', dbValues)
          }
        }

        const { data, error } = await query
        if (error) throw error

        if (data) {
          setShoes(data)
        }
      } catch (error) {
        console.error('Ошибка при загрузке кроссовок:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedSeason]) 

  if (loading) return <div className="text-center py-20 text-blue-600 font-medium">Загрузка каталога...</div>

 return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        <div className="w-full lg:w-64 shrink-0">
          <CatalogSidebar 
            selectedSeason={selectedSeason} 
            toggleSeasonFilter={toggleSeasonFilter} 
          />
        </div>

        <div className="flex-1 w-full">
          {shoes.length === 0 ? (
            <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
              По выбранным фильтрам ничего не найдено
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
              {shoes.map((shoe) => (
                <article 
                  key={shoe.id} 
                  className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden p-3 sm:p-5 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="w-full h-36 sm:h-52 bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-4 relative">
                      <img 
                        src={shoe.image || shoe.images?.[0]} 
                        alt={shoe.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5 sm:gap-1.5 mb-3 sm:mb-6">
                      <h3 className="text-xs sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 sm:line-clamp-1 min-h-[32px] sm:min-h-0">
                        {shoe.name}
                      </h3>
                      <p className="text-sm sm:text-xl font-extrabold text-blue-600">
                        {shoe.price.toLocaleString()} ₸
                      </p>
                    </div>
                  </div>

                  <Link 
                    href={`/product/${shoe.id}`} 
                    className="w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-base font-medium rounded-lg sm:rounded-xl text-center shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
                  >
                    Подробнее
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};