import { supabase } from '@/shared/supabase'
import { ProductGallery } from '@/features/product-gallery/ui/Product-gallery'
import Link from 'next/link'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Запрос в Supabase по ID
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) return <div className="p-10 text-center">Товар не найден</div>


  const imagesList = product.images?.length > 0 ? product.images : [product.image]

  return (
    <main className="max-w-5xl mx-auto p-6">
      <Link href="/" className="text-blue-600 font-medium mb-6 inline-block">← Назад в каталог</Link>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery images={imagesList} name={product.name} />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-extrabold text-blue-600">{product.price} ₸</p>
          <p className="text-gray-600">{product.description}</p>
          
          {product.specs && (
            <div className="bg-gray-100 p-4 rounded-xl space-y-1 text-sm">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-500 capitalize">{key}:</span>
                  <span className="font-semibold">{String(val)}</span>
                </div>
              ))}
            </div>
          )}

          <button className="bg-blue-600 text-white font-bold py-3 rounded-xl mt-4">
            В корзину
          </button>
        </div>
      </div>
    </main>
  )
}