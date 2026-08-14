'use client'
import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check, Calendar, Info, ChevronDown, ChevronRight, Layers, DollarSign } from 'lucide-react'

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800/40 last:border-0 hover:bg-slate-900/40 transition-colors">
      {/* Subcategory Name & indicator */}
      <div className="flex items-center gap-2.5 min-w-0 pr-2">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-bold shrink-0">↳</span>
        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 break-words">
          {sub.name}
        </span>
      </div>

      {/* Input & Previous Month Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
        {/* Previous Month Info Badges */}
        {hasAnyPrevInfo && (
          <div className="flex items-center gap-1.5 flex-wrap sm:justify-end">
            {hasPrevBudget && (
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded-md border border-blue-500/30 shadow-sm whitespace-nowrap">
                Budget Lalu: Rp {formatToRupiah(prevBudget)}
              </span>
            )}
            {hasPrevActual && (
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold rounded-md border border-indigo-500/30 shadow-sm whitespace-nowrap">
                Real Lalu: Rp {formatToRupiah(prevActual)}
              </span>
            )}
          </div>
        )}

        {/* Input Field + Simpan Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold pointer-events-none">Rp</span>
            <input
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={e => handleAmountChange(sub.id, e.target.value, type, setOutcomeAmounts, setIncomeAmounts)}
              placeholder="0"
              className="w-full sm:w-40 pl-9 pr-3 py-1.5 rounded-xl border border-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-200 placeholder:text-slate-600 bg-slate-900/90"
            />
          </div>

          <button
            onClick={() => onSave(sub.id, type)}
            className={`px-3.5 py-1.5 text-xs rounded-xl transition-all font-bold whitespace-nowrap flex items-center justify-center gap-1 cursor-pointer shrink-0 ${isSaved
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                : isError
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : type === 'outcome'
                    ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
              }`}>
            {isSaved ? <><Check size={13} /> Tersimpan</> : isError ? 'Gagal!' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BudgetPage() {
  const supabase = createClient()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [categories, setCategories] = useState<any[]>([])
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [outcomeAmounts, setOutcomeAmounts] = useState<Record<string, string>>({})
  const [incomeAmounts, setIncomeAmounts] = useState<Record<string, string>>({})

  // Dropdown / Accordion expand state
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({
    outcome: true,
    income: true
  })
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

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

    const prevStartUtc = new Date(prevYear, prevMonth - 1, 1, 0, 0, 0, 0).toISOString()
    const prevEndUtc = new Date(prevYear, prevMonth, 0, 23, 59, 59, 999).toISOString()

    const [{ data: cats }, { data: subs }, { data: buds }, { data: prevBuds }, { data: prevTxs }] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      supabase.from('subcategories').select('*, categories(name, type)').eq('user_id', user.id).order('name'),
      supabase.from('budgets').select('*').eq('user_id', user.id).eq('month', month).eq('year', year),
      supabase.from('budgets').select('*').eq('user_id', user.id).eq('month', prevMonth).eq('year', prevYear),
      supabase.from('transactions').select('subcategory_id, amount, type')
        .eq('user_id', user.id).gte('date', prevStartUtc).lte('date', prevEndUtc)
    ])

    setCategories(cats || [])
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

  const toggleTypeExpand = (type: 'income' | 'outcome') => {
    setExpandedTypes(prev => ({ ...prev, [type]: !prev[type] }))
  }

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    )
  }

  // Calculate totals per category
  const getCategoryTotal = (catId: string, type: 'income' | 'outcome') => {
    const subs = subcategories.filter(s => s.category_id === catId)
    const amounts = type === 'outcome' ? outcomeAmounts : incomeAmounts
    return subs.reduce((sum, s) => sum + parseRupiahToNumber(amounts[s.id] || '0'), 0)
  }

  // Calculate grand total per type
  const getTotalPerType = (type: 'income' | 'outcome') => {
    const filteredSubs = subcategories.filter(s => s.categories?.type === type)
    const amounts = type === 'outcome' ? outcomeAmounts : incomeAmounts
    return filteredSubs.reduce((sum, s) => sum + parseRupiahToNumber(amounts[s.id] || '0'), 0)
  }

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
        <p className="text-xs text-slate-400">Atur batasan pengeluaran dan target pemasukan bulanan per kategori & subkategori</p>
      </div>

      {/* Month/Year picker */}
      <div className="glass-card rounded-2xl border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-blue-400 ml-1" />
          <select value={month} onChange={e => setMonth(Number(e.target.value))}
            className="px-4 py-2 rounded-xl border border-slate-800 text-sm font-semibold text-slate-200 outline-none cursor-pointer bg-slate-900">
            {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
          </select>
          <select value={year} onChange={e => setYear(Number(e.target.value))}
            className="px-4 py-2 rounded-xl border border-slate-800 text-sm font-semibold text-slate-200 outline-none cursor-pointer bg-slate-900">
            {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          Periode: <span className="text-blue-400">{months[month - 1]} {year}</span>
        </span>
      </div>

      <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
        <Info size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
        <span>Klik kategori untuk membuka daftar subkategori. Info <strong className="text-blue-900 dark:text-blue-200">Budget Bulan Lalu</strong> & <strong className="text-blue-900 dark:text-blue-200">Realisasi Bulan Lalu</strong> akan muncul otomatis jika ada.</span>
      </div>

      {/* Accordion / Dropdown Level 1: Outcome and Income */}
      <div className="space-y-6">
        {(['outcome', 'income'] as const).map(typeKey => {
          const isOutcome = typeKey === 'outcome'
          const isTypeExpanded = !!expandedTypes[typeKey]
          const typeCats = categories.filter(c => c.type === typeKey)
          const totalAmount = getTotalPerType(typeKey)

          return (
            <div key={typeKey} className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-lg shadow-black/20">
              {/* Level 1: Header Dropdown */}
              <button
                type="button"
                onClick={() => toggleTypeExpand(typeKey)}
                className={`w-full flex items-center justify-between px-5 py-4 cursor-pointer transition-colors select-none ${isOutcome ? 'bg-rose-500/10 hover:bg-rose-500/15' : 'bg-emerald-500/10 hover:bg-emerald-500/15'
                  }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${
                    isOutcome 
                      ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30' 
                      : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  }`}>
                    {isTypeExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </div>
                  <div className="text-left">
                    <h2 className={`text-base font-bold flex items-center gap-2 ${
                      isOutcome ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      <span>{isOutcome ? '📉 Budget Pengeluaran' : '📈 Target Pemasukan'}</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {typeCats.length} Kategori
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Alokasi</span>
                    <span className={`text-sm font-bold ${isOutcome ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {totalAmount > 0 ? `Rp ${formatToRupiah(totalAmount)}` : 'Rp 0'}
                    </span>
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-lg border font-bold shadow-sm ${
                    isOutcome 
                      ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40' 
                      : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                  }`}>
                    {isTypeExpanded ? 'Tutup' : 'Buka'}
                  </div>
                </div>
              </button>

              {/* Level 1 Content */}
              {isTypeExpanded && (
                <div className="p-4 space-y-3 bg-slate-950/40 border-t border-slate-800">
                  {typeCats.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      Belum ada kategori {isOutcome ? 'pengeluaran (outcome)' : 'pemasukan (income)'}. Tambahkan di halaman Kategori.
                    </p>
                  ) : (
                    typeCats.map(cat => {
                      const catSubs = subcategories.filter(s => s.category_id === cat.id)
                      const isCatExpanded = expandedCategories.includes(cat.id)
                      const catTotal = getCategoryTotal(cat.id, typeKey)

                      return (
                        <div key={cat.id} className="glass-card rounded-xl border border-slate-800/80 overflow-hidden bg-slate-900/60">
                          {/* Level 2: Kategori Dropdown Header */}
                          <button
                            type="button"
                            onClick={() => toggleCategoryExpand(cat.id)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-800/50 transition-colors cursor-pointer select-none">
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              {isCatExpanded ? (
                                <ChevronDown size={17} className="text-blue-400 shrink-0" />
                              ) : (
                                <ChevronRight size={17} className="text-slate-400 shrink-0" />
                              )}
                              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                                {cat.name}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-300 dark:border-slate-700/50 shrink-0 font-medium">
                                {catSubs.length} sub
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {catTotal > 0 && (
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border shadow-sm ${
                                  isOutcome 
                                    ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30' 
                                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                                }`}>
                                  Rp {formatToRupiah(catTotal)}
                                </span>
                              )}
                            </div>
                          </button>

                          {/* Level 3: List Subkategori */}
                          {isCatExpanded && (
                            <div className="bg-slate-950/70 border-t border-slate-800/80">
                              {catSubs.length === 0 ? (
                                <p className="text-xs text-slate-500 px-6 py-4 italic text-center">
                                  Belum ada subkategori pada kategori ini.
                                </p>
                              ) : (
                                <div className="divide-y divide-slate-800/40">
                                  {catSubs.map(sub => (
                                    <BudgetRow
                                      key={sub.id}
                                      sub={sub}
                                      type={typeKey}
                                      {...rowProps}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}