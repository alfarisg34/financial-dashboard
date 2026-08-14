'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AlertTriangle, X, Clock } from 'lucide-react'

export function ExpirationReminderBanner() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function checkExpiration() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Admins don't expire
      if (user.email === 'admin@fintrack.com' || user.user_metadata?.role === 'admin') return

      let expiresAt = user.user_metadata?.expires_at

      if (!expiresAt) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('expires_at, role')
          .eq('id', user.id)
          .maybeSingle()

        if (profile?.role === 'admin') return
        expiresAt = profile?.expires_at
      }

      if (!expiresAt) return

      const now = new Date().getTime()
      const d = new Date(expiresAt)
      const expTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime()
      const diffMs = expTime - now
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

      // If between 1 second and 3 days before expiration
      if (diffMs > 0 && diffDays <= 3) {
        const formattedDate = d.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        setMessage(`Akun anda akan kadaluwarsa pada tanggal ${formattedDate} pukul 23.59.`)
        setShow(true)

        // Automatically hide reminder after 5 seconds
        const timer = setTimeout(() => {
          setShow(false)
        }, 5000)

        return () => clearTimeout(timer)
      }
    }

    checkExpiration()
  }, [])

  if (!show || !message) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-lg animate-bounce-short">
      <div className="glass-card p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-200 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
            <AlertTriangle size={18} />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-300">Peringatan Masa Aktif Akun</p>
            <p className="text-xs text-amber-100/90 mt-0.5">{message}</p>
          </div>
        </div>
        <button
          onClick={() => setShow(false)}
          className="p-1.5 rounded-lg hover:bg-amber-500/20 text-amber-300 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
