'use client'
//C:\Users\kulch\bmai-astana\pages\Main.tsx
import { Card } from "@/components/card"

export const Main=()=>{

    return (
        <>
            <header className="bg-green-600 shadow-md">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
                    <img 
                        className="h-20 w-auto object-contain" 
                        src='/photos/logo.png' 
                        alt="BMAI Logo"
                    />
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-6">
                <Card />
            </main>
        </>
    )
}