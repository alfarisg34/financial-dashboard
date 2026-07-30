'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check, Calendar, Info } from 'lucide-react'

type Budget = { id: string; subcategory_id: string; month: number; year: number; amount: number; type: string }

function formatToRupiah(value: number | string): string {
  const numStr = String(value).replace(/[^0-9]/g, '')
  if (!numStr || numStr === '0') return ''
  return new Intl.NumberFormat('id-ID').format(parseInt(numStr, 10))
}

function parseRupiahToNumber(rupiahStr: string): number {
  return parseInt(rupiahStr.replace(/[^0-9]/g, ''), 10) || 0
}

function handleAmountChange(
  id: string,
  rawValue: string,
  type: 'income' | 'outcome',
  setOutcomeAmounts: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setIncomeAmounts: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  const numericStr = rawValue.replace(/[^0-9]/g, '')
  const formatted = numericStr === '' ? '' : formatToRupiah(numericStr)
  if (type === 'outcome') {
    setOutcomeAmounts(prev => ({ ...prev, [id]: formatted }))
  } else {
    setIncomeAmounts(prev => ({ ...prev, [id]: formatted }))
  }
}

type BudgetRowProps = {
  sub: any
  type: 'income' | 'outcome'
  outcomeAmounts: Record<string, string>
  incomeAmounts: Record<string, string>
  prevOutcomeBudgets: Record<string, number>
  prevIncomeBudgets: Record<string, number>
  prevOutcomeSpent: Record<string, number>
  prevIncomeSpent: Record<string, number>
  setOutcomeAmounts: React.Dispatch<React.SetStateAction<Record<string, string>>>
  setIncomeAmounts: React.Dispatch<React.SetStateAction<Record<string, string>>>
  savedId: string | null
  errorId: string | null
  onSave: (subcategoryId: string, type: 'income' | 'outcome') => void
}

function BudgetRow({
  sub, type,
  outcomeAmounts, incomeAmounts,
  prevOutcomeBudgets, prevIncomeBudgets,
  prevOutcomeSpent, prevIncomeSpent,
  setOutcomeAmounts, setIncomeAmounts,
  savedId, errorId, onSave
}: BudgetRowProps) {
  const saveKey = `${sub.id}-${type}`
  const isSaved = savedId === saveKey
  const isError = errorId === saveKey
  const displayValue = (type === 'outcome' ? outcomeAmounts : incomeAmounts)[sub.id] || ''

  // Budget & Actual Spent bulan lalu
  const prevBudget = (type === 'outcome' ? prevOutcomeBudgets : prevIncomeBudgets)[sub.id] || 0
  const prevActual = (type === 'outcome' ? prevOutcomeSpent : prevIncomeSpent)[sub.id] || 0

  const hasPrevBudget = prevBudget > 0
  const hasPrevActual = prevActual > 0
  const hasAnyPrevInfo = hasPrevBudget || hasPrevActual

  return (
    <div className={`flex flex-wrap items-center gap-3 px-5 border-b border-slate-800/60 last:border-0 hover:bg-slate-800/30 transition-colors ${hasAnyPrevInfo ? 'pt-5 pb-3.5' : 'py-3.5'}`}>
      <div className="hidden sm:block flex-1 min-w-0">
        <span className="text-xs font-semibold text-slate-400 block">{sub.categories?.name}</span>
        <span className="text-sm font-semibold text-slate-200 block truncate">{sub.name}</span>
      </div>
      <div className="sm:hidden flex flex-col flex-1 min-w-0">
        <span className="text-xs font-semibold text-slate-400">{sub.categories?.name}</span>
        <span className="text-sm font-semibold text-slate-200 truncate">{sub.name}</span>
      </div>

      <div className="flex gap-2.5 ml-auto items-center">
        <div className="relative">
          {/* Top badges for previous month budget and actual spent */}
          {hasAnyPrevInfo && (
            <div className="absolute -top-3.5 right-0 flex items-center gap-1 z-10 pointer-events-none whitespace-nowrap">
              {hasPrevBudget && (
                <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-bold rounded border border-blue-500/30 shadow-sm">
                  Budget Lalu: {formatToRupiah(prevBudget)}
                </span>
              )}
              {hasPrevActual && (
                <span className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-[9px] font-bold rounded border border-indigo-500/30 shadow-sm">
                  Real Lalu: {formatToRupiah(prevActual)}
                </span>
              )}
            </div>
          )}

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold pointer-events-none">Rp</span>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={e => handleAmountChange(sub.id, e.target.value, type, setOutcomeAmounts, setIncomeAmounts)}
            placeholder="0"
            className="w-44 sm:w-48 pl-9 pr-3 py-2 rounded-xl border border-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-200 placeholder:text-slate-600"
          />
        </div>

        <button
          onClick={() => onSave(sub.id, type)}
          className={`px-3.5 py-2 text-xs rounded-xl transition-all font-bold whitespace-nowrap flex items-center gap-1 cursor-pointer
            ${isSaved
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : isError
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : type === 'outcome'
                  ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
            }`}>
          {isSaved ? <><Check size={13} /> Tersimpan</> : isError ? 'Gagal!' : 'Simpan'}
        </button>
      </div>
    </div>
  )
}

export default function BudgetPage() {
  const supabase = createClient()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [outcomeAmounts, setOutcomeAmounts] = useState<Record<string, string>>({})
  const [incomeAmounts, setIncomeAmounts] = useState<Record<string, string>>({})

  // Previous month budget & actual spent records
  const [prevOutcomeBudgets, setPrevOutcomeBudgets] = useState<Record<string, number>>({})
  const [prevIncomeBudgets, setPrevIncomeBudgets] = useState<Record<string, number>>({})
  const [prevOutcomeSpent, setPrevOutcomeSpent] = useState<Record<string, number>>({})
  const [prevIncomeSpent, setPrevIncomeSpent] = useState<Record<string, number>>({})

  const [savedId, setSavedId] = useState<string | null>(null)
  const [errorId, setErrorId] = useState<string | null>(null)

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Compute previous month & year
    const prevMonth = month === 1 ? 12 : month - 1
    const prevYear = month === 1 ? year - 1 : year

    const prevLastDay = new Date(prevYear, prevMonth, 0).getDate()
    const prevStart = `${prevYear}-${String(prevMonth).padStart(2, '0')}-01T00:00:00+07:00`
    const prevEnd = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${prevLastDay}T23:59:59+07:00`

    const [{ data: subs }, { data: buds }, { data: prevBuds }, { data: prevTxs }] = await Promise.all([
      supabase.from('subcategories').select('*, categories(name, type)').eq('user_id', user.id),
      supabase.from('budgets').select('*').eq('user_id', user.id).eq('month', month).eq('year', year),
      supabase.from('budgets').select('*').eq('user_id', user.id).eq('month', prevMonth).eq('year', prevYear),
      supabase.from('transactions').select('subcategory_id, amount, type')
        .eq('user_id', user.id).gte('date', prevStart).lte('date', prevEnd)
    ])

    setSubcategories(subs || [])

    // Process current budgets
    const initOutcome: Record<string, string> = {}
    const initIncome: Record<string, string> = {}
      ; (buds || []).forEach((b: Budget) => {
        const formatted = b.amount ? formatToRupiah(b.amount) : ''
        if (b.type === 'outcome') initOutcome[b.subcategory_id] = formatted
        if (b.type === 'income') initIncome[b.subcategory_id] = formatted
      })
    setOutcomeAmounts(initOutcome)
    setIncomeAmounts(initIncome)

    // Process previous month budgets
    const prevOutcomeBudMap: Record<string, number> = {}
    const prevIncomeBudMap: Record<string, number> = {}
      ; (prevBuds || []).forEach((b: Budget) => {
        if (b.type === 'outcome') prevOutcomeBudMap[b.subcategory_id] = b.amount
        if (b.type === 'income') prevIncomeBudMap[b.subcategory_id] = b.amount
      })
    setPrevOutcomeBudgets(prevOutcomeBudMap)
    setPrevIncomeBudgets(prevIncomeBudMap)

    // Process previous month actual transactions
    const prevOutcomeMap: Record<string, number> = {}
    const prevIncomeMap: Record<string, number> = {}
      ; (prevTxs || []).forEach((tx: any) => {
        if (tx.subcategory_id) {
          if (tx.type === 'outcome') {
            prevOutcomeMap[tx.subcategory_id] = (prevOutcomeMap[tx.subcategory_id] || 0) + tx.amount
          } else if (tx.type === 'income') {
            prevIncomeMap[tx.subcategory_id] = (prevIncomeMap[tx.subcategory_id] || 0) + tx.amount
          }
        }
      })
    setPrevOutcomeSpent(prevOutcomeMap)
    setPrevIncomeSpent(prevIncomeMap)
  }

  useEffect(() => { load() }, [month, year])

  async function saveBudget(subcategoryId: string, type: 'income' | 'outcome') {
    const { data: { user } } = await supabase.auth.getUser()
    const rawAmount = (type === 'outcome' ? outcomeAmounts : incomeAmounts)[subcategoryId] || '0'
    const amount = parseRupiahToNumber(rawAmount)
    const saveKey = `${subcategoryId}-${type}`
    const { error } = await supabase.from('budgets').upsert(
      { user_id: user?.id, subcategory_id: subcategoryId, month, year, amount, type },
      { onConflict: 'user_id,subcategory_id,month,year,type' }
    )
    if (!error) {
      setSavedId(saveKey)
      setTimeout(() => setSavedId(null), 2000)
    } else {
      setErrorId(saveKey)
      setTimeout(() => setErrorId(null), 2000)
    }
  }

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const outcomeSubs = subcategories.filter(s => s.categories?.type === 'outcome')
  const incomeSubs = subcategories.filter(s => s.categories?.type === 'income')

  const rowProps = {
    outcomeAmounts, incomeAmounts,
    prevOutcomeBudgets, prevIncomeBudgets,
    prevOutcomeSpent, prevIncomeSpent,
    setOutcomeAmounts, setIncomeAmounts,
    savedId, errorId,
    onSave: saveBudget
  }

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <h1 className="text-xl font-bold text-white mb-1">Manajemen Budget & Target</h1>
        <p className="text-xs text-slate-400">Atur batasan pengeluaran dan target pemasukan bulanan Anda</p>
      </div>

      {/* Month/Year picker */}
      <div className="glass-card rounded-2xl border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-blue-400 ml-1" />
          <select value={month} onChange={e => setMonth(Number(e.target.value))}
            className="px-4 py-2 rounded-xl border border-slate-800 text-sm font-semibold text-slate-200 outline-none cursor-pointer">
            {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <select value={year} onChange={e => setYear(Number(e.target.value))}
            className="px-4 py-2 rounded-xl border border-slate-800 text-sm font-semibold text-slate-200 outline-none cursor-pointer">
            {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          Periode: <span className="text-blue-400">{months[month - 1]} {year}</span>
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
        <Info size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
        <span>Di atas setiap kolom input, informasi <strong className="text-blue-900 dark:text-blue-200">Budget Bulan Lalu</strong> dan <strong className="text-blue-900 dark:text-blue-200">Realisasi Bulan Lalu</strong> akan muncul otomatis jika datanya ada.</span>
      </div>

      {/* Outcome Budget */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
          <span>📉 Budget Pengeluaran</span>
        </h2>
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="hidden sm:grid sm:grid-cols-3 text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 bg-slate-900/80 border-b border-slate-800">
            <span>Kategori</span>
            <span>Subkategori</span>
            <span className="text-right">Info Bulan Lalu & Budget (Rp)</span>
          </div>
          {outcomeSubs.length === 0
            ? <p className="px-5 py-8 text-sm text-slate-500 text-center">Belum ada subkategori outcome.</p>
            : outcomeSubs.map(sub => <BudgetRow key={sub.id} sub={sub} type="outcome" {...rowProps} />)
          }
        </div>
      </div>

      {/* Income Target */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
          <span>📈 Target Pemasukan</span>
        </h2>
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
          <div className="hidden sm:grid sm:grid-cols-3 text-xs font-semibold text-slate-400 uppercase tracking-wider px-5 py-3 bg-slate-900/80 border-b border-slate-800">
            <span>Kategori</span>
            <span>Subkategori</span>
            <span className="text-right">Info Bulan Lalu & Target (Rp)</span>
          </div>
          {incomeSubs.length === 0
            ? <p className="px-5 py-8 text-sm text-slate-500 text-center">Belum ada subkategori income.</p>
            : incomeSubs.map(sub => <BudgetRow key={sub.id} sub={sub} type="income" {...rowProps} />)
          }
        </div>
      </div>
    </div>
  )
}