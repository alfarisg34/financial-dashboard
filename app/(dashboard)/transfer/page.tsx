'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeftRight, ArrowRight, Trash2, Calendar, Wallet } from 'lucide-react'

type FundSource = {
  id: string
  name: string
  icon: string
  type: string
  initial_balance?: number
}

type TransactionSummary = {
  fund_source_id: string
  type: string
  amount: number
}

type TransferSummary = {
  from_fund_source_id: string
  to_fund_source_id: string
  amount: number
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

function getNowLocalISO() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatDateForDb(dateStr: string) {
  if (!dateStr) return dateStr
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toISOString()
}

export default function TransferPage() {
  const supabase = createClient()
  const [sources, setSources] = useState<FundSource[]>([])
  const [transactions, setTransactions] = useState<TransactionSummary[]>([])
  const [allTransfers, setAllTransfers] = useState<TransferSummary[]>([])
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState('')

  // Form states
  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(getNowLocalISO)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function loadData() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: sourcesData }, { data: txData }, { data: allTrData }, { data: transfersData }] = await Promise.all([
      supabase.from('fund_sources').select('*').eq('user_id', user.id).order('name'),
      supabase.from('transactions').select('fund_source_id, type, amount').eq('user_id', user.id),
      supabase.from('transfers').select('from_fund_source_id, to_fund_source_id, amount').eq('user_id', user.id),
      supabase.from('transfers')
        .select('*, from_source:fund_sources!from_fund_source_id(name, icon), to_source:fund_sources!to_fund_source_id(name, icon)')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30)
    ])

    setSources(sourcesData || [])
    setTransactions(txData || [])
    setAllTransfers(allTrData || [])
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

  // Compute real-time balance per fund source
  const sourcesWithBalance = sources.map(fs => {
    const initial = fs.initial_balance || 0
    const income = transactions
      .filter(t => t.fund_source_id === fs.id && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const outcome = transactions
      .filter(t => t.fund_source_id === fs.id && t.type === 'outcome')
      .reduce((sum, t) => sum + t.amount, 0)
    const transferIn = allTransfers
      .filter(tr => tr.to_fund_source_id === fs.id)
      .reduce((sum, tr) => sum + tr.amount, 0)
    const transferOut = allTransfers
      .filter(tr => tr.from_fund_source_id === fs.id)
      .reduce((sum, tr) => sum + tr.amount, 0)

    const balance = initial + income - outcome + transferIn - transferOut
    return { ...fs, balance }
  })

  const selectedFromSource = sourcesWithBalance.find(s => s.id === fromId)
  const selectedToSource = sourcesWithBalance.find(s => s.id === toId)

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
      date: formatDateForDb(date)
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
    } else {
      alert('Gagal menghapus transfer')
    }
  }

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <ArrowLeftRight size={20} className="text-blue-400" />
            Transfer Saldo
          </h1>
          <p className="text-xs text-slate-400">Transfer saldo antar akun bank, e-wallet, atau dompet fisik Anda</p>
        </div>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm font-medium">
          {success}
        </div>
      )}

      {/* Form Transfer */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-slate-800 p-6 space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Form Transfer</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Dari (Asal Saldo)</label>
              {selectedFromSource && (
                <span className={`text-xs font-bold ${selectedFromSource.balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  Saldo: {fmt(selectedFromSource.balance)}
                </span>
              )}
            </div>
            <select
              value={fromId}
              onChange={e => setFromId(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm font-semibold outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-100">-- Pilih Asal --</option>
              {sourcesWithBalance.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-slate-100">
                  {s.icon} {s.name} ({s.type}) — Saldo: {fmt(s.balance)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ke (Tujuan Saldo)</label>
              {selectedToSource && (
                <span className={`text-xs font-bold ${selectedToSource.balance >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                  Saldo: {fmt(selectedToSource.balance)}
                </span>
              )}
            </div>
            <select
              value={toId}
              onChange={e => setToId(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm font-semibold outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-slate-100">-- Pilih Tujuan --</option>
              {sourcesWithBalance.filter(s => s.id !== fromId).map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-slate-100">
                  {s.icon} {s.name} ({s.type}) — Saldo: {fmt(s.balance)}
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
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm font-semibold outline-none"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Deskripsi / Catatan (Opsional)</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Contoh: Tarik tunai dari BCA / Top up GoPay"
            className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all cursor-pointer"
        >
          Proses Transfer Saldo
        </button>
      </form>

      {/* History List */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Riwayat Transfer Terakhir ({transfers.length})</h2>

        {loading ? (
          <div className="text-center py-8 text-slate-500">Memuat riwayat transfer...</div>
        ) : transfers.length === 0 ? (
          <div className="text-center py-8 text-slate-500 glass-card rounded-2xl border border-slate-800">
            Belum ada riwayat transfer.
          </div>
        ) : (
          <div className="space-y-2.5">
            {transfers.map(t => (
              <div key={t.id} className="glass-card rounded-xl border border-slate-800 p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <ArrowLeftRight size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-200">
                      <span>{t.from_source?.icon || '💰'} {t.from_source?.name || 'Asal'}</span>
                      <ArrowRight size={14} className="text-slate-400 shrink-0" />
                      <span>{t.to_source?.icon || '💰'} {t.to_source?.name || 'Tujuan'}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-slate-500" />
                        {formatDisplayDate(t.date)}
                      </span>
                      {t.description && <span className="truncate max-w-[200px] text-slate-400">— {t.description}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-extrabold text-blue-400">
                    {fmt(t.amount)}
                  </span>
                  <button
                    onClick={() => setDeleteId(t.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl max-w-sm w-full border border-slate-800">
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 size={24} className="text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hapus Riwayat Transfer?</h3>
              <p className="text-xs text-slate-400">Apakah anda yakin ingin menghapus data transfer ini?</p>
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
