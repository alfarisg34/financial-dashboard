'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronDown, Check, Pencil, Trash2, X } from 'lucide-react'

type Category = { id: string; name: string; type: string }
type Subcategory = { id: string; name: string; category_id: string }

type Transaction = {
  id: string
  type: 'income' | 'outcome'
  category_id: string | null
  subcategory_id: string | null
  amount: number
  description: string
  date: string
  category_name?: string
  subcategory_name?: string
}

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

  // State untuk daftar transaksi
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(false)

  // State untuk modal edit
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [editAmount, setEditAmount] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editSubcategoryId, setEditSubcategoryId] = useState('')
  const [editSubcategoryName, setEditSubcategoryName] = useState('')
  const [editCategoryId, setEditCategoryId] = useState('')
  const [editCategoryName, setEditCategoryName] = useState('')
  const [editSearch, setEditSearch] = useState('')
  const [editDropdownOpen, setEditDropdownOpen] = useState(false)
  const editDropdownRef = useRef<HTMLDivElement>(null)
  const editSearchRef = useRef<HTMLInputElement>(null)

  // State untuk modal delete
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; transactionId: string | null }>({ show: false, transactionId: null })

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

  // Load transactions (30 hari terakhir)
  async function loadTransactions() {
    setLoadingTransactions(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setLoadingTransactions(false)
      return
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const startDate = thirtyDaysAgo.toISOString()

    const { data: txData, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error loading transactions:', error)
      setLoadingTransactions(false)
      return
    }

    // Enrich dengan nama kategori dan subkategori
    const enriched = (txData || []).map(tx => ({
      ...tx,
      category_name: categories.find(c => c.id === tx.category_id)?.name || '',
      subcategory_name: allSubcategories.find(s => s.id === tx.subcategory_id)?.name || ''
    }))

    setTransactions(enriched)
    setLoadingTransactions(false)
  }

  // Reload transactions ketika categories atau subcategories berubah
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

  // Close edit dropdown saat klik di luar
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

  // Focus search saat dropdown buka
  useEffect(() => {
    if (dropdownOpen) setTimeout(() => searchRef.current?.focus(), 50)
  }, [dropdownOpen])

  useEffect(() => {
    if (editDropdownOpen) setTimeout(() => editSearchRef.current?.focus(), 50)
  }, [editDropdownOpen])

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
    .sort((a, b) => {
      // Urutkan berdasarkan categoryName terlebih dahulu
      if (a.categoryName !== b.categoryName) {
        return a.categoryName.localeCompare(b.categoryName)
      }
      // Kemudian urutkan berdasarkan name
      return a.name.localeCompare(b.name)
    })

  // Untuk edit modal
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
      // Urutkan berdasarkan categoryName terlebih dahulu
      if (a.categoryName !== b.categoryName) {
        return a.categoryName.localeCompare(b.categoryName)
      }
      // Kemudian urutkan berdasarkan name
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
      setAmount('')
      setDescription('')
      setCategoryId('')
      setCategoryName('')
      setSubcategoryId('')
      setSubcategoryName('')
      setSearch('')
      setBudgetInfo(null)
      loadTransactions() // Reload daftar transaksi
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  async function handleEditSubmit() {
    if (!editingTransaction) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const updateData: any = {
      amount: parseFloat(editAmount),
      description: editDescription,
      date: editDate,
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
    setEditAmount(transaction.amount.toString())
    setEditDescription(transaction.description || '')
    setEditDate(transaction.date.slice(0, 16))
    setEditSubcategoryId(transaction.subcategory_id || '')
    setEditSubcategoryName(transaction.subcategory_name || '')
    setEditCategoryId(transaction.category_id || '')
    setEditCategoryName(transaction.category_name || '')
    setEditSearch('')
    setEditDropdownOpen(false)
  }

  return (
    <div className="max-w-xl w-full mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Transaction Input</h1>
      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">

        {/* Type toggle */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Type of Transaction</label>
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
          <label className="text-sm font-medium text-gray-700 mb-2 block">Amount (Rp)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">Rp</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
          <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
        </div>

        {/* Subcategory searchable dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Subcategory</label>
          <div className="relative" ref={dropdownRef}>

            {/* Trigger */}
            <button type="button" onClick={() => setDropdownOpen(prev => !prev)}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-colors
                ${dropdownOpen ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'}
                ${subcategoryId ? 'text-gray-800' : 'text-gray-400'}`}>
              <span>{subcategoryId ? subcategoryName : '-- Choose Subcategory --'}</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                <div className="p-2 border-b border-gray-100">
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Find subcategory..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <ul className="max-h-56 overflow-y-auto">
                  {filteredSubs.length === 0
                    ? <li className="px-4 py-3 text-sm text-gray-400 text-center">Tidak ditemukan</li>
                    : filteredSubs.map((sub, idx) => (
                      <li key={sub.id}>
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
          <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
          <div className={`w-full px-4 py-3 rounded-xl border text-sm
            ${categoryName ? 'border-gray-200 text-gray-700 bg-gray-50' : 'border-gray-200 text-gray-400 bg-gray-50'}`}>
            {categoryName || 'Automatically filled after selecting a subcategory'}
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
          <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Additional notes..." rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"/>
        </div>

        <button type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
          Save Transaction
        </button>
      </form>

      {/* Daftar Transaksi 30 Hari Terakhir */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Last 30 Days Transactions</h2>
        
        {loadingTransactions ? (
          <div className="text-center py-8 text-gray-400">Memuat transaksi...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-gray-100">
            Belum ada transaksi dalam 30 hari terakhir
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tx.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {tx.type === 'income' ? 'Income' : 'Outcome'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {(() => {
                          const [date, time] = tx.date.slice(0, 16).split('T');
                          const [year, month, day] = date.split('-');
                          return `${day}-${month}-${year} ${time}`;
                        })()}
                      </span>
                    </div>
                    <div className="font-semibold text-gray-800">
                      {fmt(tx.amount)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {tx.subcategory_name && (
                        <span className="inline-block bg-gray-100 rounded-md px-2 py-0.5 text-xs mr-2">
                          {tx.subcategory_name}
                        </span>
                      )}
                      {tx.category_name && (
                        <span className="text-xs text-gray-400">
                          {tx.category_name}
                        </span>
                      )}
                    </div>
                    {tx.description && (
                      <div className="text-xs text-gray-400 mt-2">
                        📝 {tx.description}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openEditModal(tx)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ show: true, transactionId: tx.id })}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Edit Transaksi</h3>
              <button onClick={() => setEditingTransaction(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Type (readonly) */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Jenis Transaksi</label>
                <div className={`px-4 py-3 rounded-xl text-sm ${editingTransaction.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {editingTransaction.type === 'income' ? '📈 Income' : '📉 Outcome'}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Jumlah (Rp)</label>
                <input
                  type="number"
                  value={editAmount}
                  onChange={e => setEditAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tanggal</label>
                <input
                  type="datetime-local"
                  value={editDate}
                  onChange={e => setEditDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Subcategory Edit */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sub Kategori</label>
                <div className="relative" ref={editDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setEditDropdownOpen(prev => !prev)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-colors
                      ${editDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'}
                      ${editSubcategoryId ? 'text-gray-800' : 'text-gray-400'}`}
                  >
                    <span>{editSubcategoryId ? editSubcategoryName : '-- Pilih Subkategori --'}</span>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${editDropdownOpen ? 'rotate-180' : ''}`}/>
                  </button>

                  {editDropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      <div className="p-2 border-b border-gray-100">
                        <input
                          ref={editSearchRef}
                          type="text"
                          value={editSearch}
                          onChange={e => setEditSearch(e.target.value)}
                          onKeyDown={handleEditSearchKeyDown}
                          placeholder="Cari subkategori..."
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <ul className="max-h-56 overflow-y-auto">
                        {editFilteredSubs.length === 0
                          ? <li className="px-4 py-3 text-sm text-gray-400 text-center">Tidak ditemukan</li>
                          : editFilteredSubs.map((sub, idx) => (
                            <li key={sub.id}>
                              {(idx === 0 || editFilteredSubs[idx - 1].categoryName !== sub.categoryName) && (
                                <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50">
                                  {sub.categoryName}
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => selectEditSubcategory(sub)}
                                className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-blue-50 transition-colors
                                  ${editSubcategoryId === sub.id ? 'text-blue-700 font-medium' : 'text-gray-700'}`}
                              >
                                <span>{sub.name}</span>
                                {editSubcategoryId === sub.id && <Check size={14} className="text-blue-600"/>}
                              </button>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Category (readonly) */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Kategori</label>
                <div className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-gray-50">
                  {editCategoryName || 'Otomatis terisi setelah pilih subkategori'}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Deskripsi</label>
                <textarea
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setEditingTransaction(null)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleEditSubmit}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full">
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Hapus Transaksi?</h3>
              <p className="text-sm text-gray-500">Apakah anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.</p>
            </div>
            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setDeleteConfirm({ show: false, transactionId: null })}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
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