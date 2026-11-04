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
                <div></div>
                <div className=" bg-blue-600 shadow-md max-w-8xl mx-auto px-4 h-16 flex items-center">
                    <img 
                        className="h-36 w-auto object-contain" 
                        src='/photos/logo.png' 
                        alt="BMAI Logo"
                    />
                </div>
                <div className="flex h-8 bg-blue-400 w-auto">
<p>
+77712133718</p>
<p>🕙 График работы: 10:30-20:00</p>
<a className="text-amber-900 flex gap-2" href="https://www.instagram.com/bmai_astana/" target="_blank" rel="noopener noreferrer">
 <FaInstagram className="w-7 h-7"/>
</a>
<a className="text-amber-900" href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F%2B77712133718&e=AUBatehKjYroS1T8mC6Gnz1dmKdP-RyvsFL3gWeeyjqTPUt5CkLNL11UjfHXQRrj9gCaxVMvb2mW9L9R0ZBItOEUdzsrFD0XZsrCsNRGuCCNJZ8UcQA5NrJ6ZP39OL-0umjSvqaTEmQbLDVnYBc_0A"><FaWhatsapp className="w-7 h-7"/></a>
          
                </div>
          </header>
            <main className="bg-white  mx-auto px-4 py-6">
                <Card />
               
            </main>
        <footer className={`${unbounded.className} text-4xl font-bold`}>
<div className="text-blue-700 font-bold w-42">Лучше один раз примерить, чем сто раз смотреть в каталоге. Ждем тебя в нашем магазине в Астане — подберем идеальную пару под твой темп!</div>
            </footer>
            
        </>
    )
}