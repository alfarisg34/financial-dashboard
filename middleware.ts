import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data?.user
  } catch (e) {
    // Suppress error if env variables are not configured yet
  }

  const { pathname } = request.nextUrl
  const isAuthRoute = pathname === '/login' || pathname === '/reset-password' || pathname.startsWith('/auth') || pathname.startsWith('/api')

  if (!user && !isAuthRoute && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (user && pathname === '/login') {
    const isAdmin = user.email === 'admin@fintrack.com' || user.user_metadata?.role === 'admin'
    return NextResponse.redirect(new URL(isAdmin ? '/admin' : '/dashboard', request.url))
  }

  // Protect /admin route from regular users
  if (user && pathname.startsWith('/admin')) {
    const isAdmin = user.email === 'admin@fintrack.com' || user.user_metadata?.role === 'admin'
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Redirect admin from regular-only routes to /admin
  const userOnlyRoutes = ['/dashboard', '/input', '/transfer', '/budget']
  if (user && userOnlyRoutes.includes(pathname)) {
    const isAdmin = user.email === 'admin@fintrack.com' || user.user_metadata?.role === 'admin'
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}