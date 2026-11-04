'use client'
//C:\Users\kulch\bmai-astana\pages\Main.tsx
import { Card } from "@/components/card"

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
                </div>
<a href="https://www.instagram.com/bmai_astana/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
<a href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2F%2B77712133718&e=AUBatehKjYroS1T8mC6Gnz1dmKdP-RyvsFL3gWeeyjqTPUt5CkLNL11UjfHXQRrj9gCaxVMvb2mW9L9R0ZBItOEUdzsrFD0XZsrCsNRGuCCNJZ8UcQA5NrJ6ZP39OL-0umjSvqaTEmQbLDVnYBc_0A">whatsp</a>
            </header>
            <main className="bg-white  mx-auto px-4 py-6">
                <Card />
            </main>
        </>
    )
}