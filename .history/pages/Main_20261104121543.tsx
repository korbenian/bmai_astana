'use client'
import { Card } from "@/components/card"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { Unbounded } from 'next/font/google'

const unbounded = Unbounded({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['700'] 
})

export const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 overflow-x-hidden">
      
      {/* АДАПТИВНАЯ ШАПКА */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        
        {/* Синяя инфо-полоса */}
        <div className="w-full bg-blue-600 text-white text-xs md:text-sm py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            
            {/* Текст скрывается на совсем маленьких экранах, чтобы не загромождать */}
            <p className="font-medium tracking-wide text-[11px] sm:text-xs md:text-sm truncate">
              BMAI Астана — Официальный представитель
            </p>

            {/* Контакты только на больших экранах */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="tel:+77712133718" className="font-semibold hover:text-blue-100 transition-colors">
                +7 (771) 213-37-18
              </a>
              <span className="text-blue-300">•</span>
              <p className="flex items-center gap-1.5 opacity-90">
                <span>🕙</span>
                <span>График: 10:30-20:00</span>
              </p>
            </div>

            {/* Соцсети всегда справа */}
            <div className="flex items-center gap-3 shrink-0">
              <a 
                href="https://www.instagram.com/bmai_astana/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-200 transition-colors p-1"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href="https://wa.me/77712133718" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors p-1"
                title="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>

          </div>
        </div>

        {/* Белая полоса с логотипом */}
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <img 
            className="h-7 md:h-10 w-auto object-contain" 
            src='/photos/logo.png' 
            alt="BMAI Logo"
          />
          <a 
            href="tel:+77712133718" 
            className="lg:hidden text-xs font-semibold text-blue-600 border border-blue-600/30 px-3 py-1.5 rounded-lg"
          >
            +7 (771) 213-37-18
          </a>
        </div>

      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-4 md:py-8">
        <Card />
      </main>

      {/* ФУТЕР */}
      <footer className="w-full bg-blue-50/80 border-t border-blue-100 py-8 md:py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="max-w-2xl text-center md:text-left">
            <h2 className={`${unbounded.className} text-blue-900 text-lg md:text-2xl font-semibold leading-tight mb-2`}>
              Лучше один раз примерить, чем сто раз смотреть в каталоге.
            </h2>
            <p className="text-blue-700/80 text-xs md:text-base">
              Ждем тебя в нашем магазине в Астане — подберем идеальную пару под твой темп!
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2.5 shrink-0">
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/bmai_astana/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://wa.me/77712133718"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
            <span className="text-xs text-gray-400">© 2026 BMAI Astana</span>
          </div>

        </div>
      </footer>
      
    </div>
  )
}