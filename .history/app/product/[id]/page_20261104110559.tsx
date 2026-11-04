import { Suspense, use } from 'react'
import { supabase } from '@/shared/supabase'
import Link from 'next/link'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

// 1. Компонент, который делает await params И запрос к Supabase ВНУТРИ Suspense
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-2xl font-semibold text-blue-600 mt-2">{product.price} ₸</p>
        <p className="text-gray-600 mt-4">{product.description}</p>
      </div>
    </div>
  )
}

// 2. Главная страница (Синхронно передает пропсы дальше, не блокируя пререндер)
export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <Link href="/" className="text-blue-600 font-medium mb-6 inline-block hover:underline">
        ← Назад в каталог
      </Link>

      <Suspense fallback={<div className="p-12 text-center text-blue-600 font-medium">Загрузка информации о товаре...</div>}>
        <ProductDetails paramsPromise={params} />
      </Suspense>
    </main>
  )
}