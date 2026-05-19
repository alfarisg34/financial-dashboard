'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown, Check } from 'lucide-react'

type Category = { id: string; name: string; type: string }
type Subcategory = { id: string; name: string; category_id: string }

function fmt(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

export default function InputPage() {
  const supabase = createClient()
  const [type, setType] = useState<'income' | 'outcome'>('outcome')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [subcategoryName, setSubcategoryName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => {
    const now = new Date()
    const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000)
    return wib.toISOString().slice(0, 16)
  })
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [allSubcategories, setAllSubcategories] = useState<Subcategory[]>([])
  const [success, setSuccess] = useState('')
  const [budgetInfo, setBudgetInfo] = useState<{ budget: number; spent: number } | null>(null)
  const [loadingBudget, setLoadingBudget] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Load semua categories & subcategories sekaligus
  useEffect(() => {
    async function loadAll() {
      const [{ data: cats }, { data: subs }] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('subcategories').select('*')
      ])
      setCategories(cats || [])
      setAllSubcategories(subs || [])
    }
    loadAll()
  }, [])

  // Reset saat type berubah
  useEffect(() => {
    setCategoryId('')
    setCategoryName('')
    setSubcategoryId('')
    setSubcategoryName('')
    setSearch('')
    setBudgetInfo(null)
    setDropdownOpen(false)
  }, [type])

  // Fetch budget info
  useEffect(() => {
    if (!subcategoryId || type !== 'outcome') { setBudgetInfo(null); return }
    async function fetchBudgetInfo() {
      setLoadingBudget(true)
      const selectedDate = new Date(date)
      const month = selectedDate.getMonth() + 1
      const year = selectedDate.getFullYear()
      const startOfMonth = `${year}-${String(month).padStart(2, '0')}-01T00:00:00+07:00`
      const lastDay = new Date(year, month, 0).getDate()
      const endOfMonth = `${year}-${String(month).padStart(2, '0')}-${lastDay}T23:59:59+07:00`
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const [{ data: budgetData }, { data: txData }] = await Promise.all([
        supabase.from('budgets').select('amount')
          .eq('user_id', user.id).eq('subcategory_id', subcategoryId)
          .eq('month', month).eq('year', year).eq('type', 'outcome').single(),
        supabase.from('transactions').select('amount')
          .eq('user_id', user.id).eq('subcategory_id', subcategoryId)
          .eq('type', 'outcome').gte('date', startOfMonth).lte('date', endOfMonth)
      ])
      const budget = budgetData?.amount || 0
      const spent = (txData || []).reduce((s: number, t: any) => s + t.amount, 0)
      setBudgetInfo({ budget, spent })
      setLoadingBudget(false)
    }
    fetchBudgetInfo()
  }, [subcategoryId, date])

  // Close dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search saat dropdown buka
  useEffect(() => {
    if (dropdownOpen) setTimeout(() => searchRef.current?.focus(), 50)
  }, [dropdownOpen])

  // Semua subcategory berdasarkan type, dikelompokkan dengan category name
  const filteredSubs = allSubcategories
    .filter(s => {
      const cat = categories.find(c => c.id === s.category_id)
      return cat?.type === type
    })
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .map(s => ({
      ...s,
      categoryName: categories.find(c => c.id === s.category_id)?.name || ''
    }))

  function selectSubcategory(sub: typeof filteredSubs[0]) {
    setSubcategoryId(sub.id)
    setSubcategoryName(sub.name)
    setCategoryId(sub.category_id)
    setCategoryName(sub.categoryName)
    setDropdownOpen(false)
    setSearch('')
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredSubs.length > 0) selectSubcategory(filteredSubs[0])
    }
    if (e.key === 'Escape') {
      setDropdownOpen(false)
      setSearch('')
    }
  }

  const sisa = budgetInfo ? budgetInfo.budget - budgetInfo.spent : 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      type,
      category_id: categoryId || null,
      subcategory_id: subcategoryId || null,
      amount: parseFloat(amount),
      description,
      date
    })
    if (!error) {
      setSuccess('Transaksi berhasil disimpan!')
      setAmount(''); setDescription('')
      setCategoryId(''); setCategoryName('')
      setSubcategoryId(''); setSubcategoryName('')
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
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">Rp</span>
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={e => {
                const numeric = e.target.value.replace(/[^0-9]/g, '')
                setAmount(numeric === '' ? '' : new Intl.NumberFormat('id-ID').format(parseInt(numeric, 10)))
              }}
              placeholder="0"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Tanggal</label>
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
        </div>

        {/* Subcategory searchable dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Sub Kategori</label>
          <div className="relative" ref={dropdownRef}>

            {/* Trigger */}
            <button type="button" onClick={() => setDropdownOpen(prev => !prev)}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-colors
                ${dropdownOpen ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'}
                ${subcategoryId ? 'text-gray-800' : 'text-gray-400'}`}>
              <span>{subcategoryId ? subcategoryName : '-- Pilih Subkategori --'}</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {/* Search input */}
                <div className="p-2 border-b border-gray-100">
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Cari subkategori..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* List */}
                <ul className="max-h-56 overflow-y-auto">
                  {filteredSubs.length === 0
                    ? <li className="px-4 py-3 text-sm text-gray-400 text-center">Tidak ditemukan</li>
                    : filteredSubs.map((sub, idx) => (
                      <li key={sub.id}>
                        {/* Tampilkan category header jika berbeda dari sebelumnya */}
                        {(idx === 0 || filteredSubs[idx - 1].categoryName !== sub.categoryName) && (
                          <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50">
                            {sub.categoryName}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => selectSubcategory(sub)}
                          className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-blue-50 transition-colors
                            ${idx === 0 && search ? 'bg-blue-50/50' : ''}
                            ${subcategoryId === sub.id ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                          <span>{sub.name}</span>
                          {subcategoryId === sub.id && <Check size={14} className="text-blue-600"/>}
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Category (auto-fill, readonly) */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Kategori</label>
          <div className={`w-full px-4 py-3 rounded-xl border text-sm
            ${categoryName ? 'border-gray-200 text-gray-700 bg-gray-50' : 'border-gray-200 text-gray-400 bg-gray-50'}`}>
            {categoryName || 'Otomatis terisi setelah pilih subkategori'}
          </div>
        </div>

        {/* Budget info */}
        {subcategoryId && type === 'outcome' && (
          <div>
            {loadingBudget ? (
              <div className="text-xs text-gray-400 px-4 py-3 bg-gray-50 rounded-xl">
                Mengambil info budget...
              </div>
            ) : budgetInfo && budgetInfo.budget > 0 ? (
              <div className={`px-4 py-3 rounded-xl space-y-1 ${sisa >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
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
                {sisa < 0 && <p className="text-xs text-red-500 pt-0.5">⚠️ Budget sudah melebihi batas!</p>}
              </div>
            ) : (
              <div className="text-xs text-gray-400 px-4 py-3 bg-gray-50 rounded-xl">
                Belum ada budget untuk subkategori ini di bulan yang dipilih.
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