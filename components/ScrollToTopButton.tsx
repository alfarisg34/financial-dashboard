'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check scroll on window, document, and scrollable containers (like main in dashboard layout)
    const checkScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
      let mainScroll = 0
      const mainEl = document.querySelector('main')
      if (mainEl) {
        mainScroll = mainEl.scrollTop
      }

      if (scrollY > 250 || mainScroll > 250) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Attach listeners to window and main element
    window.addEventListener('scroll', checkScroll, { passive: true })
    const mainEl = document.querySelector('main')
    if (mainEl) {
      mainEl.addEventListener('scroll', checkScroll, { passive: true })
    }

    // Also interval check in case page changes or dynamic elements scroll
    const interval = setInterval(checkScroll, 400)

    return () => {
      window.removeEventListener('scroll', checkScroll)
      if (mainEl) {
        mainEl.removeEventListener('scroll', checkScroll)
      }
      clearInterval(interval)
    }
  }, [])

  const scrollToTop = () => {
    // Scroll window
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    // Scroll any scrollable <main> container
    const mainEl = document.querySelector('main')
    if (mainEl) {
      mainEl.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`fixed right-5 sm:right-7 bottom-6 sm:bottom-8 z-50 p-3 sm:p-3.5 rounded-2xl 
        bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30
        hover:shadow-blue-500/50 hover:scale-110 active:scale-95
        border border-white/20 backdrop-blur-md cursor-pointer
        transition-all duration-300 ease-out flex items-center justify-center group
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'}`}
    >
      <ArrowUp size={20} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  )
}
