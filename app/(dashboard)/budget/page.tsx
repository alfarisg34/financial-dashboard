'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Check } from 'lucide-react'

type Budget = { id: string; subcategory_id: string; month: number; year: number; amount: number; type: string }

export default function BudgetPage() {
  const supabase = createClient()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [outcomeAmounts, setOutcomeAmounts] = useState<Record<string, string>>({})
  const [incomeAmounts, setIncomeAmounts] = useState<Record<string, string>>({})
  const [savedId, setSavedId] = useState<string | null>(null)
  const [errorId, setErrorId] = useState<string | null>(null)

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const [{ data: subs }, { data: buds }] = await Promise.all([
      supabase.from('subcategories').select('*, categories(name, type)').eq('user_id', user.id),
      supabase.from('budgets').select('*').eq('user_id', user.id).eq('month', month).eq('year', year)
    ])
    setSubcategories(subs || [])
    setBudgets(buds || [])

    const initOutcome: Record<string, string> = {}
    const initIncome: Record<string, string> = {}
    ;(buds || []).forEach((b: Budget) => {
      if (b.type === 'outcome') initOutcome[b.subcategory_id] = String(b.amount)
      if (b.type === 'income') initIncome[b.subcategory_id] = String(b.amount)
    })
    setOutcomeAmounts(initOutcome)
    setIncomeAmounts(initIncome)
  }

  useEffect(() => { load() }, [month, year])

  async function saveBudget(subcategoryId: string, type: 'income' | 'outcome') {
    const { data: { user } } = await supabase.auth.getUser()
    const amount = parseFloat(
      (type === 'outcome' ? outcomeAmounts : incomeAmounts)[subcategoryId] || '0'
    )
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

  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des']
  const outcomeSubs = subcategories.filter(s => s.categories?.type === 'outcome')
  const incomeSubs = subcategories.filter(s => s.categories?.type === 'income')

  function BudgetRow({ sub, type }: { sub: any, type: 'income' | 'outcome' }) {
    const saveKey = `${sub.id}-${type}`
    const isSaved = savedId === saveKey
    const isError = errorId === saveKey
    const amounts = type === 'outcome' ? outcomeAmounts : incomeAmounts
    const setAmounts = type === 'outcome' ? setOutcomeAmounts : setIncomeAmounts

    return (
      <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-gray-50 last:border-0">
        <span className="hidden sm:block text-xs text-gray-400 flex-1 min-w-0">
          {sub.categories?.name}
        </span>
        <span className="hidden sm:block text-sm text-gray-700 flex-1 min-w-0">
          {sub.name}
        </span>
        <div className="sm:hidden flex flex-col flex-1 min-w-0">
          <span className="text-xs text-gray-400">{sub.categories?.name}</span>
          <span className="text-sm text-gray-700">{sub.name}</span>
        </div>
        <div className="flex gap-2 ml-auto items-center">
          <input
            type="number"
            value={amounts[sub.id] || ''}
            onChange={e => setAmounts(prev => ({ ...prev, [sub.id]: e.target.value }))}
            placeholder="0"
            className="w-28 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => saveBudget(sub.id, type)}
            className={`px-3 py-2 text-xs rounded-lg transition-colors font-medium whitespace-nowrap flex items-center gap-1
              ${isSaved
                ? 'bg-green-500 text-white'
                : isError
                ? 'bg-red-100 text-red-700'
                : type === 'outcome'
                ? 'bg-green-50 text-green-700 hover:bg-green-100'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}>
            {isSaved ? <><Check size={13}/> Tersimpan</> : isError ? 'Gagal!' : 'Simpan'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl w-full">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Manage Budget</h1>

      {/* Month/Year picker */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex flex-wrap items-center gap-3">
        <select value={month} onChange={e => setMonth(Number(e.target.value))}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
        </select>
        <select value={year} onChange={e => setYear(Number(e.target.value))}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <span className="text-sm text-gray-500">Budget untuk {months[month-1]} {year}</span>
      </div>

      {/* Outcome Budget */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-3">📉 Budget Pengeluaran</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden sm:grid sm:grid-cols-3 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 border-b border-gray-100">
            <span>Kategori</span>
            <span>Subkategori</span>
            <span>Budget (Rp)</span>
          </div>
          {outcomeSubs.length === 0
            ? <p className="px-5 py-8 text-sm text-gray-400 text-center">Belum ada subkategori outcome.</p>
            : outcomeSubs.map(sub => <BudgetRow key={sub.id} sub={sub} type="outcome"/>)
          }
        </div>
      </div>

      {/* Income Target */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-3">📈 Target Pemasukan</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden sm:grid sm:grid-cols-3 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 border-b border-gray-100">
            <span>Kategori</span>
            <span>Subkategori</span>
            <span>Target (Rp)</span>
          </div>
          {incomeSubs.length === 0
            ? <p className="px-5 py-8 text-sm text-gray-400 text-center">Belum ada subkategori income.</p>
            : incomeSubs.map(sub => <BudgetRow key={sub.id} sub={sub} type="income"/>)
          }
        </div>
      </div>
    </div>
  )
}