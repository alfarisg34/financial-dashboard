'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Category = { id: string; name: string; type: string }
type Subcategory = { id: string; name: string; category_id: string }

function fmt(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

export default function InputPage() {
  const supabase = createClient()
  const [type, setType] = useState<'income' | 'outcome'>('outcome')
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => {
    const now = new Date()
    const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    return wib.toISOString().slice(0, 16)
  })
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [success, setSuccess] = useState('')
  const [budgetInfo, setBudgetInfo] = useState<{ budget: number; spent: number } | null>(null)
  const [loadingBudget, setLoadingBudget] = useState(false)

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data || []))
  }, [])

  useEffect(() => {
    setCategoryId('')
    setSubcategoryId('')
    setSearch('')
    setBudgetInfo(null)
  }, [type])

  useEffect(() => {
    if (!categoryId) { setSubcategories([]); return }
    supabase.from('subcategories').select('*')
      .eq('category_id', categoryId)
      .then(({ data }) => setSubcategories(data || []))
  }, [categoryId])

  useEffect(() => {
    if (!subcategoryId || type !== 'outcome') { setBudgetInfo(null); return }

    async function fetchBudgetInfo() {
      setLoadingBudget(true)

      // Ambil bulan & tahun dari input date
      const selectedDate = new Date(date)
      const month = selectedDate.getMonth() + 1
      const year = selectedDate.getFullYear()

      // Hitung start & end bulan (WIB)
      const startOfMonth = `${year}-${String(month).padStart(2, '0')}-01T00:00:00+07:00`
      const lastDay = new Date(year, month, 0).getDate()
      const endOfMonth = `${year}-${String(month).padStart(2, '0')}-${lastDay}T23:59:59+07:00`

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: budgetData }, { data: txData }] = await Promise.all([
        supabase.from('budgets')
          .select('amount')
          .eq('user_id', user.id)
          .eq('subcategory_id', subcategoryId)
          .eq('month', month)
          .eq('year', year)
          .single(),
        supabase.from('transactions')
          .select('amount')
          .eq('user_id', user.id)
          .eq('subcategory_id', subcategoryId)
          .eq('type', 'outcome')
          .gte('date', startOfMonth)
          .lte('date', endOfMonth)
      ])

      const budget = budgetData?.amount || 0
      const spent = (txData || []).reduce((s: number, t: any) => s + t.amount, 0)
      setBudgetInfo({ budget, spent })
      setLoadingBudget(false)
    }

    fetchBudgetInfo()
  }, [subcategoryId, date])

  const filteredCategories = categories.filter(c => c.type === type)
  const filteredSubs = subcategories.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )
  const selectedCategory = categories.find(c => c.id === categoryId)
  const sisa = budgetInfo ? budgetInfo.budget - budgetInfo.spent : 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      type, category_id: categoryId || null,
      subcategory_id: subcategoryId || null,
      amount: parseFloat(amount), description, date
    })

    if (!error) {
      setSuccess('Transaksi berhasil disimpan!')
      setAmount(''); setDescription(''); setCategoryId(''); setSubcategoryId('')
      setSearch(''); setBudgetInfo(null)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  return (
    <div className="max-w-xl w-full">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Input Transaksi</h1>
      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        {/* Type toggle */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Jenis Transaksi</label>
          <div className="flex gap-2">
            {(['income', 'outcome'] as const).map(t => (
              <button key={t} type="button" onClick={() => setType(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${type === t
                    ? t === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                {t === 'income' ? '📈 Income' : '📉 Outcome'}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Jumlah (Rp)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
            placeholder="0" required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Tanggal</label>
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Kategori</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
            <option value="">-- Pilih Kategori --</option>
            {filteredCategories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Subcategory with search */}
        {categoryId && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Subkategori <span className="text-gray-400 font-normal">({selectedCategory?.name})</span>
            </label>
            <input type="text" placeholder="Cari subkategori..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-2"/>
            <select value={subcategoryId} onChange={e => setSubcategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
              <option value="">-- Pilih Subkategori --</option>
              {filteredSubs.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            {/* Budget info */}
            {subcategoryId && type === 'outcome' && (
              <div className="mt-3">
                {loadingBudget ? (
                  <div className="text-xs text-gray-400 px-4 py-3 bg-gray-50 rounded-xl">
                    Mengambil info budget...
                  </div>
                ) : budgetInfo && budgetInfo.budget > 0 ? (
                  <div className={`px-4 py-3 rounded-xl text-sm space-y-1
                    ${sisa >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Budget bulan ini</span>
                      <span>{fmt(budgetInfo.budget)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Sudah dipakai</span>
                      <span className="text-red-600">{fmt(budgetInfo.spent)}</span>
                    </div>
                    <div className={`flex justify-between text-xs font-semibold pt-1 border-t
                      ${sisa >= 0 ? 'border-green-200 text-green-700' : 'border-red-200 text-red-700'}`}>
                      <span>Sisa budget</span>
                      <span>{fmt(sisa)}</span>
                    </div>
                    {sisa < 0 && (
                      <p className="text-xs text-red-500 pt-0.5">⚠️ Budget sudah melebihi batas!</p>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 px-4 py-3 bg-gray-50 rounded-xl">
                    Belum ada budget untuk subkategori ini di bulan yang dipilih.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Deskripsi</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Catatan tambahan..." rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"/>
        </div>

        <button type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Simpan Transaksi
        </button>
      </form>
    </div>
  )
}