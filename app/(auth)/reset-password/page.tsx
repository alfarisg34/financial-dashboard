'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Sparkles, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw, KeyRound, ArrowRight } from 'lucide-react'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Listen for auth state change when Supabase parses hash fragments from recovery link
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User arrived via password recovery link
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!newPassword) {
      setError('Password baru wajib diisi.')
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError('Password minimal harus 6 karakter.')
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok!')
      setLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2500)
    } catch (err: any) {
      setError(err?.message || 'Gagal mengatur ulang password. Tautan mungkin telah kedaluwarsa.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#070a12]">
      {/* Background glow accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <KeyRound size={24} className="text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Atur Ulang Password</h1>
          <p className="text-slate-400 text-sm">Masukkan password baru untuk mengamankan akun Anda</p>
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3">
              <CheckCircle2 size={20} className="shrink-0" />
              <div>
                <p className="font-semibold">Password berhasil diubah!</p>
                <p className="text-xs text-emerald-400/80 mt-0.5">Mengarahkan Anda ke halaman Dashboard...</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2 animate-shake">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Password Baru
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Minimal 6 karakter"
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 text-sm transition-all outline-none bg-slate-900/60 text-white placeholder-slate-500"
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
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'} 
                  placeholder="Ketik ulang password baru"
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 text-sm transition-all outline-none bg-slate-900/60 text-white placeholder-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-amber-600/30 hover:shadow-amber-500/50 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Menyimpan Password...</span>
                </>
              ) : (
                <>
                  <span>Simpan Password Baru</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <a
                href="/login"
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                Kembali ke Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
