'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Plus, ChevronDown, ChevronRight, Pencil, Check, X, ShieldAlert, Sparkles } from 'lucide-react'
import { FALLBACK_CATEGORIES } from '@/lib/seedUser'

type Category = { id: string; name: string; type: string }
type Subcategory = { id: string; name: string; category_id: string }

export default function CategoriesPage() {
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [expanded, setExpanded] = useState<string[]>([])

  // State for category creation
  const [addingCatType, setAddingCatType] = useState<'income' | 'outcome' | null>(null)
  const [addingCatName, setAddingCatName] = useState('')

  // State for subcategory creation
  const [addingSubCatId, setAddingSubCatId] = useState<string | null>(null)
  const [addingSubName, setAddingSubName] = useState('')

  // State for category and subcategory editing
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [editingCatName, setEditingCatName] = useState('')
  const [editingSubId, setEditingSubId] = useState<string | null>(null)
  const [editingSubName, setEditingSubName] = useState('')

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    const adminCheck = user.email === 'admin@fintrack.com' || profile?.role === 'admin'
    setIsAdmin(adminCheck)

    if (adminCheck) {
      // Load default categories from default_seeds table
      const { data: seedRow } = await supabase
        .from('default_seeds')
        .select('data')
        .eq('id', 'categories')
        .maybeSingle()

      const rawList = seedRow?.data && Array.isArray(seedRow.data) ? seedRow.data : FALLBACK_CATEGORIES
      
      // Transform to flat Category[] and Subcategory[] format
      const cats: Category[] = []
      const subs: Subcategory[] = []

      rawList.forEach((c: any, cIdx: number) => {
        const catId = `def-cat-${cIdx}`
        cats.push({ id: catId, name: c.name, type: c.type })
        const subList = c.subcategories || []
        subList.forEach((sName: string, sIdx: number) => {
          subs.push({ id: `def-sub-${cIdx}-${sIdx}`, name: sName, category_id: catId })
        })
      })

      setCategories(cats)
      setSubcategories(subs)
    } else {
      const [{ data: cats }, { data: subs }] = await Promise.all([
        supabase.from('categories').select('*').eq('user_id', user.id).order('name'),
        supabase.from('subcategories').select('*').eq('user_id', user.id).order('name')
      ])
      setCategories(cats || [])
      setSubcategories(subs || [])
    }
  }

  useEffect(() => { load() }, [])

  // Helper to persist admin seeds to default_seeds table
  async function syncAdminSeeds(newCats: Category[], newSubs: Subcategory[]) {
    const dataToSave = newCats.map(c => ({
      name: c.name,
      type: c.type,
      subcategories: newSubs.filter(s => s.category_id === c.id).map(s => s.name)
    }))

    await supabase
      .from('default_seeds')
      .upsert({ id: 'categories', data: dataToSave, updated_at: new Date().toISOString() })
  }

  async function handleAddCategory(type: 'income' | 'outcome') {
    if (!addingCatName.trim()) return
    const name = addingCatName.trim()

    if (isAdmin) {
      const newCat: Category = { id: `def-cat-${Date.now()}`, name, type }
      const updatedCats = [...categories, newCat]
      setCategories(updatedCats)
      await syncAdminSeeds(updatedCats, subcategories)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('categories').insert({ name, type, user_id: user?.id })
      load()
    }
    setAddingCatName('')
    setAddingCatType(null)
  }

  async function deleteCategory(id: string) {
    if (!confirm('Hapus kategori ini beserta seluruh subkategorinya?')) return

    if (isAdmin) {
      const updatedCats = categories.filter(c => c.id !== id)
      const updatedSubs = subcategories.filter(s => s.category_id !== id)
      setCategories(updatedCats)
      setSubcategories(updatedSubs)
      await syncAdminSeeds(updatedCats, updatedSubs)
    } else {
      await supabase.from('categories').delete().eq('id', id)
      load()
    }
  }

  async function handleAddSubcategory(categoryId: string) {
    if (!addingSubName.trim()) return
    const name = addingSubName.trim()

    if (isAdmin) {
      const newSub: Subcategory = { id: `def-sub-${Date.now()}`, name, category_id: categoryId }
      const updatedSubs = [...subcategories, newSub]
      setSubcategories(updatedSubs)
      await syncAdminSeeds(categories, updatedSubs)
    } else {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('subcategories').insert({ name, category_id: categoryId, user_id: user?.id })
      load()
    }
    setAddingSubName('')
    setAddingSubCatId(null)
  }

  async function deleteSubcategory(id: string) {
    if (isAdmin) {
      const updatedSubs = subcategories.filter(s => s.id !== id)
      setSubcategories(updatedSubs)
      await syncAdminSeeds(categories, updatedSubs)
    } else {
      await supabase.from('subcategories').delete().eq('id', id)
      load()
    }
  }

  // Category Edit Handlers
  function startEditCat(cat: Category) {
    setEditingCatId(cat.id)
    setEditingCatName(cat.name)
  }

  function cancelEditCat() {
    setEditingCatId(null)
    setEditingCatName('')
  }

  async function saveEditCat(id: string) {
    if (!editingCatName.trim()) return
    const name = editingCatName.trim()

    if (isAdmin) {
      const updatedCats = categories.map(c => c.id === id ? { ...c, name } : c)
      setCategories(updatedCats)
      await syncAdminSeeds(updatedCats, subcategories)
    } else {
      await supabase.from('categories').update({ name }).eq('id', id)
      load()
    }
    setEditingCatId(null)
  }

  // Subcategory Edit Handlers
  function startEditSub(sub: Subcategory) {
    setEditingSubId(sub.id)
    setEditingSubName(sub.name)
  }

  function cancelEditSub() {
    setEditingSubId(null)
    setEditingSubName('')
  }

  async function saveEditSub(id: string) {
    if (!editingSubName.trim()) return
    const name = editingSubName.trim()

    if (isAdmin) {
      const updatedSubs = subcategories.map(s => s.id === id ? { ...s, name } : s)
      setSubcategories(updatedSubs)
      await syncAdminSeeds(categories, updatedSubs)
    } else {
      await supabase.from('subcategories').update({ name }).eq('id', id)
      load()
    }
    setEditingSubId(null)
  }

  const toggleExpand = (id: string) =>
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="max-w-2xl w-full mx-auto space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {isAdmin ? 'Default Kategori & Subkategori' : 'Kategori & Subkategori'}
          </h1>
          {isAdmin && (
            <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Admin Seed Template
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {isAdmin 
            ? 'Kelola daftar kategori dan subkategori default yang akan otomatis diberikan ke akun pengguna baru.'
            : 'Kelola hirarki kategori transaksi finansial Anda'}
        </p>
      </div>

      {/* Category Sections: Income and Outcome */}
      <div className="space-y-6">
        {(['income', 'outcome'] as const).map(typeLabel => {
          const isIncome = typeLabel === 'income'
          const filteredCats = categories.filter(c => c.type === typeLabel)
          const isAddingCat = addingCatType === typeLabel

          return (
            <div key={typeLabel} className="space-y-3">
              {/* Section Header with Add Category Button */}
              <div className="flex items-center justify-between">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isIncome ? '📈 Kategori Income (Pemasukan)' : '📉 Kategori Outcome (Pengeluaran)'}
                </h2>
                {!isAddingCat && (
                  <button
                    onClick={() => { setAddingCatType(typeLabel); setAddingCatName('') }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      isIncome
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
                    }`}>
                    <Plus size={14} /> + Kategori {isIncome ? 'Income' : 'Outcome'}
                  </button>
                )}
              </div>

              {/* Inline Add Category Form */}
              {isAddingCat && (
                <div className={`glass-card p-3 rounded-xl border flex items-center gap-2 ${
                  isIncome ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'
                }`}>
                  <input
                    type="text"
                    value={addingCatName}
                    onChange={e => setAddingCatName(e.target.value)}
                    placeholder={`Nama kategori ${isIncome ? 'income' : 'outcome'} baru...`}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleAddCategory(typeLabel)
                      if (e.key === 'Escape') setAddingCatType(null)
                    }}
                    autoFocus
                    className="flex-1 min-w-0 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                  />
                  <button
                    onClick={() => handleAddCategory(typeLabel)}
                    className={`px-4 py-2 text-xs text-white font-bold rounded-xl transition-all cursor-pointer shadow-sm ${
                      isIncome ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'
                    }`}>
                    Simpan
                  </button>
                  <button
                    onClick={() => setAddingCatType(null)}
                    className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    title="Batal">
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* List of Categories */}
              <div className="space-y-2">
                {filteredCats.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center glass-card rounded-xl border border-slate-200/80 dark:border-slate-800/60">
                    Belum ada kategori {isIncome ? 'income' : 'outcome'}. Klik tombol di atas untuk menambah.
                  </p>
                ) : (
                  filteredCats.map(cat => {
                    const subs = subcategories.filter(s => s.category_id === cat.id)
                    const isOpen = expanded.includes(cat.id)
                    const isEditingCat = editingCatId === cat.id

                    return (
                      <div key={cat.id} className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/40 shadow-sm">
                        <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          {isEditingCat ? (
                            <div className="flex items-center gap-2 flex-1 min-w-0 pr-2" onClick={e => e.stopPropagation()}>
                              <input
                                type="text"
                                value={editingCatName}
                                onChange={e => setEditingCatName(e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === 'Enter') saveEditCat(cat.id)
                                  if (e.key === 'Escape') cancelEditCat()
                                }}
                                autoFocus
                                className="flex-1 min-w-0 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-blue-500/50 text-sm font-semibold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500/30"
                              />
                              <button
                                onClick={() => saveEditCat(cat.id)}
                                className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Simpan">
                                <Check size={16} />
                              </button>
                              <button
                                onClick={cancelEditCat}
                                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
                                title="Batal">
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => toggleExpand(cat.id)}
                              className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 flex-1 text-left min-w-0 cursor-pointer">
                              {isOpen ? <ChevronDown size={17} className="shrink-0 text-blue-500 dark:text-blue-400"/> : <ChevronRight size={17} className="shrink-0 text-slate-400"/>}
                              <span className="truncate">{cat.name}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal ml-1 shrink-0">({subs.length} sub)</span>
                            </button>
                          )}

                          {!isEditingCat && (
                            <div className="flex items-center gap-1 shrink-0 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setAddingSubCatId(cat.id)
                                  setAddingSubName('')
                                  if (!isOpen) toggleExpand(cat.id)
                                }}
                                className="px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-indigo-500/20 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                                title="Tambah Subkategori">
                                <Plus size={13} /> <span className="hidden sm:inline">Sub</span>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); startEditCat(cat) }}
                                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Edit Kategori">
                                <Pencil size={15}/>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id) }}
                                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Kategori">
                                <Trash2 size={15}/>
                              </button>
                            </div>
                          )}
                        </div>

                        {isOpen && (
                          <div className="bg-slate-50/60 dark:bg-slate-950/60 border-t border-slate-200/80 dark:border-slate-800/80 divide-y divide-slate-200/60 dark:divide-slate-800/40">
                            {subs.length === 0 && addingSubCatId !== cat.id ? (
                              <p className="text-xs text-slate-500 px-6 py-3 italic">Belum ada subkategori</p>
                            ) : (
                              subs.map(sub => {
                                const isEditingSub = editingSubId === sub.id
                                return (
                                  <div key={sub.id} className="flex items-center justify-between px-6 py-2.5 hover:bg-white dark:hover:bg-slate-900/60 transition-colors">
                                    {isEditingSub ? (
                                      <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                                        <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">↳</span>
                                        <input
                                          type="text"
                                          value={editingSubName}
                                          onChange={e => setEditingSubName(e.target.value)}
                                          onKeyDown={e => {
                                            if (e.key === 'Enter') saveEditSub(sub.id)
                                            if (e.key === 'Escape') cancelEditSub()
                                          }}
                                          autoFocus
                                          className="flex-1 min-w-0 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-indigo-500/50 text-xs text-slate-900 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/30"
                                        />
                                        <button
                                          onClick={() => saveEditSub(sub.id)}
                                          className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                                          title="Simpan">
                                          <Check size={14} />
                                        </button>
                                        <button
                                          onClick={cancelEditSub}
                                          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer"
                                          title="Batal">
                                          <X size={14} />
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                        <span className="text-xs text-slate-700 dark:text-slate-300 truncate min-w-0 mr-2 font-medium">↳ {sub.name}</span>
                                        <div className="flex items-center gap-1 shrink-0">
                                          <button
                                            onClick={() => startEditSub(sub)}
                                            className="p-1 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                                            title="Edit Subkategori">
                                            <Pencil size={13}/>
                                          </button>
                                          <button
                                            onClick={() => deleteSubcategory(sub.id)}
                                            className="p-1 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                            title="Hapus Subkategori">
                                            <Trash2 size={13}/>
                                          </button>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )
                              })
                            )}

                            {/* Inline Add Subcategory input inside expanded panel */}
                            <div className="px-6 py-2.5 bg-slate-100/60 dark:bg-slate-900/40">
                              {addingSubCatId === cat.id ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold shrink-0">↳</span>
                                  <input
                                    type="text"
                                    value={addingSubName}
                                    onChange={e => setAddingSubName(e.target.value)}
                                    placeholder="Nama subkategori baru..."
                                    onKeyDown={e => {
                                      if (e.key === 'Enter') handleAddSubcategory(cat.id)
                                      if (e.key === 'Escape') setAddingSubCatId(null)
                                    }}
                                    autoFocus
                                    className="flex-1 min-w-0 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-indigo-500/50 text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30"
                                  />
                                  <button
                                    onClick={() => handleAddSubcategory(cat.id)}
                                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm">
                                    Simpan
                                  </button>
                                  <button
                                    onClick={() => setAddingSubCatId(null)}
                                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                    title="Batal">
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setAddingSubCatId(cat.id)
                                    setAddingSubName('')
                                  }}
                                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors">
                                  <Plus size={13} /> Tambah Subkategori
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}