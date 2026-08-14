'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff, 
  CheckCircle2, AlertCircle, RefreshCw, KeyRound, Clock 
} from 'lucide-react'

const COOLDOWN_SECONDS = 300 // 5 minutes = 300 seconds
const COOLDOWN_KEY = 'fintrack_reset_cooldown'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Forgot password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSuccess, setForgotSuccess] = useState('')
  const [forgotError, setForgotError] = useState('')
  const [cooldownRemaining, setCooldownRemaining] = useState(0)

  const supabase = createClient()

  // Manage 5-minute cooldown timer
  useEffect(() => {
    const checkCooldown = () => {
      try {
        const storedTimestamp = localStorage.getItem(COOLDOWN_KEY)
        if (storedTimestamp) {
          const expiresAt = parseInt(storedTimestamp, 10)
          const now = Date.now()
          const diffSeconds = Math.max(0, Math.ceil((expiresAt - now) / 1000))
          setCooldownRemaining(diffSeconds)
          if (diffSeconds <= 0) {
            localStorage.removeItem(COOLDOWN_KEY)
          }
        }
      } catch (e) {
        // Safe fallback if localStorage not accessible
      }
    }

    checkCooldown()
    const timer = setInterval(checkCooldown, 1000)
    return () => clearInterval(timer)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
      email: email.trim(), 
      password 
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    const user = authData?.user
    if (!user) {
      setError('Gagal memverifikasi akun.')
      setLoading(false)
      return
    }

    // Check if user is admin
    const isAdmin = user.email === 'admin@fintrack.com' || user.user_metadata?.role === 'admin'

    if (isAdmin) {
      window.location.href = '/admin'
      return
    }

    // Check expiration and soft delete status for regular users
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('expires_at, role, is_deleted')
      .eq('id', user.id)
      .maybeSingle()

    if (profile?.role === 'admin') {
      window.location.href = '/admin'
      return
    }

    // If profile does not exist (hard deleted) or is_deleted is true -> block login
    if (!profile || profile.is_deleted) {
      await supabase.auth.signOut()
      setError('Akun ini tidak terdaftar atau telah dihapus oleh Administrator.')
      setLoading(false)
      return
    }

    let expiresAt = profile?.expires_at || user.user_metadata?.expires_at

    if (expiresAt) {
      const now = new Date().getTime()
      const d = new Date(expiresAt)
      const expTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime()

      if (now > expTime) {
        // Account has expired -> log out immediately and show warning
        await supabase.auth.signOut()
        
        const formattedDate = d.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
        
        setError(`Akun sudah kadaluwarsa dari tanggal ${formattedDate}.`)
        setLoading(false)
        return
      }
    }

    window.location.href = '/dashboard'
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()

    if (cooldownRemaining > 0) {
      const minutes = Math.floor(cooldownRemaining / 60)
      const seconds = cooldownRemaining % 60
      setForgotError(`Mohon tunggu ${minutes}m ${seconds}s sebelum mengirim ulang email.`)
      return
    }

    setForgotLoading(true)
    setForgotError('')
    setForgotSuccess('')

    if (!forgotEmail) {
      setForgotError('Silakan masukkan alamat email Anda.')
      setForgotLoading(false)
      return
    }

    try {
      const redirectUrl = `${window.location.origin}/reset-password`
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: redirectUrl
      })

      if (error) throw error

      // Set 5-minute cooldown (300 seconds from now)
      const expiresAt = Date.now() + COOLDOWN_SECONDS * 1000
      try {
        localStorage.setItem(COOLDOWN_KEY, expiresAt.toString())
      } catch (e) {}
      setCooldownRemaining(COOLDOWN_SECONDS)

      setForgotSuccess(`Tautan reset password telah dikirim ke ${forgotEmail}. Silakan periksa kotak masuk atau spam email Anda.`)
    } catch (err: any) {
      setForgotError(err?.message || 'Gagal mengirim email reset password.')
    } finally {
      setForgotLoading(false)
    }
  }

  function openForgotModal() {
    setForgotEmail(email || '')
    setForgotError('')
    setForgotSuccess('')
    setIsForgotModalOpen(true)
  }

  function formatCooldown(seconds: number) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#070a12]">
      {/* Background glow accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Sparkles size={24} className="text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Selamat Datang</h1>
          <p className="text-slate-400 text-sm">Kelola keuangan Anda dengan elegan dan cerdas di FinTrack</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email" 
              placeholder="Alamat Email"
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm transition-all outline-none bg-slate-900/60 text-white placeholder-slate-500"
              required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password"
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm transition-all outline-none bg-slate-900/60 text-white placeholder-slate-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={openForgotModal}
              className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors cursor-pointer font-medium"
            >
              Lupa password?
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 disabled:opacity-50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            {loading ? 'Memproses...' : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md relative animate-scaleUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <KeyRound size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Reset Password</h2>
                <p className="text-xs text-slate-400">Kirim tautan pemulihan ke email Anda</p>
              </div>
            </div>

            {forgotSuccess ? (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                  <span>{forgotSuccess}</span>
                </div>

                {cooldownRemaining > 0 && (
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                    <Clock size={15} className="text-amber-400 shrink-0" />
                    <span>
                      Dapat mengirim ulang dalam <strong className="text-amber-400">{formatCooldown(cooldownRemaining)}</strong>
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
                {forgotError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{forgotError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Alamat Email Akun
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Masukkan email Anda"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {cooldownRemaining > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2">
                    <Clock size={14} className="shrink-0" />
                    <span>Tunggu <strong>{formatCooldown(cooldownRemaining)}</strong> sebelum mengirim lagi.</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading || cooldownRemaining > 0}
                    className={`flex-1 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      cooldownRemaining > 0
                        ? 'bg-slate-800 text-slate-400 shadow-none border border-slate-700'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-500/20'
                    }`}
                  >
                    {forgotLoading ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Mengirim...</span>
                      </>
                    ) : cooldownRemaining > 0 ? (
                      <>
                        <Clock size={13} />
                        <span>Tunggu ({formatCooldown(cooldownRemaining)})</span>
                      </>
                    ) : (
                      <span>Kirim Email</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}