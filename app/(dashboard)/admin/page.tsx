'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { 
  Users, UserPlus, ShieldAlert, CheckCircle2, AlertCircle, 
  RefreshCw, Calendar, Clock, LogOut, Sparkles, Mail, Key, 
  Trash2, UserCheck, Search, Pencil, X, Save, UserX, RotateCcw,
  AlertTriangle, ShieldBan, Copy, Check
} from 'lucide-react'

type Profile = {
  id: string
  email: string
  display_name: string
  role: string
  expires_at: string
  created_at: string
  is_deleted?: boolean
  deleted_at?: string
}

export default function AdminDashboardPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('user')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'deleted'>('active')

  // Create User Form state
  const [email, setEmail] = useState('')
  const [months, setMonths] = useState('1')
  const [createLoading, setCreateLoading] = useState(false)
  const [createSuccess, setCreateSuccess] = useState('')
  const [createError, setCreateError] = useState('')
  const [copiedPassword, setCopiedPassword] = useState(false)

  function handleCopyPassword() {
    navigator.clipboard.writeText('fintrack@2026')
    setCopiedPassword(true)
    setTimeout(() => setCopiedPassword(false), 2000)
  }

  // Edit Expiration Modal state
  const [editingUser, setEditingUser] = useState<Profile | null>(null)
  const [editMonths, setEditMonths] = useState('1')
  const [editLoading, setEditLoading] = useState(false)
  const [editSuccess, setEditSuccess] = useState('')
  const [editError, setEditError] = useState('')

  // Delete Confirmation Modal state
  const [deletingUser, setDeletingUser] = useState<{ user: Profile; action: 'soft' | 'hard' | 'restore' } | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [actionSuccess, setActionSuccess] = useState('')

  const router = useRouter()
  const supabase = createClient()

  async function loadProfiles() {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProfiles(data)
    }
    setLoading(false)
  }

  async function handleDeleteAction() {
    if (!deletingUser) return
    setDeleteLoading(true)
    setDeleteError('')

    try {
      const res = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: deletingUser.user.id,
          action: deletingUser.action
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memproses tindakan penghapusan.')
      }

      setActionSuccess(data.message)
      setDeletingUser(null)
      loadProfiles()
      setTimeout(() => setActionSuccess(''), 5000)
    } catch (err: any) {
      setDeleteError(err?.message || 'Terjadi kesalahan sistem.')
    } finally {
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      const isAdmin = user.email === 'admin@fintrack.com' || profile?.role === 'admin' || user.user_metadata?.role === 'admin'
      if (!isAdmin) {
        router.push('/dashboard')
        return
      }

      loadProfiles()
    }

    checkAdmin()
  }, [])

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault()
    setCreateLoading(true)
    setCreateError('')
    setCreateSuccess('')

    try {
      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), months })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menambahkan pengguna.')
      }

      setCreateSuccess(data.message || 'Pengguna baru berhasil dibuat!')
      setEmail('')
      setMonths('1')
      loadProfiles()
      setTimeout(() => setCreateSuccess(''), 6000)
    } catch (err: any) {
      setCreateError(err?.message || 'Terjadi kesalahan saat membuat pengguna.')
    } finally {
      setCreateLoading(false)
    }
  }

  function openEditModal(profile: Profile) {
    setEditingUser(profile)
    setEditMonths('1')
    setEditError('')
    setEditSuccess('')
  }

  async function handleUpdateExpiration(e: React.FormEvent) {
    e.preventDefault()
    if (!editingUser) return

    setEditLoading(true)
    setEditError('')
    setEditSuccess('')

    try {
      const res = await fetch('/api/admin/update-expiration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: editingUser.id,
          months: editMonths
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memperbarui masa tenggang.')
      }

      setEditSuccess(data.message || 'Masa tenggang berhasil diperbarui!')
      loadProfiles()
      setTimeout(() => {
        setEditingUser(null)
      }, 1500)
    } catch (err: any) {
      setEditError(err?.message || 'Terjadi kesalahan saat memperbarui masa tenggang.')
    } finally {
      setEditLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  function formatDisplayDate(dateStr: string) {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  function getExpirationStatus(p: Profile) {
    if (p.is_deleted) {
      return { 
        isExpired: true, 
        isSoftDeleted: true,
        text: 'Nonaktif (Soft Deleted)', 
        badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30 font-bold' 
      }
    }

    const dateStr = p.expires_at
    if (!dateStr) return { isExpired: false, text: 'Aktif', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
    
    const d = new Date(dateStr)
    // Pastikan batas waktu dihitung tepat hingga 23:59:59 di hari tersebut
    const expDateObj = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
    const expTime = expDateObj.getTime()
    const now = new Date().getTime()
    const diffMs = expTime - now
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (now > expTime) {
      return { isExpired: true, text: 'Kadaluwarsa', badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20' }
    } else if (diffDays <= 3) {
      return { isExpired: false, text: diffDays === 1 ? 'Sisa hari ini' : `Sisa ${diffDays} hari`, badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' }
    } else {
      return { isExpired: false, text: 'Aktif', badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
    }
  }

  const filteredProfiles = profiles
    .filter(p => {
      // 1. Search Query Filter
      const matchesSearch = 
        p.email?.toLowerCase().includes(search.toLowerCase()) || 
        p.display_name?.toLowerCase().includes(search.toLowerCase())
      if (!matchesSearch) return false

      // 2. Role Filter ('all' | 'user' | 'admin')
      const isAdmin = p.role === 'admin' || p.email === 'admin@fintrack.com'
      if (roleFilter === 'user' && isAdmin) return false
      if (roleFilter === 'admin' && !isAdmin) return false

      // 3. Status Filter ('all' | 'active' | 'expired' | 'deleted')
      const { isExpired, isSoftDeleted } = getExpirationStatus(p)
      if (statusFilter === 'active') {
        // Aktif: tidak soft deleted dan tidak kadaluwarsa (admin permanen juga aktif)
        if (isSoftDeleted || (isExpired && !isAdmin)) return false
      } else if (statusFilter === 'expired') {
        // Kadaluwarsa: bukan soft deleted tapi sudah lewat masa tenggang
        if (isSoftDeleted || !isExpired || isAdmin) return false
      } else if (statusFilter === 'deleted') {
        // Nonaktif (Soft Deleted)
        if (!isSoftDeleted) return false
      }

      return true
    })
    .sort((a, b) => {
      // 1. Admin/Permanent accounts placed at the bottom
      const aIsAdmin = a.role === 'admin' || a.email === 'admin@fintrack.com' || !a.expires_at
      const bIsAdmin = b.role === 'admin' || b.email === 'admin@fintrack.com' || !b.expires_at

      if (aIsAdmin && !bIsAdmin) return 1
      if (!aIsAdmin && bIsAdmin) return -1
      if (aIsAdmin && bIsAdmin) return 0

      // 2. Regular accounts sorted by expiration date ascending (nearest date first)
      const timeA = new Date(a.expires_at).getTime()
      const timeB = new Date(b.expires_at).getTime()
      return timeA - timeB
    })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Navbar */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <ShieldAlert size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">FinTrack Admin Portal</h1>
                <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">Kelola pendaftaran pengguna, masa tenggang, dan perpanjangan akun</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <LogOut size={15} />
            <span>Logout Admin</span>
          </button>
        </div>

        {/* Grid: Add User & User List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Add User */}
          <div className="lg:col-span-1 glass-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Tambah Pengguna Baru</h2>
                  <p className="text-xs text-slate-400">Otomatis seed kategori & sumber dana</p>
                </div>
              </div>

              {createSuccess && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <span>{createSuccess}</span>
                </div>
              )}

              {createError && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{createError}</span>
                </div>
              )}

              <form onSubmit={handleCreateUser} id="add-user-form" className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Masa Tenggang (Bulan)
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Contoh: 1, 3, 6, 12"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Akun akan kadaluwarsa tepat pukul 23:59 pada akhir periode.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                    <Key size={13} className="text-amber-500 dark:text-amber-400" />
                    <span>Password Default Pengguna:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-black/40 px-2.5 py-1 rounded-lg font-mono text-[11px] inline-block select-all border border-amber-300 dark:border-amber-500/20 flex-1">
                      fintrack@2026
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer border shrink-0 ${
                        copiedPassword 
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20' 
                          : 'bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-sm'
                      }`}
                      title="Salin Password Default"
                    >
                      {copiedPassword ? (
                        <>
                          <Check size={13} className="text-emerald-600 dark:text-emerald-400" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} className="text-slate-500 dark:text-slate-400" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800">
              <button
                type="submit"
                form="add-user-form"
                disabled={createLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {createLoading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Memproses & Men-seed Data...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    <span>Buat Akun & Auto-Seed</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* User List Table */}
          <div className="lg:col-span-2 glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex flex-col gap-3 mb-5 pb-3 border-b border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Users size={18} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">
                        Daftar Pengguna ({filteredProfiles.length}{filteredProfiles.length !== profiles.length ? ` dari ${profiles.length}` : ''})
                      </h2>
                      <p className="text-xs text-slate-400">Status akun & perpanjangan masa tenggang</p>
                    </div>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Cari email..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Filter Bar: Role & Status */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-xs">
                  <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1">
                    <span className="text-[11px] font-semibold text-slate-400">Role:</span>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value as any)}
                      className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer pr-1"
                    >
                      <option value="user" className="bg-slate-900 text-white">User</option>
                      <option value="admin" className="bg-slate-900 text-white">Admin</option>
                      <option value="all" className="bg-slate-900 text-white">Semua Role</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl px-2.5 py-1">
                    <span className="text-[11px] font-semibold text-slate-400">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer pr-1"
                    >
                      <option value="active" className="bg-slate-900 text-white">Aktif</option>
                      <option value="expired" className="bg-slate-900 text-white">Kadaluwarsa</option>
                      <option value="deleted" className="bg-slate-900 text-white">Nonaktif (Deleted)</option>
                      <option value="all" className="bg-slate-900 text-white">Semua Status</option>
                    </select>
                  </div>

                  {(roleFilter !== 'user' || statusFilter !== 'active' || search !== '') && (
                    <button
                      onClick={() => {
                        setRoleFilter('user')
                        setStatusFilter('active')
                        setSearch('')
                      }}
                      className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors ml-auto flex items-center gap-1 cursor-pointer py-1 px-2 rounded-lg hover:bg-rose-500/10"
                    >
                      <X size={12} /> Reset Filter
                    </button>
                  )}
                </div>
              </div>

              {actionSuccess && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {loading ? (
                <div className="py-16 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <RefreshCw size={16} className="animate-spin text-blue-400" />
                  <span>Memuat data pengguna...</span>
                </div>
              ) : filteredProfiles.length === 0 ? (
                <div className="py-16 text-center text-xs text-slate-500">
                  Tidak ada data pengguna ditemukan.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300 min-w-[650px]">
                    <thead className="bg-slate-900/90 uppercase font-semibold text-slate-400 border-b border-slate-800 text-[11px]">
                      <tr>
                        <th className="px-4 py-3">Pengguna</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Kadaluwarsa Pada</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredProfiles.map((p) => {
                        const { isExpired, text, badgeClass } = getExpirationStatus(p)
                        const isAdmin = p.role === 'admin' || p.email === 'admin@fintrack.com'
                        const isSoftDeleted = !!p.is_deleted

                        return (
                          <tr key={p.id} className={`hover:bg-slate-800/40 transition-colors ${isSoftDeleted ? 'opacity-65 bg-rose-950/10' : ''}`}>
                            <td className="px-4 py-3 font-medium text-white">
                              <div className="flex flex-col">
                                <span className={`font-semibold ${isSoftDeleted ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                                  {p.email}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  Dibuat: {formatDisplayDate(p.created_at)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                isAdmin ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
                              }`}>
                                {p.role || 'user'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-300">
                              {isAdmin ? (
                                <span className="text-slate-500 italic">Permanen</span>
                              ) : (
                                <div>
                                  <p className="font-medium text-slate-200">{formatDisplayDate(p.expires_at)}</p>
                                  <p className="text-[10px] text-slate-400">Pukul 23:59</p>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {isAdmin ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <UserCheck size={11} /> Admin Aktif
                                </span>
                              ) : (
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeClass}`}>
                                  {isSoftDeleted ? <ShieldBan size={11} /> : isExpired ? <ShieldAlert size={11} /> : <CheckCircle2 size={11} />}
                                  {text}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {!isAdmin && (
                                <div className="flex items-center justify-center">
                                  {/* Single Action Button: Pencil Icon */}
                                  <button
                                    onClick={() => openEditModal(p)}
                                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-700/60 hover:border-amber-500/30 transition-all cursor-pointer shadow-sm group"
                                    title="Kelola Akun (Ubah Masa Tenggang / Status)"
                                  >
                                    <Pencil size={14} className="group-hover:scale-110 transition-transform" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Total: {profiles.length} Pengguna Terdaftar</span>
              <button
                onClick={loadProfiles}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                <RefreshCw size={12} /> Refresh Data
              </button>
            </div>
          </div>
        </div>

      {/* Modal: Kelola Akun Pengguna (Edit Masa Tenggang & Nonaktifkan / Pulihkan Akun) */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md relative animate-scaleUp">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Pencil size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Kelola Akun Pengguna</h3>
                  <p className="text-xs text-slate-400">{editingUser.email}</p>
                </div>
              </div>

              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {editSuccess && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{editSuccess}</span>
              </div>
            )}

            {editError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <div className="space-y-6">
              {/* Bagian 1: Ubah Masa Tenggang */}
              <form onSubmit={handleUpdateExpiration} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                    Masa Tenggang Baru (Bulan dari Hari Ini)
                  </label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Contoh: 1, 3, 6, 12"
                      value={editMonths}
                      onChange={(e) => setEditMonths(e.target.value)}
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Akun akan aktif selama <strong>{editMonths || 0} bulan</strong> ke depan (pukul 23:59).
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {editLoading ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Menyimpan Masa Tenggang...</span>
                    </>
                  ) : (
                    <>
                      <Save size={13} />
                      <span>Simpan Perubahan Masa Tenggang</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bagian 2: Tindakan Status Akun (Nonaktifkan / Pulihkan) */}
              <div className="pt-4 border-t border-slate-800/80">
                <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                  Status & Akses Akun
                </label>
                
                {editingUser.is_deleted ? (
                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-rose-300">
                        <ShieldBan size={14} /> Akun Sedang Dinonaktifkan
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Pengguna saat ini tidak dapat login ke aplikasi.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const target = editingUser
                        setEditingUser(null)
                        setDeletingUser({ user: target, action: 'restore' })
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <RotateCcw size={13} />
                      <span>Pulihkan Akun</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-400">
                        <CheckCircle2 size={14} /> Akun Aktif
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Pengguna dapat login dan mencatat transaksi.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const target = editingUser
                        setEditingUser(null)
                        setDeletingUser({ user: target, action: 'soft' })
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <UserX size={13} />
                      <span>Nonaktifkan</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-5 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal: Soft Delete / Restore Action Confirmation */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md relative animate-scaleUp">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl border ${
                  deletingUser.action === 'restore'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}>
                  {deletingUser.action === 'restore' ? (
                    <RotateCcw size={18} />
                  ) : (
                    <UserX size={18} />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {deletingUser.action === 'restore'
                      ? 'Pulihkan Akun (Restore)'
                      : 'Nonaktifkan Akun (Soft Delete)'}
                  </h3>
                  <p className="text-xs text-slate-400">{deletingUser.user.email}</p>
                </div>
              </div>

              <button
                onClick={() => setDeletingUser(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {deleteError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{deleteError}</span>
              </div>
            )}

            <div className="space-y-4 mb-6">
              {deletingUser.action === 'restore' ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-1">
                  <p className="leading-relaxed">
                    Akun ini akan diaktifkan kembali. Pengguna dapat login kembali seperti biasa menggunakan email dan password mereka.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <ShieldBan size={15} /> Nonaktifkan Akses Pengguna
                  </div>
                  <p className="leading-relaxed">
                    Akun akan dinonaktifkan (Soft Delete). Pengguna tidak akan bisa login ke aplikasi, namun data transaksi dan riwayat keuangannya tetap tersimpan aman di database dan dapat dipulihkan kapan saja oleh Admin.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingUser(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800/80 text-xs font-medium transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteAction}
                disabled={deleteLoading}
                className={`flex-1 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                  deletingUser.action === 'restore'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 shadow-amber-600/30'
                }`}
              >
                {deleteLoading ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    {deletingUser.action === 'restore' ? (
                      <RotateCcw size={13} />
                    ) : (
                      <UserX size={13} />
                    )}
                    <span>
                      {deletingUser.action === 'restore'
                        ? 'Ya, Pulihkan Akun'
                        : 'Ya, Nonaktifkan'}
                    </span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
