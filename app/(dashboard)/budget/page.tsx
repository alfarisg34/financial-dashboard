'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Subcategory = { id: string; name: string; categories: { name: string } }
type Budget = { id: string; subcategory_id: string; month: number; year: number; amount: number }

export default function BudgetPage() {
  const supabase = createClient()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [amounts, setAmounts] = useState<Record<string, string>>({})

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const [{ data: subs }, { data: buds }] = await Promise.all([
      supabase.from('subcategories').select('*, categories(name, type)').eq('user_id', user.id),
      supabase.from('budgets').select('*').eq('user_id', user.id).eq('month', month).eq('year', year)
    ])
    setSubcategories(subs || [])
    setBudgets(buds || [])
    const init: Record<string, string> = {}
    ;(buds || []).forEach((b: Budget) => { init[b.subcategory_id] = String(b.amount) })
    setAmounts(init)
  }

  useEffect(() => { load() }, [month, year])

  async function saveBudget(subcategoryId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    const amount = parseFloat(amounts[subcategoryId] || '0')
    await supabase.from('budgets').upsert(
      { user_id: user?.id, subcategory_id: subcategoryId, month, year, amount },
      { onConflict: 'user_id,subcategory_id,month,year' }
    )
  }

  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des']
  const outcomesSubs = subcategories.filter(s => s.categories?.type === 'outcome')

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

      {/* Budget list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

        {/* Header — hanya tampil di sm ke atas */}
        <div className="hidden sm:grid sm:grid-cols-3 text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 border-b border-gray-100">
          <span>Kategori</span>
          <span>Subkategori</span>
          <span>Budget (Rp)</span>
        </div>

        {outcomesSubs.length === 0
          ? (
            <p className="px-5 py-8 text-sm text-gray-400 text-center">
              Belum ada subkategori outcome. Tambahkan dulu di menu Kategori.
            </p>
          )
          : outcomesSubs.map(sub => (
            <div key={sub.id} className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-gray-50 last:border-0">

              {/* Desktop: 3 kolom */}
              <span className="hidden sm:block text-xs text-gray-400 flex-1 min-w-0">
                {sub.categories?.name}
              </span>
              <span className="hidden sm:block text-sm text-gray-700 flex-1 min-w-0">
                {sub.name}
              </span>

              {/* Mobile: kategori + sub dalam satu baris */}
              <div className="sm:hidden flex flex-col flex-1 min-w-0">
                <span className="text-xs text-gray-400">{sub.categories?.name}</span>
                <span className="text-sm text-gray-700">{sub.name}</span>
              </div>

              {/* Input + tombol simpan */}
              <div className="flex gap-2 ml-auto">
                <input
                  type="number"
                  value={amounts[sub.id] || ''}
                  onChange={e => setAmounts(prev => ({ ...prev, [sub.id]: e.target.value }))}
                  placeholder="0"
                  className="w-28 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => saveBudget(sub.id)}
                  className="px-3 py-2 bg-green-50 text-green-700 text-xs rounded-lg hover:bg-green-100 transition-colors font-medium whitespace-nowrap">
                  Simpan
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}