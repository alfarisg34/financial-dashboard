'use client'
import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#ec4899','#06b6d4','#84cc16']

type Transaction = {
  id: string; type: string; amount: number; date: string; description: string
  category_id: string; subcategory_id: string
  categories?: { name: string }
  subcategories?: { name: string }
}

function toLocalDate(d: Date) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
function getFirstDay(d: Date) { return toLocalDate(new Date(d.getFullYear(), d.getMonth(), 1)) }
function getLastDay(d: Date) { return toLocalDate(new Date(d.getFullYear(), d.getMonth() + 1, 0)) }

function fmt(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

export default function DashboardPage() {
  const supabase = createClient()
  const now = new Date()
  const [startDate, setStartDate] = useState(getFirstDay(now))
  const [endDate, setEndDate] = useState(getLastDay(now))
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [projectedCost, setProjectedCost] = useState(0)
  const [projectedIncome, setProjectedIncome] = useState(0)
  const [sortKey, setSortKey] = useState<'date' | 'type' | 'subcategory' | 'description' | 'amount'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    supabase.from('transactions')
      .select('*, categories(name), subcategories(name)')
      .gte('date', startDate).lte('date', endDate)
      .order('date', { ascending: false })
      .then(({ data }) => setTransactions(data || []))
  }, [startDate, endDate])

  // Fetch projected cost & income berdasarkan bulan dari startDate
  useEffect(() => {
    async function fetchProjections() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const d = new Date(startDate)
      const month = d.getMonth() + 1
      const year = d.getFullYear()

      const { data: budgets } = await supabase
        .from('budgets')
        .select('amount, type')
        .eq('user_id', user.id)
        .eq('month', month)
        .eq('year', year)

      if (!budgets) return

      const cost = budgets
        .filter(b => b.type === 'outcome')
        .reduce((s, b) => s + b.amount, 0)
      const income = budgets
        .filter(b => b.type === 'income')
        .reduce((s, b) => s + b.amount, 0)

      setProjectedCost(cost)
      setProjectedIncome(income)
    }
    fetchProjections()
  }, [startDate])

  const income = transactions.filter(t => t.type === 'income')
  const outcome = transactions.filter(t => t.type === 'outcome')
  const totalIncome = income.reduce((s, t) => s + t.amount, 0)
  const totalOutcome = outcome.reduce((s, t) => s + t.amount, 0)
  const projectedBalance = projectedIncome - projectedCost
  const actualBalance = totalIncome - totalOutcome

  const days = useMemo(() => {
    const d1 = new Date(startDate), d2 = new Date(endDate)
    return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1)
  }, [startDate, endDate])

  const avgPerDay = totalOutcome / days

  function groupBy(txs: Transaction[], key: (t: Transaction) => string) {
    const map: Record<string, number> = {}
    txs.forEach(t => { map[key(t)] = (map[key(t)] || 0) + t.amount })
    return Object.entries(map).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }))
  }

  const incomeByCategory = groupBy(income, t => t.categories?.name || 'Lainnya')
  const outcomeByCategory = groupBy(outcome, t => t.categories?.name || 'Lainnya')

  function SortIcon({ col }: { col: typeof sortKey }) {
    if (sortKey !== col) return <ArrowUpDown size={13} className="text-gray-300 ml-1 inline"/>
    return sortDir === 'asc'
      ? <ArrowUp size={13} className="text-blue-500 ml-1 inline"/>
      : <ArrowDown size={13} className="text-blue-500 ml-1 inline"/>
  }

  function handleSort(key: typeof sortKey) {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedTransactions = [...transactions].sort((a, b) => {
    let valA: any, valB: any
    if (sortKey === 'date') {
      valA = new Date(a.date).getTime()
      valB = new Date(b.date).getTime()
    } else if (sortKey === 'type') {
      valA = a.type
      valB = b.type
    } else if (sortKey === 'subcategory') {
      valA = a.subcategories?.name || ''
      valB = b.subcategories?.name || ''
    } else if (sortKey === 'description') {
      valA = a.description || ''
      valB = b.description || ''
    } else if (sortKey === 'amount') {
      valA = a.amount
      valB = b.amount
    }
    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="space-y-6">
      {/* Date filter */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-gray-500">Filter:</span>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <span className="text-gray-400">–</span>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>

      {/* Actual highlight cards */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Realisasi</p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Total Income</p>
            <p className="text-2xl font-semibold text-green-700">{fmt(totalIncome)}</p>
          </div>
          <div className="bg-red-50 rounded-2xl p-5">
            <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">Total Outcome</p>
            <p className="text-2xl font-semibold text-red-700">{fmt(totalOutcome)}</p>
          </div>
          <div className={`rounded-2xl p-5 ${actualBalance >= 0 ? 'bg-blue-50' : 'bg-rose-50'}`}>
            <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${actualBalance >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
              Actual Balance
            </p>
            <p className={`text-2xl font-semibold ${actualBalance >= 0 ? 'text-blue-700' : 'text-rose-700'}`}>
              {fmt(actualBalance)}
            </p>
            <p className={`text-xs mt-1 ${actualBalance >= 0 ? 'text-blue-500' : 'text-rose-500'}`}>
              {actualBalance >= 0 ? 'Surplus' : '⚠️ Defisit'}
            </p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-5">
            <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">Avg. Spent/Hari</p>
            <p className="text-2xl font-semibold text-purple-700">{fmt(Math.round(avgPerDay))}</p>
          </div>
        </div>
      </div>

      {/* Projected highlight cards */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Proyeksi Bulan Ini</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-2xl p-5">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">Projected Income</p>
            <p className="text-2xl font-semibold text-emerald-700">{fmt(projectedIncome)}</p>
            <p className="text-xs text-emerald-500 mt-1">Target pemasukan</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-5">
            <p className="text-xs font-medium text-orange-600 uppercase tracking-wide mb-1">Projected Cost</p>
            <p className="text-2xl font-semibold text-orange-700">{fmt(projectedCost)}</p>
            <p className="text-xs text-orange-500 mt-1">Total budget pengeluaran</p>
          </div>
          <div className={`rounded-2xl p-5 ${projectedBalance >= 0 ? 'bg-teal-50' : 'bg-rose-50'}`}>
            <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${projectedBalance >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
              Projected Balance
            </p>
            <p className={`text-2xl font-semibold ${projectedBalance >= 0 ? 'text-teal-700' : 'text-rose-700'}`}>
              {fmt(projectedBalance)}
            </p>
            <p className={`text-xs mt-1 ${projectedBalance >= 0 ? 'text-teal-500' : 'text-rose-500'}`}>
              {projectedBalance >= 0 ? 'Surplus' : '⚠️ Defisit'}
            </p>
          </div>
        </div>
      </div>

      {/* Big pie charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Income per Kategori', data: incomeByCategory },
          { title: 'Outcome per Kategori', data: outcomeByCategory }
        ].map(({ title, data }) => (
          <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
            {data.length === 0
              ? <p className="text-sm text-gray-400 text-center py-8">Tidak ada data</p>
              : <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false} fontSize={11}>
                      {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                    </Pie>
                    <Tooltip formatter={(v: any) => fmt(v)}/>
                  </PieChart>
                </ResponsiveContainer>
            }
          </div>
        ))}
      </div>

      {/* Subcategory pie charts per category */}
      {['income', 'outcome'].map(t => {
        const txs = transactions.filter(tx => tx.type === t)
        const categoryNames = [...new Set(txs.map(tx => tx.categories?.name).filter(Boolean))] as string[]
        if (categoryNames.length === 0) return null
        return (
          <div key={t}>
            <h2 className={`text-sm font-semibold mb-3 ${t === 'income' ? 'text-green-700' : 'text-red-700'}`}>
              {t === 'income' ? '📈 Income' : '📉 Outcome'} per Subkategori
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryNames.map(catName => {
                const catTxs = txs.filter(tx => tx.categories?.name === catName)
                const data = groupBy(catTxs, tx => tx.subcategories?.name || 'Lainnya')
                if (data.length === 0) return null
                return (
                  <div key={catName} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">{catName}</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name"
                          cx="50%" cy="50%" outerRadius={65} innerRadius={30}>
                          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                        </Pie>
                        <Tooltip formatter={(v: any) => fmt(v)}/>
                        <Legend iconSize={10} wrapperStyle={{fontSize: '11px'}}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      {/* Detail table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <h2 className="text-sm font-semibold text-gray-700 px-5 py-4 border-b border-gray-100">Detail Transaksi</h2>
        <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[600px]">
      <thead>
      <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wide">
            <th className="px-5 py-3 text-left cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort('date')}>
              Tanggal <SortIcon col="date"/>
            </th>
            <th className="px-5 py-3 text-left cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort('type')}>
              Jenis <SortIcon col="type"/>
            </th>
            <th className="px-5 py-3 text-left cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort('subcategory')}>
              Subkategori <SortIcon col="subcategory"/>
            </th>
            <th className="px-5 py-3 text-left cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort('description')}>
              Deskripsi <SortIcon col="description"/>
            </th>
            <th className="px-5 py-3 text-right cursor-pointer hover:text-blue-600 select-none"
              onClick={() => handleSort('amount')}>
              Jumlah <SortIcon col="amount"/>
            </th>
      </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
            {sortedTransactions.length === 0
              ? <tr><td colSpan={5} className="text-center py-8 text-gray-400">Belum ada transaksi</td></tr>
              : sortedTransactions.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-600">
                    {new Date(t.date).toLocaleString('id-ID', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                      hour12: false,
                      timeZone: 'Asia/Jakarta'
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${t.type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {t.type === 'income' ? 'Income' : 'Outcome'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{t.subcategories?.name || '-'}</td>
                  <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{t.description || '-'}</td>
                  <td className={`px-5 py-3 text-right font-medium ${t.type === 'income' ? 'text-green-700' : 'text-red-700'}`}>
                    {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                </tr>
              ))
            }
      </tbody>
      </table>
        </div>
      </div>
    </div>
  )
}