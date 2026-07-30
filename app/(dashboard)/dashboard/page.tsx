'use client'
import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowUpDown, ArrowUp, ArrowDown, Wallet, TrendingUp, TrendingDown, Calendar, Layers, ShieldAlert, CheckCircle2 } from 'lucide-react'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#a855f7', '#6366f1']

type Transaction = {
  id: string; type: string; amount: number; date: string; description: string
  category_id: string; subcategory_id: string; fund_source_id?: string
  categories?: { name: string }
  subcategories?: { name: string }
  fund_sources?: { name: string; icon: string; type: string }
}

type Budget = {
  subcategory_id: string
  amount: number
  type: string
}

type Subcategory = {
  id: string
  name: string
  category_id: string
  categories?: { name: string; type: string }
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
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [sortKey, setSortKey] = useState<'date' | 'type' | 'subcategory' | 'fund_source' | 'description' | 'amount'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  // Fetch transactions with categories, subcategories, and fund_sources
  useEffect(() => {
    supabase.from('transactions')
      .select('*, categories(name), subcategories(name), fund_sources(name, icon, type)')
      .gte('date', startDate).lte('date', endDate + 'T23:59:59')
      .order('date', { ascending: false })
      .then(({ data }) => setTransactions(data || []))
  }, [startDate, endDate])

  // Fetch budgets & subcategories untuk rekap
  useEffect(() => {
    async function fetchProjectionsAndRecap() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const d = new Date(startDate)
      const month = d.getMonth() + 1
      const year = d.getFullYear()

      const [{ data: budgetData }, { data: subData }] = await Promise.all([
        supabase.from('budgets').select('subcategory_id, amount, type').eq('user_id', user.id).eq('month', month).eq('year', year),
        supabase.from('subcategories').select('*, categories(name, type)').eq('user_id', user.id)
      ])

      setBudgets(budgetData || [])
      setSubcategories(subData || [])

      if (budgetData) {
        const cost = budgetData.filter(b => b.type === 'outcome').reduce((s, b) => s + b.amount, 0)
        const income = budgetData.filter(b => b.type === 'income').reduce((s, b) => s + b.amount, 0)
        setProjectedCost(cost)
        setProjectedIncome(income)
      }
    }
    fetchProjectionsAndRecap()
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

  // Rekap Budget vs Actual per Subcategory & Category
  const budgetVsActualRecap = useMemo(() => {
    // Map subcategoryId -> actual spent (outcome)
    const actualSpentMap: Record<string, number> = {}
    outcome.forEach(t => {
      if (t.subcategory_id) {
        actualSpentMap[t.subcategory_id] = (actualSpentMap[t.subcategory_id] || 0) + t.amount
      }
    })

    // Subcategories with budget or transactions
    const outcomeSubs = subcategories.filter(s => s.categories?.type === 'outcome')

    return outcomeSubs.map(sub => {
      const bObj = budgets.find(b => b.subcategory_id === sub.id && b.type === 'outcome')
      const budgetAmt = bObj?.amount || 0
      const actualAmt = actualSpentMap[sub.id] || 0
      const sisa = budgetAmt - actualAmt
      const percentage = budgetAmt > 0 ? (actualAmt / budgetAmt) * 100 : actualAmt > 0 ? 100 : 0

      return {
        id: sub.id,
        categoryName: sub.categories?.name || 'Uncategorized',
        subcategoryName: sub.name,
        budget: budgetAmt,
        actual: actualAmt,
        sisa,
        percentage
      }
    }).filter(item => item.budget > 0 || item.actual > 0)
      .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
  }, [subcategories, budgets, outcome])

  function SortIcon({ col }: { col: typeof sortKey }) {
    if (sortKey !== col) return <ArrowUpDown size={13} className="text-slate-600 ml-1 inline"/>
    return sortDir === 'asc'
      ? <ArrowUp size={13} className="text-blue-400 ml-1 inline"/>
      : <ArrowDown size={13} className="text-blue-400 ml-1 inline"/>
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
    } else if (sortKey === 'fund_source') {
      valA = a.fund_sources?.name || ''
      valB = b.fund_sources?.name || ''
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
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Title & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">DashboardKeuangan</h1>
          <p className="text-slate-400 text-xs mt-1">Ringkasan realisasi dan proyeksi anggaran Anda</p>
        </div>
        <div className="flex items-center gap-2.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <Calendar size={15} className="text-slate-400 ml-2" />
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)}
            className="bg-transparent border-none text-xs text-slate-200 focus:outline-none py-1"
          />
          <span className="text-slate-600 text-xs">–</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)}
            className="bg-transparent border-none text-xs text-slate-200 focus:outline-none py-1"
          />
        </div>
      </div>

      {/* Realization Cards */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-2">
          <TrendingUp size={14} className="text-emerald-400" />
          Realisasi Transaksi
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
            <p className="text-xs font-medium text-emerald-400 uppercase tracking-wide mb-1">Total Pemasukan</p>
            <p className="text-2xl font-bold text-emerald-400 tracking-tight">{fmt(totalIncome)}</p>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
            <p className="text-xs font-medium text-rose-400 uppercase tracking-wide mb-1">Total Pengeluaran</p>
            <p className="text-2xl font-bold text-rose-400 tracking-tight">{fmt(totalOutcome)}</p>
          </div>

          <div className={`glass-card glass-card-hover p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${actualBalance >= 0 ? 'bg-blue-500/10' : 'bg-rose-500/10'} rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none`} />
            <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${actualBalance >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
              Actual Balance
            </p>
            <p className={`text-2xl font-bold tracking-tight ${actualBalance >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
              {fmt(actualBalance)}
            </p>
            <p className={`text-xs mt-1.5 font-medium ${actualBalance >= 0 ? 'text-blue-400/80' : 'text-rose-400/80'}`}>
              {actualBalance >= 0 ? 'Surplus (+)' : '⚠️ Defisit (-)'}
            </p>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none" />
            <p className="text-xs font-medium text-purple-400 uppercase tracking-wide mb-1">Rata-rata/Hari</p>
            <p className="text-2xl font-bold text-purple-400 tracking-tight">{fmt(Math.round(avgPerDay))}</p>
          </div>
        </div>
      </div>

      {/* Projection Cards */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-2">
          <Wallet size={14} className="text-indigo-400" />
          Proyeksi Anggaran Bulan Ini
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800/80">
            <p className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-1">Projected Income</p>
            <p className="text-2xl font-bold text-indigo-300 tracking-tight">{fmt(projectedIncome)}</p>
            <p className="text-xs text-slate-400 mt-1">Target penerimaan</p>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800/80">
            <p className="text-xs font-medium text-amber-400 uppercase tracking-wide mb-1">Projected Cost</p>
            <p className="text-2xl font-bold text-amber-300 tracking-tight">{fmt(projectedCost)}</p>
            <p className="text-xs text-slate-400 mt-1">Batas pengeluaran</p>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-800/80">
            <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${projectedBalance >= 0 ? 'text-teal-400' : 'text-rose-400'}`}>
              Projected Balance
            </p>
            <p className={`text-2xl font-bold tracking-tight ${projectedBalance >= 0 ? 'text-teal-300' : 'text-rose-300'}`}>
              {fmt(projectedBalance)}
            </p>
            <p className={`text-xs mt-1 ${projectedBalance >= 0 ? 'text-teal-400/80' : 'text-rose-400/80'}`}>
              {projectedBalance >= 0 ? 'Estimasi Surplus' : '⚠️ Estimasi Defisit'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Category Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Income per Category', total: totalIncome, data: incomeByCategory, color: 'text-emerald-400' },
          { title: 'Outcome per Category', total: totalOutcome, data: outcomeByCategory, color: 'text-rose-400' }
        ].map(({ title, total, data, color }) => (
          <div key={title} className="glass-card rounded-2xl border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-slate-200">{title}</h2>
              <span className={`text-sm font-bold ${color}`}>
                Total: {fmt(total)}
              </span>
            </div>
            {data.length === 0
              ? <p className="text-sm text-slate-500 text-center py-12">Belum ada data</p>
              : <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false} fontSize={11}>
                      {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                    </Pie>
                    <Tooltip formatter={(v: any) => fmt(v)} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
            }
          </div>
        ))}
      </div>

      {/* Subcategory Pie Charts per Category */}
      {['income', 'outcome'].map(t => {
        const txs = transactions.filter(tx => tx.type === t)
        const categoryNames = [...new Set(txs.map(tx => tx.categories?.name).filter(Boolean))] as string[]
        if (categoryNames.length === 0) return null
        return (
          <div key={t} className="space-y-4">
            <h2 className={`text-sm font-bold tracking-wide ${t === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {t === 'income' ? '📈 Income' : '📉 Outcome'} per Subcategory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryNames.map(catName => {
                const catTxs = txs.filter(tx => tx.categories?.name === catName)
                const catTotal = catTxs.reduce((s, tx) => s + tx.amount, 0)
                const data = groupBy(catTxs, tx => tx.subcategories?.name || 'Lainnya')
                if (data.length === 0) return null
                return (
                  <div key={catName} className="glass-card rounded-2xl border border-slate-800 p-5">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80">
                      <h3 className="text-sm font-semibold text-slate-200">{catName}</h3>
                      <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/50">
                        {fmt(catTotal)}
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={210}>
                      <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name"
                          cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                        </Pie>
                        <Tooltip formatter={(v: any) => fmt(v)} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                        <Legend iconSize={9} wrapperStyle={{fontSize: '11px', color: '#94a3b8'}}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Section: Rekap Budget vs Actual */}
      <div className="glass-card rounded-2xl border border-slate-800 p-5">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Layers size={18} className="text-blue-400" />
          <h2 className="text-base font-bold text-white">Rekap Budget vs Actual (Pengeluaran)</h2>
        </div>

        {budgetVsActualRecap.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">Belum ada data budget atau transaksi untuk periode ini.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300 min-w-[650px]">
              <thead className="bg-slate-900/80 uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Subkategori</th>
                  <th className="px-4 py-3 text-right">Budget</th>
                  <th className="px-4 py-3 text-right">Actual Realisasi</th>
                  <th className="px-4 py-3 text-right">Sisa Budget</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {budgetVsActualRecap.map(item => {
                  const isOver = item.sisa < 0
                  return (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-400">{item.categoryName}</td>
                      <td className="px-4 py-3 font-semibold text-slate-200">{item.subcategoryName}</td>
                      <td className="px-4 py-3 text-right text-slate-300">{item.budget > 0 ? fmt(item.budget) : '-'}</td>
                      <td className="px-4 py-3 text-right font-medium text-rose-400">{fmt(item.actual)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${isOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {fmt(item.sisa)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          isOver 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : item.budget > 0
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isOver ? <ShieldAlert size={12}/> : <CheckCircle2 size={12}/>}
                          {isOver ? 'Over Budget' : item.budget > 0 ? 'On Track' : 'No Budget'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Transaction Details Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <h2 className="text-base font-bold text-white px-6 py-4 border-b border-slate-800">Detail Transaksi</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-300 min-w-[700px]">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-400 select-none" onClick={() => handleSort('date')}>
                  Tanggal & Waktu <SortIcon col="date"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-400 select-none" onClick={() => handleSort('type')}>
                  Jenis <SortIcon col="type"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-400 select-none" onClick={() => handleSort('subcategory')}>
                  Subkategori <SortIcon col="subcategory"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-400 select-none" onClick={() => handleSort('fund_source')}>
                  Sumber Dana <SortIcon col="fund_source"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-400 select-none" onClick={() => handleSort('description')}>
                  Deskripsi <SortIcon col="description"/>
                </th>
                <th className="px-5 py-3.5 text-right cursor-pointer hover:text-blue-400 select-none" onClick={() => handleSort('amount')}>
                  Nominal <SortIcon col="amount"/>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sortedTransactions.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-slate-500">Belum ada transaksi pada rentang tanggal ini</td></tr>
              ) : (
                sortedTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                      {(() => {
                        const [datePart, timePart] = t.date.split('T');
                        const timeWithoutSeconds = (timePart || '00:00').slice(0, 5);
                        const [year, month, day] = datePart.split('-');
                        return `${day}-${month}-${year} ${timeWithoutSeconds}`;
                      })()}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {t.type === 'income' ? 'Income' : 'Outcome'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-200 whitespace-nowrap">{t.subcategories?.name || '-'}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {t.fund_sources ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs">
                          <span>{t.fund_sources.icon}</span>
                          <span>{t.fund_sources.name}</span>
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 max-w-xs truncate">{t.description || '-'}</td>
                    <td className={`px-5 py-3.5 text-right font-bold whitespace-nowrap ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}