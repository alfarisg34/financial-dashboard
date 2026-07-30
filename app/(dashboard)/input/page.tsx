'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown, Check, Pencil, Trash2, X, Landmark, Plus } from 'lucide-react'

type Category = { id: string; name: string; type: string }
type Subcategory = { id: string; name: string; category_id: string }
type FundSource = { id: string; name: string; icon: string; type: string }

type Transaction = {
  id: string
  type: 'income' | 'outcome'
  category_id: string | null
  subcategory_id: string | null
  fund_source_id: string | null
  amount: number
  description: string
  date: string
  category_name?: string
  subcategory_name?: string
  fund_source_name?: string
  fund_source_icon?: string
}

function fmt(n: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

function formatThousands(value: string | number): string {
  const numStr = String(value).replace(/[^0-9]/g, '')
  if (!numStr) return ''
  return new Intl.NumberFormat('id-ID').format(parseInt(numStr, 10))
}

function parseNumber(formattedStr: string): number {
  return parseInt(formattedStr.replace(/[^0-9]/g, ''), 10) || 0
}

export default function InputPage() {
  const supabase = createClient()
  const [type, setType] = useState<'income' | 'outcome'>('outcome')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [subcategoryName, setSubcategoryName] = useState('')
  const [fundSourceId, setFundSourceId] = useState('')
  const [displayAmount, setDisplayAmount] = useState('') // Formatted amount for UI (e.g., 120.000)
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
  const [fundSources, setFundSources] = useState<FundSource[]>([])
  const [success, setSuccess] = useState('')
  const [budgetInfo, setBudgetInfo] = useState<{ budget: number; spent: number } | null>(null)
  const [loadingBudget, setLoadingBudget] = useState(false)

  // State untuk daftar transaksi (Last 30 Transactions)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(false)

  // State untuk modal edit
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [editDisplayAmount, setEditDisplayAmount] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editSubcategoryId, setEditSubcategoryId] = useState('')
  const [editSubcategoryName, setEditSubcategoryName] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
  const [editCategoryName, setEditCategoryName] = useState('')
  const [editFundSourceId, setEditFundSourceId] = useState('')
  const [editSearch, setEditSearch] = useState('')
  const [editDropdownOpen, setEditDropdownOpen] = useState(false)
  const editDropdownRef = useRef<HTMLDivElement>(null)
  const editSearchRef = useRef<HTMLInputElement>(null)

  // State untuk modal delete
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; transactionId: string | null }>({ show: false, transactionId: null })

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Load categories, subcategories, and fund_sources
  useEffect(() => {
    async function loadAll() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: cats }, { data: subs }, { data: sources }] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('subcategories').select('*'),
        supabase.from('fund_sources').select('*').eq('user_id', user.id).order('name')
      ])

      setCategories(cats || [])
      setAllSubcategories(subs || [])
      setFundSources(sources || [])

      // Auto-select first fund source if available
      if (sources && sources.length > 0) {
        setFundSourceId(sources[0].id)
      }
    }
    loadAll()
  }, [])

  // Reset subcategory saat type berubah
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
          .eq('month', month).eq('year', year).eq('type', 'outcome').maybeSingle(),
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

  // Load Last 30 Transactions
  async function loadTransactions() {
    setLoadingTransactions(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoadingTransactions(false)
      return
    }

    const { data: txData, error } = await supabase
      .from('transactions')
      .select('*, fund_sources(name, icon)')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(30)

    if (error) {
      console.error('Error loading transactions:', error)
      setLoadingTransactions(false)
      return
    }

    const enriched = (txData || []).map(tx => ({
      ...tx,
      category_name: categories.find(c => c.id === tx.category_id)?.name || '',
      subcategory_name: allSubcategories.find(s => s.id === tx.subcategory_id)?.name || '',
      fund_source_name: tx.fund_sources?.name || '',
      fund_source_icon: tx.fund_sources?.icon || '💰'
    }))

    setTransactions(enriched)
    setLoadingTransactions(false)
  }

  useEffect(() => {
    if (categories.length > 0 || allSubcategories.length > 0) {
      loadTransactions()
    }
  }, [categories, allSubcategories])

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (editDropdownRef.current && !editDropdownRef.current.contains(e.target as Node)) {
        setEditDropdownOpen(false)
        setEditSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (dropdownOpen) setTimeout(() => searchRef.current?.focus(), 50)
  }, [dropdownOpen])

  useEffect(() => {
    if (editDropdownOpen) setTimeout(() => editSearchRef.current?.focus(), 50)
  }, [editDropdownOpen])

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
    .sort((a, b) => {
      if (a.categoryName !== b.categoryName) {
        return a.categoryName.localeCompare(b.categoryName)
      }
      return a.name.localeCompare(b.name)
    })

  const editFilteredSubs = allSubcategories
    .filter(s => {
      const cat = categories.find(c => c.id === s.category_id)
      return cat?.type === editingTransaction?.type
    })
    .filter(s => s.name.toLowerCase().includes(editSearch.toLowerCase()))
    .map(s => ({
      ...s,
      categoryName: categories.find(c => c.id === s.category_id)?.name || ''
    }))
    .sort((a, b) => {
      if (a.categoryName !== b.categoryName) {
        return a.categoryName.localeCompare(b.categoryName)
      }
      return a.name.localeCompare(b.name)
    })

  function selectSubcategory(sub: typeof filteredSubs[0]) {
    setSubcategoryId(sub.id)
    setSubcategoryName(sub.name)
    setCategoryId(sub.category_id)
    setCategoryName(sub.categoryName)
    setDropdownOpen(false)
    setSearch('')
  }

  function selectEditSubcategory(sub: typeof editFilteredSubs[0]) {
    setEditSubcategoryId(sub.id)
    setEditSubcategoryName(sub.name)
    setEditCategoryId(sub.category_id)
    setEditCategoryName(sub.categoryName)
    setEditDropdownOpen(false)
    setEditSearch('')
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

  function handleEditSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (editFilteredSubs.length > 0) selectEditSubcategory(editFilteredSubs[0])
    }
    if (e.key === 'Escape') {
      setEditDropdownOpen(false)
      setEditSearch('')
    }
  }

  const handleAmountInputChange = (val: string) => {
    setDisplayAmount(formatThousands(val))
  }

  const handleEditAmountInputChange = (val: string) => {
    setEditDisplayAmount(formatThousands(val))
  }

  const sisa = budgetInfo ? budgetInfo.budget - budgetInfo.spent : 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const numericAmount = parseNumber(displayAmount)
    if (!numericAmount) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      type,
      category_id: categoryId || null,
      subcategory_id: subcategoryId || null,
      fund_source_id: fundSourceId || null,
      amount: numericAmount,
      description,
      date
    })

    if (!error) {
      setSuccess('Transaksi berhasil disimpan!')
      setDisplayAmount('')
      setDescription('')
      setCategoryId('')
      setCategoryName('')
      setSubcategoryId('')
      setSubcategoryName('')
      setSearch('')
      setBudgetInfo(null)
      loadTransactions()
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  async function handleEditSubmit() {
    if (!editingTransaction) return
    const numericAmount = parseNumber(editDisplayAmount)
    if (!numericAmount) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const updateData: any = {
      amount: numericAmount,
      description: editDescription,
      date: editDate,
      fund_source_id: editFundSourceId || null
    }

    if (editSubcategoryId) {
      updateData.subcategory_id = editSubcategoryId
      updateData.category_id = editCategoryId || null
    }

    const { error } = await supabase
      .from('transactions')
      .update(updateData)
      .eq('id', editingTransaction.id)
      .eq('user_id', user.id)

    if (!error) {
      setEditingTransaction(null)
      loadTransactions()
      setSuccess('Transaksi berhasil diupdate!')
      setTimeout(() => setSuccess(''), 3000)
    } else {
      alert('Gagal mengupdate transaksi')
    }
  }

  async function handleDelete() {
    if (!deleteConfirm.transactionId) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', deleteConfirm.transactionId)
      .eq('user_id', user.id)

    if (!error) {
      setDeleteConfirm({ show: false, transactionId: null })
      loadTransactions()
      setSuccess('Transaksi berhasil dihapus!')
      setTimeout(() => setSuccess(''), 3000)
    } else {
      alert('Gagal menghapus transaksi')
    }
  }

  function openEditModal(transaction: Transaction) {
    setEditingTransaction(transaction)
    setEditDisplayAmount(formatThousands(transaction.amount))
    setEditDescription(transaction.description || '')
    setEditDate(transaction.date.slice(0, 16))
    setEditSubcategoryId(transaction.subcategory_id || '')
    setEditSubcategoryName(transaction.subcategory_name || '')
    setEditCategoryId(transaction.category_id || '')
    setEditCategoryName(transaction.category_name || '')
    setEditFundSourceId(transaction.fund_source_id || '')
    setEditSearch('')
    setEditDropdownOpen(false)
  }

  return (
    <div className="max-w-2xl w-full mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <h1 className="text-xl font-bold text-white mb-1">Input Transaksi</h1>
        <p className="text-xs text-slate-400">Catat transaksi pemasukan atau pengeluaran Anda</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm animate-fade-in">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-slate-800 p-6 space-y-5">

        {/* Type toggle */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Jenis Transaksi</label>
          <div className="grid grid-cols-2 gap-3">
            {(['income', 'outcome'] as const).map(t => (
              <button key={t} type="button" onClick={() => setType(t)}
                className={`py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2
                  ${type === t
                    ? t === 'income' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10' 
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:bg-slate-800/80'}`}>
                {t === 'income' ? '📈 Income (Pemasukan)' : '📉 Outcome (Pengeluaran)'}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Nominal (Rp)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold pointer-events-none">Rp</span>
            <input 
              type="text" 
              inputMode="numeric"
              value={displayAmount} 
              onChange={e => handleAmountInputChange(e.target.value)}
              placeholder="0"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm font-semibold outline-none"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Tanggal & Waktu</label>
          <input 
            type="datetime-local" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm outline-none"
          />
        </div>

        {/* Sumber Dana */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block flex items-center justify-between">
            <span>Sumber Dana</span>
            <span className="text-[11px] text-blue-400 font-normal lowercase">opsional</span>
          </label>
          <select 
            value={fundSourceId} 
            onChange={e => setFundSourceId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm outline-none cursor-pointer"
          >
            <option value="" className="bg-slate-900 text-slate-100">-- Tanpa Sumber Dana --</option>
            {fundSources.map(fs => (
              <option key={fs.id} value={fs.id} className="bg-slate-900 text-slate-100">
                {fs.icon} {fs.name} ({fs.type})
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory searchable dropdown */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Subkategori</label>
          <div className="relative" ref={dropdownRef}>
            <button 
              type="button" 
              onClick={() => setDropdownOpen(prev => !prev)}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-all outline-none cursor-pointer bg-slate-900
                ${dropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-800'}
                ${subcategoryId ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
              <span>{subcategoryId ? subcategoryName : '-- Pilih Subkategori --'}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

            {dropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="p-2 border-b border-slate-800">
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Cari subkategori..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <ul className="max-h-56 overflow-y-auto divide-y divide-slate-800/40">
                  {filteredSubs.length === 0 ? (
                    <li className="px-4 py-3 text-sm text-slate-500 text-center">Tidak ditemukan</li>
                  ) : (
                    filteredSubs.map((sub, idx) => (
                      <li key={sub.id}>
                        {(idx === 0 || filteredSubs[idx - 1].categoryName !== sub.categoryName) && (
                          <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/80">
                            {sub.categoryName}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => selectSubcategory(sub)}
                          className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors cursor-pointer hover:bg-blue-600 hover:text-white group
                            ${subcategoryId === sub.id ? 'text-blue-400 font-semibold bg-blue-500/10' : 'text-slate-300'}`}>
                          <span>{sub.name}</span>
                          {subcategoryId === sub.id && <Check size={14} className="text-blue-400 group-hover:text-white"/>}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Category (auto-fill, readonly) */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Kategori Parent</label>
          <div className="w-full px-4 py-3 rounded-xl border border-slate-800/80 text-sm text-slate-400 bg-slate-950/50">
            {categoryName || 'Otomatis terisi setelah memilih subkategori'}
          </div>
        </div>

        {/* Budget info */}
        {subcategoryId && type === 'outcome' && (
          <div>
            {loadingBudget ? (
              <div className="text-xs text-slate-400 px-4 py-3 bg-slate-900/60 rounded-xl border border-slate-800">
                Memuat info budget...
              </div>
            ) : budgetInfo && budgetInfo.budget > 0 ? (
              <div className={`px-4 py-3 rounded-xl space-y-1.5 border ${sisa >= 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'}`}>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Budget bulan ini</span>
                  <span className="font-semibold text-slate-200">{fmt(budgetInfo.budget)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Sudah terpakai</span>
                  <span className="font-semibold text-rose-400">{fmt(budgetInfo.spent)}</span>
                </div>
                <div className={`flex justify-between text-xs font-bold pt-1.5 border-t ${sisa >= 0 ? 'border-emerald-500/20 text-emerald-400' : 'border-rose-500/20 text-rose-400'}`}>
                  <span>Sisa budget</span>
                  <span>{fmt(sisa)}</span>
                </div>
                {sisa < 0 && <p className="text-[11px] text-rose-400 font-semibold pt-0.5">⚠️ Perhatian: Budget sudah melebih batas!</p>}
              </div>
            ) : (
              <div className="text-xs text-slate-500 px-4 py-3 bg-slate-950/40 rounded-xl border border-slate-800">
                Belum ada alokasi budget untuk subkategori ini di bulan yang dipilih.
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Deskripsi / Catatan</label>
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)}
            placeholder="Catatan tambahan..." 
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm resize-none outline-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all cursor-pointer"
        >
          Simpan Transaksi
        </button>
      </form>

      {/* Last 30 Transactions List */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-white mb-4">Last 30 Transactions</h2>
        
        {loadingTransactions ? (
          <div className="text-center py-8 text-slate-500">Memuat transaksi...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-slate-500 glass-card rounded-xl border border-slate-800">
            Belum ada transaksi recorded.
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="glass-card glass-card-hover rounded-xl border border-slate-800 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {tx.type === 'income' ? 'Income' : 'Outcome'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {(() => {
                          const [date, time] = tx.date.slice(0, 16).split('T');
                          const [year, month, day] = date.split('-');
                          return `${day}-${month}-${year} ${time}`;
                        })()}
                      </span>
                      {tx.fund_source_name && (
                        <span className="text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span>{tx.fund_source_icon}</span>
                          <span>{tx.fund_source_name}</span>
                        </span>
                      )}
                    </div>
                    <div className={`text-lg font-bold ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      {tx.subcategory_name && (
                        <span className="bg-slate-800/80 font-medium text-slate-200 px-2 py-0.5 rounded">
                          {tx.subcategory_name}
                        </span>
                      )}
                      {tx.category_name && (
                        <span className="text-slate-500">
                          ({tx.category_name})
                        </span>
                      )}
                    </div>
                    {tx.description && (
                      <div className="text-xs text-slate-400 mt-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                        📝 {tx.description}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1.5 ml-4">
                    <button
                      onClick={() => openEditModal(tx)}
                      className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ show: true, transactionId: tx.id })}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Edit */}
      {editingTransaction && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <h3 className="font-bold text-white">Edit Transaksi</h3>
              <button onClick={() => setEditingTransaction(null)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Jenis Transaksi</label>
                <div className={`px-4 py-2.5 rounded-xl text-sm font-bold ${editingTransaction.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                  {editingTransaction.type === 'income' ? '📈 Income' : '📉 Outcome'}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Jumlah (Rp)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={editDisplayAmount}
                  onChange={e => handleEditAmountInputChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 text-sm font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Tanggal & Waktu</label>
                <input
                  type="datetime-local"
                  value={editDate}
                  onChange={e => setEditDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 text-sm outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Sumber Dana</label>
                <select 
                  value={editFundSourceId} 
                  onChange={e => setEditFundSourceId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-slate-100 text-sm outline-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-100">-- Tanpa Sumber Dana --</option>
                  {fundSources.map(fs => (
                    <option key={fs.id} value={fs.id} className="bg-slate-900 text-slate-100">
                      {fs.icon} {fs.name} ({fs.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Subkategori</label>
                <div className="relative" ref={editDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setEditDropdownOpen(prev => !prev)}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900 text-sm text-left flex items-center justify-between outline-none cursor-pointer ${editSubcategoryId ? 'text-slate-100 font-medium' : 'text-slate-400'}`}
                  >
                    <span>{editSubcategoryId ? editSubcategoryName : '-- Pilih Subkategori --'}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${editDropdownOpen ? 'rotate-180' : ''}`}/>
                  </button>

                  {editDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden">
                      <div className="p-2 border-b border-slate-800">
                        <input
                          ref={editSearchRef}
                          type="text"
                          value={editSearch}
                          onChange={e => setEditSearch(e.target.value)}
                          onKeyDown={handleEditSearchKeyDown}
                          placeholder="Cari subkategori..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <ul className="max-h-56 overflow-y-auto">
                        {editFilteredSubs.map((sub, idx) => (
                          <li key={sub.id}>
                            <button
                              type="button"
                              onClick={() => selectEditSubcategory(sub)}
                              className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between transition-colors cursor-pointer hover:bg-blue-600 hover:text-white group
                                ${editSubcategoryId === sub.id ? 'text-blue-400 font-semibold bg-blue-500/10' : 'text-slate-300'}`}
                            >
                              <span>{sub.name}</span>
                              {editSubcategoryId === sub.id && <Check size={14} className="text-blue-400 group-hover:text-white"/>}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 block">Deskripsi</label>
                <textarea
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 text-sm resize-none outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-slate-800">
              <button
                onClick={() => setEditingTransaction(null)}
                className="flex-1 py-3 rounded-xl border border-slate-800 text-slate-400 font-medium hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl max-w-sm w-full border border-slate-800">
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Trash2 size={24} className="text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hapus Transaksi?</h3>
              <p className="text-xs text-slate-400">Apakah anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="flex gap-3 p-5 border-t border-slate-800">
              <button
                onClick={() => setDeleteConfirm({ show: false, transactionId: null })}
                className="flex-1 py-3 rounded-xl border border-slate-800 text-slate-400 font-medium hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-500 transition-colors cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}