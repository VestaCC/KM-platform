'use client'

import { useEffect, useState } from 'react'

interface PreloaderProps {
  loading: boolean
}

export function Preloader({ loading }: PreloaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 1100) // matches translation duration
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F19] transition-opacity duration-700 ease-in-out ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center gap-6 z-10 animate-pulse">
        {/* Clean Logo Mark */}
        <div className="relative size-16 sm:size-20">
          <svg viewBox="0 0 100 100" className="size-full fill-none stroke-blue-500 stroke-[4]">
            <circle cx="50" cy="50" r="44" className="stroke-blue-500/20 stroke-[2]" />
            <path d="M38 28 V72" strokeLinecap="round" />
            <path d="M38 50 L60 28" strokeLinecap="round" />
            <path d="M46 42 L62 72" strokeLinecap="round" />
          </svg>
        </div>

        {/* Branding text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-xl font-bold tracking-widest text-white uppercase">
            Kelajak Markazi
          </h2>
          <p className="tracking-wide text-xs uppercase text-slate-400/80">
            Tizim yuklanmoqda...
          </p>
        </div>
      </div>
    </div>
  )
}
