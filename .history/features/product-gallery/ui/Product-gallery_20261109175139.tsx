'use client'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const gallery = images && images.length > 0 ? images : ['/placeholder.png']
  const [activeImage, setActiveImage] = useState(gallery[0])

  return (
    <div className="flex flex-col gap-4">
  
      <div className="h-80 border rounded-2xl p-4 flex items-center justify-center bg-white">
        <img src={activeImage} alt={name} className="h-full object-contain" />
      </div>
<LanguageSwitcher/>
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`w-16 h-16 border-2 rounded-lg p-1 bg-white ${
                activeImage === img ? 'border-blue-600' : 'border-gray-200'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}