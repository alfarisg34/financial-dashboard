'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Pencil, Trash2, Landmark, Check, X, Sparkles } from 'lucide-react'

type FundSource = {
  id: string
  name: string
  icon: string
  type: string
  created_at: string
}

const PRESET_ICONS = ['💵', '💳', '🏦', '📱', '💰', '🪙', '💎', '📲', '🛍️', '💼']

const DEFAULT_SEEDS = [
  { name: 'Dompet Tunai', icon: '💵', type: 'cash' },
  { name: 'Bank BCA', icon: '🏦', type: 'bank' },
  { name: 'Bank BNI', icon: '🏦', type: 'bank' },
  { name: 'GoPay', icon: '📱', type: 'e-wallet' },
  { name: 'OVO', icon: '📱', type: 'e-wallet' },
  { name: 'DANA', icon: '📱', type: 'e-wallet' },
  { name: 'ShopeePay', icon: '📱', type: 'e-wallet' },
]

export default function FundSourcesPage() {
  const supabase = createClient()
  const [sources, setSources] = useState<FundSource[]>([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')

  // Form add
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('💰')
  const [type, setType] = useState('cash')

  // Edit modal
  const [editingSource, setEditingSource] = useState<FundSource | null>(null)
  const [editName, setEditName] = useState('')
  const [editIcon, setEditIcon] = useState('💰')
  const [editType, setEditType] = useState('cash')

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function loadSources() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('fund_sources')
      .select('*')
      .eq('user_id', user.id)
      .order('name')

    if (error) {
      console.error('Error loading fund sources:', error)
      setLoading(false)
      return
    }

    // Auto-seed default fund sources if none exists
    if (!data || data.length === 0) {
      await seedDefaults(user.id)
      setLoading(false)
      return
    }

    setSources(data)
    setLoading(false)
  }

  async function seedDefaults(userId: string) {
    const toInsert = DEFAULT_SEEDS.map(s => ({
      user_id: userId,
      name: s.name,
      icon: s.icon,
      type: s.type
    }))

    const { error } = await supabase.from('fund_sources').insert(toInsert)
    if (!error) {
      setSuccess('Sumber dana awal berhasil di-seed otomatis!')
      setTimeout(() => setSuccess(''), 3000)
      const { data: freshData } = await supabase.from('fund_sources').select('*').eq('user_id', userId).order('name')
      setSources(freshData || [])
    }
  }

  useEffect(() => {
    loadSources()
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('fund_sources').insert({
      user_id: user.id,
      name: name.trim(),
      icon,
      type
    })

    if (!error) {
      setName('')
      setIcon('💰')
      setType('cash')
      setSuccess('Sumber dana berhasil ditambahkan!')
      loadSources()
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  async function handleEditSubmit() {
    if (!editingSource || !editName.trim()) return

    const { error } = await supabase
      .from('fund_sources')
      .update({
        name: editName.trim(),
        icon: editIcon,
        type: editType
      })
      .eq('id', editingSource.id)

    if (!error) {
      setEditingSource(null)
      setSuccess('Sumber dana diperbarui!')
      loadSources()
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  async function handleDelete() {
    if (!deleteId) return

    const { error } = await supabase.from('fund_sources').delete().eq('id', deleteId)
    if (!error) {
      setDeleteId(null)
      setSuccess('Sumber dana berhasil dihapus!')
      loadSources()
      setTimeout(() => setSuccess(''), 3000)
    } else {
      alert('Gagal menghapus sumber dana')
    }
  }

  function openEdit(fs: FundSource) {
    setEditingSource(fs)
    setEditName(fs.name)
    setEditIcon(fs.icon)
    setEditType(fs.type)
  }

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <Landmark size={20} className="text-blue-400" />
            Kelola Sumber Dana
          </h1>
          <p className="text-xs text-slate-400">Atur akun bank, dompet fisik, dan e-wallet tempat uang Anda disimpan</p>
        </div>
        <button 
          onClick={async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) seedDefaults(user.id)
          }}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles size={14} className="text-amber-400" />
          Seed Ulang Default
        </button>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm">
          {success}
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleAdd} className="glass-card rounded-2xl border border-slate-800 p-5 space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Tambah Sumber Dana</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Nama Account/Bank</label>
            <input 
              type="text"
              placeholder="Contoh: Bank Mandiri"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Jenis</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm font-medium text-slate-200 outline-none cursor-pointer"
            >
              <option value="cash">Tunai / Dompet</option>
              <option value="bank">Bank</option>
              <option value="e-wallet">E-Wallet</option>
              <option value="other">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Icon Emoji</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={icon}
                onChange={e => setIcon(e.target.value)}
                maxLength={4}
                className="w-16 px-3 py-2.5 rounded-xl border border-slate-800 text-center text-base outline-none"
              />
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus size={16}/> Tambah
              </button>
            </div>
          </div>
        </div>

        {/* Preset icon picker */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[11px] text-slate-500">Pilih Icon:</span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_ICONS.map(ic => (
              <button
                key={ic}
                type="button"
                onClick={() => setIcon(ic)}
                className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center border transition-all cursor-pointer ${
                  icon === ic ? 'bg-blue-500/20 border-blue-400 scale-110' : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {ic}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Sources Grid List */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Daftar Sumber Dana ({sources.length})</h2>
        {loading ? (
          <div className="text-center py-8 text-slate-500">Memuat sumber dana...</div>
        ) : sources.length === 0 ? (
          <div className="text-center py-8 text-slate-500 glass-card rounded-2xl border border-slate-800">
            Belum ada sumber dana. Silakan tambah di atas atau gunakan button Seed Default.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sources.map(fs => (
              <div key={fs.id} className="glass-card glass-card-hover rounded-2xl border border-slate-800 p-4.5 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shrink-0">
                    {fs.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-200 truncate">{fs.name}</h3>
                    <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50 mt-1 inline-block">
                      {fs.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => openEdit(fs)}
                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteId(fs.id)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingSource && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl max-w-md w-full border border-slate-700">
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <h3 className="font-bold text-white">Edit Sumber Dana</h3>
              <button onClick={() => setEditingSource(null)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Nama Account</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 text-sm font-semibold outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Jenis</label>
                <select
                  value={editType}
                  onChange={e => setEditType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 text-sm outline-none cursor-pointer"
                >
                  <option value="cash">Tunai / Dompet</option>
                  <option value="bank">Bank</option>
                  <option value="e-wallet">E-Wallet</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Icon Emoji</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editIcon}
                    onChange={e => setEditIcon(e.target.value)}
                    maxLength={4}
                    className="w-20 px-3 py-2.5 rounded-xl border border-slate-800 text-center text-lg outline-none"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_ICONS.map(ic => (
                      <button
                        key={ic}
                        type="button"
                        onClick={() => setEditIcon(ic)}
                        className="w-7 h-7 rounded-lg text-sm flex items-center justify-center bg-slate-900 border border-slate-800 hover:bg-slate-800"
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-slate-800">
              <button
                onClick={() => setEditingSource(null)}
                className="flex-1 py-3 rounded-xl border border-slate-800 text-slate-400 font-medium hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl max-w-sm w-full border border-slate-800">
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 size={24} className="text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hapus Sumber Dana?</h3>
              <p className="text-xs text-slate-400">Apakah anda yakin ingin menghapus sumber dana ini?</p>
            </div>
            <div className="flex gap-3 p-5 border-t border-slate-800">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl border border-slate-800 text-slate-400 font-medium hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-500 transition-colors cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
