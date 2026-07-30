'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeftRight, ArrowRight, Trash2, Calendar } from 'lucide-react'

type FundSource = {
  id: string
  name: string
  icon: string
  type: string
}

type Transfer = {
  id: string
  from_fund_source_id: string
  to_fund_source_id: string
  amount: number
  description: string
  date: string
  from_source?: FundSource
  to_source?: FundSource
}

function fmt(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

function formatThousands(value: string | number): string {
  const numStr = String(value).replace(/[^0-9]/g, '')
  if (!numStr) return ''
  return new Intl.NumberFormat('id-ID').format(parseInt(numStr, 10))
}

function parseNumber(formattedStr: string): number {
  return parseInt(formattedStr.replace(/[^0-9]/g, ''), 10) || 0
}

export default function TransferPage() {
  const supabase = createClient()
  const [sources, setSources] = useState<FundSource[]>([])
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')

  // Form states
  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => {
    const now = new Date()
    const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    return wib.toISOString().slice(0, 16)
  })

  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function loadData() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: sourcesData }, { data: transfersData }] = await Promise.all([
      supabase.from('fund_sources').select('*').eq('user_id', user.id).order('name'),
      supabase.from('transfers')
        .select('*, from_source:fund_sources!from_fund_source_id(name, icon), to_source:fund_sources!to_fund_source_id(name, icon)')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30)
    ])

    setSources(sourcesData || [])
    setTransfers(transfersData || [])

    if (sourcesData && sourcesData.length >= 2) {
      if (!fromId) setFromId(sourcesData[0].id)
      if (!toId) setToId(sourcesData[1].id)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fromId || !toId || fromId === toId) {
      alert('Pilih sumber asal dan tujuan transfer yang berbeda.')
      return
    }

    const numericAmount = parseNumber(displayAmount)
    if (!numericAmount) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('transfers').insert({
      user_id: user.id,
      from_fund_source_id: fromId,
      to_fund_source_id: toId,
      amount: numericAmount,
      description,
      date
    })

    if (!error) {
      setSuccess('Transfer saldo berhasil ditambahkan!')
      setDisplayAmount('')
      setDescription('')
      loadData()
      setTimeout(() => setSuccess(''), 3000)
    } else {
      alert('Gagal menyimpan transfer')
    }
  }

  async function handleDelete() {
    if (!deleteId) return

    const { error } = await supabase.from('transfers').delete().eq('id', deleteId)
    if (!error) {
      setDeleteId(null)
      setSuccess('Transfer berhasil dihapus!')
      loadData()
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <ArrowLeftRight size={20} className="text-indigo-400" />
          Transfer Saldo Antar Sumber Dana
        </h1>
        <p className="text-xs text-slate-400">Catat perpindahan saldo (misalnya dari Rekening Bank ke Dompet Tunai / E-Wallet)</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm">
          {success}
        </div>
      )}

      {/* Form Transfer */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-slate-800 p-6 space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Form Transfer</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Dari (Asal Saldo)</label>
            <select
              value={fromId}
              onChange={e => setFromId(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm font-semibold outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-100">-- Pilih Asal --</option>
              {sources.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-slate-100">
                  {s.icon} {s.name} ({s.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Ke (Tujuan Saldo)</label>
            <select
              value={toId}
              onChange={e => setToId(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm font-semibold outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-100">-- Pilih Tujuan --</option>
              {sources.filter(s => s.id !== fromId).map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-slate-100">
                  {s.icon} {s.name} ({s.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Nominal Transfer (Rp)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none">Rp</span>
            <input
              type="text"
              inputMode="numeric"
              value={displayAmount}
              onChange={e => setDisplayAmount(formatThousands(e.target.value))}
              placeholder="0"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 text-sm font-semibold outline-none"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Tanggal & Waktu</label>
          <input
            type="datetime-local"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-800 text-sm outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Deskripsi / Catatan</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Misal: Tarik tunai dari ATM, Topup GoPay..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-800 text-sm resize-none outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          Proses Transfer
        </button>
      </form>

      {/* History Transfer */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Riwayat Transfer Terakhir</h2>

        {loading ? (
          <div className="text-center py-8 text-slate-500">Memuat riwayat transfer...</div>
        ) : transfers.length === 0 ? (
          <div className="text-center py-8 text-slate-500 glass-card rounded-2xl border border-slate-800">
            Belum ada transaksi transfer recorded.
          </div>
        ) : (
          <div className="space-y-3">
            {transfers.map((tr) => (
              <div key={tr.id} className="glass-card glass-card-hover rounded-xl border border-slate-800 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 text-sm font-semibold text-slate-200 flex-wrap">
                      <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/60">
                        <span>{tr.from_source?.icon || '💰'}</span>
                        <span>{tr.from_source?.name || 'Unknown'}</span>
                      </span>
                      <ArrowRight size={14} className="text-indigo-400" />
                      <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/60">
                        <span>{tr.to_source?.icon || '💰'}</span>
                        <span>{tr.to_source?.name || 'Unknown'}</span>
                      </span>
                    </div>

                    <div className="text-base font-bold text-indigo-400 mt-1">
                      {fmt(tr.amount)}
                    </div>

                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12}/>
                        {(() => {
                          const [d, t] = tr.date.slice(0, 16).split('T');
                          const [year, month, day] = d.split('-');
                          return `${day}-${month}-${year} ${t}`;
                        })()}
                      </span>
                      {tr.description && (
                        <span className="text-slate-500">| {tr.description}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setDeleteId(tr.id)}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer ml-3"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl max-w-sm w-full border border-slate-800">
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 size={24} className="text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hapus Riwayat Transfer?</h3>
              <p className="text-xs text-slate-400">Apakah anda yakin ingin menghapus catatan transfer ini?</p>
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
