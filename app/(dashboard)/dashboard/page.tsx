'use client'
import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  ArrowUpDown, ArrowUp, ArrowDown, Wallet, TrendingUp, TrendingDown, 
  Calendar, Layers, ShieldAlert, CheckCircle2, Clock, Sparkles, AlertTriangle, Receipt
} from 'lucide-react'

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ec4899', 
  '#8b5cf6', '#06b6d4', '#14b8a6', '#6366f1', 
  '#f43f5e', '#84cc16'
]

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

function formatDisplayDate(dateStr: string) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function DashboardPage() {
  const supabase = createClient()
  const now = new Date()
  const [startDate, setStartDate] = useState(getFirstDay(now))
  const [endDate, setEndDate] = useState(toLocalDate(now))
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [projectedCost, setProjectedCost] = useState(0)
  const [projectedIncome, setProjectedIncome] = useState(0)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [sortKey, setSortKey] = useState<'date' | 'type' | 'subcategory' | 'fund_source' | 'description' | 'amount'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  type RekapSortKey = 'categoryName' | 'subcategoryName' | 'budget' | 'actual' | 'sisa' | 'statusText'
  const [rekapSortKey, setRekapSortKey] = useState<RekapSortKey>('categoryName')
  const [rekapSortDir, setRekapSortDir] = useState<'asc' | 'desc'>('asc')

  const handleRekapSort = (key: RekapSortKey) => {
    if (rekapSortKey === key) {
      setRekapSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setRekapSortKey(key)
      setRekapSortDir('asc')
    }
  }

  function RekapSortIcon({ col }: { col: RekapSortKey }) {
    if (rekapSortKey !== col) return <ArrowUpDown size={12} className="inline ml-1 opacity-40" />
    return rekapSortDir === 'asc' ? (
      <ArrowUp size={12} className="inline ml-1 text-blue-500" />
    ) : (
      <ArrowDown size={12} className="inline ml-1 text-blue-500" />
    )
  }

  // Fetch transactions with categories, subcategories, and fund_sources
  useEffect(() => {
    if (!startDate || !endDate) return
    const [sYear, sMonth, sDay] = startDate.split('-').map(Number)
    const [eYear, eMonth, eDay] = endDate.split('-').map(Number)
    const startUtc = new Date(sYear, sMonth - 1, sDay, 0, 0, 0, 0).toISOString()
    const endUtc = new Date(eYear, eMonth - 1, eDay, 23, 59, 59, 999).toISOString()

    supabase.from('transactions')
      .select('*, categories(name), subcategories(name), fund_sources(name, icon, type)')
      .gte('date', startUtc).lte('date', endUtc)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
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
    return Object.entries(map)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }

  const incomeByCategory = groupBy(income, t => t.categories?.name || 'Lainnya')
  const outcomeByCategory = groupBy(outcome, t => t.categories?.name || 'Lainnya')

  // Rekap Budget vs Actual per Subcategory & Category
  const budgetVsActualRecap = useMemo(() => {
    const actualSpentMap: Record<string, number> = {}
    outcome.forEach(t => {
      if (t.subcategory_id) {
        actualSpentMap[t.subcategory_id] = (actualSpentMap[t.subcategory_id] || 0) + t.amount
      }
    })

    const outcomeSubs = subcategories.filter(s => s.categories?.type === 'outcome')

    const list = outcomeSubs.map(sub => {
      const bObj = budgets.find(b => b.subcategory_id === sub.id && b.type === 'outcome')
      const budgetAmt = bObj?.amount || 0
      const actualAmt = actualSpentMap[sub.id] || 0
      const sisa = budgetAmt - actualAmt
      const percentage = budgetAmt > 0 ? (actualAmt / budgetAmt) * 100 : actualAmt > 0 ? 100 : 0
      const isOver = sisa < 0
      const statusText = isOver ? 'Over Budget' : budgetAmt > 0 ? 'On Track' : 'No Budget'

      return {
        id: sub.id,
        categoryName: sub.categories?.name || 'Uncategorized',
        subcategoryName: sub.name,
        budget: budgetAmt,
        actual: actualAmt,
        sisa,
        percentage,
        statusText
      }
    }).filter(item => item.budget > 0 || item.actual > 0)

    return list.sort((a, b) => {
      const valA = a[rekapSortKey]
      const valB = b[rekapSortKey]

      if (typeof valA === 'string' && typeof valB === 'string') {
        const comp = valA.localeCompare(valB, 'id', { sensitivity: 'base' })
        return rekapSortDir === 'asc' ? comp : -comp
      } else {
        const numA = Number(valA) || 0
        const numB = Number(valB) || 0
        return rekapSortDir === 'asc' ? numA - numB : numB - numA
      }
    })
  }, [subcategories, budgets, outcome, rekapSortKey, rekapSortDir])

  function SortIcon({ col }: { col: typeof sortKey }) {
    if (sortKey !== col) return <ArrowUpDown size={12} className="text-[var(--text-muted)] opacity-50 ml-1 inline"/>
    return sortDir === 'asc'
      ? <ArrowUp size={12} className="text-blue-500 ml-1 inline"/>
      : <ArrowDown size={12} className="text-blue-500 ml-1 inline"/>
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

  // Custom Recharts Tooltip
  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="glass-card p-3 rounded-xl border border-[var(--border-default)] shadow-xl text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.payload.fill || data.color }} />
            <span className="font-semibold text-[var(--text-primary)]">{data.name}</span>
          </div>
          <p className="font-bold text-[var(--text-primary)] tabular-nums pl-4.5">
            {fmt(data.value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">

      {/* Header & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-5 sm:p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
              <Sparkles size={17} />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Dashboard Keuangan
            </h1>
          </div>
          <p className="text-[var(--text-muted)] text-xs sm:text-sm pl-10.5">
            Ringkasan realisasi transaksi dan proyeksi anggaran Anda
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg-surface-elevated)] p-1.5 rounded-xl border border-[var(--border-subtle)] shadow-inner self-start sm:self-auto">
          <Calendar size={15} className="text-[var(--text-muted)] ml-2 shrink-0" />
          <input 
            type="date" 
            value={startDate} 
            onChange={e => setStartDate(e.target.value)}
            className="bg-transparent border-none text-xs text-[var(--text-primary)] font-medium focus:outline-none py-1 cursor-pointer"
          />
          <span className="text-[var(--text-muted)] text-xs">–</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={e => setEndDate(e.target.value)}
            className="bg-transparent border-none text-xs text-[var(--text-primary)] font-medium focus:outline-none py-1 cursor-pointer"
          />
        </div>
      </div>

      {/* Realization Cards (Bento Grid) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-500" />
            Realisasi Transaksi Periode Ini
          </p>
          <span className="text-[11px] text-[var(--text-muted)] font-medium bg-[var(--bg-surface-elevated)] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)]">
            {days} Hari Tercatat
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card: Total Pemasukan */}
          <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                Total Pemasukan
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform">
                <ArrowUp size={16} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight tabular-nums">
              {fmt(totalIncome)}
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5 flex items-center gap-1">
              <span>{income.length} transaksi masuk</span>
            </p>
          </div>

          {/* Card: Total Pengeluaran */}
          <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                Total Pengeluaran
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 group-hover:scale-105 transition-transform">
                <ArrowDown size={16} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight tabular-nums">
              {fmt(totalOutcome)}
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5 flex items-center gap-1">
              <span>{outcome.length} transaksi keluar</span>
            </p>
          </div>

          {/* Card: Actual Balance */}
          <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold uppercase tracking-wide ${actualBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                Actual Balance
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border group-hover:scale-105 transition-transform ${
                actualBalance >= 0 
                  ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
                  : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
              }`}>
                <Wallet size={16} />
              </div>
            </div>
            <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums ${
              actualBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'
            }`}>
              {fmt(actualBalance)}
            </p>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                actualBalance >= 0 ? 'badge-emerald' : 'badge-rose'
              }`}>
                {actualBalance >= 0 ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                {actualBalance >= 0 ? 'Surplus (+)' : 'Defisit (-)'}
              </span>
            </div>
          </div>

          {/* Card: Rata-rata / Hari */}
          <div className="glass-card glass-card-hover p-5 rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                Rata-rata/Hari
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 group-hover:scale-105 transition-transform">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 tracking-tight tabular-nums">
              {fmt(Math.round(avgPerDay))}
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5">
              Rata-rata belanja harian
            </p>
          </div>
        </div>
      </div>

      {/* Proyeksi & Rekomendasi Pengeluaran Akhir Bulan */}
      {(() => {
        const startDateObj = new Date(startDate)
        const totalDaysInMonth = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 1, 0).getDate()
        const projectedMonthEndCost = avgPerDay * totalDaysInMonth
        
        const passedDays = Math.min(days, totalDaysInMonth)
        const remainingDays = Math.max(1, totalDaysInMonth - passedDays)
        const remainingAllowedForIncome = projectedIncome - totalOutcome
        const recommendedDailyLimit = Math.max(0, remainingAllowedForIncome / remainingDays)

        const isProjectedOverIncome = projectedIncome > 0 && projectedMonthEndCost > projectedIncome

        return (
          <div>
            <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3.5 flex items-center gap-2">
              <TrendingDown size={14} className="text-amber-500" />
              Estimasi & Rekomendasi Pengeluaran
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card glass-card-hover p-5 sm:p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    Perkiraan Pengeluaran Akhir Bulan
                  </p>
                  <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface-elevated)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    {totalDaysInMonth} Hari Penuh
                  </span>
                </div>
                <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums ${
                  isProjectedOverIncome ? 'text-rose-500' : 'text-amber-600 dark:text-amber-300'
                }`}>
                  {fmt(Math.round(projectedMonthEndCost))}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1.5">
                  Berdasarkan laju rata-rata {fmt(Math.round(avgPerDay))}/hari
                </p>
                {isProjectedOverIncome && (
                  <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle size={14} className="shrink-0" />
                    <span>Melebihi Target Income ({fmt(projectedIncome)})</span>
                  </div>
                )}
              </div>

              <div className="glass-card glass-card-hover p-5 sm:p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
                    Rekomendasi Maks. Belanja/Hari
                  </p>
                  <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-surface-elevated)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    Sisa {remainingDays} Hari
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-300 tracking-tight tabular-nums">
                  {fmt(Math.round(recommendedDailyLimit))}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1.5">
                  {projectedIncome > 0 ? (
                    <>Alokasi aman per hari agar pengeluaran tidak melampaui Projected Income</>
                  ) : (
                    <>Tentukan target Projected Income pada menu Budget terlebih dahulu</>
                  )}
                </p>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Target & Proyeksi Anggaran Bulan Ini */}
      <div>
        <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3.5 flex items-center gap-2">
          <Wallet size={14} className="text-indigo-500" />
          Target & Proyeksi Anggaran Bulan Ini
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card glass-card-hover p-5 rounded-2xl">
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">
              Projected Income
            </p>
            <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-300 tracking-tight tabular-nums">
              {fmt(projectedIncome)}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">Target pemasukan bulan ini</p>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">
              Projected Cost
            </p>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-300 tracking-tight tabular-nums">
              {fmt(projectedCost)}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">Batas total alokasi pengeluaran</p>
          </div>

          <div className="glass-card glass-card-hover p-5 rounded-2xl">
            <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
              projectedBalance >= 0 ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-400'
            }`}>
              Projected Balance
            </p>
            <p className={`text-2xl font-extrabold tracking-tight tabular-nums ${
              projectedBalance >= 0 ? 'text-teal-600 dark:text-teal-300' : 'text-rose-600 dark:text-rose-400'
            }`}>
              {fmt(projectedBalance)}
            </p>
            <p className={`text-xs mt-1.5 font-medium ${
              projectedBalance >= 0 ? 'text-teal-600/90 dark:text-teal-400/90' : 'text-rose-600/90 dark:text-rose-400/90'
            }`}>
              {projectedBalance >= 0 ? 'Estimasi Surplus (+) ' : '⚠️ Estimasi Defisit (-)'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Category Donut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Pemasukan per Kategori', total: totalIncome, data: incomeByCategory, color: 'text-emerald-500', badge: 'badge-emerald' },
          { title: 'Pengeluaran per Kategori', total: totalOutcome, data: outcomeByCategory, color: 'text-rose-500', badge: 'badge-rose' }
        ].map(({ title, total, data, color, badge }) => (
          <div key={title} className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
              <h2 className="text-sm font-bold text-[var(--text-primary)]">{title}</h2>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full tabular-nums ${badge}`}>
                Total: {fmt(total)}
              </span>
            </div>
            {data.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-[var(--text-muted)] text-xs">
                <Receipt size={28} className="opacity-40 mb-2" />
                <p>Belum ada data transaksi</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie 
                    data={data} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={3}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    labelLine={false} 
                    fontSize={11}
                  >
                    {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--card-border)" strokeWidth={1} />)}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        ))}
      </div>

      {/* Subcategory Pie Charts per Category */}
      {['income', 'outcome'].map(t => {
        const txs = transactions.filter(tx => tx.type === t)
        const rawCategoryNames = [...new Set(txs.map(tx => tx.categories?.name).filter(Boolean))] as string[]
        const categoryData = rawCategoryNames
          .map(catName => {
            const catTxs = txs.filter(tx => tx.categories?.name === catName)
            const catTotal = catTxs.reduce((s, tx) => s + tx.amount, 0)
            const data = groupBy(catTxs, tx => tx.subcategories?.name || 'Lainnya')
            return { catName, catTotal, data }
          })
          .filter(item => item.data.length > 0)
          .sort((a, b) => b.catTotal - a.catTotal)

        if (categoryData.length === 0) return null
        return (
          <div key={t} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${t === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              <h2 className={`text-sm font-bold tracking-wide ${t === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {t === 'income' ? 'Detail Subkategori Pemasukan' : 'Detail Subkategori Pengeluaran'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryData.map(({ catName, catTotal, data }) => {
                return (
                  <div key={catName} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-subtle)]">
                      <h3 className="text-sm font-bold text-[var(--text-primary)]">{catName}</h3>
                      <span className="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] tabular-nums">
                        {fmt(catTotal)}
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={210}>
                      <PieChart>
                        <Pie 
                          data={data} 
                          dataKey="value" 
                          nameKey="name"
                          cx="50%" 
                          cy="50%" 
                          outerRadius={70} 
                          innerRadius={36}
                          paddingAngle={2}
                        >
                          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--card-border)" strokeWidth={1} />)}
                        </Pie>
                        <Tooltip content={<CustomChartTooltip />} />
                        <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', color: 'var(--text-muted)' }} />
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
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
              <Layers size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Rekap Anggaran vs Realisasi (Pengeluaran)
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Pantau sisa kuota dan persentase penggunaan per subkategori
              </p>
            </div>
          </div>
        </div>

        {budgetVsActualRecap.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)] text-xs">
            <Layers size={32} className="opacity-30 mx-auto mb-2" />
            <p>Belum ada data anggaran atau transaksi untuk periode ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left min-w-[700px]">
              <thead className="bg-[var(--bg-surface-elevated)] uppercase font-bold text-[var(--text-muted)] tracking-wider border-b border-[var(--border-subtle)]">
                <tr>
                  <th className="px-5 py-3.5 cursor-pointer hover:text-blue-500 select-none transition-colors" onClick={() => handleRekapSort('categoryName')}>
                    Kategori <RekapSortIcon col="categoryName"/>
                  </th>
                  <th className="px-5 py-3.5 cursor-pointer hover:text-blue-500 select-none transition-colors" onClick={() => handleRekapSort('subcategoryName')}>
                    Subkategori <RekapSortIcon col="subcategoryName"/>
                  </th>
                  <th className="px-5 py-3.5 text-right cursor-pointer hover:text-blue-500 select-none transition-colors" onClick={() => handleRekapSort('budget')}>
                    Anggaran <RekapSortIcon col="budget"/>
                  </th>
                  <th className="px-5 py-3.5 text-right cursor-pointer hover:text-blue-500 select-none transition-colors" onClick={() => handleRekapSort('actual')}>
                    Realisasi <RekapSortIcon col="actual"/>
                  </th>
                  <th className="px-5 py-3.5 text-right cursor-pointer hover:text-blue-500 select-none transition-colors" onClick={() => handleRekapSort('sisa')}>
                    Sisa Anggaran <RekapSortIcon col="sisa"/>
                  </th>
                  <th className="px-5 py-3.5 text-center cursor-pointer hover:text-blue-500 select-none transition-colors" onClick={() => handleRekapSort('statusText')}>
                    Status <RekapSortIcon col="statusText"/>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {budgetVsActualRecap.map(item => {
                  const isOver = item.sisa < 0
                  const pct = Math.min(100, Math.round(item.percentage))
                  return (
                    <tr key={item.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors">
                      <td className="px-5 py-3.5 font-medium text-[var(--text-muted)]">{item.categoryName}</td>
                      <td className="px-5 py-3.5 font-semibold text-[var(--text-primary)]">
                        <div>
                          <span>{item.subcategoryName}</span>
                          {item.budget > 0 && (
                            <div className="w-24 h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden mt-1.5">
                              <div 
                                className={`h-full rounded-full transition-all ${
                                  isOver ? 'bg-rose-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right text-[var(--text-secondary)] font-medium tabular-nums">
                        {item.budget > 0 ? fmt(item.budget) : '-'}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-rose-500 tabular-nums">
                        {fmt(item.actual)}
                      </td>
                      <td className={`px-5 py-3.5 text-right font-bold tabular-nums ${
                        isOver ? 'text-rose-500' : 'text-emerald-500'
                      }`}>
                        {fmt(item.sisa)}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          isOver 
                            ? 'badge-rose' 
                            : item.budget > 0
                            ? 'badge-emerald'
                            : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
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
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <Receipt size={16} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Rincian Transaksi</h2>
              <p className="text-xs text-[var(--text-muted)]">Daftar transaksi yang tercatat dalam rentang waktu yang dipilih</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[var(--text-muted)] bg-[var(--bg-surface-elevated)] px-3 py-1 rounded-full border border-[var(--border-subtle)] tabular-nums">
            {sortedTransactions.length} Transaksi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[720px]">
            <thead>
              <tr className="bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] font-bold uppercase tracking-wider border-b border-[var(--border-subtle)]">
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-500 select-none" onClick={() => handleSort('date')}>
                  Tanggal & Waktu <SortIcon col="date"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-500 select-none" onClick={() => handleSort('type')}>
                  Jenis <SortIcon col="type"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-500 select-none" onClick={() => handleSort('subcategory')}>
                  Subkategori <SortIcon col="subcategory"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-500 select-none" onClick={() => handleSort('fund_source')}>
                  Sumber Dana <SortIcon col="fund_source"/>
                </th>
                <th className="px-5 py-3.5 text-left cursor-pointer hover:text-blue-500 select-none" onClick={() => handleSort('description')}>
                  Deskripsi <SortIcon col="description"/>
                </th>
                <th className="px-5 py-3.5 text-right cursor-pointer hover:text-blue-500 select-none" onClick={() => handleSort('amount')}>
                  Nominal <SortIcon col="amount"/>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[var(--text-muted)]">
                    <Receipt size={28} className="opacity-30 mx-auto mb-2" />
                    Belum ada transaksi pada rentang tanggal ini
                  </td>
                </tr>
              ) : (
                sortedTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors">
                    <td className="px-5 py-3.5 text-[var(--text-muted)] whitespace-nowrap tabular-nums">
                      {formatDisplayDate(t.date)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        t.type === 'income' ? 'badge-emerald' : 'badge-rose'
                      }`}>
                        {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      {t.subcategories?.name || '-'}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      {t.fund_sources ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-medium">
                          <span>{t.fund_sources.icon}</span>
                          <span>{t.fund_sources.name}</span>
                        </span>
                      ) : (
                        <span className="text-[var(--text-muted)] text-xs">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-[var(--text-secondary)] max-w-xs truncate" title={t.description || ''}>
                      {t.description || '-'}
                    </td>
                    <td className={`px-5 py-3.5 text-right font-extrabold whitespace-nowrap tabular-nums ${
                      t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
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