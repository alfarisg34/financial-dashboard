'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Plus, ChevronDown, ChevronRight, FolderPlus, Tag } from 'lucide-react'

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
    if (!confirm('Hapus kategori ini beserta seluruh subkategorinya?')) return
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
    <div className="max-w-2xl w-full mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800">
        <h1 className="text-xl font-bold text-white mb-1">Kategori & Subkategori</h1>
        <p className="text-xs text-slate-400">Kelola hirarki kategori transaksi finansial Anda</p>
      </div>

      {/* Add Category */}
      <div className="glass-card rounded-2xl border border-slate-800 p-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <FolderPlus size={16} className="text-blue-400" />
          Tambah Kategori Baru
        </h2>
        <div className="flex flex-wrap gap-2.5">
          <select
            value={newCatType}
            onChange={e => setNewCatType(e.target.value as any)}
            className="bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm font-semibold text-slate-200 outline-none cursor-pointer">
            <option value="income" className="bg-slate-900 text-slate-200">Income</option>
            <option value="outcome" className="bg-slate-900 text-slate-200">Outcome</option>
          </select>
          <input
            type="text"
            value={newCatName}
            onChange={e => setNewCatName(e.target.value)}
            placeholder="Nama kategori baru..."
            onKeyDown={e => e.key === 'Enter' && addCategory()}
            className="flex-1 min-w-0 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-sm text-slate-200 outline-none"/>
          <button
            onClick={addCategory}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
            <Plus size={16}/> Tambah
          </button>
        </div>
      </div>

      {/* Add Subcategory */}
      <div className="glass-card rounded-2xl border border-slate-800 p-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Tag size={16} className="text-indigo-400" />
          Tambah Subkategori Baru
        </h2>
        <div className="flex flex-wrap gap-2.5">
          <select
            value={selectedCatId}
            onChange={e => setSelectedCatId(e.target.value)}
            className="w-full sm:flex-1 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm font-semibold text-slate-200 outline-none cursor-pointer">
            <option value="" className="bg-slate-900 text-slate-400">-- Pilih Kategori Parent --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">[{c.type === 'income' ? 'Income' : 'Outcome'}] {c.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={newSubName}
            onChange={e => setNewSubName(e.target.value)}
            placeholder="Nama subkategori..."
            onKeyDown={e => e.key === 'Enter' && addSubcategory()}
            className="flex-1 min-w-0 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-sm text-slate-200 outline-none"/>
          <button
            onClick={addSubcategory}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer">
            <Plus size={16}/> Tambah
          </button>
        </div>
      </div>

      {/* Category Tree */}
      <div className="space-y-6">
        {['income', 'outcome'].map(typeLabel => (
          <div key={typeLabel}>
            <h2 className={`text-xs font-bold uppercase tracking-wider mb-3 ${typeLabel === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {typeLabel === 'income' ? '📈 Kategori Income (Pemasukan)' : '📉 Kategori Outcome (Pengeluaran)'}
            </h2>
            <div className="space-y-2">
              {categories.filter(c => c.type === typeLabel).length === 0 ? (
                <p className="text-xs text-slate-500 py-2">Belum ada kategori {typeLabel}</p>
              ) : (
                categories.filter(c => c.type === typeLabel).map(cat => {
                  const subs = subcategories.filter(s => s.category_id === cat.id)
                  const isOpen = expanded.includes(cat.id)
                  return (
                    <div key={cat.id} className="glass-card rounded-xl border border-slate-800 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-800/40 transition-colors">
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className="flex items-center gap-2.5 text-sm font-semibold text-slate-200 flex-1 text-left min-w-0 cursor-pointer">
                          {isOpen ? <ChevronDown size={17} className="shrink-0 text-blue-400"/> : <ChevronRight size={17} className="shrink-0 text-slate-400"/>}
                          <span className="truncate">{cat.name}</span>
                          <span className="text-xs text-slate-500 font-normal ml-1 shrink-0">({subs.length} sub)</span>
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0 ml-2 cursor-pointer">
                          <Trash2 size={15}/>
                        </button>
                      </div>
                      {isOpen && (
                        <div className="bg-slate-950/60 border-t border-slate-800/80 divide-y divide-slate-800/40">
                          {subs.length === 0 ? (
                            <p className="text-xs text-slate-600 px-6 py-3 italic">Belum ada subkategori</p>
                          ) : (
                            subs.map(sub => (
                              <div key={sub.id} className="flex items-center justify-between px-6 py-2.5 hover:bg-slate-900/60 transition-colors">
                                <span className="text-xs text-slate-300 truncate min-w-0 mr-2 font-medium">↳ {sub.name}</span>
                                <button
                                  onClick={() => deleteSubcategory(sub.id)}
                                  className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0 cursor-pointer">
                                  <Trash2 size={13}/>
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}