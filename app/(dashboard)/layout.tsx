'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from '@/components/ThemeProvider'
import {
  LayoutDashboard, PlusCircle, Tag, Wallet, Landmark, ArrowLeftRight,
  ChevronLeft, ChevronRight, LogOut, Menu, X, Sparkles, Sun, Moon, User, ShieldAlert
} from 'lucide-react'

const defaultUserNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/input', icon: PlusCircle, label: 'Input Transaksi' },
  { href: '/fund-sources', icon: Landmark, label: 'Sumber Dana' },
  { href: '/transfer', icon: ArrowLeftRight, label: 'Transfer' },
  { href: '/categories', icon: Tag, label: 'Kategori' },
  { href: '/budget', icon: Wallet, label: 'Budgeting' },
  { href: '/profile', icon: User, label: 'Profil Akun' },
]

const adminNavItems = [
  { href: '/admin', icon: ShieldAlert, label: 'Admin Portal' },
  { href: '/fund-sources', icon: Landmark, label: 'Default Sumber Dana' },
  { href: '/categories', icon: Tag, label: 'Default Kategori' },
  { href: '/profile', icon: User, label: 'Profil Admin' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      let name = user.user_metadata?.display_name || user.user_metadata?.full_name
      let role = user.user_metadata?.role

      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, role')
        .eq('id', user.id)
        .maybeSingle()

      if (profile?.display_name) name = profile.display_name
      if (profile?.role) role = profile.role

      if (user.email === 'admin@fintrack.com' || role === 'admin') {
        setIsAdmin(true)
      }

      if (!name && user.email) {
        name = user.email.split('@')[0]
      }

      setUserName(name || 'User')
    }
    loadUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItemsToRender = isAdmin ? adminNavItems : defaultUserNavItems

  const NavLinks = () => (
    <>
      {/* User Greeting Card (Clickable to /profile) */}
      <Link
        href="/profile"
        onClick={() => setMobileOpen(false)}
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.7)' : '#ffffff',
          borderColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0'
        }}
        className={`mx-3 my-2.5 p-2.5 rounded-xl border flex items-center gap-3 shadow-sm hover:border-blue-500/50 hover:shadow-blue-500/10 transition-all group cursor-pointer ${collapsed && !mobileOpen ? 'justify-center p-2' : ''}`}
      >
        <div className={`w-8 h-8 rounded-lg ${isAdmin ? 'bg-gradient-to-tr from-rose-600 to-amber-600' : 'bg-gradient-to-tr from-blue-600 to-indigo-600'} flex items-center justify-center font-bold text-xs shrink-0 shadow-md uppercase transition-transform group-hover:scale-105`}>
          <span style={{ color: '#ffffff' }}>
            {isAdmin ? <ShieldAlert size={16} style={{ color: '#ffffff' }} /> : (userName ? userName.charAt(0) : <User size={16} style={{ color: '#ffffff' }} />)}
          </span>
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="flex flex-col min-w-0 overflow-hidden">
            <span 
              style={{ color: isAdmin ? '#f43f5e' : (theme === 'dark' ? '#60a5fa' : '#2563eb') }}
              className="text-[10px] uppercase font-bold tracking-wider leading-none mb-0.5"
            >
              {isAdmin ? 'Admin' : 'Hai 👋'}
            </span>
            <span 
              style={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}
              className="text-xs font-extrabold truncate leading-tight group-hover:text-blue-400 transition-colors" 
              title={userName}
            >
              {userName || 'Memuat...'}
            </span>
          </div>
        )}
      </Link>

      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItemsToRender.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                ${active 
                  ? (isAdmin && href === '/admin'
                      ? 'bg-gradient-to-r from-rose-600/90 to-amber-600/90 text-white shadow-lg shadow-rose-500/25 border border-rose-400/30'
                      : 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30')
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}>
              <Icon size={19} className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
              {(!collapsed || mobileOpen) && <span className="truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Mode Switcher & Logout */}
      <div className="p-3 border-t border-slate-800/80 space-y-1.5">
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 w-full transition-all duration-200 cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun size={19} className="shrink-0 text-amber-400" />
          ) : (
            <Moon size={19} className="shrink-0 text-indigo-500" />
          )}
          {(!collapsed || mobileOpen) && (
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          )}
        </button>

        <button onClick={handleLogout}
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 hover:border hover:border-rose-500/20 w-full transition-all duration-200 cursor-pointer">
          <LogOut size={19} className="shrink-0 text-slate-400 group-hover:text-rose-400" />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}/>
      )}

      {/* Mobile sidebar (drawer) */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800/80 flex flex-col z-50 transition-transform duration-300 lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/30">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-base">FinTrack</span>
          </div>
          <button onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer">
            <X size={18}/>
          </button>
        </div>
        <NavLinks/>
      </aside>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex ${collapsed ? 'w-20' : 'w-60'} glass-card border-r border-slate-800/70 flex-col transition-all duration-300 shrink-0`}>
        <div className="flex items-center justify-between p-4.5 border-b border-slate-800/70">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/30">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-lg tracking-tight">FinTrack</span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 ml-auto transition-colors cursor-pointer">
            {collapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
          </button>
        </div>
        <NavLinks/>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3.5 glass-card border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-300 cursor-pointer">
              <Menu size={22}/>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                <Sparkles size={15} className="text-white" />
              </div>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-base">FinTrack</span>
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-slate-800/80 text-slate-300 cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
        </div>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}