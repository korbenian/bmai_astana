'use client'

import { supabase } from "@/shared/supabase";
import { useState,useEffect } from "react";

export const Card  = () => {
  const [shoes, setShoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')

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
    <div className="w-full  min-h-screen flex gap-6  flex-wrap p-5">
      {shoes.map((shoe) => (
        <article 
          key={shoe.id} 
          className="w-60 h-1/6 bg-white rounded-xl shadow-md overflow-hidden p-4 flex flex-col justify-between"
        >
          <img 
            src={shoe.image} 
            alt={shoe.name} 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{shoe.name}</h3>
            <p className="text-xl font-bold text-blue-600 mt-2">{shoe.price} ₸</p>
          </div>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
           подробнее

          </button>
        </article>
      ))}
    </div>
  );
};