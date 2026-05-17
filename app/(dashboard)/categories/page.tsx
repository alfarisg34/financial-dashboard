'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react'

type Category = { id: string; name: string; type: string }
type Subcategory = { id: string; name: string; category_id: string }

export default function CategoriesPage() {
  const supabase = createClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [newCatName, setNewCatName] = useState('')
  const [newCatType, setNewCatType] = useState<'income' | 'outcome'>('outcome')
  const [newSubName, setNewSubName] = useState('')
  const [selectedCatId, setSelectedCatId] = useState('')
  const [expanded, setExpanded] = useState<string[]>([])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const [{ data: cats }, { data: subs }] = await Promise.all([
      supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
      supabase.from('subcategories').select('*').eq('user_id', user.id).order('name')
    ])
    setCategories(cats || [])
    setSubcategories(subs || [])
  }

  useEffect(() => { load() }, [])

  async function addCategory() {
    if (!newCatName.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('categories').insert({ name: newCatName.trim(), type: newCatType, user_id: user?.id })
    setNewCatName(''); load()
  }

  async function deleteCategory(id: string) {
    await supabase.from('categories').delete().eq('id', id)
    load()
  }

  async function addSubcategory() {
    if (!newSubName.trim() || !selectedCatId) return
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('subcategories').insert({ name: newSubName.trim(), category_id: selectedCatId, user_id: user?.id })
    setNewSubName(''); load()
  }

  async function deleteSubcategory(id: string) {
    await supabase.from('subcategories').delete().eq('id', id)
    load()
  }

  const toggleExpand = (id: string) =>
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Manage Kategori & Subkategori</h1>

      {/* Add Category */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Tambah Kategori Baru</h2>
        <div className="flex gap-2">
          <select value={newCatType} onChange={e => setNewCatType(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
          <input type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)}
            placeholder="Nama kategori..." onKeyDown={e => e.key === 'Enter' && addCategory()}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button onClick={addCategory}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors flex items-center gap-1">
            <Plus size={16}/> Tambah
          </button>
        </div>
      </div>

      {/* Add Subcategory */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Tambah Subkategori Baru</h2>
        <div className="flex gap-2">
          <select value={selectedCatId} onChange={e => setSelectedCatId(e.target.value)}
            className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">-- Pilih Kategori Parent --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>[{c.type}] {c.name}</option>
            ))}
          </select>
          <input type="text" value={newSubName} onChange={e => setNewSubName(e.target.value)}
            placeholder="Nama subkategori..." onKeyDown={e => e.key === 'Enter' && addSubcategory()}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button onClick={addSubcategory}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-colors flex items-center gap-1">
            <Plus size={16}/> Tambah
          </button>
        </div>
      </div>

      {/* Category Tree */}
      <div className="space-y-2">
        {['income', 'outcome'].map(typeLabel => (
          <div key={typeLabel}>
            <h2 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${typeLabel === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {typeLabel === 'income' ? '📈 Income' : '📉 Outcome'}
            </h2>
            {categories.filter(c => c.type === typeLabel).map(cat => {
              const subs = subcategories.filter(s => s.category_id === cat.id)
              const isOpen = expanded.includes(cat.id)
              return (
                <div key={cat.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-2">
                  <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={() => toggleExpand(cat.id)}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 flex-1 text-left">
                      {isOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                      {cat.name}
                      <span className="text-xs text-gray-400 font-normal ml-1">({subs.length} sub)</span>
                    </button>
                    <button onClick={() => deleteCategory(cat.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                  {isOpen && subs.length > 0 && (
                    <div className="border-t border-gray-50 divide-y divide-gray-50">
                      {subs.map(sub => (
                        <div key={sub.id} className="flex items-center justify-between px-6 py-2.5">
                          <span className="text-sm text-gray-600">↳ {sub.name}</span>
                          <button onClick={() => deleteSubcategory(sub.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={13}/>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}