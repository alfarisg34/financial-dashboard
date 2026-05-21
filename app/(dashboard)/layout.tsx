'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, PlusCircle, Tag, Wallet,
  ChevronLeft, ChevronRight, LogOut, Menu, X
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/input', icon: PlusCircle, label: 'Transaction Input' },
  { href: '/categories', icon: Tag, label: 'Manage Category' },
  { href: '/budget', icon: Wallet, label: 'Manage Budget' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const NavLinks = () => (
    <>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors
                ${active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Icon size={18} className="shrink-0" />
              {(!collapsed || mobileOpen) && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>
      <div className="p-2 border-t border-gray-100">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 w-full transition-colors">
          <LogOut size={18} className="shrink-0" />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}/>
      )}

      {/* Mobile sidebar (drawer) */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-30 transition-transform duration-200 lg:hidden
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-semibold text-gray-800 text-sm">💰 FinTrack</span>
          <button onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <X size={16}/>
          </button>
        </div>
        <NavLinks/>
      </aside>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex ${collapsed ? 'w-16' : 'w-56'} bg-white border-r border-gray-100 flex-col transition-all duration-200 shrink-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!collapsed && <span className="font-semibold text-gray-800 text-sm">💰 FinTrack</span>}
          <button onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 ml-auto">
            {collapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}
          </button>
        </div>
        <NavLinks/>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
          <button onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <Menu size={20}/>
          </button>
          <span className="font-semibold text-gray-800 text-sm">💰 FinTrack</span>
        </div>

        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}