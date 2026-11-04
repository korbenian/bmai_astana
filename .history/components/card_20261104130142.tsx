'use client'
import Link from "next/link";
import { supabase } from "@/shared/supabase";
import { useState,useEffect } from "react";
import { CatalogSidebar } from "@/widgets/sidebar/Sidebar";

export const Card  = () => {
  const [shoes, setShoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
.eq('season', 'Лето')
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
  }, [])
  if (loading) return <div>Загрузка каталога...</div>
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Сайдбар с фильтрами */}
        <div className="w-full lg:w-64 shrink-0">
          <CatalogSidebar />
        </div>

        {/* Сетка товаров */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {shoes.map((shoe) => (
              <article 
                key={shoe.id} 
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden p-5 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Картинка с легким зумом при наведении */}
                <div className="w-full h-52 bg-gray-50 rounded-xl overflow-hidden mb-4 relative">
                  <img 
                    src={shoe.image || shoe.images?.[0]} 
                    alt={shoe.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Текстовая информация */}
                <div className="flex flex-col gap-1.5 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {shoe.name}
                  </h3>
                  <p className="text-xl font-extrabold text-blue-600">
                    {shoe.price.toLocaleString()} ₸
                  </p>
                </div>

                {/* Кнопка */}
                <Link 
                  href={`/product/${shoe.id}`} 
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-center shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
                >
                  Подробнее
                </Link>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};