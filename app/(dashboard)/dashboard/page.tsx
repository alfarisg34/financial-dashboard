'use client'
import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

  useEffect(() => {
    supabase.from('transactions')
      .select('*, categories(name), subcategories(name)')
      .gte('date', startDate).lte('date', endDate)
      .order('date', { ascending: false })
      .then(({ data }) => setTransactions(data || []))
  }, [startDate, endDate])

  const income = transactions.filter(t => t.type === 'income')
  const outcome = transactions.filter(t => t.type === 'outcome')
  const totalIncome = income.reduce((s, t) => s + t.amount, 0)
  const totalOutcome = outcome.reduce((s, t) => s + t.amount, 0)

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
  const incomeBySubcategory = groupBy(income, t => t.subcategories?.name || 'Lainnya')
  const outcomeBySubcategory = groupBy(outcome, t => t.subcategories?.name || 'Lainnya')

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

      {/* Highlight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-2xl p-5">
          <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Total Income</p>
          <p className="text-2xl font-semibold text-green-700">{fmt(totalIncome)}</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-5">
          <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">Total Outcome</p>
          <p className="text-2xl font-semibold text-red-700">{fmt(totalOutcome)}</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-5">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Avg. Spent/Hari</p>
          <p className="text-2xl font-semibold text-blue-700">{fmt(Math.round(avgPerDay))}</p>
        </div>
      </div>

      {/* Big pie charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Income per Kategori', data: incomeByCategory, color: '#10b981' },
          { title: 'Outcome per Kategori', data: outcomeByCategory, color: '#ef4444' }
        ].map(({ title, data }) => (
          <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
            {data.length === 0
              ? <p className="text-sm text-gray-400 text-center py-8">Tidak ada data</p>
              : <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%` } labelLine={false} fontSize={11}>
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
                <th className="px-5 py-3 text-left">Tanggal</th>
                <th className="px-5 py-3 text-left">Jenis</th>
                {/* <th className="px-5 py-3 text-left">Kategori</th> */}
                <th className="px-5 py-3 text-left">Subkategori</th>
                <th className="px-5 py-3 text-left">Deskripsi</th>
                <th className="px-5 py-3 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.length === 0
                ? <tr><td colSpan={6} className="text-center py-8 text-gray-400">Belum ada transaksi</td></tr>
                : transactions.map(t => (
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
                    {/* <td className="px-5 py-3 text-gray-600">{t.categories?.name || '-'}</td> */}
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