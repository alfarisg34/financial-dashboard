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
        className={`mx-3 my-2.5 p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center gap-3 shadow-sm hover:border-[var(--accent-primary)]/40 hover:shadow-md transition-all duration-200 group cursor-pointer ${
          collapsed && !mobileOpen ? 'justify-center p-2' : ''
        }`}
      >
        <div
          className={`w-8 h-8 rounded-lg ${
            isAdmin
              ? 'bg-gradient-to-tr from-rose-600 to-amber-600 text-white'
              : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
          } flex items-center justify-center font-bold text-xs shrink-0 shadow-md uppercase transition-transform group-hover:scale-105`}
        >
          {isAdmin ? (
            <ShieldAlert size={16} />
          ) : userName ? (
            userName.charAt(0)
          ) : (
            <User size={16} />
          )}
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="flex flex-col min-w-0 overflow-hidden">
            <span
              className={`text-[10px] uppercase font-bold tracking-wider leading-none mb-0.5 ${
                isAdmin ? 'text-rose-500 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'
              }`}
            >
              {isAdmin ? 'Admin Portal' : 'Hai 👋'}
            </span>
            <span
              className="text-xs font-bold truncate leading-tight text-[var(--text-primary)] group-hover:text-blue-500 transition-colors"
              title={userName}
            >
              {userName || 'Memuat...'}
            </span>
          </div>
        )}
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItemsToRender.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? isAdmin && href === '/admin'
                    ? 'bg-rose-500/15 text-rose-500 dark:text-rose-400 border border-rose-500/30 shadow-sm font-semibold'
                    : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm font-semibold'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                  active
                    ? isAdmin && href === '/admin'
                      ? 'text-rose-500 dark:text-rose-400'
                      : 'text-blue-600 dark:text-blue-400'
                    : 'text-[var(--text-muted)] group-hover:text-blue-500'
                }`}
              />
              {(!collapsed || mobileOpen) && <span className="truncate">{label}</span>}
              {active && (!collapsed || mobileOpen) && (
                <div
                  className={`ml-auto w-1.5 h-1.5 rounded-full ${
                    isAdmin && href === '/admin' ? 'bg-rose-500' : 'bg-blue-500'
                  }`}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Mode Switcher & Logout */}
      <div className="p-3 border-t border-[var(--border-subtle)] space-y-1">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] w-full transition-all duration-200 cursor-pointer"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="shrink-0 text-amber-400 transition-transform hover:rotate-45" />
          ) : (
            <Moon size={18} className="shrink-0 text-indigo-600 transition-transform hover:-rotate-12" />
          )}
          {(!collapsed || mobileOpen) && (
            <span>{theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:bg-rose-500/10 hover:text-rose-500 hover:border hover:border-rose-500/20 w-full transition-all duration-200 cursor-pointer"
        >
          <LogOut size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
          {(!collapsed || mobileOpen) && <span>Keluar</span>}
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-[var(--bg-base)] text-[var(--text-primary)] overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar (drawer) */}
      <aside
        className={`fixed top-0 left-0 h-full w-68 bg-[var(--bg-surface)] backdrop-blur-2xl border-r border-[var(--border-subtle)] flex flex-col z-50 transition-transform duration-300 shadow-2xl lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <Sparkles size={17} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[var(--text-primary)]">
                FinTrack
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium -mt-0.5">
                Financial Management
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <NavLinks />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex ${
          collapsed ? 'w-20' : 'w-64'
        } glass-card border-r border-[var(--border-subtle)] flex-col transition-all duration-300 shrink-0 z-20`}
      >
        <div className="flex items-center justify-between p-4.5 border-b border-[var(--border-subtle)]">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
                <Sparkles size={17} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-[var(--text-primary)]">
                  FinTrack
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium -mt-0.5">
                  Pro Finance
                </span>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] ml-auto transition-colors cursor-pointer"
            title={collapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <NavLinks />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 glass-card border-b border-[var(--border-subtle)] shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm text-white">
                <Sparkles size={15} />
              </div>
              <span className="font-bold text-base tracking-tight text-[var(--text-primary)]">
                FinTrack
              </span>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            title="Ganti Tema"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-indigo-600" />
            )}
          </button>
        </div>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}