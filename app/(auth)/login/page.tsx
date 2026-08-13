'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  async function handleRegister() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setError('Cek email Anda untuk konfirmasi pendaftaran!')
    setLoading(false)
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
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm transition-all outline-none"
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
              className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm transition-all outline-none"
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f172a] px-3 text-slate-500">atau</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleRegister} 
            disabled={loading}
            className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 py-3.5 rounded-xl font-medium text-sm border border-slate-700/50 disabled:opacity-50 transition-colors cursor-pointer"
          >
            Daftar Akun Baru
          </button>
        </form>
      </div>
    </div>
  )
}