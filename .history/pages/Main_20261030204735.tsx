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

            </header>
            <main className="max-w-7xl mx-auto px-4 py-6">
                <Card />
            </main>
        </>
    )
}