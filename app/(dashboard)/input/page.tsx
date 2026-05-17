'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

type Category = { id: string; name: string; type: string }
type Subcategory = { id: string; name: string; category_id: string }

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

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data }) => setCategories(data || []))
  }, [])

  useEffect(() => {
    setCategoryId('')
    setSubcategoryId('')
    setSearch('')
  }, [type])

  useEffect(() => {
    if (!categoryId) { setSubcategories([]); return }
    supabase.from('subcategories').select('*')
      .eq('category_id', categoryId)
      .then(({ data }) => setSubcategories(data || []))
  }, [categoryId])

  const filteredCategories = categories.filter(c => c.type === type)
  const filteredSubs = subcategories.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )
  const selectedCategory = categories.find(c => c.id === categoryId)

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
      setAmount(''); setDescription(''); setCategoryId(''); setSubcategoryId(''); setSearch('')
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