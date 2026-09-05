'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { 
  User, Mail, Lock, KeyRound, ShieldCheck, CheckCircle2, 
  AlertCircle, Eye, EyeOff, Sparkles, RefreshCw, Save,
  Calendar, Clock, ShieldAlert, UserCheck
} from 'lucide-react'

export default function ProfilePage() {
  const supabase = createClient()

  // User details state
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [userId, setUserId] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [role, setRole] = useState('user')

  // Form states
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Fetch initial profile
  useEffect(() => {
    async function fetchUserProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setEmail(user.email || '')
      setUserId(user.id)
      if (user.created_at) {
        const d = new Date(user.created_at)
        setCreatedAt(d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }))
      }

      let userRole = user.user_metadata?.role || (user.email === 'admin@fintrack.com' ? 'admin' : 'user')
      let exp = user.user_metadata?.expires_at || null

      // Check profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, role, expires_at')
        .eq('id', user.id)
        .maybeSingle()

      if (profile) {
        if (profile.role) userRole = profile.role
        if (profile.expires_at) exp = profile.expires_at
      }

      setRole(userRole)
      setExpiresAt(exp)

      let name = user.user_metadata?.display_name || user.user_metadata?.full_name || profile?.display_name
      if (!name && user.email) {
        name = user.email.split('@')[0]
      }

      setDisplayName(name || '')
    }

    fetchUserProfile()
  }, [])

  // Handle Update Profile Name
  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault()
    setProfileLoading(true)
    setProfileError('')
    setProfileSuccess('')

    try {
      // 1. Update Supabase Auth metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: { display_name: displayName, full_name: displayName }
      })

      if (authError) throw authError

      // 2. Also try updating profiles table if it exists
      try {
        await supabase
          .from('profiles')
          .upsert({ id: userId, email, display_name: displayName })
      } catch (err) {
        // Table might not exist or error, continue
      }

      setProfileSuccess('Nama profil berhasil diperbarui!')
      setTimeout(() => setProfileSuccess(''), 4000)
    } catch (err: any) {
      setProfileError(err?.message || 'Gagal memperbarui profil.')
    } finally {
      setProfileLoading(false)
    }
  }

  // Handle Update Password
  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordError('')
    setPasswordSuccess('')

    if (!currentPassword) {
      setPasswordError('Password lama wajib diisi untuk validasi.')
      setPasswordLoading(false)
      return
    }

    if (!newPassword) {
      setPasswordError('Password baru wajib diisi.')
      setPasswordLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('Password baru minimal harus memiliki 6 karakter.')
      setPasswordLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password baru tidak cocok!')
      setPasswordLoading(false)
      return
    }

    try {
      // 1. Validate current password first by re-authenticating
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword
      })

      if (verifyError) {
        setPasswordError('Password lama yang Anda masukkan salah.')
        setPasswordLoading(false)
        return
      }

      // 2. Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) throw updateError

      setPasswordSuccess('Password berhasil diubah!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSuccess(''), 4000)
    } catch (err: any) {
      setPasswordError(err?.message || 'Gagal mengubah password.')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-xl shadow-blue-500/25 border border-white/20 shrink-0 uppercase">
              {displayName ? displayName.charAt(0) : <User size={32} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {displayName || 'Pengguna FinTrack'}
                </h1>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${
                  role === 'admin' 
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                }`}>
                  <Sparkles size={11} /> {role === 'admin' ? 'Super Admin' : 'Akun Aktif'}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                <Mail size={14} className="text-slate-400 dark:text-slate-500" />
                {email || 'Memuat...'}
              </p>
              {createdAt && (
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                  Bergabung sejak {createdAt}
                </p>
              )}
            </div>
          </div>

          {/* Expiration Info Box on Header Banner */}
          {role !== 'admin' && expiresAt && (() => {
            const expDate = new Date(expiresAt)
            const formattedExp = expDate.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
            const now = new Date().getTime()
            const expTime = expDate.getTime()
            const diffDays = Math.max(0, Math.ceil((expTime - now) / (1000 * 60 * 60 * 24)))
            const isExp = now > expTime

            return (
              <div className="bg-amber-500/10 dark:bg-slate-900/80 p-4 rounded-2xl border border-amber-500/25 dark:border-slate-800 sm:max-w-xs w-full shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={14} className="text-amber-500 dark:text-amber-400" />
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide">Masa Aktif Akun</span>
                </div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
                  {formattedExp}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Pukul 23:59 WIB {isExp ? '(Kadaluwarsa)' : `(Sisa ${diffDays} hari)`}
                </p>
              </div>
            )
          })()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Edit Profile Information */}
        <div className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <User size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Informasi Profil</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ubah nama tampilan akun Anda</p>
              </div>
            </div>

            {profileSuccess && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}

            {profileError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 font-medium">
                <AlertCircle size={16} className="shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4" id="profile-form">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-500 dark:text-slate-400 cursor-not-allowed select-none font-medium"
                  />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Email akun terikat pada otentikasi login</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Nama Tampilan (Display Name)
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Contoh: Alfaris"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/70 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="submit"
              form="profile-form"
              disabled={profileLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {profileLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Simpan Perubahan Profil</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card: Change Password */}
        <div className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <KeyRound size={18} />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Ubah Password</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pastikan akun Anda tetap aman</p>
              </div>
            </div>

            {passwordSuccess && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
                <ShieldCheck size={16} className="shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {passwordError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 font-medium">
                <AlertCircle size={16} className="shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4" id="password-form">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Password Lama
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/70 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showCurrentPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Password Baru
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/70 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ketik ulang password baru"
                    className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/70 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="submit"
              form="password-form"
              disabled={passwordLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {passwordLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Mengubah Password...</span>
                </>
              ) : (
                <>
                  <KeyRound size={14} />
                  <span>Update Password</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
