'use client'

import { supabase } from "@/shared/supabase";

//C:\Users\kulch\bmai-astana\components\card.tsx
export const Card  = () => {
  const shoes = [
    { id: 1, name: 'Pure 2.0 Gray', price: 39000, image: '/photos/Pure2.0Gray.jpeg' },
    { id: 2, name: 'Pace 6.0 White', price: 39000, image: '/photos/Pace6.0White.jpeg' },
   { id: 3, name: 'Pure 2.0 Orange Gray', price: 39000, image: '/photos/Pure2.0OrangeGray.jpeg' },
 { id: 4, name: 'Pace6.0Gray', price: 39000, image: '/photos/Pace6.0Gray.jpeg' },
 { id: 5, name: 'Pace6.0Black', price: 39000, image: '/photos/Pace6.0Black.jpeg' },
{ id: 6, name: 'Pace6.0Green', price: 39000, image: '/photos/Pace6.0Green.jpeg' },
{ id: 7, name: 'FlyOrangeBlue', price: 39000, image: '/photos\FlyOrangeBlue.jpeg' },
{ id: 8, name: 'FlyGreen', price: 39000, image: '/photos\FlyGreen.jpeg' },
{ id: 9, name: 'TurboGreen', price: 39000, image: '/photos/TurboGreen.jpeg' },
{ id: 10, name: 'carbonMix', price: 39000, image: '/photos/carbonMix.jpeg' },
];
const product =async()=>{
  try{
    const {data,error}=await supabase
    .from('products')
    .select('*')
  }
}
  return (
    <div className="w-[100vw]  min-h-screen flex gap-6 justify-center flex-wrap p-5">
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
            В корзину
          </button>
        </article>
      ))}
    </div>
  );
};