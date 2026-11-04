'use client'
//C:\Users\kulch\bmai-astana\pages\Main.tsx
import { Card } from "@/components/card"
import { FaInstagram,FaWhatsapp } from "react-icons/fa";
import { Unbounded } from 'next/font/google' // Акцентный спортивный шрифт

const unbounded = Unbounded({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['700'] 
})
export const Main=()=>{

    return (
        <>
            <header>
                
                <div className=" bg-blue-600 shadow-md max-w-8xl mx-auto px-4 h-16 flex items-center">
                    <img 
                        className="h-36 w-auto object-contain" 
                        src='/photos/logo.png' 
                        alt="BMAI Logo"
                    />
                </div>
                <div className="w-full bg-blue-500 text-white text-xs md:text-sm py-2 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Левый блок: статус */}
        <p className="font-medium tracking-wide shrink-0">
          Официальный представитель BMAI в Астане
        </p>

        {/* Центральный блок: контакты и время */}
        <div className="hidden lg:flex items-center gap-6">
          <a 
            href="tel:+77712133718" 
            className="font-semibold hover:text-blue-100 transition-colors"
          >
            +7 (771) 213-37-18
          </a>
          <span className="text-blue-300">•</span>
          <p className="flex items-center gap-1.5 opacity-90">
            <span>🕙</span>
            <span>График работы: 10:30-20:00</span>
          </p>
        </div>

        {/* Правый блок: соцсети */}
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="https://www.instagram.com/bmai_astana/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition-colors p-1"
            title="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a 
            href="https://wa.me/77712133718" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-300 transition-colors p-1"
            title="WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5" />
          </a>
        </div>

      </div>
    </div>
          </header>
            <main className="bg-white flex  mx-auto px-4 py-6">
                <Card />
               
            </main>
       <footer className="w-full bg-blue-50 border-t border-blue-100 py-10 px-4 mt-16">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

    <div className="max-w-2xl text-center md:text-left">
      <h2 className={`${unbounded.className} text-blue-900 text-xl md:text-2xl font-semibold leading-tight mb-2`}>
        Лучше один раз примерить, чем сто раз смотреть в каталоге.
      </h2>
      <p className="text-blue-700 text-sm md:text-base">
        Ждем тебя в нашем магазине в Астане — подберем идеальную пару под твой темп!
      </p>
    </div>

    <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
        Мы на связи
      </span>
      <div className="flex gap-3">
        <a 
          href="https://www.instagram.com/bmai_astana/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          <FaInstagram size={20} />
        </a>
        <a 
          href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F%2B77712133718&e=AUBatehKjYroS1T8mC6Gnz1dmKdP-RyvsFL3gWeeyjqTPUt5CkLNL11UjfHXQRrj9gCaxVMvb2mW9L9R0ZBItOEUdzsrFD0XZsrCsNRGuCCNJZ8UcQA5NrJ6ZP39OL-0umjSvqaTEmQbLDVnYBc_0A"
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
        >
          <FaWhatsapp size={20} />
        </a>
      </div>
      <span className="text-xs text-gray-400 mt-1">© 2026 BMAI Astana</span>
    </div>

  </div>
</footer>
            
        </>
    )
}