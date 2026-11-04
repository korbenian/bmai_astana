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
        <footer className="w-full bg-blue-600 text-white mt-auto">
            {/* Верхняя часть футера (аналог нижней полосы шапки) */}
            <div className="w-full bg-blue-700 text-xs md:text-sm py-2 px-4 shadow-inner">
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

            {/* Нижняя часть футера с копирайтом или логотипом */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-blue-200">
                <span>© 2026 BMAI Astana. Все права защищены.</span>
                <span>Спортивная экипировка для бега</span>
            </div>
        </footer>
    )
}