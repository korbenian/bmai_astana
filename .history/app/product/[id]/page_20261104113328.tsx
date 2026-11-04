import { Suspense } from 'react'
import { supabase } from '@/shared/supabase'
import { ProductGallery } from '@/features/product-gallery/ui/Product-gallery'
import Link from 'next/link'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function ProductDetails({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
  const { id } = await paramsPromise

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    return <div className="p-10 text-center text-gray-500">Товар не найден</div>
  }

  const imagesList = product.images?.length > 0 ? product.images : [product.image || '/placeholder.png']
  const specs = product.specs || {} // достаем JSONB-объект specs

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Левая колонка: Галерея картинок */}
      <div className="w-full">
        <ProductGallery name='' images={imagesList} />
      </div>

      {/* Правая колонка: Информация и характеристики */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-blue-600">
            {product.price} ₸
          </p>
        </div>

        {/* Описание */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Описание
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description || 'Топовая беговая модель для максимальных результатов.'}
          </p>
        </div>

        {/* Характеристики из JSONB поля specs */}
        <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
            Характеристики
          </h3>
          
          {specs.brand && (
            <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Бренд:</span>
              <span className="font-medium text-gray-800">{specs.brand}</span>
            </div>
          )}
          {specs.model && (
            <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Модель:</span>
              <span className="font-medium text-gray-800">{specs.model}</span>
            </div>
          )}
          {specs.weight && (
            <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Вес:</span>
              <span className="font-medium text-gray-800">{specs.weight}</span>
            </div>
          )}
          {specs.surface && (
            <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
              <span className="text-gray-500">Покрытие:</span>
              <span className="font-medium text-gray-800">{specs.surface}</span>
            </div>
          )}
        </div>

        {/* Блок заказа и уточнения наличия */}
        <div className="flex flex-col gap-2 mt-2">
          <a
            href={`https://wa.me/77712133718?text=Здравствуйте! Меня интересуют кроссовки ${product.name} (${product.price} ₸). Уточните, пожалуйста, наличие размеров и расцветок.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
          >
            Заказать в WhatsApp
          </a>
          
          {/* Маленькая серенькая надпись */}
          <p className="text-xs text-gray-400 text-center leading-relaxed px-2">
            * Наличие конкретных размеров и расцветок может отличаться. Пожалуйста, обратитесь по номеру для уточнения актуальной информации.
          </p>
        </div>

      </div>
    </div>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 font-medium mb-8 inline-block hover:underline">
        ← Назад в каталог
      </Link>

      <Suspense fallback={<div className="p-12 text-center text-blue-600 font-medium">Загрузка информации о товаре...</div>}>
        <ProductDetails paramsPromise={params} />
      </Suspense>
    </main>
  )
}